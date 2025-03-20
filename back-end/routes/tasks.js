import express from 'express'

const router = express.Router()


rounter.post('/tasks', (req, res) => {
    const  tarefa = req.body 

    res.status(201).json(tarefa)
}
)


export default rounter