
# Table of Contents

1.  [Day 1 - June 25, 2025](#org1d84b53)
    1.  [Backend Setup](#orgf8224d8)
    2.  [User Schema](#orgd8dd7c6)
    3.  [Schema Notes](#org236e392)
    4.  [Installed NPM Packages](#org9bd6162)
    5.  [Next Steps](#org310ee0a)


<a id="org1d84b53"></a>

# Day 1 - June 25, 2025


<a id="orgf8224d8"></a>

## Backend Setup

-   Initialized backend with Express
-   Initialized a Git repository and pushed to GitHub
-   Connected to MongoDB using Mongoose


<a id="orgd8dd7c6"></a>

## User Schema

-   Created \`User\` schema with the following fields:

```
    const userSchema = new mongoose.Schema({
      fullname: {
        firstname: {
          type: String,
          required: true,
          minlength: [3, 'First name must be atleast 3 characters long']
        },
        lastname: {
          type: String,
          required: true,
          minlength: [3, 'First name must be atleast 3 characters long']
        }
      },
      email: {
        type: String,
        required: true,
        unique: true,
        minlength: [5, 'Email must be atleast 5 characters long']
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

<a id="org236e392"></a>

## Schema Notes

-   \`fullname\` is a nested object containing \`firstname\` and \`lastname\`, both with validation rules.
-   \`email\` is unique and required, with basic validation.
-   \`password\` uses \`select: false\` to prevent it from being returned in query results.
-   \`socketId\` will be used for real-time features via Socket.io.
-   \`timestamps: true\` adds \`createdAt\` and \`updatedAt\` automatically.


<a id="org9bd6162"></a>

## Installed NPM Packages

-   \`express\`: Backend server
-   \`mongoose\`: ODM for MongoDB
-   \`dotenv\`: Load env variables from \`.env\`
-   \`cors\`: Handle cross-origin requests
-   \`cookie-parser\`: Parse cookies (used in auth)
-   \`bcrypt\`: Hash passwords securely
-   \`jsonwebtoken\`: Issue and verify JWTs


<a id="org310ee0a"></a>

## Next Steps

-   Add hashing with bcrypt before saving passwords
-   Build \`/register\` and \`/login\` routes
-   Setup JWT generation on login and secure private routes

