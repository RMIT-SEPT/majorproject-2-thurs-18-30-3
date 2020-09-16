import React from 'react';

import ProfilePaneContainer from '../containers/ProfilePaneContainer';
import App from '../containers/App';
import { StaticRouter } from 'react-router';
import renderer from 'react-test-renderer';
import userEvent from '@testing-library/user-event';
import {render, screen, fireEvent} from '@testing-library/react';

import '@testing-library/jest-dom/extend-expect';

const setup = () => {
    return render(
        <StaticRouter>
            <ProfilePaneContainer>PROFILE</ProfilePaneContainer>
        </StaticRouter>
    )
  }

test('Test Pane Renders', () => {
    const pane = renderer.create(
        <StaticRouter>
            <ProfilePaneContainer>PROFILE</ProfilePaneContainer>
        </StaticRouter>,
      ).toJSON();
      expect(pane).toMatchSnapshot();
});

test('Test Pane Contents', () => {
    const modalRoot = document.createElement('div');
    modalRoot.setAttribute('id', 'modal-root'); 
    document.body.appendChild(modalRoot);

    const container = render(
        <StaticRouter>
            <ProfilePaneContainer showing={true}>PROFILE</ProfilePaneContainer>
        </StaticRouter>);
    
    expect(container.getAllByRole('button').length).toBe(3);
    expect(container.getAllByRole('textbox').length).toBe(4);
});