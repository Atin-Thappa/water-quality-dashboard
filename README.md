# Community Water Quality Monitoring Dashboard

**A Citizen-Driven Digital Platform for Real-Time Water Quality Monitoring and Municipal Response Management**

---

## Problem Statement

In many parts of India, citizens face recurring issues with unsafe or poor-quality water supply, but lack an accessible, reliable, and low-effort way to report these issues to the appropriate municipal authorities. Existing reporting mechanisms are either manual, fragmented, or poorly maintained, leading to low citizen participation and delayed response from authorities. As a result, water quality issues often go unreported, unresolved, or addressed too late, directly impacting public health and quality of life.

There is a need for a simple, location-based, citizen-driven digital platform that allows users to easily report local water quality issues and visually communicate these problem areas to municipal bodies, enabling faster awareness, prioritization, and action.

---

## Solution Overview

The Community Water Quality Monitoring Dashboard is a web-based platform that bridges the gap between citizens and municipal authorities in addressing water quality issues. The solution provides:

### For Citizens (Guest Users):
- **Easy Reporting**: Simple, intuitive form to report water quality issues in their locality
- **Visual Feedback**: Interactive map displaying all reported complaints with color-coded severity indicators
- **Location-Based Filtering**: View complaints specific to their city/area
- **Real-Time Updates**: See the current status of water quality across different locations

### For Municipal Authorities (MCD Staff):
- **Centralized Dashboard**: Single interface to view all pending complaints across Delhi
- **Geographical Visualization**: Map-based view to identify problem areas and prioritize interventions
- **Complaint Management**: Ability to review complaint details and mark issues as resolved
- **Authenticated Access**: Secure login system ensuring only authorized staff can manage complaints
- **User Information**: Display of logged-in staff details for accountability

### Key Benefits:
1. **Transparency**: Public visibility of water quality issues and their resolution status
2. **Efficiency**: Streamlined reporting and response workflow
3. **Data-Driven Decisions**: Aggregated data helps identify areas requiring immediate attention
4. **Community Engagement**: Empowers citizens to actively participate in improving water quality
5. **Accountability**: Track record of complaints and resolutions

---

## Features

### Public Features (Guest Access)
- ✅ Interactive map with Leaflet.js showing all water quality complaints
- ✅ Color-coded markers (Green: Good, Yellow: Poor, Red: Severe)
- ✅ City-wise filtering across 20 locations in Delhi
- ✅ Complaint submission form with validation
- ✅ Real-time complaint visualization
- ✅ Responsive design (Desktop, Tablet, Mobile)
- ✅ Collapsible sidebar for better map viewing

### Admin Features (MCD Staff Only)
- ✅ Secure authentication with MCD email validation
- ✅ Session-based access control
- ✅ View all pending complaints on interactive map
- ✅ Detailed complaint information (reporter, location, severity, date)
- ✅ Mark complaints as resolved
- ✅ User profile display (name, post, email)
- ✅ Logout functionality
- ✅ Same responsive design and filtering capabilities

### User Experience
- ✅ Loading indicators for better feedback
- ✅ Toast notifications for user actions
- ✅ Modal-based forms for clean interface
- ✅ Hamburger menu for mobile devices
- ✅ Smooth animations and transitions
- ✅ Accessibility considerations (color + text for severity)

---

## Tech Stack

### Frontend
| Technology | Purpose | Version |
|------------|---------|---------|
| HTML5 | Structure | - |
| CSS3 | Styling & Animations | - |
| JavaScript (Vanilla) | Interactivity & Logic | ES6+ |
| Leaflet.js | Interactive Maps | 1.9.4 |

### Backend
| Technology | Purpose | Version |
|------------|---------|---------|
| Python | Server-side Logic | 3.11+ |
| Flask | Web Framework | 3.x |
| Flask-CORS | Cross-Origin Support | 4.x |
| MySQL | Database | 8.x |
| mysql-connector-python | Database Driver | 8.x |
| python-dotenv | Environment Variables | 1.x |

### Deployment
| Platform | Purpose |
|----------|---------|
| Render | Backend Hosting |
| Netlify/Vercel | Frontend Hosting (Recommended) |

### Development Tools
- Git & GitHub for version control
- VS Code as IDE
- MySQL Workbench for database management
- Postman/curl for API testing

---

## System Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                         FRONTEND                            │
│  ┌──────────────┐  ┌─────────────┐  ┌──────────────┐        │
│  │  Login Page  │  │    Guest    │  │    Admin     │        │
│  │  (index.html)│  │  Dashboard  │  │  Dashboard   │        │
│  └──────────────┘  └─────────────┘  └──────────────┘        │
│         │                  │                  │             │
│         └──────────────────┴──────────────────┘             │
│                            │                                │
│                    ┌───────▼────────┐                       │
│                    │   JavaScript   │                       │
│                    │   API Layer    │                       │
│                    └───────┬────────┘                       │
└────────────────────────────┼────────────────────────────────┘
                             │
                    ┌────────▼────────┐
                    │   HTTPS/JSON    │
                    └────────┬────────┘
                             │
