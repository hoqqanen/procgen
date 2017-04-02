import Point from '../Point';

export default class PointList {
    constructor({n, policy, list}) {
        if (list) {
            // We assume the list is homogenous, and either all Points or arrays of length 2.
            this.points = list[0] instanceof Point ? list : list.map(Point.fromList);
        } else if (policy && n) {
            this.points = [];
            for (var i = 0; i < n; i++) {
                this.points.push(policy(i, this.points));
            }
        } else {
            throw {
                message: "Invalid point list constructor arguments", 
                args: arguments
            }
        }
    }

    filter(policy) {
        var newList = []
        this.points.forEach((e, i) => {
            if (policy(e, i, this)) {
                newList.push(e)
            }
        })
        this.points = newList
    }

    update(updateFn) {
        this.points = updateFn(this.points)
    }

    mapUpdate(updatePoint) {
        var newList = []
        this.points.forEach((e, i) => {
            newList.push(updatePoint(e, i, this.points))
        })
        this.points = newList
    }
}
