# Users and Captains Endpoint Documentation

## Users Endpoints

### User Register Endpoint

#### Endpoint
`POST /users/register`

#### Description
This endpoint registers a new user in the system. It validates the request body against the following criteria:
- **Email:** Must be a valid email address.
- **Full Name:** Contains `firstName` and `lastName` (both required and must be at least 3 characters long).
- **Password:** Must be at least 8 characters long.

The endpoint uses the [`user.routes.js`](routes/user.routes.js) for validations and is processed by the [`user.controller.registerUser`](controllers/user.controller.js) function.

#### Request Body Format
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

#### Status Codes
- **201 Created:** Returns when the user is successfully registered with a JSON object containing the token and user data.
- **400 Bad Request:** Returns if validation fails.

#### Example Response

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

---

### User Login Endpoint

#### Endpoint
`POST /users/login`

#### Description
This endpoint logs in an existing user. It validates the email and password provided in the request body and returns an authentication token along with the user data on success.

#### Request Body Format
```json
{
  "email": "user@example.com",
  "password": "yourpassword"
}
```

#### Status Codes
- **200 OK:** Returns when the user is successfully logged in.
- **400 Bad Request:** Returns if validation fails.
- **401 Unauthorized:** Returns if the email does not exist or the password is incorrect.

#### Example Response

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

---

### User Profile Endpoint

#### Endpoint
`GET /users/profile`

#### Description
This endpoint returns the profile of an authenticated user. A valid authentication token (via cookies or Authorization header) is required.

#### Status Codes
- **200 OK:** Returns the user's profile data.
- **401 Unauthorized:** Returns if authentication fails.

#### Example Response

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

---

### User Logout Endpoint

#### Endpoint
`GET /users/logout`

#### Description
This endpoint logs out an authenticated user by clearing the token from cookies and blacklisting it.

#### Status Codes
- **200 OK:** Returns when the user has been logged out successfully.
- **401 Unauthorized:** Returns if authentication fails.

#### Example Response

**Success (200 OK):**
```json
{
  "message": "Logged out successfully"
}
```

---

## Captains Endpoints

### User Register Endpoint

#### Endpoint
`POST /captains/register`

#### Description
This endpoint registers a new captain in the system. It requires detailed personal and vehicle information. The captain's password must meet security criteria (containing at least one uppercase letter, one lowercase letter, one number, and one special character). The registration is processed by the [`captain.controller.registerCaptain`](controllers/captain.controller.js) function and validated through the [`captain.routes.js`](routes/captain.routes.js).

#### Request Body Format
```json
{
  "email": "captain@example.com",
  "password": "YourStrong@Password1",
  "fullName": {
    "firstName": "Jane",
    "lastName": "Doe"
  },
  "vehicle": {
    "color": "Red",
    "plate": "XYZ123",
    "capacity": 4,
    "vehicleType": "car"
  }
}
```

#### Status Codes
- **201 Created:** Returns when the captain is successfully registered. The response contains a JSON object with the authentication token and captain data.
- **400 Bad Request:** Returns if validation fails, such as when required fields are missing, the email is invalid, the password does not meet criteria, or the vehicle information is incomplete.

#### Example Response

**Success (201 Created):**
```json
{
  "token": "JWT token string here",
  "captain": {
    "_id": "captain id here",
    "fullName": {
      "firstName": "Jane",
      "lastName": "Doe"
    },
    "email": "captain@example.com",
    "vehicle": {
      "color": "Red",
      "plate": "XYZ123",
      "capacity": 4,
      "vehicleType": "car"
    }
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

### User Login Endpoint

#### Endpoint
`POST /captains/login`

#### Description
This endpoint logs in an existing captain. It validates the email and password provided in the request body and returns an authentication token along with the captain's data on success.

#### Request Body Format
```json
{
  "email": "captain@example.com",
  "password": "yourpassword"
}
```

#### Status Codes
- **200 OK:** Returns when the captain is successfully logged in.
- **400 Bad Request:** Returns if validation fails.
- **401 Unauthorized:** Returns if the email does not exist or the password is incorrect.

#### Example Response

**Success (200 OK):**
```json
{
  "token": "JWT token string here",
  "captain": {
    "_id": "captain id here",
    "fullName": {
      "firstName": "Jane",
      "lastName": "Doe"
    },
    "email": "captain@example.com",
    "vehicle": {
      "color": "Red",
      "plate": "XYZ123",
      "capacity": 4,
      "vehicleType": "car"
    }
  }
}
```

**Error (401 Unauthorized):**
```json
{
  "error": "Invalid email or password"
}
```

---

### User Profile Endpoint

#### Endpoint
`GET /captains/profile`

#### Description
This endpoint returns the profile of an authenticated captain. A valid authentication token (via cookies or Authorization header) is required and verified by middleware.

#### Status Codes
- **200 OK:** Returns the captain's profile data.
- **401 Unauthorized:** Returns if authentication fails.

#### Example Response

**Success (200 OK):**
```json
{
  "_id": "captain id here",
  "fullName": {
    "firstName": "Jane",
    "lastName": "Doe"
  },
  "email": "captain@example.com",
  "vehicle": {
    "color": "Red",
    "plate": "XYZ123",
    "capacity": 4,
    "vehicleType": "car"
  }
}
```

---

### User Logout Endpoint

#### Endpoint
`GET /captains/logout`

#### Description
This endpoint logs out an authenticated captain by clearing the token from cookies and adding it to a blacklist to prevent further use.

#### Status Codes
- **200 OK:** Returns when the captain has been logged out successfully.
- **401 Unauthorized:** Returns if authentication fails.

#### Example Response

**Success (200 OK):**
```json
{
  "message": "Logged out successfully"
}
```
