module.exports = {
    getindex :  async (req, res) => {
        try {
            res.render('index.ejs', {title : 'Home Page'})
        } catch (error) {
            console.erro('error')
        }
    }
}