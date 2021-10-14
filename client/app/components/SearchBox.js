import React , {useState} from 'react';
import { StyleSheet , View , TextInput, SegmentedControlIOSComponent } from 'react-native'

import colors from '../config/colors';
import { AntDesign } from '@expo/vector-icons';

function SearchBox({onFocus , onChangeText , onBlur}) {

    const [textValue , setTextValue] = useState()
    const [icon , setIcon] = useState(false);

    const handlePress= () => {
        setTextValue('')
        setIcon(false)
        onBlur()
    }

    const handleChangeText = (text) => {
        setIcon(true)
        setTextValue(text);
        onChangeText(text)
    }

     return (
          <View style={styles.container}>
              <TextInput
                style={styles.textInput}
                placeholder="Type here to search.."
                placeholderTextColor="white"
                onChangeText={(text) => handleChangeText(text)}
                value={textValue}
              />
              {
                  icon && <AntDesign name="closecircle" size={24} color={colors.white} onPress={handlePress}/>
              }
              
          </View>
      );
}

const styles = StyleSheet.create({
   container: {
        margin: 10,
        borderRadius: 10,
        backgroundColor: colors.secondary ,
        height: 50,
        padding: 10,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row'
   },
   textInput: {
       flex: 1,
       color: 'white',
       textAlign: 'center',
       marginRight: 10
   }
})

export default SearchBox;