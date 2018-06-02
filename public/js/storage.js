       var config = {
           apiKey: "AIzaSyCB-UAilnsfNeHFcPZTAGwVK5dxDZ5n6F0",
           authDomain: "devsign-a7066.firebaseapp.com",
           databaseURL: "https://devsign-a7066.firebaseio.com",
           projectId: "devsign-a7066",
           storageBucket: "devsign-a7066.appspot.com",
           messagingSenderId: "1098166753532"
       };
       firebase.initializeApp(config);

       var uploader = document.getElementById('uploader');
       var fileButton = document.getElementById('fileButton');

       $("#fileButton").addEventListener('change', function (e) {
           //Get file
           var file = e.target.files[0];

           //Create a Stoarge
           var storageRef = firebase.storage().ref('Folder/' + file.name);

           var task = storageRef.put(file);

           task.on('state_change'function progress(snapshot) {
                   var percentage = (snapshot.byteTransferred / snapshot.totalBytes) * 100;
                   uploader.value = percentage;
               },
               function error(err) {

               },
               function complere() {

               }
           );
       });
