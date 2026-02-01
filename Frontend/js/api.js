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

// Helper function
function wait(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

// Sample data for fallback
const SampleComplaints = [
    { complaint_id: 1001, user_gmail: `rahul@gmail.com`, city_name: `Rohini`, reported_status: `Bad`, work_status: `Pending`, time: `2024-11-10` },
    { complaint_id: 1003, user_gmail: `karan@gmail.com`, city_name: `Narela`, reported_status: `Severe`, work_status: `Pending`, time: `2024-11-18` },
    { complaint_id: 1004, user_gmail: `vikram@gmail.com`, city_name: `Laxmi Nagar`, reported_status: `Severe`, work_status: `Pending`, time: `2024-11-22` },
    { complaint_id: 1006, user_gmail: `manish@gmail.com`, city_name: `Hauz Khas`, reported_status: `Bad`, work_status: `Pending`, time: `2024-12-01` },
    { complaint_id: 1008, user_gmail: `alok@gmail.com`, city_name: `Preet Vihar`, reported_status: `Bad`, work_status: `Pending`, time: `2024-12-08` },
    { complaint_id: 1010, user_gmail: `amit@gmail.com`, city_name: `Karol Bagh`, reported_status: `Bad`, work_status: `Pending`, time: `2024-12-15` },
    { complaint_id: 1014, user_gmail: `karan@gmail.com`, city_name: `Narela`, reported_status: `Severe`, work_status: `Pending`, time: `2025-01-02` },
    { complaint_id: 1015, user_gmail: `vikram@gmail.com`, city_name: `Laxmi Nagar`, reported_status: `Severe`, work_status: `Pending`, time: `2025-01-05` },
    { complaint_id: 1017, user_gmail: `tina@gmail.com`, city_name: `Pitampura`, reported_status: `Bad`, work_status: `Pending`, time: `2025-01-10` },
    { complaint_id: 1019, user_gmail: `pooja@gmail.com`, city_name: `Rajouri Garden`, reported_status: `Bad`, work_status: `Pending`, time: `2025-01-15` },
    { complaint_id: 1024, user_gmail: `priya@gmail.com`, city_name: `Azadpur`, reported_status: `Bad`, work_status: `Pending`, time: `2025-02-05` },
    { complaint_id: 1026, user_gmail: `naveen@gmail.com`, city_name: `Punjabi Bagh`, reported_status: `Bad`, work_status: `Pending`, time: `2025-02-10` },
    { complaint_id: 1027, user_gmail: `neeraj@gmail.com`, city_name: `Connaught Place`, reported_status: `Bad`, work_status: `Pending`, time: `2025-02-12` },
    { complaint_id: 1029, user_gmail: `vikram@gmail.com`, city_name: `Laxmi Nagar`, reported_status: `Severe`, work_status: `Pending`, time: `2025-02-18` },
    { complaint_id: 1030, user_gmail: `sunil@gmail.com`, city_name: `Shahdara`, reported_status: `Severe`, work_status: `Pending`, time: `2025-02-20` },
    { complaint_id: 1032, user_gmail: `mehul@gmail.com`, city_name: `Rohini`, reported_status: `Bad`, work_status: `Pending`, time: `2025-03-01` },
    { complaint_id: 1035, user_gmail: `alok@gmail.com`, city_name: `Preet Vihar`, reported_status: `Bad`, work_status: `Pending`, time: `2025-03-12` }
];

let useSampleData = false;

// Fetch complaints by city with retry logic and fallback
async function fetchComplaints(city = null, retryCount = 0) {
    // If we`re already using Sample data, just return Sample data
    if (useSampleData) {
        console.log(`Using Sample data (backend unavailable)`);
        await wait(500);
        const filtered = city
            ? SampleComplaints.filter(c => c.city_name === city)
            : SampleComplaints;
        return filtered.map(complaint => ({
            id: complaint.complaint_id,
            name: `User`,
            email: complaint.user_gmail,
            city: complaint.city_name,
            status: mapStatusFromBackend(complaint.reported_status),
            date: complaint.time,
            work_status: complaint.work_status
        }));
    }

    const maxRetries = 2;
    const retryDelay = 1500;

    try {
        if (retryCount === 0) {
            showLoading(`Loading complaints...`);
        } else {
            showLoading(`Retrying... (${retryCount}/${maxRetries})`);
        }

        const url = city
            ? `${baseURL}/complaint/list?city=${encodeURIComponent(city)}`
            : `${baseURL}/complaint/list`;

        console.log(`Fetching from URL:`, url);

        const response = await fetch(url, {
            method: `GET`,
            headers: {
                'Accept': `application/json`,
            },
            mode: `cors`
        });

        console.log(`Response status:`, response.status);

        // Handle 500 errors with retry
        if (response.status === 500 && retryCount < maxRetries) {
            console.log(`Server error, retrying in ${retryDelay}ms...`);
            hideLoading();
            await wait(retryDelay);
            return fetchComplaints(city, retryCount + 1);
        }

        if (!response.ok) {
            const errorText = await response.text();
            console.error(`Error response:`, errorText);

            // If we`ve used all retries, switch to Sample data
            if (retryCount >= maxRetries) {
                console.warn(`Backend failed after retries, switching to Sample data`);
                useSampleData = true;
                hideLoading();
                showNotification(`Using Sample data (backend unavailable)`, `info`);
                return fetchComplaints(city); // Retry with Sample data
            }

            throw new Error(`HTTP ${response.status}: Server error`);
        }

        const data = await response.json();
        console.log(`Received data:`, data);
        hideLoading();

        if (Array.isArray(data)) {
            const mappedData = data.map(complaint => ({
                id: complaint.complaint_id,
                name: `User`,
                email: complaint.user_gmail,
                city: complaint.city_name,
                status: mapStatusFromBackend(complaint.reported_status),
                date: complaint.time,
                work_status: complaint.work_status
            })).filter(c => c.work_status === `Pending`);

            console.log(`Mapped complaints:`, mappedData);
            return mappedData;
        }

        return [];
    } catch (error) {
        hideLoading();
        console.error(`Error fetching complaints:`, error);

        // After all retries fail, use Sample data
        if (retryCount >= maxRetries && !useSampleData) {
            console.warn(`Switching to Sample data due to error`);
            useSampleData = true;
            showNotification(`Using Sample data (backend unavailable)`, `info`);
            return fetchComplaints(city);
        }

        let errorMessage = `Failed to load complaints.`;
        if (error.name === `TypeError` && error.message.includes(`fetch`)) {
            errorMessage = `Cannot connect to server. Using Sample data.`;
            useSampleData = true;
            return fetchComplaints(city);
        }

        showNotification(errorMessage, `error`);
        return [];
    }
}

// Submit new complaint
async function submitComplaint(complaintData) {
    // If using Sample data, show success
    if (useSampleData) {
        console.log(`Sample: Complaint submitted`, complaintData);
        await wait(500);

        // Add to Sample data
        const newComplaint = {
            complaint_id: SampleComplaints.length + 1001,
            user_gmail: complaintData.email,
            city_name: complaintData.city,
            reported_status: mapStatusToBackend(complaintData.status),
            work_status: `Pending`,
            time: new Date().toISOString().split(`T`)[0]
        };
        SampleComplaints.unshift(newComplaint);

        return { success: true, data: { message: "Complaint raised successfully (Sample)" } };
    }

    try {
        showLoading(`Submitting complaint...`);

        const backendData = {
            user_gmail: complaintData.email,
            user_city: complaintData.city,
            water_quality: mapStatusToBackend(complaintData.status)
        };

        console.log(`Submitting complaint:`, backendData);

        const response = await fetch(`${baseURL}/complaint/raise`, {
            method: `POST`,
            headers: {
                'Content-Type': `application/json`,
                'Accept': `application/json`
            },
            mode: `cors`,
            body: JSON.stringify(backendData)
        });

        console.log(`Submit response status:`, response.status);

        if (!response.ok) {
            const errorText = await response.text();
            console.error(`Submit error response:`, errorText);
            throw new Error(`Server returned error ${response.status}`);
        }

        const data = await response.json();
        console.log(`Submit response data:`, data);
        hideLoading();

        return { success: !data.error, data };
    } catch (error) {
        hideLoading();
        console.error(`Error submitting complaint:`, error);

        // Fallback to Sample
        if (useSampleData) {
            return submitComplaint(complaintData);
        }

        return { success: false, error: error.message };
    }
}

async function resolveComplaint(complaintId) {
    // If using Sample data, show success
    if (useSampleData) {
        console.log(`Sample: Complaint resolved`, complaintId);
        await wait(500);

        // Remove from Sample data
        const index = SampleComplaints.findIndex(c => c.complaint_id === complaintId);
        if (index !== -1) {
            SampleComplaints[index].work_status = `Resolved`;
        }

        return { success: true, data: { status: "success", message: "Complaint resolved (Sample)" } };
    }

    try {
        showLoading(`Resolving complaint...`);

        console.log(`Resolving complaint ID:`, complaintId);

        const response = await fetch(`${baseURL}/complaint/resolve/${complaintId}`, {
            method: `PUT`,
            headers: {
                'Content-Type': `application/json`,
                'Accept': `application/json`
            },
            mode: `cors`
        });

        console.log(`Resolve response status:`, response.status);

        if (!response.ok) {
            const errorText = await response.text();
            console.error(`Resolve error response:`, errorText);
            throw new Error(`Server returned error ${response.status}`);
        }

        const data = await response.json();
        console.log(`Resolve response data:`, data);
        hideLoading();

        return { success: data.status === `success`, data };
    } catch (error) {
        hideLoading();
        console.error(`Error resolving complaint:`, error);

        // Fallback to Sample
        if (useSampleData) {
            return resolveComplaint(complaintId);
        }

        return { success: false, error: error.message };
    }
}

// MCD Login
async function mcdLogin(email, password) {
    try {
        showLoading(`Logging in...`);

        const loginData = { email, password };
        console.log(`Attempting login for:`, email);

        const response = await fetch(`${baseURL}/mcd/login`, {
            method: `POST`,
            headers: {
                'Content-Type': `application/json`,
                'Accept': `application/json`
            },
            mode: `cors`,
            body: JSON.stringify(loginData)
        });

        console.log(`Login response status:`, response.status);

        if (!response.ok) {
            const errorText = await response.text();
            console.error(`Login error response:`, errorText);
            throw new Error(`Login failed: Server error ${response.status}`);
        }

        const data = await response.json();
        console.log(`Login response data:`, data);
        hideLoading();

        return { success: data.status === `success`, data };
    } catch (error) {
        hideLoading();
        console.error(`Error logging in:`, error);
        return { success: false, error: error.message };
    }
}