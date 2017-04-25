import React, { Component } from 'react';
import { View } from 'react-native';
import { connect } from 'react-redux';
import { contactCreate, formReset, createContactSuccess } from '../actions';
import { Card, CardSection, Button } from './common';
import ContactForm from './ContactForm';
import { Actions } from 'react-native-router-flux';

class ContactCreate extends Component {
  onButtonPress() {
    const { firstName, lastName, age, success } = this.props;
    this.props.contactCreate({ firstName, lastName, age }).then(()=>{
      if(this.props.success){
        Actions.contactList({ type: 'reset' });
      }
    });
  }

  componentWillMount() {
    this.props.formReset();
  }

  render() {
    return (
      <Card>
        <ContactForm {...this.props} />
        <CardSection>
          <Button onPress={this.onButtonPress.bind(this)}>
            Create
          </Button>
        </CardSection>
      </Card>
    );
  }
}

const mapStateToProps = (state) => {
  const { firstName, lastName, age, success } = state.contactForm;

  return { firstName, lastName, age, success };
};

export default connect(mapStateToProps, {
  contactCreate, formReset, createContactSuccess
})(ContactCreate);
