 # News App

  You can see the full working app here - https://your-daily-news.herokuapp.com/

 ## App structure
 ```
  news-app
  ├── README.md
  ├── dummyData.json
  ├── loadDummyData.js
  ├── node_modules
  ├── package-lock.json
  ├── package.json
  ├── public
  │   ├── favicon.ico
  │   ├── index.html
  │   └── manifest.json
  └── src
      ├── actions
      ├── components
      ├── firebase.js
      ├── index.css
      ├── index.js
      ├── middleware
      ├── reducers
      └── styles
  ```

 ## How to Start the app
 ```
  npm install
  npm start
 ```

 - if you have any issues installing firebase or see any node-pre-gyp errors, try following
 ```
  npm i --save firebase --force
 ```

 ## Details

  - Built the app using create react app, follow this link for more details - https://github.com/facebook/create-react-app
  - Backend is on firebase
  - ask the admin for the `apiKey`
