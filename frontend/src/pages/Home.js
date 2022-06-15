/**
 * HOMEPAGE
 * Has 4 components: Topbar, Leftbar, Feed, Rightbar
 * 
 * Fetch: All users, friendship collection
 */

import React from "react";
import { Redirect } from "react-router-dom";
import "./Home.css"
import Topbar from "./Components/Topbar";
import Feed from "./Components/Feed";
import Leftbar from "./Components/Leftbar";
import Rightbar from "./Components/Rightbar";

export default class Home extends React.Component{
    constructor(props){
        super(props);

        this.state = {
            checkedIfLoggedIn: false,
            isLoggedIn: null,
            firstName: localStorage.getItem("firstName"),
            lastName: localStorage.getItem("lastName"),
            id: localStorage.getItem("id"),
            users: [],
            friends: []
        }

        
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
                    checkedIfLoggedIn: true, isLoggedIn: true, 
                    firstName: localStorage.getItem("firstName"), 
                    lastName: localStorage.getItem("lastName"),
                    id: localStorage.getItem("id"),
                })
            }
            else{
                this.setState({ 
                    checkedIfLoggedIn: true, isLoggedIn: false
                })
            }
        })


        //fetchAll users
        fetch('http://localhost:3001/find-all-users') //extract the data
		.then(response => response.json())
		.then(body => {
			this.setState({users: body})
		})

        //fetch friends
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
        if(!this.state.checkedIfLoggedIn) {
            //delay redirect/render
            return(
                <div></div>
            )
        }
        else {
            if(this.state.isLoggedIn){
                //render the page


                let username = this.state.firstName + " " + this.state.lastName;
                return (
                    <div>
                        <Topbar atSearch={false}/>
                        <div className="homeContainer">
                            <Leftbar isLoggedIn={true}/>
                            <Feed users = {this.state.users} userId={this.state.id} username = {username} />
                            <Rightbar users = {this.state.users} _id = {this.state.id}/>
                        </div>
                        
                        
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
