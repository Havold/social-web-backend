# 📷 METAN - Backend
## Overview
This is the backend for the **METAN** social web application, providing APIs for user authentication, post management, comments, likes, and user interactions (follow/unfollow). The backend is built using Node.js with Express and uses MySQL (managed via MySQL Workbench) as the database.

## 🌟 Features
- **User Authentication:** Secure login and registration using JWT (JSON Web Token).
- **Post Management:** Create, retrieve, update, and delete posts.
- **Likes and Comments:** APIs to like posts and add comments to posts.
- **Follow System:** Manage user follow/unfollow functionality.
- **Database Integration:** Stores all user, post, and interaction data in MySQL.
- JWT (JSON Web Token) - Used for authentication and session management.
- 
## 💻 Technologies Used
- Node.js - Runtime environment for building the server.
- Express.js - Framework for creating RESTful APIs.
- MySQL - Relational database system managed via MySQL Workbench.

## 🛠️ System Requirements
- Node.js installed.
- MySQL installed.
- MySQL Workbench 8.0 CE __(Recommend)__ for database management
## 🚀 Getting Started
**1. Clone the Repository:**
   ```
   git clone https://github.com/Havold/social-web-backend.git
   cd social-web-backend
   ```
**2. Install Dependencies:**
   ```
   npm install
   ```
**3. Set Up the Environment Variables:**
   Create a `.env` file in the root directory and configure it as follows:
   ```
    PORT = 8080
    DATABASE_HOST = your_database_host_name
    DATABASE_PWD = your_database_password
    DATABASE = your_database_name
   ```
**4. Set Up the Database:** I will update the files to create the database later. However, you can use MySQL WorkBench to create the database yourself: it will include 4 tables: users, stories, relationships, posts, likes, comments. Details will be as shown in the images below:
**5. Start the Server:**
   ```
   npm start
   ```
**6. Test the APIs:**
   The server will run at http://localhost:8080. You can use tools like Postman to test the APIs.

## API Endpoints
### Authentication
| Method   | Endpoints                     | Description                  |
|----------|-------------------------------|------------------------------|
| POST     | `/api/auth/register`          | Register a new user          |
| POST     | `/api/auth/login`             | Login a user                 |
| POST     | `/api/auth/logout`            | Logout                 |

### Posts
| Method   | Endpoints                     | Description                  |
|----------|-------------------------------|------------------------------|
| GET      | `/api/posts`                  | Fetch all posts              |
| POST     | `/api/posts`                  | Create a new post            |
| DELETE   | `/api/posts/:id`              | Delete a post                |

### Likes
| Method   | Endpoints                     | Description                  |
|----------|-------------------------------|------------------------------|
| GET      | `/api/likes`                  | Fetch all likes              |
| POST     | `/api/likes`                  | Like a specific post         |
| DELETE   | `/api/likes`                  | Remove like a specific post  |

### Comments
| Method   | Endpoints                     | Description                       |
|----------|-------------------------------|-----------------------------------|
| GET      | `/api/comments/:postId`       | Fetch comments for a post         |
| POST     | `/api/comments/:postId`       | Add a comment in a specific post  |

### Follow system
| Method   | Endpoints                     | Description                  |
|----------|-------------------------------|------------------------------|
| GET      | `/api/relationships`          | Fetch all followed users     |
| POST     | `/api/relationships`          | Follow a user                |
| DELETE   | `/api/relationships`          | Unfollow a user              |

## Profile
| Method   | Endpoints                     | Description                     |
|----------|-------------------------------|---------------------------------|
| GET      | `/api/users/:userId`          | Fetch specific user's profile   |
| PUT      | `/api/users`                  | Update user's profile           |
