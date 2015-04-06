export class Controller {

    tree: any;
    strNodes: string[];

    constructor() {
        this.tree = [1,[2, null, [3, null, null]], [2, null,[3, null, null]]];
        this.strNodes = [];
        this.strNodes.push(JSON.stringify(this.tree));
    }

    getSame() {
        this.getNodes(this.tree);

        var results:{
            node:string;
            count:number;
        }[] = [];

        this.strNodes.forEach(node => {
            var filteredResult = results.filter(res => res.node === node);
            if (filteredResult.length === 0) {
                results.push({
                    node: node,
                    count: 1
                });
            } else {
                filteredResult[0].count++;
            }
         });
        console.log(results);
    }

    getNodes(nodes:any[]) {
        nodes.forEach(node => {
            var strNode = JSON.stringify(node);
            this.strNodes.push(strNode);
            if (Array.isArray(node)) {
                this.getNodes(node);
            }
        });
    }
}
