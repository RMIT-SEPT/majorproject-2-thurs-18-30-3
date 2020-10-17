import React from 'react';

import ProfilePane from '../components/ProfilePane';
import { StaticRouter } from 'react-router';
import renderer from 'react-test-renderer';
import {render, fireEvent} from '@testing-library/react';

import '@testing-library/jest-dom/extend-expect';
const dummyProfile = {firstName: 'test', lastName: 'tester', email: 'test@wiz', mobileNum:'0000', userType: 'customer', address: '001 happy test avenue'};
const closeFuncMock = jest.fn();
const changeFuncMock = jest.fn();
const reloadFuncMock = jest.fn();
const updateFuncMock = jest.fn();

const setup = () => {
    return render(
        <StaticRouter>
            <ProfilePane close={closeFuncMock} change = {changeFuncMock} profile={dummyProfile} reload = {reloadFuncMock} update = {updateFuncMock}/>
        </StaticRouter>
    )
  }

  //snapshot test
test('Test Pane Renders', () => {
    const pane = renderer.create(
        <StaticRouter>
            <ProfilePane close={closeFuncMock} change = {changeFuncMock} profile={dummyProfile} reload = {reloadFuncMock} update = {updateFuncMock}/>
        </StaticRouter>,
      ).toJSON();
      expect(pane).toMatchSnapshot();
});

test('Test Pane Contents', () => {
    const container = setup();
    
    expect(container.getAllByRole('button').length).toBe(4);
    expect(container.getAllByRole('textbox').length).toBe(5);
});

//Make sure input fields are in correct order
test('Test Pane Data', () => {
    const container = setup();
    
    const fname= container.getAllByRole('textbox')[0];
    const lname= container.getAllByRole('textbox')[1];
    const email= container.getAllByRole('textbox')[2];
    const phone= container.getAllByRole('textbox')[3];
    const address= container.getAllByRole('textbox')[4];

    expect(fname.value).toBe('test');
    expect(lname.value).toBe('tester');
    expect(email.value).toBe('test@wiz');
    expect(phone.value).toBe('0000');
    expect(address.value).toBe('001 happy test avenue');

});

//Check that buttons have correct functions
test('Test Pane Functions', () => {
    const container = setup();
    
    const closeBtn= container.getAllByRole('button')[0];
    const editBtn= container.getAllByRole('button')[1];
    const bookingsBtn= container.getAllByRole('button')[2];


    fireEvent.click(closeBtn);
    expect(closeFuncMock).toHaveBeenCalled();

    fireEvent.click(bookingsBtn);
    expect(changeFuncMock).toHaveBeenCalled();

    fireEvent.click(editBtn);
    const saveBtn= container.getAllByRole('button')[2];
    expect(saveBtn).toHaveTextContent('save');
});

test('Test Pane Validation', () => {
    const container = setup();

    const editBtn= container.getAllByRole('button')[1];

    const fname= container.getAllByRole('textbox')[0];
    const lname= container.getAllByRole('textbox')[1];
    const email= container.getAllByRole('textbox')[2];
    const phone= container.getAllByRole('textbox')[3];
    const address= container.getAllByRole('textbox')[4];

    fireEvent.click(editBtn);
    const saveBtn= container.getAllByRole('button')[2];
    
    fireEvent.click(saveBtn);
    expect(updateFuncMock).toBeCalledTimes(0);

    fireEvent.change(fname, {target: {value: 'new fname'}});
    fireEvent.change(lname, {target: {value: 'new lname'}});
    fireEvent.change(email, {target: {value: 'new email'}});
    fireEvent.change(phone, {target: {value: 'new phone'}});
    fireEvent.change(address, {target: {value: 'new address'}});

    fireEvent.click(saveBtn);
    expect(updateFuncMock).toBeCalledTimes(0);

    fireEvent.change(email, {target: {value: 'test@test.com'}});
    fireEvent.change(phone, {target: {value: '111111'}});

    fireEvent.click(saveBtn);
    expect(updateFuncMock).toHaveBeenCalled();

    expect(fname.value).toBe('new fname');
    expect(lname.value).toBe('new lname');
    expect(email.value).toBe('test@test.com');
    expect(phone.value).toBe('111111');
    expect(address.value).toBe('new address');
});