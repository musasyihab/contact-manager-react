import { Platform } from 'react-native';
import { Actions } from 'react-native-router-flux';
import {
  LOAD_CONTACTS_SUCCESS,
  LOAD_CONTACTS_FAIL,
  CONTACT_CREATE,
  CONTACT_CREATE_SUCCESS,
  CONTACT_UPDATE,
  CONTACT_EDIT,
  CONTACT_ERROR,
  CONTACT_LOADING,
  FORM_RESET
} from './types';

const IP_ADDRESS = Platform.OS === 'android' ?  'http://10.0.2.2:3000' : 'http://localhost:3000';

export const loadContact = () => {
  return (dispatch) => {

    const host = IP_ADDRESS + '/contacts'
    const url = `${host}`
    let options = Object.assign({ method: 'get' }, null)
    options.headers = {
     'Accept': 'application/json',
     'Content-Type': 'application/json',
     'dataType': 'json'
    }
    console.log('loadContact() | call '+host);

    return fetch(url, options).then(resp => {
      let json = resp.json()
      if (resp.ok) {
       return json;
     }/* else {
       loadContactFail(dispatch);
     }*/
      return json.then(err => {
        console.log(err);
        loadContactFail(dispatch);
      })
    }).then(json => {
      if(json){
        console.log('json');
        console.log(json);
        loadContactSuccess(dispatch, json);
      }
    }).catch((error)=>{
      console.log(error);
      loadContactFail(dispatch);
    })

    /*
    axios.get('http://localhost:3000/contacts')
      .then(response => loadContactSuccess(dispatch, response))
      .catch((error) => {
        console.log(error);
        loadContactFail(dispatch);
      });*/

  };
};


const loadContactFail = (dispatch) => {
  dispatch({ type: LOAD_CONTACTS_FAIL });
};

const loadContactSuccess = (dispatch, contacts) => {
  console.log('ContactAction.js | loadContactSuccess');
  console.log(contacts);
  dispatch ({
    type: LOAD_CONTACTS_SUCCESS,
    payload: contacts
  });

};

export const contactUpdate = ({ prop, value }) => {
  return {
    type: CONTACT_UPDATE,
    payload: { prop, value }
  };
};

export const formReset = () => {
  return {
    type: FORM_RESET
  }
};

export const contactCreate = ({ firstName, lastName, age }) => {

  return (dispatch) => {

    contactLoading(dispatch, true);
    contactError(dispatch, '');

    const host = IP_ADDRESS + '/contacts'
    const url = `${host}`
    let options = Object.assign({ method: 'post' }, null)
    options.headers = {
     'Accept': 'application/json',
     'Content-Type': 'application/json',
     'dataType': 'json'
    }
    options.body = JSON.stringify({
      'firstName':firstName,
      'lastName':lastName,
      'age':age
    })
    return fetch(url, options).then(resp => {
      let json = resp.json()
      if (resp.ok) {
        return json;
      }
      return json.then(err => {
        contactLoading(dispatch, false);
        contactError(dispatch, 'Failed to create contact');
      })
    }).then(json => {
      console.log(json);
      if(json){
        contactLoading(dispatch, false);
        let con = {
          id: json.id,
          firstName: firstName,
          lastName: lastName,
          age: age
        }
        createContactSuccess(dispatch);
      }
    }).catch((error)=>{
      contactLoading(dispatch, false);
      contactError(dispatch, 'Failed to create contact');
    })

  };
};

const createContactSuccess = (dispatch) => {
  dispatch({
    type: CONTACT_CREATE_SUCCESS
  });

};

const contactError = (dispatch, error) => {
  dispatch({
    type: CONTACT_ERROR,
    error: error
  });

};

const contactLoading = (dispatch, loading) => {
  dispatch({
    type: CONTACT_LOADING,
    loading: loading
  });

};

const editContactSuccess = (dispatch) => {
  dispatch({
    type: CONTACT_CREATE_SUCCESS
  });

};

const deleteContactSuccess = (dispatch) => {
  dispatch({
    type: CONTACT_CREATE_SUCCESS
  });

};

export const contactEdit = ({ id, firstName, lastName, age }) => {

  return (dispatch) => {

    contactLoading(dispatch, true);
    contactError(dispatch, '');

    const host = IP_ADDRESS + '/contacts/'+id;
    const url = `${host}`
    let options = Object.assign({ method: 'put' }, null)
    options.headers = {
     'Accept': 'application/json',
     'Content-Type': 'application/json',
     'dataType': 'json'
    }
    options.body = JSON.stringify({
      'firstName':firstName,
      'lastName':lastName,
      'age':age
    })
    console.log(host);
    return fetch(url, options).then(resp => {
      if (resp.ok) {
        contactLoading(dispatch, false);
        editContactSuccess(dispatch);
        return;
      } else {
        contactLoading(dispatch, false);
        contactError(dispatch, 'Failed to edit contact');
        return;
      }
      /*
      return json.then(err => {
        console.log(err);
        //resetForm();
        //loadContactFail(dispatch);
      })
      */
    }).catch((error)=>{
      contactLoading(dispatch, false);
      contactError(dispatch, 'Failed to edit contact');
    })

  };
};

export const contactDelete = ({ id }) => {

  return (dispatch) => {

    contactLoading(dispatch, true);
    contactError(dispatch, '');

    const host = IP_ADDRESS + '/contacts/'+id;
    const url = `${host}`
    let options = Object.assign({ method: 'delete' }, null)
    options.headers = {
     'Accept': 'application/json',
     'Content-Type': 'application/json',
     'dataType': 'json'
    }
    console.log(host);
    return fetch(url, options).then(resp => {
      //let json = resp.json()
      if (resp.ok) {
        //loadContact();
        contactLoading(dispatch, false);
        deleteContactSuccess(dispatch);
        return;
      } else {
        contactLoading(dispatch, false);
        contactError(dispatch, 'Failed to delete contact');
        return;
      }
    }).catch((error)=>{
      contactLoading(dispatch, false);
      contactError(dispatch, 'Failed to delete contact');
    })

  };
};
