// Open top-up modal
function openTopUpModal() {
  const modal = document.getElementById("topUpModal");
  if (modal) {
    modal.style.display = "flex";
  }
}

// Close top-up modal
function closeTopUpModal() {
  const modal = document.getElementById("topUpModal");
  if (modal) {
    modal.style.display = "none";
    // Clear custom amount input
    const customInput = document.getElementById("customAmountInput");
    if (customInput) {
      customInput.value = "";
    }
  }
}

// Top up with preset amount
async function topUpPreset(coins, price) {
  if (!confirm(`Top up ${coins} coins for $${price}?`)) return;
  await performTopUp(coins);
}

// Top up with custom amount
async function topUpCustom() {
  const input = document.getElementById("customAmountInput");
  const amount = parseInt(input.value);
  
  if (!amount || amount <= 0) {
    showAlert("Please enter a valid amount", "error");
    return;
  }
  
  await performTopUp(amount);
}

// Perform the actual top-up
async function performTopUp(amount) {
  try {
    showAlert("Processing top-up...", "info");
    
    const response = await fetch(API_BASE + "/users/topup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + localStorage.getItem("token")
      },
      body: JSON.stringify({ amount })
    });
    
    const data = await response.json();

    if (!response.ok || data.error) {
      showAlert(data.error || "Top up failed", "error");
      return;
    }

    // Success!
    showAlert(`Successfully added ${amount} coins!`, "success");
    
    // Update coin balance display
    updateCoinBalance(data.coin_balance);
    
    // Close modal
    closeTopUpModal();
    
    // Reload the dashboard if the function exists
    if (typeof loadDashboard === 'function') {
      loadDashboard();
    }
    
  } catch (error) {
    console.error("Top up error:", error);
    showAlert("Top up failed. Please try again.", "error");
  }
}

// Update coin balance on the page
function updateCoinBalance(newBalance) {
  const balanceElement = document.getElementById("coinBalance");
  if (balanceElement) {
    balanceElement.textContent = newBalance;
  }
}

// Load user coin balance on page load
async function loadUserBalance() {
  try {
    const user = await apiFetch("/users/me", {
      headers: authHeader()
    });
    
    if (user && user.coin_balance !== undefined) {
      updateCoinBalance(user.coin_balance);
    }
  } catch (error) {
    console.error("Error loading user balance:", error);
  }
}

// Initialize on page load
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', loadUserBalance);
} else {
  loadUserBalance();
}