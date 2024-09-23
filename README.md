# CampusConnect - A Campus Community Platform

CampusConnect is a platform designed to connect students, faculty, and administrators within a campus. It allows users to post notices, events, and other important information while enabling role-based access control for different types of users.

## Features

- **Role-Based Access**: Different roles for students, faculty, and administrators with custom permissions.
- **Notices and Events**: Admins can post notices and events, including images and descriptions.
- **Profile Section**: Each user has a personalized profile displaying posts and notices related to them.
- **Post Creation for Admins**: Only users with admin roles can create notices and events.
- **JWT Authentication**: Secure authentication using JWT tokens for API access.
- **Responsive Design**: Designed to be mobile-friendly and accessible on various screen sizes.

## Technologies Used

### Backend

- **Django**: A high-level Python web framework.
- **Django Rest Framework (DRF)**: For building REST APIs.
- **JWT Authentication**: JSON Web Token-based authentication for secure access control.
- **SQLite/PostgreSQL**: Default database for local development (can be switched to PostgreSQL for production).

### Frontend

- **React**: A JavaScript library for building user interfaces.
- **Tailwind CSS**: For fast and responsive styling.

### Additional Libraries/Tools

- **Axios**: For making HTTP requests from React to the backend API.
- **React Router**: For handling navigation within the app.
- **Django ORM**: For managing database queries and migrations.

## Setup Instructions

### Backend Setup (Django)

1. **Clone the repository**:
    ```bash
    git clone https://github.com/your-username/campusconnect.git
    cd campusconnect/backend
    ```

2. **Create a virtual environment**:
    ```bash
    python -m venv env
    source env/bin/activate   # On Windows: env\Scripts\activate
    ```

3. **Install dependencies**:
    ```bash
    pip install -r requirements.txt
    ```

4. **Run migrations**:
    ```bash
    python manage.py migrate
    ```

5. **Create a superuser (admin)**:
    ```bash
    python manage.py createsuperuser
    ```

6. **Run the server**:
    ```bash
    python manage.py runserver
    ```

### Frontend Setup (React)

1. Navigate to the `frontend` directory:
    ```bash
    cd ../frontend
    ```

2. Install frontend dependencies:
    ```bash
    npm install
    ```

3. Start the React development server:
    ```bash
    npm run dev
    ```

## Usage

- **Admin Dashboard**: Admin users can log in to create and manage notices, events, and users.
- **User Profiles**: Students and faculty can view posts relevant to their roles and interact with the platform.
- **Role-Specific Permissions**: Content is restricted based on user roles, ensuring relevant access to specific features.
