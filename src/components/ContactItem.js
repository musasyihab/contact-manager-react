import React, { Component } from 'react';
import { Actions } from 'react-native-router-flux';
import {
  Text,
  View,
  TouchableWithoutFeedback
} from 'react-native';
import { connect } from 'react-redux';
import { Card, CardSection } from './common';
import * as actions from '../actions';

class ContactItem extends Component {

  onRowPress() {
    //console.log(this.props.contact);
    //this.props.contactDetail({contact: this.props.contact});
    Actions.contactEdit({contact: this.props.contact});
  }

  render() {
    const {
      headerContentStyle,
      headerTextStyle
    } = styles;

    const { id, firstName, lastName, age } = this.props.contact;

    return (
      <TouchableWithoutFeedback onPress={this.onRowPress.bind(this)}>
        <View>
          <Card>
            <CardSection>
              <View style={headerContentStyle}>
                <Text style={headerTextStyle}>{firstName} {lastName}</Text>
                <Text>{age} years old</Text>
              </View>
            </CardSection>
          </Card>
        </View>
      </TouchableWithoutFeedback>

    );
  }
}

const styles = {
  headerContentStyle: {
    flexDirection: 'column',
    justifyContent: 'space-around'
  },
  headerTextStyle: {
    fontSize: 18
  }
};

/*const mapStateToProps = (state, ownProps) => {
  const expanded = state.selectedLibraryId === ownProps.library.id;

  return { expanded };
};*/

export default connect(null, actions)(ContactItem);
