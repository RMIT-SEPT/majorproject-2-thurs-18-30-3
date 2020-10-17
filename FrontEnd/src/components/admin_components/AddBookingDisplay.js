import React, {useState} from 'react'
import moment from 'moment';

import '../../containers/App.css'

//Displays Services in a list view
function AddBookingDisplay({service, employees, createFunc}) {
  const [vals , setVals] = useState({
      time: "",
      date: "",
      employeeName: ""
  });

  if(service == null)
  {
    return null;
  }
  
  const CURRENT_DATE = moment().format('DD-MM');
  const NEXT_DATE = moment().add(1,'months').format('DD-MM');

  const handleChange = (e) =>{
    const { name, value } = e.target;
    setVals(vals => ({ ...vals, [name]: value }));
  };

  //Retrieve list of employees
  const empOptions = employees.map((employee) => {
    return (
      <option className="employee-option" key = {employee.id} value={employee.id}>{employee.firstName} {employee.lastName}</option>
    )
  })

  //Button function for adding new booking slot
  const handleSubmit=(e)=>{
    createFunc(service.name, vals.time, vals.date, vals.employeeName);
  };

  const validate = () => {
    if(vals.time !== "" || vals.date !== "" || vals.employeeName !=="")
    {
      return false;
    }
    return true;
  }

  return (
      <main className="add-booking" role="main">
        <div className = 'add-booking-heading'>
            <h1>Add Slot</h1>
        </div>

        <div className = 'add-booking-body'>
            <span>{service.name}</span>
        </div>

        <hr></hr>
        <form className = 'add-booking-form' onSubmit={handleSubmit}>
          <input type="time" name='time' value={vals.time} onChange={handleChange} role='textbox'/>
          <input type="date" name='date' value={vals.date} min={CURRENT_DATE} max={NEXT_DATE} onChange={handleChange} role='textbox'></input>
          <div><label htmlFor='employees'>Assigned Employee No: </label><span role='note'>{vals.employeeName}</span></div>
            <select name="employeeName" id="employees" onChange={handleChange} role ='list' multiple>
              {empOptions}
            </select>
          <button className="actButton" type="submit" disabled={validate()}>Create</button>
        </form>
      </main>
  )
}

export default AddBookingDisplay;
