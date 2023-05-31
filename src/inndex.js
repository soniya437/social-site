const express = require('express');
const route = require('./route/route.js');
const mongoose = require('mongoose');

const app = express();
app.use(express.json());

mongoose.connect("mongodb+srv://birendra:Kumar1234@cluster0.bh605ut.mongodb.net/wowTalent", {
    useNewUrlParser: true
})
.then(() => console.log("MongoDb is connected"))
.catch(err => console.log(err))
app.use('/', route)

app.listen(PORT, function () {
    console.log('Express app running on port ' + PORT)
});