
import { Appcontext } from "./context";
import axios from "axios";
import React from "react";
import jwt from "jsonwebtoken";
import "../css/home.css";
import Nav from "./nav";
import {  toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { DatePickerComponent} from "@syncfusion/ej2-react-calendars";
import { TimePickerComponent } from "@syncfusion/ej2-react-calendars";
import { useHistory } from "react-router";

toast.configure()
 function AppointmentForm(){
   
     const {pickDate , setPickDate , api} = React.useContext(Appcontext)
     const {pickTime , setPickTime} = React.useContext(Appcontext)
     const{serviceType , setServiceType} = React.useContext(Appcontext)
     const{clientName , setClientName} = React.useContext(Appcontext)
     const{clientPhone , setClientPhone} = React.useContext(Appcontext)
     const{clientEmail , setClientEmail , clientMsg , setClientMsg} = React.useContext(Appcontext)
     const minTime  = new Date('08/03/2017 10:00 AM');
     const maxTime  = new Date('8/3/2017  8:00 PM');
    //  const time  = new Date('8/3/2017 8:00 PM');
    let token = window.localStorage.getItem("auth")
    let userData = jwt.decode(token)
    let history = useHistory()
    const instance = axios.create({
        baseURL: api , 
        headers:{
            "auth-token" : token
        },
    })

    // book appointment
    async function bookAppointment(){
        try{
            if(token && userData.exp*1000 >= Date.now()){
           await instance.post(api + "/getAppointment",{
                date: pickDate.toLocaleDateString(),
                time: pickTime,
                serviceType: serviceType,
                clientName: clientName,
                clientPhone:clientPhone,
                clientMsg:clientMsg,
                clientEmail: clientEmail
            })
            resetForm()
            toast.success('Appointment Booked Successfully', {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                });
            history.push("/booked_Appointments")
            }
            else{
                history.push("/login")
            }
            
        }catch(error){
            console.log(error)
        }
    }


// handleing changes in the form
    function handleChange(event){
        switch (event.target.name) {
            case "clientName":
                setClientName(event.target.value)
                break;
            case "clientPhone":
                setClientPhone(event.target.value)
                break;
            case "clientEmail":
                setClientEmail(event.target.value)
                break;
            case "clientMsg":
                setClientMsg(event.target.value)
                break;
            default:
                break;
        }
    }

    // resetting 
    function resetForm(){
        setServiceType("Service Types")
        setClientEmail("")
        setClientMsg("")
        setClientName("")
        setPickTime("")
        setClientPhone("")
    }

    // handelling the submission of the form
    function handleSubmit(event){
        event.preventDefault()
        if(serviceType==="Service Types" || clientName==="" || clientPhone==="" ||
         clientEmail==="" || clientMsg===""){
             return(toast.error('Enter Valid Information', {
                position: "top-center",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                }));
         }else{
            bookAppointment()
         }
    }
     return(
         <>
         <Nav/>
         <div className="formTop">
             <div className="formTitle">
                 <p className="c1">BOOK YOUR CAR WASH APPOINTMENT</p>
             </div>
         </div>
         <div>
             <div className="formDetails">
                <form onSubmit={handleSubmit} className="actualForm">
                    <div style={{marginBottom:"30px"}}>
                        <p className="formName">APPOINTMENT DETAILS</p>
                    </div>
                    <div  className="formDateTime">
                        <DatePickerComponent
                        value={pickDate}
                       
                        onChange={(event) => {
                            setPickDate((event.target.value));
                          }}
                          placeholder="enter date"
                          min={new Date()}
                          format='dd/MM/yyyy'/>
                    </div>
                    <div className="formDateTime">
                        <TimePickerComponent
                            value={pickTime}
                            min={minTime}
                            max={maxTime}
                            onChange={(event) => {
                                setPickTime((event.target.value).toLocaleTimeString());
                               
                            }} 
                       />
                    </div>
                    <div style={{marginBottom:"20px"}}>
                        <select className="contactDetails" name="serviceType" value={serviceType}  onChange={(event)=>{setServiceType(event.target.value)}}>
                            <option className="opt1">Service Types</option>
                            <option>BASIC WASH Rs.1999</option>
                            <option>DELUX WASH Rs.2999</option>
                            <option>ULTIMATE WASH Rs.3999</option>
                        </select>
                    </div>
                    <div style={{marginBottom:"30px"}}>
                        <p className="formName">CONTACT DETAILS</p>
                    </div>
                    <div >
                        <input  className="contactDetails" type="text" name="clientName" value={clientName} 
                        onChange={handleChange} placeholder="Enter Your Full Name"/><br/>
                        <input type="text"  className="contactDetails" name="clientPhone" value={clientPhone} 
                        onChange={handleChange} placeholder="Enter Phone"/><br/>
                        <input type="email" className="contactDetails" name="clientEmail" value={clientEmail} 
                        onChange={handleChange} placeholder="Enter Email-Id"/><br/>
                        <textarea cols="30" className="contactDetailsTextArea" rows="10" type="text" name="clientMsg" value={clientMsg} 
                        onChange={handleChange} placeholder="Your Messsage"/>
                    </div>
                    <button type="submit" className="bookBtn">Submit</button>
                </form>
             </div>
         </div>
         </>
     )
 }
 export default AppointmentForm;