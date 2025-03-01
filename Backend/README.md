# Users Register Endpoint Documentation

## Endpoint

`POST /users/register`

## Description

This endpoint registers a new user in the system. It validates the request body against the following criteria:

- **Email:** Must be a valid email address.
- **Full Name:** Contains `firstName` and `lastName` (both required and must be at least 3 characters long).
- **Password:** Must be at least 8 characters long.

The endpoint uses the [`user.routes.js`](Backend/routes/user.routes.js) for validations and is processed by the [`user.controller.registerUser`](Backend/controllers/user.controller.js) function.

## Request Body Format

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

## Status Codes

- **201 Created:** Returns when the user is successfully registered. The response contains a JSON object with the authentication token and user data.
- **400 Bad Request:** Returns if validation fails with an array of errors in the response.

## Example Response

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