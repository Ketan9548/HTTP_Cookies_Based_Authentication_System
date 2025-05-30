import { Router } from "express";
import { login, registration, getuser, checkauthuser, Logout } from "../Controllers/Login.js";
import authmiddeware from "../Middleware/authmiddeware.js";

const UserAuth = Router();

UserAuth.post('/login', login);
UserAuth.post('/registration', registration);
UserAuth.get('/getuser/:id', getuser);
UserAuth.get('/check-auth', authmiddeware, checkauthuser)
UserAuth.get('/logout', Logout);

export default UserAuth;