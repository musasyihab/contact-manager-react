import axios from 'axios';
import { Actions } from 'react-native-router-flux';
import {
  LOAD_CONTACTS_SUCCESS,
  LOAD_CONTACTS_FAIL,
  CONTACT_CREATE,
  CONTACT_CREATE_SUCCESS,
  CONTACT_UPDATE,
  CONTACT_EDIT,
  FORM_RESET
} from './types';

const IP_ADDRESS = 'http://localhost:3000'

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
    console.log('call '+host);

    return fetch(url, options).then(resp => {
      let json = resp.json()
      if (resp.ok) {
       return json;
      } else {
       loadContactFail(dispatch);
      }
      /*
      return json.then(err => {
        console.log(err);
        loadContactFail(dispatch);
      })
      */
    }).then(json => {
      console.log(json);
      loadContactSuccess(dispatch, json);
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
  dispatch({
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
        console.log(err);
      })
    }).then(json => {
      console.log(json);
      createContactSuccess(dispatch, json);
    })

  };
};

const createContactSuccess = (dispatch, json) => {
  dispatch({
    type: CONTACT_CREATE_SUCCESS,
    payload: json
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
        editContactSuccess(dispatch);
        return;
      }
      /*
      return json.then(err => {
        console.log(err);
        //resetForm();
        //loadContactFail(dispatch);
      })
      */
    })

  };
};

export const contactDelete = ({ id }) => {

  return (dispatch) => {

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
        deleteContactSuccess(dispatch);
        return;
      }
      /*
      return json.then(err => {
        console.log(err);
        //resetForm();
        //loadContactFail(dispatch);
      })
      */
    })

  };
};
