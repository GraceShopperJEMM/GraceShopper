/* global describe beforeEach afterEach it localStorage */

import {expect} from 'chai'
import {me, logout} from './user'
import {getCartFromServer, populateGuestCart} from './cartState'
import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'
import configureMockStore from 'redux-mock-store'
import thunkMiddleware from 'redux-thunk'
import history from '../history'
import {assert, mock, spy, stub} from 'sinon'

// const functionWrapper = {populateGuestCart}

const middlewares = [thunkMiddleware]
const mockStore = configureMockStore(middlewares)
// stub(functionWrapper, 'populateGuestCart').returns({})

// const userDispatchSpy = spy(getUser)

// const guestCartStub = stub(functionsToTest, 'populateGuestCart')
// const userCartSpy = spy(functionsToTest, 'getCartFromServer')

describe('me()', function() {
  const initialState = {
    user: {},
    cart: {}
  }
  let store
  let mockAxios

  beforeEach(() => {
    store = mockStore(initialState)
    mockAxios = new MockAdapter(axios)
  })

  afterEach(() => {
    mockAxios.restore()
    store.clearActions()
  })

  it('dispatches GET_USER action', async function() {
    const fakeUser = {email: '123@456.com', id: 1}
    const fakeCart = {productOrders: ['5']}
    mockAxios.onGet('/api/users/1/cart').replyOnce(200, fakeCart)
    mockAxios.onGet('/auth/me').replyOnce(200, fakeUser)
    mockAxios.onGet('/api/users/1/cart').replyOnce(200, fakeCart)

    await store.dispatch(me())
    const actions = store.getActions()
    expect(actions[0].type).to.be.equal('GET_USER')
    expect(actions[0].user).to.be.deep.equal(fakeUser)
  })

  it('populates the cart with user cart', async function() {
    const fakeCart = {productOrders: ['5']}
    mockAxios.onGet('/api/users/1/cart').replyOnce(200, fakeCart)
    await store.dispatch(getCartFromServer(1))
    const actions = store.getActions()
    expect(actions[0].type).to.be.equal('GET_CART')
    expect(actions[0].cart).to.be.deep.equal(fakeCart)
  })
})

// describe('thunk creators', () => {
//   let store
//   let mockAxios

//   const initialState = {user: {}}

// beforeEach(() => {
//   mockAxios = new MockAdapter(axios)
//   store = mockStore(initialState)
// })

//   afterEach(() => {
//     mockAxios.restore()
//     store.clearActions()
//   })

//   describe('me', () => {
//     it('eventually dispatches the GET USER action', async () => {
//       const fakeUser = {email: 'Cody', id: 1}
//       mockAxios.onGet('/auth/me').replyOnce(200, fakeUser)
//       await store.dispatch(me())
//       const actions = store.getActions()
//       expect(actions[0].type).to.be.equal('GET_USER')
//       expect(actions[0].user).to.be.deep.equal(fakeUser)
//     })
//   })

// describe('logout', () => {
//   const initialState = {
//     user: {},
//     cart: {}
//   }
//   let store
//   let mockAxios

//   beforeEach(() => {
//     store = mockStore(initialState)
//     mockAxios = new MockAdapter(axios)
//   })

//   afterEach(() => {
//     mockAxios.restore()
//     store.clearActions()
//   })

//   it('logout: eventually dispatches the REMOVE_USER action', async () => {
//     mockAxios.onPost('/auth/logout').replyOnce(204)
//     await store.dispatch(logout())
//     console.log('history path:',history.location.pathname)
//     const actions = store.getActions()
//     expect(actions[0].type).to.be.equal('REMOVE_USER')
//     expect(history.location.pathname).to.be.equal('/login')
//   })
// })
