import treatment from "../models/treatementModel.js";

export const getReadmission = async (req,res)=>{
    try {
        const response = await treatment.find({status:"readmission"});
        if(response){
            return res.status(200).json({
                success:true,
                data:response
            })
        }
        else{
            return res.status(404).json({
                success:false,
                message:"No data found"
            })
        }
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            success:false,
            message:"Internal server error"
        })
    }
}
