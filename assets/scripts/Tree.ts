
const {ccclass, property} = cc._decorator;

@ccclass
export default class Tree extends cc.Component {

   
    onCollisionEnter(other, self){
        if(other.tag == 2) this.node.parent.getComponent('GameManager').setPlaceable(false);
    }

    onCollisionStay(other, self){
        if(other.tag == 2) this.node.parent.getComponent('GameManager').setPlaceable(false);
    }

    onCollisionExit(other, self){
        if(other.tag == 2) this.node.parent.getComponent('GameManager').setPlaceable(true);

    }

    


    start () {

    }

    onLoad (){
        cc.director.getCollisionManager().enabled = true;
    }


}
