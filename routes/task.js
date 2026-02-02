// Aqui si que ponemos las rutas el CRUD

const express = require('express')
const router = express.Router()
const Task = require('../models/Task.js')

//Create - post

router.post('/create', async (req, res) => {
  try {
    const {title} = req.body

    if(!title || title.length < 3) {
      return res.status(400).json({error: 'No title or is too short'})
    }

    const task = await Task.create(req.body)
    res.status(201).json({ data: task, message: 'Task created' })
  } catch (err) {
    res.status(500).json({ message: 'Server error' })
  }
})

//Read - get

router.get('/', async (req, res) => {
  try {
    const allTasks = await Task.find()
    res.json({ data: allTasks, message: 'Tasks list' }) 
  } catch (err) {
    res.status(500).json('Server error')
  }
})

//Read por id - get

router.get('/id/:id', async (req, res) => {
  try {
    const id = req.params.id
    const oneTask = await Task.findById(id)
    if(!oneTask) {
      return res.status(404).json({ error: 'Task not found' })
    }
    res.json({ data: oneTask })
  } catch (err) {
      res.status(500).json('Server error')
  }
})

//Update(completada) - put
router.put('/markAsCompleted/:id', async (req, res) => {
  try {
    const id = req.params.id
    const completedTask = await Task.findById(id)

    if(!completedTask) {
      return res.status(404).json({ error: 'Task not found' })
    }

    completedTask.completed = true;
    await completedTask.save()
    res.json({ data: completedTask, message: 'Task completed' })
  } catch (err) {
    res.status(500).json({ error: 'Server error' })
  }
})

//Update(cambiar titulo) - put

router.put('/id/:id', async (req, res) => {
try {
  const id = req.params.id
  const newTitle = req.body.title
  const actualTask = await Task.find({ title: newTitle })
  
  if(!actualTask) {
    return res.status(404).json({ error: 'Title already exits' })
  }
  
  const task = await Task.findById(id)

  if(!task) {
    return res.status(404).json({ error: 'Task not found' })
  }
  task.title = newTitle
  await task.save()
  res.json({ data: task, message: 'Title modified' })

  } catch (err) {
    res.status(500).json({ error: 'Server error' })
  }
})

// OTRA OPCIÓN MAS SIMPLE
//  router.put('/id/:id', async (req, res) => {
//   const { title } = req.body
//   const task = await Task.findByIdAndUpdate(
//     req.params.id,
//     { title },
//     { new: true }
//   )
//   res.json({ data: task })
// })

//Delete - delete

router.delete('/id/:id', async (req, res) => {
  try {
    const id= req.params.id
    const deletedTask = await Task.findByIdAndDelete(id)
    res.json({ data: deletedTask, message: 'Task deleted' })
  } catch (err) {
    res.status(500).json({ error: 'Server error' })
  }
})

module.exports = router