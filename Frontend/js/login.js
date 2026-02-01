let loginModal;
let loginForm;

// Initialize
function initLogin() {
    loginModal = document.getElementById(`loginModal`);
    loginForm = document.getElementById(`loginForm`);

    const loginBtn = document.getElementById(`loginBtn`);
    const guestBtn = document.getElementById(`guestBtn`);
    const closeBtn = document.getElementById(`closeLoginModal`);
    const cancelBtn = document.getElementById(`cancelLogin`);

    // Login btn to open modal
    if (loginBtn) {
        loginBtn.addEventListener(`click`, openLoginModal);
    }

    // Guest btn
    if (guestBtn) {
        guestBtn.addEventListener(`click`, () => {
            window.location.href = `guest-dashboard.html`;
        });
    }

    // Close modal
    if (closeBtn) {
        closeBtn.addEventListener(`click`, closeLoginModal);
    }

    if (cancelBtn) {
        cancelBtn.addEventListener(`click`, closeLoginModal);
    }

    // Close on outside click
    if (loginModal) {
        loginModal.addEventListener(`click`, (e) => {
            if (e.target === loginModal) {
                closeLoginModal();
            }
        });
    }

    // Handle form submission
    if (loginForm) {
        loginForm.addEventListener(`submit`, handleLogin);
    }
}

// Open modal
function openLoginModal() {
    loginModal.style.display = `flex`;
    document.body.style.overflow = `hidden`;
    // Clear any previous errors
    hideLoginError();
    // Focus on email field
    document.getElementById(`mcdEmail`).focus();
}

// Close modal
function closeLoginModal() {
    loginModal.style.display = `none`;
    document.body.style.overflow = `auto`;
    loginForm.reset();
    hideLoginError();
}

// Show error
function showLoginError(message) {
    const errorDiv = document.getElementById(`loginError`);
    const errorMsg = document.getElementById(`loginErrorMessage`);
    errorMsg.textContent = message;
    errorDiv.style.display = `block`;
}

// Hide error
function hideLoginError() {
    const errorDiv = document.getElementById(`loginError`);
    errorDiv.style.display = `none`;
}

// Validate email
function validateMCDEmail(email) {
    // Check if email ends with @mcd.in
    if (!email.endsWith(`@mcd.in`)) {
        return { valid: false, message: `Please use a valid MCD staff email (@mcd.in)` };
    }

    // Basic email check
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        return { valid: false, message: `Please enter a valid email address` };
    }

    return { valid: true };
}

// Handle form submission
async function handleLogin(e) {
    e.preventDefault();

    const email = document.getElementById(`mcdEmail`).value.trim();
    const password = document.getElementById(`mcdPassword`).value;

    // Clear previous errors
    hideLoginError();

    // Validate email
    const emailValidation = validateMCDEmail(email);
    if (!emailValidation.valid) {
        showLoginError(emailValidation.message);
        return;
    }

    // Validate password
    if (!password || password.length === 0) {
        showLoginError(`Please enter your password`);
        return;
    }

    // Show loading
    if (typeof showLoading === `function`) {
        showLoading(`Logging in...`);
    }

    // Call API
    const result = await mcdLogin(email, password);

    // Hide loading
    if (typeof hideLoading === `function`) {
        hideLoading();
    }

    // Handle result
    if (result.success) {
        // Store login info in session storage
        sessionStorage.setItem(`mcd_logged_in`, `true`);
        sessionStorage.setItem(`mcd_email`, email);
        sessionStorage.setItem(`mcd_name`, result.data.mcd_name || `Staff`);
        sessionStorage.setItem(`mcd_post`, result.data.mcd_post || ``);

        // Success message
        if (typeof showNotification === `function`) {
            showNotification(`Welcome ${result.data.mcd_name || `back`}!`, `success`);
        }

        // Redirect to admin dashboard, not insta
        setTimeout(() => {
            window.location.href = `admin-dashboard.html`;
        }, 500);
    } else {
        // error
        const errorMessage = result.data?.message || `Invalid email or password. Please try again.`;
        showLoginError(errorMessage);
    }
}

// Initialize on page load
document.addEventListener(`DOMContentLoaded`, initLogin);