/*jshint esversion: 6 */

import express from 'express';
let router = express.Router();

import user_controller from '../controllers/userController';
import project_controller from '../controllers/projectController';
import note_controller from '../controllers/noteController';
import report_controller from '../controllers/reportController';

import authenticate from '../middlewares/authenticate';


//User Routes//

//Get User Detail.
router.get('/user/:id', user_controller.user_details);

//Create User.
router.post('/user', user_controller.user_create);

//Update User details.
router.put('/user',  user_controller.user_update);

//deletete User details.
router.delete('/user/:id',  user_controller.user_remove);



//Project Details//

//Get project Detail.
router.get('/projects', authenticate, project_controller.project_list);

//Get project Detail.
router.get('/project/:id', authenticate, project_controller.project_detail);

//Create Project.
router.post('/project', authenticate, project_controller.project_create);

//Update Project details.
router.put('/project/:id', authenticate, project_controller.project_update);

//deleteete Project.
router.delete('/project/:id', authenticate, project_controller.project_remove);



//Note Details//

//Get Note list.
//router.get('/notes', note_controller.note_list);

//Get Note list for a project.
router.get('/project/:id/notes', note_controller.note_list);

//Get Note Detail.
router.get('/note/:id', note_controller.note_detail);

//Create Note.
router.post('/project/:id', note_controller.note_create);

//delete Note.
router.delete('/note/:id', note_controller.note_remove);



//Report Details//

//Get report list.
router.get('/reports', report_controller.report_list);

//Get report list for a project.
router.get('/project/:id/reports', report_controller.report_list);

//Get report Detail.
router.get('/report/:id', report_controller.report_detail);

//Create report.
router.post('/project/:id', report_controller.report_create);

//Update report details.
router.put('/report/:id', report_controller.report_update);

//deletete report.
router.delete('/report/:id', report_controller.report_remove);


export default router;
