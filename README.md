

# Next.js Fullstack Authentication

This project is a fullstack authentication system built with Next.js, MongoDB, and Nodemailer. It includes features such as user registration, email verification, login, and password reset functionality. The project demonstrates how to implement secure authentication and authorization in a modern web application.

## Features

- **User Registration**: Users can register with their email and password. An email verification link is sent to the user's email address.
- **Email Verification**: Users must verify their email address by clicking on the verification link sent to their email.
- **User Login**: Registered users can log in with their email and password.
- **Forgot Password**: Users can request a password reset link if they forget their password. The link is sent to their registered email address.
- **Password Reset**: Users can reset their password using the link sent to their email. They must provide their old password and a new password.
- **Admin Panel**: Admin users can manage other users and perform administrative tasks.

## Technologies Used

- **Next.js**: A React framework for building server-side rendered and statically generated web applications.
- **MongoDB**: A NoSQL database for storing user data.
- **Nodemailer**: A module for sending emails from Node.js applications.
- **bcryptjs**: A library for hashing passwords.
- **React**: A JavaScript library for building user interfaces.
- **Tailwind CSS**: A utility-first CSS framework for styling the application.

## Project Structure

- **pages/**: Contains the Next.js pages for the application.
  - **api/**: Contains the API routes for user authentication and password reset.
  - **auth/**: Contains the pages for user registration, login, and email verification.
  - **forgotPassword/**: Contains the page for requesting a password reset link.
  - **resetPassword/**: Contains the page for resetting the password.
- **models/**: Contains the Mongoose models for the application.
- **helpers/**: Contains helper functions for sending emails and connecting to the database.
- **styles/**: Contains the global styles for the application.

## Getting Started

### Prerequisites

- Node.js
- MongoDB

### Installation

1. Clone the repository:

```bash
git clone https://github.com/your-username/nextjs-fullstack-auth.git
cd nextjs-fullstack-auth
```

2. Install the dependencies:

```bash
npm install
```

3. Create a 

.env

 file in the root directory and add the following environment variables:

```env
NODEMAILER_USER=your-mailtrap-username
NODEMAILER_PASS=your-mailtrap-password
DOMAIN=http://localhost:3000
MONGODB_URI=your-mongodb-uri
```

4. Start the development server:

```bash
npm run dev
```

5. Open your browser and navigate to `http://localhost:3000`.

## Contributing

Contributions are welcome! Please open an issue or submit a pull request if you have any improvements or bug fixes.

## License

This project is licensed under the MIT License.

---

Feel free to customize this description to better fit your project's specifics and your preferences.