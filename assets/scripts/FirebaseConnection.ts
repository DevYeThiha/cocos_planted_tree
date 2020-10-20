const {ccclass, property} = cc._decorator;

@ccclass
export default class FirebaseConnection extends cc.Component {

//    db(){
        
//    }
    loadTrees() {

        return this.db.collection("trees").get();
    }

   saveTrees(plantedTrees){
    let batch = this.db.batch();
        
        this.db.collection("trees").get().then(res => {

            // Adding Old Data to Delete Batch
            res.forEach(element => {
                batch.delete(element.ref)
            });
            
            // Adding New Data to The Batch
            plantedTrees.forEach(plantedTree => {
                const saveTree = {
                    category: plantedTree.name,
                    position_x: plantedTree.position.x,
                    position_y: plantedTree.position.y
                };
                
                let treeDoc =  this.db.collection('trees').doc();
                batch.set(treeDoc,saveTree);            
            });
            batch.commit().catch((error) => console.log(error) );
        }).catch(function(error) {
            console.error("Error removing document: ", error);
        });
   }

   onLoad(){
    const firebase = require('firebase');
            
    const firebaseConfig = {
        apiKey: "AIzaSyDoEnvC019HGJGYBgQI5WJMbS8K2iCdoOM",
        authDomain: "mightycryptowall-planted-tree.firebaseapp.com",
        databaseURL: "https://mightycryptowall-planted-tree.firebaseio.com",
        projectId: "mightycryptowall-planted-tree",
        storageBucket: "mightycryptowall-planted-tree.appspot.com",
        messagingSenderId: "981393141663",
        appId: "1:981393141663:web:2978b6176e1832b58357aa"
    };
        firebase.initializeApp(firebaseConfig);
        // Initialize Firebase
        this.db = firebase.firestore();
   }
}
