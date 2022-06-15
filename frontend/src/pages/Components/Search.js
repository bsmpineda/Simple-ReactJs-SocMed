/**
 * This component is for rendering the user that matched user's query when searching name
 * An add friend button will appear next to the searched-user if it is not friend to the user or hasn't send/received a request
 * To go back to feed, click the logo
 */

import React from "react";
import "./Search.css"
import Topbar from "./Topbar";
import pic from "../../images/blankDp.webp"
import { Redirect } from "react-router-dom";
const queryString = require('query-string')


export default class Search extends React.Component{
    constructor(props){
        super(props)

        this.state = {
            checkedIfLoggedIn: false,
            isLoggedIn: null,
            id: localStorage.getItem("id"),  //get the of the user
            name: queryString.parse(props.location.search).name,
            users: [],
            notFriend: JSON.parse(localStorage.getItem("notFriend")) //list of IDs that have not yet sent/received friend request to this user, or is not friend.
        }

        this.addFriend = this.addFriend.bind(this)
    }

    //user clicked the 'add friend' button
    addFriend(userToAdd_Id){
        console.log(userToAdd_Id)
        const newFriendship = {
            senderId: this.state.id,
            receiverId: userToAdd_Id
        }

        fetch(
            "http://localhost:3001/requestFriend",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(newFriendship)

            }
        )
        .then(response => response.json())
        .then(body => {
            if (body.success){
                this.setState({signIn: true})
                alert("Success request sent!");

                //update the values of notFriend which contains the Ids of users that did not sent/receive friend request to this user, or is not friend.
                var updateNotFriend = this.state.notFriend.filter((item) =>{
                    return item!==userToAdd_Id
                })

                this.setState({notFriend: updateNotFriend})
                localStorage.setItem("notFriend", JSON.stringify(this.state.notFriend))
            }
            else{
                alert("Failed to send request!")
            }
        })
    }

    componentDidMount() {
        //Send POST request to check if user is logged in
        fetch(
            "http://localhost:3001/checkifloggedin",
            {
                method: "POST",
                credentials: "include"
            }
        )
        .then(response => response.json())
        .then(body => {
            if(body.isLoggedIn){
                this.setState({ 
                    checkedIfLoggedIn: true, 
                    isLoggedIn: true 
                })
            }
            else{
                this.setState({ 
                    checkedIfLoggedIn: true, 
                    isLoggedIn: false
                })
            }
        })

		fetch('http://localhost:3001/find-user-by-name?name=' + this.state.name )
		.then(response => response.json()) //contains the data we need
		.then(body => {  //store data into the states
			this.setState({
				users: body
			})
		})
	}

    render(){
        if(!this.state.checkedIfLoggedIn) {
            //delay redirect/render
            return(
                <div></div>
            )
        }
        else{
            if(this.state.isLoggedIn){
                if(this.state.users.length === 0){
                    return(
                        <div>
                            <Topbar atSearch={true}/>
                            <h1 id="noResult">No user found</h1>
                        </div>
                    )
                }

                return(  
                    <div className="search">
                        <Topbar atSearch={true}/>
                        <ul>
                            {
                                
                                this.state.users.map((user, i) => {
                                    
                                    return(
                                        <li key={i}>
                                            <label><img src={pic} /> { user.firstName} {user.lastName}</label>
                                            <p>Email: { user.email } </p>
                                            {
                                                this.state.notFriend.map((u, x)=>{
        
                                                    if(u === user._id){
                                                        return <button className="addFriend" key={x} 
                                                            onClick={()=>{
                                                                this.addFriend(user._id)
                                                            }}>Add Friend</button>
                                                    }
                                                })
                                            }
                                            
                                        
                                        </li>
                                    );
                                })
                                
                            }
                        </ul>
                        <br />
                        <br />
                        <br />
                    </div>
                )
            }
            else{
                //redirect
                return <Redirect to = "/log-in" />
            }
        }
                
    }
}