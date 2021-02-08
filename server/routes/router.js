const express = require('express');
const router = express.Router();

//middlewares
const authMiddleware = require('../middleware/auth-handler')

//controllers
const userController = require('../controllers/user.controller')
const taskController = require('../controllers/task.controller')
const priorityController = require('../controllers/priority.controller')
const statusController = require('../controllers/status.controller')

//users endpoints
router.get('/', userController.auth);
router.get('/auth', authMiddleware, userController.auth)
router.post('/registration', userController.registration)
router.post('/login', userController.login)
router.get('/me', authMiddleware,  userController.me)

//users endpoints
router.post('/users/add', authMiddleware,userController.userAdd)
router.get('/users', authMiddleware, userController.getAll)
router.get('/users/employees', authMiddleware, userController.getEmployees)
router.get('/users/leaders', authMiddleware, userController.getTeamLeads)

//task endpoints
router.get('/tasks', authMiddleware, taskController.getAll)
router.post('/tasks/add', authMiddleware, taskController.taskAdd)
router.get('/tasks/me', authMiddleware,taskController.getUserTasks)

router.get('/tasks/today',authMiddleware, taskController.getUserTasksToday)
router.get('/tasks/week',authMiddleware, taskController.getUserTasksCurrentWeek)
router.get('/tasks/future',authMiddleware, taskController.getUserTasksFuture)

router.put('/tasks/update', authMiddleware, taskController.updateTask)
router.get('/tasks/status', authMiddleware, taskController.updateStatus)
router.delete('/tasks/del', authMiddleware, taskController.deleteTask)


//priority endpoints
router.get('/priority', authMiddleware, priorityController.getAll)
router.post('/priority/add', authMiddleware, priorityController.priorityAdd)
router.delete('/priority/del', authMiddleware, priorityController.priorityDel)

//status endpoints
router.get('/status', authMiddleware, statusController.getAll)
router.post('/status/add', authMiddleware, statusController.statusAdd)
router.delete('/status/del', authMiddleware, statusController.statusDel)

module.exports = router;
