# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Saral is a Tutor Fee Tracking Platform that enables local tuition tutors to track which students have paid fees. The platform does not process payments - it only tracks payment status marked manually by tutors.

## Tech Stack

- **Frontend**: React with Vite (in `/client`)
- **Backend**: Node.js + Express (in `/server`)
- **Database**: MongoDB Atlas
- **Authentication**: Clerk (Google OAuth, Email OTP)

## Commands

### Client
```bash
cd client
npm install          # Install dependencies
npm run dev          # Start development server
npm run build        # Build for production
npm run preview      # Preview production build
```

Client runs on `http://localhost:5173` by default.

### Server
```bash
cd server
npm install          # Install dependencies
npm run dev          # Start development server with auto-reload
npm start            # Start production server
```

Server runs on `http://localhost:3000` by default.

### Environment Setup

**Client** (`client/.env`):
- `VITE_CLERK_PUBLISHABLE_KEY` - From Clerk dashboard
- `VITE_API_URL` - Backend API URL (default: `http://localhost:3000/api`)

**Server** (`server/.env`):
- `MONGODB_URI` - MongoDB Atlas connection string
- `CLERK_SECRET_KEY` - From Clerk dashboard
- `CLERK_PUBLISHABLE_KEY` - From Clerk dashboard

## API Structure

### Protected Routes (require Clerk auth)
- `POST /api/onboarding` - Complete tutor profile
- `GET /api/me` - Get current tutor
- `GET/POST /api/students` - List/add students
- `GET/PUT/DELETE /api/students/:id` - Student operations
- `GET/POST /api/students/:studentId/payments` - Payment records
- `PUT /api/payments/:id` - Update payment

### Public Routes (no auth)
- `GET /api/public/:publicToken` - Student payment view
- `GET /health` - Health check

## Key Architecture Decisions

### Authentication vs Authorization
- Clerk handles identity verification, session management, OAuth/OTP
- Platform handles user authorization, subscription enforcement, feature access control
- Middleware chain: `requireAuth() → loadTutor → requireTutor → requireActiveSubscription`

### Subscription Enforcement
- `requireActiveSubscription` middleware blocks write operations for expired subscriptions
- `checkStudentLimit` middleware enforces plan-based student limits
- Read operations always allowed (even when locked)

### Data Model
- **Tutor**: Links to clerkUserId, manages students, has subscription plan
- **Student**: Belongs to tutor, has monthlyFee and publicToken for sharing
- **PaymentRecord**: Tracks monthly payment status (Paid/Pending) and method (Cash/UPI)

## UI/UX Guidelines

### Mobile-First Design
- All UI must be designed mobile-first as most tutors will use mobile phones for convenience
- Design for small screens first, then scale up for tablets/desktop
- Touch-friendly tap targets (minimum 44px)
- Avoid hover-dependent interactions
- Use responsive layouts that work well on 320px+ widths

## Development Constraints

1. Do not introduce new user roles beyond tutor
2. Do not automate payment processing or verification
3. Do not add receipts, invoices, or GST features
4. Do not extend scope beyond PRODUCT_SCOPE.md
5. Default to manual workflows over automation
6. Always design UI mobile-first

Refer to `PRODUCT_SCOPE.md` for the complete product specification.
