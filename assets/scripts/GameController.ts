import { _decorator, Component, ERigidBody2DType, EventTouch, Input, input, Node, RigidBody2D, instantiate, Vec2, AudioSource, AudioClip } from 'cc';
import { Bird } from './Bird';
const { ccclass, property } = _decorator;

@ccclass('GameController')
export class GameController extends Component {

    @property({ type: Node })
    private bird: Node;

    @property({ type: AudioClip })
    private pointSound: AudioClip; 

    start() {
        this.bird.active = false;
        input.off(Input.EventType.TOUCH_START, this.onTouchStart, this);
        input.on(Input.EventType.TOUCH_START, this.onTouchStart, this);
    }

    playPointSound() {
        const audio = this.getComponent(AudioSource);
        if (audio && this.pointSound) {
            audio.playOneShot(this.pointSound);
        }
    }

    onTouchStart(event: EventTouch) {
        if (!this.bird) return;

        const inputPosition: Vec2 = event.getUILocation();

        this.bird.active = true;
        const newBird: Node = instantiate(this.bird);
        this.bird.active = false;

        this.bird.parent.addChild(newBird);

        const birdComponent = newBird.getComponent(Bird);
        if (birdComponent) {
            birdComponent.resetToDefault();
            birdComponent.setGameController(this);  // pass reference so Bird can trigger sound
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
