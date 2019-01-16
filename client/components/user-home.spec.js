/* global describe beforeEach it */

import {expect} from 'chai'
import React from 'react'
import enzyme, {shallow} from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import UserForm from './UserForm'
import {Input} from '@material-ui/core'

const adapter = new Adapter()
enzyme.configure({adapter})

describe('Edit User Form', () => {
  let userForm
  beforeEach(() => {
    userForm = shallow(<UserForm name="Cody" email="cody@email.com" />)
  })

  it("pre-populates the form's inputs with user's name and email", () => {
    expect(
      userForm
        .find(Input)
        .at(0)
        .prop('value')
    ).to.equal('Cody')
    expect(
      userForm
        .find(Input)
        .at(1)
        .prop('value')
    ).to.equal('cody@email.com')
  })
})
