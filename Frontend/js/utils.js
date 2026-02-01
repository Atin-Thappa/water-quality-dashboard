// Map frontend status to backend status
function mapStatusToBackend(status) {
    const mapping = {
        'good': 'Good',
        'poor': 'Bad',
        'severe': 'Severe'
    };
    return mapping[status.toLowerCase()] || status;
}

// Map backend status to frontend status
function mapStatusFromBackend(status) {
    const mapping = {
        'Good': 'good',
        'Bad': 'poor',
        'Severe': 'severe'
    };
    return mapping[status] || status.toLowerCase();
}

// Notification message
function showNotification(message, type = 'success') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    document.body.appendChild(notification);

    setTimeout(() => {
        notification.classList.add('show');
    }, 100);

    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 3000);
}

// Format date
function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-IN', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    });
}

// Get severity color
function getSeverityColor(severity) {
    const colors = {
        'good': '#22c55e',
        'poor': '#eab308',
        'severe': '#ef4444',
        'Good': '#22c55e',
        'Bad': '#eab308',
        'Severe': '#ef4444'
    };
    return colors[severity] || '#6b7280';
}

// Get severity label
function getSeverityLabel(severity) {
    const labels = {
        'good': 'Good',
        'poor': 'Poor',
        'severe': 'Severe',
        'Good': 'Good',
        'Bad': 'Poor',
        'Severe': 'Severe'
    };
    return labels[severity] || severity;
}

// Validate email
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

// Validate form data
function validateFormData(data) {
    if (!data.name || data.name.trim() === '') {
        return { valid: false, message: 'Please enter your name' };
    }

    if (!data.email || !validateEmail(data.email)) {
        return { valid: false, message: 'Please enter a valid email' };
    }

    if (!data.status) {
        return { valid: false, message: 'Please select water quality status' };
    }

    if (!data.city) {
        return { valid: false, message: 'Please select a city' };
    }

    return { valid: true };
}