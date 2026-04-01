// js/notifications.js

let notificationInterval = null;

/* ── Load & poll ─────────────────────────────────────────────────────────── */

async function loadNotifications() {
  try {
    const notifications = await apiFetch("/notifications", {
      headers: authHeader()
    });

    renderNotifications(notifications);
    updateNotificationBadge(notifications);

    // Poll every 30 s — start only once
    if (!notificationInterval) {
      notificationInterval = setInterval(loadNotifications, 30000);
    }
  } catch (err) {
    console.error("Error loading notifications:", err);
  }
}

/* ── Badge (uses .visible class to match dashboard CSS) ──────────────────── */

function updateNotificationBadge(notifications) {
  const badge = document.getElementById("notifBadge");
  if (!badge) return;

  const unread = notifications.filter(n => !n.is_read).length;

  if (unread > 0) {
    badge.textContent = unread > 99 ? "99+" : unread;
    badge.classList.add("visible");
  } else {
    badge.classList.remove("visible");
  }
}

/* ── Render panel ────────────────────────────────────────────────────────── */

function renderNotifications(notifications) {
  const list    = document.getElementById("notificationList");
  const summary = document.getElementById("notifSummaryBar");
  const sumText = document.getElementById("notifSummaryText");
  if (!list) return;

  const unread = notifications.filter(n => !n.is_read).length;

  // Summary bar
  if (summary) {
    if (unread > 0) {
      summary.style.display = "flex";
      if (sumText) sumText.textContent = `${unread} unread notification${unread !== 1 ? "s" : ""}`;
    } else {
      summary.style.display = "none";
    }
  }

  // Empty state
  if (!notifications.length) {
    list.innerHTML = `
      <div class="notif-empty">
        <svg viewBox="0 0 24 24"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/></svg>
        <p>No notifications yet</p>
      </div>`;
    return;
  }

  list.innerHTML = notifications.map(n => `
    <div class="notif-item ${n.is_read ? "read" : "unread"}"
         onclick="markAsRead(${n.id})">
      <div class="notif-icon-wrap">
        ${getNotificationSvg(n.type)}
      </div>
      <div class="notif-body">
        <div class="notif-msg">${escapeHtml(n.message)}</div>
        <div class="notif-time">
          <svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
          ${formatTimeAgo(n.created_at)}
        </div>
      </div>
      <div class="notif-dot"></div>
    </div>
  `).join("");
}

/* ── SVG icons per notification type ─────────────────────────────────────── */

function getNotificationSvg(type) {
  const icons = {
    booking_confirmed: `<svg viewBox="0 0 24 24"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>`,
    booking_cancelled: `<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/></svg>`,
    booking_reminder:  `<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>`,
    payment_received:  `<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><path d="M12 6v2m0 8v2"/><path d="M15 10a3 3 0 0 0-6 0c0 1.7 1.3 2.5 3 3s3 1.3 3 3a3 3 0 0 1-6 0"/></svg>`,
    check_in_reminder: `<svg viewBox="0 0 24 24"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>`,
    admin_message:     `<svg viewBox="0 0 24 24"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.61 3.35 2 2 0 0 1 3.58 1h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.6a16 16 0 0 0 6 6l.92-.92a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 21.73 16z"/></svg>`,
    report_ready:      `<svg viewBox="0 0 24 24"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><polyline points="9 15 11 17 15 13"/></svg>`,
    account_suspended: `<svg viewBox="0 0 24 24"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/></svg>`,
    suspension_lifted: `<svg viewBox="0 0 24 24"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><polyline points="9 12 11 14 15 10"/></svg>`,
    appeal_resolved:   `<svg viewBox="0 0 24 24"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><polyline points="9 12 11 14 15 10"/></svg>`,
    penalty_applied:   `<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>`,
    password_reset:    `<svg viewBox="0 0 24 24"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>`,
  };
  // Normalise to lowercase so DB casing mismatches (e.g. "REPORT_READY") still resolve
  const key = (type || "").toLowerCase();
  return icons[key] || icons[type] || `<svg viewBox="0 0 24 24"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/></svg>`;
}

/* ── Toggle panel — driven by dashboard's toggleNotifications() ──────────── */
// dashboard.html defines toggleNotifications() which calls loadNotifications()
// when the panel opens. No duplicate definition here.

/* ── Mark as read ────────────────────────────────────────────────────────── */

async function markAsRead(notifId) {
  try {
    await apiFetch(`/notifications/${notifId}/read`, {
      method: "PUT",
      headers: authHeader()
    });
    await loadNotifications();
  } catch (err) {
    console.error("Error marking notification as read:", err);
  }
}

async function markAllAsRead() {
  try {
    await apiFetch("/notifications/read-all", {
      method: "PUT",
      headers: authHeader()
    });
    await loadNotifications();
  } catch (err) {
    console.error("Error marking all as read:", err);
    if (typeof showAlert === "function") {
      showAlert("Failed to mark notifications as read.", "error");
    }
  }
}

/* ── Helpers ─────────────────────────────────────────────────────────────── */

function formatTimeAgo(dateStr) {
  if (!dateStr) return "";
  const diff = Math.floor((Date.now() - new Date(dateStr)) / 1000);
  if (diff < 60)   return "Just now";
  if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
  if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
  if (diff < 604800) return `${Math.floor(diff / 86400)}d ago`;
  return new Date(dateStr).toLocaleDateString("en-US", { month: "short", day: "numeric" });
}

function escapeHtml(str) {
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

/* ── Browser push notifications (optional) ───────────────────────────────── */

if ("Notification" in window && Notification.permission === "default") {
  Notification.requestPermission();
}

/* ── Initial load on page ready ──────────────────────────────────────────── */

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", loadNotifications);
} else {
  loadNotifications();
}