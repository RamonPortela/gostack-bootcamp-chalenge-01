const express = require('express');

const projects = [];

const app = express();

app.use(express.json());

app.get('/projects', (req, res) => {
  return res.status(200).json({ projects });
});

app.post('/projects', (req, res) => {
  const { id, title } = req.body;

  projects.push({
    id,
    title,
    tasks: [],
  });

  return res.status(201).send();
});

app.put('/projects/:id', (req, res) => {
  const id = parseInt(req.params.id, 10);
  const { title } = req.body;

  const project = projects.find(p => p.id === id);

  project.title = title;

  return res.status(204).send();
});

app.listen(3333);
