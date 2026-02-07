# Cloud_404 - Cloud-Based Online Quiz Management System

A university project POC built on Laravel + Inertia.js + React + Tailwind CSS + Shadcn UI with role-based access control.

## 🚀 Features

### For Admins

- **Quiz Management**: Create quizzes with multiple-choice questions
- **Question Builder**: Add unlimited questions with 4 options each
- **Results Dashboard**: View all student attempts and scores
- **User Management**: Manage system users and roles

### For Students

- **Browse Quizzes**: View all available quizzes
- **Take Quizzes**: Interactive quiz-taking interface with navigation
- **Automatic Evaluation**: Instant score calculation upon submission
- **View Results**: See detailed results with percentage and grade

## 📋 Setup Instructions

### 1. Install Dependencies

```bash
# Install PHP dependencies
composer install

# Install Node.js dependencies
npm install
```

### 2. Environment Configuration

The `.env` file has already been updated with:

- **APP_NAME**: Cloud_404
- **APP_TAGLINE**: Cloud-Based Online Quiz Management System
- **DB_DATABASE**: cloud404

Make sure to update your database credentials if needed:

```env
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=cloud404
DB_USERNAME=root
DB_PASSWORD=your_password
```

### 3. Database Setup

```bash
# Create the database (if not exists)
mysql -u root -p -e "CREATE DATABASE IF NOT EXISTS cloud404;"

# Run migrations
php artisan migrate

# Seed the database (creates admin and user roles)
php artisan db:seed
```

### 4. Create Admin User

Run this command to create an admin user:

```bash
php artisan tinker
```

Then in the Tinker console:

```php
$admin = \App\Models\User::create([
    'name' => 'Admin User',
    'email' => 'admin@cloud404.com',
    'password' => bcrypt('password123')
]);
$admin->assignRole('admin');
exit;
```

### 5. Create Student User

```bash
php artisan tinker
```

```php
$student = \App\Models\User::create([
    'name' => 'Student User',
    'email' => 'student@cloud404.com',
    'password' => bcrypt('password123')
]);
$student->assignRole('user');
exit;
```

### 6. Build Frontend Assets

```bash
# Development mode with hot reload
npm run dev

# OR Production build
npm run build
```

### 7. Start the Server

```bash
php artisan serve
```

Visit: http://localhost:8000

## 👤 Default Login Credentials

**Admin:**

- Email: admin@cloud404.com
- Password: password123

**Student:**

- Email: student@cloud404.com
- Password: password123

## 📦 Database Schema

### Users Table

- id, name, email, password, theme, timestamps
- Roles: 'admin' or 'user' (student)

### Quizzes Table

- id, title, description, duration_minutes, created_by (FK to users)
- Relationships: belongsTo User, hasMany Questions, hasMany Results

### Questions Table

- id, quiz_id (FK), question_text, option_a, option_b, option_c, option_d, correct_option
- Relationships: belongsTo Quiz

### Results Table

- id, user_id (FK), quiz_id (FK), score, total_questions, attempt_date
- Relationships: belongsTo User, belongsTo Quiz

## 🎯 Key Features Implementation

### Automatic Evaluation (AttemptController)

When a student submits a quiz:

1. User answers are compared against `correct_option` in the database
2. Score is calculated automatically
3. Result is saved to the `results` table
4. User is redirected to the results page

### Role-Based Access Control

- **Admin Dashboard**: Create Quiz button, Manage Quizzes link
- **Student Dashboard**: Browse Quizzes button
- **Navigation Sidebar**: Dynamic menu based on user role

### Quiz Creation (Admin)

- Multi-step form with dynamic question addition
- Rich UI with Shadcn components
- Validation for all fields
- Nested data structure for questions

### Quiz Taking (Student)

- Question navigation with progress bar
- Radio button selection for answers
- Visual indicators for answered/unanswered questions
- Confirmation before submission

## 🛠️ Tech Stack

- **Backend**: Laravel 11.x
- **Frontend**: React 18 + TypeScript
- **SPA Framework**: Inertia.js
- **Styling**: Tailwind CSS
- **UI Components**: Shadcn UI
- **Authentication**: Laravel Breeze
- **Authorization**: Spatie Laravel Permission

## 📁 Project Structure

```
app/
├── Http/Controllers/
│   ├── Admin/
│   │   └── QuizController.php      # Admin quiz management
│   └── AttemptController.php       # Student quiz attempts
├── Models/
│   ├── Quiz.php
│   ├── Question.php
│   └── Result.php
database/
└── migrations/
    ├── 2025_02_23_000001_create_quizzes_table.php
    ├── 2025_02_23_000002_create_questions_table.php
    └── 2025_02_23_000003_create_results_table.php
resources/js/
├── Pages/
│   ├── Admin/Quizzes/
│   │   ├── Index.tsx              # List all quizzes
│   │   ├── Create.tsx             # Create new quiz
│   │   └── Show.tsx               # View quiz details
│   └── Student/Quizzes/
│       ├── Index.tsx              # Browse quizzes
│       ├── Take.tsx               # Take a quiz
│       └── Result.tsx             # View result
└── Components/ui/                  # Shadcn components
routes/
├── admin.php                       # Admin routes
└── user.php                        # Student routes
```

## 🔗 Available Routes

### Admin Routes (Prefix: /admin)

- GET `/admin/quizzes` - List all quizzes
- GET `/admin/quizzes/create` - Create quiz form
- POST `/admin/quizzes` - Store new quiz
- GET `/admin/quizzes/{id}` - View quiz details
- DELETE `/admin/quizzes/{id}` - Delete quiz

### Student Routes

- GET `/quizzes` - Browse available quizzes
- GET `/quizzes/{id}` - Take a quiz
- POST `/quizzes/{id}` - Submit quiz answers
- GET `/quizzes/{id}/result` - View quiz result

## 🧪 Testing the System

1. **Login as Admin**
    - Go to http://localhost:8000/login
    - Use admin credentials
    - Create a new quiz with questions

2. **Login as Student**
    - Logout and login with student credentials
    - Browse quizzes
    - Take a quiz
    - View results

## 📝 Notes

- Students can only attempt each quiz once
- Quiz results are permanent and cannot be retaken
- Admins can view all student results
- Automatic evaluation happens server-side for security
- Correct answers are never sent to the frontend during quiz-taking

## 🐛 Troubleshooting

**Database connection error:**

```bash
php artisan config:clear
php artisan cache:clear
```

**Assets not loading:**

```bash
npm run build
php artisan optimize:clear
```

**Permission errors:**

```bash
chmod -R 775 storage bootstrap/cache
```

## 📄 License

This is a university project for educational purposes.
