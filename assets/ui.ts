const {ccclass, property} = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    // onCollisionEnter(other, self){
    //     if(other.tag == 2){
    //         this.node.parent.getComponent('game').setPlaceable(false);
    //     }       
    // }

    // onCollisionExit(other, self){
    //     if(other.tag == 2){
    //         this.node.parent.getComponent('game').setPlaceable(true);
    //     }   
    // }

    


    start () {

    }

    onLoad (){
        const game = this.node.parent.getComponent('game');
        this.node.on('mouseenter', function ( event ) {
            document.body.style.cursor = "pointer";
            game.hideTree(event);
        });
        this.node.on('mouseleave', function ( event ) {
            document.body.style.cursor = "auto";
           game.showTree(event);
        });

    }

}
