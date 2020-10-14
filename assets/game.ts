const {ccclass, property} = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    @property(cc.Prefab)
    tree: cc.Prefab = null;

    @property(cc.Prefab)
    trees: cc.Prefab[]= [null];

    @property(cc.Node)
    currentTree: cc.Node = null;

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
        this.selectedTree = (this.selectedTree === 3)? 1 : this.selectedTree+1;
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

            console.log('Created Tree',this.currentTree);
            this.currentTree = null;
            this.plantTree(event);

        }else if(this.state == 'delete'){
            let mousePosition  = event.getLocation();
            mousePosition  = this.node.convertToNodeSpaceAR(mousePosition);
            var collider = cc.director.getPhysicsManager().testPoint(event.getLocation());
            if(collider != null && collider != undefined){
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

}
