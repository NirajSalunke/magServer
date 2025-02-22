import mongoose from "mongoose";

const TreatmentSchema = new mongoose.Schema({
    diagnosis: {
        type: Number,
        required: true
    },
    disease: {
        type: String,
        required: true
    },
    startAt: {
        type: Date,
        required: true
    },
    endAt: {
        type: Date,
        required: false
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
    insurance: {
        type: String,
        required: false
    },
    facility: {
        type: String,
        required: false
    },
    numOfExternalInjuries: {
        type: Number,
        required: false,
        default: 0
    },
    doctor: {
        type: String,
        required: true
    },
    status: {
        type: String,
        enum: ['pending', 'admitted', 'readmission', 'cancelled'],
        default: 'pending'
    }
}, { timestamps: true });

module.exports = mongoose.model('Treatment', TreatmentSchema);
