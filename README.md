# AurumLK 🪙

AurumLK is a modern, responsive **Gold Loan Comparison Platform** built using a monorepo structure. It enables customers to browse, filter, compare, and inquire about gold loan offers from different providers, while allowing business users to manage their branches, offers, and client inquiries.

---

## 🏗️ Project Architecture

The project is structured as a `pnpm` workspace monorepo:
* **`frontend/`**: A React application built with TypeScript, Vite, Tailwind CSS, and Material-UI (MUI) icons.
* **`backend/`**: An Express server built with TypeScript, Prisma ORM, and PostgreSQL (or SQLite).

---

## 🛠️ Tech Stack

### Frontend
- **Framework**: React (with Vite)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Icons**: Lucide React & MUI Icons
- **HTTP Client**: Native Fetch API

### Backend
- **Framework**: Express.js
- **Language**: TypeScript
- **Database**: PostgreSQL (Production) / SQLite (Development) via Prisma ORM
- **Auth**: JWT (JSON Web Tokens) & bcrypt
- **Mailing**: Nodemailer (with Ethereal Mail fallback for development)

---

## 🌟 Key Features (What It Can Do)

AurumLK has dedicated features tailored to three distinct user roles:

### 👤 For Customers (Borrowers)
* **Gold Loan Calculator**: Instantly calculate potential loan amounts, interest rates, tenure options, and total repayment estimates based on gold weight/karats.
* **Smart Search & Filter**: Find financial centers and branches by city, gold loan schemes, interest rates, or maximum loan amounts.
* **Side-by-Side Comparison**: Select multiple gold loan schemes to compare interest rates, tenures, processing fees, and eligibility side-by-side.
* **Direct Inquiries**: Submit official inquiries to specific branches or providers. Track inquiry statuses (`New`, `Contacted`, `Completed`) in your profile dashboard.

### 🏢 For Business Users (Gold Loan Providers)
* **Performance Dashboard**: Overview of current active offers, registered branch counts, and pending inquiries.
* **Branch Management**: Create, update, or remove branch locations, opening hours, and contact details.
* **Offer/Scheme Management**: Manage gold loan products, updating terms, interest rates, eligibility criteria, and active/inactive status.
* **Inquiry Manager**: View customer inquiries, retrieve client contact details, and update process statuses as they are serviced.

### 🔑 For Administrators
* **User Management**: View profiles of all registered customers, businesses, and administrators.
* **Business Verification**: Review registrations of new business providers and approve or reject them to control platform access.
* **Platform Metrics**: View global platform statistics.

---

## 🚀 Getting Started

