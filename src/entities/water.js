class Water extends Entity {

    constructor(y) {
        super();
        this.buckets.push('water');
        this.y = y;



        const amplitude = 10;
        this.patterns = [0.8, 1].map(factor => {
            const color = multiplyColor('#27c6dc', factor);
            const pattern = createCanvasPattern(100, amplitude * 2, (ctx) => {
                ctx.fillStyle = color;

                ctx.beginPath();
                ctx.moveTo(0, amplitude * 2);
                for (let x = 0 ; x <= 100 ; x += 2) {
                    ctx.lineTo(
                        x,
                        amplitude + abs(sin(x / 100 * PI * 2)) * amplitude,
                    );
                }
                ctx.lineTo(100, amplitude * 2);
                ctx.fill();
            });
            pattern.color = color;
            pattern.factor = factor;
            return pattern;
        });
    }

    render(camera) {
        if (camera.y - CANVAS_HEIGHT / 2 < this.y) return;

        ctx.translate(~~camera.x - CANVAS_WIDTH / 2, this.y);

        let baseY = 0;
        let speedX = 50;
        for (const pattern of this.patterns) {
            ctx.wrap(() => {
                const offsetX = this.age * speedX - camera.x;
                ctx.translate(offsetX, baseY);

                ctx.fillStyle = pattern;
                ctx.fillRect(-offsetX, 0, CANVAS_WIDTH, 100);

                ctx.fillStyle = pattern.color;
                ctx.fillRect(-offsetX, pattern.height, CANVAS_WIDTH, 1000);

            });

            baseY += 20;
            speedX *= 1.1;
        }
    }
}
