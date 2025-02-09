const File = require('../models/file');
const cloudinary = require('cloudinary').v2;


//function for chekcking file type is supportes
function isSupportedFile (fileType,supportType){
    return supportType.includes(fileType);
}

//logic for upload file in cloudinary
async function uploadFileToCloudinary(file, folder, quality){
    const options = {folder};
    if(quality){
        options.quality = quality;
    }
    options.resource_type = "auto";
    //make sure cloudinary instance and added tempfilepath in middleware 
    return await cloudinary.uploader.upload(file.tempFilePath, options);
}


//local file upload handler function
exports.localFileUpload = async( req, res) =>{
    try{
        //fetch file
        const file = req.files.file;

        //create file where file need to be stored in server
        let path = __dirname + '/files/' + Date.now() + `.${file.name.split('.')[1]}`; // current directory is _ _ dirname like files ----->/files/ upload my file in server i.e (controllers/files/)

        //add path to move function
        file.mv(path, (err)=>{
            if(err){
                console.log(err);
            }
            
        });

        res.json({
            success:true,
            message:"Local file upload successfully"
        })
    } catch(err){
        return res.status(500).json({
            success:false,
            message:"somthing went wrong while locally file upload"
        })

    }
}


//image upload to cloudinary
exports.imageUpload = async( req, res) => {

    try{

        //fetch email, tags, name from req.body
        const { name, email, tags } = req.body;
        const imageFile = req.files.imageFile;

        // console.log("imageFile->",imageFile)

        //support file configration
        const supportType = ["jpg", "jpeg", "png"];
        const fileType = imageFile.name.split('.')[1].toLowerCase();

        // console.log("fileType->",fileType)


        if(!isSupportedFile(fileType,supportType)){
            return res.status(400).json({
                success:false,
                message:"File type is not supported",
            })
        }


        //upload to cloudinary
        const responce = await uploadFileToCloudinary(imageFile, "FileUploadApp") //file name that os fetch and folder name of cloudinary
        
        // console.log("responce->", responce)

        //upload to databse
        const imageData = await File.create({
            name,
            email,
            tags,
            fileUrl:responce.secure_url
        });

        // console.log("imageData->",imageData);


        res.status(200).json({
            success:true,
            message:"image uplaod successfully in cloudinary",
            imageData,
        })

    } catch(err){
        return res.status(500).json({
            success:false,
            message:"somthing went wrong while image uplaod"
        })
    }
}


//video upload
exports.videoUpload = async( req, res) =>{
    try{

        //fetch email, tags, name from req.body

        const { name, email, tags } = req.body;
        const videoFile = req.files.videoFile;

        //validation
        const supportType = ["mp4", "mov"];
        const fileType = videoFile.name.split('.')[1].toLowerCase();
        
        if(!isSupportedFile(fileType,supportType)){
            return res.status(400).json({
                success:false,
                message:"File type is not supported",
            })
        }

        // console.log("corrected at this point")

        //upload to cloudinary
        const response = await uploadFileToCloudinary(videoFile, "FileUploadApp");
       
        // console.log("reponce--->>",response)
        //upload to databse
        const videoData = await File.create({
            name,
            email,
            tags,
            fileUrl:response.secure_url
        });

        res.status(200).json({
            success:true,
            message:"video uplaod successfully in cloudinary",
            videoData,
        })

    } catch(err){
        return res.status(500).json({
            success:false,
            message:"somthing went wrong while video upload"
            
        })
    }
}





//image Reduce and then Upload
exports.imageReducerUpload = async( req, res) =>{
    try{

        //fetch email, tags, name from req.body

        const { name, email, tags } = req.body;
        const imageFile = req.files.imageFile;

        //support file configration
        const supportType = ["jpg", "jpeg", "png"];
        const fileType = imageFile.name.split('.')[1].toLowerCase();

        if(!isSupportedFile(fileType,supportType)){
            return res.status(400).json({
                success:false,
                message:"File type is not supported",
            })
        }

        //upload to cloudinary
        const responce = await uploadFileToCloudinary(imageFile, "FileUploadApp", 10) //file name that os fetch and folder name of cloudinary
        
        //upload to databse
        const imageData = await File.create({
            name,
            email,
            tags,
            fileUrl:responce.secure_url
        });

        res.status(200).json({
            success:true,
            message:"reduce image uplaod successfully in cloudinary",
            imageData,
    
        })

    } catch(err){
        return res.status(500).json({
            success:false,
            message:"somthing went wrong while reducing image upload",
        })
    }
}