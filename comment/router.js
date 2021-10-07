const { Router } = require("express");
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

router.get('/comment', async (req, res) => {
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
router.post('/comment', async (req, res) => {
  try {
    
    const { author, comment } = req.body;
    const client = await pool.connect();
    const result = await client.query('INSERT INTO comment_table (author, comment) VALUES ($1, $2)', [author, comment]);
    const results = { 'results': (result) ? result.rows : null};
    res.send( req.body );
    client.release();
  } catch (err) {
    console.error(err);
    res.send("Error " + err);
  }
})
router.get('/delete', async (req, res) => {
  try {
    const client = await pool.connect();
    const result = await client.query('DELETE FROM comment_table');
    const results = { 'results': (result) ? result.rows : null};
    res.send( results );
    client.release();
  } catch (err) {
    console.error(err);
    res.send("Error " + err);
  }
})

module.exports = router;
