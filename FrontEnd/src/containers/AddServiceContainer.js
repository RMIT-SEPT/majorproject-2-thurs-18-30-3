import React, {} from 'react'
import '../containers/App.css'
import axios from "axios";

import AddService from '../components/AddService.js'
import serviceApi from "../config/serviceApi";

const createService = (newName, newDesc, newImage) => {
  const newService = {
    name: newName,
    description: newDesc,
    img: newImage
  };
  axios.post(serviceApi.getUrl, newService)
  .then(response => console.log(response))
  .catch(error => console.log(error));
};

//Adds a new service to backend
function AddServiceContainer() {
 
  return (
    <AddService create={createService}/>
  )
}

export default AddServiceContainer