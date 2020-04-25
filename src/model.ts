class Node {
    name: string;
    children: Node[];

    constructor(name: string) {
        this.name = name;
        this.children = [];
    }

    addChild(node: Node) {
        this.children.push(node);
    }

    toHash() {
        return {name: this.name};
    }
}

export class Model {
    raw: object;
    constructor(data: object) {
        this.raw = data;
    }

    convert() {
        var result: Node[] = [];
        if (Array.isArray(this.raw)) {
            this.raw.forEach(e => {
                result.push(new Node(e));
            });
            return result.map(n => n.toHash());
        }
        return result.map(n => n.toHash());
    }

    export() {
        if (this.raw === {}) {
            console.log('default');
            return {};
        }
        return this.convert();
    }
}