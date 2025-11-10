# Rankaroo - Architecture Diagram (Whiteboard Format)

## System Architecture Overview

```
┌─────────────────────────────────────────────────────────────────┐
│                         CLIENT LAYER                            │
│                                                                   │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │                    React Frontend                         │  │
│  │  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐   │  │
│  │  │   Home Page  │  │   Category   │  │  Rank Items  │   │  │
│  │  │  Component   │  │  Component   │  │  Component   │   │  │
│  │  └──────────────┘  └──────────────┘  └──────────────┘   │  │
│  │                                                           │  │
│  │  ┌──────────────────────────────────────────────────┐   │  │
│  │  │         React Context API (State Management)      │   │  │
│  │  │  - User State  - Categories  - Items  - Rankings │   │  │
│  │  └──────────────────────────────────────────────────┘   │  │
│  │                                                           │  │
│  │  ┌──────────────────────────────────────────────────┐   │  │
│  │  │              React Router (Navigation)             │   │  │
│  │  └──────────────────────────────────────────────────┘   │  │
│  └───────────────────────┬─────────────────────────────────┘  │
│                          │                                      │
│                          │ HTTP/REST API (JSON)                │
│                          │ JWT Token in Headers                 │
└──────────────────────────┼──────────────────────────────────────┘
                           │
                           ▼
┌─────────────────────────────────────────────────────────────────┐
│                        API LAYER                                 │
│                                                                   │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │                  Express.js Server                        │  │
│  │                                                            │  │
│  │  ┌────────────────────────────────────────────────────┐  │  │
│  │  │              Middleware Layer                        │  │  │
│  │  │  - CORS  - Body Parser  - JWT Auth  - Rate Limit  │  │  │
│  │  └────────────────────────────────────────────────────┘  │  │
│  │                                                            │  │
│  │  ┌────────────────────────────────────────────────────┐  │  │
│  │  │                  Route Handlers                     │  │  │
│  │  │  /api/auth/*      - Authentication                 │  │  │
│  │  │  /api/users/*     - User management                │  │  │
│  │  │  /api/categories/* - Category CRUD                │  │  │
│  │  │  /api/items/*     - Item management                │  │  │
│  │  │  /api/rankings/*  - Ranking operations            │  │  │
│  │  └────────────────────────────────────────────────────┘  │  │
│  │                                                            │  │
│  │  ┌────────────────────────────────────────────────────┐  │  │
│  │  │                  Controllers                        │  │  │
│  │  │  - Auth Controller  - Category Controller           │  │  │
│  │  │  - Item Controller  - Ranking Controller           │  │  │
│  │  └────────────────────────────────────────────────────┘  │  │
│  │                                                            │  │
│  │  ┌────────────────────────────────────────────────────┐  │  │
│  │  │                  Services Layer                     │  │  │
│  │  │  - Business Logic  - Data Validation              │  │  │
│  │  │  - Error Handling  - Response Formatting          │  │  │
│  │  └────────────────────────────────────────────────────┘  │  │
│  └───────────────────────┬─────────────────────────────────┘  │
│                          │                                      │
│                          │ Mongoose ODM                         │
└──────────────────────────┼──────────────────────────────────────┘
                           │
                           ▼
┌─────────────────────────────────────────────────────────────────┐
│                       DATA LAYER                                │
│                                                                   │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │              MongoDB Atlas (Cloud Database)               │  │
│  │                                                            │  │
│  │  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐   │  │
│  │  │   Users      │  │  Categories  │  │    Items     │   │  │
│  │  │ Collection   │  │  Collection  │  │  Collection  │   │  │
│  │  │              │  │              │  │              │   │  │
│  │  │ - _id        │  │ - _id        │  │ - _id        │   │  │
│  │  │ - email      │  │ - userId     │  │ - categoryId │   │  │
│  │  │ - username   │  │ - name       │  │ - userId     │   │  │
│  │  │ - password   │  │ - type       │  │ - name       │   │  │
│  │  │ - createdAt  │  │ - desc      │  │ - ranking    │   │  │
│  │  └──────────────┘  └──────────────┘  └──────────────┘   │  │
│  │                                                            │  │
│  │  ┌──────────────┐                                        │  │
│  │  │  Rankings     │  (Future: Social Features)            │  │
│  │  │  Collection   │                                        │  │
│  │  └──────────────┘                                        │  │
│  └──────────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────────┘
```

## Technology Stack Breakdown

### Frontend Stack
```
React 18.2
├── React Router (Navigation)
├── Context API (State Management)
├── CSS Modules (Styling)
└── Axios/Fetch (API Calls)
```

