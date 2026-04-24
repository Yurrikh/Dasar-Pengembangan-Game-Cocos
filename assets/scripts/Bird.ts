import {
    _decorator, Collider2D, Component, Contact2DType,
    ERigidBody2DType, IPhysics2DContact, Node, Prefab,
    RigidBody2D, Sprite, SpriteFrame, Vec3, instantiate
} from 'cc';
const { ccclass, property } = _decorator;

@ccclass('Bird')
export class Bird extends Component {

    // -- Inspector fields --------------------------------------------------

    @property({ type: SpriteFrame })
    public spriteBlueBird: SpriteFrame = null;      // bluebird-downflap

    @property({ type: SpriteFrame })
    public spriteYellowBird: SpriteFrame = null;    // yellowbird-downflap

    @property({ type: Prefab })
    public yellowBirdPrefab: Prefab = null;          // YellowBird.prefab (bigger scale)

    // -- Runtime state -----------------------------------------------------

    // 0 = blue, 1 = yellow (used to check if same level for merging)
    public level: number = 0;

    // Guards against both birds triggering merge at the same time
    private hasMerged: boolean = false;

    // -----------------------------------------------------------------------

    start() {
        const collider = this.getComponent(Collider2D);
        if (collider) {
            collider.on(Contact2DType.BEGIN_CONTACT, this.onBeginContact, this);
        }
    }

    onBeginContact(
        selfCollider: Collider2D,
        otherCollider: Collider2D,
        contact: IPhysics2DContact | null
    ) {
        const otherBird = otherCollider.node.getComponent(Bird);

        // Only care about Bird-to-Bird contacts
        if (!otherBird) return;

        // MERGE condition: both are blue (level 0) and neither has merged yet
        if (
            this.level === 0 &&
            otherBird.level === 0 &&
            !this.hasMerged &&
            !otherBird.hasMerged
        ) {
            this.hasMerged = true;
            otherBird.hasMerged = true;

            // Midpoint between the two birds — spawn yellow bird here
            const posA = this.node.worldPosition;
            const posB = otherCollider.node.worldPosition;
            const midPoint = new Vec3(
                (posA.x + posB.x) / 2,
                (posA.y + posB.y) / 2,
                0
            );

            const otherNode = otherCollider.node;

            // Defer to next frame to avoid modifying the scene mid-physics-step
            this.scheduleOnce(() => {
                // Spawn yellow bird at midpoint
                if (this.yellowBirdPrefab && this.node.parent) {
                    const yellow = instantiate(this.yellowBirdPrefab);
                    this.node.parent.addChild(yellow);
                    yellow.setWorldPosition(midPoint);

                    // Drop it with physics
                    const rb = yellow.getComponent(RigidBody2D);
                    if (rb) {
                        rb.type = ERigidBody2DType.Dynamic;
                        rb.wakeUp();
                    }
                }

                // Destroy both blue birds
                if (otherNode && otherNode.isValid) otherNode.destroy();
                if (this.node && this.node.isValid) this.node.destroy();
            }, 0);
        }

        // DIFFERENT LEVELS (blue + yellow): do nothing — 
        // RigidBody2D + Collider2D handles the physical bounce automatically.
    }

    update(deltaTime: number) {}
}