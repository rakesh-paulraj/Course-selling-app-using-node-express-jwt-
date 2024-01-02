const { Router } = require("express");
const router = Router();
const userMiddleware = require("../middleware/user");
const {JWT_SECRET} = require("../config");
const jwt=require("jsonwebtoken");
const { User } = require("../db");

// User Routes
router.post('/signup', (req, res) => {

    const username= req.body.username;
    const password=req.body.password;

    User.create({
        username,
        password
    })
    res.json({
        msg:"user created"
    })

    // Implement user signup logic
});

router.post('/signin',async (req, res) => {  
    const username=req.body.username;
    const password=req.body.password;
  
    
    const user = await User.find({
        username ,
        password
    })

    if(user){
        const token= jwt.sign({
            username
        },JWT_SECRET);
        res.json({
            token
        })
}else {
    res.status(411).json({
        msg:"wrong password"
    })
}    
});

router.get('/courses', async (req, res) => {

    const response= await Course.find({});

    res.json({
        courses:response
    }) 
    // Implement listing all courses logic
});

router.post('/courses/:courseId', userMiddleware, async(req, res) => {
 const username =decodedvalue.username ;

 const user=await User.findOne({username});

 const id=req.params.courseId;
        const course=await Course.findOne({"_id":id});

        user.coursesPurchased.push(course._id);
        await User.updateOne({"_id":user._id},user);

        res.status(200).json({ message: 'Course purchased successfully' })

});
router.get('/purchasedCourses', userMiddleware, async (req, res) => {
    const username =decodedvalue.username ;
        const user=await User.findOne({username});

        const purchasedCoursesPromises=user.coursesPurchased.map(async (id)=>{
           const course=await Course.findOne({"_id":id});
           return course;
        })
        const purchasedCourses=await Promise.all(purchasedCoursesPromises);
        res.status(200).json(purchasedCourses);
    // Implement fetching purchased courses logic
});

module.exports = router