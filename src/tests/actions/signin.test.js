import firebase from "../../firebase/config";
import '@testing-library/jest-dom/extend-expect';

console.log('test signIn')

test('should signin new user', (done) => {
// const email,password, fullName,ID,userKind,courseDaysList={
    
// }
console.log('out signIn')

firebase.signIn("ee@e22.cvb","vvvvvvvvvvcc", "ddd","eee","fff").then(()=>{
    console.log('inside signIn')
    done();
})




});