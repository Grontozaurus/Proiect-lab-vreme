if (process.env.NODE_ENV !== 'production'){
    require('dotenv').config()
}

const Weather_API_KEY = process.env.Weather_API_KEY

const express = require('express')
const app = express();
const axios = require('axios')

app.use(express.json());
app.use(express.static('public'));

app.post('/weather', (req,res)=>{
    const url = `https://weather.ls.hereapi.com/weather/1.0/report.json?product=observation&latitude=${req.body.latitude}&longitude=${req.body.longitude}&oneobservation=true&apiKey=H6XyiCT0w1t9GgTjqhRXxDMrVj9h78ya3NuxlwM7XUs`
    axios({
        url: url,
        responseType: 'json'
    }).then(datA => res.json(data.data.currently))
}) 

app.listen(5000,()=>{
    console.log('Server Started')
})
