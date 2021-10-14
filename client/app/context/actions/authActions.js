import jwt_decode from 'jwt-decode';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Toast from 'react-native-toast-message';
import baseURL from '../../api/baseURL';
import axios from 'axios';


export const SET_CURRENT_USER = 'SET_CURRENT_USER';

// export const loginUser = (user , dispatch) => {
//     fetch(`${baseURL}users/login` , {
//         method: "POST",
//         body: JSON.stringify(user),
//         headers: {
//             Accept: 'application/json',
//             "Content_Type" : "application/json",
//         },
//     }).then((res) => {
//         res.json()
//         console.log(res)
//         console.lot("This is res")
//     })
//     .then((data) => {
//         if (data) {
//             const token = data.token;
//             AsyncStorage.setItem("jwt" , token)
//             const decoded = jwt_decode(token)
//             dispatch(setCurrentUser(decoded, user)) //todo
//         } else {
//             // todo
//             logoutUser(dispatch);
//         } 
//     })
//     .catch((err) => {
//         console.log(err)
//         Toast.show({
//             topOffset: 60,
//             type: "error",
//             text1: "Please provide correct credentials",
//             text2: "",
//         })
//         // todo
//         logoutUser(dispatch);
//     })

// }

export const loginUser = (user , dispatch) => {
    axios.post(`${baseURL}users/login` , user).then((res) => {
                if (res.data) {
                    const token = res.data.token;
                    AsyncStorage.setItem("jwt" , token)
                    const decoded = jwt_decode(token)
                    dispatch(setCurrentUser(decoded, user)) //todo
                } else {
                    // todo
                    logoutUser(dispatch);
                } 
            })
            .catch((err) => {
                        console.log(err)
                        Toast.show({
                            topOffset: 60,
                            type: "error",
                            text1: "Please provide correct credentials",
                            text2: "",
                        })
                        // todo
                        logoutUser(dispatch);
                    })
}



export const getUserProfile = (id) => {
    fetch(`${baseURL}users/${id}` , {
        method: "GET",
        // body: JSON.stringify(user),
        headers : {
            Accept : 'application.json',
            "Content_Type" : 'application/json'
        },
    })
    .then((res) => res.json())
    .then((data) => console.log("userDAta" , data))
}

export const logoutUser = (dispatch) => {
    AsyncStorage.removeItem('jwt');
    dispatch(setCurrentUser({}))
}

export const setCurrentUser= (decoded , user) => {
    return {
        type: SET_CURRENT_USER,
        payload: decoded,
        userProfile : user
    }
}