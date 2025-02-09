const express = require('express');
const app = express();

//cloudinary middleware instance
const fileupload = require('express-fileupload')
require('dotenv').config();

//port
const PORT = process.env.PORT || 3000;

//middleware
app.use(express.json());

app.use(fileupload({
    useTempFiles : true,
    tempFileDir : '/tmp/'
}));

//connect to db
const {dbConnect} = require('./config/database');

//connect to clodinary
const cloudinary = require('./config/cloudinary');
cloudinary.cloudinaryConnect();

//api mount
const Upload = require('./routes/fileUploads');
app.use('/api/v1/upload',Upload)

//activate server
app.listen(PORT, ()=> {
    console.log(`server created at ${PORT}`)
})
dbConnect();

//default route
app.get('/', (req,res)=>{
    res.send("this is '/' route")
})