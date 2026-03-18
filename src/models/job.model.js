import mongoose from 'mongoose';

const jobSchema = new mongoose.Schema({
    title: {
        type:String,
        required: [true,"Job title is required"],
        trim:true
    },
    company: {
        type:String,
        required: [true,"Company name is required"],
        trim:true
     },
    location: {
        type:String,
        required: [true,"Job location is required"],    
    },
    salary:{
        type:Number
    },
    description: {
        type:String,
        required: [true,"Job description is required"],
    },
    skills:{
        type:[String],
        required: [true,"Required skills are required"],
    },
    jobtype:{
        type:String,
        enum:["Full-time","Part-time","Contract"],
        required: [true,"Job type is required"],
    },
    postedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
}, { timestamps: true });

const Job = mongoose.model('Job', jobSchema);
export default Job;