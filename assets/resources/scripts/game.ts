const {ccclass, property} = cc._decorator;


@ccclass
export default class NewClass extends cc.Component {

    @property(cc.Node)
    currentTree: cc.Node = null;

    @property(cc.Node)
    plantedTrees: cc.Node[] = [];



    @property(cc.Component)
    trees: cc.Component = null;


    // buttons 
    @property(cc.Component)
    btnPlant: cc.Component = null;

    @property(cc.Component)
    btnMove: cc.Component = null;

    @property(cc.Component)
    btnDelete: cc.Component = null;

    @property(cc.Component)
    btnChange: cc.Component = null;

    @property(cc.Component)
    btnSave: cc.Component = null;

    @property(cc.Component)
    btnLoad: cc.Component = null;
  
    @property
    isPlaceable: boolean = true;

    @property
    state: string = 'default';


    @property
    selectedTree: number = 0;



    setPlaceable(status){
        this.isPlaceable = status;
    }

    deleteTree(event){
        this.hideTree();
        this.state='delete';
      
    }

    moveTree(event){
        this.hideTree();
        this.state='move';
    }

    changeTree(){
        this.selectedTree = (this.selectedTree+1 === 3)? 0 : this.selectedTree+1;
        switch (this.selectedTree) {
            case 1:
                this.btnChange.node.children[0].children[0].getComponent(cc.Label).string='Apple Tree';
                break;
            case 2:
                this.btnChange.node.children[0].children[0].getComponent(cc.Label).string='Orange Tree';
                break;
            default:
                this.btnChange.node.children[0].children[0].getComponent(cc.Label).string='Tree';
                break;
        }
        // console.log(this.trees[0],this.trees[1],this.trees[2],this.trees);
        // event.target.children[0].children[0].getComponent(cc.Label).string=this.trees[1];
    }

    

    plantTree(event){
        this.state = 'create';
        if(this.currentTree == null){
            let newTree = cc.instantiate(this.trees.getTreeById(this.selectedTree));
            let mousePosition = event.getLocation();
            mousePosition = this.node.convertToNodeSpaceAR(mousePosition);
            newTree.setPosition(cc.v2(
                mousePosition.x, 
                mousePosition.y
            ));

 
                //  console.log(newTree);
                this.node.addChild(newTree);
            
                this.currentTree = newTree;
         
        } 

     
    }

    placeTree(event){
        if(this.currentTree != null && this.isPlaceable && this.state === 'create'){
            this.currentTree.name = this.selectedTree + '';
            this.plantedTrees.push(this.currentTree);
            if(this.plantedTrees[0] == null) this.plantedTrees.splice(0, 1)
            this.currentTree = null;
            this.plantTree(event);
            

        }else if(this.state == 'delete'){
            let mousePosition  = event.getLocation();
            mousePosition  = this.node.convertToNodeSpaceAR(mousePosition);
            var collider = cc.director.getPhysicsManager().testPoint(event.getLocation());
            if(collider != null && collider != undefined){
                let index = this.plantedTrees.findIndex((plantedTree) => plantedTree == collider.node);
                if (index !== -1) this.plantedTrees.splice(index, 1);
                collider.node.destroy();
            } 
        }else if(this.state == 'move' && this.currentTree == null){
            let mousePosition  = event.getLocation();
            mousePosition  = this.node.convertToNodeSpaceAR(mousePosition);
            var collider = cc.director.getPhysicsManager().testPoint(event.getLocation());
            if(collider != null && collider != undefined){
               this.currentTree =  collider.node;
            } 
        }else if(this.currentTree != null && this.isPlaceable && this.state == 'move'){
            this.currentTree = null;
        }
    }

    hideTree(){
        if(this.currentTree != null){
            this.currentTree.destroy();
            this.currentTree = null;

        }
    }

    showTree(event){
        if(this.state == 'create'){
            this.plantTree(event);
        }
    }



    dragTree(event){ 
        
        if (this.currentTree != null){
            let mousePosition = event.getLocation();
            mousePosition = this.node.convertToNodeSpaceAR(mousePosition);
            this.currentTree.setPosition(cc.v2(
                mousePosition.x, 
                mousePosition.y
            ));;
            
        }    
    }

    


    onStart(){
      
        
    }

    update () {
        // console.log(this.isPlaceable);
    }
    
