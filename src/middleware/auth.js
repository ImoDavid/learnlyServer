import User from '../models/user.js';
import { verifyToken } from '../utils/generateToken.js';

const auth = () => {
  return async function (req, res, next) {
    const authorization = req.headers.authorization;
    if (!authorization) {
      return res.status(401).json({ message: 'Unauthorized, no header' });
    }

    if (!authorization.startsWith('Bearer')) {
      return res.status(401).json({ message: 'Invalid token' });
    }

    const token = authorization.split(' ')[1];
    if (!token) {
      return res.status(401).json({ message: 'Invalid token' });
    }

    try {
      const decoded = verifyToken(token);

      if (!decoded.id) {
        return res.status(401).json({ message: 'Invalid token' });
      }

      const user = await User.findOne({ _id: decoded.id });
      if (!user) {
        return res.status(401).json({ message: 'Invalid token' });
      }

      req.user = user;
      next();
    } catch (e) {
      return res.status(401).json({ message: 'Invalid token' });
    }
  };
};

export default auth;
