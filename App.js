import { useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import ChatScreens from './src/screens/ChatsScreen/ChatScreens';
import ChatScreen from './src/screens/ChatScreen/ChatScreen';
import Navigator from './src/navigation';
import { Amplify, Auth, API, graphqlOperation } from 'aws-amplify';
import { withAuthenticator } from 'aws-amplify-react-native';
import awsconfig from './src/aws-exports';
import { getUser } from './src/graphql/queries';
import { createUser } from './src/graphql/mutations';

Amplify.configure({...awsconfig, Analytics: { disabled: true }});

function App() {

  useEffect(() => {
    const syncUser = async () => {
      // Get Auth User
      const authUser = await Auth.currentAuthenticatedUser({bypassCache: true});
      // Query DB using Auth user id (sub)
      const userData = await API.graphql(graphqlOperation(getUser, { id: authUser.attributes.sub }));
      console.log(userData);

      if(userData.data.getUser) {
        console.log("User already exists in DB");
        return;
      }

      // if no users in DB, create one
      const newUser = {
        id: authUser.attributes.sub,
        name: authUser.attributes.phone_number,
        status: "Hey, I am using Andrea",
      };
      const newUserResponse = await API.graphql(
        graphqlOperation(createUser, {  input: newUser })
      );
    };
    syncUser();
  }, []);

  return (
    <View style={styles.container}>
      <Navigator />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'whitesmoke',
    justifyContent: 'center',
  },
});

export default withAuthenticator(App);
