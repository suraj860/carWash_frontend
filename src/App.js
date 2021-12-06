
import React from "react";
import Home from "./components/home";
import {BrowserRouter  , Switch , Route} from "react-router-dom"
import { ContextProvider } from "./components/context";
import Login from "./components/login";
import RegisterForm from "./components/registerForm";
import ForgetPass from "./components/forgetpass";
import UpdatePassword from "./components/updatePass";
import VerifyEmail from "./components/verifyMail";
import AppointmentForm from "./components/appointmentForm";
import BookAppointment from "./components/bookAppoint";

function App() {
  return (
   <>
   <ContextProvider>
   <BrowserRouter>
   <Switch>
     <Route exact path="/" component={Home}/>
     <Route  path="/login" component={Login}/>
     <Route path="/register" component={RegisterForm}/>
     <Route path="/forgetPassword" component={ForgetPass}/>
     <Route path="/verifyEmail/:id" component={UpdatePassword}/>
     <Route path="/verify/:id" component={VerifyEmail}/>
     <Route path="/appointment_form" component={AppointmentForm}/>
     <Route path="/booked_Appointments" component={BookAppointment}/>
   </Switch>
   </BrowserRouter>
   </ContextProvider>
   </>
  );
}

export default App;
