const initialState = {
    username:'' ,
    profile_picture:''
}

const UPDATE_USER = 'UPDATE_USER'
const LOGOUT = 'LOGOUT'

export function updateUser(user){
    return{
        type: UPDATE_USER,
        payload: user
    }
}

export function logout(){
    return{
        type: LOGOUT
    }
}

export default function reducer(state = initialState, action){
   switch(action.type){
    case updateUser:
        return {...state, user: action.payload};
    case logout:
        return {...state};
    default: 
        return{...state};
   }
    
}