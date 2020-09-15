import React from 'react'

import Employees from '../components/Employees'
// import renderer from 'react-test-renderer'
import {render} from '@testing-library/react'

beforeEach(() => {})

describe('Employees test', () => {
  const data = [
    {id: '2', name: 'Phoebe Swaniawski', mobile: 'mobile 2', email: 'Una.Hoppe0@gmail.com', uname: 'phoebe.swan'},
  ]
  const mockFunc = jest.fn()

  // Waiting for a new release of Material Table
  /*it('renders employees components successfully', () => {
    const employeesComponent = renderer
      .create(
        <Employees
          employees={data}
          onRowAdd={mockFunc}
          onRowUpdate={mockFunc}
          onRowDelete={mockFunc}
          onAlertClose={mockFunc}
          alertMsg=""
          alertErrorMsg=""
        />
      )
      .toJSON()
    expect(employeesComponent).toMatchSnapshot()
  })*/

  it('shows success alert message', () => {
    const alertMsg = 'success message'

    const {getByText} = render(
      <Employees
        employees={data}
        onRowAdd={mockFunc}
        onRowUpdate={mockFunc}
        onRowDelete={mockFunc}
        onAlertClose={mockFunc}
        alertMsg={alertMsg}
        alertErrorMsg=""
      />
    )
    expect(getByText(alertMsg)).toBeTruthy()
  })

  it('shows error alert message', () => {
    const alertErrorMsg = 'error alert message asdfasdfasdfasdf'

    const {getByText} = render(
      <Employees
        employees={data}
        onRowAdd={mockFunc}
        onRowUpdate={mockFunc}
        onRowDelete={mockFunc}
        onAlertClose={mockFunc}
        alertMsg=""
        alertErrorMsg={alertErrorMsg}
      />
    )
    expect(getByText(alertErrorMsg)).toBeTruthy()
  })
})
