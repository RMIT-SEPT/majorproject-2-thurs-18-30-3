import React from 'react';

import renderer from 'react-test-renderer';
import ServiceCard from '../components/ServiceCard';
import App from '../containers/App';
import { StaticRouter } from 'react-router';
import ShallowRenderer from 'react-test-renderer/shallow'; 

test('Test Application Rendering', () => {
    const shallowRenderer = new ShallowRenderer();
    shallowRenderer.render(<App />);
});

test('Test Card Rendering', () => {
    const dummyService = {id: 1,name:'test',body:'this is a test'};

    const shallowRenderer = new ShallowRenderer();
    shallowRenderer.render(<ServiceCard service={dummyService}/>);
});

test('Test Card Contents', () => {
    const dummyService = {id: 1,name:'test',body:'this is a test'};

    const shallowRenderer = new ShallowRenderer();
    shallowRenderer.getRenderOutput();
});

test('TEST A', () => {
    const serv = {id: 1,name:'user house',body:'bbb'};
    const component = renderer.create(
        <StaticRouter location="someLocation">
            <ServiceCard service={serv} />
        </StaticRouter>
      );
      
});