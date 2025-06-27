
# 🚕 Yoober – A Full-Stack Uber Clone (MERN)

This document is a day-wise developer journal for ****Yoober****, a full-stack Uber clone built using the ****MERN**** stack.

Each day&rsquo;s entry includes:

-   ✅ Work done
-   📖 Code snippets
-   🧠 Learnings
-   🧪 Errors + Debugging steps

&#x2014;


# 📆 Day 1 – June 25, 2025


## ✅ Backend Setup

-   Initialized Express backend
-   Created Git repository and pushed initial commit to GitHub
-   Connected to MongoDB using Mongoose


## 🧠 User Schema (What a User Looks Like)

Created a Mongoose schema for users with the following fields:

-   \`fullname\`: nested object with \`firstname\` and \`lastname\`, both required and at least 3 characters long
-   \`email\`: unique, required, lowercase
-   \`password\`: required and hidden from query results
-   \`socketId\`: placeholder for future Socket.IO features
-   \`timestamps\`: auto-generated \`createdAt\` and \`updatedAt\`

```
    const userSchema = new mongoose.Schema({
      fullname: {
        firstname: { type: String, required: true, minlength: 3 },
        lastname: { type: String, required: true, minlength: 3 }
      },
      email: {
        type: String, required: true, unique: true, minlength: 5
      },
      password: { type: String, required: true, select: false },
      socketId: { type: String }
    }, { timestamps: true });
```


## 📦 Installed NPM Packages

-   express
-   mongoose
-   dotenv
-   cors
-   cookie-parser
-   bcrypt
-   jsonwebtoken

&#x2014;


# 📆 Day 2 – June 26, 2025


## ✅ What I Did

-   Created helper methods in the User model:
    -   \`hashPassword\`
    -   \`comparePassword\`
    -   \`generateAuthToken\`
-   Built \`registerUser\` controller
-   Created \`createUser\` service
-   Added \`/register\` route with validation using express-validator


## 🧨 Errors Faced


### MongoDB Namespace Error

    MongoServerError: Invalid namespace specified: /undefined.users


### Forgot to Import bcrypt & jwt

-   \`bcrypt\` and \`jsonwebtoken\` were not imported in \`user.models.js\`


## 🛠️ How I Fixed It

-   Removed the constants file (was splitting Mongo URI and DB name)
-   Used full MongoDB URI from \`.env\`:

    MONGO_URI=mongodb://localhost:27017/yoober

-   Added missing imports in the model:

    const bcrypt = require('bcrypt');
    const jwt = require('jsonwebtoken');


## 🧠 Notes

-   Always verify environment variable values using \`console.log\`
-   Avoid splitting Mongo URIs unless absolutely needed
-   Reading the stack trace and using StackOverflow helped debug it without AI


## 📤 Sample Register Response

    {
      "token": "<JWT token>",
      "newUser": {
        "fullname": {
          "firstname": "Alice",
          "lastname": "Smith"
        },
        "email": "alice@example.com"
      }
    }


## ✅ Features Completed

-   Working \`/register\` route
-   Password hashing + JWT generation
-   Environment bug resolved

&#x2014;


# 📆 Day 3 – June 27, 2025


## ✅ Login Flow (User)

-   Built \`/login\` route
-   Verified if email exists using:

    const user = await User.findOne({ email }).select('+password');

-   Compared password using \`comparePassword\` method
-   Returned JWT token if successful
-   Returned \`401 Unauthorized\` if email or password was incorrect


## 🛡️ Auth Middleware

Purpose: To protect private routes

Steps:

1.  Check if token is provided in headers/cookie
2.  If not present → \`401 Unauthorized\`
3.  If present → verify JWT
4.  Extract \`<sub>id</sub>\` from payload
5.  Fetch user from DB → attach to \`req.user\`


## 🚪 Logout (User)

-   Implemented logout by blacklisting JWT tokens
-   Added tokens to blacklist DB with 24hr TTL
-   Middleware checks if token is blacklisted before accessing any protected route


## ✅ Features Completed

-   Login flow with token
-   Middleware for protected routes
-   Logout via token blacklist

&#x2014;


# 📆 Day 4 – June 28, 2025 (Midnight Coding)


## ✅ Captain (Driver) Schema

Created a new schema for Captain (like Uber drivers)

Fields:

-   \`fullname\`: \`firstname\`, \`lastname\`
-   \`email\`: unique, valid
-   \`password\`: required and hidden
-   \`socketId\`: optional
-   \`status\`: \`active\` / \`inactive\` (default: inactive)
-   \`vehicle\`: nested object containing:
    -   \`color\`, \`plate\`, \`capacity\`, \`vehicleType\` (car/motorcycle/auto)
    -   \`location\`: \`lat\`, \`lng\`

    const captainSchema = new mongoose.Schema({
      fullname: {
        firstname: { type: String, required: true, minlength: 3 },
        lastname: { type: String, required: true, minlength: 3 }
      },
      email: {
        type: String, required: true, unique: true,
        lowercase: true, match: [/^\S+@\S+\.\S+$/, 'Please enter a valid email']
      },
      password: { type: String, required: true, select: false },
      socketId: { type: String },
      status: { type: String, enum: ['active', 'inactive'], default: 'inactive' },
      vehicle: {
        color: { type: String, required: true, minlength: 3 },
        plate: { type: String, required: true, minlength: 3 },
        capacity: { type: Number, required: true, min: 1 },
        vehicleType: { type: String, required: true, enum: ['car', 'motorcycle', 'auto'] },
        location: { lat: Number, lng: Number }
      }
    }, { timestamps: true });


## 🔐 Duplicate Email Check

-   During registration for both User and Captain:
    -   Checked both collections to prevent duplicate emails
    -   If already registered → returned 400 error


## 🧑‍✈️ Captain Authentication

-   Registered Captain using the same logic as User
-   Implemented Captain \`/profile\` route (protected)
-   Used captain-specific middleware to extract data from token and attach to \`req.captain\`


## 🚪 Captain Logout

-   Implemented same token-blacklist logic for logout
-   Tokens expire after 24 hours
-   Protected routes for Captain check blacklist before continuing


## ✅ Features Completed

-   Captain register route with validation
-   Captain profile fetch (protected route)
-   Captain logout with token blacklist
-   Full authentication setup done for both User and Captain

