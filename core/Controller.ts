import { BaseView } from "./base/BaseView";
import BaseMediator from "./base/BaseMediator";
import Canvas = cc.Canvas;
import BaseScene from "./base/BaseScene";

/**
 * mvc框架控制类
 * @author ituuz
 * @description 负责控制和维护框架各个节点和结构间的跳转和关联。
 */
export class Controller {
    // 实例
    private static _instance: Controller = new Controller();
    // 上一个场景
    private _lastScene: {prototype: BaseMediator};
    // 当前场景
    private _currScene: {prototype: BaseMediator};
    // 当前显示的view列表
    private _viewList: BaseView[];

    /**
     * @constructor
     * @private
     */
    private constructor () {
    }

    /**
     * 单例获取类
     */
    public static getInstance(): Controller {
        return this._instance;
    }

    /**
     * 运行场景
     * @param {{new(): BaseMediator}} mediator 场景mediator类型，类类型。
     * @param {{new(): BaseScene}} view 场景mediator类型，类类型。
     * @param {Object} data 自定义的任意类型透传数据。
     * @private
     */
    public __runScene(mediator: {new(): BaseMediator}, view: {new(): BaseScene}, data:any = null): void {
        if (this._currScene) {
            // 保存当前场景
            this._lastScene = this._currScene;
        }
        // 重置当前场景
        this._currScene = mediator;
        // 创建并绑定场景
        let sceneMediator: BaseMediator = new mediator();
        console.dir(sceneMediator);
        sceneMediator.init();

        // 处理场景显示逻辑
        let scenePath: string = (<any>(view)).path();
        if (scenePath === "") {
            let ccs = new cc.Scene();
            ccs.name = "Scene";
            let canvasNode = new cc.Node();
            canvasNode.name = "Canvas";
            canvasNode.addComponent(cc.Canvas);
            sceneMediator.view = canvasNode.addComponent(view);
            ccs.addChild(canvasNode);
            cc.director.runSceneImmediate(ccs);
            sceneMediator.viewDidAppear();
        } else {
            cc.director.loadScene(scenePath, ()=>{
                let canvas = cc.director.getScene().getChildByName('Canvas');
                if (canvas) {
                    sceneMediator.view = canvas.addComponent(view);
                    sceneMediator.viewDidAppear();
                } else {
                    console.log("场景中必须包含默认的Canvas节点！");
                }
            });
        }
    }
}

/**
 node version_generator.js -v 1.0.0 -u http://http://10.232.32.217:8080/remote/ -s build/jsb-default/ -d assets/
 */
