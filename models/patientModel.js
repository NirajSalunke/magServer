import mongoose from "mongoose";

const patientSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,

    },
    age:{
        type:Number,
        required:true,
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    gender:{
        type:String,
        required:true,

    },
    weight:{
        type:Number,
        required:true,

    },
  
    income:{
        type:Number
    },
    home:{        //filter fior ml
        type:Boolean,
        default:false,
    },
    insurance: {
        type: String,

        enum:['public','private','self-pay'],
        default:'public'
        // required: false
    },




},{ timestamps: true })
const patient = mongoose.model("Patient",patientSchema);
export default patient