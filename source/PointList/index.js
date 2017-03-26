import {listToPoint} from '../utils'

export default class PointList {
    constructor({n, policy, list}) {
        if (list) {
            this.list = list[0].length ? list.map(listToPoint) : list;
        } else if (policy && n) {
            this.list = [];
            for (var i = 0; i < n; i++) {
                this.list.push(policy(i, this.list));
            }
        } else {
            throw "Invalid point list constructor arguments"
        }
    }

    filter(policy) {
        var newList = []
        this.list.forEach((e, i) => {
            if (policy(e, i, this)) {
                newList.push(e)
            }
        })
        this.list = newList
    }
}
