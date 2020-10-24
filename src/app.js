const express = require("express");
const cors = require("cors");
const { uuid, isUuid } = require("uuidv4");

const app = express();

app.use(express.json());
app.use(cors());

const repositories = [];

app.get("/repositories", (request, response) => {
  response.status(200).json(repositories);
});

app.post("/repositories", (request, response) => {
  const { title, url, techs } = request.body;
  if (!title || !url || !techs) {
    response
      .status(400)
      .json({ mensage: "Bad Request! Must have title, url and techs" });
  }
  const repositorieCreated = { id: uuid(), title, url, techs, likes: 0 };

  repositories.push(repositorieCreated);

  response.status(200).json(repositorieCreated);
});

app.put("/repositories/:id", (request, response) => {
  const { title, url, techs } = request.body;
  const { id } = request.params;
  if (!id || !isUuid(id)) {
    response.status(400).json({ mensage: "Bad Request! Must have id" });
  } else if (repositories.findIndex((f) => f.id === id) < 0) {
    response.status(404).json({ mensage: "Id not found" });
  }

  const indexToBeUpdated = repositories.findIndex((f) => f.id === id);

  repositories[indexToBeUpdated].title = title;
  repositories[indexToBeUpdated].url = url;
  repositories[indexToBeUpdated].techs = techs;

  const repositorieUpdated = repositories[indexToBeUpdated];

  response.status(200).json(repositorieUpdated);
});

app.delete("/repositories/:id", (request, response) => {
  const { id } = request.params;
  if (!id || !isUuid(id)) {
    response.status(400).json({ mensage: "Bad Request! Must have id" });
  } else if (repositories.findIndex((f) => f.id === id) < 0) {
    response.status(404).json({ mensage: "Id not found" });
  }
  const deletedRepository = repositories.filter(
    (f) => f.id === "68378e17-f2e5-4c77-b35b-3e6fb6735130"
  );

  const indexToBeDelete = repositories.findIndex((f) => f.id === id);

  repositories.splice(indexToBeDelete, 1);

  response.status(204).json(deletedRepository);
});

app.post("/repositories/:id/like", (request, response) => {
  const { id } = request.params;
  if (!id || !isUuid(id)) {
    response.status(400).json({ mensage: "Bad Request! Must have id" });
  } else if (repositories.findIndex((f) => f.id === id) < 0) {
    response.status(404).json({ mensage: "Id not found" });
  }

  const index = repositories.findIndex((f) => f.id === id);
  repositories[index].likes++;

  const repositorieLikeUpdated = repositories[index];

  response.status(200).json(repositorieLikeUpdated);
});

module.exports = app;
