# TeamMate 🤝

A modern, scalable team registration platform built with Next.js, MongoDB, and TypeScript. TeamMate provides an elegant interface for managing team registrations and individual participant sign-ups for events, competitions, or projects.

![Next.js](https://img.shields.io/badge/Next.js-15.5-black?style=flat-square&logo=next.js)
![React](https://img.shields.io/badge/React-19.0-blue?style=flat-square&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=flat-square&logo=typescript)
![MongoDB](https://img.shields.io/badge/MongoDB-8.8-green?style=flat-square&logo=mongodb)
![License](https://img.shields.io/badge/License-MIT-yellow?style=flat-square)

## ✨ Features

- **Team Registration**: Register teams with up to 4 members
- **Individual Sign-up**: Unassigned participants can register individually
- **Real-time Validation**: Instant feedback on registration status
- **Responsive Design**: Beautiful UI that works seamlessly on all devices
- **Modern Tech Stack**: Built with the latest versions of Next.js, React, and TypeScript
- **MongoDB Integration**: Robust database management with Mongoose ODM
- **Form State Management**: Advanced form handling with loading and success states
- **Elegant Animations**: Smooth transitions and visual feedback
- **Dark Theme**: Eye-friendly dark mode UI with gradient accents

## 🚀 Getting Started

### Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v20 or higher)
- **npm** or **yarn** package manager
- **MongoDB** (local installation or MongoDB Atlas account)

### Installation

1. **Clone the repository**

```bash
git clone https://github.com/yourusername/teammate.git
cd teammate
```

2. **Install dependencies**

```bash
npm install
# or
yarn install
```

3. **Set up environment variables**

Create a `.env.local` file in the root directory and add your MongoDB connection string:

```env
MONGODB_URI=mongodb://localhost:27017/teammate
# Or for MongoDB Atlas:
# MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/teammate?retryWrites=true&w=majority
```

4. **Run the development server**

```bash
npm run dev
# or
yarn dev
```

5. **Open your browser**

Navigate to [http://localhost:3000](http://localhost:3000) to see the application.

## 📁 Project Structure

```
teammate/
├── src/
│   ├── app/
│   │   ├── api/
│   │   │   ├── debug/
│   │   │   │   └── drop-index/
│   │   │   │       └── route.ts        # Debug endpoint for index management
│   │   │   ├── register/
│   │   │   │   └── route.ts            # Team registration API
│   │   │   └── unassigned/
│   │   │       └── route.ts            # Individual registration API
│   │   ├── globals.css                 # Global styles
│   │   ├── layout.tsx                  # Root layout
│   │   └── page.tsx                    # Home page
│   ├── components/
│   │   ├── RegistrationForm.tsx        # Team registration form
│   │   └── UnassignedForm.tsx          # Individual registration form
│   ├── lib/
│   │   └── mongodb.ts                  # MongoDB connection handler
│   └── models/
│       ├── Team.ts                     # Team mongoose schema
│       └── Unassigned.ts               # Unassigned participant schema
├── .env.local                          # Environment variables (not in repo)
├── next.config.ts                      # Next.js configuration
├── tailwind.config.ts                  # Tailwind CSS configuration
├── tsconfig.json                       # TypeScript configuration
└── package.json                        # Project dependencies
```

## 🛠️ Tech Stack

### Frontend
- **[Next.js 15.5](https://nextjs.org/)** - React framework with App Router
- **[React 19](https://react.dev/)** - UI library
- **[TypeScript 5](https://www.typescriptlang.org/)** - Type-safe JavaScript
- **[Tailwind CSS 3.4](https://tailwindcss.com/)** - Utility-first CSS framework
- **[Lucide React](https://lucide.dev/)** - Beautiful icon library
- **[clsx](https://github.com/lukeed/clsx)** & **[tailwind-merge](https://github.com/dcastil/tailwind-merge)** - Conditional class management

### Backend
- **[MongoDB](https://www.mongodb.com/)** - NoSQL database
- **[Mongoose 8.8](https://mongoosejs.com/)** - MongoDB ODM
- **[Next.js API Routes](https://nextjs.org/docs/app/building-your-application/routing/route-handlers)** - Serverless API endpoints

## 📡 API Endpoints

### POST `/api/register`

Register a new team with members.

**Request Body:**
```json
{
  "teamName": "Team Alpha",
  "members": ["John Doe", "Jane Smith", "Bob Johnson", "Alice Williams"]
}
```

**Response (201):**
```json
{
  "status": "ok",
  "data": {
    "_id": "...",
    "teamName": "Team Alpha",
    "members": ["John Doe", "Jane Smith", "Bob Johnson", "Alice Williams"],
    "createdAt": "2026-06-30T..."
  }
}
```

### POST `/api/unassigned`

Register an individual participant without a team.

**Request Body:**
```json
{
  "name": "John Doe"
}
```

**Response (201):**
```json
{
  "status": "ok",
  "data": {
    "_id": "...",
    "name": "John Doe",
    "createdAt": "2026-06-30T..."
  }
}
```

### POST `/api/debug/drop-index`

Debug endpoint to manually drop obsolete database indexes.

## 🎨 UI Components

### RegistrationForm
- Team name input (required)
- 4 member name inputs (minimum 1 member required)
- Real-time validation
- Success/error status display
- Form locking after successful registration
- Loading states with animated spinners

### UnassignedForm
- Single name input for individual registration
- Similar validation and feedback patterns
- Responsive layout

## 🔧 Configuration

### MongoDB Connection

The MongoDB connection is configured in `src/lib/mongodb.ts` with automatic connection caching and reconnection handling:

```typescript
// src/lib/mongodb.ts
import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI!;

// Connection caching logic...
```

### Tailwind CSS

Custom theme configuration in `tailwind.config.ts`:

```typescript
// Custom colors, animations, and utilities
```

## 🚢 Deployment

### Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new).

1. Push your code to a Git repository (GitHub, GitLab, Bitbucket)
2. Import your repository on Vercel
3. Add your environment variables in Vercel project settings
4. Deploy!

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/yourusername/teammate)

### Environment Variables

Make sure to set the following environment variables in your deployment:

- `MONGODB_URI` - Your MongoDB connection string

## 📝 Scripts

```bash
# Development server with hot-reload
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Run ESLint
npm run lint
```

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👤 Author

**Shihab Shahriar Rashu**

## 🙏 Acknowledgments

- Next.js team for the amazing framework
- Vercel for seamless deployment
- MongoDB team for the robust database solution
- Tailwind CSS for the beautiful styling system
- Lucide for the elegant icons

---

<div align="center">

Made with ❤️ using Next.js and TypeScript

**[⬆ Back to Top](#teammate-)**

</div>
