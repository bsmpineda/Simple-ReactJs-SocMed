const mongoose = require('mongoose');
const jwt = require("jsonwebtoken");


//get user model registered in Mongoose
const User = mongoose.model("User")

exports.signUp = (req, res) => {
    const newUser = new User({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        password: req.body.password
    });

    console.log("New user: ");
    console.log(newUser);

    newUser.save((err) => {
        if(err){
            console.log(err)
            return res.send({success: false});
            
        }
        else{
            return res.send({success: true});
        }
    })
}

exports.login = (req, res) => {
    const email = req.body.email.trim();
    const password = req.body.password;


    User.findOne({ email }, (err, user) =>{
        //check if email exist
        if(err || !user){
            //User does not exist
            console.log("User does not exist");
            return res.send({success: false})
        }

        //check if password is correct
        user.comparePassword(password, (err, isMatch)=>{
            if(err || !isMatch){
                console.log("Wrong password");
                return res.send({success: false});
            }

            console.log("Successfully logged in");

            const tokenPayload = {
                _id: user._id
            }

            const token =  jwt.sign(tokenPayload, "THIS_IS_A_SECRET_STRING");


            return res.send({success: true, token, firstName: user.firstName, lastName: user.lastName, id: user._id, friends: user.friends});
            })
    });
}

exports.checkedIfLoggedIn = (req, res) => {
   if(!req.cookies || !req.cookies.authToken) {
        //FAIL - no cookies / no authToken cookie sent
        return res.send({ isLoggedIn: false})
   }

   return jwt.verify(
    req.cookies.authToken, 
    "THIS_IS_A_SECRET_STRING",
    (err, tokenPayload) => {
        if(err){
            //FAIL - error validating token
            return res.send({isLoggedIn: false})
        }

        const userId = tokenPayload._id;

        //check if user exist
        return User.findById(userId, (userErr, user) => {
            if(userErr || !user){
                //FAIL - failed to find user based on id inside token payload

                return res.send({isLoggedIn: false})
            }

            //SUCCESS - token and id is valid
            console.log("User is currently logged in");
            return res.send({isLoggedIn: true});
        });
    });
}