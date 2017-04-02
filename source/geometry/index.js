
/* Takes an angle in radians and returns a point on the unit circle at that angle */
export function toCircle(theta, r = 1) { // rename polarToCartesian?
    return [r * Math.cos(theta), r * Math.sin(theta)];
}

export function circlePoints(n, r) {
    return Array(n).fill(1).map((_, i) => toCircle(2 * Math.PI * i/n, r));
}

export function degToRad(theta) {
    return theta * Math.PI / 180;
}

export function scale(vec, a) {
    return vec.map(v => v.length ? scale(v, a) : v * a);
}

export function L1(vec) {
    return vec.reduce((acc, v) => acc + v)
}

export function Lp(vec, p) {
    return Math.pow(vec.reduce((acc, v) => acc + Math.pow(v, p)), 1/p)
}

export function norm(vec) {
    return Math.hypot(vec)
}