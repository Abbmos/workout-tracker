

const User = require('../models/user')

const defaultTitle = (type, date) => {
    const formattedDate = new Date(date).toISOString().split('T')[0];
    return `${type} on ${formattedDate}`;
};
const formatDuration = (minutes) => {
    if (minutes < 60) return `${minutes} min`;

    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;

    if (remainingMinutes === 0) return `${hours} hour${hours > 1 ? 's' : ''}`;
    return `${hours} hour${hours > 1 ? 's' : ''} ${remainingMinutes} min`;
};

const index = async (req, res) => {
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
const newWorkout = (req, res) => {
    res.render('workouts/new.ejs', {
        title: "Add New Workout"

    })

}
const createWorkout = async (req, res) => {
    try {
        const currentUser = await User.findById(req.params.userId);
        if (req.body.Title === '') {
            req.body.Title = defaultTitle(req.body.type, req.body.Date);

        }

        currentUser.workouts.push(req.body)
        await currentUser.save()
        console.log(req.body);
        res.redirect(`/users/${currentUser._id}/workouts`)



    } catch (error) {
        console.log(error);
        res.redirect('/')
    }



}
const show = async (req, res) => {

  
    try {
        const currentUser = await User.findById(req.params.userId);
        const currentWorkout = currentUser.workouts.id(req.params.workoutId)

        res.render('workouts/show.ejs', {
            title: `${currentWorkout.Title}`,
            workout: currentWorkout,
            formattedDuration: formatDuration(currentWorkout.duration)
        })



    } catch (error) {
        console.log(error);
        res.redirect('/')
    }



}

const edit = async (req, res) => {

    try {
        const currentUser = await User.findById(req.params.userId);
        const currentWorkout = currentUser.workouts.id(req.params.workoutId);
        res.render('workouts/edit.ejs', {

            title: `${currentWorkout.Title}`,
            workout: currentWorkout,
        })
    } catch (err) {

        console.log(err);
        res.redirect('/')
    }

}

const update = async (req, res) => {
    try {

        const currentUser = await User.findById(req.params.userId)
        const currentWorkout = currentUser.workouts.id(req.params.workoutId)
        currentWorkout.set(req.body)
        await currentUser.save()
        res.redirect(`/users/${currentUser._id}/workouts/${req.params.workoutId}`);
    } catch (error) {
        console.log(error);
        res.redirect('/')
    }




}

const deleteWorkout = async (req, res) => {

    try {
        const currentUser = await User.findById(req.params.userId);
        const currentWorkout = currentUser.workouts.id(req.params.workoutId);
        currentWorkout.deleteOne();
        await currentUser.save();
        res.redirect(`/users/${currentUser._id}/workouts`)
    } catch (err) {

        console.log(err);
        res.redirect('/')
    }



}

module.exports = {

    index,
    newWorkout,
    createWorkout,
    show,
    edit,
    update,
    deleteWorkout
}