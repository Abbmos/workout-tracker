
const User = require('../models/user')

const formatDuration = (minutes) => {
    if (minutes < 60) return `${minutes} min`;

    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;

    if (remainingMinutes === 0) return `${hours} hour${hours > 1 ? 's' : ''}`;
    return `${hours} hour${hours > 1 ? 's' : ''} ${remainingMinutes} min`;
};

const index = async (req,res)=> {

try {
    const users= await User.find();
    res.render('community/index.ejs', {

        title:'Our Community',
        allUsers:users
    })


} catch (error) {
    console.log(error);
}





} 

const show = async (req, res) => {

  
    try {
        const currentUser = await User.findById(req.params.userId);
        const userWorkouts = currentUser.workouts;

        res.render('community/show.ejs', {
            title: `${currentUser.username}'s Workouts`,
            workouts: userWorkouts,
            currentUser,
        })



    } catch (error) {
        console.log(error);
        res.redirect('/')
    }



}
const details = async (req,res) =>{


  
    try {
        const currentUser = await User.findById(req.params.userId);
        const currentWorkout = currentUser.workouts.id(req.params.workoutId)

        res.render('community/details.ejs', {
            title: `${currentWorkout.Title}`,
            workout: currentWorkout,
            formattedDuration: formatDuration(currentWorkout.duration),
                    currentUser,
        })



    } catch (error) {
        console.log(error);
        res.redirect('/')
    }


}
module.exports = {
index,
show,
details
}