let express = require("express");
let bodyParser = require("body-parser");
let mongoose = require("mongoose")
mongoose.connect('mongodb://localhost:27017/regForm');
let db = mongoose.connection;
db.on('error', console.log.bind(console, "connection error"));
db.once('open', function(callback){
    console.log("connection succesfull")
})

const app = express();
app.use(bodyParser.json());
app.use(express.static('public'));
app.use(bodyParser.urlencoded({
    extended: true
}));

app.post('/sign_up', function(req,res){
    let name= req.body.name;
    let email = req.body.email;
    let phone =req.body.phone;
    let pass = req.body.password;

    let data = {
        "name": name,
        "email": email,
        "phone": phone,
        "password": pass
        
    }

    db.collection('details').insertOne(data,function(err, collection){
        if(err) throw err;
        console.log("Record inserted successfully");
    })

    return res.redirect('signup_success.html');
})

app.get('/', function(req, res){
    res.set({
        'Access-control-Allow-Origin': '*'
    });
return res.redirect('index.html');
}).listen(3000)
console.log("server listening at port 3000");
// app.get("/",(req,res)=>{
//     res.send("Hello form server")
// }).listen(3000);
// console.log("Listening on port 3000")
