// js/notifications.js

let notificationInterval = null;

async function loadNotifications() {
  try {
    const notifications = await apiFetch("/notifications", {
      headers: authHeader()
    });

    displayNotifications(notifications);
    updateNotificationBadge(notifications);

    // Poll for new notifications every 30 seconds
    if (!notificationInterval) {
      notificationInterval = setInterval(loadNotifications, 30000);
    }
  } catch(err) {
    console.error("Error loading notifications:", err);
  }
}

function displayNotifications(notifications) {
  const container = document.getElementById("notificationList");
  
  if (!container) return;

  if (notifications.length === 0) {
    container.innerHTML = '<div style="padding: 20px; text-align: center; color: #94a3b8;">No notifications</div>';
    return;
  }

  container.innerHTML = notifications.map(notif => `
    <div class="notification-item ${notif.read ? '' : 'unread'}" onclick="markAsRead(${notif.id})">
      <div style="font-weight: ${notif.read ? 'normal' : 'bold'};">
        ${getNotificationIcon(notif.type)} ${notif.message}
      </div>
      <div style="font-size: 12px; color: #64748b; margin-top: 5px;">
        ${formatDate(notif.created_at)}
      </div>
    </div>
  `).join('');
}

function updateNotificationBadge(notifications) {
  const badge = document.getElementById("notifBadge");
  if (!badge) return;

  const unreadCount = notifications.filter(n => !n.read).length;
  
  if (unreadCount > 0) {
    badge.textContent = unreadCount;
    badge.style.display = 'block';
  } else {
    badge.style.display = 'none';
  }
}

function getNotificationIcon(type) {
  const icons = {
    'booking_confirmed': '✅',
    'booking_cancelled': '❌',
    'booking_reminder': '⏰',
    'payment_received': '💰',
    'check_in_reminder': '📍',
    'admin_message': '📢'
  };
  return icons[type] || '🔔';
}

function toggleNotifications() {
  const panel = document.getElementById("notificationPanel");
  if (panel.classList.contains('open')) {
    panel.classList.remove('open');
  } else {
    panel.classList.add('open');
    loadNotifications();
  }
}

async function markAsRead(notifId) {
  try {
    await apiFetch(`/notifications/${notifId}/read`, {
      method: "PUT",
      headers: authHeader()
    });
    loadNotifications();
  } catch(err) {
    console.error("Error marking notification as read:", err);
  }
}

// Simulate notifications for demo (remove in production)
function simulateNotification(message, type = 'info') {
  const notification = {
    id: Date.now(),
    message: message,
    type: type,
    read: false,
    created_at: new Date().toISOString()
  };
  
  // Show browser notification if permitted
  if ("Notification" in window && Notification.permission === "granted") {
    new Notification("SportCourt", { body: message });
  }
}

// Request notification permission
if ("Notification" in window && Notification.permission === "default") {
  Notification.requestPermission();
}
