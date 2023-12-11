export class Draw {
    constructor(ctx) {
        this.ctx = ctx
    }
    static circle({ ctx, x, y, ray, color }) {
        try {
            ctx.beginPath();
            ctx.arc(x, y, ray, 0, Math.PI * 2);
            ctx.fillStyle = color;  // color do preenchimento (substitua com a color desejada)
            ctx.fill();
            ctx.closePath();
            return null
        } catch (err) {
            return err
        }
    }

    circle({ x, y, ray, color }) {
        try {
            this.ctx.beginPath();
            this.ctx.arc(x, y, ray, 0, Math.PI * 2);
            this.ctx.fillStyle = color;  // color do preenchimento (substitua com a color desejada)
            this.ctx.fill();
            this.ctx.closePath();
        } catch (err) {
            console.log(err)
        } finally {
            return this
        }
    }

    static rect({ ctx, x, y, color, width, height }) {
        try {
            ctx.fillStyle = color;
            ctx.fillRect(x, y, width, height);  // Parâmetros: x, y, width, height
        } catch (err) {
            console.log(err)
        } finally {
            return this
        }
    }

    rect({ x, y, color, width, height }) {
        try {
            this.ctx.fillStyle = color;
            this.ctx.fillRect(x, y, width, height);  // Parâmetros: x, y, width, height
        } catch (err) {
            console.log(err)
        } finally {
            return this
        }
    }

    static line({ ctx, color, Designs, idElem1, idElem2 }) {
        try {
            if (!idElem1 || !idElem2) return;

            var v1 = Designs.find(e => e.id === idElem1);
            var v2 = Designs.find(e => e.id === idElem2);

            if (v1 && v2) {

                ctx.beginPath();
                ctx.moveTo(v1.x, v1.y);
                ctx.lineTo(v2.x, v2.y);
                ctx.strokeStyle = color;
                ctx.stroke();
                ctx.closePath();
            }
        } catch (err) {
            console.log(err)
        } finally {
            return this
        }
    }

    line({ color, Designs, idElem1, idElem2 }) {
        try {
            if (!idElem1 || !idElem2) return;
            console.log(idElem1)

            var v1 = Designs.find(e => e.id === idElem1);
            var v2 = Designs.find(e => e.id === idElem2);

            if (v1 && v2) {

                this.ctx.beginPath();
                this.ctx.moveTo(v1.x, v1.y);
                this.ctx.lineTo(v2.x, v2.y);
                this.ctx.strokeStyle = color;
                this.ctx.stroke();
                this.ctx.closePath();
            }
        } catch (err) {
            console.log(err)
        } finally {
            return this
        }
    }
}