import jwt from 'jsonwebtoken';

export const generateToken = ({
  payload = {},
  signature = process.env.TOKEN_SIGNATURE,
  expiresIn = '1d',
}) => jwt.sign(payload, signature, { expiresIn });

export const verifyToken = (token, signature = process.env.TOKEN_SIGNATURE) =>
  jwt.verify(token, signature);
