
export default class DisjointSet {
    private elements: DisjointItem[] = [];
    constructor(amount: number) {
        this.elements = [];
        for (let i = 0; i < amount; i++) {
            this.elements[i] = new DisjointItem(i, 0, 1);
        }
    }
    public join(x: number, y: number) {
        if ((x = this.find(x)) == (y = this.find(y))) {
            return;
        }
        if (this.elements[x].rank < this.elements[y].rank) {
            this.elements[x].p = y;
        } else {
            this.elements[y].p = x;
        }
        if (this.elements[x].rank === this.elements[y].rank) {
            ++this.elements[x].rank;
        }
    }
    public find(x: number) {
        if (x = this.elements[x].p) {
            return x;
        }
        this.elements[x].p = this.find(this.elements[x].p);
        return this.elements[x].p;
    }
    public size(x: number) {
        return this.elements[x].size;
    }
}

class DisjointItem {
    constructor(p: number, rank = 0, size = 1){
        this.rank = rank,
        this.size = size;
        this.p = p;
    }
    public rank: number;
    public size: number;
    public p: number;
}