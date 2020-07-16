import * as firebase from "firebase";
import "firebase/auth";
import "firebase/firestore";
import "firebase/storage";

////i think i need to had dotenv package

var firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_FIREBASE_DATABASE_URL,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
};
console.log(firebaseConfig);
class Firebase {
  constructor() {
    firebase.initializeApp(firebaseConfig);
    this.auth = firebase.auth();
    this.db = firebase.database();
    this.sb = firebase.storage();
  }
  async login(email, password) {
    const user = await firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .catch((err) => {
        console.log(err);
        return err;
      });
    return user;
  }
  async signIn(email, password, fullName, ID, userKind, courseDaysList) {
    const user = await firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .catch((err) => {
        console.log(err);
        alert(err);
        return err;
      });
    if (user instanceof Error) {
      console.log("err");
      return user;
    }
    if (!(user instanceof Error)) {
      console.log(user);
      console.log(user.user.uid);
      console.log(user.user.email);
      console.log(userKind);
      console.log(user.userKind);
      console.log(courseDaysList);

      console.log(user);
      let newUser = {
        name: fullName,
        personalID: ID,
        email: "" + user.user.email,
        userKind,
        AccountID: "" + user.user.uid,
      };
      if (userKind == "LECTURER-Course") {
        newUser["courseDaysList"] = courseDaysList;
      }
      let childRefernce = await this.db.ref("Users").push(newUser);
      console.log(childRefernce);

      console.log(user);
      return user;
    }
  }
  async signout() {
    await firebase.auth().signOut();
  }
  async getUserKey(uid) {
    let userKey;
    console.log(uid);
    await this.db
      .ref("Users")
      .once("value")
      .then((snapshot) => {
        console.log(snapshot);
        snapshot.forEach((childSnapshot) => {
          if (childSnapshot.val().AccountID == uid) {
            console.log("getuserKey V");
            console.log(childSnapshot.val());
            userKey = childSnapshot.key;
          }
        });
      });

    return userKey;
  }

  async getUserState() {
    return new Promise((resolve) => {
      this.auth.onAuthStateChanged(resolve);
    });
  }

  async getUserDBobject(uid) {
    let userObject;
    console.log(uid);
    await this.db
      .ref("Users")
      .once("value")
      .then((snapshot) => {
        console.log(snapshot);

        snapshot.forEach((childSnapshot) => {
          if (childSnapshot.val().AccountID == uid) {
            console.log(childSnapshot.val().name);
            userObject = childSnapshot.val();
            return;
          }
        });
        console.log("childSnapshot.val().name");
      });
    return userObject;
  }

  async eraseDB() {
    await this.db
      .ref("Users")
      .remove()
      .then(() => {
        console.log("Data was removed");
      })
      .catch((e) => {
        console.log("Did not remove data", e);
      });
  }

  async updateUserCart(userDBkey, BookID) {
    let childSnapshotKey;
    let isAddingNeeded = true;
    console.log(userDBkey);
    await this.db
      .ref("Users/" + userDBkey + "/cart")
      .once("value")
      .then((snapshot) => {
        snapshot.forEach((childSnapshot) => {
          // console.log(childSnapshot.key)
          // console.log(childSnapshot.val())
          if (childSnapshot.val() == BookID) {
            console.log(childSnapshot.key);
            alert("Already in cart");
            isAddingNeeded = false;
          }
        });
      });
    if (isAddingNeeded) {
      this.db.ref("Users/" + userDBkey + "/cart").push(BookID);
      alert("Added to cart");
    }
  }

  async removeItemFromUserCart(userDBkey, BookID) {
    let childSnapshotKey;
    let isRemovalNeeded = false;
    console.log(userDBkey);
    let keyToRemove;
    await this.db
      .ref("Users/" + userDBkey + "/cart")
      .once("value")
      .then((snapshot) => {
        snapshot.forEach((childSnapshot) => {
          // console.log(childSnapshot.key)
          // console.log(childSnapshot.val())
          if (childSnapshot.val() == BookID) {
            keyToRemove = childSnapshot.key;
            console.log(childSnapshot.key);
            isRemovalNeeded = true;
          }
        });
      });
    if (isRemovalNeeded) {
      this.db.ref("Users/" + userDBkey + "/cart/" + keyToRemove).remove();
      alert("Item removed from cart. refresh to update");
    } else {
      alert("Item wasn't in cart");
    }
  }

  async createOrEditBook(newBook) {
    console.log("createOrEditBook");
    console.log(newBook);

    await this.db
      .ref("Books/" + newBook.BookID)
      .update(newBook)
      .then(function () {
        console.log("Synchronization newBook succeeded");
        alert("book created or edited. To watch changes please refresh page.");
      })
      .catch(function (error) {
        console.log("Synchronization newBook failed");
        alert("book NOt created");
      });

    return;
  }

  async uploadImage(name, file) {
    console.log("uploadImage");

    let urlToDB;
    const task = this.sb.ref().child(name).put(file);
    await task
      .then((snapshot) => snapshot.ref.getDownloadURL())
      .then((url) => {
        urlToDB = url;
      })
      .catch(console.error);
    return urlToDB;
  }

  async getBooksObjects(booksIDarray) {
    let booksObjects = [];

    await this.db
      .ref("Books")
      .once("value")
      .then(
        (snapshot) => {
          console.log(snapshot);

          if (booksIDarray) {
            snapshot.forEach((childSnapshot) => {
              if (booksIDarray.includes(childSnapshot.key)) {
                booksObjects.push(childSnapshot.val());
              }
            });
          } else {
            //all books will be added to booksObjects
            snapshot.forEach((childSnapshot) => {
              booksObjects.push(childSnapshot.val());
            });
            // console.log(childSnapshot.key)
          }
        }
        // console.log('childSnapshot.val().name')
      );
    return booksObjects;
  }
}

export default new Firebase();