### Prerequisites
Make sure you have [Node.js](https://nodejs.org/) (v18+) and [pnpm](https://pnpm.io/) installed.

### 1. Installation
Clone the repository and install dependencies from the root directory:
```bash
pnpm install
```

### 2. Database Initialization
Generate the Prisma client, push database tables, and seed initial data:
```bash
# Generate the Prisma Client
pnpm db:generate

# Push the schema to your database (local or cloud)
# Note: Ensure DATABASE_URL is configured in backend/.env before running
npx prisma db push

# Seed mock gold loan offers, centers, and branches
pnpm db:seed
```

### 3. Environment Variables Configuration

#### Backend Configuration (`backend/.env`)
Create or edit the `backend/.env` file. You can choose to run with SQLite or PostgreSQL:

**For Cloud PostgreSQL (Production - Recommended):**
```env
DATABASE_URL="postgresql://username:password@hostname:port/dbname?sslmode=require"
JWT_SECRET="generate_a_secure_jwt_secret_key_locally"
```

**For Local SQLite (Development):**
*Update `provider = "sqlite"` in `backend/prisma/schema.prisma` first.*
```env
DATABASE_URL="file:./dev.db"
JWT_SECRET="generate_a_secure_jwt_secret_key_locally"
```

#### Frontend Configuration (`frontend/.env`)
Create `frontend/.env` to configure custom server URLs:
```env
VITE_API_URL="http://localhost:4000"
```

---

## 💻 Running the Application

You can manage all tasks directly from the monorepo root:

### Start Development Servers
```bash
# Run both frontend and backend dev servers (in separate terminal tabs)
pnpm dev:backend
pnpm dev:frontend
```

### Manage Database & Prisma
```bash
# Start Prisma Studio to view database records in your browser
pnpm prisma:studio

# Run database seed again
pnpm db:seed
```

---

## 🌐 Hosting & Deployment

AurumLK is fully hosted and running live in the cloud:

*   **Live Web Application : [https://aurumlk-app.vercel.app](https://aurumlk-app.vercel.app)

---

### Cloud Setup & Configuration

This project is configured for serverless deployment on **Vercel** (for both frontend and backend) using a hosted **PostgreSQL** database:

#### 1. Database Configuration
* Host a serverless PostgreSQL database on Neon.tech.
* Push database tables: `npx prisma db push`
* Seed initial database values: `pnpm db:seed`

#### 2. Backend Deployment (Vercel)
* Target folder: `/backend`
* Framework Preset: Express
* Environment Variables required:
  * `DATABASE_URL`: *(Your PostgreSQL connection string)*
  * `JWT_SECRET`: *(Your authentication JWT secret key)*

#### 3. Frontend Deployment (Vercel)
* Target folder: `/frontend`
* Framework Preset: Vite
* Environment Variables required:
  * `VITE_API_URL`: `https://aurumlk.vercel.app`

---

## 👥 Default Test Credentials

Seeding the database (`pnpm db:seed`) creates default accounts for testing different user roles. These accounts are created dynamically using the environment variables defined in your `backend/.env` file. You can log in using the configured credentials:

| Role | Email Address (Load from .env) | Password (Load from .env) |
|---|---|---|
| **Administrator** | `SEED_ADMIN_EMAIL` | `SEED_ADMIN_PASSWORD` |
| **Customer (Borrower)** | `SEED_CUSTOMER_EMAIL` | `SEED_CUSTOMER_PASSWORD` |
| **Business (Provider)** | `SEED_BUSINESS_EMAIL` | `SEED_BUSINESS_PASSWORD` |

---

## 🛣️ Backend API Endpoints

The Express backend exposes the following REST API endpoints:

### Authentication (`/api/auth`)
* `POST /register` - Register a new customer or business user
* `POST /login` - Authenticate user credentials and return a session token
* `GET /me` - Retrieve current active user profile information
* `POST /forgot-password` - Request a password recovery email link
* `POST /verify-reset-token` - Check password recovery token parameters on page load
* `POST /reset-password` - Save a new password for the account

### Offers & Schemes (`/api/offers`)
* `GET /` - Retrieve all active gold loan offers (supports query filter parameters)
* `GET /:id` - Retrieve details of a single gold loan scheme
* `POST /` - Add a new gold loan offer (requires Business role)
* `PUT /:id` - Update details of an existing gold loan scheme (requires Business owner)
* `DELETE /:id` - Delete an offer scheme (requires Business owner)

### Financial Centers (`/api/centers`)
* `GET /` - List all gold loan financial provider centers
* `GET /:id` - Retrieve detailed information of a single center
* `PUT /:id` - Edit center profile data (requires Business owner)

### Branches (`/api/branches`)
* `GET /` - List all active branch locations
* `GET /:id` - Retrieve contact and office hours details of a single branch
* `POST /` - Register a new branch location (requires Business role)
* `PUT /:id` - Edit branch information (requires Business owner)
* `DELETE /:id` - Remove a branch location (requires Business owner)

### Customer Inquiries (`/api/inquiries`)
* `GET /` - List inquiries (Customers see their own; Businesses see inquiries directed to them)
* `POST /` - Submit a new gold loan inquiry
* `PUT /:id` - Update status (`New`, `Contacted`, `Completed`) or reply comments (requires Business role)

### Admin Panel (`/api/admin`)
* `GET /business-approvals` - List pending business registrations (requires Admin role)
* `POST /business-approvals/:id/approve` - Approve provider access (requires Admin role)
* `POST /business-approvals/:id/reject` - Reject provider access (requires Admin role)

### User Management (`/api/users`)
* `GET /` - List all profiles registered on the system (requires Admin role)
* `PUT /:id` - Edit user status/details

---

## 🔑 Authentication & Password Recovery Flow

AurumLK features a highly secure local authentication system using JWTs:
* **Verification on Load**: When a user clicks the password recovery link sent to their email (e.g. `http://localhost:5173/forgot-password?token=...&email=...`), the frontend immediately verifies the token's validity with the backend before showing the password input form.
* **Testing Ethereal Mail Fallback**: If no SMTP credentials are set in `backend/.env`, Nodemailer automatically routes reset link emails to a mock Ethereal inbox. The backend console prints a preview URL where developers can click and view the email message contents.
* **Real Inbox Delivery**: By filling in the `SMTP_*` values in `backend/.env` (such as Gmail SMTP settings with an App Password), reset links will route directly to actual user email addresses.