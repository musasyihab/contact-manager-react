import React, { Component } from 'react';
import { Picker, Text } from 'react-native';
import { connect } from 'react-redux';
import { contactDetail } from '../actions';
import { Card, CardSection, Input, Button } from './common';

class ContactDetail extends Component {
  /*
  onButtonPress() {
    const { firstName, lastName, age } = this.props;

    this.props.contactCreate({ firstName, lastName, age });
  }
  */

  render() {
    return (
      <Card>
        <CardSection>
          <Input
            label="First Name"
            placeholder="First Name"
            value={this.props.contact.firstName}

          />
        </CardSection>

        <CardSection>
          <Input
            label="Last Name"
            placeholder="Last Name"
            value={this.props.contact.lastName}

          />
        </CardSection>

        <CardSection>
          <Input
            label="Age"
            placeholder="Age"
            value={this.props.contact.age}

          />
        </CardSection>


        <CardSection>
          <Button>
            Save
          </Button>
        </CardSection>
      </Card>
    );
  }
}

const mapStateToProps = (state) => {
  console.log(state);
  const { firstName, lastName, age } = state.contact;

  return { firstName, lastName, age };
};

export default connect(mapStateToProps, {
  contactDetail
})(ContactDetail);
