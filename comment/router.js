const { Router } = require("express");
const Comment = require("./model");
const router = new Router();
const { Pool } = require('pg');
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
});

router.get("/", (request, response, next) => {
    response.send(`<html>
    <body>
      <h2>Welcome to homepage</h2>
      
    </body>
  </html>`)  
});
/*router.post("/comment", (request, response, next) => {
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
);*/

router.get('/db', async (req, res) => {
  try {
    const client = await pool.connect();
    const result = await client.query('SELECT * FROM comment_table');
    const results = { 'results': (result) ? result.rows : null};
    res.send( results );
    client.release();
  } catch (err) {
    console.error(err);
    res.send("Error " + err);
  }
})
router.post('/db', async (req, res) => {
  try {
    const client = await pool.connect();
    const result = await client.query('INSERT INTO comment_table VALUES (' + req[author] + ', '+ req[comment] + ')');
    const results = { 'results': (result) ? result.rows : null};
    res.send( results );
    client.release();
  } catch (err) {
    console.error(err);
    res.send("Error " + err);
  }
})

module.exports = router;
