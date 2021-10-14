import React from 'react';
import { StyleSheet , View , Text } from 'react-native'
import colors from '../config/colors';

const Error = ({message}) => {
     return (
          <View style={styles.container}>
              <Text style={styles.text}>{message}</Text>
          </View>
      );
}

const styles = StyleSheet.create({
   container: {
       width: '100%',
       alignItems:"center",
       justifyContent:"center",
       margin: 15,
   },
   text: {
       color: colors.danger
   }
})

export default Error;