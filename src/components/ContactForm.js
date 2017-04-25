import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { connect } from 'react-redux';
import { contactUpdate } from '../actions';
import { CardSection, Input } from './common';

class ContactForm extends Component {
  render() {
    return (
      <View>
        <CardSection>
          <Input
            label="First Name"
            placeholder="John"
            value={this.props.firstName}
            onChangeText={value => this.props.contactUpdate({ prop: 'firstName', value })}
          />
        </CardSection>

        <CardSection>
          <Input
            label="Last Name"
            placeholder="Doe"
            value={this.props.lastName}
            onChangeText={value => this.props.contactUpdate({ prop: 'lastName', value })}
          />
        </CardSection>

        <CardSection>
          <Input
            label="Age"
            placeholder="17"
            keyboardType='numeric'
            value={this.props.age + ''}
            onChangeText={value => this.props.contactUpdate({ prop: 'age', value })}
          />
        </CardSection>
      </View>
    );
  }
}

const mapStateToProps = (state) => {
  const { firstName, lastName, age } = state.contactForm;

  return { firstName, lastName, age };
};

export default connect(mapStateToProps, { contactUpdate })(ContactForm);
