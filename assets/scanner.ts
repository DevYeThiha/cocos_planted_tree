
const {ccclass, property} = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    @property(cc.Node)
    tree: cc.Node = null;

   
    onCollisionEnter(other, self){
        if(other.tag == 2){
            this.tree = other.node;
        }  
    }
  

    getTree(){
        return this.tree;
    }
    
    deleteTree() {
        console.log(this.tree);
        if(this.tree){
            this.tree.destroy();
        }
    }
    


    start () {

    }

    onLoad (){
        let manager = cc.director.getCollisionManager();
        manager.enabled = true;

    }


}
