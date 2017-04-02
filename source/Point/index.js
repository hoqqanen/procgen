export default class Point {
    constructor(x, y) {
        this.x = x
        this.y = y
    }

    static fromPolar(r, theta) {
        return new Point(r * Math.cos(theta), r * Math.sin(theta))
    }

    static lerp(p, q, a) {
        return p.scale(1 - a).add(q.scale(a))
    }

    static fromList(lst) {
        if (!lst.length || lst.length != 2) {
            throw {
                message: "Trying to make a point from a list without exactly 2 entries",
                list: lst
            }
        } else {
            return new Point(lst[0], lst[1])
        }
    }

    add(q) {
        return new Point(this.x + q.x, this.y + q.y)
    }

    sub(q) {
        return new Point(this.x - q.x, this.y - q.y)
    }

    scale(a) {
        return new Point(this.x * a, this.y * a)
    }

    dot(q) {
        return this.x * q.x + this.y * q.y
    }

    norm() {
        return Math.hypot(this.x, this.y)
    }

    normalize() {
        return this.scale(1/Math.max(this.norm(), 1e-9))
    }

    distance(q) {
        return this.sub(q).norm()
    }

    toCanvasCoordinates(canvas) {
        // Traditionally y increments going downward on canvas. 
        // We invert its sign to get the usual cartesian system.
        const yDirection = -1

        /* The shorter direction of the canvas is exactly 1 unit.
         * Scale the longer side to be in the same units. If we don't do this
         * distances end up getting squished into different metrics.
         */
        if (canvas.width > canvas.height) {
            const aspect = canvas.height / canvas.width
            return {
                x: this.x * canvas.width / 2 * aspect + canvas.width / 2,
                y: yDirection * this.y * canvas.height / 2 + canvas.height / 2
            }
        } else {
            const aspect = canvas.width / canvas.height
            return {
                x: this.x * canvas.width / 2 + canvas.width / 2,
                y: yDirection * this.y * canvas.height / 2 * aspect + canvas.height / 2
            }
        }
    }
}
