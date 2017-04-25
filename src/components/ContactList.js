import React, { Component } from 'react';
import { connect } from 'react-redux';
import { StyleSheet, View, Text, ListView, ActivityIndicator } from 'react-native';
import { loadContact, hideError } from '../actions';
import ContactItem from './ContactItem';
import { Spinner, ErrorToast } from './common';

class ContactList extends Component {
  componentWillMount() {
    this.props.loadContact();

    this.createDataSource(this.props)
    /*
    this.props.loadContact().then(resp => {
      console.log(resp);
      console.log(this.props);

      this.createDataSource(resp);
    });*/

    // const { contacts: [] } = this.props;
    //
    // console.log("1+ "+this.props);

    // this.createDataSource(contacts);
  }

  componentWillReceiveProps(nextProps) {
    // nextProps are the next set of props that this component
    // will be rendered with
    // this.props is still the old set of props

    this.createDataSource(nextProps);
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
      <ListView
        enableEmptySections
        dataSource={this.dataSource}
        renderRow={this.renderRow}
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

  renderRow(contact) {
    return <ContactItem contact={contact} />;
  }

  render() {
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

export default connect(mapStateToProps, { loadContact })(ContactList);
