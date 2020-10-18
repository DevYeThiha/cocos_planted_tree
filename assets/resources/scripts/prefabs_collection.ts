const {ccclass, property} = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    @property(cc.Prefab)
    trees: cc.Prefab[]= [];

    getTrees () {
        return this.trees;
    }

    getTreeById (id){
        return this.trees[id];
    }

    onLoad(){
        let self = this;
        cc.loader.loadRes("prefab/tree", (err, prefab) => self.trees.push(prefab));
        cc.loader.loadRes("prefab/apple_tree", (err, prefab) => self.trees.push(prefab));
        cc.loader.loadRes("prefab/orange_tree", (err, prefab) => self.trees.push(prefab));
    }

}
