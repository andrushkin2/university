"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class DisjointSet {
    constructor(amount) {
        this.elements = [];
        this.elements = [];
        for (let i = 0; i < amount; i++) {
            this.elements[i] = new DisjointItem(i, 0, 1);
        }
    }
    join(x, y) {
        if ((x = this.find(x)) === (y = this.find(y))) {
            return;
        }
        if (this.elements[x].rank < this.elements[y].rank) {
            this.elements[x].p = y;
        }
        else {
            this.elements[y].p = x;
        }
        if (this.elements[x].rank === this.elements[y].rank) {
            ++this.elements[x].rank;
        }
    }
    find(x) {
        if (x = this.elements[x].p) {
            return x;
        }
        this.elements[x].p = this.find(this.elements[x].p);
        return this.elements[x].p;
    }
    size(x) {
        return this.elements[x].size;
    }
}
exports.default = DisjointSet;
class DisjointItem {
    constructor(p, rank = 0, size = 1) {
        this.rank = rank,
            this.size = size;
        this.p = p;
    }
}
