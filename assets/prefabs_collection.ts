const {ccclass, property} = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    @property(cc.Prefab)
    trees: cc.Prefab[]= [null];

    getTrees () {
        return this.trees;
    }

    getTreeById (id){
        return this.trees[id];
    }


}
