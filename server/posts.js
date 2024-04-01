const express = require('express')
const router = express.Router()

router.get("/", (req, res) => {
    res.json("hello")
})

router.get("/test", (req, res) => {
    res.json("hello")
})

const mariadb = require('mariadb')
const pool = mariadb.createPool({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'dokimi',
    connectionLimit: 5
})

pool.getConnection((err, connection) => {
    if(err){
        if (err.code === 'PROTOCOL_CONNECTION_LOST'){
            console.error('Database connection lost');
        }
        if (err.code === 'ER_CON_COUNT_ERROR'){
            console.error('Database has too many connection');
        }
        if (err.code === 'ECONNREFUSED'){
            console.error('Database connection was refused');
        }
    }
    if(connection) connection.release();

    return;
});

router.get('/:id', async function(req,res){
    try {
        const sqlQuery = 'SELECT fordays.mera, fordays.hours, nadoume.name FROM fordays, nadoume WHERE nadoume.id = fordays.id AND fordays.id = ?';
        const rows = await pool.query(sqlQuery, req.params.id);
        res.status(200).json(rows);
    } catch (error) {
        res.status(400).send(error.message)
    }


    // res.status(200).json({id:req.params.id})
});

router.get('/name/:name', async function(req,res){
    try {
        const sqlQuery = 'SELECT fordays.mera, fordays.hours FROM fordays JOIN nadoume ON nadoume.id = fordays.id WHERE nadoume.name = ?';
        const rows = await pool.query(sqlQuery, req.params.name);
        res.status(200).json(rows);
    } catch (error) {
        res.status(400).send(error.message)
    }


    // res.status(200).json({id:req.params.id})
});

router.post('/register', async function(req,res) {
    try {
        const {mera, id, hours} = req.body;
        
        //let date = new Date();

        const sqlQuery = 'INSERT INTO `fordays` (`mera`, `id`, `hours`) VALUES (?, ?, ?)';
        const result = await pool.query(sqlQuery, [mera, id, hours]);

        res.status(200).json({userid: id});
    } catch (error) {
        res.status(400).send(error.message)
    }
});


module.exports = router