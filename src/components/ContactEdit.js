import _ from 'lodash';
import React, { Component } from 'react';
import { StyleSheet, View, ActivityIndicator } from 'react-native';
import { connect } from 'react-redux';
import ContactForm from './ContactForm';
import { contactUpdate, contactEdit, contactDelete } from '../actions';
import { Card, CardSection, Button, ErrorToast } from './common';
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
      if(this.props.error === ''){
        Actions.contactList({ type: 'reset' });
      }
    });
  }

  onButtonDeletePress() {
    const { id } = this.props;
    //console.log(firstName, lastName, age);
    this.props.contactDelete({ id }).then(()=>{
      if(this.props.error === ''){
        Actions.contactList({ type: 'reset' });
      }
    });
  }

  renderLoading() {
    if (this.props.loading) {
      return (
        <View style={styles.loading}>
          <ActivityIndicator
            animating
            size="large"
          />
        </View>
      );
    } else {
      return (
        <View></View>
      )
    }
  }

  renderForm() {
    return (
      <View>
        {this.renderError()}
        <Card>
          <ContactForm {...this.props} />
          <CardSection>
            <Button onPress={this.onButtonSavePress.bind(this)}>
              Save Changes
            </Button>
            <Button onPress={this.onButtonDeletePress.bind(this)}>
              Delete Contact
            </Button>
          </CardSection>
        </Card>
      </View>
    );
  }

  renderError() {
    if (this.props.error !== '') {
      return (
        <ErrorToast>{this.props.error}</ErrorToast>
      );
    }
  }

  render() {
    return (
      <View style={{flex:1}}>
        {this.renderLoading()}
        {this.renderForm()}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  loading: {
    position: 'absolute',
    zIndex: 100,
    elevation: 1,
    left: 0,
    top: 0,
    right: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,.2)'
  }
});

const mapStateToProps = (state) => {
  console.log(state);
  const { id, firstName, lastName, age, success, error, loading } = state.contactForm;

  return { id, firstName, lastName, age, success, error, loading };
};

export default connect(mapStateToProps, { contactUpdate, contactEdit, contactDelete })(ContactEdit);
