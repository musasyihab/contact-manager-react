import _ from 'lodash';
import React, { Component } from 'react';
import { View } from 'react-native';
import { connect } from 'react-redux';
import ContactForm from './ContactForm';
import { contactUpdate, contactEdit, contactDelete } from '../actions';
import { Card, CardSection, Button } from './common';
import { Actions } from 'react-native-router-flux';

class ContactEdit extends Component {
  componentWillMount() {
    _.each(this.props.contact, (value, prop) => {
      this.props.contactUpdate({ prop, value });
    });
  }

  onButtonSavePress() {
    const { id, firstName, lastName, age, success } = this.props;
    //console.log(firstName, lastName, age);
    this.props.contactEdit({ id, firstName, lastName, age }).then(()=>{
      if(this.props.success){
        Actions.contactList({ type: 'reset' });
      }
    });
  }

  onButtonDeletePress() {
    const { id } = this.props;
    //console.log(firstName, lastName, age);
    this.props.contactDelete({ id }).then(()=>{
      if(this.props.success){
        Actions.contactList({ type: 'reset' });
      }
    });
  }

  render() {
    return (
      <Card>
        <ContactForm />
        <CardSection>
          <Button onPress={this.onButtonSavePress.bind(this)}>
            Save Changes
          </Button>
          <Button onPress={this.onButtonDeletePress.bind(this)}>
            Delete Contact
          </Button>
        </CardSection>
      </Card>
    );
  }
}

const mapStateToProps = (state) => {
  console.log(state);
  const { id, firstName, lastName, age, success } = state.contactForm;

  return { id, firstName, lastName, age, success };
};

export default connect(mapStateToProps, { contactUpdate, contactEdit, contactDelete })(ContactEdit);
