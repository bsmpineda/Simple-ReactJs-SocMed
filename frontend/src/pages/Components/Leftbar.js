/**
 * LogOut button
 */

import React from "react";
import newsfeed from "../../images/news.png";
import message from "../../images/message.png";
import watch from "../../images/watch.png";
import market from "../../images/marketplace.png";
import pic from "../../images/blankDp.webp"
import "./Leftbar.css"
import Cookies  from "universal-cookie";
import { Redirect } from "react-router-dom";

export default class Lefttbar extends React.Component{
    constructor(props){
        super(props)

        this.state = {
            isLoggedIn: this.props.isLoggedIn,
            name: localStorage.getItem("firstName") + " " + localStorage.getItem("lastName")
        }

        this.logout = this.logout.bind(this)
    }

    logout(e) {
        e.preventDefault();

        //delete cookie with authToken
        const cookies = new Cookies();
        cookies.remove("authToken");

        //delete firstName & lastName in local storage
        localStorage.removeItem("lastName")
        localStorage.removeItem("firstName")

        this.setState({ isLoggedIn: false });

    }

    render(){
        if(!this.state.isLoggedIn){
            return <Redirect to = "/log-in" />
        }
        return(
            <div className = "left-sidebar">
                <div className ="main-links">
                    <a href="#" className="profile"><img src= {pic} /> {this.state.name}</a>
                    <a href="#"><img src= {newsfeed} /> Newsfeed</a>

                    <a href="#"><img src={message} /> Messenger</a>

                    <a href="#"><img src={watch} /> Watch</a>
                    
                    <a href="#"><img src={market} /> Marketplace</a>
                </div>
                
                <br />
                <div>
                    <button onClick={this.logout} id="logout">Log Out</button>
                </div>

            </div>
        )
    }
}