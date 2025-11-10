# Rankaroo - Technical Architecture & Development Plan

## Executive Summary

This document outlines the complete technical architecture for the Rankaroo application - a category creation and item ranking platform. The architecture is designed to be scalable, maintainable, and efficient for an MVP that will later expand into a full-featured social ranking platform.

---

## Technology Stack Overview

### Frontend Stack

**Primary Framework: React 18.2+**
- **Why React?**
  - Component-based architecture perfect for reusable UI elements (Category cards, Item cards, Ranking displays)
  - Large ecosystem and community support
  - Excellent for building interactive UIs with state management
  - React Router for seamless navigation
  - Easy to scale and maintain

**State Management: React Context API + useState/useReducer**
- **Why Context API over Redux?**
  - Simpler for MVP scope - no need for complex state management yet
  - Built into React, no additional dependencies
  - Sufficient for user data, categories, and items
  - Can migrate to Redux/Zustand later if needed

**Styling: CSS3 with CSS Modules**
- **Why CSS Modules?**
  - Scoped styling prevents conflicts
  - No build-time overhead
  - Easy to maintain and debug
  - Can upgrade to styled-components or Tailwind later if needed

**Build Tool: Create React App (CRA)**
- **Why CRA?**
  - Zero configuration setup
  - Fast development iteration
  - Built-in webpack, Babel, ESLint
  - Easy to eject later if custom config needed

---

## Backend Stack

### Runtime: Node.js 18+ with Express.js

**Why Node.js?**
- JavaScript across frontend and backend (code reuse, single language)
- Excellent for I/O-heavy operations (API requests, database queries)
- Large npm ecosystem
- Fast development cycle
- Great for real-time features (future WebSocket support)

**Why Express.js?**
- Minimal, flexible framework
- Large middleware ecosystem
- RESTful API design
- Easy to understand and maintain
- Industry standard for Node.js backends

### API Architecture: RESTful API

**Why REST?**
- Simple, stateless design
- Easy to understand and document
- Works well with React frontend
- Can add GraphQL later if query complexity increases

**API Endpoints Structure:**
```
/api/auth/*          - Authentication endpoints
/api/users/*         - User management
/api/categories/*    - Category CRUD operations
/api/items/*         - Item management
/api/rankings/*      - Ranking operations
```

---

## Database: MongoDB with Mongoose ODM

**Why MongoDB?**
- **Flexible Schema**: Perfect for MVP - categories and items can have varying structures
- **Document-Based**: Natural fit for JavaScript/Node.js stack
- **Scalability**: Easy horizontal scaling when user base grows
- **JSON-like Documents**: Seamless integration with React frontend
- **Free Tier**: MongoDB Atlas offers generous free tier for MVP

**Why Mongoose?**
- Schema validation and modeling
- Built-in middleware (pre/post hooks)
- Query building and population
- Type casting and validation
- Easy relationships between collections

**Database Schema Design:**

```javascript
// Users Collection
{
  _id: ObjectId,
  email: String (unique, required),
  username: String (unique, required),
  passwordHash: String (required),
  createdAt: Date,
  updatedAt: Date
}

// Categories Collection
{
  _id: ObjectId,
  userId: ObjectId (ref: User),
  name: String (required),
  description: String,
  categoryType: String (enum: ['Movies', 'Songs', 'Books', ...]),
  itemCount: Number (default: 0),
  createdAt: Date,
  updatedAt: Date
}

// Items Collection
{
  _id: ObjectId,
  categoryId: ObjectId (ref: Category),
  userId: ObjectId (ref: User),
  name: String (required),
  description: String,
  ranking: Number (1-10, required),
  metadata: Object (flexible - can store movie year, song artist, etc.),
  createdAt: Date,
  updatedAt: Date
}

// Rankings Collection (for future social features)
{
  _id: ObjectId,
  itemId: ObjectId (ref: Item),
  userId: ObjectId (ref: User),
  rating: Number (1-10),
  createdAt: Date
}
```

