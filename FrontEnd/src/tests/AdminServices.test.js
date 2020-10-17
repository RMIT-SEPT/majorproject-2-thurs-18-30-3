import React from 'react'

const {default: AdminServiceDisplay} = require('../components/admin_components/AdminServiceDisplay')
import {StaticRouter} from 'react-router'
import renderer from 'react-test-renderer'
import {render, screen, fireEvent, leftClick, queryByText} from '@testing-library/react'
import '@testing-library/jest-dom'
import '@testing-library/jest-dom/extend-expect'

const dummyService = {id: 1, name: 'test', description: 'this is a test', img:'test.jpg'}
const dummyBooking = {id: 1, time: '1:23', date: '2/2/21', 
                        serviceName: 'test',customerId:1, employeeId:2}
const addFuncMock = jest.fn();
const btnFuncMock = jest.fn();
const updateFuncMock = jest.fn();
const deleteFuncMock = jest.fn();
URL.createObjectURL = jest.fn();

const setup = () => {
    return render(
      <StaticRouter>
        <AdminServiceDisplay service={dummyService} bookings={[dummyBooking]}
        plusFunc={addFuncMock} btnFunc={btnFuncMock} 
        updateFunc={updateFuncMock} deleteFunc={deleteFuncMock}/>
      </StaticRouter>
    )
}
  
  //snapshot test
  test('Test Page Renders', () => {
    const comp = renderer
      .create(
        <StaticRouter>
            <AdminServiceDisplay bookings={[dummyBooking]} service={[dummyService]}
                plusFunc={addFuncMock} btnFunc={btnFuncMock} 
                updateFunc={updateFuncMock} deleteFunc={deleteFuncMock}/>
        </StaticRouter>
      )
      .toJSON()
    expect(comp).toMatchSnapshot()
  })
  
  test('Test Page Contents', () => {
    const container = setup();
    expect(screen.getByRole('main')).toHaveTextContent('TIME SLOTS');
    expect(screen.getAllByRole('heading').length).toBe(4);
    expect(screen.getAllByRole('button').length).toBe(3);
    expect(screen.getByRole('group').childElementCount).toBe(1);
    expect(screen.getByRole('menu')).toHaveClass('admin-slot-counter');
  })

  test('Test Page Contents when editing', () => {
    const container = setup();
    const editBtn = screen.getAllByRole('button')[0];
    fireEvent.click(editBtn)
    expect(screen.getByRole('form')).toHaveClass('admin-edit-service');
    expect(screen.getByRole('textbox')).toHaveTextContent('this is a test');
    expect(screen.getByRole('img')).toHaveAttribute('height','110');
    expect(screen.getByRole('img')).toHaveAttribute('width','170');
    expect(screen.getAllByRole('button')[1]).toHaveTextContent('save');
    expect(screen.getAllByRole('button')[2]).toHaveTextContent('DELETE');
  })

  test('Test Buttons', () => {
    const container = setup();
    const editBtn = screen.getAllByRole('button')[0];
    const add = screen.getAllByRole('button')[1];
    fireEvent.click(add);
    expect(addFuncMock).toHaveBeenCalled();

    fireEvent.click(editBtn)
    const saveBtn = screen.getAllByRole('button')[1];
    const delBtn = screen.getAllByRole('button')[2];

    fireEvent.click(saveBtn);
    expect(updateFuncMock).toHaveBeenCalled();
    fireEvent.click(delBtn);
    expect(deleteFuncMock).toHaveBeenCalled();
  })