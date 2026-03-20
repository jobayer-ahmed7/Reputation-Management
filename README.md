# Reputation Manage - Reputation Management Platform

Reputation Manage is a comprehensive platform designed to help businesses monitor, manage, and grow their online reputation. It provides a suite of services for social media reviews and engagement across major platforms like Facebook, Instagram, and YouTube.

## 🚀 Tech Stack

### Backend
- **Framework:** [Express.js](https://expressjs.com/) (Node.js)
- **Language:** [TypeScript](https://www.typescriptlang.org/)
- **Database:** [MongoDB](https://www.mongodb.com/) with [Mongoose](https://mongoosejs.com/)
- **Validation:** [Zod](https://zod.dev/)
- **Authentication:** [JSON Web Tokens (JWT)](https://jwt.io/) & [bcrypt](https://github.com/kelektiv/node.bcrypt.js)
- **Email:** [Nodemailer](https://nodemailer.com/) (for OTP verification)

### Frontend
- **Framework:** [Next.js 15+](https://nextjs.org/) (App Router)
- **Language:** [TypeScript](https://www.typescriptlang.org/)
- **Styling:** [Tailwind CSS 4](https://tailwindcss.com/)
- **Components:** [shadcn/ui](https://ui.shadcn.com/)
- **State Management:** React Context API
- **Forms:** [React Hook Form](https://react-hook-form.com/) with Zod
- **Notifications:** [Sonner](https://sonner.emilkowal.ski/)

## ✨ Key Features

- **User Authentication:** Secure registration and login with Email OTP verification.
- **Service Catalog:** Browse various social media review and engagement packages.
- **Checkout System:** Secure checkout with multiple payment options (Binance, Payoneer, Wise).
- **Order Management:**
  - **Customers:** Track order history and status.
  - **Admins:** Manage all customer orders, update working status, and verify payments.
- **Dashboard:** Role-based dashboards for Admins and Customers.
- **Responsive Design:** Fully optimized for desktop and mobile devices.

## 📁 Project Structure

```text
├── backend/
│   ├── src/
│   │   ├── app/
│   │   │   ├── config/          # Environment configuration
│   │   │   ├── errors/          # Custom error classes
│   │   │   ├── middlewares/     # Auth, Validation, etc.
│   │   │   ├── modules/         # Auth, User, Service, Order modules
│   │   │   ├── routes/          # Centralized routing
│   │   │   └── utils/           # Helper functions
│   │   ├── app.ts               # Express app setup
│   │   └── server.ts            # Server entry point
├── frontend/
│   ├── src/
│   │   ├── app/                 # Next.js App Router pages
│   │   ├── components/          # Reusable UI components
│   │   ├── contexts/            # React Contexts (User auth)
│   │   ├── lib/                 # Utilities
│   │   ├── providers/           # App providers
│   │   ├── services/            # API service calls (Server Actions)
│   │   └── types/               # TypeScript interfaces
```

## 🛠️ Getting Started

### Prerequisites
- Node.js (v18+)
- MongoDB (Local or Atlas)
- npm or yarn

### Installation

1. **Clone the repository:**
   ```bash
   git clone <repository-url>
   cd Reputation-Management
   ```

2. **Backend Setup:**
   ```bash
   cd backend
   npm install
   # Create a .env file based on existing config
   npm run start:dev
   ```

3. **Frontend Setup:**
   ```bash
   cd ../frontend
   npm install
   # Create a .env.local with NEXT_PUBLIC_BASE_API
   npm run dev
   ```

## 📜 License
This project is licensed under the ISC License.
