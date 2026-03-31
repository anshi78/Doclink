# 🏥 AI-Appointment Booking System

A modern telemedicine platform that connects patients with verified doctors for virtual consultations. Built with **Next.js 15**, **Prisma**, and **Vonage Video API**.

![Next.js](https://img.shields.io/badge/Next.js-15.5.0-black?style=flat-square&logo=next.js)
![React](https://img.shields.io/badge/React-19-blue?style=flat-square&logo=react)
![Prisma](https://img.shields.io/badge/Prisma-ORM-2D3748?style=flat-square&logo=prisma)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-Neon-336791?style=flat-square&logo=postgresql)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-CSS-06B6D4?style=flat-square&logo=tailwindcss)

---

## 📋 Table of Contents

- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Prerequisites](#-prerequisites)
- [Installation](#-installation)
- [Environment Setup](#-environment-setup)
- [Project Structure](#-project-structure)
- [User Workflows](#-user-workflows)
- [Database Schema](#-database-schema)
- [Development](#-development)
- [Deployment](#-deployment)

---

## ✨ Features

### 🔐 **Authentication**
- Secure sign-in/sign-up with Clerk
- Role-based access control (Patient, Doctor, Admin)
- Email verification required

### 👥 **Patient Features**
- Browse doctors by specialty
- View doctor profiles with detailed information
- Book appointments with time-slot selection
- Video consultations via Vonage Video API
- Manage appointments (view, cancel)
- Credit-based payment system (2 credits/appointment)

### 👨‍⚕️ **Doctor Features**
- Complete profile setup (specialty, experience, credentials)
- Doctor verification by admin
- Set daily availability slots
- Manage incoming appointments
- Add notes to appointments
- Mark appointments as completed
- Request payouts for earned credits
- Real-time earnings dashboard

### 👨‍💼 **Admin Features**
- Verify/reject doctor applications
- Review doctor credentials
- Manage payout requests
- Monitor platform activity

---

## 🛠 Tech Stack

| Layer | Technology |
|-------|-----------|
| **Frontend** | Next.js 15, React 19, Tailwind CSS, Shadcn UI |
| **Backend** | Next.js Server Actions |
| **Database** | PostgreSQL (Neon), Prisma ORM |
| **Authentication** | Clerk |
| **Video** | Vonage Video API |
| **Styling** | Tailwind CSS + Radix UI Components |

---

## 📦 Prerequisites

- Node.js 18+ and npm/yarn
- PostgreSQL database (Neon free tier)
- Clerk account for authentication
- Vonage account for video conferencing

---

## 🚀 Installation

### 1. Clone the Repository

```bash
git clone https://github.com/anshi78/Doclink.git
cd my-app
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Configure Environment Variables

Create `.env` file in root:

```env
# Database (Neon PostgreSQL)
DATABASE_URL="postgresql://user:password@host/dbname?sslmode=require"

# Clerk Authentication
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_xxx
CLERK_SECRET_KEY=sk_test_xxx
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/onboarding
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/onboarding

# Vonage Video API
NEXT_PUBLIC_VONAGE_APPLICATION_ID=your_app_id
VONAGE_PRIVATE_KEY=lib/private.key
```

### 4. Set Up Database

```bash
# Generate Prisma client
npx prisma generate

# Run migrations
npx prisma migrate dev --name init
```

### 5. Start Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

---

## ⚙️ Environment Setup

### Clerk
1. Create app at [clerk.com](https://clerk.com)
2. Copy Publishable & Secret keys
3. Add redirect URLs for localhost & production

### Neon PostgreSQL
1. Create project at [neon.tech](https://neon.tech)
2. Copy connection string
3. Add to `DATABASE_URL` in `.env`

### Vonage
1. Create account at [vonage.com](https://vonage.com)
2. Generate **Application ID** and **Private Key**
3. Save private key to `lib/private.key`

---

## 📁 Project Structure

```
my-app/
├── actions/              # Server actions (DB operations)
│   ├── admin.js
│   ├── appointments.js
│   ├── doctor.js
│   ├── payout.js
│   └── patient.js
├── app/                  # Next.js app directory
│   ├── (auth)/          # Auth pages
│   ├── (main)/          # Protected pages
│   │   ├── admin/
│   │   ├── appointments/
│   │   ├── doctor/
│   │   ├── doctors/
│   │   └── video-call/
│   └── layout.js
├── components/          # Reusable components
│   ├── ui/
│   ├── appointment-card.jsx
│   └── doctor-card.jsx
├── lib/                 # Utilities & config
│   └── prisma.js
├── prisma/              # Database schema
│   └── schema.prisma
└── public/              # Static assets
```

---

## 👥 User Workflows

### **Patient**
1. Sign up → Get 2 free credits
2. Browse doctors by specialty
3. View doctor profile & availability
4. Select time slot → Add medical details
5. Book appointment → Credits deducted
6. Join video call during appointment time
7. Consultation with doctor (30 min)

### **Doctor**
1. Sign up as doctor → Submit credentials
2. Email verification → Complete onboarding
3. Wait for admin verification
4. Set daily availability (e.g., 9 AM - 5 PM)
5. System creates 30-min auto-slots
6. Manage incoming appointments
7. Conduct video consultations
8. Complete appointment → +2 credits earned
9. Request payout when ready

### **Admin**
1. Review pending doctor applications
2. Verify approved doctors
3. Review payout requests
4. Process payments to PayPal

---

## 💳 Credit System

| Action | Credits | Direction |
|--------|---------|-----------|
| Patient books | -2 | Patient → Doctor |
| Cancel appointment | +2 | Refund to patient |
| Doctor completes | +2 | Earned by doctor |
| Payout | $8 per credit | Doctor → Bank |

---

## 🔨 Development

```bash
# Start development server
npm run dev

# Build production
npm run build

# Start production server
npm run start

# View database (Prisma Studio)
npx prisma studio

# Create migration
npx prisma migrate dev --name <name>
```

---

## 🚢 Deployment

### Deploy to Vercel

1. Push to GitHub
2. Go to [vercel.com](https://vercel.com)
3. Import repository
4. Add environment variables
5. Deploy!

```bash
npm install -g vercel
vercel
```

---

## 🎯 Key Features

- ✅ Real-time appointment management
- ✅ Video consultations (Vonage API)
- ✅ Credit-based payments
- ✅ Doctor verification system
- ✅ Admin dashboard
- ✅ Payout management
- ✅ Responsive design (mobile-ready)
- ✅ Dark mode theme

---

## 📞 Support

For issues or questions:
- Open a GitHub issue
- Contact: support@doclink.app

---

## 📄 License

MIT License - see LICENSE file for details

---

**Made with ❤️ | AI-Appointment Team**
