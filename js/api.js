// js/api.js
const API_BASE = "https://sport-court-backend.onrender.com/api";

function authHeader() {
  return {
    "Content-Type": "application/json",
    "Authorization": "Bearer " + localStorage.getItem("token")
  };
}

async function apiFetch(url, options = {}) {
  try {
    const res = await fetch(API_BASE + url, options);
    const data = await res.json();
    
    // Handle unauthorized
    if (res.status === 401) {
      localStorage.clear();
      location.href = "../index.html";
    }
    
    return data;
  } catch(err) {
    console.error("API Error:", err);
    throw err;
  }
}

// Utility function to format date
function formatDate(dateString) {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', { 
    year: 'numeric', 
    month: 'short', 
    day: 'numeric' 
  });
}

// Utility function to format time
function formatTime(timeString) {
  return timeString.substring(0, 5);
}

// Utility function to format currency
function formatCurrency(amount) {
  return `${amount} coins`;
}

// Show loading spinner
function showLoading(elementId) {
  const element = document.getElementById(elementId);
  if (element) {
    element.innerHTML = '<div class="spinner"></div>';
  }
}

// Show alert message
function showAlert(message, type = 'info') {
  const alertDiv = document.createElement('div');
  alertDiv.className = `alert alert-${type}`;
  alertDiv.textContent = message;
  alertDiv.style.position = 'fixed';
  alertDiv.style.top = '20px';
  alertDiv.style.right = '20px';
  alertDiv.style.zIndex = '10000';
  alertDiv.style.minWidth = '300px';
  
  document.body.appendChild(alertDiv);
  
  setTimeout(() => {
    alertDiv.remove();
  }, 5000);
}
