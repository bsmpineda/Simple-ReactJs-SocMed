import React from "react";
import "./App.css"
import {BrowserRouter, Route} from 'react-router-dom';
import SignUp from "./pages/SignUp";
import LogIn from "./pages/LogIn";
import Home from "./pages/Home";
import Search from "./pages/Components/Search";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Route exact= {true} path="/" component= {LogIn} />
        <Route exact= {true} path = "/sign-up" component= {SignUp} />
        <Route exact= {true} path = "/log-in" component= {LogIn} />
        <Route exact = {true} path = "/feed" component={Home} />
        <Route exact = {true} path = "/search" component={Search} />
      </BrowserRouter>
    </div>
  );
}

export default App;
