class Particle extends Entity {

    constructor(
        color,
        valuesSize,
        valuesX,
        valuesY,
        duration,
        shape = 'arc',
    ) {
        super();
        this.color = color;
        this.valuesSize = valuesSize;
        this.valuesX = valuesX;
        this.valuesY = valuesY;
        this.duration = duration;
        this.shape = shape;
    }

    cycle(elapsed) {
        super.cycle(elapsed);
        if (this.age > this.duration) {
            this.world.remove(this);
        }
    }

    interp(property) {
        const progress = this.age / this.duration;
        return property[0] + progress * (property[1] - property[0]);
    }

    render() {
        const size = this.interp(this.valuesSize);
        ctx.translate(this.interp(this.valuesX), this.interp(this.valuesY));
        ctx.rotate(PI / 4);

        ctx.fillStyle = this.color;
        ctx.globalAlpha = this.interp([1, 0]);
        if (this.shape === 'square')
        {ctx.fillRect(-size / 2, -size / 2, size, size);}
        else if (this.shape === 'arc')
        {ctx.beginPath();
        ctx.arc(0, 0, size / 4, 0, 2 * PI);
        ctx.fill();}
        else {
            ctx.rotate(- PI / 4);
            ctx.fillRect(0,0 , size, 1);
        }
    
}
}
