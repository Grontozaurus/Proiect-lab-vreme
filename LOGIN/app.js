const express = require('express')
const app = express();
const expressLayouts = require('express-ejs-layouts');
const mongoose = require('mongoose')

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
app.use(express.urlencoded({extended:false}))

// ROUTES

app.use('/', require('./routes/index'))
app.use('/users', require('./routes/users'))

const PORT = process.env.PORT || 5000;
app.listen(PORT, console.log(`Server started on port ${PORT}`))