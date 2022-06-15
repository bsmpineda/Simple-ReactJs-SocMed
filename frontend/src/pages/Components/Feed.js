import React from "react";
import dp from "../../images/blankDp.webp";
import "./Feed.css"
import Post from "./Post";

class Feed extends React.Component{
    constructor(props){
        super(props)

        this.state = {
            id: this.props.userId,
            posts: [],
            friends: []
            
        }

        this.addPost = this.addPost.bind(this)
    }

    //for adding new post
    addPost(e){
        console.log(this.props.username)
        const post = {
            userId: this.props.userId,
            username: this.props.username,
            content: document.getElementById("content").value,
            timestamp: new Date()
        }

        //request to server
        fetch(
            "http://localhost:3001/addPost",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(post)

            }
        )
        .then(response => response.json())
            .then(body => {
                if (body.success){ //post is successfully added to database
                    alert("Success saved post!");
                }
                else{
                    alert("Failed to save post!")
                }
            })
    }

    

    componentDidMount() {
		fetch('http://localhost:3001/find-all-user-post') //extract the data
		.then(response => response.json())
		.then(body => {
			this.setState({posts: body})
		})
        
        //fetch friend documents
        fetch('http://localhost:3001/get-friend?id='+this.props.userId) //extract the data
		.then(response => response.json())
		.then(body => {
			this.setState({friends: body}) 
            /**
             * body ={
            *       friend: [{_ids}],
                    sentReq: [{IDs}],
                    receivedReq: [{IDs}]
             * }
             */
		})
	}
    

    render(){
        var listID = [this.props.userId]  //for storing user's friend


        if(this.state.friends.length !== 0){ //check if friendship collection is not underfined
            this.state.friends.friend.map((friend) => {
                //get the id of the user and its friends
                this.props.users.map((user, i)=>{
                    if(user._id === friend ){
                        listID.push(user._id)
                    }
                })
            })  
        }
        
        return(
            <div className="feed" onSubmit={this.addPost}>
                <div className="write-post">
                    <img src={dp} className = "userDp"/>
                    <form id="add-post-form">
                        <textarea rows='1' placeholder="What's on your mind?" id = "content" required></textarea>
                        <input type= "submit" id = 'submitNewPost' />
                    </form>    
                </div>
                {
                    this.state.posts.reverse().map((post, i) => { 
                        var printPost = false;
                        
                        listID.map((user) =>{
                            
                            if(user === post.userId){ //if the post is posted by user or by his/her friend
                                printPost = true 
                            }
                            
                        })

                        if(printPost){
                            
                            return <Post key={i} userId = {this.props.userId} post = {post}/>
                        }
                    })
                }
            </div>
        );
    }
}

export default Feed;