┌────────────────────────────▼──────────────────────────────┐
│                      BACKEND (Flask)                      │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐     │
│  │ /mcd/login   │  │/complaint/   │  │/complaint/   │     │
│  │              │  │raise         │  │list          │     │
│  └──────────────┘  └──────────────┘  └──────────────┘     │
│  ┌──────────────┐  ┌──────────────┐                       │
│  │/complaint/   │  │/api/map-data │                       │
│  │resolve/{id}  │  │              │                       │
│  └──────────────┘  └──────────────┘                       │
│                            │                              │
│                    ┌───────▼────────┐                     │
│                    │  project.py    │                     │
│                    │(Business Logic)│                     │
│                    └───────┬────────┘                     │
└────────────────────────────┼──────────────────────────────┘
                             │
                    ┌────────▼────────┐
                    │  MySQL Database │
                    └─────────────────┘
                    │                 │
            ┌───────▼─────┐   ┌──────▼───────┐
            │   Tables:   │   │   Tables:    │
            │ - mcd_staff │   │- complaints  │
            │ - users     │   │- city_dataset│
            └─────────────┘   └──────────────┘
```

---

## Installation & Setup

### Prerequisites
- Python 3.11 or higher
- MySQL 8.x or higher
- Git
- Web browser (Chrome, Firefox, Safari, or Edge)

### Backend Setup

#### 1. Clone the Repository
```bash
git clone <your-repository-url>
cd water-dashboard
```

#### 2. Install Python Dependencies
```bash
pip install -r requirements.txt
```

Or install manually:
```bash
pip install flask flask-cors mysql-connector-python python-dotenv
```

#### 3. Setup MySQL Database
```bash
# Login to MySQL
mysql -u root -p

# Run the database script
source database.sql
```

Or use MySQL Workbench:
1. Open MySQL Workbench
2. Connect to your MySQL server
3. File → Open SQL Script → Select `database.sql`
4. Execute (⚡ icon)

#### 4. Configure Environment Variables
Create a `.env` file in the project root:
```env
DB_PASS=your_mysql_root_password
```

#### 5. Run the Backend Server
```bash
python app.py
```

Server will start on: `http://localhost:1000`

### Frontend Setup

#### Option 1: Direct File Access
Simply open `index.html` in your web browser.

#### Option 2: Local Server (Recommended)
```bash
# Using Python
python -m http.server 8000

# Using Node.js
npx http-server -p 8000
```

Then navigate to: `http://localhost:8000`

#### Option 3: VS Code Live Server
1. Install "Live Server" extension in VS Code
2. Right-click `index.html`
3. Select "Open with Live Server"

### Configuration

Update the backend URL in `js/config.js`:
```javascript
const baseURL = 'http://localhost:1000'; // For local development
// OR
const baseURL = 'https://your-backend-url.com'; // For production
```

---

## Usage Guide

### For Citizens (Guest Users)

1. **Access the Platform**
   - Navigate to the website
   - Click "View as Guest"

2. **View Water Quality Reports**
   - Map shows all pending complaints
   - Green markers = Good quality
   - Yellow markers = Poor quality
   - Red markers = Severe issues
   - Click markers to see details

3. **Filter by Location**
   - Use city dropdown to filter complaints
   - Select specific city or "All Cities"

4. **Report a Complaint**
   - Click "+ Report Complaint" button
   - Fill in the form:
     - Name
     - Email (must exist in database)
     - City
     - Water Quality Status
   - Submit
   - View confirmation message

### For MCD Staff (Admin Users)

1. **Login**
   - Click "LOGIN" on home page
   - Enter MCD staff email (@mcd.in)
   - Enter password
   - Click "Login"

2. **View All Complaints**
   - Admin dashboard shows all pending complaints
   - Use map for geographical overview
   - Filter by city as needed

3. **Review Complaint Details**
   - Click any marker on the map
   - View details in left sidebar:
     - City
     - Status (severity)
     - Reporter name
     - Email
     - Date reported

4. **Resolve Complaints**
   - After reviewing, click "Mark as Resolved"
   - Confirm the action
   - Complaint disappears from map
   - Database updated automatically

5. **Logout**
   - Click "← Logout" button
   - Confirm logout
   - Redirected to login page

### Test Credentials

**MCD Staff Accounts:**
```
Email: amit.sharma@mcd.in
Password: Amit@123

Email: ravi.verma@mcd.in
Password: Ravi@234

Email: neha.singh@mcd.in
Password: Neha@345
```

