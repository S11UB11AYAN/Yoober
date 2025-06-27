

# 🚕 Yoober – A Full-Stack Uber Clone (MERN)

This document is a day-wise dev log of ****Yoober****, a full-stack Uber clone built using the ****MERN**** stack.

Each entry includes:

-   ✅ Tasks done
-   📖 Code snippets
-   🧠 Lessons learned
-   🧪 Errors + Debugging steps

&#x2014;


# 📆 Day 1 – June 25, 2025


## ✅ Backend Setup

-   Initialized Express backend
-   Created Git repository and pushed initial commit to GitHub
-   Connected to MongoDB using Mongoose


## 🧠 User Schema (What a User Looks Like)

Created a Mongoose schema for users with the following fields:

-   \`fullname\`:
    -   \`firstname\`: required, min 3 chars
    -   \`lastname\`: required, min 3 chars
-   \`email\`: unique, required, min 5 chars
-   \`password\`: required, not returned in queries (\`select: false\`)
-   \`socketId\`: for future real-time features (e.g. live location)
-   \`timestamps\`: auto-generates \`createdAt\` and \`updatedAt\`

``` 
const userSchema = new mongoose.Schema({
      fullname: {
        firstname: {
          type: String,
          required: true,
          minlength: [3, 'First name must be at least 3 characters long']
        },
        lastname: {
          type: String,
          required: true,
          minlength: [3, 'Last name must be at least 3 characters long']
        }
      },
      email: {
        type: String,
        required: true,
        unique: true,
        minlength: [5, 'Email must be at least 5 characters long']
      },
      password: {
        type: String,
        required: true,
        select: false
      },
      socketId: {
        type: String
      }
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

-   Ran and tested the code written on Day 1
-   Created helper methods in user schema:
    -   \`hashPassword\`
    -   \`comparePassword\`
    -   \`generateAuthToken\`
-   Created service layer (\`createUser\`)
-   Created controller (\`registerUser\`)
-   Set up \`/register\` route with validation


## 🧨 Errors Faced


### MongoDB Namespace Error

    MongoServerError: Invalid namespace specified: /undefined.users

Cause:

-   I was importing MongoDB base URL from \`.env\`
-   And trying to append the DB name from a \`constants\` file
-   This resulted in an invalid URL like: \`/undefined.users\`


### Missing Package Imports

-   Forgot to import \`bcrypt\` and \`jsonwebtoken\` in \`user.models.js\`


## 🛠️ How I Fixed It

-   Carefully read the full error trace
-   Removed the constants file entirely
-   Used the ****full MongoDB URI**** directly from \`.env\` like:

    MONGO_URI=mongodb://localhost:27017/yoober

-   Added missing imports in model file:

    const bcrypt = require('bcrypt');
    const jwt = require('jsonwebtoken');


## 🧠 Notes / Lessons Learned

-   Always validate env vars with \`console.log\`
-   Don’t split connection strings unless necessary
-   Error messages are usually very helpful
-   Used StackOverflow (no GPT!) to debug and learn better


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


## 🔄 Auth Flow Summary

    Client --> /register (Route)
           --> registerUser (Controller)
           --> createUser (Service)
           --> save in MongoDB (Model)
           --> return token + user


## ✅ Features Completed

-   Working \`/register\` endpoint with hashed password and JWT
-   Fixed critical MongoDB connection issue
-   Auth utilities working as expected


# 📆 Day 3 – June 27, 2025


## ✅ What I Did

-   Built the \`/login\` route for user authentication
-   Added middleware to authorize user based on JWT token
-   Created logout functionality using token blacklisting (with 24hr TTL)


## 🔐 Login Route

-   Looked for user by email:

    const user = await User.findOne({ email }).select('+password');

-   If user not found:

    return res.status(401).json({ message: 'Invalid email or password' });

-   Compared password using \`comparePassword\` method
-   If match, returned a new JWT token


## 🛡️ Auth Middleware

Purpose: To protect private routes (like user profile)

Steps:

1.  Check if a token is present (typically in headers or cookies)
2.  If no token → \`401 Unauthorized\`
3.  If token is present → verify the JWT
4.  Extract \`<sub>id</sub>\` from token payload
5.  Use \`<sub>id</sub>\` to fetch the user from the database
6.  Attach user info to \`req.user\` and continue


## 🚪 Logout Logic

Implemented logout using a ****token blacklist strategy****:

-   Stored blacklisted tokens in DB with TTL of 24 hours
-   Every protected route checks if token is blacklisted
-   If yes → respond with \`401 Unauthorized\`


## 🧠 Notes

-   Used \`.select(&rsquo;+password&rsquo;)\` in \`login\` because password is excluded by default
-   Middleware is reusable and will be used in all protected routes
-   JWTs are stateless by default; blacklisting adds state for logout tracking


## ✅ Features Completed

-   Login route with password check and token issue
-   Auth middleware to verify and attach user
-   Logout using token blacklist with TTL = 24hrs
-   Basic authentication workflow completed

