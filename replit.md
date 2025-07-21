# TokRecharge.com - TikTok Coin Calculator & Recharge Tools

## Overview

TokRecharge.com is a comprehensive TikTok monetization toolkit that provides calculators and tools for TikTok coin values, gift costs, creator earnings, and recharge pricing across different countries. The application is built as a full-stack web application with a React frontend and Express backend, featuring a PostgreSQL database for data persistence.

## User Preferences

Preferred communication style: Simple, everyday language.
Font preference: Poppins font family across entire platform.
Design preference: Modern animated UI with hover effects and smooth transitions.
SEO requirement: Complete semantic SEO, Google NLP, and LLM AI compliance.
Content requirement: Comprehensive 404 error pages with helpful navigation.
Visual requirement: Animated icons and real-time data updates in hero sections.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Routing**: Wouter for client-side routing
- **State Management**: TanStack Query (React Query) for server state management
- **UI Components**: Radix UI primitives with shadcn/ui component library
- **Styling**: Tailwind CSS with custom TikTok brand colors
- **Build Tool**: Vite for fast development and optimized builds

### Backend Architecture
- **Runtime**: Node.js with Express.js framework
- **Language**: TypeScript with ES modules
- **Database**: PostgreSQL with Drizzle ORM
- **Database Provider**: Neon Database (serverless PostgreSQL)
- **API Pattern**: RESTful API with JSON responses
- **Session Management**: PostgreSQL-backed sessions with connect-pg-simple

### Database Design
- **ORM**: Drizzle ORM with TypeScript-first approach
- **Schema Location**: Shared schema in `/shared/schema.ts`
- **Tables**: Tools, Countries, Gifts, Blog Posts, Recharge Packages
- **Migrations**: Drizzle Kit for schema migrations

## Key Components

### Data Models
1. **Tools**: Calculator and utility tools with metadata
2. **Countries**: Currency information and coin exchange rates
3. **Gifts**: TikTok gift database with coin costs and diamond values
4. **Blog Posts**: SEO-optimized content management
5. **Recharge Packages**: Country-specific coin pricing packages

### Calculator Tools
1. **Coin Calculator**: Convert TikTok coins to real money
2. **Gift Value Estimator**: Calculate gift costs in real currency
3. **Earnings Calculator**: Estimate creator income from gifts
4. **Recharge Comparison**: Compare coin prices across countries
5. **Coin to Diamond Converter**: Internal currency conversion
6. **Withdrawal Calculator**: Calculate net earnings after fees

### Storage Layer
- **Interface**: IStorage interface for data operations
- **Implementation**: MemStorage class with in-memory data store
- **Initialization**: Pre-populated with sample data for tools, countries, and gifts
- **Future**: Designed to be replaced with database-backed storage

## Data Flow

1. **Client Requests**: React components make API calls using TanStack Query
2. **API Routes**: Express routes handle CRUD operations for different entities
3. **Storage Layer**: Storage interface abstracts data access
4. **Response**: JSON responses sent back to client
5. **State Management**: React Query handles caching and synchronization

## External Dependencies

### Frontend Dependencies
- **UI Framework**: React with Radix UI primitives
- **Styling**: Tailwind CSS with PostCSS
- **Icons**: Lucide React icons
- **Forms**: React Hook Form with Zod validation
- **Date Handling**: date-fns library

### Backend Dependencies
- **Database**: Neon Database (serverless PostgreSQL)
- **ORM**: Drizzle ORM with PostgreSQL dialect
- **Validation**: Zod schema validation
- **Session Storage**: connect-pg-simple for PostgreSQL sessions

### Development Tools
- **Build**: Vite for frontend, esbuild for backend
- **TypeScript**: Full TypeScript support across the stack
- **Development**: tsx for TypeScript execution
- **Database**: Drizzle Kit for migrations and schema management

## Deployment Strategy

### Build Process
1. **Frontend**: Vite builds React app to `dist/public`
2. **Backend**: esbuild bundles server code to `dist/index.js`
3. **Database**: Drizzle migrations applied via `db:push` command

### Environment Configuration
- **Database**: Requires `DATABASE_URL` environment variable
- **Development**: NODE_ENV=development for development mode
- **Production**: NODE_ENV=production for production builds

### Serving Strategy
- **Development**: Vite dev server with HMR and middleware mode
- **Production**: Express serves static files from `dist/public`
- **API**: Express routes handle `/api/*` endpoints
- **Fallback**: SPA routing handled by serving index.html

### SEO Optimization
- **Meta Tags**: Dynamic SEO meta tags for each page
- **Structured Data**: JSON-LD schema markup
- **Canonical URLs**: Proper canonical URLs for each page
- **OpenGraph**: Social media sharing optimization

The application is designed with a clear separation of concerns, making it easy to extend with new calculators, add database persistence, or modify the UI components. The modular architecture allows for independent development of frontend and backend components while maintaining type safety through shared schemas.

## Recent Updates (January 2025)

### Design & Typography
- **Font Integration**: Implemented Poppins font family across the entire platform
- **Modern UI**: Applied contemporary design with purple/pink/blue gradient color scheme
- **Hover Effects**: Added smooth scale transforms and transitions on interactive elements
- **Animated Navigation**: Enhanced header with animated icons and smooth transitions

