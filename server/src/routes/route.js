const express=require('express')

const router=express.Router()


const taskController=require('../controllers/taskController')

router.post('/create',taskController.createTask)
router.get('/getTask',taskController.getTask)
router.put('/edit',taskController.editTask)



module.exports=router