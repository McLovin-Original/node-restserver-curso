require('./config/config');

const express = require('express');
const app = express();
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: false}));

//parse aplication/x-www-form
app.use(bodyParser.json());


app.get('/usuario',function(req,res){
    res.send('get Usuario');
});

app.post('/usuario',function(req,res){
    let body = req.body;
    if (body.nombre === undefined) {
        res.status(400).json({
            ok: false,
            mensaje: 'El nombre es necesario',
        });
    }else{
        res.send({persona:body});
    }
});

app.put('/usuario/:id',function(req,res){
    let id = req.params.id;
    res.json({id});
});

app.delete('/usuario',function(req,res){
    res.send('delete Usuario');
});

app.listen(process.env.PORT,() => {
    console.log('Escuchando puerto: ',process.env.PORT);
});
