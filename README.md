# VAI Marketing Management Interview

## Appointment Management System

### Dates: July 7, 2023 - July 9, 2023

User types: Admin, Doctor, registration page for patients
- Modules
    - Admin
    - Doctor
    - Patients
    - Appointment

Functionality:
- Patient
    - Login and check their appointment, add Captcha authentication.
    - Guest users can register the appointment using their email id.
- Doctor
    - Login and check their appointment, add Captcha authentication.
    - Update appointment status based on theiraction.
- Admin
    - Can manage Doctor, Patients, and appointments.
- Appointment
    - dmin or patient can create appointment.
    - One patient or admin can create one appointment at a time (use a time
slot one hour ex, 1:00 PM, 2:00 PM etc.)

It was built using TypeScript and the MERN Stack:

- MongoDB v5.7.0
- Express v4.17.17
- React v18.2.0
- Node.js v14.21.0

How to run:

1. cd vai-ams-backend
2. npm install
3. npm run
4. cd vai-ams-frontend
5. npm install
6. npm run

Your application should lunch on http://localhost:3000