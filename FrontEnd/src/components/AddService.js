import React from 'react';
import '../containers/App.css';

// GUI for adding a service
function AddService() {

    const handleImage = () => {
        console.log('phwoar');
    }
    return (
        <div className="container">
            <h1>Create New Service</h1>
            <div className="addService-container">
                <div className="addService-titlebox">
                    <span>name</span>
                    <input></input>
                </div>

                <div className="addService-descbox">
                    <span>description</span>
                    <input></input>
                </div>

                <div className="addService-imgbox">
                    <span>photo</span>
                    <label for="addService-file-Upload" class="addService-fileLabel">
                        Custom Upload
                    </label>
                    <input id="addService-file-Upload" type="file"/>
                </div>
            </div>
            <button className="actButton">Create</button>
        </div>
    );
}

export default AddService;  