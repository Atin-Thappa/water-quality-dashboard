// Loading Functions
function showLoading(message = `Loading...`) {
    let overlay = document.getElementById(`loadingOverlay`);
    if (!overlay) {
        overlay = document.createElement(`div`);
        overlay.id = `loadingOverlay`;
        overlay.innerHTML = `
            <div class="loading-content">
                <div class="loading-spinner"></div>
                <p class="loading-message">${message}</p>
            </div>
        `;
        document.body.appendChild(overlay);
    }
    overlay.style.display = `flex`;
}

function hideLoading() {
    const overlay = document.getElementById(`loadingOverlay`);
    if (overlay) {
        overlay.style.display = `none`;
    }
}

// Fetch complaints by city
async function fetchComplaints(city = null) {
    try {

        showLoading(`Loading complaints...`);

        const url = city
            ? `${baseURL}/complaint/list?city=${city}`
            : `${baseURL}/complaint/list`;
        const response = await fetch(url);

        if (!response.ok) {
            throw new Error(`Failed to fetch complaints`);
        }

        const data = await response.json();
        hideLoading();

        if (Array.isArray(data)) {
            return data.map(complaint => ({
                id: complaint.complaint_id,
                name: `User`, // As dont need to send name to backend
                email: complaint.user_gmail,
                city: complaint.city_name,
                status: mapStatusFromBackend(complaint.reported_status),
                date: complaint.time,
                work_status: complaint.work_status
            })).filter(c => c.work_status === `Pending`);
        }

        return [];
    } catch (error) {
        hideLoading();
        console.error(`Error fetching complaints:`, error);
        showNotification(`Failed to load complaints. Backend might be waking up, please wait...`, `error`);
        return [];
    }
}

// Submit new complaint
async function submitComplaint(complaintData) {
    try {
        showLoading(`Submitting complaint...`);

        const backendData = {
            user_gmail: complaintData.email,
            user_city: complaintData.city,
            water_quality: mapStatusToBackend(complaintData.status)
        };

        const response = await fetch(`${baseURL}/complaint/raise`, {
            method: `POST`,
            headers: {
                'Content-Type': `application/json`
            },
            body: JSON.stringify(backendData)
        });

        hideLoading();

        if (!response.ok) {
            throw new Error(`Failed to submit complaint`);
        }

        const data = await response.json();
        return { success: !data.error, data };
    } catch (error) {
        hideLoading();
        console.error(`Error submitting complaint:`, error);
        return { success: false, error: error.message };
    }
}

async function resolveComplaint(complaintId) {
    try {
        showLoading(`Resolving complaint...`);

        const response = await fetch(`${baseURL}/complaint/resolve/${complaintId}`, {
            method: `PUT`,
            headers: {
                'Content-Type': `application/json`
            }
        });

        hideLoading();

        if (!response.ok) {
            throw new Error(`Failed to resolve complaint`);
        }

        const data = await response.json();
        return { success: data.status === `success`, data };
    } catch (error) {
        hideLoading();
        console.error(`Error resolving complaint:`, error);
        return { success: false, error: error.message };
    }
}

// MCD Login
async function mcdLogin(email, password) {
    try {
        showLoading(`Logging in...`);

        const response = await fetch(`${baseURL}/mcd/login`, {
            method: `POST`,
            headers: {
                'Content-Type': `application/json`
            },
            body: JSON.stringify({ email, password })
        });

        hideLoading();

        if (!response.ok) {
            throw new Error(`Login failed`);
        }

        const data = await response.json();
        return { success: data.status === `success`, data };
    } catch (error) {
        hideLoading();
        console.error(`Error logging in:`, error);
        return { success: false, error: error.message };
    }
}