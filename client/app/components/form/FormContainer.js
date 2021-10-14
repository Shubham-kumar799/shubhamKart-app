import React from 'react';
import { StyleSheet , View , Text , ScrollView , Dimensions } from 'react-native'
import colors from '../../config/colors';

import Screen from '../Screen'

const {width} = Dimensions.get('window')

const FormContainer = ({title, children}) => {
     return (
          <ScrollView
            contentContainerStyle={styles.container}
          >
              <Text style={styles.text}>{title}</Text>
{children}
          </ScrollView>
      );
}

const styles = StyleSheet.create({
   container: {
       marginTop: 30,
       marginBottom: 20,
       width: width,
       justifyContent: 'center',
       alignItems:"center"
   },
   text: {
     color  : colors.dark,
     fontWeight: 'bold',
     fontSize: 24,
   }
})

export default FormContainer;