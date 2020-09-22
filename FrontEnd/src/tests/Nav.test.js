import React from 'react';

import Nav from '../components/Nav';
import { StaticRouter } from 'react-router';
import renderer from 'react-test-renderer';
import moment from 'moment'; 
import {render, screen} from '@testing-library/react';
import '@testing-library/jest-dom';
import '@testing-library/jest-dom/extend-expect';
import CurrentUser from '../context/CurrentUser'

//Resize function for testing dynamic hamburger list
beforeAll(() => {
    window.resizeTo = function resizeTo(width, height) {
      Object.assign(this, {
        innerWidth: width,
        innerHeight: height,
        outerWidth: width,
        outerHeight: height,
      }).dispatchEvent(new this.Event('resize'))
    }
  })

const setup = () => {

    const container = render(
        <StaticRouter>
            <CurrentUser.Provider value='true'>
                <Nav/>
            </CurrentUser.Provider>
        </StaticRouter>,
    );
    return container;
}

//Snapshot test
test('Test Nav Renders', () => {

    const comp = renderer.create(
        <StaticRouter>
            <CurrentUser.Provider value='true'>
                <Nav/>
            </CurrentUser.Provider>
        </StaticRouter>,
    ).toJSON();
    expect(comp).toMatchSnapshot();
});

test('Test Nav Elements', () => {

    const comp = setup();
    expect(screen.getByRole('heading')).toHaveTextContent('AGME');
    expect(screen.getAllByRole('link').length).toBe(4);

    expect(screen.getByRole('button')).toHaveAttribute("class","profileButton");
});

test('Test Nav Links', () => {

    const comp = setup();

    const links = screen.getAllByRole('link');
    var about = links[0];
    var services = links[1];
    var book = links[2];
    var emps = links[3];
    

    expect(about).toHaveAttribute('href','/about');
    expect(services).toHaveAttribute('href','/services');
    expect(book).toHaveAttribute('href','/bookings');
    expect(emps).toHaveAttribute('href','/employees');


});

//Check that nav displays dynamic hamburger list when resized
test('Test Nav Resize', () => {
    const comp = setup();
    
    window.resizeTo(700, 700);

    expect(screen.getByRole('button')).toHaveAttribute("class","toggle-button");
});