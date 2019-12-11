  // Configuração do firebase no aplicativo
  var firebaseConfig = {
    apiKey: "AIzaSyAojI3kv3nip4WjtARjmw_7a9jOEu3UnnE",
    authDomain: "agenda-amiga.firebaseapp.com",
    databaseURL: "https://agenda-amiga.firebaseio.com",
    projectId: "agenda-amiga",
    storageBucket: "agenda-amiga.appspot.com",
    messagingSenderId: "1014906687846",
    appId: "1:1014906687846:web:16c2cc5859f69560c3b8a7",
    measurementId: "G-G8BB1QXHZT"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  firebase.analytics();