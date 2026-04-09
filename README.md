# School Management API

A scalable, production-ready REST API built with Node.js and MySQL to efficiently manage school data, featuring geographic proximity sorting and robust input validation.

![Node.js](https://img.shields.io/badge/Node.js-22.22.0-green.svg)
![Express.js](https://img.shields.io/badge/Express.js-Backend-black.svg)
![MySQL](https://img.shields.io/badge/MySQL-AWS_RDS-blue.svg)
![Render](https://img.shields.io/badge/Render-Deployed-purple.svg)

---

## Live Cloud Demo
The application is currently live and deployed in a production-like environment. Interviewers and stakeholders can immediately test the endpoints without any local setup.

- **Live Base URL:** `https://edut-wci9.onrender.com`
- **Cloud Database:** Hosted on **Amazon Web Services (AWS RDS)** using MySQL.
- **API Hosting:** Deployed automatically using **Render** via GitHub webhooks.

---

## API Endpoints

### 1. Add a School
Validates and safely inserts a new school into the database.
- **URL:** `/addSchool`
- **Method:** `POST`
- **Headers:** `Content-Type: application/json`

**Request Body Example:**
```json
{
  "name": "Bayside High",
  "address": "505 Cedar Ave, San Francisco",
  "latitude": 37.7749,
  "longitude": -122.4194
}
```

**Successful Response (201 Created):**
```json
{
    "message": "School successfully added",
    "schoolId": 11
}
```

---

### 2. List Schools by Proximity
Fetches all schools from the database and sorts them closest-to-farthest based on the user's `latitude` and `longitude` using the **Haversine formula**.
- **URL:** `/listSchools`
- **Method:** `GET`

**Request Example:**
`GET https://edut-wci9.onrender.com/listSchools?latitude=37.7749&longitude=-122.4194`

**Successful Response (200 OK):**
```json
[
  {
    "id": 5,
    "name": "Bayside High",
    "address": "505 Cedar Ave, San Francisco",
    "latitude": 37.7749,
    "longitude": -122.4194,
    "distance": 0
  },
  {
    "id": 1,
    "name": "Greenwood High",
    "address": "101 Pine St, Los Angeles",
    "latitude": 34.0522,
    "longitude": -118.2437,
    "distance": 559.12
  }
]
```

---

## Technology Stack
* **Language:** JavaScript (Node.js)
* **Framework:** Express.js
* **Validation:** Zod (Type-safe input schema validation)
* **Database:** MySQL (using `mysql2` with Promises)
* **Distance Calculation:** Haversine formula
* **Deployment:** AWS RDS & Render platform

---

## Local Setup Instructions

If you wish to run the project locally instead of using the live link:

1. **Clone the repository:**
   ```bash
   git clone https://github.com/Pratik740/eduT.git
   cd eduT
   ```
2. **Install dependencies:**
   ```bash
   npm install
   ```
3. **Configure Environment Variables:**
   Create a `.env` file in the root directory:
   ```env
   PORT=3000
   DB_HOST=your-rds-endpoint.amazonaws.com
   DB_USER=admin
   DB_PASSWORD=your_password
   DB_NAME=school_management
   ```
4. **Database Initialization:**
   Execute the schema inside `init/init.sql` against your MySQL database.
5. **Start the server:**
   ```bash
   npm run dev
   ```
