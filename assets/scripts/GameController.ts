import { _decorator, Component, ERigidBody2DType, EventTouch, Input, input, Node, RigidBody2D, instantiate, Vec2 } from 'cc';
import {Bird} from './Bird';
const { ccclass, property } = _decorator;

@ccclass('GameController')
export class GameController extends Component {

    @property({ type: Node })
    private bird: Node;  // Keep pointing to your original bird node in the scene

    start() {
        input.on(Input.EventType.TOUCH_START, this.onTouchStart, this);
    }

    onTouchStart(event: EventTouch) {
    const inputPosition: Vec2 = event.getUILocation();

    const newBird: Node = instantiate(this.bird);
    this.bird.parent.addChild(newBird);

    // Force reset to level 1 state regardless of what the template looks like
    const birdComponent = newBird.getComponent(Bird);
    if (birdComponent) {
        birdComponent.resetToDefault();
    }

    newBird.setWorldPosition(inputPosition.x, inputPosition.y, 0);

    const rb = newBird.getComponent(RigidBody2D);
    if (rb) {
        rb.type = ERigidBody2DType.Dynamic;
        rb.wakeUp();
    }
}

    update(deltaTime: number) {}
}