    onLoad() {
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
        const firebase = firebase.initializeApp(firebaseConfig);
        // Initialize Firebase
        const db = firebase.firestore();
        cc.director.getPhysicsManager().enabled = true;
        this.trees = cc.find(PREFABS.TREES_PREFABS).getComponent('prefabs_collection');


        //Loading Buttons
        this.btnPlant = cc.find(UI.BTN_PLANT).getComponent(cc.Button);
        this.btnMove = cc.find(UI.BTN_MOVE).getComponent(cc.Button);
        this.btnDelete = cc.find(UI.BTN_DELETE).getComponent(cc.Button);
        this.btnChange = cc.find(UI.BTN_CHANGE).getComponent(cc.Button);
        this.btnSave = cc.find(UI.BTN_SAVE).getComponent(cc.Button);
        this.btnLoad = cc.find(UI.BTN_LOAD).getComponent(cc.Button);


        // Button Actions

        // Plant Button
        this.btnPlant.node.on('click', () => this.state = 'create',this);
        this.btnPlant.node.on('mouseenter', function ( event ) {
            document.body.style.cursor = "pointer";
            this.hideTree(event);
        },this);
        this.btnPlant.node.on('mouseleave', function ( event ) {
            document.body.style.cursor = "auto";
           this.showTree(event);
        },this);

        // Move Button
        this.btnMove.node.on('click', () => this.state = 'move',this);
        this.btnMove.node.on('mouseenter', function ( event ) {
            document.body.style.cursor = "pointer";
            this.hideTree(event);
        },this);
        this.btnMove.node.on('mouseleave', function ( event ) {
            document.body.style.cursor = "auto";
           this.showTree(event);
        },this);

        // Delete Button
        this.btnDelete.node.on('click', () => this.state = 'delete',this);
        this.btnDelete.node.on('mouseenter', function ( event ) {
            document.body.style.cursor = "pointer";
            this.hideTree(event);
        },this);
        this.btnDelete.node.on('mouseleave', function ( event ) {
            document.body.style.cursor = "auto";
           this.showTree(event);
        },this);

         // Change Tree Button
         this.btnChange.node.on('click',this.changeTree,this);
         this.btnChange.node.on('mouseenter', function ( event ) {
             document.body.style.cursor = "pointer";
             this.hideTree(event);
         },this);
         this.btnChange.node.on('mouseleave', function ( event ) {
             document.body.style.cursor = "auto";
            this.showTree(event);
         },this);

         // Save Tree Button
         this.btnSave.node.on('click',() => this.save(db),this);
         this.btnSave.node.on('mouseenter', function ( event ) {
             document.body.style.cursor = "pointer";
             this.hideTree(event);
         },this);
         this.btnSave.node.on('mouseleave', function ( event ) {
             document.body.style.cursor = "auto";
            this.showTree(event);
         },this);

         // Load Tree Button
         this.btnLoad.node.on('click',() => this.load(db),this);
         this.btnLoad.node.on('mouseenter', function ( event ) {
             document.body.style.cursor = "pointer";
             this.hideTree(event);
         },this);
         this.btnLoad.node.on('mouseleave', function ( event ) {
             document.body.style.cursor = "auto";
            this.showTree(event);
         },this);


        this.node.parent.on('mousedown',this.placeTree,this);
        this.node.parent.on('mousemove',this.dragTree,this);
    }

    save(db){
        
        db.collection("trees").get().then(res => {
            res.forEach(element => {
                element.ref.delete();
            });
            console.log(this.plantedTrees);
            this.plantedTrees.forEach(plantedTree => {
                const saveTree = {
                    category: plantedTree.name,
                    position_x: plantedTree.position.x,
                    position_y: plantedTree.position.y
                };
               
                db.collection('trees').add(saveTree).catch(err => console.log(err));
                
            });
        }).catch(function(error) {
            console.error("Error removing document: ", error);
        });
       

   
      
    }

    load(db){
        this.clearTrees();
        db.collection("trees").get().then(res => {
            res.forEach(element => {
                this.loadTree(element.data());
            });

        }).catch(function(error) {
            console.error("Error removing document: ", error);
        });
    }

    loadTree(data){
        let newTree = cc.instantiate(this.trees.getTreeById(+data.category));
        newTree.setPosition(cc.v2(
            data.position_x, 
            data.position_y
        ));
        newTree.name = data.category;
         this.node.addChild(newTree);
         this.plantedTrees.push(newTree);
        
    }

    clearTrees(){
        if(this.plantedTrees != null){
            this.plantedTrees.forEach( plantedTree => {
                plantedTree.destroy();
            })
            this.plantedTrees = [];
        }
    }
    // firebaseConfiguration(){
      
       
    // }

}
