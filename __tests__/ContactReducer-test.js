import reducer from '../src/reducers/ContactReducer'
import * as types from '../src/actions/types'

describe('ContactReducer', () => {
  it('should return the initial state', () => {
    expect(
      reducer(undefined, {})
    ).toEqual(
      {
        contacts: [],
        error: '',
        loading: true
      }
    )
  })

  it('should handle LOAD_CONTACTS_SUCCESS', () => {
    expect(
      reducer([], {
        type: types.LOAD_CONTACTS_SUCCESS,
        payload: []
      })
    ).toEqual(
      {
        contacts: [],
        error: '',
        loading: false
      }
    )
  })

  it('should handle LOAD_CONTACTS_SUCCESS', () => {
    expect(
      reducer([], {
        type: types.LOAD_CONTACTS_FAIL
      })
    ).toEqual(
      {
        error: 'Load Contact Failed.',
        loading: false
      }
    )
  })

})
