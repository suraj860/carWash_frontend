
import React from "react";
import axios from "axios";
import Nav from "./nav";
import { Appcontext } from "./context";
import "../css/home.css";
import {  toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

toast.configure()
function BookAppointment(){
    const {allAppointments , setAllAppointments , api} = React.useContext(Appcontext)
    let token = window.localStorage.getItem("auth")
   
//    creating  axios instance
    const instance = axios.create({
        baseURL: api , 
        headers:{
            "auth-token" : token
        },
    })

    // get all users booked appointments
    async function userAppointments(){
        try{
            const response = await instance.get(api+ "/appointment")
            setAllAppointments(response.data)
           
        }catch(error){
            console.log(error)
        }
    }

    React.useEffect(()=>{
        userAppointments()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])

    // delete an appointment
    async function deleteAppointment(items){
        try{
             await instance.put(api + "/cancelAppointment",{
                _id:items._id
            })
            userAppointments()
            toast.success('Your Appointment Cancelled Successfully', {
                position: "top-center",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                });
        }catch(error){
            console.log(error)
        }
    }

    return(
        <>
        <Nav/>
        <div>
            <div className="bookdiv1">
                {
                    allAppointments && allAppointments.length !==0 ? allAppointments.map((items)=>{
                        return(
                            <div className="bk2" key={items._id}>
                                <div>
                                    <p className="bookAppointTitle">APPOINTMENT DETAILS</p>
                                </div>
                                <div>
                                    <p className="bk3">Name : {items.clientName}</p>
                                    <p className="bk3">Date : {items.date}</p>
                                    <p className="bk3">Time : {items.time}</p>
                                    <p className="bk3">Service-Type : {items.serviceType}</p>
                                    <p className="bk3">Phone : {items.clientPhone}</p>
                                    <p className="bk3">E-mailId : {items.clientEmail}</p>
                                    <button className="bookBtn2" onClick={()=>{deleteAppointment(items)}}>Cancel Appointment</button>
                                </div>
                                <hr style={{marginTop:"30px"}}/>
                            </div>
                        )
                    }):
                    <div>
                        <div style={{textAlign:"center" , marginTop: "40px"}}>
                            <h2 style={{color:"rgb(212, 211, 211)" , fontFamily:"'Oswald', sans-serif" , fontSize:"4rem"}}>NO APPOINTMENTS</h2>
                        </div>
                    </div>
                }
               
            </div>
        </div>
        </>
    )
}
export default BookAppointment;