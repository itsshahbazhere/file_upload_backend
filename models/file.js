const mongoose = require("mongoose");
require('dotenv').config()
const {transporter} = require('../config/nodemailer')

const fileSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  fileUrl: {
    type: String,
  },
  tags: {
    type: String,
  },
  email: {
    type: String,
  },
});

fileSchema.post("save", async function(doc){
  try{
    //send mail after file is saved
    let info = await transporter.sendMail({
      from:`The Shahbaz <${process.env.MAIL_USER}>`,
      to: doc.email,
      subject: "New file uploaded on Cloudinary",
      html:`<h2>Hii ${doc.name},</h2> 
            <p>Your file has been uploaded successfully.</p>
            <p>View here: <a href="${doc.fileUrl}" target="_blank">Click Here</a></p>`,
    });
    console.log("Email sent successfully:", info.messageId);

  } catch(error){
    console.error("Error sending email:", error);
  }
});


const File = mongoose.model("File", fileSchema);
module.exports = File;