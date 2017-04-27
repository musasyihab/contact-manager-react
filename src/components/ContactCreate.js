import React, { Component } from 'react';
import { StyleSheet, View, ActivityIndicator } from 'react-native';
import { connect } from 'react-redux';
import { contactCreate, formReset, createContactSuccess } from '../actions';
import { Card, CardSection, Button, ErrorToast } from './common';
import ContactForm from './ContactForm';
import { Actions } from 'react-native-router-flux';

class ContactCreate extends Component {
  onButtonPress() {
    const { firstName, lastName, age, success } = this.props;
    this.props.contactCreate({ firstName, lastName, age }).then(()=>{
      if(this.props.success){
        Actions.contactList({ type: 'reset' });
        //Actions.pop();
      }
    });
  }

  componentWillMount() {
    this.props.formReset();
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
            <Button onPress={this.onButtonPress.bind(this)}>
              Create
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
  const { firstName, lastName, age, success, error, loading } = state.contactForm;

  return { firstName, lastName, age, success, error, loading };
};

export default connect(mapStateToProps, {
  contactCreate, formReset, createContactSuccess
})(ContactCreate);
