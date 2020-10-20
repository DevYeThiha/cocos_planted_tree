************ Cocos Planted Tree ************

Technology Used
-> Cocos Creator Version 2.4.3
-> Google's Cloud Firestore
-> Typescript ( but mostly written in Javascript)


Scripts
-> GLOBALS.js
-> Prefabs_Collection.ts
-> FirebaseConnection.ts
-> GameManager.ts
-> Tree.ts

GLOBALS.js
-> Declare the path for the components.

Prefabs_Collection.ts 
-> This Scripts load the prefab (tree, apple_tree, orange_tree) from resource folder & store those in an trees array.
-> Consist of two accessor function getTrees & getTreeById.

FirebaseConnection.ts
-> This Script handle and insert data to/from the Firestore.
-> FirebaseConnection is initialized in onLoad function of this script.
-> Consist of two custom function loadTrees & saveTress.
-> loadTrees returns retrieve promise (for trees document) from the Firestore.
-> saveTrees take node array as an paramenter, covert those into object, batch those object firestore set function & commit to firestore.

GameManager.ts
-> This Script handle most of the function of this game.
-> Most of the component are initialized in onLoad function this script.
-> Have mouse click & mouse drag event listener in onLoad function.
-> Mouse click function call placeTree function.
-> placeTree function plant, move or delete tree base on the value in state variable.
-> Drag event listener call dragTree function.
-> dragTree function assign the mouse position value to the tree node position.
-> onLoad function also have click listener for btnPlant, btnMove, btnDelete, btnChange, btnSave, btnLoad.
-> btnPlant assign create value to the state variable.
-> btnMove assign move value to the state variable.
-> btnDelete assign delete value to the delete variable.
-> btnChange call the changeTree function.
-> btnSave call the save function.
-> btnLoad call the load function.

Tree.ts
Has listener for tree collision (onCollisionEnter, onCollisionStay,onCollisionExit).
These function toggle isPlaceable in GameManager.ts using setPlaceable function from the GameManager.ts.



