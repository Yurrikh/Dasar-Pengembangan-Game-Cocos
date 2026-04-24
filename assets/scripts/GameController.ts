import { _decorator, Component, ERigidBody2DType, EventTouch, Input, input, Node, RigidBody2D, instantiate, Vec2 } from 'cc';
import {Bird} from './Bird';
const { ccclass, property } = _decorator;

@ccclass('GameController')
export class GameController extends Component {

    @property({ type: Node })
    private bird: Node;  // Keep pointing to your original bird node in the scene

    start() {
    this.bird.active = false;
    input.off(Input.EventType.TOUCH_START, this.onTouchStart, this);
    input.on(Input.EventType.TOUCH_START, this.onTouchStart, this);
    }

    onTouchStart(event: EventTouch) {
    // Guard — if template is somehow gone, do nothing
    if (!this.bird) {
        console.error("Bird template is missing!");
        return;
    }

    const inputPosition: Vec2 = event.getUILocation();

    // Temporarily activate just long enough to clone
    this.bird.active = true;
    const newBird: Node = instantiate(this.bird);
    this.bird.active = false;  // immediately hide template again

    this.bird.parent.addChild(newBird);

    const birdComponent = newBird.getComponent(Bird);
    if (birdComponent) birdComponent.resetToDefault();

    newBird.setWorldPosition(inputPosition.x, inputPosition.y, 0);

    const rb = newBird.getComponent(RigidBody2D);
    if (rb) {
        rb.type = ERigidBody2DType.Dynamic;
        rb.wakeUp();
    }
    }

    update(deltaTime: number) {}
}
