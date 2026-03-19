# HireSync API 🚀

A Job + Internship Portal REST API built with Node.js, Express, and MongoDB.

## Features

- JWT Authentication with Cookie support
- Role-based Access Control (Company / Candidate)
- Job CRUD with Search, Filter & Pagination
- Internship CRUD with Search, Filter & Pagination
- Application System with Resume Upload (Cloudinary)
- Application Status Management (Accept/Reject)

## Tech Stack

- **Runtime:** Node.js
- **Framework:** Express.js
- **Database:** MongoDB + Mongoose
- **Authentication:** JWT + bcryptjs
- **File Upload:** Multer + Cloudinary
- **Other:** cookie-parser, dotenv

## Installation
```bash
git clone https://github.com/dsingh098/hiresync-A-job-intrenship-Portal-API.git

cd hiresync-A-job-intrenship-Portal-API.git
npm install
```

## Environment Variables

Create a `.env` file in root folder:
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/hiresync
JWT_SECRET=your_jwt_secret
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

## Run
```bash
npm run dev
```

## API Endpoints

### Auth
| Method | Endpoint | Access | Description |
|--------|----------|--------|-------------|
| POST | /api/auth/register | Public | Register user |
| POST | /api/auth/login | Public | Login user |
| POST | /api/auth/logout | Private | Logout user |

### Jobs
| Method | Endpoint | Access | Description |
|--------|----------|--------|-------------|
| GET | /api/job | Public | Get all jobs |
| GET | /api/job/:id | Public | Get job by ID |
| POST | /api/job | Company | Create job |
| PUT | /api/job/:id | Company | Update job |
| DELETE | /api/job/:id | Company | Delete job |

### Internships
| Method | Endpoint | Access | Description |
|--------|----------|--------|-------------|
| GET | /api/internship | Public | Get all internships |
| GET | /api/internship/:id | Public | Get internship by ID |
| POST | /api/internship | Company | Create internship |
| PUT | /api/internship/:id | Company | Update internship |
| DELETE | /api/internship/:id | Company | Delete internship |

### Applications
| Method | Endpoint | Access | Description |
|--------|----------|--------|-------------|
| POST | /api/applications/:type/:id | Candidate | Apply for job/internship |
| GET | /api/applications/my | Candidate | Get my applications |
| GET | /api/applications/job/:jobId | Company | Get job applications |
| PUT | /api/applications/:id/status | Company | Update application status |

## Query Parameters (Jobs & Internships)
```
GET /api/job?title=developer
GET /api/job?location=remote
GET /api/job?jobtype=Full-time
GET /api/job?page=1&limit=10
```
