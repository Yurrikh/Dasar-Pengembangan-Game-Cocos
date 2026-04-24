import { _decorator, Collider2D, Component, Contact2DType, IPhysics2DContact, Node, Sprite, SpriteFrame, Vec3 } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('Bird')
export class Bird extends Component {


    @property({type:SpriteFrame})
    private spriteBirdKuning:SpriteFrame;

    private listToRemove = [];
    private level:number = 0;
    start() {

        let collider = this.getComponent(Collider2D);
        if (collider) {
            collider.on(Contact2DType.BEGIN_CONTACT, this.onBeginContact, this);
            collider.on(Contact2DType.END_CONTACT, this.onEndContact, this);
        }
    }

    onBeginContact (selfCollider: Collider2D, otherCollider: Collider2D, contact: IPhysics2DContact | null) {
        // will be called once when two colliders begin to contact

        if(selfCollider.group == otherCollider.group){
            // selfCollider.node.berubahImage();
            // otherCollider.node.active = false;
            if(selfCollider.node.getComponent(Bird).level == otherCollider.node.getComponent(Bird).level){
                this.levelUp();
                this.listToRemove.push(otherCollider.node);
            }
        }
        // console.log('onBeginContact');
        // console.log(selfCollider);
        // console.log(otherCollider);
        // console.log(contact);
    }
    onEndContact (selfCollider: Collider2D, otherCollider: Collider2D, contact: IPhysics2DContact | null) {
        // will be called once when the contact between two colliders just about to end.
        console.log('onEndContact');
    }

    levelUp(){
        this.level++;
        this.getComponent(Sprite).spriteFrame = this.spriteBirdKuning;
        console.log("level: "+this.level);
    }

    update(deltaTime: number) {
        for(let i=0;i<this.listToRemove.length;i++){
            this.listToRemove[i].active = false;
        }
        this.listToRemove = [];
        // console.log("update bird");
        //delta time second
        //100 px / s
        //100 px / s * x dtk = jarak tempuh di frame ini
        // this.node.translate(new Vec3(100*deltaTime,0,0));
        
    }
}

