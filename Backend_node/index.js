const express = require('express');
const app = express();
const jwt = require('jsonwebtoken')
const cors = require('cors')

app.use(cors())
app.use(express.json());
const secretKey = "S3ctr3tKeY"

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

let ADMINS = [];
let USERS = [];
let COURSES = [];

// req and res are objects 

let courseId = 0

// Admin routes
app.post('/admin/signup', (req, res) => {
  let admin = req.body
  let existingAdmin = ADMINS.find(element => element.username === admin.username)
  if(existingAdmin){
    res.status(401).json({message:'admin already exists'})
  }
  else{
    ADMINS.push(admin)
    const token = generateJwt(admin)
    res.status(200).json({message:'admin successfully created', "token": token})
  }
});

app.post('/admin/login', (req, res) => {
  let username = req.headers.username
  let password = req.headers.password 
  let found = ADMINS.find(a => a.username == username && a.password == password)
  if(found){
    let token = generateJwt(found)
    res.status(200).json({message:'loged in succesfully',"token" : token})
  }
  else{
    res.status(401).json({message:'admin auth failed'})
  }
})



app.post('/admin/courses',jwtAuth, (req, res) => {
  let course = req.body
  course.id = courseId++
  if (course.title && course.description && course.price  && course.imageLink){
    COURSES.push(course)
    res.status(200).json({message:`course created successfully`,courseId:course.id})
  }
  else{
    res.status(411).json({message:'provide the proper input'})
  }
  
});

app.put('/admin/courses/:courseId',jwtAuth, (req, res) => {
  found = COURSES.find(element => element.id === parseInt(req.params.courseId))
  if(found){
    Object.assign(found,req.body)
    res.status(200).json({message:'course update successfully'})
  }
  else{
    res.status(401).json({message:'course not found'})
  }
});

app.get('/admin/courses',jwtAuth, (req, res) => {
  res.json({ courses: COURSES });
});

// User routes
app.post('/users/signup', (req, res) => {
    let user = { "username" : req.body.username,
     "password" :  req.body.password,
     'purchasedCourses' : []
    }
    let existingUser = USERS.find(element => element.username === element.username)
    if(existingUser){
      res.status(401).json({message:'user already exists'})
    }
    else{
      USERS.push(user)
      let token = generateJwt(user)
      res.status(200).json({message:'user successfully created','token': token})
    }
  
});

app.post('/users/login', (req, res) => {
  const {username,password} = req.headers
  let user = USERS.find(element => element.username === username && element.password === password )
  if(user){
    let token = generateJwt(user)
    res.status(200).json({message:'loged in succesfully',"token" : token})
  }
  else{
    res.status(401).json({message:'user auth failed'})
  }
});

app.get('/users/courses', jwtAuth,(req, res) => {
found = COURSES.filter(element => element.published)
res.status(200).json({courses : found})
console.log(req.user)
  
});

app.post('/users/courses/:courseId',jwtAuth, (req, res) => {
  let courseId = parseInt(req.params.courseId)
  let course = COURSES.find(element => element.id === courseId && element.published)
  if(course){
    let user = USERS.find(user => user.username === req.user.username)
    if(user){
      user.purchasedCourses.push(courseId)
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

app.get('/users/purchasedCourses',jwtAuth, (req, res) => {
  let user = USERS.find(user => user.username === req.user.username)
  if(user){
    let purchasedCourses = COURSES.filter(course => user.purchasedCourses.includes(course.id))
    res.status(200).json(purchasedCourses)
  }
  
    
  // logic to view purchased courses
});

app.listen(3000, () => {
  console.log('Server is listening on port 3000');
});
