class MachineGunRound extends Entity {
    constructor(owner) {
        super();

        this.x = owner.x + cos(owner.angle) * 10;
        this.y = owner.y + sin(owner.angle) * 10;
        this.angle = owner.angle;
        this.owner = owner;
        this.speed = 5000;
        this.radius = 5;

        this.nextParticle = 0;

        sound(...[2.1,,51,.01,.12,.15,2,2.7,17,-19,,,,,,.2,.29,.93,.16]);
    }
    
    explode() {
        this.world.remove(this);
        // sound(...[,,74,.06,.29,.54,4,3.1,,-8,,,,1.3,,.2,,.4,.24]);
        roundShot(this.world, this, 12, this.owner);
    }

    cycle(elapsed) {
        super.cycle(elapsed);

        if (this.age > 0.09) {
            this.explode();
            return;
        }

        for (const obstacle of this.world.bucket('obstacle')) {
            if (!isBetween(obstacle.minX, this.x, obstacle.maxX)) continue;

            const idealY = obstacle.yAt(this.x);
            if (sign(idealY - this.y) !== obstacle.directionY) {
                this.explode();
            }
        }

        for (const target of targets(this.world, this.owner)) {
            if (dist(target, this) > target.radius) continue;
            this.explode();
        }

        if (this.target) {
            const angleToTarget = normalize(angleBetween(this, this.target));
            this.angle += between(
                -elapsed * PI * 2,
                normalize(angleToTarget - normalize(this.angle)),
                elapsed * PI * 2,
            );
        } else {
            let angleSin = sin(this.angle);
            angleSin += between(
                -elapsed * 0.2,
                1 - sin(this.angle),
                elapsed * 0.2,
            );
            this.angle = atan2(angleSin, cos(this.angle));
        }

        this.x += cos(this.angle) * elapsed * this.speed;
        this.y += sin(this.angle) * elapsed * this.speed;

        if ((this.nextParticle -= elapsed) <= 0) {
            this.nextParticle = 1 / 680;

            this.world.add(new Particle(
                '#FFA500', // Hex orange color
                [rnd(2, 7), rnd(5, 10)],
                [this.x, this.x + rnd(-3, 3)],
                [this.y, this.y + rnd(-3, 3)],
                rnd(0.7, 1),
                'square',
            ));
        }
    }
}

//
// This is a simple example of a class that extends Weapon. It has a name of
// 'Machine Gun', a damage of 10, and a rate of fire of 10. This class is
// incomplete, but it demonstrates how to extend Weapon. The constructor should
// call the superclass constructor with the same arguments as Weapon. The
// constructor should also set any additional properties that are specific to  

