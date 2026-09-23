# E-Waste Logistics & Routing Platform ♻️

A full-stack web application designed to manage e-waste pickup requests, coordinate recycling centers, and optimize location-based routing. Built with the MERN stack (MongoDB, Express.js, React.js, Node.js).

## Core Features
* **Ticket Management:** End-to-end REST APIs for users to create, track, and update e-waste pickup requests.
* **Location-Based Routing:** Utilizes MongoDB geospatial queries (`$geoNear`) to automatically assign pickup tickets to the nearest available recycling center based on coordinates.
* **Administrative Dashboard:** React-based UI for recycling center admins to manage active queues and monitor platform logistics.
* **Tested Reliability:** API routing and database operations verified using Jest integration tests.

## Tech Stack
* **Frontend:** React.js, Vite
* **Backend:** Node.js, Express.js
* **Database:** MongoDB, Mongoose
* **Testing:** Jest, Supertest

## Local Development Setup

**1. Clone the repository**
\`\`\`bash
git clone https://github.com/LaliteshKannuri/ewaste-platform.git
cd ewaste-platform
\`\`\`

**2. Install Backend Dependencies**
\`\`\`bash
cd server
npm install
\`\`\`

**3. Environment Variables**
Create a \`.env\` file in the `server` directory with your MongoDB URI:
\`\`\`env
PORT=5000
MONGO_URI=your_mongodb_connection_string
\`\`\`

**4. Start the Development Server**
\`\`\`bash
npm run dev
\`\`\`
