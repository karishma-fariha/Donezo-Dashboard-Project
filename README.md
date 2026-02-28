🚀 Donezo Dashboard
Donezo Dashboard is a premium, high-performance SaaS admin interface built with React 19, Tailwind CSS, and Framer Motion. It features real-time data visualization, a functional product catalog with cart management, and a robust authentication system.

✨ Key Features
📊 Advanced Analytics: Interactive data visualization using Recharts to track views, clicks, and conversions.

🛒 Product Management: A sleek product catalog with "Add to Cart" functionality and real-time counter updates.

👥 User Management: Animated tables displaying user status, join dates, and contact information.

🛡️ Secure Authentication: Full login/logout flow integrated with JWT tokens and React Toastify for feedback.

📱 Fully Responsive: Optimized for all screen sizes with a sticky, scroll-locked sidebar.

🛠️ Tech Stack

Category          Technology
Frontend      "React.js (Vite), Tailwind CSS"
Animations     Framer Motion
Icons          Lucide React, React icons
Charts         Recharts
State/UI      "React Hooks, React Toastify"
Routing        React Router 7

🔌 API Endpoints Integrated
This project communicates with a live backend API to fetch real-time data:

Overview: GET /api/overview (Total users, revenue, growth)

Users: GET /api/users (Member list and status)

Products: GET /api/products (Subscription plans and sales)

Analytics: GET /api/analytics (Time-series data for charts)

Auth: POST /api/login (Secure token generation)


🚀 Getting Started
1. Clone the repository

git clone https://github.com/your-username/donezo-dashboard.git
cd donezo-dashboard

2. Install dependencies

npm install

3. Run the development server

npm run dev

📂 Project Structure

src/
├── components/
│   ├── Sidebar.jsx      # Sticky navigation with logout logic
│   ├── ProductCard.jsx  # Individual product logic & animations
├── pages/
│   ├── Overview.jsx     # High-level system stats
│   ├── Analytics.jsx    # Bar & Donut charts
│   ├── Users.jsx        # Data table for user management
│   ├── Products.jsx     # Grid layout with Cart functionality
│   ├── Settings.jsx     # Dark mode & profile settings
│   ├── Login.jsx        # Auth page with Toastify alerts
└── App.jsx              # Routing & Protected routes


🎨 UI/UX Highlights
Sticky Sidebar: Remains fixed while the main content area scrolls, using sticky top-0 h-screen.

Staggered Animations: List items and grid cards slide into view using Framer Motion variants.

Feedback Loops: Every user action (Login, Logout, Add to Cart) is met with a visual toast or icon state change.

Devloped by
 
Karishma Fariha
📧 Email: karishmafarihakathi10@gmail.com
