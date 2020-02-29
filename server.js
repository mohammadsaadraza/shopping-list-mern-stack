const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const items = require('./routes/api/Items')
const path = require('path')

const app = express()

app.use(bodyParser.json())

const db = require('./config/keys').mongoURI
mongoose.connect(db)
    .then(()=> console.log('MongoDB Connected'))
    .catch(err => console.log(err))

app.use('/api/items', items)

//SERVE static assests if in production
if(process.env.NODE_ENV === 'production'){
    //set static folder
    app.use(express.static('client/build'))
    app.get('*', (req,res) => {
        res.sendFile(path.resolve(__dirname,'client','build','index.html'))
    })
}

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server started on PORT ${port}`))