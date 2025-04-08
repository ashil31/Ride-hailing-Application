# UBER MERN Application

## Overview
A full-stack ride-hailing application built using the MERN stack. This project mimics a ride-sharing service similar to Uber and is divided into two main parts:
- **Frontend:** A React application powered by Vite and styled with Tailwind CSS. It handles user/captain interactions, live tracking (via Google Maps), and real-time notifications (via Socket.IO).
- **Backend:** An Express server using MongoDB (via Mongoose) for data persistence, Socket.IO for real-time communication, and REST APIs for user, captain, ride, and map functionalities.

## Project Structure
- **frontend/**
  - Contains the React application with pages (e.g., UserLogin, UserSignUp, Home, Riding, CaptainLogin, etc.), context providers (User, Captain, Socket.IO), components, and configuration files (vite.config.js, tailwind.config.js, etc.).
- **Backend/**
  - Contains the Express server, models, controllers, services, and routes for handling users, captains, rides, maps, and authentication.
- **README Files:** 
  - This file documents the full project.
  - The Backend folder also contains a README.md with detailed API endpoint documentation.

## Prerequisites
- Node.js (v14 or later)
- A MongoDB instance (local or cloud)
- A Google Maps API key

## Setup Instructions

### Frontend
1. Open a terminal and navigate to the `frontend` folder:
   ```
   cd frontend
   ```
2. Install dependencies:
   ```
   npm install
   ```
3. Create a `.env` file inside `frontend/` with the following keys:
   ```
   VITE_BASE_URL=http://localhost:4000
   VITE_GOOGLE_MAPS_API=YOUR_GOOGLE_MAPS_API_KEY
   ```
4. Start the development server:
   ```
   npm run dev
   ```

### Backend
1. Open a terminal and navigate to the `Backend` folder:
   ```
   cd Backend
   ```
2. Install dependencies:
   ```
   npm install
   ```
3. Create a `.env` file inside `Backend/` with the following keys:
   ```
   DB_CONNECT=YOUR_MONGODB_CONNECTION_STRING
   JWT_SECRET=YOUR_SECRET_KEY
   GOOGLE_MAP_API=YOUR_GOOGLE_MAPS_API_KEY
   PORT=4000
   ```
4. Start the server:
   ```
   node server.js
   ```
   *(Optionally, use nodemon for auto-reloading)*

## API Documentation
Extensive API documentation is available in the Backend README (located at `Backend/README.md`). It covers:
- User registration, login, profile, and logout endpoints.
- Captain registration, login, profile, and logout endpoints.
- Ride creation, fare calculation, confirmation, start, and end endpoints.
- Map endpoints for coordinates, distance/time calculations, and auto-complete suggestions.

## Features
- **User Authentication:** Secure user and captain registration, login, and session management.
- **Ride Management:** Users can create ride requests and captains can accept, start, and finish rides with OTP confirmation.
- **Real-time Communication:** Uses Socket.IO to update ride statuses and notify nearby captains about new ride requests.
- **Maps Integration:** Google Maps API integration for live tracking, route calculations, and auto-complete suggestions.
- **Responsive Design:** The frontend is built with responsive layouts using Tailwind CSS.

## Environment Variables Summary

### Frontend (.env)
```
VITE_BASE_URL=http://localhost:4000
VITE_GOOGLE_MAPS_API=YOUR_GOOGLE_MAPS_API_KEY
```

### Backend (.env)
```
DB_CONNECT=YOUR_MONGODB_CONNECTION_STRING
JWT_SECRET=YOUR_SECRET_KEY
GOOGLE_MAP_API=YOUR_GOOGLE_MAPS_API_KEY
PORT=4000
```

## Testing & Deployment
- Currently, tests are not configured. Use tools like Postman to test the API endpoints.
- Both frontend and backend are designed to be easily deployed on cloud platforms. Adjust environment variables accordingly for production.

## Additional Documentation
- Consult inline comments within the source code for more details.
- The Backend README further describes each API endpoint with example requests and responses.
- For troubleshooting, check server logs and ensure your environmental variables are correctly set.

## License
This project is licensed under the MIT License.
