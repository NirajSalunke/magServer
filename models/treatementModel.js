import mongoose from "mongoose";

const TreatmentSchema = new mongoose.Schema({
    name:{
        type:String,
    },
    email:{
        type:String,
        required:true,
        unique:false
    },
    
    numofdiagnosis: {
        type: Number,
        // required: true
    },
    disease: {
        type: Number,
        // required: true
    },
    startAt: {
        type: Date,
        // required: true
    },
    endAt: {
        type: Date,
        // required: false
    },
    resources: {
        type: Object,
        default: {}
    },
    procedures: {
        type: Number,
        required: false,
    },
    // insurance: {
    //     type: String,
    //     // required: false
    // },
    facility: {
        type: Boolean,
        // required: false
    },
    numofexternalInjuries: {
        type: Number,
        // required: false,
    },
    externalInjuries: {
        type: Number,
        // required: false,
    },
    doctor: {
        type: String,
        // required: true
    },
    status: {
        type: String,
        enum: ['pending', 'admitted', 'readmission', 'discharged'],
        default: 'admitted'
    },
    assistant: {
        type: String,
        // required: false
    },
}, { timestamps: true });

const treatment = mongoose.model('Treatment', TreatmentSchema);
export default treatment;
