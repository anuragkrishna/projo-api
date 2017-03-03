/*jshint esversion: 6 */

import express from 'express';
import  user_controller from '../controllers/userController';
let router = express.Router();

/* GET home page. */
router.get('/', user_controller.index);

export default router;
