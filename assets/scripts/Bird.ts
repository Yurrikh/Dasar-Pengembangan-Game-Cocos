import { _decorator, Collider2D, Component, Contact2DType, IPhysics2DContact, Node, Sprite, SpriteFrame, Vec3 } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('Bird')
export class Bird extends Component {

    @property({ type: SpriteFrame })
    private spriteBluebird: SpriteFrame;   // level 1 — drag bluebird-downflap here

    @property({ type: SpriteFrame })
    private spriteYellowbird: SpriteFrame; // level 2 — drag yellowbird-downflap here

    @property({ type: SpriteFrame})
    private spriteRedbird: SpriteFrame; // level 3 - drag redbird-downflap here

    private listToRemove: Node[] = [];
    private level: number = 1;
    private merging: boolean = false;

    public resetToDefault() {
    this.level = 1;
    this.merging = false;
    this.listToRemove = [];
    this.getComponent(Sprite).spriteFrame = this.spriteBluebird;
    this.node.setScale(new Vec3(1, 1, 1));
}

    start() {
        const collider = this.getComponent(Collider2D);
        if (collider) {
            collider.on(Contact2DType.BEGIN_CONTACT, this.onBeginContact, this);
            collider.on(Contact2DType.END_CONTACT, this.onEndContact, this);
        }
    }

    onBeginContact(selfCollider: Collider2D, otherCollider: Collider2D, contact: IPhysics2DContact | null) {
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
        this.level++;
        console.log("level: " + this.level);

        switch (this.level) {
            case 2:
                this.getComponent(Sprite).spriteFrame = this.spriteYellowbird;
                this.node.setScale(new Vec3(1.5, 1.5, 1));
                break;
            case 3:
                this.getComponent(Sprite).spriteFrame = this.spriteRedbird;
                this.node.setScale(new Vec3(2, 2, 1));
                break;
            case 4:
                this.listToRemove.push(this.node);
                break;
        }
    }

    update(deltaTime: number) {
        if (this.listToRemove.length > 0) {
            for (const node of this.listToRemove) {
                node.destroy();
            }
            this.listToRemove = [];
            this.merging = false;
        }
    }
}