### Calculator Improvements
- **Fixed Display Issues**: Resolved color contrast problems in CoinCalculator result area
- **Enhanced Visual Design**: Improved calculator cards with better shadows and rounded corners
- **Better Input Styling**: Larger, more prominent input fields with focus states
- **Dynamic Results**: Live calculation updates with better formatting

### Hero Section Enhancements
- **Live Calculator Demo**: Added real-time updating values for coins, USD, and creator earnings
- **Interactive Elements**: Animated counters and progress indicators
- **Modern Call-to-Actions**: Gradient buttons with hover animations and scale effects

### Country Pricing Section
- **Expanded Country List**: Added 20 countries with accurate pricing data
- **Animated Country Cards**: Hover effects with flag animations and progress bars
- **Savings Indicators**: Visual badges showing cost savings opportunities
- **Interactive Elements**: Smooth transitions and hover states

### 404 Error Page
- **Comprehensive Content**: SEO-optimized 404 page with helpful navigation
- **Quick Links**: Direct access to popular tools and resources
- **Educational Content**: Information about available features and capabilities
- **Modern Design**: Gradient backgrounds with animated elements

### Technical Improvements
- **SEO Optimization**: Enhanced meta tags, structured data, and semantic HTML
- **Performance**: Optimized animations and transitions for smooth user experience
- **Accessibility**: Improved color contrast and keyboard navigation
- **Mobile Responsiveness**: Ensured all new components work across devices

## Migration to Replit (July 2025)

### Backend Infrastructure Expansion
- **Admin Authentication System**: JWT-based authentication with bcrypt password hashing
- **Security Middleware**: Helmet security headers, CORS protection, rate limiting, and input sanitization
- **Database Schema Enhancement**: Added 8 new tables for admin users, site settings, visitor tracking, ads management, and enhanced blog functionality
- **API Architecture**: Comprehensive RESTful API with protected admin endpoints and public data access

### Admin Panel Development
- **Authentication Pages**: Secure admin login with form validation and error handling
- **Dashboard Interface**: Real-time analytics with visitor statistics, country breakdowns, and page views
- **Site Management**: Dynamic site settings management with meta tag injection capabilities
- **Content Management**: Enhanced blog system with draft/published status and SEO optimization

### Security & Performance
- **Trust Proxy Configuration**: Proper IP detection for rate limiting in production environments
- **Visitor Tracking**: Geographic IP tracking with country and city resolution
- **Session Management**: PostgreSQL-backed sessions for scalable user management
- **File Upload Support**: Secure image upload handling with size and type restrictions

### Data Management
- **Extended Storage Interface**: New IStorage methods for admin users, site settings, visitor logs, and analytics
- **Sample Data Population**: Pre-populated database with realistic TikTok coin rates, countries, and gifts
- **Analytics Collection**: Automated visitor logging with daily, country, and page-level statistics
- **SEO Tools**: Dynamic meta tag generation and site settings for search engine optimization

### Admin Features
- **Real-time Dashboard**: Live visitor statistics and platform analytics
- **Content Publishing**: Blog post management with scheduling and SEO metadata
- **Ad Management**: AdSense integration with location-based ad placement
- **User Management**: Admin user creation and role-based access control
- **Site Configuration**: Dynamic site settings with logo, meta tags, and tracking codes

The migration successfully transforms TokRecharge from a static calculator tool into a comprehensive admin-managed platform with real-time analytics, content management, and scalable backend infrastructure.

## Admin Panel Modernization (July 2025)

### Modern Admin Layout Implementation  
- **Dark Sidebar Design**: Implemented modern dark slate sidebar navigation matching contemporary dashboard designs
- **Layout Architecture**: Created reusable AdminLayout component with responsive mobile support and collapsible sidebar
- **Navigation Structure**: Organized admin sections into logical groups (General, Management) with proper iconography
- **User Authentication State**: Integrated user profile display with role badges and secure logout functionality

### Dashboard Redesign
- **Statistics Cards**: Redesigned metric cards with gradient backgrounds, trending indicators, and color-coded categories
- **Performance Charts**: Enhanced bar charts and pie charts with modern color schemes and interactive tooltips  
- **Data Visualization**: Improved analytics display with country sessions, top pages table, and conversion metrics
- **Alert System**: Added warning notifications with styled alert components for system status

### UI/UX Improvements  
- **Consistent Design System**: Applied uniform styling across all admin pages using shadcn/ui components
- **Color Palette**: Updated to modern orange/blue/red gradient scheme matching contemporary dashboard aesthetics  
- **Responsive Design**: Ensured mobile-first approach with collapsible navigation and touch-friendly interactions
- **Loading States**: Enhanced loading indicators with branded colors and smooth animations

### Component Architecture
- **Shared Layout**: Centralized admin layout component reducing code duplication across admin pages
- **Icon Integration**: Consistent use of Lucide React icons throughout the admin interface
- **Type Safety**: Maintained TypeScript integration across all new admin components
- **Accessibility**: Improved keyboard navigation and screen reader compatibility

The modernized admin panel provides a professional, intuitive interface for managing the TokRecharge platform while maintaining full functionality and security standards.