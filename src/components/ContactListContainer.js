import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { StyleSheet, View, Text, ListView, ActivityIndicator } from 'react-native';
import { loadContact, hideError } from '../actions';
import ContactList from './ContactList';
import { Spinner, ErrorToast } from './common';

class ContactListContainer extends Component {
  componentWillMount() {
    this.props.loadContact();

    this.createDataSource(this.props)
  }

  componentWillReceiveProps(nextProps) {
    // nextProps are the next set of props that this component
    // will be rendered with
    // this.props is still the old set of props
    console.log('componentWillReceiveProps');
    console.log(nextProps.contacts);
    console.log(this.props.contacts);
    if (_.isEqual(nextProps.contacts, this.props.contacts)) {
      console.log('componentWillReceiveProps 2');
      this.createDataSource(nextProps);
      this.props.loadContact();
    }
  }

  createDataSource({contacts}) {
    const ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2
    });

    this.dataSource = ds.cloneWithRows(contacts);
    //console.log(this.dataSource);
  }

  renderList() {

    if (this.props.loading) {
      return (
        <ActivityIndicator
          animating
          size="large"
        />
      );
    }

    return (
      <ContactList
        contacts={this.props.contacts}
      />
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
    //console.log('render()');
    //this.props.loadContact();
    return (
      <View style={this.props.loading && styles.loading}>
        {this.renderError()}
        {this.renderList()}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  loading: {
    position: 'absolute',
    left: 0,
    top: 0,
    right: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,.2)'
  }
});

const mapStateToProps = ({ contactReducer }) => {
  const { contacts, error, loading } = contactReducer;

  return { contacts, error, loading };
};

export default connect(mapStateToProps, { loadContact })(ContactListContainer);
