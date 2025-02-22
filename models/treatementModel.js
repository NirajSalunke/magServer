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
    diagnosis: {
        type: Number,
        // required: true
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
        default: 0
    },
    // insurance: {
    //     type: String,
    //     // required: false
    // },
    facility: {
        type: String,
        // required: false
    },
    numofexternalInjuries: {
        type: Number,
        // required: false,
        default: 0
    },
    externalInjuries: {
        type: Number,
        // required: false,
        default: 0
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
