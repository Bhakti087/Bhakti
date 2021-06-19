require("dotenv").config()
const express = require('express')
const User = require("./models/user")

const path = require("path")
const logger = require("morgan")

const mongoose = require('mongoose');

//bring in method override
const methodOverride = require('method-override');

const blogRouter = require('./routes/blogs');
const Blog = require('./models/Blog');
const app = express();
const session = require("express-session")



app.use(session({
  secret:process.env.SECRET,
  resave:true,
  saveUninitialized:true
}))

//connect to mongoose
mongoose.connect(process.env.MONGO_URL,{useNewUrlParser: true,useCreateIndex: true, 
  useUnifiedTopology: true,
  }).then(() => console.log("DB connected "))
    .catch(err => console.log(err))

    app.use(methodOverride('_method'))


//set template engine
app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: false }));
app.use(methodOverride('_method'));
//route for the index
app.get('/admin', async (request, response) => {
  let blogs = await Blog.find().sort({ timeCreated: 'desc' });

  response.render('index', { blogs: blogs });
});

app.use(express.static('public'));
app.use('/blogs', blogRouter);



app.use("/css",
express.static(path.join(__dirname,"node_modules/mdb-ui-kit/css")));
app.use("/js",
express.static(path.join(__dirname,"node_modules/mdb-ui-kit/js")));





app.use(session({
  secret:process.env.SECRET,
  resave:true,
  saveUninitialized:true
}))























//SIGNUP GET
app.get("/signup", (req, res) => {
  res.render("signup.ejs")
})

//SIGNUP POST
app.post("/signup", async (req, res) => {
  console.log(req.body)
  try {
    const user = new User({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
      city: req.body.city ,
      state: req.body.state
     
    })
    await user.save();
    res.redirect("/login")
  } catch {
    res.redirect("/")

  }

})

//LOGIN GET
app.get("/login", (req, res) => {
  res.render("login.ejs")
})

//LOGIN POST
app.post("/signin", async (req, res) => {
    console.log(req.body)
 await User.findOne({email:req.body.email}).then(data =>{
   if(req.body.password == data.password){
     req.session.user =data
     res.redirect("/admin")
   }
 }).catch(e=>{
   console.log(e)
   res.send("error")
 })

})
















































app.get("/",(req , res) =>{
  res.render("home.ejs")

}
)
app.get("/checkout",(req , res) =>{
  res.render("checkout.ejs")

}
)
app.get("/cart",(req , res) =>{
  res.render("cart.ejs")

}
)
app.get("/buynow",(req , res) =>{
  res.render("buynow.ejs")

}
)
app.get("/buynow2",(req , res) =>{
  res.render("buynow2.ejs")

}
)
app.get("/buynow3",(req , res) =>{
  res.render("buynow3.ejs")

}
)
app.get("/buynow6",(req , res) =>{
  res.render("buynow6.ejs")

}
)
app.get("/buynow4",(req , res) =>{
  res.render("buynow4.ejs")

}
)
app.get("/buynow5",(req , res) =>{
  res.render("buynow5.ejs")

}
)
// app.get("/",(req , res) =>{













  app.post("/logout" , (req, res)=>{
  
    req.session.destroy()
    res.redirect("/")
 })
 //middlewares
 function checkAuthentication (req, res, next ) 
 {
   if (req.session.user){
     return next ();
     
   }
 
     else {
       res.redirect("/")
     }
 }
 
 app.use( function ( req, res ){
   res.send("Page not found");
 })
 
 
let port=process.env.PORT || 8000;

app.listen(port, () => {
  console.log("listening to port 8000")
})
