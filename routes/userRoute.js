import express from 'express'
import { getProfile, login, logout, register} from '../controllers/userController.js';
import { authentication } from '../middleware/authentication.js';

const router = express.Router();

router.post('/register',register);
router.post('/login', login)
router.post('/logout',logout);
router.get('/getProfile',authentication,getProfile);

export default router;