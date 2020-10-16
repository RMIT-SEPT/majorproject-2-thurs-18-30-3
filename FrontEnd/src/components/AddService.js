import React from 'react';
import { useHistory } from "react-router-dom";
import '../containers/App.css';

// GUI for adding a service
function AddService({create}) {
    const history = useHistory();
    const[name, setName] = React.useState("");
    const[description, setDescription] = React.useState("");
    const[img, setImg] = React.useState(null);

    const handleSubmit = () => {
        if(name !== "" && description !== "")
        {
            create(name, description, img);
            history.push('/adminservices');
            window.location.reload();
        }
        else
        {
            alert("Please enter valid data");
        }
    }

    const handleImage = (e) => {
        setImg(e.target.files[0])
    }

    return (
        <div className="container">
            <h1>Create New Service</h1>
            <div className="addService-container">
                <div className="addService-titlebox">
                    <span>name</span>
                    <input className = 'addName-input' onChange={(event) => {setName(event.target.value)}}/>
                </div>

                <div className="addService-descbox">
                    <span>description</span>
                    <input onChange={(event) => {setDescription(event.target.value)}}/>
                </div>

                <div className="addService-imgbox">
                    <span>photo</span>
                    <label htmlFor="addService-file-Upload" className="addService-fileLabel">
                        {img? "" : "Upload Image"}
                        <div id="imgWrapper">
                            <img src={img? URL.createObjectURL(img) : null} alt={img? img.name : null} width="340" height="220"/>
                        </div>
                    </label>
                    <input id="addService-file-Upload" type="file" onChange={handleImage}/>
                </div>
            </div>
            <button className="actButton" onClick={() => handleSubmit()}>Create</button>
        </div>
    );
}

export default AddService;  