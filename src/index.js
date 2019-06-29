const express = require('express');

let counter = 0;
const projects = [];

const app = express();

app.use(express.json());
app.use((req, res, next) => {
  counter += 1;
  console.log(`Requests counter: ${counter}`);

  next();
});

function validateIdExistenceMiddleware(req, res, next) {
  const id = parseInt(req.params.id, 10);

  if (!projects.find(project => project.id === id))
    return res.status(400).json({ error: 'No projects found with this id' });

  return next();
}

app.get('/projects', (req, res) => {
  return res.status(200).json({ projects });
});

app.post('/projects', (req, res) => {
  const { id, title } = req.body;

  if (projects.find(project => project.id === id))
    return res
      .status(400)
      .json({ error: 'Project with this id already exists' });

  const project = {
    id,
    title,
    tasks: [],
  };

  projects.push(project);

  return res.status(201).json(project);
});

app.put('/projects/:id', validateIdExistenceMiddleware, (req, res) => {
  const id = parseInt(req.params.id, 10);
  const { title } = req.body;

  const project = projects.find(p => p.id === id);

  project.title = title;

  return res.status(204).send();
});

app.delete('/projects/:id', validateIdExistenceMiddleware, (req, res) => {
  const id = parseInt(req.params.id, 10);

  const projectIndex = projects.findIndex(p => p.id === id);

  projects.splice(projectIndex, 1);

  return res.status(204).send();
});

app.post('/projects/:id/tasks', validateIdExistenceMiddleware, (req, res) => {
  const id = parseInt(req.params.id, 10);
  const { title } = req.body;

  const project = projects.find(p => p.id === id);

  project.tasks.push(title);

  return res.status(201).json(project);
});

app.listen(3333);
