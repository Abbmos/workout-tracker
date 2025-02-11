const home = (req, res) => {
    res.render('index.ejs', {title: 'Home Page'})
}

module.exports = {
    home,
}