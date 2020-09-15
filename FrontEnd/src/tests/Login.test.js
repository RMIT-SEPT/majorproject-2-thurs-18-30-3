import React from 'react'

import Login from '../components/Login'
import {render, fireEvent, screen} from '@testing-library/react'
import 'mutationobserver-shim'

describe('SignIn', () => {
  beforeEach(() => {
    render(<Login />)
  })

  it('should display required error when value is invalid', async () => {
    fireEvent.submit(screen.getByRole('button'))
    expect(await screen.findByText('username is a required field')).toBeTruthy()
    expect(await screen.findByText('password is a required field')).toBeTruthy()
  })

  it('should display error when no password specified', async () => {
    fireEvent.input(screen.getByRole('textbox'), {
      target: {
        value: 'testuser',
      },
    })
    fireEvent.submit(screen.getByRole('button'))
    expect(await screen.findByText('password is a required field')).toBeTruthy()
  })

  /*it('should display min length error when password is invalid', async () => {
    fireEvent.input(screen.getByRole('textbox'), {
      target: {
        value: 'testuser',
      },
    })
    fireEvent.input(screen.getByLabelText('Password'), {
      target: {
        value: 'pass',
      },
    })
    fireEvent.submit(screen.getByRole('button'))
    expect(await screen.findByText('Must be at least 8 characters')).toBeTruthy()
  })*/
})
