import React from 'react'

const {default: UpdateBookingDisplay} = require('../components/admin_components/UpdateBookingDisplay')
import {StaticRouter} from 'react-router'
import renderer from 'react-test-renderer'
import {render, screen, fireEvent, leftClick, queryByText} from '@testing-library/react'
import '@testing-library/jest-dom'
import '@testing-library/jest-dom/extend-expect'

const dummyBooking = {id: 1, time: '1:23', date: '2/2/21', 
                        serviceName: 'test',customerId:1, employeeId:2}

const deleteFuncMock = jest.fn();

const setup = () => {
    return render(
      <StaticRouter>
        <UpdateBookingDisplay booking={dummyBooking} deleteFunc={deleteFuncMock}/>
      </StaticRouter>
    )
}

 //snapshot test
 test('Test Page Renders', () => {
    const comp = renderer
      .create(
        <StaticRouter>
            <UpdateBookingDisplay booking={dummyBooking} deleteFunc={deleteFuncMock}/>
        </StaticRouter>
      )
      .toJSON()
    expect(comp).toMatchSnapshot()
  })

  test('Test Page Contents', () => {
    const container = setup();
    expect(screen.getByRole('main')).toHaveTextContent('Time Slot');
    expect(screen.getByRole('main')).toHaveClass('add-booking');
    expect(screen.getAllByRole('heading').length).toBe(3);
    expect(screen.getAllByRole('button').length).toBe(1);
  })

  test('Test Booking Display', () => {
    const container = setup();
    expect(screen.getAllByRole('cell')[0]).toHaveTextContent(dummyBooking.time);
    expect(screen.getAllByRole('cell')[0]).toHaveTextContent(dummyBooking.date);
    expect(screen.getAllByRole('cell')[1]).toHaveTextContent(dummyBooking.customerId);
    expect(screen.getAllByRole('cell')[2]).toHaveTextContent(dummyBooking.employeeId);
  })

  test('Test Button', () => {
    const container = setup();
    const btn = screen.getByRole('button');
    fireEvent.click(btn);
    expect(deleteFuncMock).toHaveBeenCalled();
  })
  
  