import React , { useState , useEffect , useCallback } from 'react';
import { StyleSheet , View ,  FlatList , Text , ActivityIndicator } from 'react-native'
import colors from '../config/colors';

import { useFocusEffect } from '@react-navigation/core';
import axios from 'axios';
import Banner from './Banner';
import CategoryFilter from './CategoryFilter';
import ProductCard from './ProductCard';
import SearchBox from './SearchBox';
import SearchedProducts from './SearchedProducts';
import baseURL from '../api/baseURL'



const ProductContainer = () => {

    const [products, setProducts] = useState([])
    const [initialState, setInitialState] = useState([])
    const [productsFiltered , setProductsFiltered] = useState([])
    const [focus , setFocus] = useState()
    const [categories , setCategories] = useState([]);
    const [active, setActive] = useState();
    const [loading , setLoading] = useState(true)



    useFocusEffect((
        useCallback(
          () => {
            setFocus(false);
            setActive(-1);
            
             // Fetching products
        axios.get(`${baseURL}products`).then((res) =>{
            setProducts(res.data)
            setProductsFiltered(res.data)
            setInitialState(res.data)
            setLoading(false)
        }).catch((error) => {
            console.log(error)
            console.log("Error fetching products")
        })
        
            // Fetching categories
        axios.get(`${baseURL}categories`).then((res) =>{
            setCategories(res.data)
        }).catch((error) => {
            console.log(error)
            console.log("Error fetching categories")
        })
        
              return () => {
                setProducts([])
                setProductsFiltered([])
                setFocus()
                setCategories([])
                setActive()
            }
          },
          [],
        )
      ))






    const searchProduct = (text) => {
        setFocus(true);
        setProductsFiltered(
            initialState.filter((i) => i.name.toLowerCase().includes(text.toLowerCase()))
        )
    }


    


    const onBlur = () => {
        setFocus(false)
    }

    // Categories
    const changeCtg = (ctg) => {
        ctg === 'all' ? setProducts(initialState)
        :  setProducts(initialState.filter((i) =>  i.category === ctg))

    }

     return (
         <>
         { loading ? (
             <View style={styles.activityIndicator}>
                <ActivityIndicator  size='large' color={colors.secondary}/>
             </View>
         ) : (
            <View style={styles.container}>
             <SearchBox
                onChangeText={(text) => searchProduct(text)}
                onBlur={onBlur}
             />
             {focus == true ? (
                 <SearchedProducts 
                        productsFiltered={productsFiltered}
                />
             )  : (
                 <> 
                 <CategoryFilter
                 active={active}
                 categoryFilter = {(ctg) => changeCtg(ctg)}
                 productsCategories={categories}
                 setActive={(value) => setActive(value)}
                 />
                 {/* <Banner/> */}
                 { products.length > 0  ? (
                        <FlatList 
                        data = {products}
                        keyExtractor={(item) => item.name}
                        numColumns={2}
                        renderItem={({item}) => <ProductCard item={item}/>}
                        removeClippedSubviews={false}
                        style={styles.flatList}
                        // ListHeaderComponent={() => <Banner/>}
                      />
                 ) : (
                     <Text style={styles.message}>No items for the selected category present currently</Text>
                 )
                 }
                
              </>
             
             )}
              
          </View>
         )}
         </>
      );
}

const styles = StyleSheet.create({
    activityIndicator:{
        flex:  1,
        justifyContent: "center",
        alignItems:"center",
    },
    container: {
        flex: 1,
    },
    flatList: {
        // flex: 0.5
    },
   message: {
       alignSelf: "center",
       fontSize: 18,
       margin: 10,
       textAlign: 'center',
       color: colors.dark,
   }
})

export default ProductContainer;
