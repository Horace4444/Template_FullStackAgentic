# Design Reference

## Core Design Principles

### 1. Flexibility First
- Design patterns that adapt to different use cases
- Configurable theming system
- Extensible component architecture
- Clear customization points

### 2. Sensible Defaults
- Clean, modern default design
- Professional base styling
- Accessible components out of the box
- Easy-to-customize patterns

### 3. Progressive Enhancement
- Start with core functionality
- Add features progressively
- Maintain extensibility
- Support different complexity levels

### 4. Consistent & Maintainable
- Predictable pattern structure
- Scalable design system
- Clear extension points
- Documented customization

## Visual Language

### Theme Configuration
```typescript
// Configurable theme system
const createTheme = (options = {}) => ({
  colors: {
    primary: {
      default: options.primaryColor || 'bg-emerald-600',
      hover: options.primaryHover || 'hover:bg-emerald-700',
      light: options.primaryLight || 'bg-emerald-50'
    },
    // Additional color configurations
    // Can be completely replaced via options
    ...options.colors
  },
  
  // Additional theme options
  borderRadius: options.borderRadius || 'rounded-lg',
  shadowLevel: options.shadowLevel || 'shadow-sm',
  spacing: options.spacing || {
    page: 'max-w-7xl mx-auto px-4 sm:px-6 lg:px-8',
    section: 'py-12',
    component: 'p-4'
  }
})
```

### Default Color System
```typescript
// Base color system - fully customizable
const baseColors = {
  primary: {
    default: 'bg-emerald-600',
    hover: 'hover:bg-emerald-700',
    light: 'bg-emerald-50'
  },
  neutral: {
    background: 'bg-slate-50',
    surface: 'bg-white',
    border: 'border-slate-200',
    text: 'text-slate-900',
    textMuted: 'text-slate-500'
  },
  status: {
    success: 'bg-green-600',
    error: 'bg-red-600',
    warning: 'bg-amber-600',
    info: 'bg-blue-600'
  }
}
```

### Typography System
```typescript
// Configurable typography system
const createTypography = (options = {}) => ({
  headings: {
    h1: options.h1 || 'text-4xl font-bold tracking-tight',
    h2: options.h2 || 'text-3xl font-semibold tracking-tight',
    h3: options.h3 || 'text-2xl font-semibold tracking-tight',
    h4: options.h4 || 'text-xl font-semibold tracking-tight'
  },
  body: {
    default: options.bodyDefault || 'text-base',
    small: options.bodySmall || 'text-sm',
    large: options.bodyLarge || 'text-lg'
  }
})
```

## Component Patterns

### Layout System
```typescript
// Base layout patterns - extensible
const layoutPatterns = {
  page: 'max-w-7xl mx-auto px-4 sm:px-6 lg:px-8',
  section: 'py-12',
  card: 'bg-white rounded-lg shadow-sm p-6',
  grid: 'grid gap-6',
  stack: 'space-y-4'
}
```

### Core Components
- Define base components with clear extension points
- Provide sensible defaults
- Allow easy theme integration
- Support accessibility out of the box

#### Button Base
```typescript
const buttonBase = {
  root: 'inline-flex items-center justify-center rounded-md font-medium',
  sizes: {
    sm: 'px-3 py-2 text-sm',
    md: 'px-4 py-2 text-base',
    lg: 'px-6 py-3 text-lg'
  },
  variants: {
    primary: 'bg-primary-600 text-white hover:bg-primary-700',
    secondary: 'bg-white border border-gray-300 text-gray-700 hover:bg-gray-50',
    ghost: 'text-gray-700 hover:bg-gray-100'
  }
}
```

## Interaction Patterns

### Loading States
- Consistent loading indicators
- Skeleton screens
- Progress indicators
- Transition states

### Feedback Patterns
- Toast notifications
- Form validation
- Success/error states
- Progress tracking

## AI-Specific UI Patterns

### Chat Interface Base
- Message threading
- Loading states
- Response formatting
- Error handling

### Agent Workflow Patterns
- Progress tracking
- State visualization
- Error recovery
- User feedback

### Search Interface Base
- Input patterns
- Results display
- Loading states
- Error handling

## Accessibility Foundation

### Base Requirements
- WCAG 2.1 AA compliance
- Keyboard navigation
- Screen reader support
- Focus management

### Implementation Patterns
- Focus styles
- ARIA attributes
- Color contrast
- Touch targets

## Responsive Design

### Breakpoint System
```typescript
const breakpoints = {
  sm: '640px',
  md: '768px',
  lg: '1024px',
  xl: '1280px',
  '2xl': '1536px'
}
```

### Responsive Patterns
- Mobile-first approach
- Flexible layouts
- Adaptive components
- Content reorganization

## Extension Guidelines

### Theming
- Document theme configuration
- Provide example themes
- Define override patterns
- Maintain consistency

### Custom Components
- Follow existing patterns
- Maintain accessibility
- Document properly
- Support theming

### Layout Customization
- Grid system extension
- Custom breakpoints
- Layout variants
- Spacing system

## Implementation Notes

### Using the System
- Start with base components
- Apply theme customization
- Add custom patterns
- Maintain consistency

### Performance
- Optimize asset loading
- Manage bundle size
- Consider code splitting
- Monitor performance

### Testing
- Component testing
- Accessibility testing
- Responsive testing
- Theme testing