const ejsmate = require('ejs-mate')
const path = require('path')
const express = require('express')
const mongoose = require('mongoose')
const flash = require('connect-flash')
const bcrypt = require('bcrypt')
const User = require('./models/user')
const passport = require('passport')
const catchasync = require('./utils/catchasync')
const bodyParser = require('body-parser')


mongoose.connect('mongodb://localhost:27017/yelp-camp', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
});

const app = express();

app.engine('ejs',ejsmate)
app.set('views' , path.join(__dirname, 'views')); 
app.set('view engine', 'ejs');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

app.get('/',(req,res)=>{
    res.render('./user/register')
})
app.post('/register', catchasync(async (req,res,next)=>{
    try {
        console.log(req.body)
        const { username,email, password, dob, gender } = req.body;
        const user = new User({ email, username, gender, dob});
        const registeredUser = await User.register(user, password);
        res.redirect('./')
        
        }catch(e){
            res.send(e.message);
        }
}))

app.listen(3000,()=>{
    console.log('working with port 3000')
})
