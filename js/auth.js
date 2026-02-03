// js/auth.js
async function login() {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  const errorDiv = document.getElementById("error");
  const loadingOverlay = document.getElementById("loadingOverlay");
  const loadingText = document.getElementById("loadingText");
  const loadingSubtext = document.getElementById("loadingSubtext");

  // Hide any previous errors
  if (errorDiv) {
    errorDiv.style.display = "none";
    errorDiv.classList.remove('show');
  }

  try {
    // Show loading overlay
    if (loadingOverlay) {
      loadingOverlay.classList.add('active');
    }

    const data = await apiFetch("/auth/login", {
      method: "POST",
      headers: {"Content-Type":"application/json"},
      body: JSON.stringify({ email, password })
    });

    if (!data.token) {
      // Hide loading overlay
      if (loadingOverlay) loadingOverlay.classList.remove('active');
      
      errorDiv.textContent = "Login failed. Please check your credentials.";
      errorDiv.style.display = "block";
      errorDiv.style.background = 'var(--c-red-dim)';
      errorDiv.style.borderColor = 'rgba(229,57,53,.25)';
      errorDiv.style.color = 'var(--c-red)';
      errorDiv.classList.add('show');
      return;
    }

    // Store authentication data
    localStorage.setItem("token", data.token);
    localStorage.setItem("role", data.user.role);
    localStorage.setItem("userId", data.user.id);
    localStorage.setItem("userEmail", data.user.email);
    if (data.user.name) localStorage.setItem("userName", data.user.name);
    localStorage.setItem("user", JSON.stringify(data.user));
    localStorage.setItem("isLoggedIn", "true");

    // Small delay to ensure localStorage writes complete
    await new Promise(resolve => setTimeout(resolve, 100));

    // Show success animation
    if (loadingOverlay) {
      loadingOverlay.classList.add('success');
      if (loadingText) loadingText.textContent = 'Login successful!';
    }

    // Determine redirect based on role
    let redirectUrl;
    if (data.user.role === "admin") {
      redirectUrl = "admin/dashboard.html";
      if (loadingSubtext) loadingSubtext.textContent = 'Redirecting to admin panel...';
    } else {
      redirectUrl = "user/dashboard.html";
      if (loadingSubtext) loadingSubtext.textContent = 'Redirecting to your dashboard...';
    }

    // Redirect after animation (1.5 seconds)
    setTimeout(() => {
      location.href = redirectUrl;
    }, 1500);

  } catch(err) {
    console.error('Login error:', err);
    
    // Hide loading overlay
    if (loadingOverlay) loadingOverlay.classList.remove('active');
    
    errorDiv.textContent = "Login error. Please try again.";
    errorDiv.style.display = "block";
    errorDiv.style.background = 'var(--c-red-dim)';
    errorDiv.style.borderColor = 'rgba(229,57,53,.25)';
    errorDiv.style.color = 'var(--c-red)';
    errorDiv.classList.add('show');
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