import { PrismaClient } from '@prisma/client';
import express from 'express';
import cors from 'cors';

const app = express();
const port = 3000;
app.use(express.json());

app.use(cors());

const prisma = new PrismaClient();

app.post('/tasks', async (req, res) => {
  try {
    const { title, description} = req.body; 

    if (!title || !description) {
      return res.status(400).json({ error: 'Titulo Necessário' });
    }

    const task = await prisma.task.create({
      data: {
        title,
        description
      },
    });

    res.json(task);
  } catch (error) {
    console.error(error);
    res.status(500).send('Erro Criar Tarefa');
  }
});

app.get('/tasks', async (req, res) => {
  try {
    const tasks = await prisma.task.findMany(); 
    res.json(tasks);
  } catch (error) {
    console.error(error);
    res.status(500).send('Erro Get Tarefa');
  }
});


app.put('/task/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, completed} = req.body; 

    const updateTask = await prisma.task.update({
      where: { id: Number(id) },
      data: { 
        title,
        description,
        completed
      }
    });

    res.json(updateTask); 
  } catch (error) {
    console.error('Erro ao atualizar tarefa:', error);
    res.status(500).send('Erro no Update da Tarefa');
  }
});

app.delete('/task/:id', async (req, res) => {
  try {
    const { id } = req.params; 
    const deletedTask = await prisma.task.delete({
      where: { id: Number(id) } 
    });
    res.json(deletedTask);
  } catch (error) {
    console.error(error);
    res.status(500).send('Erro ao deletar a tarefa');
  }
});




app.listen(port, () => {
  console.log(`Server Started ✔  ${port}`);
});