**Indexes:**
- Users: `email` (unique), `username` (unique)
- Categories: `userId`, `categoryType`
- Items: `categoryId`, `userId`, `ranking`
- Rankings: `itemId`, `userId` (compound unique)

---

## Authentication: JWT (JSON Web Tokens)

**Why JWT over Firebase Auth?**
- **Full Control**: Custom authentication logic
- **No Vendor Lock-in**: Not tied to Google services
- **Stateless**: No server-side session storage needed
- **Scalable**: Works well with microservices architecture
- **Cost**: No per-user costs (Firebase charges after free tier)
- **Flexibility**: Easy to add OAuth providers later (Google, GitHub, etc.)

**Authentication Flow:**
1. User registers/logs in → Backend validates credentials
2. Backend generates JWT token with user ID and expiration
3. Token stored in localStorage or httpOnly cookie
4. Frontend includes token in Authorization header for API requests
5. Backend middleware validates token on protected routes

**Security Measures:**
- Password hashing with bcrypt (salt rounds: 10)
- JWT expiration (7 days for refresh, 1 hour for access)
- CORS configuration for API security
- Rate limiting on auth endpoints
- Input validation and sanitization

---

## Why NOT MERN Stack? (MongoDB, Express, React, Node.js)

**Actually, we ARE using MERN!** But let's clarify:

**MongoDB** - Document database
**Express** - Web framework
**React** - Frontend framework
**Node.js** - Runtime environment

**However, we're making some modifications:**
- **No Redux** (using Context API for MVP)
- **JWT instead of Passport.js** (simpler for MVP)
- **Mongoose instead of native MongoDB driver** (better validation)

**Why MERN is perfect for this project:**
1. **JavaScript Everywhere**: Single language reduces context switching
2. **Rapid Development**: Fast iteration for MVP
3. **JSON Data Flow**: MongoDB → Express → React (all JSON)
4. **Large Community**: Extensive resources and tutorials
5. **Scalability Path**: Easy to add microservices, caching, etc.

---

## File Storage

**For MVP: No file storage needed initially**

**Future: AWS S3 or Cloudinary**
- User profile pictures
- Category cover images
- Item thumbnails (movie posters, album covers)
- **Why S3/Cloudinary?**
  - Scalable object storage
  - CDN integration
  - Image optimization APIs
  - Cost-effective for large files

---

## Hosting & Deployment

### Frontend: Vercel or Netlify
**Why?**
- Free tier for MVP
- Automatic deployments from Git
- Built-in CDN
- Easy custom domain setup
- Optimized for React apps

