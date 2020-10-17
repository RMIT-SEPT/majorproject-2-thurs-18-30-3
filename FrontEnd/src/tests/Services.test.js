import React from 'react'

import Services from '../components/Services'
import {StaticRouter} from 'react-router'
import renderer from 'react-test-renderer'
import moment from 'moment'
import {render, screen, fireEvent, queryByText} from '@testing-library/react'
import '@testing-library/jest-dom'
import '@testing-library/jest-dom/extend-expect'

const dummyService = {id: 1, name: 'test', description: 'this is a test'}
const searchFuncMock = jest.fn()

const setup = () => {
  return render(
    <StaticRouter>
      <Services services={[dummyService]} searchFunc={searchFuncMock} />
    </StaticRouter>
  )
}

//snapshot test
test('Test Page Renders', () => {
  const comp = renderer
    .create(
      <StaticRouter>
        <Services services={[dummyService]} searchFunc={searchFuncMock} />
      </StaticRouter>
    )
    .toJSON()
  expect(comp).toMatchSnapshot()
})

test('Test Page Contents', () => {
  const container = setup()
  expect(screen.getByRole('heading')).toHaveTextContent('Services')
  expect(screen.getByRole('searchbox'))
  expect(screen.getAllByRole('listbox').length).toBe(2)
  expect(screen.getByRole('main')).toHaveClass('services-gallery')
})

//Ensure gallery is displaying props
test('Check Gallery', () => {
  const container = setup()
  const gallery = screen.getByRole('main')

  expect(gallery).toHaveTextContent('this is a test')
})

//Tests for the search field at the top of the gallery
test('Test Search PlaceHolder', () => {
  const container = setup()
  const input = screen.getByRole('searchbox')

  expect(input).toHaveAttribute('placeholder', 'Search')
})

test('Test Search Input', () => {
  const container = setup()
  const input = screen.getByRole('searchbox')
  fireEvent.change(input, {target: {value: 'test'}})
  expect(input.value).toBe('test')
})

test('Test Search Fires', () => {
  const container = setup()
  const input = screen.getByRole('searchbox')
  fireEvent.change(input, {target: {value: 'test'}})

  expect(searchFuncMock).toHaveBeenCalled()
})

//Tests for the claendar selectors at the top of the gallery
test('Test Calender Content', () => {
  const container = setup()
  const calendarArray = screen.getAllByRole('listbox')

  expect(calendarArray[0].childElementCount).toBe(2)
  expect(calendarArray[1].childElementCount).toBe(2)
})

test('Test Calender Defaults', () => {
  const container = setup()
  const calendarArray = screen.getAllByRole('listbox')
  var currentDate = moment().format('YYYY-MM-DD')

  screen.getAllByDisplayValue(currentDate).forEach((calendar) => {
    expect(calendar).toHaveClass('MuiInputBase-input MuiInput-input')
  })

  expect(calendarArray[0]).toHaveTextContent('Display Services From')
  expect(calendarArray[1]).toHaveTextContent('Display Services To')
})

test('Test Calender Input', () => {
  const container = setup()
  const calendarArray = screen.getAllByRole('listbox')
  var currentDate = moment().format('YYYY-MM-DD')

  screen.getAllByDisplayValue(currentDate).forEach((calendar) => {
    expect(calendar).toHaveClass('MuiInputBase-input MuiInput-input')
  })

  expect(calendarArray[0]).toHaveTextContent('Display Services From')
  expect(calendarArray[1]).toHaveTextContent('Display Services To')
})
