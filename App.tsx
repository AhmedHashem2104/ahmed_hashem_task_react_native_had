import {ScrollView, StyleSheet, View} from 'react-native';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Home from './src/screens/Home';
import Movies from './src/screens/Movies';
import {constants} from './src/utils/constants';

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <View style={styles.container}>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="Home"
          screenOptions={{
            statusBarTranslucent: true,
            statusBarStyle: 'inverted',
            statusBarColor: 'transparent',
            headerShown: false,
          }}>
          <Stack.Screen name="Home" component={Home} />
          <Stack.Screen
            name="Movies"
            component={Movies}
            options={({route}: any) => ({
              statusBarColor: constants.primary,
              statusBarTranslucent: false,
              headerShown: true,
              headerStyle: {
                backgroundColor: constants.primary,
              },
              headerTintColor: 'white', // To make the back button white
              headerTitle: String(route.params?.genre?.name), // To hide the header title
            })}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </View>
  );
};

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
