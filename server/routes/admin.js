const express = require('express');
const router = express.Router();
const Post = require('../models/Post');
const User = require('../models/User');



const adminLayout = '../views/layouts/admin';


//  Admin-Login Route

 router.get('/admin', async (req, res) => {

    try {

        const locals = {
            title: "Admin",
            description: "Blog Created With NodeJs, Express And MongoDb"
        }

      
        res.render("admin/index", { locals, layout: adminLayout});
    } catch (error) {
        console.log(error);
    }
});


// Admin Check Login

router.post('/admin', async (req, res) => {

    try {

        const { username, password } = req.body;
        console.log(req.body);



      
        res.redirect('/admin');
        
    } catch (error) {
        console.log(error);
    }
});


















module.exports = router;