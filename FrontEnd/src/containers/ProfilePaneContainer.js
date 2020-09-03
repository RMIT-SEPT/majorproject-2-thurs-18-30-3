import React, {forwardRef, useImperativeHandle, useEffect } from 'react';
import ReactDOM from "react-dom";

import ProfilePane from '../components/ProfilePane';
import '../containers/App.css';

const ProfilePaneContainer = forwardRef((props,ref) => {
    //Is the pane rendering
    const [isShowing, setIsShowing] = React.useState(false);
    //Profil;e for user display
    const [profile, setProfile] = React.useState({});

    useImperativeHandle(ref, () => {
        return{
            openModel:  () => open(),
            close: () => close()
        }
    });

    useEffect(() => {
        loadProfile();
      }, []);


    const loadProfile = async () => {   
        var url = 'http://localhost:3004/customers/1';
        const res = await fetch(url);
        const data = await res.json();
        setProfile(data);
    }

    const updateProfile = async (email, name, phone) => {

        var url = 'http://localhost:3004/customers/1'
        var prof = {"email": email,
        "name": name,
        "pword": "cust",
        "phone": phone}
        fetch(url, {
            method: 'PUT',
            body: JSON.stringify(prof),
            headers: {
                "Content-type": "application/json; charset=UTF-8"
                }
        }).then(response => {response.json()}).then(json => {
            console.log(json)
        });
    }

    const open = () => {
        setIsShowing(true);
    };

    const close = () => {
        setIsShowing(false);
    };

    if(isShowing)
    {
        //Modal components are linked to modal-root node
        return ReactDOM.createPortal(
            <ProfilePane close={close} profile={profile} update = {updateProfile}></ProfilePane>, document.getElementById("modal-root"))
    }

    return null;
})
	

export default ProfilePaneContainer;