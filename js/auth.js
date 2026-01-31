// js/auth.js
async function login() {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  const errorDiv = document.getElementById("error");

  try {
    const data = await apiFetch("/auth/login", {
      method: "POST",
      headers: {"Content-Type":"application/json"},
      body: JSON.stringify({ email, password })
    });

    if (!data.token) {
      errorDiv.textContent = "Login failed. Please check your credentials.";
      errorDiv.style.display = "block";
      return;
    }

    localStorage.setItem("token", data.token);
    localStorage.setItem("role", data.user.role);
    localStorage.setItem("userId", data.user.id);
    localStorage.setItem("userEmail", data.user.email);

    if (data.user.role === "admin") {
      location.href = "admin/dashboard.html";
    } else {
      location.href = "user/dashboard.html";
    }
  } catch(err) {
    errorDiv.textContent = "Login error. Please try again.";
    errorDiv.style.display = "block";
  }
}

function logout() {
  localStorage.clear();
  location.href = "../index.html";
}

// Check if user is logged in
function checkAuth() {
  const token = localStorage.getItem("token");
  if (!token) {
    location.href = "../index.html";
  }
  return token;
}

// Check if user is admin
function checkAdminAuth() {
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");
  
  if (!token || role !== "admin") {
    location.href = "../index.html";
  }
}
