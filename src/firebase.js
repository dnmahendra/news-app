const firebase = require('firebase')

const config = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: "news-ccb16.firebaseapp.com",
  databaseURL: "https://news-ccb16.firebaseio.com",
  projectId: "news-ccb16",
  storageBucket: "news-ccb16.appspot.com",
  messagingSenderId: "19211615776"
}

const fire = firebase.initializeApp(config)
module.exports =  fire
