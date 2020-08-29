import React from 'react';

import ServiceCard from '../components/ServiceCard';
import App from '../containers/App';
import { StaticRouter } from 'react-router';
import renderer from 'react-test-renderer';
import userEvent from '@testing-library/user-event';
import {render, screen, fireEvent} from '@testing-library/react';

import '@testing-library/jest-dom/extend-expect';

beforeEach(() => {
    
});

test('Test Card Renders', () => {
    const dummyService = {id: 1,name:'test',body:'this is a test'};

    const card = renderer.create(
        <StaticRouter>
            <ServiceCard service={dummyService}/>
        </StaticRouter>,
      ).toJSON();
      expect(card).toMatchSnapshot();
});

test('Test Card Contents', () => {
    const dummyService = {id: 1,name:'TEST BUTTON',body:'this is a test'};
    const container = render(
        <StaticRouter>
            <ServiceCard service={dummyService}/>
        </StaticRouter>,
      );

    expect(screen.getByRole('cell')).toHaveTextContent('this is a test');
    expect(screen.getByRole('img')).toHaveAttribute('src','not-found.png');
    
   
}); 

test('Test Card On Click', () => {
    const dummyService = {id: 1,name:'TEST BUTTON',body:'this is a test'};
    const container = render(
        <StaticRouter>
            <ServiceCard service={dummyService}/>
        </StaticRouter>,
      );
    
    fireEvent.click(screen.getByRole('cell'));
    expect(container).toMatchSnapshot();
   
}); 