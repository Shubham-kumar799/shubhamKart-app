import React , {useState} from 'react';
import { StyleSheet , View , Text , TouchableNativeFeedback, Button} from 'react-native'

import {useNavigation} from '@react-navigation/native'
import Screen from '../components/Screen'
import colors from '../config/colors';
import {Picker} from '@react-native-picker/picker';


const methods = [
  {name: "Cash on Delivery" , value: 1},
  {name: "NetBanking/UPI" , value: 2},
  {name: "Card Payment" , value: 3},
]

const paymentCards = [
  {name: 'Wallet' , value : 1},
  {name: 'Visa' , value : 2},
  {name: 'MasterCard' , value : 3},
  {name: 'Other' , value : 4},
]

const PaymentScreen = ({route}) => {

  const {order }= route.params
  const [selected , setSelected] = useState()
  const [card, setCard] = useState(paymentCards[1].name)
  const navigation = useNavigation();

     return (
          <View style={styles.container}>
              <Text style={styles.header}>Choose Your Payment Method</Text>
              <View>
                {methods.map((method) =>
                <TouchableNativeFeedback key={method.value}onPress={() => setSelected(method.value)}>
                <View  style={styles.method}>
                <Text style={styles.methodText}>{method.name}</Text>
                </View> 
                </TouchableNativeFeedback>)}
              </View>
              {
                selected === 3 && (
                  <Picker
                  style={styles.picker}
                 selectedValue={card}
                 onValueChange={(itemValue, itemIndex ) => {setCard(itemValue)}}>
                   {paymentCards.map((item) => <Picker.Item key={item.value} label={item.name} value={item.name} /> )}
       
               </Picker>
                )
              }
              <Button title="Confirm" onPress={()=> navigation.navigate('Confirm' , {order : order})}/>
          </View>
      );
}

const styles = StyleSheet.create({
   container: {},
   screen: {
       flex: 1,
   },
   method: {
     padding: 10,
   },
   methodText: {
     fontSize: 16,
   },
   header:{
     alignSelf: 'center',
     fontSize: 20,
     margin: 10,
     color: colors.dark
   },
   picker:{
    margin: 10,
    borderWidth: 2,
    borderColor: colors.secondary
  }
})

export default PaymentScreen;