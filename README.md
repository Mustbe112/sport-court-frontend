# Sport Court Booking and Management System - Frontend

A comprehensive web application for booking and managing sport courts with user and admin interfaces.

## 🏟️ Features

### User Features
- **User Registration & Login**: Secure account creation and authentication
- **Court Browsing**: Filter by court type (Tennis, Basketball, Football, Futsal)
- **Real-time Booking**: Check availability and book courts with time slot locking
- **Add-on Services**:
  - Water bottles (Football/Futsal)
  - Referee service
  - Fan accommodation
- **Coin-based Payment**: Virtual currency system for payments
- **Favorites**: Save favorite courts for quick booking
- **Booking Management**:
  - View all bookings (upcoming, completed, cancelled)
  - Reschedule bookings (with fees if within 2 days)
  - Cancel bookings with full refund
  - QR code for check-in
- **Receipt & PDF**: Download booking receipts with QR codes
- **Notifications**: Real-time notifications for:
  - Booking confirmations
  - Cancellations
  - Reminders (1 hour before)
  - Admin messages
- **Penalties**:
  - Auto-cancel if no check-in within 15 minutes
  - Extra charges for late checkout (15+ minutes)

### Admin Features
- **Dashboard with Analytics**:
  - Total revenue
  - Active bookings count
  - Cancellation rates
  - High-demand courts chart
  - Peak hours analysis
  - Revenue trends (7-day)
  - Booking status distribution
- **Court Management**:
  - Add, edit, remove courts
  - Set pricing
  - Schedule maintenance
  - Activate/deactivate courts
- **Booking Management**:
  - View all bookings
  - Filter by status
  - Force cancel bookings (full refund to users)
  - Search bookings
- **Notifications**: Send system-wide messages to users

## 📁 Project Structure

```
sport-court-frontend/
├── index.html              # Login page
├── register.html           # Registration page
├── css/
│   └── style.css          # Comprehensive styling
├── js/
│   ├── api.js             # API communication
│   ├── auth.js            # Authentication logic
│   └── notifications.js   # Notification system
├── user/
│   ├── dashboard.html     # User dashboard
│   ├── courts.html        # Browse & filter courts
│   ├── booking.html       # Booking form with services
│   ├── bookings.html      # Manage bookings
│   ├── receipt.html       # View receipts with QR
│   ├── favorites.html     # Favorite courts
│   └── profile.html       # User profile
└── admin/
    ├── dashboard.html     # Admin dashboard with charts
    ├── courts.html        # Court management
    ├── bookings.html      # Booking management
    └── profile.html       # Admin profile
```

## 🚀 Getting Started

### Prerequisites
- Modern web browser (Chrome, Firefox, Safari, Edge)
- Backend API running at: `https://sport-court-backend.onrender.com/api`

### Installation

1. **Clone or download** this repository

2. **Update API endpoint** (if needed) in `js/api.js`:
```javascript
const API_BASE = "https://sport-court-backend.onrender.com/api";
```

3. **Open in browser**: Simply open `index.html` in your web browser

### Alternative: Using a Local Server

For better performance and to avoid CORS issues:

```bash
# Using Python
python -m http.server 8000

# Using Node.js
npx serve

# Using PHP
php -S localhost:8000
```

Then navigate to: `http://localhost:8000`

## 🔐 User Accounts

### Test Accounts
- **User Account**: 
  - Email: user@test.com
  - Password: password123

- **Admin Account**:
  - Email: admin@test.com
  - Password: admin123

### Creating New Accounts
1. Go to registration page
2. Enter email and password (min 6 characters)
3. Confirm password
4. Click "Create Account"

## 💡 Usage Guide

### For Users

#### Booking a Court
1. **Login** to your account
2. Go to **"Book Courts"**
3. **Filter** by court type or search
4. Click **"Book Now"** on desired court
5. **Select date and time**
6. **Check availability**
7. **Add optional services**:
   - Water bottles (Football/Futsal only)
   - Referee
   - Fan accommodation
8. **Review and pay** with coins
9. **Download receipt** with QR code

#### Managing Bookings
- **View bookings**: Go to "My Bookings"
- **Reschedule**: Click "Reschedule" button
  - Free if more than 2 days in advance
  - 50% fee if within 2 days
- **Cancel**: Click "Cancel" for full refund
- **Check-in**: Use QR code at court entrance

#### Top-up Coins
1. Go to **Dashboard**
2. Click **"Top Up"** button
3. Select amount or enter custom amount
4. Confirm purchase

### For Admins

#### Viewing Analytics
- **Dashboard** shows:
  - Revenue metrics
  - Active bookings
  - Cancellation rates
  - Interactive charts

#### Managing Courts
1. Go to **"Manage Courts"**
2. **Add new court**:
   - Enter name, type, and price
   - Click "Add Court"
3. **Edit court**:
   - Click "Edit" button
   - Update details
   - Save changes
4. **Schedule maintenance**:
   - Click "Maintenance"
   - Set start/end dates
   - Users will be notified

#### Managing Bookings
1. Go to **"Manage Bookings"**
2. **Filter** by status
3. **Search** by court, user, or date
4. **Cancel booking**:
   - Click "Cancel" button
   - User receives full refund and notification

