const authController = require("./controllers/auth-controller");
const postController = require("./controllers/post-controller");
const userController = require("./controllers/user-controller");
const friendController = require("./controllers/friend-controller");

module.exports = (app) =>{
    app.post("/signup", authController.signUp);
    app.post("/login", authController.login);
    app.post("/checkifloggedin", authController.checkedIfLoggedIn);

    app.get("/find-all-user-post", postController.findPostsByUserId);
    app.post("/addPost", postController.addPost)
    app.post("/editPost", postController.updateById)
    app.post("/delPost", postController.deleteById)

    app.get("/find-user", userController.findUserById);
    app.get("/find-user-by-name",userController.findByName)
    app.get("/find-all-users", userController.findAllUsers)


    app.get("/get-friend", friendController.getFriends)
    app.post("/accept-friend", friendController.acceptFriend)
    app.post("/requestFriend", friendController.requestFriend)
    app.post("/delete-friend-request", friendController.deleteRequest)
}