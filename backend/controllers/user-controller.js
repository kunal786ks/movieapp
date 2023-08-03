import User from "../models/User.js";
import bcrypt from 'bcryptjs'
export const getAllUsers = async (req, res, next) => {
    let users;
    try {
        users = await User.find()  //to get all the document from the collections users
    }
    catch (err) {
        return console.log(err)
    }
    if (!users) {
        return res.status(500).json({
            message: 'Unexpected Error occured'
        })
    }
    return res.status(200).json({ users })
}

export const signUp = async (req, res, next) => {
    const { name, email, password } = req.body;
    if (!name && name.trim() === '' && !email && email.trim() === '' && !password && password.trim() === '') {
        return res.status(422).json({
            message: 'Invalid inputs'
        })
    }
    const newPassword = bcrypt.hashSync(password)  //it will create the hash password for the database
    let user;
    try {
        user = new User({ name, email, password: newPassword })
        user = await user.save(); // to save a document inside the collection
    } catch (err) {
        return console.log(err)
    }
    if (!user) {
        return res.status(500).json({ message: 'Unexpected error occurred' });
    }
    return res.status(201).json({ id:user._id })
}

export const updateUser = async (req, res, next) => {
    const { id } = req.params //gtetting the id from the url
    const { name, email, password } = req.body;
    if (!name && name.trim() === '' && !email && email.trim() === '' && !password && password.trim() === '') {
        return res.status(422).json({
            message: 'Invalid inputs'
        })
    }
    const hashedPassword = bcrypt.hashSync(password)
    let user;
    try {
        user = await User.findByIdAndUpdate(id, { name, email, password: hashedPassword });
    } catch (err) {
        return console.log(err)
    }
    if(!user){
        return res.status(500).json({
            message:'User doesnt exists'
        })
    }
    res.status(200).json({message:'updated successfully'})
}
export const deleteUser=async(req,res,next)=>{
    const {id}=req.params;
    let user;
    try{
        user=await User.findByIdAndRemove(id);
    }catch(err){
        console.log(err)
    }
    if(!user){
        return res.status(500).json({message:'something went wrong'});
    }
    return res.status(200).json({message:'updated successfully'})
}
export const login=async(req,res,next)=>{
    const {  email, password } = req.body;
    if (!email && email.trim() === '' && !password && password.trim() === '') {
        return res.status(422).json({
            message: 'Invalid inputs'
        })
    }
    let exisitingUser;
    try{
        exisitingUser=await User.findOne({email})
    }catch(err){
        console.log(err)
    }
    if(!exisitingUser){
        return res.status(404).json({message:"únable to find user form this id"})
    }
    const iPasswordCorrect=bcrypt.compareSync(password,exisitingUser.password)
    if(!iPasswordCorrect){
        return res.status(400).json({message:'Password incorrect'})
    }
    return res.status(200).json({message:"login successfull",id:exisitingUser._id})
}