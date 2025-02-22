import mongoose from "mongoose";

const patientSchema = mongoose.Schema({
    name:{
        type:String,

    },
    email:{
        type:String,
        required:true,
    },
    gender:{
        type:String

    },
    weight:{
        type:Number,
    },
    treatments:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Treatment"
    },
    income:{
        type:Number
    },
    insurance:{
        type:Number,
    },




})
const model = mongoose.model("Patient",patientSchema);
export default model