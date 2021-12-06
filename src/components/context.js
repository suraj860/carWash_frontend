
import React from "react";

export  const Appcontext = React.createContext()

export const ContextProvider = (props)=>{

    const[value , setValue] = React.useState(true)
    const[userEmail , setUserEmail] = React.useState("")
    const[password, setPassword] = React.useState("")
    const[msg , setmsg] = React.useState("")
    const[name , setName]= React.useState("")
    const[api] = React.useState("https://carwash1312.herokuapp.com")
    const[pickDate , setPickDate] = React.useState(new Date())
    const[pickTime , setPickTime] = React.useState()
    const[serviceType , setServiceType] = React.useState("Service Types")
    const[clientName , setClientName] = React.useState()
    const[clientPhone , setClientPhone] = React.useState()
    const[clientEmail , setClientEmail] = React.useState()
    const[clientMsg , setClientMsg] = React.useState()
    const[allAppointments , setAllAppointments] = React.useState()
    return(
       <Appcontext.Provider value={{value , setValue,userEmail , setUserEmail ,password, setPassword ,
        msg , setmsg ,api , name , setName ,pickDate , setPickDate ,pickTime , setPickTime,
        serviceType , setServiceType , clientName , setClientName ,clientPhone , setClientPhone,
        clientEmail , setClientEmail , clientMsg , setClientMsg ,allAppointments , setAllAppointments}}>
           {props.children}
       </Appcontext.Provider>
    )
}