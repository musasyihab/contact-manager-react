import React, { Component } from 'react';
import { View, ListView } from 'react-native';
import ContactItem from './ContactItem';

class ContactList extends Component {

  componentWillMount() {
    this.createDataSource(this.props);
  }

  componentWillReceiveProps(nextProps) {
    this.createDataSource(nextProps);
  }

  createDataSource({contacts}) {
    const ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2
    });

    this.dataSource = ds.cloneWithRows(contacts);
    //console.log(this.dataSource);
  }

  renderRow(contact) {
    return <ContactItem contact={contact} />;
  }

  render() {
    return (
      <View>
        <ListView
          enableEmptySections
          dataSource={this.dataSource}
          renderRow={this.renderRow}
        />
      </View>
    );
  }
}

export default ContactList;
