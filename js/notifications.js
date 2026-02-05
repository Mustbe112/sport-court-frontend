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

  // Add "Mark all as read" button at the top if there are unread notifications
  const unreadCount = notifications.filter(n => !n.is_read).length;
  let headerHTML = '';
  
  if (unreadCount > 0) {
    headerHTML = `
      <div style="padding: 10px 15px; border-bottom: 1px solid #e2e8f0; display: flex; justify-content: space-between; align-items: center;">
        <span style="font-size: 14px; color: #64748b;">${unreadCount} unread notification${unreadCount !== 1 ? 's' : ''}</span>
        <button onclick="markAllAsRead()" style="background: #3b82f6; color: white; border: none; padding: 5px 12px; border-radius: 4px; cursor: pointer; font-size: 12px;">
          Mark all as read
        </button>
      </div>
    `;
  }

  container.innerHTML = headerHTML + notifications.map(notif => `
    <div class="notification-item ${notif.is_read ? 'read' : 'unread'}" onclick="markAsRead(${notif.id})" style="cursor: pointer;">
      <div style="font-weight: ${notif.is_read ? 'normal' : 'bold'}; color: ${notif.is_read ? '#64748b' : '#1e293b'};">
        ${getNotificationIcon(notif.type)} ${notif.message}
      </div>
      <div style="font-size: 12px; color: #64748b; margin-top: 5px;">
        ${formatDate(notif.created_at)}
      </div>
      ${!notif.is_read ? '<div style="position: absolute; right: 15px; top: 50%; transform: translateY(-50%); width: 8px; height: 8px; background: #3b82f6; border-radius: 50%;"></div>' : ''}
    </div>
  `).join('');
}

function updateNotificationBadge(notifications) {
  const badge = document.getElementById("notifBadge");
  if (!badge) return;

  const unreadCount = notifications.filter(n => !n.is_read).length;
  
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
    // Reload notifications to update the UI
    await loadNotifications();
  } catch(err) {
    console.error("Error marking notification as read:", err);
  }
}

async function markAllAsRead() {
  try {
    await apiFetch('/notifications/read-all', {
      method: "PUT",
      headers: authHeader()
    });
    // Reload notifications to update the UI
    await loadNotifications();
  } catch(err) {
    console.error("Error marking all notifications as read:", err);
    showAlert("Failed to mark notifications as read. Please try again.", "error");
  }
}

// Simulate notifications for demo (remove in production)
function simulateNotification(message, type = 'info') {
  const notification = {
    id: Date.now(),
    message: message,
    type: type,
    is_read: false,
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