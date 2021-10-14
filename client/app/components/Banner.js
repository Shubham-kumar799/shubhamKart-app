import React , {useState , useEffect} from 'react';
import { StyleSheet , View , Dimensions , ScrollView , Image } from 'react-native'

import Swiper  from 'react-native-swiper'

const {width} = Dimensions.get('window');

const Banner = (props) => {
    const [bannerData , setBannerData] = useState([])

    useEffect(() => {
        setBannerData([
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS194wenCEgLYs03RXVpe32ZaJs-QcFzfpSHQ&usqp=CAU",
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQm4ydrjMDWtyJr6z0NEwX76d76OCPJde7hAA&usqp=CAU" ,
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSgthzu6IPp93h1TyGkt1wbOrVx4dDfJ1nzJA&usqp=CAU" ,
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT4lfClfQxcCgCS1Zb86bOJMHZXYSyTau_lfQ&usqp=CAU",
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSNxi_3QPAYopu3Fd_LjShJR27Xb30QJLyRwA&usqp=CAU"
        ])
        return () => {
            setBannerData([])
        }
    }, [])

     return (
         
   
                  <Swiper 
                    style={styles.container}
                    autoPlay={true}
                    height={250}
                    width={width}
                    loop={true}
                    removeClippedSubviews={false}
                  >
                     {bannerData.map((item) => {
                         return (
                             <Image 
                                key={item}
                                style={styles.image}
                                source={{uri: item}}
                            />

                         )
                     })} 
           
                </Swiper> 
     
     
      );
}

const styles = StyleSheet.create({
   container: {
   },
   image: {
       alignSelf: "center",
       flex: 1,
       resizeMode:'contain',
       width: width - 20,
       borderRadius: 5,

   }
})

export default Banner;