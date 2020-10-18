import React from 'react'
const {default: EmployeeMyService} = require('../pages/EmployeeMyServices')
import {StaticRouter} from 'react-router'
import renderer from 'react-test-renderer'
import '@testing-library/jest-dom'
import '@testing-library/jest-dom/extend-expect'
const searchFuncMock = jest.fn()
const dummyBooking = {id: 1, time: '1:23', date: '2/2/21',
    serviceName: 'test',customerId:1, employeeId:2}
test('Test Table renderer', () => {
    const dummyEmployee = {username: 'test1' , availability: 'Test test'}
    const employeeServices = renderer
        .create(
            <StaticRouter>
                <EmployeeMyService data = {[dummyBooking]} payload = {[dummyEmployee]} />
            </StaticRouter>
        )
        .toJSON()
    expect(employeeServices).toMatchSnapshot()
})