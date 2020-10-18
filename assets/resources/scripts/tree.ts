
const {ccclass, property} = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

   
    onCollisionEnter(other, self){
        if(other.tag == 2) this.node.parent.getComponent('game').setPlaceable(false);
    }

    onCollisionStay(other, self){
        if(other.tag == 2) this.node.parent.getComponent('game').setPlaceable(false);
    }

    onCollisionExit(other, self){
        if(other.tag == 2) this.node.parent.getComponent('game').setPlaceable(true);

    }

    


    start () {

    }

    onLoad (){
        cc.director.getCollisionManager().enabled = true;
    }


}
