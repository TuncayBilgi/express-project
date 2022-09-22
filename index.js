const path = require('path')
const express = require('express')
const app = express()
const cookieParser = require('cookie-parser')
const informations = require('./back/back.js')
const hostname = '127.0.0.1';
const port = 3000;
const db = require('./db');
const session = require('./models/session.js')
const { sequelize } = require('./db')

app.use(cookieParser());
app.use(express.json());
app.use("/static", express.static(path.join(__dirname, '/static')))


app.get('/', (req, res) => {
    res.redirect(301, '/static/index.html')
})

app.get('/set/lancer',(req, res) => {
    infos = informations.infos(req.query['compteur']);
    res.json({
        compteur: infos.compteur,
        set: infos.set,
        score: infos.score,
        valide: infos.valide,
    });
});

app.use('/redirect/score',(req, res) => {
    console.log('Ferme la puta de secours')
    res.redirect(301, '/static/score.html');
})

app.get('/cookie/',(req, res) => {
    const id = req.query.id;
    res.cookie('id', id);
    res.end("cookie updated ")
}) 

app.use('/api/update/',(req, res) => {
    const id = req.query.id;
    const score = req.query.score;
    
    db.models.Session.findByPk(id)
        .then( (session) => {
             //session.score=score; 
             //session.save();
    })
});


app.use('/cookie/score/',(req, res) => {
    const score = req.query.score;
    res.cookie('score',score);
    res.end();
})

app.use('/api/create/',(req, res) => {
    
    db.models.Session.create(
            { 
                pseudo : req.query.pseudo,
                score : 1
            }
        ).then((session) => {res.json(session);})
        .catch((err) =>{res.end("c'est cassé ! ")})
    console.log(res.json);
    }
);

app.use('/api/read',(req, res) => {
    sequelize.query("SELECT id,pseudo,score FROM 'sessions' ORDER BY score DESC LIMIT 10").then((message) => {
        res.json(message)
    }).catch((err) => {
        res.end("error")
        console.log(err)
    })
    

    }
)








app.use(function (req, res) {
    console.log("et c'est le 404 : " + req.url);

    res.statusCode = 404;
    res.setHeader('Content-Type', 'text/html');

    res.end("<html><head><title>la quatre cent quatre</title></head><body><h1>Et c'est la 404.</h1><img  src=\"https://www.leblogauto.com/wp-content/uploads/2020/04/Peugeot-404-1.jpg\" /></body></html>");

})

app.listen(port, hostname);
console.log(`Server running at http://${hostname}:${port}/`);