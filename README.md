# SportCourt — Sports Court Booking System

A full-stack web application for booking sports courts with real-time availability, coin-based payments, QR code check-ins, and an admin management panel.

 **Frontend:** https://tourmaline-tulumba-4614bf.netlify.app/
 **Backend API:** https://sport-court-backend.onrender.com

> **Note:** The backend is hosted on Render's free tier and may take 20–30 seconds to wake up on the first request.
---

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Project Structure](#project-structure)
- [Pages & Functionality](#pages--functionality)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
- [API Reference](#api-reference)
- [User Roles](#user-roles)
- [Configuration](#configuration)

---

## Overview

SportCourt is a browser-based court booking platform where users can browse available sports courts (tennis, basketball, football, futsal), book sessions using a virtual coin balance, receive QR codes for check-in, and manage their bookings. Admins get a dedicated panel with analytics, court management, and a QR scanner.

---

## Features

### User Features
- Login & Registration with JWT authentication
- Browse & filter courts by type, name, and price
- Real-time availability checking before booking
- Coin-based payment system with top-up support
- QR code generation for each booking (check-in)
- Real-time notifications (booking confirmations, reminders, cancellations)
- Favorite courts for quick re-booking
- Downloadable booking receipts
- Profile management and booking history

### Admin Features
- Dashboard with analytics charts (revenue trends, peak hours, court demand)
- Court management — add, edit, activate/deactivate courts
- Scheduled maintenance with automatic booking cancellation & refund
- Booking management — view and cancel any booking
- QR code scanner for user check-in validation
- Stats: high-demand courts, peak hours, revenue over time

---

## Project Structure

```
sportcourt/
│
├── index.html                  # Login page
├── register.html               # User registration
│
├── css/
│   ├── style.css               # Main stylesheet
│   └── alerts.css              # Alert/toast notification styles
│
├── js/
│   ├── api.js                  # API base URL, apiFetch(), utility helpers
│   ├── auth.js                 # Login, logout, auth guard functions
│   ├── notifications.js        # Real-time notification polling & display
│   └── topup.js                # Coin top-up modal logic
│
├── user/
│   ├── dashboard.html          # User home — balance, upcoming bookings
│   ├── courts.html             # Browse & filter available courts
│   ├── booking.html            # Step-by-step court booking flow
│   ├── bookings.html           # User's booking history
│   ├── favorites.html          # Favorited courts for quick booking
│   ├── receipt.html            # Booking receipt & QR code
│   └── profile.html            # Profile settings & top-up
│
└── admin/
    ├── dashboard.html          # Admin analytics dashboard
    ├── courts.html             # Manage courts & maintenance schedules
    ├── bookings.html           # View & manage all bookings
    ├── scanner.html            # QR code check-in scanner
    └── profile.html            # Admin profile
```

---

## Pages & Functionality

### Public Pages

| Page | Description |
|------|-------------|
| `index.html` | Animated login page with role-based redirect (user/admin) |
| `register.html` | New user registration form |

### User Pages

| Page | Description |
|------|-------------|
| `user/dashboard.html` | Coin balance, upcoming bookings, quick-access actions |
| `user/courts.html` | Browse courts with filters (type, name, price sort) and favorites |
| `user/booking.html` | 3-step booking: date/time → availability check → confirm & pay |
| `user/bookings.html` | Full booking history with cancel option and receipt download |
| `user/favorites.html` | Saved courts with one-click booking |
| `user/receipt.html` | Booking confirmation with QR code for check-in |
| `user/profile.html` | Update profile, view stats, top up coin balance |

### Admin Pages

| Page | Description |
|------|-------------|
| `admin/dashboard.html` | Revenue stats, chart analytics, recent bookings table |
| `admin/courts.html` | Add/edit courts, schedule maintenance (auto-refunds affected bookings) |
| `admin/bookings.html` | View all bookings, filter by status, manually cancel bookings |
| `admin/scanner.html` | Camera-based QR scanner to validate and check in users |
| `admin/profile.html` | Admin profile settings |

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | Vanilla HTML, CSS, JavaScript |
| Styling | Custom CSS with CSS variables, responsive design |
| Charts | [Chart.js](https://www.chartjs.org/) |
| QR Code | QR generation & camera scanning via browser APIs |
| Fonts | Google Fonts — Barlow & Barlow Condensed |
| Backend | REST API hosted at `https://sport-court-backend.onrender.com/api` |
| Auth | JWT tokens stored in `localStorage` |

---

## Getting Started

### Prerequisites
- Any modern web browser (Chrome, Firefox, Safari, Edge)
- A local or remote web server (e.g. VS Code Live Server, nginx, Apache)

### Running Locally

1. Clone or download the repository:
   ```bash
   git clone https://github.com/your-username/sportcourt.git
   cd sportcourt
   ```

2. Serve the files using a local server:
   ```bash
   # Using VS Code Live Server extension — open index.html and click "Go Live"

   # Or using Python
   python -m http.server 8080

   # Or using Node.js
   npx serve .
   ```

3. Open your browser and navigate to:
   ```
   http://localhost:8080
   ```

4. Log in with your credentials or register a new account.

> **Note:** The backend is hosted on Render's free tier and may take ~30 seconds to wake up on the first request.

---

## API Reference

All API calls go through `js/api.js` using the `apiFetch()` helper, which automatically handles authorization headers and 401 redirects.

**Base URL:** `https://sport-court-backend.onrender.com/api`

### Authentication
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/auth/login` | Login and receive JWT token |
| POST | `/auth/register` | Register a new user |

### Courts
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/courts` | List all active courts |
| GET | `/admin/courts` | List all courts (admin) |
| POST | `/admin/courts` | Add a new court |
| PUT | `/admin/courts/:id` | Update a court |
| POST | `/admin/courts/:id/maintenance` | Schedule maintenance |
| DELETE | `/admin/maintenance/:id` | Cancel maintenance |

### Bookings
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/bookings` | Get current user's bookings |
| POST | `/bookings` | Create a new booking |
| DELETE | `/bookings/:id` | Cancel a booking |
| GET | `/admin/bookings` | Get all bookings (admin) |

### Users
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/users/me` | Get current user profile |
| PUT | `/users/me` | Update profile |
| POST | `/users/topup` | Top up coin balance |

### Notifications
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/notifications` | Get user notifications |
| PUT | `/notifications/:id/read` | Mark notification as read |
| PUT | `/notifications/read-all` | Mark all as read |

### Analytics (Admin)
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/admin/stats/high-demand` | Most booked courts |
| GET | `/admin/stats/peak-hours` | Booking volume by hour |
| GET | `/admin/stats/revenue` | Revenue trend (last 7 days) |

---

## User Roles

### Regular User
- Authenticated via JWT, role: `"user"`
- Redirected to `user/dashboard.html` on login
- Can only access their own bookings and profile data

### Admin
- Authenticated via JWT, role: `"admin"`
- Redirected to `admin/dashboard.html` on login
- Has access to all admin endpoints and management pages
- Protected by `checkAdminAuth()` on every admin page

---

## Configuration

### Changing the API Base URL
Edit the `API_BASE` constant in `js/api.js`:

```javascript
const API_BASE = "https://sport-court-backend.onrender.com";
```

### Coin Top-Up Packages
Top-up preset amounts are defined in `user/profile.html` and can be adjusted by modifying the `topUpPreset(coins, price)` button calls.

### Notification Polling Interval
Notifications are polled every 30 seconds by default. Change the interval in `js/notifications.js`:

```javascript
notificationInterval = setInterval(loadNotifications, 30000); // ms
```

---

## License

This project is for educational and demonstration purposes.

---


