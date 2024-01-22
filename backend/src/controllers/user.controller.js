import { User } from '../models/user.models.js'
import ApiResponse from '../utils/ApiResponse.js'
import asyncHandler from '../utils/asyncHandler.js'
import uploadOnCloudinary from '../utils/cloudinary.js'
import { Client } from '../models/user2.models.js'

const registerUser = asyncHandler(async(req,res) => {


    const {password, name, email} = req.body
    // console.log(username)
    // console.log(req.file.path)
    // const imageLocalPath = req.file.path

    // if(!imageLocalPath){
    //     throw new Error('Image is Required..')
    // // check similarly for other required fields
    // }

    // const userExists = await User.findOne({
    //     $or: [{name},{email}] 
    // })

    if(await Client.findOne({email: email})){
        throw new Error(400, 'User Already Exists...')
    }

    // if(userExists){
    //     throw new Error(400, 'User Already Exists...')
    // }


    // const image = await uploadOnCloudinary(imageLocalPath)

    // console.log(image)
    const user = await Client.create({
        // username: username,
        password: password,
        email: email,
        name: name,
        // image: image.url
    })

    const registeredUser = await Client.findById(user._id).select(" -password ")

    return res.status(200)
    .json(
        new ApiResponse(
            201,
            registeredUser,
            "Successfully Registered..."
        )
    )
})


const loginUser = asyncHandler(async(req,res) => {
    
    const {email, password} = req.body

    const user = await Client.findOne({email: email})
    if(!user){
        throw new Error(401, 'email and password are required...')
    }

    const passwordCorrect = await user.isPassCorrect(password)
    if(!passwordCorrect){
        throw new ApiError(401, "Incorrect Password...")
    }

    return res.status(200).json(
        new ApiResponse(
            200,
            {},
            "Successfully Logged In..."
        )
    )
})

export {
    registerUser,
    loginUser
}