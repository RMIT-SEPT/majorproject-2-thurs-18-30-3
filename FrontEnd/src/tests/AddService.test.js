import React from 'react'

import AddService from '../components/AddService.js'
import {StaticRouter} from 'react-router'
import renderer from 'react-test-renderer'
import {render, screen, fireEvent} from '@testing-library/react'
import '@testing-library/jest-dom'
import '@testing-library/jest-dom/extend-expect'

const addFuncMock = jest.fn();

const setup = () => {
    return render(
      <StaticRouter>
        <AddService create={addFuncMock}/>
      </StaticRouter>
    )
}
  
  //snapshot test
  test('Test Page Renders', () => {
    const comp = renderer
      .create(
        <StaticRouter>
            <AddService create={addFuncMock}/>
        </StaticRouter>
      ).toJSON();
    
      expect(comp).toMatchSnapshot()
  })

  test('Test Page Contents', () => {
    const container = setup();
    expect(screen.getByRole('heading')).toHaveTextContent('Create New Service');
    expect(screen.getByRole('form')).toHaveClass('addService-container');
    expect(screen.getByRole('img')).toHaveAttribute('height','220');
    expect(screen.getByRole('img')).toHaveAttribute('width','340');
    expect(screen.getByRole('button')).toHaveTextContent('Create');
  })

  //Make sure create function isn't called when data is missing
  test('Test Validation', () => {
    const container = setup();
    const btn = screen.getByRole('button');
    const nameBox = screen.getAllByRole('textbox')[1];
    const descBox = screen.getAllByRole('textbox')[3];

    fireEvent.click(btn);
    expect(addFuncMock).toBeCalledTimes(0);

    fireEvent.change(nameBox, {target: {value: 'test'}})
    fireEvent.click(btn);
    expect(addFuncMock).toBeCalledTimes(0);

    fireEvent.change(nameBox, {target: {value: ''}})
    fireEvent.change(descBox, {target: {value: 'test'}})
    fireEvent.click(btn);
    expect(addFuncMock).toBeCalledTimes(0);
  })

  //Make sure create function is called correctly
  test('Test Confirms', () => {
    const container = setup();
    const btn = screen.getByRole('button');
    const nameBox = screen.getAllByRole('textbox')[1];
    const descBox = screen.getAllByRole('textbox')[3];

    fireEvent.change(nameBox, {target: {value: 'test name'}})
    fireEvent.change(descBox, {target: {value: 'test desc'}})
    fireEvent.click(btn);
    expect(addFuncMock).toBeCalled();
  })