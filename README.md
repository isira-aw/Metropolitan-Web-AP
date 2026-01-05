# Metropolitan Admin Panel

A modern, responsive admin panel built with Next.js 14 for managing the Metropolitan website content.

## Features

- 🔐 **JWT Authentication** - Secure login with email/password
- 📊 **Content Management** - Full CRUD operations for Case Studies, News, and Testimonials
- 📝 **Form Management** - View and delete Inquiries and Job Applications
- 🔍 **Date Range Filtering** - Filter all content by date range
- 🖼️ **Base64 Image Upload** - Upload and preview images stored as Base64
- 📱 **Responsive Design** - Works seamlessly on desktop and mobile
- ⚡ **Fast Performance** - Built with Next.js App Router and React Query

## Tech Stack

- **Framework:** Next.js 14 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **State Management:** TanStack Query (React Query)
- **Forms:** React Hook Form + Zod validation
- **HTTP Client:** Axios
- **Icons:** Lucide React

## Getting Started

### Prerequisites

- Node.js 18+ installed
- Backend server running on `http://localhost:5000`

### Installation

1. Install dependencies:

```bash
npm install
```

2. Set up environment variables:

Create a `.env.local` file (already created):

```env
NEXT_PUBLIC_API_URL=http://localhost:5000
```

3. Run the development server:

```bash
npm run dev
```

The admin panel will be available at [http://localhost:3001](http://localhost:3001)

### Building for Production

```bash
npm run build
npm start
```

## Project Structure

```
admin-panel/
├── app/                      # Next.js App Router
│   ├── login/               # Login page
│   ├── register/            # Register page
│   ├── dashboard/           # Dashboard (protected)
│   │   ├── case-studies/   # Case studies management
│   │   ├── news/           # News management
│   │   ├── testimonials/   # Testimonials management
│   │   ├── inquiries/      # Inquiries management
│   │   └── job-applications/ # Job applications management
│   ├── layout.tsx          # Root layout
│   ├── page.tsx            # Home page (redirects)
│   └── providers.tsx       # React Query provider
├── components/              # Reusable components
│   ├── auth/               # Authentication components
│   ├── layout/             # Layout components
│   ├── shared/             # Shared UI components
│   └── forms/              # Form components
├── lib/                     # Utilities
│   ├── api-client.ts       # Axios configuration
│   └── utils.ts            # Helper functions
├── types/                   # TypeScript types
│   └── index.ts            # Type definitions
└── public/                  # Static assets
```

## Authentication

### First-Time Setup

1. Register the first admin user at `/register`
2. Only 2 admin users can be registered (backend restriction)
3. Login with email and password
4. JWT token is stored in localStorage

### Protected Routes

All dashboard routes require authentication. Unauthenticated users are redirected to `/login`.

## API Endpoints

The admin panel communicates with the backend API:

### Authentication
- `POST /api/admin/auth/register` - Register admin (max 2)
- `POST /api/admin/auth/login` - Login
- `GET /api/admin/auth/me` - Get current user

### Content Management
- Case Studies: `/api/admin/case-studies`
- News: `/api/admin/news`
- Testimonials: `/api/admin/testimonials`
- Inquiries: `/api/admin/inquiries`
- Job Applications: `/api/admin/job-applications`

All endpoints support:
- Date range filtering: `?fromDate=2024-01-01T00:00:00&toDate=2024-12-31T23:59:59`
- Pagination: `?page=1&limit=20`

## Development

### Code Style

- TypeScript for type safety
- Functional components with hooks
- Client components marked with `"use client"`
- Tailwind CSS for styling
- React Query for data fetching and caching

### Adding a New Feature

1. Create types in `types/index.ts`
2. Add API calls in `lib/api/`
3. Create pages in `app/dashboard/`
4. Build reusable components in `components/`

## Environment Variables

- `NEXT_PUBLIC_API_URL` - Backend API URL (default: http://localhost:5000)

## Troubleshooting

### Cannot connect to backend

- Ensure backend is running on port 5000
- Check `.env.local` has correct `NEXT_PUBLIC_API_URL`
- Verify CORS is enabled on backend

### Authentication issues

- Clear localStorage: `localStorage.clear()`
- Check JWT token is valid
- Verify backend `/api/admin/auth/*` endpoints are accessible

## License

Private - Metropolitan Company
