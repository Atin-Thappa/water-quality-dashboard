// Fetch complaints by city
async function fetchComplaints(city = null) {
    try {
        const url = city
            ? `${baseURL}/complaint/list?city=${city}`
            : `${baseURL}/complaint/list`;
        const response = await fetch(url);

        if (!response.ok) {
            throw new Error('Failed to fetch complaints');
        }

        const data = await response.json();

        if (Array.isArray(data)) {
            return data.map(complaint => ({
                id: complaint.complaint_id,
                name: 'User',
                email: complaint.user_gmail,
                city: complaint.city_name,
                status: mapStatusFromBackend(complaint.reported_status),
                date: complaint.time,
                work_status: complaint.work_status
            })).filter(c => c.work_status === 'Pending'); // To only show pending
        }

        return [];
    } catch (error) {
        console.error('Error fetching complaints:', error);
        showNotification('Failed to load complaints', 'error');
        return [];
    }
}

// Submit new complaint
async function submitComplaint(complaintData) {
    try {
        const backendData = {
            user_gmail: complaintData.email,
            user_city: complaintData.city,
            water_quality: mapStatusToBackend(complaintData.status)
        };

        const response = await fetch(`${baseURL}/complaint/raise`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(backendData)
        });

        if (!response.ok) {
            throw new Error('Failed to submit complaint');
        }

        const data = await response.json();
        return { success: !data.error, data };
    } catch (error) {
        console.error('Error submitting complaint:', error);
        return { success: false, error: error.message };
    }
}

// Resolve complaint
async function resolveComplaint(complaintId) {
    try {
        const response = await fetch(`${baseURL}/complaint/resolve/${complaintId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (!response.ok) {
            throw new Error('Failed to resolve complaint');
        }

        const data = await response.json();
        return { success: data.status === 'success', data };
    } catch (error) {
        console.error('Error resolving complaint:', error);
        return { success: false, error: error.message };
    }
}

// MCD Login
async function mcdLogin(email, password) {
    try {
        const response = await fetch(`${baseURL}/mcd/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, password })
        });

        if (!response.ok) {
            throw new Error('Login failed');
        }

        const data = await response.json();
        return { success: data.status === 'success', data };
    } catch (error) {
        console.error('Error logging in:', error);
        return { success: false, error: error.message };
    }
}