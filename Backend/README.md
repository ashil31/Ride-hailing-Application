# Users Register, Login, Profile, and Logout Endpoint Documentation

## Register Endpoint

### Endpoint
`POST /users/register`

### Description
This endpoint registers a new user in the system. It validates the request body against the following criteria:
- **Email:** Must be a valid email address.
- **Full Name:** Contains `firstName` and `lastName` (both required and must be at least 3 characters long).
- **Password:** Must be at least 8 characters long.

The endpoint uses the [`user.routes.js`](Backend/routes/user.routes.js) for validations and is processed by the [`user.controller.registerUser`](Backend/controllers/user.controller.js) function.

### Request Body Format
The data must be sent in JSON format as follows:

```json
{
  "email": "user@example.com",
  "password": "yourpassword",
  "fullName": {
    "firstName": "John",
    "lastName": "Doe"
  }
}
```

### Status Codes
- **201 Created:** Returns when the user is successfully registered. The response contains a JSON object with the authentication token and user data.
- **400 Bad Request:** Returns if validation fails with an array of errors in the response.

### Example Response

**Success (201 Created):**

```json
{
  "token": "JWT token string here",
  "user": {
    "_id": "user id here",
    "fullName": {
      "firstName": "John",
      "lastName": "Doe"
    },
    "email": "user@example.com"
  }
}
```

**Error (400 Bad Request):**

```json
{
  "errors": [
    {
      "msg": "Email is not valid",
      "param": "email",
      "location": "body"
    }
  ]
}
```

---

## Login Endpoint

### Endpoint
`POST /users/login`

### Description
This endpoint logs in an existing user. It validates the email and password provided in the request body. On success, it returns an authentication token along with the user data.

### Request Body Format
The data must be sent in JSON format as follows:

```json
{
  "email": "user@example.com",
  "password": "yourpassword"
}
```

### Status Codes
- **200 OK:** Returns when the user is successfully logged in. The response contains a JSON object with the authentication token and user data.
- **400 Bad Request:** Returns if the validation fails.
- **401 Unauthorized:** Returns if the email does not exist or the password is incorrect.

### Example Response

**Success (200 OK):**

```json
{
  "token": "JWT token string here",
  "user": {
    "_id": "user id here",
    "fullName": {
      "firstName": "John",
      "lastName": "Doe"
    },
    "email": "user@example.com"
  }
}
```

**Error (400 Bad Request):**

```json
{
  "errors": [
    {
      "msg": "Email is not valid",
      "param": "email",
      "location": "body"
    }
  ]
}
```

**Error (401 Unauthorized):**

```json
{
  "message": "Invalid email or password"
}
```

---

## Profile Endpoint

### Endpoint
`GET /users/profile`

### Description
This endpoint returns the profile of the authenticated user. It requires a valid authentication token either in a cookie or in the `Authorization` header.

### Authentication
This endpoint uses middleware to verify the user's token. If authenticated, the user's profile data is attached to `req.user`.

### Status Codes
- **200 OK:** Returns the user's profile data.
- **401 Unauthorized:** Returns if no token is provided, the token is invalid, or the user does not exist.

### Example Response

**Success (200 OK):**

```json
{
  "_id": "user id here",
  "fullName": {
    "firstName": "John",
    "lastName": "Doe"
  },
  "email": "user@example.com"
}
```

**Error (401 Unauthorized):**

```json
{
  "message": "Please authenticate"
}
```

---

## Logout Endpoint

### Endpoint
`GET /users/logout`

### Description
This endpoint logs out an authenticated user. It clears the token from cookies and adds the token to a blacklist so that it cannot be reused for subsequent requests.

### Authentication
Requires a valid authentication token.

### Status Codes
- **200 OK:** Returns after the user has been successfully logged out.
- **401 Unauthorized:** If the token is invalid or not provided.

### Example Response

**Success (200 OK):**

```json
{
  "message": "Logged out successfully"
}
```

**Error (401 Unauthorized):**

```json
{
  "message": "Please authenticate"
}