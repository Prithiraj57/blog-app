import jwt from 'jsonwebtoken';

const verifyToken = (req, res, next) => {
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).json("You are not authenticated"); 
  }

  jwt.verify(token, process.env.SECRET, (err, data) => {
    if (err) {
      return res.status(403).json("Token not valid");
    }

    req.userId = data.id; 
    next(); 
  });
};

export default verifyToken;
