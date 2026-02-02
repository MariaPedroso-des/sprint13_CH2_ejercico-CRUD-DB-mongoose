// Los modelos definen la forma de los datos(campos y tipos). Ponemos las reglas(string, default, required...)

const mongoose = require('mongoose')

const TaskSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  completed: {
    type: Boolean,
    default: false
  }
}, { timestamps: true })

const Task = mongoose.model('Task', TaskSchema)

module.exports = Task