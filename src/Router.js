import React from 'react';
import { Scene, Router, Actions } from 'react-native-router-flux';
import ContactList from './components/ContactList';
import ContactCreate from './components/ContactCreate';
import ContactEdit from './components/ContactEdit';

const RouterComponent = () => {
  return (
    <Router sceneStyle={{ paddingTop: 65 }}>
      <Scene
        key="contactList"
        component={ContactList}
        title="Contact List"
        onRight={() => Actions.contactCreate()}
        rightTitle="Add"
        initial
      />
      <Scene key="contactCreate" component={ContactCreate} title="Create Contact" />
      <Scene key="contactEdit" component={ContactEdit} title="Edit Contact" />
    </Router>
  );
};

export default RouterComponent;
