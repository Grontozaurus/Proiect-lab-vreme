const express = require('express');
const app = express();
const expressLayouts = require('express-ejs-layouts');
const mongoose = require('mongoose');
const flash = require('connect-flash');
const session = require('express-session');
const passport = require('passport');
const bodyParser = require('body-parser')

require('./config/passport')(passport);
const url = 'mongodb://127.0.0.1:27017/users'
mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true  })
const db = mongoose.connection
db.once('open', _ => {
  console.log('Database connected:', url)
})

db.on('error', err => {
  console.error('connection error:', err)
})




//EJS

app.use(expressLayouts);
app.set('view engine', 'ejs');

//Bodyparser
app.use(express.urlencoded({extended:false}));
// app.use(express.bodyParser.json());
// app.use(bodyParser.json());
app.use(express.json());
app.use('/static', express.static(__dirname + '/resources'));



//Express-session

app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true,
   
  }));


//Passport
app.use(passport.initialize());
app.use(passport.session());

//Flash

app.use(flash());

//Global vars

app.use((req, res, next)=>{
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg');
    res.locals.error = req.flash('error');
    next();

})


// ROUTES

app.use('/', require('./routes/index'))
app.use('/users', require('./routes/users'))

const PORT = process.env.PORT || 3000;
app.listen(PORT, console.log(`Server started on port ${PORT}`))