### Backend Stack
```
Node.js 18+
├── Express.js (Web Framework)
│   ├── express-validator (Input Validation)
│   ├── express-rate-limit (Rate Limiting)
│   └── cors (Cross-Origin Resource Sharing)
├── Mongoose (ODM)
├── jsonwebtoken (Authentication)
└── bcryptjs (Password Hashing)
```

### Database
```
MongoDB Atlas
├── Users Collection
├── Categories Collection
├── Items Collection
└── Rankings Collection (Future)
```

## Data Flow Example: Creating a Category

```
1. User Input
   └─> React Component (CreateCategory.js)
       └─> Form Submit Event

2. Frontend API Call
   └─> Axios/Fetch Request
       └─> POST /api/categories
           └─> Headers: { Authorization: "Bearer <JWT>" }
               └─> Body: { name, description, categoryType }

3. Backend Processing
   └─> Express Route Handler
       └─> JWT Middleware (Verify Token)
           └─> Validation Middleware (Check Input)
               └─> Category Controller
                   └─> Category Service
                       └─> Mongoose Model
                           └─> MongoDB Query

4. Database Operation
   └─> MongoDB Atlas
       └─> Insert Document into Categories Collection
           └─> Return Created Document

5. Response Flow
   └─> Controller → Service → Route Handler
       └─> JSON Response: { success: true, category: {...} }
           └─> Frontend Receives Response
               └─> Update React State
                   └─> UI Updates (Show New Category)
```

## Authentication Flow

```
┌─────────────┐
│   User      │
│  Login/Reg  │
└──────┬──────┘
       │
       ▼
┌─────────────────┐
│  React Frontend │
│  Auth Form      │
└──────┬──────────┘
       │ POST /api/auth/login
       │ { email, password }
       ▼
┌─────────────────┐
│ Express Backend │
│ Auth Controller │
└──────┬──────────┘
       │
       ├─> Validate Input
       ├─> Check User in DB
       ├─> Compare Password (bcrypt)
       └─> Generate JWT Token
           │
           ▼
┌─────────────────┐
│  Response       │
│ { token, user } │
└──────┬──────────┘
       │
       ▼
┌─────────────────┐
│  Frontend       │
│  Store Token    │
│  (localStorage) │
└─────────────────┘
```

## Component Hierarchy

```
App.js
├── Navbar Component
│   ├── Logo
│   └── Navigation Links
│
└── Routes
    ├── Home Component
    │   ├── Hero Section
    │   ├── Features Grid
    │   └── Info Section
    │
    ├── CreateCategory Component
    │   ├── Category Form
    │   │   ├── Name Input
    │   │   ├── Description Textarea
    │   │   └── Type Select
    │   └── Preview Card
    │
    └── RankItems Component
        ├── Category Selection
        ├── Add Item Form
        └── Ranked Items List
            └── Item Card (x N)
                ├── Rank Badge
                ├── Item Info
                └── Ranking Display
```

## API Endpoints Structure

```
/api
├── /auth
│   ├── POST /register    - Create new user
│   ├── POST /login        - Authenticate user
│   └── GET  /me          - Get current user
│
├── /users
│   ├── GET    /:id       - Get user profile
│   └── PUT    /:id       - Update user profile
│
├── /categories
│   ├── GET    /          - Get user's categories
│   ├── POST   /          - Create category
│   ├── GET    /:id       - Get category details
│   ├── PUT    /:id       - Update category
│   └── DELETE /:id       - Delete category
│
├── /items
│   ├── GET    /category/:categoryId  - Get items in category
│   ├── POST   /                      - Add item to category
│   ├── PUT    /:id                   - Update item
│   └── DELETE /:id                    - Remove item
│
└── /rankings
    ├── PUT    /:itemId   - Update item ranking
    └── GET    /:itemId   - Get item rankings (future: social)
```

## Deployment Architecture

```
┌─────────────────────────────────────────────────────────┐
│                    PRODUCTION                            │
│                                                           │
│  ┌──────────────┐         ┌──────────────┐              │
│  │   Vercel/    │         │   Heroku/    │              │
│  │   Netlify    │         │   Railway    │              │
│  │              │         │              │              │
│  │  React App   │◄───────►│ Express API  │              │
│  │  (Frontend)  │  HTTPS  │  (Backend)   │              │
│  └──────────────┘         └──────┬───────┘              │
│                                   │                       │
│                                   │ MongoDB Connection    │
│                                   ▼                       │
│                          ┌──────────────┐                │
│                          │ MongoDB Atlas │                │
│                          │  (Database)   │                │
│                          └──────────────┘                │
└─────────────────────────────────────────────────────────┘
```

## Development vs Production

```
DEVELOPMENT:
localhost:3000 (React)  ←→  localhost:5000 (Express)  ←→  MongoDB Atlas

PRODUCTION:
app.vercel.app (React)  ←→  api.herokuapp.com (Express)  ←→  MongoDB Atlas
```

