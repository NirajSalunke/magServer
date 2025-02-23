import User from '../models/userModel.js';

export const singup = async (req, res) => {
    const{name, email,id} = req.body;
    try{
        const user = await User.create({name, email,clerkid:id});
        return res.status(201).json({
            success: true,
            data: user
        });
    }catch(error){
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Internal server error"
        });
    }

}