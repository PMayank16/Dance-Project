const express = require("express");
const path = require('path');
const mongoose = require('mongoose');
const bodyparser = require('body-parser')
const app = express();
const port = 8000;

mongoose.connect('mongodb://localhost/contactDance');

var contactSchema = new mongoose.Schema({
    name: String,
    email: String,
    phone: String,
    address: String
  });   
var contact = mongoose.model('contact', contactSchema);



app.use('/static', express.static('static'));
app.use(express.urlencoded());


app.set('view engine','pug');
app.set("views", path.join(__dirname,'views'));

app.get('/', (req,res)=>{
    const params = { }
    res.status(200).render('home.pug', params);
})
app.get('/contact', (req,res)=>{
    const params = { }
    res.status(200).render('contact.pug', params);
})
app.post('/contact', (req,res)=>{
    var myData = new contact(req.body);
    myData.save().then(()=>{
        res.send("This item has been saved to the database")
    }).catch(()=>{
        res.status(400).send("item was not saved to the database")
    })
    // res.status(200).render('contact.pug',);
})
app.listen(port,()=>{
    console.log(`this is successfully port server ${port}`)
});