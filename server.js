const mysql = require('mysql');
const express = require('express');
const body_parse = require('body-parser');
const handlebars = require('express-handlebars');


const app = express();
// server
app.listen(3030, function(req, res) {
    console.log('servidor on')
})

// conexao bd
const con = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'node',
    port: '3306'
})


//template
app.engine('handlebars', handlebars.engine({defaultLayout:'main'}));
app.set('view engine', 'handlebars')
app.use('/css', express.static('css'))
app.use('/img', express.static('img'))
app.use('/js', express.static('js'))


const urlParser = body_parse.urlencoded({extended:false});

// rotas
app.get("/", function(req, res){
    con.query("select id, nome, telefone, email, date_format(nascimento, '%d/%m%/%Y') as nascimento from user", function(err, result){
        if (err) throw err;
        res.render('index', {dados: result})
    })
})

app.get('/inserir', function(req, res){
    res.render('inserir')
})

app.post('/controllerForm', urlParser, function(req, res){
    var nome = req.body.nome
    var email = req.body.email
    var telefone = req.body.telefone
    var nascimento = req.body.nascimento

    con.query('insert into user (nome, email, telefone, nascimento) values (?,?,?,?)', [nome, email, telefone, nascimento], function(err){
        if (err) throw err;
        console.log('sucesso')
        res.redirect('/')
    })

})

app.get('/login:id?', function(req, res) {
    res.render('login')
})

app.post('/controllerLogin', urlParser, function(req, res){
    var nome = req.body.nome
    var senha = req.body.senha

    con.query('select * from user where nome = (?) and senha = (?)', [nome, senha], function(err, result){
        if (err) throw err;
        if (result.length < 1){
            res.render('login')
        }else{
            res.render('controllerLogin', {dados: result})
        }
    })
})

app.get('/update/:id', function(req, res){
    con.query("select id, nome, telefone, email, date_format(nascimento, '%Y-%m%-%d') as nascimento from user where id=?", [req.params.id], function(err, result){
        res.render('update', {dados: result})
    })
})

app.post('/update/controllerUpdate', urlParser, function(req, res){
    con.query('update user set nome=?, email=?, nascimento=?, telefone=? where id = ?', [req.body.nome, req.body.email, req.body.nascimento, req.body.telefone, req.body.id])
    res.redirect('/')
})

app.get('/delete/:id', function(req, res){
    con.query('delete from user where id=?',[req.params.id])
    res.redirect('/')
})
