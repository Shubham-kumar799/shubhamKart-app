import React from 'react';
import { StyleSheet , View , TextInput } from 'react-native'

import colors from '../../config/colors'

const FormInput = ({
    placeholder ,
    name,
    id , 
    value ,
    autoCorrect ,
    onChangeText ,
    onFocus,
    keyboardType ,
    secureTextEntry ,
}) => {
     return (
          <TextInput
            style={styles.container}
            placeholder={placeholder}
            name={name}
            id={id}
            value={value}
            autoCorrect={autoCorrect}
            onChangeText={onChangeText}
            onFocus={onFocus}
            secureTextEntry={secureTextEntry}
            keyboardType={keyboardType}
          >

          </TextInput>
      );
}

const styles = StyleSheet.create({
   container: {
       width: '80%',
       height: 60,
       backgroundColor: colors.white,
       margin: 10,
       borderRadius: 20,
       padding: 10,
       borderWidth: 2,
       borderColor: colors.secondary
   }
})

export default FormInput;