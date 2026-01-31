# Quick Start Guide - Sport Court Booking System

## 🚀 Get Started in 3 Steps

### Step 1: Extract Files
Extract the `sport-court-frontend.zip` file to your desired location.

### Step 2: Update API URL (if needed)
Open `js/api.js` and verify the API endpoint:
```javascript
const API_BASE = "https://sport-court-backend.onrender.com/api";
```

### Step 3: Open in Browser
Open `index.html` in your web browser.

## 🔐 Test Accounts

### Regular User
- Email: `user@test.com`
- Password: `password123`

### Admin
- Email: `admin@test.com`  
- Password: `admin123`

## 📋 Quick Feature Guide

### User Actions
1. **Book a Court**: Dashboard → Book Courts → Select Court → Choose Date/Time → Add Services → Pay
2. **View Bookings**: My Bookings tab
3. **Cancel/Reschedule**: My Bookings → Click respective buttons
4. **Top Up Coins**: Dashboard → Top Up button
5. **Favorites**: Click ☆ on any court, view in Favorites tab

### Admin Actions
1. **View Analytics**: Admin Dashboard (auto-loads charts)
2. **Add Court**: Manage Courts → Fill form → Add Court
3. **Edit Court**: Manage Courts → Edit button → Update
4. **Cancel Booking**: Manage Bookings → Cancel button
5. **Maintenance**: Manage Courts → Maintenance button

## 🎯 Key Features

✅ Real-time availability checking  
✅ Slot locking during booking  
✅ QR code for check-in  
✅ Receipt with PDF download  
✅ Notification system  
✅ Penalty system (auto-cancel, late fees)  
✅ Favorites for quick booking  
✅ Analytics dashboard (admin)  
✅ Court maintenance scheduling  

## 🌐 Recommended Browsers
- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## ⚡ Pro Tips

1. **Use Favorites**: Save frequently used courts for one-click booking
2. **Book Early**: Popular time slots fill up quickly
3. **Set Reminders**: Check notifications 1 hour before your booking
4. **Check-in On Time**: Late check-in (>15 min) = auto-cancel
5. **Reschedule Smart**: Free reschedule if >2 days in advance

## 🐛 Troubleshooting

**Can't login?**  
→ Check backend API is running at the correct URL

**Courts not showing?**  
→ Verify API connection, check browser console

**Booking fails?**  
→ Ensure sufficient coin balance, check court availability

**Charts not loading?**  
→ Check internet connection (Chart.js loads from CDN)

## 📱 File Structure

```
sport-court-frontend/
├── index.html          # 👉 START HERE (Login page)
├── register.html       # New user registration
├── README.md          # Full documentation
├── css/
│   └── style.css
├── js/
│   ├── api.js         # ⚙️ Configure API here
│   ├── auth.js
│   └── notifications.js
├── user/              # User pages
│   ├── dashboard.html
│   ├── courts.html
│   ├── booking.html
│   ├── bookings.html
│   ├── receipt.html
│   ├── favorites.html
│   └── profile.html
└── admin/             # Admin pages
    ├── dashboard.html
    ├── courts.html
    ├── bookings.html
    └── profile.html
```

## 🎨 Customization

### Change Primary Color
Edit `css/style.css`, line ~13:
```css
background: #2563eb;  /* Change this hex code */
```

### Modify Service Prices
Edit `user/booking.html`, search for:
```javascript
waterPrice = 20;
refereePrice = 100;
accommodationPrice = 150;
```

## 📞 Need Help?

1. Read the full `README.md` for detailed documentation
2. Check browser Developer Console (F12) for errors
3. Verify backend API connectivity
4. Ensure you're using a supported browser

---

**Happy Booking! 🏟️**
