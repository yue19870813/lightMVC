
export default class UIUtils {

    public static seekUI(): void {

    }
}

export class UIContainer {
    /** 所有节点集合 */
    private _uiNodesMap: Map<string, cc.Node>;

    public constructor (nodesMap: Map<string, cc.Node>) {
        this._uiNodesMap = nodesMap;
    }

    /**
     * 根据节点名字获取节点
     * @param {string}name 节点名字
     * @return {cc.Node}
     */
    public getNode(name: string): cc.Node {
        return this._uiNodesMap.get(name);
    }

    /**
     * 根据节点名字和组件类型获取组件对象
     * @param {string}name 节点名字
     * @param {{prototype: cc.Component}}com 组建类型
     * @return {cc.Component}
     */
    public getComponent<T extends cc.Component>(name: string, com: {prototype: T}): T {
        let node = this._uiNodesMap.get(name);
        if (node) {
            return node.getComponent(com);
        }
        return null;
    }
}
