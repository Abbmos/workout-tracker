const mongoose = require('mongoose')
const workoutSchema = new mongoose.Schema({
    Title: {
        type: String,


    },
    type: {
        type: String,
        enum: ['Strength', 'Cardio', 'Flexibility', 'Sports'],
        required: true,
    },
    duration: {
        type: Number,
        min: 0,


    },
    rating: {
        type: Number,
        min: 0,
        max: 5,

    },
    notes: {
        type: String

    },
    Date: {
        type: Date,
        required: true,
        default: Date.now,

    }


}, {timestamps:true})
const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true
    },
    workouts: [workoutSchema]
}, { timestamps: true })

const User = mongoose.model('User', userSchema)

module.exports = User