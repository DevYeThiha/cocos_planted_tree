const {ccclass, property} = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    @property(cc.Prefab)
    tree: cc.Prefab = null;

    @property(cc.Prefab)
    trees: cc.Prefab[]= [null];

    @property(cc.Node)
    currentTree: cc.Node = null;

    @property(cc.Node)
    plantedTrees: cc.Node[] = [null];

    @property
    isPlaceable: boolean = true;

    @property
    state: string = 'default';

    // @property
    // trees = ['Tree','AppleTree', 'OrangeTree'];

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

    changeTree(event){
        this.selectedTree = (this.selectedTree === 3)? 0 : this.selectedTree+1;
        console.log(this.selectedTree);
        switch (this.selectedTree) {
            case 1:
                event.target.children[0].children[0].getComponent(cc.Label).string='Apple Tree';
                this.tree = this.trees[1];
                break;
            case 2:
                event.target.children[0].children[0].getComponent(cc.Label).string='Orange Tree';
                this.tree = this.trees[2];
                break;
            default:
                event.target.children[0].children[0].getComponent(cc.Label).string='Tree';
                this.tree = this.trees[0];
                break;
        }
        // console.log(this.trees[0],this.trees[1],this.trees[2],this.trees);
        // event.target.children[0].children[0].getComponent(cc.Label).string=this.trees[1];
    }

    

    plantTree(event){
        this.state = 'create';
        if(this.currentTree == null){
            let newTree = cc.instantiate(this.tree);
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
            this.plantedTrees.push(this.currentTree);
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
        }else if(this.state == 'move' && this.currentTree != null){
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
        // console.log('working');
        
        if (this.currentTree != null){
            let mousePosition = event.getLocation();
            mousePosition = this.node.convertToNodeSpaceAR(mousePosition);
            this.currentTree.setPosition(cc.v2(
                mousePosition.x, 
                mousePosition.y
            ));;
            
        }
      
    }

    save(){
        this.plantedTrees.forEach(plantedTree => {
            console.log(plantedTree);
        });
    }


    onStart(){
      
        
    }

    update () {
        // console.log(this.isPlaceable);
    }
    
    onLoad () {
        
        cc.director.getPhysicsManager().enabled = true;
        this.node.on('mousedown',this.placeTree,this);
        this.node.on('mousemove',this.dragTree,this);
    }

    // firebaseConfiguration(){
    //     import { fire } from './module.js'
    //      // Your web app's Firebase configuration
    //     var firebaseConfig = {
    //         apiKey: "AIzaSyDoEnvC019HGJGYBgQI5WJMbS8K2iCdoOM",
    //         authDomain: "mightycryptowall-planted-tree.firebaseapp.com",
    //         databaseURL: "https://mightycryptowall-planted-tree.firebaseio.com",
    //         projectId: "mightycryptowall-planted-tree",
    //         storageBucket: "mightycryptowall-planted-tree.appspot.com",
    //         messagingSenderId: "981393141663",
    //         appId: "1:981393141663:web:2978b6176e1832b58357aa"
    //     };
    //     // Initialize Firebase
    //     firebase.initializeApp(firebaseConfig);
    //     const db = firebase.firestore();
    // }

}
