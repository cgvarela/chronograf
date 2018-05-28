import React from 'react'
import {shallow} from 'enzyme'
import {Filter} from 'src/ifql/components/Filter'

jest.mock('src/ifql/apis', () => require('mocks/ifql/apis'))

const setup = (override = {}) => {
  const props = {
    argKey: 'fn',
    funcID: 'f1',
    bodyID: 'b1',
    declarationID: 'd1',
    value: '(r) => r["measurement"] === "m1"',
    onChangeArg: () => {},
    render: () => <div className="test-element" />,
    links: {
      self: '',
      ast: '',
      suggestions: '',
    },
    ...override,
  }

  const wrapper = shallow(<Filter {...props} />)

  return {
    wrapper,
    props,
  }
}

describe('IFQL.Components.Filter', () => {
  describe('rendering', () => {
    it('renders without errors', () => {
      const {wrapper} = setup()
      expect(wrapper.exists()).toBe(true)
    })
  })
})
