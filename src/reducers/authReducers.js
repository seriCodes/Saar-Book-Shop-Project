const firebaseAuthReducer =(state, action)=>{
switch(action.type){
    case 'SIGNIN':
        return {...state, user: action.payload}
    case 'LOGIN': 
    console.log("auth reducer LOGIN")
    console.log(action.payload)

        return {...state, user: action.payload}
    case 'LOGOUT':
        console.log("auth reducer LOGOUT")
        return {...state, user: action.payload}
    default:
        return state;
        
}
}

export {firebaseAuthReducer}