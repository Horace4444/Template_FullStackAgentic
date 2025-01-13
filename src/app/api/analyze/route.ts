import { NextResponse } from 'next/server';
import { ChatOpenAI } from '@langchain/openai';
import { RunnableSequence } from "@langchain/core/runnables";
import { StringOutputParser } from "@langchain/core/output_parsers";
import { ChatPromptTemplate } from "@langchain/core/prompts";
import { JsonOutputParser } from "@langchain/core/output_parsers";
import { tavily } from '@tavily/core';

// Function to emit a log event
async function emitLog(type: 'info' | 'step' | 'result', message: string) {
  if (typeof window === 'undefined') {
    // Server-side: use absolute URL
    const baseUrl = process.env.VERCEL_URL 
      ? `https://${process.env.VERCEL_URL}` 
      : 'http://localhost:3000';
    
    try {
      await fetch(`${baseUrl}/api/logs`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type, message }),
      });
    } catch (error) {
      console.error('Failed to emit log:', error);
    }
  }
}

// Initialize services
const llm = new ChatOpenAI({
  modelName: 'gpt-4-turbo-preview',
  temperature: 0.7,
});

const baseUrl = process.env.VERCEL_URL 
  ? `https://${process.env.VERCEL_URL}` 
  : 'http://localhost:3000';

const tavilyClient = tavily({ apiKey: process.env.TAVILY_API_KEY || '' });

// Types
interface CompanyInfo {
  company: string;
  ticker: string;
  searchQuery: string;
}

const jsonParser = new JsonOutputParser<CompanyInfo>();

// Agent prompts
const askAgentPrompt = ChatPromptTemplate.fromMessages([
  ["system", `You are a senior financial analyst specializing in deep company analysis and risk assessment. Your role is to identify both opportunities and potential risks that may not be immediately apparent from surface-level metrics.

Focus on:
- Accurate company identification
- Precise financial metrics
- Hidden risks and opportunities
- Competitive threats
- Market positioning challenges`],
  ["human", `Extract company information from this question and respond with a JSON object that will help guide a thorough financial analysis.

Format your response as valid JSON with these fields:
- company: The full legal company name
- ticker: The stock market ticker symbol
- searchQuery: A detailed search query to find recent financial data, risks, and market analysis

Question: {question}

Remember: Respond with ONLY the JSON object, no other text.`]
]);

const answerAgentPrompt = ChatPromptTemplate.fromMessages([
  ["system", `You are a critical financial analyst providing detailed investment analysis for professional investors. Your analysis should:

1. Focus on data accuracy and verification
2. Challenge assumptions in financial reporting
3. Identify potential risks and red flags
4. Compare metrics against industry standards
5. Analyze trends and their sustainability
6. Question management decisions and strategies
7. Consider macro factors and market conditions
8. Highlight both opportunities and threats
9. Provide context for all metrics
10. Flag any data inconsistencies or concerns

Be direct and critical where warranted. Your audience needs unvarnished truth, not corporate PR. Support all claims with data.`],
  ["human", "Question: {question}\nCompany: {company}\nTicker: {ticker}\nSearch Results: {searchResults}\n\nProvide a thorough, critical analysis that directly addresses the question while highlighting any relevant risks or opportunities."]
]);

// Create the analysis chain
const analysisChain = RunnableSequence.from([
  // First step: Parse company info and question
  async ({ question }) => {
    await emitLog('step', 'Identifying company and structuring query...');
    try {
      const parsed = await askAgentPrompt
        .pipe(llm)
        .pipe(jsonParser)
        .invoke({ question });

      await emitLog('info', `Analyzing ${parsed.company} (${parsed.ticker})`);
      return {
        companyInfo: parsed,
        question
      };
    } catch (error) {
      await emitLog('step', 'Error parsing company info: ' + (error as Error).message);
      throw new Error('Failed to parse company info: ' + (error as Error).message);
    }
  },

  // Second step: Web search
  async (input) => {
    await emitLog('step', 'Gathering financial data from web sources...');
    try {
      await emitLog('info', `Searching for: ${input.companyInfo.searchQuery}`);
      
      const searchResults = await tavilyClient.search(input.companyInfo.searchQuery, {
        searchDepth: "advanced",
        maxResults: 5,
      });
      
      // Log the URLs being queried
      await fetch(`${baseUrl}/api/logs`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: 'info',
          message: `Searching the following sources:\n${searchResults.results.map((r: { url: string }) => `- ${r.url}`).join('\n')}`
        })
      });
      
      if (!searchResults || !Array.isArray(searchResults.results)) {
        throw new Error('Invalid response format from Tavily API');
      }
      
      await emitLog('info', `Found ${searchResults.results.length} relevant sources`);
      return {
        ...input,
        searchResults: JSON.stringify(searchResults)
      };
    } catch (error) {
      await emitLog('step', 'Error fetching financial data: ' + (error as Error).message);
      throw error;
    }
  },

  // Final step: Generate analysis
  async (input) => {
    await emitLog('step', 'Generating comprehensive financial analysis...');
    try {
      const response = await answerAgentPrompt
        .pipe(llm)
        .pipe(new StringOutputParser())
        .invoke({
          question: input.question,
          company: input.companyInfo.company,
          ticker: input.companyInfo.ticker,
          searchResults: input.searchResults,
        });
      
      await emitLog('result', 'Analysis complete');
      
      // Return only the financial analysis, not the logs
      const analysis = `# ${input.companyInfo.company} (${input.companyInfo.ticker})\n\n${response}`;
      return analysis;
    } catch (error) {
      await emitLog('step', 'Error generating analysis: ' + (error as Error).message);
      throw error;
    }
  }
]);

export async function POST(request: Request) {
  try {
    const { question } = await request.json();
    await emitLog('info', `Received question: ${question}`);
    
    // Execute the analysis chain
    const response = await analysisChain.invoke({ question });
    
    return NextResponse.json({ response });
  } catch (error) {
    console.error('Analysis error:', error);
    await emitLog('step', 'Analysis failed: ' + (error as Error).message);
    return NextResponse.json(
      { error: 'Failed to analyze the company: ' + (error as Error).message },
      { status: 500 }
    );
  }
} 