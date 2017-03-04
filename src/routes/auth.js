/*jshint esversion: 6 */

import express from 'express';
import authController from '../controllers/authController';

let router = express.Router();

/* GET users listing. */
router.post('/', authController.logIn);

export default router;
