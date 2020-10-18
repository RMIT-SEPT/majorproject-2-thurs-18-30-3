import React from 'react';

import ProfileBookings from '../components/booking_components/ProfileBookings';
import { StaticRouter } from 'react-router';
import renderer from 'react-test-renderer';
import {render, fireEvent} from '@testing-library/react';

import '@testing-library/jest-dom/extend-expect';
const dummyBookings = [{"serviceName": "Test","customerId": 1,"employeeId": "2","time": "11:11","date": "1-1-1","id": 1}];
const changeFuncMock = jest.fn();
const deleteFuncMock = jest.fn();

const setup = () => {
    return render(
        <StaticRouter>
            <ProfileBookings change={changeFuncMock} bookingSet = {dummyBookings} deleteFunc={deleteFuncMock}/>
        </StaticRouter>
    )
  }

  //snapshot test
test('Test Pane Renders', () => {
    const pane = renderer.create(
        <StaticRouter>
            <ProfileBookings change={changeFuncMock} bookingSet = {dummyBookings} deleteFunc={deleteFuncMock}/>
        </StaticRouter>,
      ).toJSON();
      expect(pane).toMatchSnapshot();
});

test('Test Pane Contents', () => {
    const container = setup();
    
    expect(container.getAllByRole('button').length).toBe(2);
    expect(container.getAllByRole('heading')[0]).toHaveTextContent('Your Bookings');
    expect(container.getByRole('cell')).toHaveAttribute('class','booking-card');
});

test('Test Booking Card Contents', () => {
    const container = setup();
    
    expect(container.getByRole('cell')).toHaveTextContent('11:11');
    expect(container.getByRole('cell')).toHaveTextContent('1-1-1');
    expect(container.getByRole('cell')).toHaveTextContent('Test');
});

test('Test Button functions', () => {
    const container = setup();
    
    const closeBtn= container.getAllByRole('button')[0];
    const deleteBtn= container.getAllByRole('button')[1];

    fireEvent.click(closeBtn);
    expect(changeFuncMock).toHaveBeenCalled();

    fireEvent.click(deleteBtn);
    expect(deleteFuncMock).toHaveBeenCalled();
});