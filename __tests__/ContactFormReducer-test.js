import reducer from '../src/reducers/ContactFormReducer'
import * as types from '../src/actions/types'

describe('ContactFormReducer', () => {
  it('should return the initial state', () => {
    expect(
      reducer(undefined, {})
    ).toEqual(
      {
        id: '',
        firstName: '',
        lastName: '',
        age: '',
        success: false
      }
    )
  })

  it('should handle CONTACT_UPDATE', () => {
    expect(
      reducer({"firstName":"John"}, {
        type: types.CONTACT_UPDATE,
        payload: {"firstName":"John"}
      })
    ).toEqual(
      {
        firstName: "John"
      }
    )
  })

  it('should handle CONTACT_CREATE', () => {
    expect(
      reducer([], {
        type: types.CONTACT_CREATE
      })
    ).toEqual(
      {
        id: '',
        firstName: '',
        lastName: '',
        age: '',
        success: false
      }
    )
  })

  it('should handle CONTACT_CREATE_SUCCESS', () => {
    expect(
      reducer([], {
        type: types.CONTACT_CREATE_SUCCESS
      })
    ).toEqual(
      {
        success: true
      }
    )
  })

  it('should handle CONTACT_EDIT', () => {
    expect(
      reducer([], {
        type: types.CONTACT_EDIT
      })
    ).toEqual(
      {
        id: '',
        firstName: '',
        lastName: '',
        age: '',
        success: false
      }
    )
  })

  it('should handle FORM_RESET', () => {
    expect(
      reducer([], {
        type: types.FORM_RESET
      })
    ).toEqual(
      {
        id: '',
        firstName: '',
        lastName: '',
        age: '',
        success: false
      }
    )
  })

})
