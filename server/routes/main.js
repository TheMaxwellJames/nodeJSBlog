const express = require('express');
const router = express.Router();
const Post = require('../models/Post');

//Routes

//Home Routes

router.get('', async (req, res) => {


    try {

        const locals = {
            title: "NodeJs Blog",
            description: "Blog Created With NodeJs, Express And MongoDb"
        }

        let perPage = 5;
        let page = req.query.page || 1;


        const data = await Post.aggregate([ { $sort: { createdAt: -1 } } ])
        .skip(perPage * page - perPage)
        .limit(perPage)
        .exec();


        const count = await Post.count();
        const nextPage = parseInt(page) + 1;
        const hasNextPage = nextPage <= Math.ceil(count /perPage);



       
        res.render("index", { 
            locals,
            data,
            current: page,
            nextPage: hasNextPage ? nextPage : null    
            });
    } catch (error) {
        console.log(error);
    }


    
});

// router.get('', async (req, res) => {

//     const locals = {
//         title: "NodeJs Blog",
//         description: "Blog Created With NodeJs, Express And MongoDb"
//     }

//     try {
//         const data = await Post.find();
//         res.render("index", { locals, data });
//     } catch (error) {
//         console.log(error);
//     }
// });



// Post: id


router.get('/post/:id', async (req, res) => {


    try {

   

        let slug = req.params.id;


        const data = await Post.findById({_id: slug});

        const locals = {
            title: data.title,
            description: "Blog Created With NodeJs, Express And MongoDb"
        }



        res.render("post", { locals, data });
    } catch (error) {
        console.log(error);
    }
});


// Search Routes

router.post('/search', async (req, res) => {


    try {

        
    const locals = {
        title: "Search",  
        description: "Blog Created With NodeJs, Express And MongoDb"
    }


    let searchTerm = req.body.searchTerm;
    const searchNoSpecialChar = searchTerm.replace(/[^a-zA-Z0-9 ]/g, "")

 
        const data = await Post.find({
            $or: [
                { title: { $regex: new RegExp(searchNoSpecialChar, 'i') } },
                { body: { $regex: new RegExp(searchNoSpecialChar, 'i') } }
            ]
        });


        res.render("search", {
            data,
            locals
        });
    } catch (error) {
        console.log(error);
    }
});

















//About Routes


router.get('/about', (req, res) => {
    res.render("about");
});






// function insertPostData () {
//     Post.insertMany([
//       {
//         title: "Building APIs with Node.js",
//         body: "Learn how to use Node.js to build RESTful APIs using frameworks like Express.js"
//       },
//       {
//         title: "Deployment of Node.js applications",
//         body: "Understand the different ways to deploy your Node.js applications, including on-premises, cloud, and container environments..."
//       },
//       {
//         title: "Authentication and Authorization in Node.js",
//         body: "Learn how to add authentication and authorization to your Node.js web applications using Passport.js or other authentication libraries."
//       },
//       {
//         title: "Understand how to work with MongoDB and Mongoose",
//         body: "Understand how to work with MongoDB and Mongoose, an Object Data Modeling (ODM) library, in Node.js applications."
//       },
//       {
//         title: "build real-time, event-driven applications in Node.js",
//        body: "Socket.io: Learn how to use Socket.io to build real-time, event-driven applications in Node.js."
//       },
    
    
     
     
//       {
//        title: "Learn Morgan - HTTP Request logger for NodeJs",
//         body: "Learn Morgan."
//      },
//     ])
//   }
 
//   insertPostData();









module.exports = router;