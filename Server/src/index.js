import express from 'express';
import 'dotenv/config';
import cookieParser from 'cookie-parser'
import cors from 'cors'
import { connectToDb } from './Config/DbConnection.js';
import UserAuth from './Routes/Authentication.js';


const app = express();
const port = process.env.PORT || 4000;

// what is the use of express.json
// it is used to parse the json data
app.use(express.json());

// what is the use of cookieParser
// it is used to parse the cookie
app.use(cookieParser());
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true               
}));

connectToDb();

// Importing the UserAuth router
app.use('/api/user', UserAuth);

app.get('/', (req, res) => {
  res.send('Hello, World!');
});

app.listen(port, () => {
  console.log(`Server listening on port http://localhost:${port}`);
});