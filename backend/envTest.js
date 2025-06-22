import dotenv from 'dotenv';
dotenv.config();

console.log("SECRET:", process.env.JWT_SECRET);
console.log("EXPIRES:", process.env.JWT_EXPIRES);