**Sample User Emails (for complaints):**
```
rahul@gmail.com
sneha@gmail.com
arjun@gmail.com
karan@gmail.com
```

---

## Project Status

### Completed Features

#### Core Functionality
- [x] User-friendly complaint submission form
- [x] Interactive map with Leaflet.js integration
- [x] Real-time complaint visualization
- [x] City-based filtering (20 Delhi locations)
- [x] Color-coded severity indicators
- [x] Admin complaint management
- [x] Complaint resolution workflow

#### Technical Implementation
- [x] RESTful API architecture
- [x] MySQL database with proper schema
- [x] Session-based authentication
- [x] CORS configuration for API access
- [x] Responsive design (mobile, tablet, desktop)
- [x] Loading indicators for better UX
- [x] Error handling and validation
- [x] Frontend-backend integration

#### User Interface
- [x] Professional login page
- [x] Guest dashboard with reporting capability
- [x] Admin dashboard with management tools
- [x] Modal-based forms
- [x] Collapsible sidebar
- [x] Hamburger menu for mobile
- [x] Toast notifications
- [x] User info display for admins

#### Deployment
- [x] Backend deployed on Render
- [x] Frontend deployment-ready
- [x] Environment configuration
- [x] Documentation complete

---

## Out of Scope / Future Enhancements

### Phase 1 (Not Implemented - Suggested for Future)

#### User Management
- [ ] MCD staff authentication system
- [ ] User registration system for citizens
- [ ] Email verification for new users
- [ ] Password reset functionality
- [ ] User profile management
- [ ] Auto-create users on first complaint

#### Enhanced Features
- [ ] Image upload for complaints (proof of water quality)
- [ ] Complaint history tracking
- [ ] Analytics dashboard for MCD staff
- [ ] Trend analysis over time
- [ ] Email notifications for complaint status changes
- [ ] SMS alerts for critical water quality issues
- [ ] Multi-language support (Hindi, English)

#### Data Management
- [ ] Export complaints data to CSV/Excel
- [ ] Advanced filtering (date range, status, severity)
- [ ] Bulk operations for admins
- [ ] Complaint assignment to specific staff
- [ ] Priority-based queue management

#### Reporting & Analytics
- [ ] City-wise water quality reports
- [ ] Monthly/yearly statistics
- [ ] Heat maps for problem areas
- [ ] Resolution time tracking
- [ ] Performance metrics for MCD staff

### Phase 2 (Advanced Features)

#### Integration
- [ ] Integration with water testing lab results
- [ ] IoT sensor data integration
- [ ] Integration with municipal water supply systems
- [ ] Third-party API integrations

#### Advanced Analytics
- [ ] Predictive analysis for water quality trends
- [ ] Machine learning for complaint categorization
- [ ] Automated severity assessment
- [ ] Anomaly detection

#### Mobile Application
- [ ] Native iOS app
- [ ] Native Android app
- [ ] Push notifications
- [ ] Offline mode

#### Community Features
- [ ] Public comment system
- [ ] Upvoting/validation by other citizens
- [ ] Community forums
- [ ] Water quality awareness campaigns

---

## Key Achievements

1. **Fully Functional Platform**: End-to-end workflow from complaint submission to resolution
2. **Real-Time Visualization**: Geographic representation of water quality issues
3. **Responsive Design**: Works seamlessly across all device sizes
4. **Production Deployment**: Live backend accessible via public URL
5. **Comprehensive Documentation**: Multiple guides for setup, usage, and testing

---

## Contributing

This is an academic project. For contributions or improvements:

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

---

## License

This project is created for academic purposes.

© 2025 Community Water Quality Monitoring Dashboard. All rights reserved.

---

## Team

- Atin Thappa - Frontend
- Diksha Gupta - Backend
- Kasak Jha - Backend
- Mouli Gupta - Database

---

## Acknowledgments

- Municipal Corporation of Delhi (MCD) for the problem domain
- OpenStreetMap contributors for map data
- Leaflet.js community for the mapping library
- Flask and Python communities

---

## Support

For issues or questions:
- Create an issue in the repository
- Contact: atinthappa@gmail.com

---

## Links

- **Live Demo**: https://water-quality-dashboard-sigma.vercel.app
- **Backend API**: https://water-quality-dashboard-1.onrender.com
- **Repository**: https://github.com/Atin-Thappa/water-quality-dashboard


---

## Project Statistics

- **Total Lines of Code**: ~5000+
- **Frontend Files**: 15+
- **Backend Files**: 3
- **Database Tables**: 4
- **API Endpoints**: 5
- **Supported Cities**: 20
- **Features Implemented**: 25+
- **Documentation Pages**: 10+

---

*Last Updated: February 2026*