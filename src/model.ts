class Node {
    name: string;
    children: Node[];

    constructor(name: string) {
        this.name = name;
        this.children = [];
    }

    addChildren(nodes: Node[]) {
        nodes.forEach( node => this.children.push(node) );
    }

    toHash(): object {
        if (this.children.length === 0) {
            return {name: this.name};
        }
        return {name: this.name, children: this.children.map(c => c.toHash())};
    }
}

export class Model {
    raw: object;
    constructor(data: object) {
        this.raw = data;
    }

    convert(data: object) {
        var result: Node[] = [];
        if (Array.isArray(data)) {
            data.forEach(e => {
                if (typeof e === 'string') {
                    result.push(new Node(e));
                } else { // object
                    const key = Object.keys(e)[0];
                    const node = new Node(key);
                    node.addChildren(this.convert(e[key]));
                    result.push(node);
                }
            });
            return result;
        }
        return result;
    }

    export() {
        if (this.raw === {}) {
            console.log('default');
            return {};
        }
        return this.convert(this.raw).map(n => n.toHash());
    }
}