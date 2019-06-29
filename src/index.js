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

  res.status(201).send();
});

app.listen(3333);
