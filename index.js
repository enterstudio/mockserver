let express = require("express");
let fs = require("fs");

let app = express();

let port = process.env.PORT | 5000;

  
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.get('/', (req, res) => {
    res.status(200).send("Hola");
});
app.get('/ping', (req, res) => {
    res.json({ msg: "pong"});
});
app.get('/customers', (req, res) => {
    res.json([
        {
            name: "Ana",
            lastname: "Zamora"
        },
        {
            name: "Pepe",
            lastname: "Zamora"
        },
        {
            name: "Javier",
            lastname: "Zamora"
        }
    ]);
});
app.get('/countries', (req, res) => {
    fs.readFile(__dirname + '/ejemplos/paises.json', (err, data) => {
        if (err) {
            //throw err;
            res.status(503).json(err);
            return;
        }
        let payload = JSON.parse(data.toString());
        res.json(payload);
    });
});


app.listen(port);

console.log("App running at " + port);