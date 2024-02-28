const express = require('express');
const app = express();
const jwt = require('jsonwebtoken')
const cors = require('cors')
const mongoose = require('mongoose');

app.use(cors())
app.use(express.json());
const secretKey = "S3ctr3tKeY"

//defining mongoose schemas 

const userSchema = new mongoose.Schema({
  username : String,
  password : String,
  purchasedCourses : [{type: mongoose.Schema.Types.ObjectId , ref: 'Course'}]
})

const adminSchema = new mongoose.Schema({
  username : String ,
  password : String 
})

const courseSchema = new mongoose.Schema({
  title : String ,
  description : String ,
  price : Number ,
  imageLink : String,
  published : Boolean
})

// defining mongoose models 

const User = mongoose.model('User',userSchema)
const Admin = mongoose.model('Admin', adminSchema)
const Course = mongoose.model('Course', courseSchema)


function generateJwt(user){
  let payload = {username : user.username}
  let token = jwt.sign(payload , secretKey, {expiresIn : '1h'})
  return token 
}

jwtAuth = (req,res,next)=>{
  let authHeader = req.headers.authorization
  if(authHeader){
    let token = authHeader.split(' ')[1]
    jwt.verify(token,secretKey,(err,user)=>{
      if(err){
        return res.status(403)
      }
      req.user = user
      next()
    })
  }
  else{
    res.status(401)
  }
}

// let ADMINS = [];
// let USERS = [];
// let COURSES = [];

mongoose.connect('mongodb+srv://Aayushman:u3V4.bwjcA9wmDs@cluster0.gzkzydn.mongodb.net/courses')

// req and res are objects 

let courseId = 0

// Admin routes using .then() method 
app.post('/admin/signup', (req, res) => {
  let {username,password} = req.body
  Admin.findOne({username}).then((existingAdmin)=>{
    if(existingAdmin){
      res.status(403).json({message:'admin already exists'})
    }
    else{
      const obj = {username:username ,password: password}
      const newAdmin = new Admin(obj)
      newAdmin.save()
      const token = generateJwt(obj)
      res.status(200).json({message:'admin successfully created', "token": token})
    }

  })
  
});

app.post('/admin/login', async (req, res) => {
  let {username,password} = req.body
  let admin = await Admin.findOne({username,password})

    if(admin){
      let token = generateJwt(admin)
      res.status(200).json({message:'loged in succesfully',"token" : token})
    }
    else{
      res.status(401).json({message:'admin auth failed'})
    }

  })




app.post('/admin/courses',jwtAuth, async (req, res) => {
  const course = new Course(req.body)
  await course.save()
  res.status(200).json({message:`course created successfully`,courseId:course.id})
  });

app.put('/admin/courses/:courseId',jwtAuth, async (req, res) => {
  const course = await Course.findByIdAndUpdate(req.params.courseId,req.body,{new:true})
  if(course){
    res.status(200).json({message:'course update successfully'})
  }
  else{
    res.status(401).json({message:'course not found'})
  }
});

app.get('/admin/courses',jwtAuth, async (req, res) => {
  const courses = Course.find({}) //finding empty object meant finding all courses without any condition 
  res.json({ courses });
});

// User routes
app.post('/users/signup', async (req, res) => {
    let {username,password} = req.body

    const user = await User.findOne({username})
    if(user){
      res.status(401).json({message:'user already exists'})
    }
    else{
      let obj = {username,password}
      let NewUser =  new User(obj)
      await NewUser.save()
      let token = generateJwt(obj)
      res.status(200).json({message:'user successfully created','token': token})
    }
  
});

app.post('/users/login', async (req, res) => {
  const {username,password} = req.headers
  let user = await User.findOne({username,password})
  if(user){
    let token = generateJwt(user)
    res.status(200).json({message:'loged in succesfully',"token" : token})
  }
  else{
    res.status(401).json({message:'user auth failed'})
  }
});

app.get('/users/courses', jwtAuth, async (req, res) => {
const courses = await Course.find({published: true})
res.status(200).json({courses})
console.log(req.user)
  
});

app.post('/users/courses/:courseId',jwtAuth, async(req, res) => {
  let course = await Course.findById(req.params.courseId)
  if(course){
    let user = await User.findOne({username : req.user.username})
    if(user){
      user.purchasedCourses.push(course)
      await user.save()
      res.status(200).json({message:'Course purchased successfully'})
    }
    else{
      res.status(401).json({message:'user not found'})
  }
}
  else{
    res.status(401).json({message:'Course not found or not available'})
  }
  // logic to purchase a course
});

app.get('/users/purchasedCourses',jwtAuth, async (req, res) => {
  const user = await User.findOne({username : req.user.username}).populate('purchasedCourses')
  if(user){
    res.status(200).json({purchasedCourses: user.purchasedCourses || []})
  }
  else{
    res.status(403).json({message: 'User not found'})
  }
  
    
  // logic to view purchased courses
});

app.listen(3000, () => {
  console.log('Server is listening on port 3000');
});
