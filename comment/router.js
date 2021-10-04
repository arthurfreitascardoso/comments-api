const { Router } = require("express");
const Comment = require("./model");
const router = new Router();

router.post("/comment", (request, response, next) => {
  Comment.create(request.body)
    .then(result => response.send(result))
    .catch(errors => next(erros));
});

router.get("/comment", (request, response, next) => {
  Comment.findAll()
    .then(result => response.send(result))
    .catch(errors => next(errors));
});

router.get("/comment/:id", (request, respose, next) => {
  Comment.findByPk(request.params.id)
    .then(event => respose.send(event))
    .catch(errors => next(errors));
});

router.put("/comment/:id", (request, response, next) =>
  Comment.findByPk(request.params.id)
    .then(event => event.update(request.body))
    .then(event => response.send(event))
    .catch(next)
);

router.delete("/comment/:id", (request, response, next) =>
  Comment.destroy({ where: { id: request.params.id } })
    .then(number => response.send({ number }))
    .catch(next)
);

module.exports = router;
