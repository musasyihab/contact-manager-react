import 'isomorphic-fetch';
import * as actions from '../src/actions/ContactAction'
import * as types from '../src/actions/types'
//import { Actions } from 'react-native-router-flux';

import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import nock from 'nock'
import expect from 'expect' // You can use any testing library

const middlewares = [ thunk ]
const mockStore = configureMockStore(middlewares)

const IP_ADDRESS = 'http://localhost:3000';

//jest.dontMock('Actions');

describe('Contact Actions syncronous', () => {
  it('should create an action to reset form', () => {
    const expectedAction = {
      type: types.FORM_RESET
    }
    expect(actions.formReset()).toEqual(expectedAction)
  })

  it('should create an action to update contact form', () => {
    const expectedAction = {
      type: types.CONTACT_UPDATE,
      payload: { prop: 'firstName', value: 'John' }
    }
    expect(actions.contactUpdate({ prop: 'firstName', value: 'John' })).toEqual(expectedAction)
  })
})

describe('Contact Actions asyncronous', () => {
  afterEach(() => {
    nock.cleanAll()
  })

  it('creates LOAD_CONTACTS_SUCCESS when load contacts has been done', () => {
    nock(IP_ADDRESS)
      .get('/contacts')
      .reply(200, { body: [] })

    const expectedActions = [
      { type: types.LOAD_CONTACTS_SUCCESS, payload: { body: [] } }
    ]
    const store = mockStore({ contacts: [] })

    return store.dispatch(actions.loadContact())
      .then(() => { // return of async actions
        expect(store.getActions()).toEqual(expectedActions)
      })
  })

  it('creates LOAD_CONTACTS_FAIL when load contacts has failed', () => {
    nock(IP_ADDRESS)
      .get('/contacts')
      .reply(404, {} )

    const expectedActions = [
      { type: types.LOAD_CONTACTS_FAIL }
    ]
    const store = mockStore({ contacts: [] })

    return store.dispatch(actions.loadContact())
      .then(() => { // return of async actions
        expect(store.getActions()).toEqual(expectedActions)
      })
  })


  it('get id when create contacts has been done', () => {
    nock(IP_ADDRESS)
      .post('/contacts', {
        firstName: 'John',
        lastName: 'Doe',
        age: 21
      })
      .reply(200, { body: {id: '123'} })

    const expectedActions = [
      { type: types.CONTACT_LOADING, loading: true },
      { type: types.CONTACT_ERROR, error: '' },
      { type: types.CONTACT_LOADING, loading: false },
      { type: types.CONTACT_CREATE_SUCCESS }
    ]
    const store = mockStore({ contacts: [] })

    return store.dispatch(actions.contactCreate({ firstName: 'John', lastName: 'Doe', age: 21 }))
      .then(() => { // return of async actions
        expect(store.getActions()).toEqual(expectedActions)
      })
  })

  it('get id when create contacts has failed', () => {
    nock(IP_ADDRESS)
      .post('/contacts', {
        firstName: 'John',
        lastName: 'Doe',
        age: 21
      })
      .reply(404, {})

    const expectedActions = [
      { type: types.CONTACT_LOADING, loading: true },
      { type: types.CONTACT_ERROR, error: '' },
      { type: types.CONTACT_LOADING, loading: false },
      { type: types.CONTACT_ERROR, error: 'Failed to create contact' }
    ]
    const store = mockStore({ contacts: [] })

    return store.dispatch(actions.contactCreate({ firstName: 'John', lastName: 'Doe', age: 21 }))
      .then(() => { // return of async actions
        expect(store.getActions()).toEqual(expectedActions)
      })
  })

  it('get response when update contacts has been done', () => {
    nock(IP_ADDRESS)
      .put('/contacts/123', {
        firstName: 'John',
        lastName: 'Doe',
        age: 21
      })
      .reply(200, {} )

    const expectedActions = [
      { type: types.CONTACT_LOADING, loading: true },
      { type: types.CONTACT_ERROR, error: '' },
      { type: types.CONTACT_LOADING, loading: false },
      { type: types.CONTACT_CREATE_SUCCESS }
    ]
    const store = mockStore({ contacts: [] })

    return store.dispatch(actions.contactEdit({ id: 123, firstName: 'John', lastName: 'Doe', age: 21 }))
      .then(() => { // return of async actions
        expect(store.getActions()).toEqual(expectedActions)
      })
  })

  it('get response when update contacts has failed', () => {
    nock(IP_ADDRESS)
      .put('/contacts/123', {
        firstName: 'John',
        lastName: 'Doe',
        age: 21
      })
      .reply(404, {} )

    const expectedActions = [
      { type: types.CONTACT_LOADING, loading: true },
      { type: types.CONTACT_ERROR, error: '' },
      { type: types.CONTACT_LOADING, loading: false },
      { type: types.CONTACT_ERROR, error: 'Failed to edit contact' }
    ]
    const store = mockStore({ contacts: [] })

    return store.dispatch(actions.contactEdit({ id: 123, firstName: 'John', lastName: 'Doe', age: 21 }))
      .then(() => { // return of async actions
        expect(store.getActions()).toEqual(expectedActions)
      })
  })

  it('get response when delete contacts has been done', () => {
    nock(IP_ADDRESS)
      .delete('/contacts/123')
      .reply(200, {} )

    const expectedActions = [
      { type: types.CONTACT_LOADING, loading: true },
      { type: types.CONTACT_ERROR, error: '' },
      { type: types.CONTACT_LOADING, loading: false },
      { type: types.CONTACT_CREATE_SUCCESS }
    ]
    const store = mockStore({ contacts: [] })

    return store.dispatch(actions.contactDelete({ id: 123 }))
      .then(() => { // return of async actions
        expect(store.getActions()).toEqual(expectedActions)
      })
  })

  it('get response when delete contacts has failed', () => {
    nock(IP_ADDRESS)
      .delete('/contacts/123')
      .reply(404, {} )

    const expectedActions = [
      { type: types.CONTACT_LOADING, loading: true },
      { type: types.CONTACT_ERROR, error: '' },
      { type: types.CONTACT_LOADING, loading: false },
      { type: types.CONTACT_ERROR, error: 'Failed to delete contact' }
    ]
    const store = mockStore({ contacts: [] })

    return store.dispatch(actions.contactDelete({ id: 123 }))
      .then(() => { // return of async actions
        expect(store.getActions()).toEqual(expectedActions)
      })
  })

})
