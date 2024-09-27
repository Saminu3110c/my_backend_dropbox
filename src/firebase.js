import firebase from "firebase/compat/app"
import "firebase/compat/auth"
import "firebase/compat/firestore"
import "firebase/compat/storage"

const app = firebase.initializeApp({
  apiKey: "AIzaSyAgEmTfF5se5iyf9WZlRiRbD7zfEvaw0_c",
  authDomain: "mybackenddropbox.firebaseapp.com",
  projectId: "mybackenddropbox",
  storageBucket: "mybackenddropbox.appspot.com",
  messagingSenderId: "144267227857",
  appId: "1:144267227857:web:f515ba504046ebc0500bf0"
})

const firestore = app.firestore()


export const database = {
  folders: firestore.collection("folders"),
  files: firestore.collection("files"),
  formatDoc: doc => {
    return { id: doc.id, ...doc.data() }
  },
  getCurrentTimestamp: firebase.firestore.FieldValue.serverTimestamp,
}
export const storage = app.storage()
export const auth = app.auth()
export default app

