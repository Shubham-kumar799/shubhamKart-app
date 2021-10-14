import React from 'react';
import { StyleSheet , View  , Text , ScrollView} from 'react-native'
import { KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view'


import SearchListItem from './SearchListItem';


const SearchedProducts = ({productsFiltered})  => {

    
     return (
          <View style={styles.container}>
             <KeyboardAwareScrollView
          viewIsInsideTabBar={true}
        //   extremeHeight={200}
          enabledOnAndroid={true}
        >
              {
                  productsFiltered.length > 0 ? (
                      productsFiltered.map((item) => (
                          <SearchListItem key={item.name} name={item.name} image = {item.image} description={item.description} item={item}/>
                      ))
                  ) : <Text style={{alignSelf:"center"}}>No Products Match Your Search...</Text>
              }
              </KeyboardAwareScrollView>
          </View>
      );
}

const styles = StyleSheet.create({
   container: {
       flex: 1,
   }
})

export default SearchedProducts;