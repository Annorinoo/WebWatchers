// jwtUtils.js

import jwt_decode from 'jwt-decode';

// Function to decode the JWT token and retrieve user information
function decodeToken(token) {
  try {
    const decoded = jwt_decode(token);
    // The user ID should be in the decoded token payload
    return decoded.id; // Replace 'userId' with the actual key in your token payload
  } catch (error) {
    console.error('Error decoding the token:', error);
    return null;
  }
}

export { decodeToken };