## 🎨 Features Implementation

### Real-time Features
- **Slot Locking**: When a user starts booking, the time slot is temporarily locked
- **Notifications**: Auto-refresh every 30 seconds
- **Availability Check**: Real-time court availability

### Payment System
- **Virtual Coins**: Website-based currency
- **Top-up Options**: $10, $45, $80, $350 or custom
- **Transaction History**: View in profile

### Penalty System
- **No Check-in**: Auto-cancel after 15 minutes, email notification
- **Late Checkout**: Extra charges on next booking

### Notification System
- **Email Notifications** (simulated):
  - Booking confirmations
  - Cancellations
  - Reminders (1 hour before)
  - Admin messages
- **In-app Notifications**: Real-time badge and panel

### QR Code System
- Generated for each booking
- Used for check-in/check-out
- Included in receipt PDF

## 🔧 Configuration

### Customizing the System

#### Changing Colors
Edit `css/style.css`:
```css
/* Primary color */
--primary: #2563eb;

/* Success color */
--success: #16a34a;

/* Danger color */
--danger: #dc2626;
```

#### Adjusting Prices
Service prices are defined in `user/booking.html`:
```javascript
// Water bottles
const waterPrice = 20;

// Referee
const refereePrice = 100;

// Accommodation
const accommodationPrice = 150;
```

#### Modifying Court Types
Edit court type options in:
- `user/courts.html` (filter dropdown)
- `admin/courts.html` (add/edit form)

## 📱 Responsive Design
- ✅ Desktop (1920x1080 and above)
- ✅ Laptop (1366x768)
- ✅ Tablet (768x1024)
- ✅ Mobile (375x667 and above)

## 🌐 Browser Compatibility
- ✅ Chrome 90+
- ✅ Firefox 88+
- ✅ Safari 14+
- ✅ Edge 90+

## 🔗 API Integration

The frontend connects to these backend endpoints:

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - User login

### Courts
- `GET /api/courts` - Get all active courts
- `GET /api/courts/type/:type` - Filter by type

### Bookings
- `POST /api/bookings/availability` - Check availability
- `POST /api/bookings/lock` - Lock time slot
- `POST /api/bookings/book` - Create booking
- `GET /api/bookings/my-bookings` - Get user's bookings
- `POST /api/bookings/cancel/:id` - Cancel booking
- `POST /api/bookings/checkin/:id` - Check-in

### Payment
- `POST /api/payment/topup` - Add coins
- `GET /api/payment/me` - Get user balance

### Admin
- `GET /api/admin/courts` - Get all courts
- `POST /api/admin/courts` - Create court
- `PUT /api/admin/courts/:id` - Update court
- `GET /api/admin/bookings` - Get all bookings
- `DELETE /api/admin/bookings/:id` - Cancel booking
- `GET /api/admin/stats/*` - Various statistics

### Notifications
- `GET /api/notifications` - Get user notifications
- `PUT /api/notifications/:id/read` - Mark as read

## 🐛 Troubleshooting

### Common Issues

**Login not working**
- Check if backend API is running
- Verify API_BASE URL in `js/api.js`
- Check browser console for errors

**Courts not loading**
- Ensure backend has courts data
- Check network tab in browser dev tools
- Verify authentication token

**Booking fails**
- Check coin balance
- Verify court availability
- Ensure all required fields are filled

**Charts not displaying**
- Ensure Chart.js CDN is accessible
- Check if backend returns analytics data
- Refresh page

## 📦 Dependencies

### External Libraries
- **Chart.js** (v4.4.0) - Analytics charts
- **QRCode.js** (v1.0.0) - QR code generation
- **jsPDF** (v2.5.1) - PDF generation

All libraries are loaded from CDN, no installation required.

## 🔒 Security Notes

### Implemented Security Features
- JWT token-based authentication
- LocalStorage for session management
- Authorization checks on protected pages
- Input validation on forms
- XSS prevention through proper escaping

### Recommendations for Production
1. Use HTTPS for all communications
2. Implement CSRF protection
3. Add rate limiting
4. Use secure cookie storage instead of LocalStorage
5. Implement proper session timeout
6. Add 2FA for admin accounts

## 🎯 Future Enhancements

Potential features to add:
- [ ] Real payment gateway integration
- [ ] SMS notifications
- [ ] Mobile app (React Native)
- [ ] Group bookings
- [ ] Tournament management
- [ ] Coach booking
- [ ] Equipment rental
- [ ] Social features (reviews, ratings)
- [ ] Loyalty program
- [ ] Multi-language support

## 📄 License

This project is for educational purposes (university project).

## 👥 Support

For issues or questions:
1. Check this README
2. Review browser console for errors
3. Verify backend API is running
4. Check network requests in dev tools

## 🎓 Project Information

**Project Type**: University Project  
**Purpose**: Sport Court Booking and Management System  
**Technologies**: HTML5, CSS3, JavaScript (Vanilla)  
**API**: REST API with JWT authentication  
**Payment**: Simulated (coin-based system)  

---

**Note**: This is a demonstration/educational project. For production use, additional security measures, testing, and optimization would be required.
