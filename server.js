const express =  require('express')
const app =  express()
const passport = require('passport')
const session =  require('express-session')
const MongoStore =  require('connect-mongo')
const flash = require('express-flash')
const logger =  require('morgan')
const connectDB = require('./config/database')
const mainRoutes = require('./routers/main')
const postRoute = require('./routers/posts')
const methodOverride = require('method-override')
const CommentRoute = require('./routers/comment')



// configuring dotenv
require('dotenv').config({ path : './config/.env'})

// passport config
require('./config/passport')(passport)

// connection to the database
connectDB()

// setting templating language
app.set('view engine', 'ejs')

// setting body parser
app.use(express.urlencoded({extended: true}))
app.use(express.json())
app.use(logger('dev'))

// using forms to delete anad update 
app.use(methodOverride('_method'))

app.use(session({
    secret : 'keyboard cat',
    resave : false,
    saveUninitialized : false,
    store : MongoStore.create({
        mongoUrl: process.env.DB_STRING,
    })
}))



app.use(passport.initialize())
app.use(passport.session())

app.use(flash())


app.use('/', mainRoutes)
app.use('/post', postRoute)
app.use('/comment', CommentRoute)




app.listen(process.env.PORT, () => {
    console.log(`connected to ${process.env.PORT} local servers`)
})
