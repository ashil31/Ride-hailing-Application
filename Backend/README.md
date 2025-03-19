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

### Register Endpoint

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

### Login Endpoint

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

### Profile Endpoint

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

### Logout Endpoint

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

## Maps Endpoints

### Get Coordinates Endpoint

#### Endpoint
`GET /maps/get-coordinates`

#### Description
This endpoint returns the geographical coordinates (latitude and longitude) for a given address. A valid authentication token is required.

#### Request Query Parameters
- **address** (string, required): The address for which coordinates are requested. Must be at least 3 characters long.

#### Request Headers
- **Authorization**: Bearer token (or use cookies)

#### Status Codes
- **200 OK:** Returns the coordinates of the provided address.
- **400 Bad Request:** Returns if the address query parameter is missing or invalid.
- **404 Not Found:** Returned if the coordinates cannot be fetched from the Maps service.

#### Example Response

**Success (200 OK):**
```json
{
  "ltd": 40.712776,
  "lng": -74.005974
}
```

**Error (400 Bad Request):**
```json
{
  "errors": [
    {
      "msg": "Invalid value",
      "param": "address",
      "location": "query"
    }
  ]
}
```

---

### Get Distance and Time Endpoint

#### Endpoint
`GET /maps/get-distance-time`

#### Description
This endpoint provides the distance and travel time between an origin and a destination. It requires valid authentication.

#### Request Query Parameters
- **origin** (string, required): The starting address. Must be at least 3 characters long.
- **destination** (string, required): The destination address. Must be at least 3 characters long.

#### Request Headers
- **Authorization**: Bearer token (or use cookies)

#### Status Codes
- **200 OK:** Returns the distance, duration, and additional route details.
- **400 Bad Request:** Returns if required query parameters are missing or invalid.
- **500 Internal Server Error:** Returned if an error occurs in fetching distance/time details.

#### Example Response

**Success (200 OK):**
```json
{
  "distance": {
    "text": "5.3 km",
    "value": 5300
  },
  "duration": {
    "text": "12 mins",
    "value": 720
  },
  "status": "OK"
}
```

**Error (400 Bad Request):**
```json
{
  "errors": [
    {
      "msg": "Invalid value",
      "param": "origin",
      "location": "query"
    }
  ]
}
```

---

### Get Suggestions Endpoint

#### Endpoint
`GET /maps/get-suggestions`

#### Description
This endpoint returns a list of auto-complete suggestions for a given input query. A valid authentication token is required.

#### Request Query Parameters
- **input** (string, required): The partial address or location name to search suggestions for. Must be at least 3 characters long.

#### Request Headers
- **Authorization**: Bearer token (or use cookies)

#### Status Codes
- **200 OK:** Returns a list of suggestion predictions.
- **400 Bad Request:** Returns if the input query parameter is missing or invalid.
- **500 Internal Server Error:** Returned if an error occurs while fetching suggestions.

#### Example Response

**Success (200 OK):**
```json
{
  "suggestions": [
    {
      "description": "1600 Amphitheatre Parkway, Mountain View, CA, USA",
      "place_id": "ChIJ2eUgeAK6j4ARbn5u_wAGqWA"
    },
    {
      "description": "1600 Amphitheatre Pkwy, Mountain View, CA 94043, USA",
      "place_id": "ChIJrTLr-GyuEmsRBfy61i59si0"
    }
  ]
}
```

**Error (400 Bad Request):**
```json
{
  "errors": [
    {
      "msg": "Invalid value",
      "param": "input",
      "location": "query"
    }
  ]
}
```


## Rides Endpoints

### Create Ride Endpoint

#### Endpoint
`POST /rides/create`

#### Description
This endpoint allows an authenticated user to create a new ride request. A valid authentication token is required (provided via cookies or the Authorization header). The request expects the pickup address, destination address, and the desired vehicle type. The fare is calculated based on distance and duration information retrieved from the Maps service, and a 6-digit OTP is generated for ride confirmation.

#### Request Headers
- **Authorization**: Bearer token (or via cookies)

#### Request Body Format
```json
{
  "pickup": "Pickup address string",
  "destination": "Destination address string",
  "vehicleType": "auto" // Acceptable values: "auto", "car", "motorcycle"
}
```

#### Status Codes
- **201 Created:** Returns when the ride is successfully created. The response includes ride details such as fare, OTP, and status.
- **400 Bad Request:** Returns if validation fails (e.g., invalid pickup/destination address, incorrect vehicle type).
- **500 Internal Server Error:** Returns if an error occurs during ride creation or fare calculation.

#### Example Response

**Success (201 Created):**
```json
{
  "ride": {
    "_id": "ride id here",
    "user": "user id here",
    "pickup": "Pickup address string",
    "destination": "Destination address string",
    "fare": 75, // calculated fare based on vehicle type, distance, and duration
    "otp": "123456",
    "status": "pending"
  }
}
```

**Error (400 Bad Request):**
```json
{
  "errors": [
    {
      "msg": "Invalid pickup address",
      "param": "pickup",
      "location": "body"
    }
  ]
}
```

**Error (500 Internal Server Error):**
```json
{
  "error": "Detailed error message"
}
```
```