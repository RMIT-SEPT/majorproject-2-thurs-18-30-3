import React from 'react'

import AddBookingDisplay from '../components/admin_components/AddBookingDisplay.js'
import {StaticRouter} from 'react-router'
import renderer from 'react-test-renderer'
import {render, screen, fireEvent} from '@testing-library/react'
import '@testing-library/jest-dom'
import '@testing-library/jest-dom/extend-expect'

const addFuncMock = jest.fn();
const dummyService = {id: 1, name: 'test', description: 'this is a test'};
const dummyEmployees = [{"username": "tester","userType": "employee","password": "11111111","confirmPassword": 
    "111111111","firstName": "test","lastName": "test","email": "test@test.wiz","mobileNum": "123456","address": "1 test","id": 1}];
const dummyAvailabilities = [{id:1,username:"tester",availability:"free"}];

const setup = () => {
    return render(
      <StaticRouter>
        <AddBookingDisplay service={dummyService} employees={dummyEmployees} avails={dummyAvailabilities} createFunc={addFuncMock}/>
      </StaticRouter>
    )
}
  
  //snapshot test
  test('Test Page Renders', () => {
    const comp = renderer
      .create(
        <StaticRouter>
            <AddBookingDisplay service={dummyService} employees={dummyEmployees} createFunc={addFuncMock}/>
        </StaticRouter>
      ).toJSON();
    
      expect(comp).toMatchSnapshot()
  })

  test('Test Page Contents', () => {
    const container = setup();
    expect(screen.getByRole('heading')).toHaveTextContent('Add Slot');
    expect(screen.getByRole('main')).toHaveClass('add-booking');
    expect(screen.getAllByRole('textbox')[0]).toHaveAttribute('type','time');
    expect(screen.getAllByRole('textbox')[1]).toHaveAttribute('type','date');
    expect(screen.getByRole('button')).toHaveTextContent('Create');
  })

  //Make sure create function isn't called when data is missing
  test('Test Validation', () => {
    const container = setup();
    const btn = screen.getByRole('button');
    const timeBox = screen.getAllByRole('textbox')[0];
    const dateBox = screen.getAllByRole('textbox')[1];

    fireEvent.click(btn);
    expect(addFuncMock).toBeCalledTimes(0);

    fireEvent.change(timeBox, {target: {value: '1:11'}})
    fireEvent.click(btn);
    expect(addFuncMock).toBeCalledTimes(0);

    fireEvent.change(timeBox, {target: {value: '1:11'}})
    fireEvent.change(dateBox, {target: {value: '12/2/20'}})
    fireEvent.click(btn);
    expect(addFuncMock).toBeCalledTimes(0);
    
  })

  test('Test Availability display', () => {
    const container = setup();
    const empOption = screen.getByRole('tooltip');
    fireEvent.click(empOption);
    expect(screen.getByRole('tooltip')).toHaveAttribute('title','free');
  })

  //Make sure create function is called correctly
  test('Test Confirms', () => {
    const container = setup();
    const btn = screen.getByRole('button');
    const timeBox = screen.getAllByRole('textbox')[0];
    const dateBox = screen.getAllByRole('textbox')[1];
    const empList = screen.getByRole('list');

    fireEvent.change(timeBox, {target: {value: '1:11'}});
    fireEvent.change(dateBox, {target: {value: '12/2/20'}});
    fireEvent.change(empList, {target: {value: 'test'}});

    fireEvent.click(btn);
    expect(addFuncMock).toHaveBeenCalled();
  })