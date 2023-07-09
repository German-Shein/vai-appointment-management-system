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

Additionally, the following libraries and packages were used:

- Axios
- Mongoose
- Nodemon
- React Router
- bcrypt
- jsonwebtoken
- react-simple-captcha (**although it was scrapped due to issues with TypeScript**)

How to run:

1. cd vai-ams-backend
2. npm install
3. npm run
4. cd vai-ams-frontend
5. npm install
6. npm run

Your application should lunch on http://localhost:3000

MongoDB cluster is online and available for this application.

I have completed 90% of the outlined project. Database and back-end were set up, but front-end was not completed up to the specs. Overall, it took me 18 actual hours to complete this assignment. There are still some things left:
1. Finish the front-end functionality for managing appointments
2. Improve the user experience
3. Adding CAPTCHA
4. Writing tests

My suggestion is to specify whether the focus should be on creatinge a functional product or demonstration the tech stack expertise.