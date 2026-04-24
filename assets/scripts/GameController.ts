import { _decorator, Component, ERigidBody2DType, EventTouch, find, Input, input, Node, RigidBody, RigidBody2D, tween, Vec2, Vec3 } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('GameController')
export class GameController extends Component {

    @property({
        type: Node
    })
    private bird:Node;

    start() {
        // this.bird = find("Canvas/bluebird-upflap");
        input.on(Input.EventType.TOUCH_START, this.onTouchStart, this);
        input.on(Input.EventType.TOUCH_MOVE, this.onTouchStart, this);
        input.on(Input.EventType.TOUCH_END, this.onTouchStart, this);
    }
    onTouchStart(event: EventTouch) {
        console.log(event.getUILocation());  // location on UI space
        let inputPosition:Vec2 = event.getUILocation();
        this.bird.setWorldPosition(inputPosition.x,inputPosition.y,0);
        
        this.bird.getComponent(RigidBody2D).type = ERigidBody2DType.Dynamic;
        this.bird.getComponent(RigidBody2D).wakeUp();
    }



    moveToX(node: Node, targetX: number, duration: number = 0.5) {
        const currentPos = node.worldPosition.clone();

        tween(node)
            .to(duration, {
                worldPosition: new Vec3(targetX, currentPos.y, currentPos.z)
            })
            .start();
    }

    //1 kejadian = 1 frame
    //dalam 1 frame = 1 update
    update(deltaTime: number) {
        // this.node.translate(new Vec3(10,0,0));
        // console.log("update game controller");
        // for(let i=0;i<999999999;i++){}
    }
}

