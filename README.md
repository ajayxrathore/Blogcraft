# WriteSpace

Hello! Welcome to my application repository. I built this full-stack project to practice and level up my skills with the MERN stack. It is a completely functional blogging platform where users can sign up, write posts, upload images, and all other crud functionality.

I learned a ton about handling user authentication, managing database relationships, and connecting a React frontend to a Node/Express backend while making this.

---

##  Things This App Can Do

###  User Accounts & Security
* **Sign Up & Login**: Users can create an account and log in securely. It uses JSON Web Tokens (JWT) saved in cookies to keep users logged in.
* **Password Hashing**: Passwords are encrypted using `bcryptjs` before hitting the database, so things stay safe.

###  Creating & Managing Blogs
* **Cover Images**: Users can upload a cover image for their blogs. The images get stored directly cloudinary.
* **Full CRUD**: If you are the author of a post, you can edit it or delete it whenever you want.

##  Tools & Tech I Used

### Frontend (The UI)
* **React.js** – For building the user interface with components.
* **Redux Toolkit** – To manage global application state.
* **Tailwind CSS** – For styling everything quickly and making it look clean.

### Backend (The Server & Database)
* **Node.js & Express.js** – For creating the API routes and handling backend server logic.
* **MongoDB Atlas** – A cloud database where all the users, posts, and comments are stored.
* **Mongoose** – To write schemas and talk to MongoDB easily.

---
## Moving Forward

This was a massive learning experience for me! I am planning to add email notifications , seperate admin dashboard.
