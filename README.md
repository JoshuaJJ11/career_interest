# Rankaroo - Category & Ranking App (MVP)

A React-based MVP application for creating categories and ranking items. This is a frontend-only implementation with visible UI features (non-functional for now).

## Features

### 1. Create Category
- Create custom categories with names, descriptions, and types
- Preview category before creation
- Support for multiple category types (Movies, Songs, Books, Food, etc.)

### 2. Rank Items
- Select a category to view and manage items
- Add new items to categories
- Assign rankings (1-10 scale) to items
- View automatically sorted ranked lists
- Visual ranking display with stars

## Tech Stack

- **React 18** - UI framework
- **React Router** - Navigation
- **CSS3** - Styling with modern gradients and animations

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm start
```

3. Open [http://localhost:3000](http://localhost:3000) in your browser

## Project Structure

```
career_interest/
├── public/
│   └── index.html
├── src/
│   ├── components/
│   │   ├── Home.js
│   │   ├── Home.css
│   │   ├── CreateCategory.js
│   │   ├── CreateCategory.css
│   │   ├── RankItems.js
│   │   └── RankItems.css
│   ├── App.js
│   ├── App.css
│   ├── index.js
│   └── index.css
├── package.json
└── README.md
```

## MVP Status

This is a **frontend-only MVP** with visible UI features. The following features are visible but not yet functional:

- Category creation form (UI complete)
- Category preview (UI complete)
- Item ranking interface (UI complete)
- Category selection (UI complete)
- Backend integration (coming soon)
- Data persistence (coming soon)
- User authentication (coming soon)

## Next Steps (Post-MVP)

- Backend API integration
- Database setup (MongoDB)
- User authentication
- Data persistence
- Social features
- Recommendations system

## Available Scripts

- `npm start` - Runs the app in development mode
- `npm build` - Builds the app for production
- `npm test` - Launches the test runner
