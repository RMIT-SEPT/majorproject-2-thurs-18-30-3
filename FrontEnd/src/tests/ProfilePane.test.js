import React from 'react';

import ProfilePane from '../components/ProfilePane';
import { StaticRouter } from 'react-router';
import renderer from 'react-test-renderer';
import {render, fireEvent} from '@testing-library/react';

import '@testing-library/jest-dom/extend-expect';
const dummyProfile = {firstname: 'test', lastname: 'tester', email: 'test@wiz', phone:'0000', address: '001 happy test avenue'};
const closeFuncMock = jest.fn();
const reloadFuncMock = jest.fn();
const updateFuncMock = jest.fn();

const setup = () => {
    return render(
        <StaticRouter>
            <ProfilePane close={closeFuncMock} profile={dummyProfile} reload = {reloadFuncMock} update = {updateFuncMock}/>
        </StaticRouter>
    )
  }

  //snapshot test
test('Test Pane Renders', () => {
    const pane = renderer.create(
        <StaticRouter>
            <ProfilePane close={closeFuncMock} profile={dummyProfile} reload = {reloadFuncMock} update = {updateFuncMock}/>
        </StaticRouter>,
      ).toJSON();
      expect(pane).toMatchSnapshot();
});

test('Test Pane Contents', () => {
    const container = setup();
    
    expect(container.getAllByRole('button').length).toBe(4);
    expect(container.getAllByRole('textbox').length).toBe(5);
});

//Make sure input fields arein correct order
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
    const SaveBtn= container.getAllByRole('button')[2];

    const fname= container.getAllByRole('textbox')[0];

    fireEvent.click(closeBtn);
    expect(closeFuncMock).toHaveBeenCalled();

    fireEvent.click(editBtn);
    fireEvent.change(fname, {target: {value: 'new'}});

    fireEvent.click(SaveBtn);
    expect(updateFuncMock).toHaveBeenCalled();

    expect(fname.value).toBe('new');

    //TODO:Test book button when booking functionality implemented
});