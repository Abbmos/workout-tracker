

const User = require('../models/user')

const index = async (req,res)=> {
try {
    const currentUser = await User.findById(req.params.userId)
    res.render("workouts/index.ejs", {
        title: "My Workouts",
        workouts: currentUser.workouts,
    })
} catch (error) {
    console.log(error);
    res.redirect('/')
}

}
const newWorkout = (req,res)=> {
    res.render('workouts/new.ejs', {
title:"Add New Workout"

    })
    
    }
const createWorkout = async (req,res)=> {
try {
    const currentUser = await User.findById(req.params.userId);
        currentUser.workouts.push(req.body)
        await currentUser.save()
        console.log(req.body);
        res.redirect(`/users/${currentUser._id}/workouts`)



} catch (error) {
 console.log(error);
 res.redirect('/')   
}



}
const show = async (req,res)=> {
    try {
        const currentUser = await User.findById(req.params.userId);
const currentWorkout=  currentUser.workouts.id(req.parmas.workoutId)

            res.render('show.ejs',{
title:`${currentWorkout}`,
workout:currentWorkout,
            })
    
    
    
    } catch (error) {
     console.log(error);
     res.redirect('/')   
    }
    
    
    
    }

module.exports ={

index,
newWorkout,
createWorkout,
show
}