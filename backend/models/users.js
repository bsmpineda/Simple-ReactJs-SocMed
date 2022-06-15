const mongoose = require("mongoose");
const bcrypt = require("bcrypt"); //used for password encryption

const UserSchema = new mongoose.Schema({
    id: {type: String},
    firstName: {type: String, required: true},
    lastName: {type: String, required: true},
    email: {type: String, required: true},
    password: {type: String, required: true},
});

UserSchema.pre("save", function(next){
    const user = this;

    if(!user.isModified("password")){
        return next();
    }

    return bcrypt.genSalt((saltError, salt) => {
        if(saltError) {
            return next(saltError);
        }

        return bcrypt.hash(user.password, salt, (hashError, hash) => {
            if(hashError){
                return next(hashError);
            }

            user.password = hash;
            return next();
        });
    });
});

//coompare passwords
UserSchema.methods.comparePassword = function(password,callback){
    bcrypt.compare(password, this.password, callback);
}

mongoose.model("User", UserSchema); //export this  model