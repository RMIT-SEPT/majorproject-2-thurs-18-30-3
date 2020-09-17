import React, {forwardRef, useImperativeHandle, useEffect } from 'react';
import ReactDOM from "react-dom";

import ProfilePane from '../components/ProfilePane';
import AuthService from '../services/auth.service'
import '../containers/App.css';


//Retrieves and displays current user profile data
const ProfilePaneContainer = forwardRef((props,ref) => {
    //Is the pane rendering
    const [isShowing, setIsShowing] = React.useState(false);
    //User profile for display
    const [profile, setProfile] = React.useState({});

    //Refs to  the modal operation functions
    useImperativeHandle(ref, () => {
        return{
            openModel:  () => open(),
            close: () => close()
        }
    });

    useEffect(() => {
        loadProfile();
      }, []);


      //API call to retrieve user data
    const loadProfile = async () => {  
        if(!AuthService.getCurrentUser())
        {
            return null;
        }
        var url = 'http://localhost:8080/api/users/'.concat(AuthService.getCurrentUser().id);
        const res = await fetch(url);
        const data = await res.json();
        setProfile(data);
    }

    //Reads in changed values and PUTS them to the backend
    const updateProfile = async (newEmail, newFirstName, newLastName, newPhone, newAddress) => {

        //var url = 'http://localhost:8080/api/users/'.concat(AuthService.getCurrentUser().username);
        var url = 'http://localhost:8080/api/users/1'
        var prof = {
            "firstname": newFirstName,
            "lastname": newLastName,
            "email": newEmail,
            "phone": newPhone,
            "address": newAddress
        }
        fetch(url, {
            method: 'PUT',
            body: JSON.stringify(prof),
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        }).then(
            response => {response.json()
        }).then(()=>{
            setProfile(prof);
        });
    }

    //open modal pane
    const open = () => {
        setIsShowing(true);
    };

    //close modal pane
    const close = () => {
        setIsShowing(false);
    };

    if(isShowing)
    {
        //Modal components are linked to modal-root node
        return ReactDOM.createPortal(
            <ProfilePane close={close} profile={profile} reload = {loadProfile} update = {updateProfile}></ProfilePane>, document.getElementById("modal-root"))
    }

    return null;
})
	

export default ProfilePaneContainer;