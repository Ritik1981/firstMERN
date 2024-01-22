import {v2 as cloudinary} from 'cloudinary';
import fs from 'fs'


cloudinary.config({ 
    cloud_name: 'dazmqutip', 
    api_key: '126285411787831', 
    api_secret: 'pDYUXAhsOecfAv6Urc11cDN_1rI'    //pDYUXAhsOecfAv6Urc11cDN_1rI
});

const uploadOnCloudinary = async (localFilePath) => {
    try {
        console.log("Enterd try block...")
        if(!localFilePath){
            console.log("File Not Found...")
        }
        console.log("passed if")
        const response = await cloudinary.uploader.upload(localFilePath,{
            resource_type: 'auto',
            media_metadata: true
        })
        console.log("uploaded")
        fs.unlinkSync(localFilePath)
        console.log(("File Uploaded Successfully On Cloudinary: ",response.url))
        return response;
        // if needed return res.url

    } catch (error) {
        fs.unlinkSync(localFilePath)
        console.log("Error Uploading image file: ", error)
    }
}

export default uploadOnCloudinary;