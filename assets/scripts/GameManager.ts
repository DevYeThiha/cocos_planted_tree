const {ccclass, property} = cc._decorator;


@ccclass
export default class GameManager extends cc.Component {
  
    @property({visible: false})
    isPlaceable: boolean = true;

    @property({visible: false})
    state: string = 'default';

    @property({visible: false})
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

    
    onLoad() {
        this.currentTree = null;
        this.plantedTrees = [];
        cc.director.getPhysicsManager().enabled = true;
        this.trees = cc.find(PREFABS.TREES_PREFABS).getComponent('Prefabs_Collection');
        let firebaseConnection = this.node.getComponent('FirebaseConnection');

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
         this.btnSave.node.on('click',() => this.save(firebaseConnection),this);
         this.btnSave.node.on('mouseenter', function ( event ) {
             document.body.style.cursor = "pointer";
             this.hideTree(event);
         },this);
         this.btnSave.node.on('mouseleave', function ( event ) {
             document.body.style.cursor = "auto";
            this.showTree(event);
         },this);

         // Load Tree Button
         this.btnLoad.node.on('click',() => this.load(firebaseConnection),this);
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


    onStart(){
      
        
    }

    update () {
        // console.log(this.isPlaceable);
    }
    
  
    save(firebaseConnection){      
        firebaseConnection.saveTrees(this.plantedTrees);
       

   
      
    }

    load(firebaseConnection){
        this.clearTrees();
        firebaseConnection.loadTrees().then( (res) => {
            res.forEach(element => {
                this.loadTree(element.data());
            });
        }).catch( (err) => console.log(err));
        // loadTrees.forEach( loadTree => {
        //     this.loadTree(loadTree);
        // })
      
    }

    loadTree(data){
        let newTree = cc.instantiate(this.trees.getTreeById(+data.category)); // + sign to covert integer to string
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
