
import React from "react";
import {useHistory , Link , NavLink} from "react-router-dom";
import jwt from "jsonwebtoken";
import "../css/detail.css"

function Nav(){
    let token = window.localStorage.getItem("auth")
    let userData = jwt.decode(token)
    // console.log(userData)
    let history = useHistory()
    const[t1 , setT1] = React.useState(true)
    const[t2 , setT2] = React.useState(false)
    const[t3 , setT3] = React.useState(false)
    const[t4 , setT4] = React.useState(false)
    const[t5 , setT5] = React.useState(false)
    return(
        <>
        <nav className="navbar navbar-expand-lg navbar-light navs">
            {/* <a className="navbar-brand" href="/">Navbar</a> */}
            <div style={{width:"100px" , height:"60px" , marginRight:"25px" , marginLeft:"15px"}}>
                <img src="./images/logo.png" alt="brandLogo" style={{width:"100%" , height:"100%"}}/>
            </div>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarTogglerDemo02" aria-controls="navbarTogglerDemo02" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>

            <div className="collapse navbar-collapse" id="navbarTogglerDemo02" style={{justifyContent: "space-between"}}>
                <ul className="navbar-nav ">
                <li className="nav-item active" style={{marginRight:"20px" }}>
                    <NavLink  exact className="nav-link" to="/" activeStyle={t1 ? {color:"red"} : {color:"black"}} 
                    onClick={()=>{
                        setT1(true)
                        setT2(false)
                        setT3(false)
                        setT4(false)
                        setT5(false)
                    }}>Home <span className="sr-only">(current)</span></NavLink>
                </li>
               
                <li className="nav-item" style={{marginRight:"20px" }}>
                    <a className="nav-link try"  disabled href="#paisa"  style={t2===true ? {color:"red"}:{color:"black"}}
                    onClick={()=>{
                        setT2(true)
                        setT3(false)
                        setT1(false)
                        setT5(false)
                        setT4(false)
                    }}>Services</a>
                </li>
                <li className="nav-item" style={{marginRight:"20px" }}>
                    <a className="nav-link try" href="#aboutUs_contactUs" style={t3 ? {color:"red"} : {color:"black"}}
                     onClick={()=>{
                        setT1(false)
                        setT2(false)
                        setT3(true)
                        setT4(false)
                        setT5(false)
                    }}>About</a>
                </li>
                <li className="nav-item" style={{marginRight:"20px" }}>
                    <a className="nav-link try" href="#aboutUs_contactUs" style={t4 ? {color:"red"} : {color:"black"}}
                     onClick={()=>{
                        setT1(false)
                        setT2(false)
                        setT3(false)
                        setT4(true)
                        setT5(false)
                    }}>Contact-Us</a>
                </li>
                <li className="nav-item active" style={{marginRight:"20px" }}>
                    <NavLink  exact className="nav-link" to="/booked_Appointments" activeStyle={t5 ? {color:"red"} : {color:"black"}} 
                    onClick={()=>{
                        setT5(true)
                        setT1(false)
                        setT2(false)
                        setT3(false)
                        setT4(false)
                       
                    }}>Booked-Appointments <span className="sr-only">(current)</span></NavLink>
                </li>
                </ul>
                <ul className="navbar-nav ">
                <li className="nav-item" style={{marginRight:"100px" }}>
                {
                    token  && userData.exp*1000 >= Date.now() ? 
                    <div className="dropdown">
                        <button className="btn btn-secondary dropdown-toggle logBtnToggler free" type="button" id="dropdownMenuButton" data-toggle="dropdown" 
                        aria-haspopup="true" aria-expanded="false" >
                        {userData.name}<i className ="fas fa-circle fa-0.5x" style={{color:"yellowgreen", marginRight:"10px" , marginLeft:"10px"}}></i>
                        </button>
                        <div className="dropdown-menu " aria-labelledby="dropdownMenuButton">
                        <Link to="/" style={{textDecoration:"none"}}>
                         <button className="dropdown-item drop" type="button" style={{cursor:"pointer"}}
                         onClick={()=>{
                             localStorage.clear()  
                         }}>Logout</button></Link>
                         <Link to="/booked_Appointments" style={{textDecoration:"none"}}>
                         <button className="dropdown-item drop" type="button" style={{cursor:"pointer"}}> Your Appointments</button>
                         </Link>
                            {/* <a className="dropdown-item" href="#">Placed Orders</a> */}
                            
                        </div>
                    </div> :
                     <button 
                     style={{cursor:"pointer" , border:"1px solid rgb(18, 18, 139)" , padding:"5px 20px" ,borderRadius:"0.7rem"}} 
                     onClick={()=>{
                         history.push("/login")
                        }} className="logBtnToggler">Login</button>
                }
                </li>
                
                </ul>
            </div>
        </nav>
        </>
    )
}
 export default Nav;