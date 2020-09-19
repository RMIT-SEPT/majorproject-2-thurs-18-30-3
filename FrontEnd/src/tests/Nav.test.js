import React from 'react';

import Nav from '../components/Nav';
import { StaticRouter } from 'react-router';
import renderer from 'react-test-renderer';
import moment from 'moment'; 
import {render, screen, fireEvent, queryByText} from '@testing-library/react';
import '@testing-library/jest-dom';
import '@testing-library/jest-dom/extend-expect';

const setup = () => {

    const container = render(
        <StaticRouter>
            <Nav/>
        </StaticRouter>,
    );
    return container;
}


test('Test Nav Renders', () => {

    const comp = renderer.create(
        <StaticRouter>
            <Nav/>
        </StaticRouter>,
    ).toJSON();
    expect(comp).toMatchSnapshot();
});

test('Test Nav Elements', () => {

    const comp = setup();
    expect(screen.getByRole('heading')).toHaveTextContent('AGME');
    expect(screen.getAllByRole('link').length).toBe(6);
});

test('Test Nav Links', () => {

    const comp = setup();

    const links = screen.getAllByRole('link');
    var services = links[0];
    var about = links[1];
    var book = links[2];
    
    expect(services).toHaveAttribute('href','/services');
    expect(about).toHaveAttribute('href','/about');
    expect(book).toHaveAttribute('href','/services');
});