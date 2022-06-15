/**
 * This component shows the friends list and request list
 * Has functions for accepting/deleting friend request
 */

import React from "react";
import "./Rightbar.css"
import pic from "../../images/blankDp.webp"

export default class Rightbar extends React.Component{
    constructor(props){
        super(props)

        this.state = {
            friends: []
        }
        this.acceptRequest = this.acceptRequest.bind(this)
        this.deleteRequest = this.deleteRequest.bind(this)
    }

    //this function is called when the 'confirmBtn' is clicked
    acceptRequest(friendId) {
        const friend ={
            senderId: friendId,
            receiverId: this.props._id
        }

        fetch(
            "http://localhost:3001/accept-friend",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(friend)

            }
        )
        .then(response => response.json())
            .then(body => {
                if (body.success){ //post is successfully added to database
                    alert("Success adding new friend!");
                }
                else{
                    alert("Failed to add friend!")
                }

                window.location.reload(); //reload page
            })
    }

    deleteRequest(friendId){
        const friend ={
            senderId: friendId,
            receiverId: this.props._id
        }
        fetch(
            "http://localhost:3001/delete-friend-request",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(friend)

            }
        )
        .then(response => response.json())
            .then(body => {
                if (body.success){ //post is successfully added to database
                    alert("Success deleting friend request!");
                }
                else{
                    alert("Failed to delete friend request!")
                }

                window.location.reload(); //reload page
            })
    }

    componentDidMount(){
        fetch('http://localhost:3001/get-friend?id='+ this.props._id) //extract the data
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
        var friendList = []  //for storing user's friend
        var sentRequestList = [] //for storing user's sent request friend
        var receivedRequestList = [] //for storing user's recieved  request friend
        var notFriend = []

        this.props.users.map((user)=>{
            notFriend.push(user._id)
        })


        if(this.state.friends.length !== 0){
            this.state.friends.friend.map((friend) => {
                this.props.users.map((user, i)=>{

                    if(user._id === this.props._id){
                        notFriend = notFriend.filter((item) =>{
                            return item!==friend
                        })
                    }

                    if(user._id === friend){
                        friendList.push(user)
                        console.log(notFriend[i])
                        notFriend = notFriend.filter((item) =>{
                            return item!==friend
                        })
                        
                    }
                })
            }) 

            this.state.friends.sentReq.map((friend) => {
                this.props.users.map((user, i)=>{
                    if(user._id === friend){
                        sentRequestList.push(user)
                        notFriend = notFriend.filter((item) =>{
                            return item!==friend
                        })
                    }
                })
            }) 

            this.state.friends.receivedReq.map((friend) => {
                this.props.users.map((user, i)=>{
                    if(user._id === friend){
                        receivedRequestList.push(user)
                        notFriend = notFriend.filter((item) =>{
                            return item!==friend
                        })
                    }
                })
            })
            
            localStorage.setItem("notFriend", JSON.stringify(notFriend)) 
        }
        

        return(
            <div className="right-sidebar">
                <div className="FriendsList">
                    <h4>Friends List</h4>
                    <ol>
                        {
                            friendList.map((friend, i) => {
                                return (
                                    <li key = {i} className = "userList">
                                        <label className = "profile"><img src={pic} />{friend.firstName} {friend.lastName}</label>
                                    </li>
                                )
                                 
                            })
                        }
                    </ol>
                        
                </div>

                <div className="RequestList">
                    <h4>Friends Request List</h4>
                    <ol>
                        {
                            receivedRequestList.map((user, i) => {
                                if(user !== undefined){
                                    return (
                                        <li key = {i} className = "userList">
                                            <label className = "profile"><img src={pic} />{user.firstName} {user.lastName}</label>
                                            <button type="button" className="confirmBtn" onClick={()=>{this.acceptRequest(user._id)}}> Confirm</button>
                                            <button type="button" className="delBtn" onClick={()=>{this.deleteRequest(user._id)}}> Delete</button>
                                        </li>
                                    )
                                }
                                 
                            })
                        }
                    </ol>
                        
                </div>
            </div>
        );
    }
}