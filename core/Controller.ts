import {BaseView} from "./base/BaseView";
import BaseMediator from "./base/BaseMediator";
import BaseScene from "./base/BaseScene";
import {OPEN_VIEW_OPTION} from "./Constants";
import Canvas = cc.Canvas;

/**
 * mvc框架控制类
 * @author ituuz
 * @description 负责控制和维护框架各个节点和结构间的跳转和关联。
 */
export class Controller {
    // 实例
    private static _instance: Controller = new Controller();

    // 当前显示的view列表
    private __viewList: BaseView[];

    /**
     * @constructor
     * @private
     */
    private constructor () {
        this.__viewList = [];
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
     * @param {Object} data 自定义的任意类型透传数据。（可选）
     * @private
     */
    public __runScene__(mediator: {new(): BaseMediator}, view: {new(): BaseScene}, data?: any): void {
        // 创建并绑定场景
        let sceneMediator: BaseMediator = new mediator();
        sceneMediator.init(data);

        // 处理场景显示逻辑
        let scenePath: string = (<any>(view)).path();
        if (scenePath === "") {
            let ccs = new cc.Scene();
            ccs.name = "Scene";
            let canvasNode = new cc.Node();
            canvasNode.name = "Canvas";
            canvasNode.addComponent(cc.Canvas);
            sceneMediator.view = canvasNode.addComponent(view);
            sceneMediator.view.__init__();
            ccs.addChild(canvasNode);
            cc.director.runSceneImmediate(ccs);
            sceneMediator.viewDidAppear();
        } else {
            cc.director.loadScene(scenePath, ()=>{
                let canvas = cc.director.getScene().getChildByName('Canvas');
                if (canvas) {
                    sceneMediator.view = canvas.addComponent(view);
                    sceneMediator.view.__init__();
                    sceneMediator.viewDidAppear();
                } else {
                    console.log("场景中必须包含默认的Canvas节点！");
                }
            });
        }
    }

    /**
     * 打开view界面
     * @param {{new(): BaseMediator}} mediator 界面mediator类型，类类型。
     * @param {{new(): BaseView}} view view 场景mediator类型，类类型。
     * @param {Object} data 自定义的任意类型透传数据。（可选）
     * @param {OPEN_VIEW_OPTION} option 打开ui的操作选项，枚举类型。
     */
    public __popView__(mediator: {new(): BaseMediator}, view: {new(): BaseView}, data?: any, option?: OPEN_VIEW_OPTION): void {
        // 处理打开UI的其他操作
        this.openViewOptionHandler(option);

        // 创建并绑定view
        let viewMediator: BaseMediator = new mediator();
        viewMediator.init(data);

        // 处理场景显示逻辑
        let viewPath: string = (<any>(view)).path();
        if (viewPath === "") {
            let viewNode = new cc.Node();
            viewMediator.view = viewNode.addComponent(view);
            viewMediator.view.__init__();
            cc.director.getScene().addChild(viewNode);
            viewMediator.viewDidAppear();
        } else {
            cc.loader.loadRes(viewPath, cc.Prefab, (err, prefab)=>{
                if (err) {
                    console.error(err);
                    return;
                }
                let viewNode = cc.instantiate(prefab);
                viewMediator.view = viewNode.addComponent(view);
                viewMediator.view.__init__();
                cc.director.getScene().addChild(viewNode);
                viewMediator.viewDidAppear();
            });
        }
    }

    /**
     * 根据参数处理ui的打开方式
     * @param option
     * @private
     */
    private openViewOptionHandler(option: OPEN_VIEW_OPTION): void {
        // TODO
        if (!option) {
            option = OPEN_VIEW_OPTION.OVERLAY;
        }

    }
}

/**
 node version_generator.js -v 1.0.0 -u http://http://10.232.32.217:8080/remote/ -s build/jsb-default/ -d assets/
 */
