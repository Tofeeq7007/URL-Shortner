import { nanoid } from "nanoid"
import jwt from 'jsonwebtoken'
export const genrateNanoId = (length)=>{
    return nanoid(length);
}
export const signToken = (payload)=>{
  return jwt.sign(payload,process.env.JWT_SECRET, {expiresIn:"1d"});
}
export const verifyToken = (token) =>{
    return jwt.verify(token , process.env.JWT_SECRET );
}

// utils/wrapAsync.js

const wrapAsync = (fn) => {
  return function (req, res, next) {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
};

export default wrapAsync; // for ES modules (if using "type": "module")
// OR
// module.exports = wrapAsync; // for CommonJS (if using require)
