import React  from 'react';
import { StyleSheet , View , Text ,  TouchableWithoutFeedback  } from 'react-native'

import colors from '../config/colors';

const CategoryBadge = ({name  , active, setActive , categoryFilter , index}) => {


     return (
         <TouchableWithoutFeedback onPress={() => {
             setActive()
             categoryFilter()
            }}
            >
          <View style={active == index ? styles.active : styles.inactive}>
              <Text style={active == index ? styles.activeText : styles.inactiveText}>{name}</Text>
          </View>
          </TouchableWithoutFeedback>
      );
}

const styles = StyleSheet.create({
   active: {
       margin: 7,
       padding: 7,
       borderWidth: 1,
       borderRadius: 20,
       borderColor: colors.white , 
       backgroundColor: colors.secondary,
       color: colors.white

   },
   inactive: {
    margin: 7,
    padding: 7,
    borderWidth: 1,
    borderRadius: 20,
    backgroundColor: colors.white,
    color: colors.dark,
    borderColor: colors.dark,
   },
   activeText: {
       fontSize:16,
       color: colors.white
   },
   inactiveText: {
    fontSize:16,
    color: colors.dark
}
})

export default CategoryBadge;