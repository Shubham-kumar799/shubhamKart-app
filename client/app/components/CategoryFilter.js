import React from 'react';
import { StyleSheet , View , ScrollView } from 'react-native'

import colors from '../config/colors';
import CategoryBadge from './CategoryBadge';

const CategoryFilter = ({productsCategories ,  categoryFilter , setActive , active}) => {
     return (
         <ScrollView
            bounces
            horizontal
            style={styles.scrollView}
            showsHorizontalScrollIndicator={false}
         >
          <View style={styles.container}>
              <CategoryBadge 
                name="All" 
                active={active} 
                setActive={() => setActive(-1)} 
                categoryFilter={() => categoryFilter('all')} 
                index={-1} 
            />
              {
                  productsCategories.map((category) => {
                    //   console.log(category._id)
                      return (
                    <CategoryBadge 
                        key={category.name} 
                        name={category.name} 
                        active={active} 
                        setActive={() => setActive(productsCategories.indexOf(category))} 
                        index = {productsCategories.indexOf(category) }
                        categoryFilter={() => categoryFilter(category._id)} 
                    />)})
              }
          </View>
          </ScrollView>
      );
}

const styles = StyleSheet.create({
   container: {
       flexDirection: 'row',
       alignItems:'center',
       height: 80
    // padding: 20
   }
})

export default CategoryFilter;