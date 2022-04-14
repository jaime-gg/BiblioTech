const jwt = require('jsonwebtoken');

// SET TOKEN SECRET AND EXPIRATION DATE
const secret = 'mysecretsshhhhh';
const expiration = '2h';

module.exports = {
  // FUNCTION FOR OUR AUTHENTICATED ROUTES
  authMiddleware: function ({ req }) {
    // ALLOWS TOKEN TO BE SENT VIA  REQ.QUERY OR HEADERS
    let token = req.body.token || req.query.token || req.headers.authorization;

    // SEPARATE | ["BEARER", "<TOKENVALUE>"]
    if (req.headers.authorization) {
      token = token.split(' ').pop().trim();
    }

    // IF NO TOKEN, RETURN REQUEST OBJECT AS IS
    if (!token) {
      return res.status(400).json({ message: 'You have no token!' });
    }

    // VERIFY TOKEN AND GET USER DATA OUT OF IT
    try {
      const { data } = jwt.verify(token, secret, { maxAge: expiration });
      req.user = data;
    } catch {
      console.log('Invalid token');
      return res.status(400).json({ message: 'invalid token!' });
    }

    // SEND TO NEXT ENDPOINT
    next();
  },
  signToken: function ({ username, email, _id }) {
    const payload = { username, email, _id };

    return jwt.sign({ data: payload }, secret, { expiresIn: expiration });
  },
};
