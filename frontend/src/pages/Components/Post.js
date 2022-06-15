/**
 * This component is for rendering posts
 ******delete post
 *****edit post: click the edit button to enable the textarea then click the edit button again to save
 */

import React from "react";
import dp from "../../images/blankDp.webp"

export default class Post extends React.Component{
    constructor(props){
        super(props)

        this.state = {
            editIsClicked: false,
            content: this.props.post.content
        }

        this.deletePost = this.deletePost.bind(this)
        this.editPost = this.editPost.bind(this)
        this.handleContentChange = this.handleContentChange.bind(this)
    }

    deletePost(postId){

        fetch(
            "http://localhost:3001/delPost",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({id: postId})

            }
        )
        .then(response => response.json())
            .then(body => {
                if (body.success){ //post is successfully added to database
                    alert("Success deleted post!");
                }
                else{
                    alert("Failed to deleted post!")
                }

                window.location.reload(); //reload page
            })

    }

    
    editPost(postId){
        if(this.state.editIsClicked){ //if the edit button is clicked once
            this.setState({editIsClicked: false})
            document.getElementById("p-content").disabled = true //disable the textarea again

            const post = {
                id: postId,
                newContent: this.state.content
            }

            fetch(
                "http://localhost:3001/editPost",
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
                    console.log(postId)
                    if (body.success){ //post is successfully added to database
                        alert("Success updated post!");
                    }
                    else{
                        alert("Failed to update post!")
                    }
    
                    window.location.reload(); //reload page
                })

        }
        else{ //else enabled text area to let user edit post
            this.setState({editIsClicked: true})
            document.getElementById("p-content").disabled = false  //enable edit
        }
        
    }

    handleContentChange(e){
        this.setState({content: e.target.value});
        let textarea = document.querySelector("#p-content");
        textarea.addEventListener('input', autoResize, false);
        //for auto resizing text area
        function autoResize() {
            this.style.height = 'auto';
            this.style.height = this.scrollHeight + 'px';
        }
    }

    

    render(){
        const post = this.props.post
        var isDisable = true
        if(post.userId === this.props.userId){  //if the post is posted by user then show edit and delete buttons
            isDisable = false
        }

        return(
            <div className="post-container" >
                <div className="user-profile">
                    <img src = {dp}/>
                    <div>
                        <p>{post.username}</p>
                        <small>{post.timestamp}</small>
                    </div>     
                </div>

                <textarea id ="p-content" value={this.state.content} onChange={this.handleContentChange} disabled rows="5"></textarea>

                <div id="option">
                    <button className ='updateButton' onClick={()=>{ this.editPost(post._id)} } disabled = {isDisable}> Edit </button>
                    <button className ='updateButton' onClick={()=>{this.deletePost(post._id)} }disabled = {isDisable}>Delete</button>
            </div>
                
            </div>
        );
    }
}