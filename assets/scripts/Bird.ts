import { _decorator, Collider2D, CircleCollider2D, Component, Contact2DType, IPhysics2DContact, Node, Sprite, SpriteFrame, Vec3 } from 'cc';
import { GameController } from './GameController';
const { ccclass, property } = _decorator;

@ccclass('Bird')
export class Bird extends Component {

    @property({ type: SpriteFrame })
    private spriteBluebird: SpriteFrame;

    @property({ type: SpriteFrame })
    private spriteYellowbird: SpriteFrame;

    @property({ type: SpriteFrame })
    private spriteRedbird: SpriteFrame;

    private listToRemove: Node[] = [];
    private level: number = 1;
    private merging: boolean = false;
    private gameController: GameController = null;
    private pendingScale: number = 0;

    start() {
        const collider = this.getComponent(Collider2D);
        if (collider) {
            collider.on(Contact2DType.BEGIN_CONTACT, this.onBeginContact, this);
            collider.on(Contact2DType.END_CONTACT, this.onEndContact, this);
        }
    }

    public setGameController(controller: GameController) {
        this.gameController = controller;
    }

    public resetToDefault() {
        this.level = 1;
        this.merging = false;
        this.pendingScale = 0;
        this.listToRemove = [];
        this.getComponent(Sprite).spriteFrame = this.spriteBluebird;
        this.node.setScale(new Vec3(1, 1, 1));

        const collider = this.getComponent(CircleCollider2D);
        if (collider) {
            collider.radius = 17;
            collider.apply();
        }
    }

    onBeginContact(selfCollider: Collider2D, otherCollider: Collider2D, contact: IPhysics2DContact | null) {
        if (!this.node.isValid) return;
        if (this.merging) return;

        const otherBird = otherCollider.node.getComponent(Bird);
        if (!otherBird || otherBird.merging) return;

        if (
            selfCollider.group === otherCollider.group &&
            this.level === otherBird.level
        ) {
            this.merging = true;
            otherBird.merging = true;

            this.levelUp();
            this.listToRemove.push(otherCollider.node);
        }
    }

    onEndContact(selfCollider: Collider2D, otherCollider: Collider2D, contact: IPhysics2DContact | null) {}

    levelUp() {
        if (!this.node || !this.node.isValid) return;
        this.level++;

        if (this.gameController) {
            this.gameController.playPointSound();
        }

        switch (this.level) {
            case 2:
                this.getComponent(Sprite).spriteFrame = this.spriteYellowbird;
                this.node.setScale(new Vec3(1.5, 1.5, 1));
                this.pendingScale = 1.5;
                break;
            case 3:
                this.getComponent(Sprite).spriteFrame = this.spriteRedbird;
                this.node.setScale(new Vec3(2, 2, 1));
                this.pendingScale = 2;
                break;
            case 4:
                this.listToRemove.push(this.node);
                break;
        }
    }

    update(deltaTime: number) {
        if (this.pendingScale > 0 && this.node.isValid) {
            const collider = this.getComponent(CircleCollider2D);
            if (collider) {
                collider.radius = 6 * this.pendingScale;
                collider.apply();
            }
            this.pendingScale = 0;
        }

        if (this.listToRemove.length > 0) {
            for (const node of this.listToRemove) {
                if (node.isValid) node.destroy();
            }
            this.listToRemove = [];
            this.merging = false;
        }
    }
}
