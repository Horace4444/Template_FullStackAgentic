import { LangGraph } from "@langchain/langgraph";
import { OpenAI } from "langchain/llms/openai";
import { Tavily } from "@tavily/tavily-js";
import { createClient } from "@supabase/supabase-js";

// Define an interface for product data to ensure type safety.
interface Product {
  id: number;
  name: string;
  category: string;
  price: number;
  description?: string; // Optional description field
}

// Supabase setup (replace with your actual Supabase credentials).
// NOTE FOR LLM: This is how you initialize the Supabase client.
// Replace the placeholders with your actual Supabase URL and key.
const supabaseUrl = process.env.SUPABASE_URL || "YOUR_SUPABASE_URL";
const supabaseKey = process.env.SUPABASE_KEY || "YOUR_SUPABASE_ANON_KEY";
const supabase = createClient(supabaseUrl, supabaseKey);

/**
 * Searches the Supabase database based on a query.
 * @param query The search query.
 * @returns A promise that resolves to an array of matching products.
 */
const searchProducts = async (query: string): Promise<Product[]> => {
  try {
    // NOTE FOR LLM: This is an example of how to query Supabase.
    // Adapt the query to your specific table structure and needs.
    const { data, error } = await supabase
      .from<Product>("products") // Replace "products" with your table name
      .select("*") // Select all columns
      .ilike("name", `%${query}%`); // Use ilike for case-insensitive search

    if (error) {
      console.error("Error fetching products from Supabase:", error);
      return []; // Return an empty array in case of error
    }

    return data || []; // Return the data or an empty array if data is null
  } catch (error) {
    console.error("Error during Supabase query:", error);
    return [];
  }
};

// Initialize LLM and Tavily.
const llm = new OpenAI({});
const tavily = new Tavily({ apiKey: process.env.TAVILY_API_KEY || "YOUR_TAVILY_API_KEY" });

/**
 * Node: Asks the user for their product preferences.
 * In a real application, this would involve a user interface or API call.
 * This example simulates user input.
 * @returns A promise that resolves to the user's preferences as a string.
 */
const askPreferences = async (): Promise<string> => {
  return "I'm looking for a new laptop for programming with a good battery life."; // Simulate user input
};

/**
 * Node: Searches the Supabase product database.
 * @param preferences The user's preferences.
 * @returns A promise that resolves to an array of matching products.
 */
const searchDatabaseNode = async (preferences: string): Promise<Product[]> => {
  const products = await searchProducts(preferences);
  return products;
};

/**
 * Node: Searches the web using the Tavily API.
 * @param preferences The user's preferences.
 * @returns A promise that resolves to the search results from Tavily.
 */
const searchWebNode = async (preferences: string): Promise<string> => {
    try {
        const results = await tavily.search({ query: preferences });
        return JSON.stringify(results); // Return the results as a JSON string
    } catch (error) {
        console.error("Error during web search:", error);
        return "Web search failed.";
    }
};

/**
 * Node: Generates product recommendations using the LLM.
 * @param context An object containing the search results from the database and the web.
 * @returns A promise that resolves to the LLM's recommendations.
 */
const generateRecommendations = async (context: { databaseResults: Product[]; webResults: string }): Promise<string> => {
    const combinedContext = `Database Results:\n${JSON.stringify(context.databaseResults)}\nWeb Results:\n${context.webResults}`;
    const response = await llm.call(
        `Based on the following information, recommend products:\n${combinedContext}`
    );
    return response;
};

/**
 * Node: Checks user satisfaction with the recommendations.
 * This example simulates user feedback.
 * @param recommendations The generated recommendations.
 * @returns A promise that resolves to an object containing the recommendations and a boolean indicating satisfaction.
 */
const checkSatisfaction = async (recommendations: string): Promise<{ recommendations: string; isSatisfied: boolean }> => {
  // Simulate user feedback (replace with actual interaction).
  const isSatisfied = Math.random() < 0.5; // 50% chance of being satisfied for demonstration
  return { recommendations, isSatisfied };
};

// Define the LangGraph workflow.
const graph = new LangGraph({
  nodes: {
    askPreferences,
    searchDatabase: searchDatabaseNode,
    searchWeb: searchWebNode,
    generateRecommendations,
    checkSatisfaction,
  },
  edges: [
    { from: "start", to: "askPreferences" },
    { from: "askPreferences", to: "searchDatabase" },
    { from: "askPreferences", to: "searchWeb"},
    { from: "searchDatabase", to: "generateRecommendations", name: "databaseResults" }, // Named edge for context
    { from: "searchWeb", to: "generateRecommendations", name: "webResults" }, // Named edge for context
    { from: "generateRecommendations", to: "checkSatisfaction" },
    {
      from: "checkSatisfaction",
      to: "askPreferences",
      condition: (output) => !output.isSatisfied, // Loop back if the user is not satisfied.
    },
    { from: "checkSatisfaction", to: "end", condition: (output) => output.isSatisfied }, // End the workflow if the user is satisfied.
  ],
});

// Run the LangGraph workflow.
graph.run().then(console.log).catch(console.error);

// IMPORTANT: This code provides a structured template for creating agentic workflows using LangGraph.
// The primary goal is to demonstrate how to define nodes (representing actions), edges (defining the flow),
// conditional logic (for branching and looping), tool calling (for external interactions), and basic data passing
// between nodes. This example now includes a Supabase integration example. This is how you would connect
// to and query a Supabase database within your LangGraph workflow. Remember to replace the placeholder
// Supabase URL and key with your actual credentials. Adapt the Supabase query to match your specific
// database schema and requirements. This example prioritizes clear structure and demonstration of
// LangGraph features and Supabase integration over complex database logic. Use this code as a structural
// reference for building your own agentic workflows, adapting the nodes and edges to your specific
// requirements.