### Backend: Heroku or Railway
**Why Heroku?**
- Easy deployment (git push)
- Free tier available (with limitations)
- Built-in PostgreSQL option (though we'll use MongoDB Atlas)
- Add-ons ecosystem

**Why Railway (Alternative)?**
- More generous free tier
- Better for Node.js apps
- Simpler pricing model

### Database: MongoDB Atlas
**Why?**
- Free tier: 512MB storage
- Automatic backups
- Global clusters
- Built-in security
- Easy scaling

---

## Development Workflow

### Version Control: Git + GitHub
- Main branch: Production-ready code
- Develop branch: Integration branch
- Feature branches: Individual features

### Environment Variables
```
# Frontend (.env)
REACT_APP_API_URL=http://localhost:5000/api

# Backend (.env)
PORT=5000
MONGODB_URI=mongodb+srv://...
JWT_SECRET=your-secret-key
NODE_ENV=development
```

### API Communication

**Frontend → Backend:**
- Axios or Fetch API for HTTP requests
- Request interceptors for JWT token injection
- Response interceptors for error handling
- Loading states and error boundaries

**Example API Call:**
```javascript
// Frontend
const createCategory = async (categoryData) => {
  const token = localStorage.getItem('token');
  const response = await fetch('/api/categories', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify(categoryData)
  });
  return response.json();
};
```

---

## Integration Flow Diagram

```
┌─────────────────┐
│   React App     │
│   (Frontend)    │
│                 │
│  - Components   │
│  - State Mgmt   │
│  - Routing      │
└────────┬────────┘
         │ HTTP/REST API
         │ (JSON)
         ▼
┌─────────────────┐
│  Express Server │
│   (Backend)     │
│                 │
│  - Routes       │
│  - Middleware   │
│  - Controllers  │
│  - Validation   │
└────────┬────────┘
         │
         │ Mongoose ODM
         ▼
┌─────────────────┐
│  MongoDB Atlas  │
│   (Database)    │
│                 │
│  - Users        │
│  - Categories   │
│  - Items        │
│  - Rankings     │
└─────────────────┘
```

---

## Security Considerations

1. **Authentication & Authorization**
   - JWT tokens with expiration
   - Password hashing (bcrypt)
   - Protected API routes
   - User ownership validation

2. **Data Validation**
   - Input sanitization (express-validator)
   - MongoDB injection prevention (Mongoose)
   - XSS protection (React escapes by default)
   - CORS configuration

3. **API Security**
   - Rate limiting (express-rate-limit)
   - HTTPS in production
   - Environment variables for secrets
   - No sensitive data in frontend

---

## Performance Optimizations

### Frontend:
- React.memo for expensive components
- Code splitting with React.lazy()
- Image lazy loading
- Debounced search inputs
- Optimistic UI updates

### Backend:
- Database indexing (MongoDB indexes)
- Query optimization (select only needed fields)
- Pagination for large datasets
- Caching frequently accessed data (Redis - future)

### Database:
- Compound indexes for common queries
- Aggregation pipelines for complex operations
- Connection pooling

---

## Testing Strategy

### Frontend Testing:
- **Jest + React Testing Library**
  - Component unit tests
  - Integration tests
  - User interaction tests

### Backend Testing:
- **Jest + Supertest**
  - API endpoint tests
  - Database integration tests
  - Authentication flow tests

### E2E Testing (Future):
- **Cypress or Playwright**
  - Full user flow tests
  - Cross-browser testing

---

## Future Enhancements (Post-MVP)

1. **Real-time Features**
   - WebSocket (Socket.io) for live rankings
   - Real-time collaboration on categories

2. **Search & Discovery**
   - Elasticsearch for full-text search
   - Recommendation engine (collaborative filtering)

3. **Social Features**
   - User profiles
   - Follow system
   - Comments and discussions
   - Sharing categories

4. **Advanced Features**
   - GraphQL API layer
   - Redis caching layer
   - Microservices architecture
   - CDN for static assets

---

## Development Timeline

### Phase 1: MVP Backend (Week 1-2)
- [ ] Set up Express server
- [ ] MongoDB connection and models
- [ ] Authentication endpoints
- [ ] Category CRUD APIs
- [ ] Item CRUD APIs
- [ ] Ranking APIs

### Phase 2: Frontend Integration (Week 3)
- [ ] Connect React to backend APIs
- [ ] Implement authentication flow
- [ ] Category creation functionality
- [ ] Item ranking functionality
- [ ] Error handling and loading states

### Phase 3: Polish & Deploy (Week 4)
- [ ] Testing
- [ ] Bug fixes
- [ ] Performance optimization
- [ ] Deployment setup
- [ ] Documentation

---

## Dependencies Summary

### Frontend:
```json
{
  "react": "^18.2.0",
  "react-dom": "^18.2.0",
  "react-router-dom": "^6.20.0",
  "axios": "^1.6.0"
}
```

### Backend:
```json
{
  "express": "^4.18.2",
  "mongoose": "^8.0.0",
  "jsonwebtoken": "^9.0.2",
  "bcryptjs": "^2.4.3",
  "express-validator": "^7.0.1",
  "cors": "^2.8.5",
  "dotenv": "^16.3.1",
  "express-rate-limit": "^7.1.0"
}
```

---

## Conclusion

This architecture provides:
- **Scalability**: Can grow from MVP to full-featured app
- **Maintainability**: Clean separation of concerns
- **Developer Experience**: Modern tools and practices
- **Cost-Effective**: Free tiers for MVP development
- **Flexibility**: Easy to add features and services

The MERN stack (with modifications) is the perfect choice for this project because it offers rapid development, JavaScript consistency, and a clear path to scale as the application grows.

