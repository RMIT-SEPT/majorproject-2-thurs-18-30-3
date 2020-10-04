import React, {useState} from 'react'
import moment from 'moment';

import '../../containers/App.css'

//Displays Services in a list view
function AddBookingDisplay({service, createFunc}) {
  const [vals , setVals] = useState({
      time: "",
      date: ""
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
    console.log('aasdasd '+name +' ' + value+' ' + vals.time + ' '+vals.date);
  };


  const handleSubmit=(e)=>{
    if(vals.time === "" || vals.date === "")
    {
      return;
    }

    createFunc(service.name, vals.time,vals.date);
  };

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
          <input type="time" name='time' value={vals.time} onChange={handleChange}/>
          <input type="date" name='date' value={vals.date} min={CURRENT_DATE} max={NEXT_DATE} onChange={handleChange}></input>
          
          <input className="actButton" type="submit" value="Create"/>
        </form>
      </main>
  )
}

export default AddBookingDisplay;
