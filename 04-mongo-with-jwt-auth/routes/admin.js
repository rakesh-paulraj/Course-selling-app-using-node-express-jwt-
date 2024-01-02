const { Router } = require("express");
const adminMiddleware = require("../middleware/admin");
const { Admin, User, Course } = require("../db");
const {JWT_SECRET} = require("../config");
const router = Router();
const jwt = require("jsonwebtoken");

// Admin Routes
router.post('/signup', async (req, res) => {
    const username=req.body.username;
    const password=req.body.password;

    await Admin.create({
        username,
        password
    })
    res.json({
        message:'admin created successfully '
    })

    // Implement admin signup logic
   
});

router.post('/signin', async (req, res) => {

    const username=req.body.username;
    const password=req.body.password;

    const admin = await Admin.find({
        username ,
        password
    })

    if(admin){
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
}   // Implement admin signup logic
  
}); 


router.post('/courses', adminMiddleware, async (req, res) => {

    const title=req.body.title;
    const description=req.body.description;
    const imagelink=req.body.imagelink;
    const price=req.body.price;
    
    const newcourse=await Course.create({
        title,
        description,
        imagelink,
        price
    })
    
    res.json({
        msg:"course created successfully",courseid:newcourse._id
    })
});
    // Implement course creation logic
  


router.get('/courses', adminMiddleware, async (req, res) => {

    const response= await Course.find({});

    res.json({
        courses:response
    })
 
});


module.exports = router;