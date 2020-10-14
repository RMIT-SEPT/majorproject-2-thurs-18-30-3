import React from 'react'

import ServiceCard from '../components/ServiceCard'
import {StaticRouter} from 'react-router'
import renderer from 'react-test-renderer'
import {render, screen, fireEvent} from '@testing-library/react'

import '@testing-library/jest-dom/extend-expect'

//Snapshot test
test('Test Card Renders', () => {
  const dummyService = {id: 1, name: 'test', description: 'this is a test', photo: "iPhone12.jpg" }

  const card = renderer
    .create(
      <StaticRouter>
        <ServiceCard service={dummyService} />
      </StaticRouter>
    )
    .toJSON()
  expect(card).toMatchSnapshot()
})

//Check that card displays desired content
test('Test Card Contents', () => {
  const dummyService = {id: 1, name: 'TEST BUTTON', description: 'this is a test',photo: "iPhone12.jpg"}
  const container = render(
    <StaticRouter>
      <ServiceCard service={dummyService} />
    </StaticRouter>
  )

  expect(screen.getByRole('cell')).toHaveTextContent('this is a test')
  expect(screen.getByRole('img')).toHaveAttribute('src', "https://sept-bucket-2020.s3-ap-southeast-2.amazonaws.com/iPhone12.jpg")
})


//Test that click does not change card
test('Test Card On Click', () => {
  const dummyService = {id: 1, name: 'TEST BUTTON', body: 'this is a test'}
  const container = render(
    <StaticRouter>
      <ServiceCard service={dummyService} />
    </StaticRouter>
  )

  fireEvent.click(screen.getByRole('cell'))
  expect(container).toMatchSnapshot()
})
