
const {ccclass, property} = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

   
    onCollisionEnter(other, self){
        if(other.tag == 2){
            this.node.parent.getComponent('game').setPlaceable(false);
        }else if(other.tag == 3){
            console.log('hit ui');
        }   
    }

    onCollisionExit(other, self){
        if(other.tag == 2){
            this.node.parent.getComponent('game').setPlaceable(true);
        }else if(other.tag == 3){
            console.log('not hit ui');
        }    
    }

    


    start () {

    }

    onLoad (){
        let manager = cc.director.getCollisionManager();
        manager.enabled = true;

    }


}
