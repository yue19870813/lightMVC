import {BaseView} from "../base/BaseView";
import BaseMediator from "../base/BaseMediator";
import BaseScene from "../base/BaseScene";
import {OPEN_VIEW_OPTION} from "../Constants";
import Canvas = cc.Canvas;
import FrameworkCfg from "../FrameworkCfg";

/**
 * mvc框架控制类
 * @author ituuz
 * @description 负责控制和维护框架各个节点和结构间的跳转和关联。
 */
export class ViewManager {

    // 实例
    private static _instance: ViewManager = new ViewManager();

    /** 当前场景 */
    private _curScene: BaseMediator;
    /** 当前显示的pop view列表 */
    private _popViewList: BaseMediator[];
    /** 当前显示的layer view列表 */
    private _layerViewList: BaseMediator[];

    /**
     * @constructor
     * @private
     */
    private constructor () {
        this._popViewList = [];
        this._layerViewList = [];
    }

    /**
     * 单例获取类
     */
    public static getInstance(): ViewManager {
        return this._instance;
    }

    /**
     * 运行场景
     * @param {{new(): BaseMediator}} mediator 场景mediator类型，类类型。
     * @param {{new(): BaseScene}} view 场景mediator类型，类类型。
     * @param {Object} data 自定义的任意类型透传数据。（可选）
     * @param {()=>void} cb 加载完成回调.
     * @private
     */
    public __runScene__(mediator: {new(): BaseMediator}, view: {new(): BaseScene}, data?: any, cb?: ()=>void): void {
        // 创建并绑定场景
        let sceneMediator: BaseMediator = new mediator();
        sceneMediator["__init__"]();
        sceneMediator.init(data);

        // 如果前一场景不为空则进行清理
        if (this._curScene) {
            this._curScene.destroy();
        }

        // 保存当前场景
        this._curScene = sceneMediator;

        // 处理场景显示逻辑
        let scenePath: string = (<any>(view)).path();
        if (scenePath === "") {
            let ccs = new cc.Scene();
            ccs.name = "Scene";
            let canvasNode = new cc.Node();
            canvasNode.name = "Canvas";
            let canvas = canvasNode.addComponent(cc.Canvas);
            canvas.designResolution = FrameworkCfg.DESIGN_RESOLUTION;
            canvas.fitHeight = FrameworkCfg.FIT_HEIGHT;
            canvas.fitWidth = FrameworkCfg.FIT_WIDTH;
            sceneMediator.view = canvasNode.addComponent(view);
            sceneMediator.view.__init__();
            ccs.addChild(canvasNode);
            cc.director.runSceneImmediate(ccs);
            sceneMediator.viewDidAppear();
            cb && cb();
        } else {
            cc.director.loadScene(scenePath, ()=>{
                let canvas = cc.director.getScene().getChildByName('Canvas');
                if (canvas) {
                    sceneMediator.view = canvas.addComponent(view);
                    sceneMediator.view.__init__();
                    sceneMediator.viewDidAppear();
                    cb && cb();
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
     * @param {number} zOrder 层级。
     * @param {()=>void} cb 加载完成回调.
     */
    public __showView__(mediator: {new(): BaseMediator}, view: {new(): BaseView},
                        data?: any, option?: OPEN_VIEW_OPTION, zOrder?: number, cb?: ()=>void): void {
        // 处理打开UI的其他操作
        this.openViewOptionHandler(option);

        // 创建并绑定view
        let viewMediator: BaseMediator = new mediator();
        viewMediator["__init__"]();
        viewMediator.init(data);

        // 处理场景显示逻辑
        let viewPath: string = (<any>(view)).path();
        if (viewPath === "") {
            let viewNode = new cc.Node();
            this.initViewMediator(viewMediator, viewNode, view);
            cb && cb();
        } else {
            cc.loader.loadRes(viewPath, cc.Prefab, (err, prefab)=>{
                if (err) {
                    console.error(err);
                    return;
                }
                let viewNode = cc.instantiate(prefab);
                this.initViewMediator(viewMediator, viewNode, view);
                cb && cb();
            });
        }
    }

    /**
     * 初始化ViewMediator
     * @param {BaseMediator} mediator ViewMediator
     * @param {cc.Node} viewNode view显示节点
     * @param {{new(): BaseView}} view view显示组件类
     * @param {OPEN_VIEW_OPTION} option 打开选项
     * @param {number} zOrder 层级排序
     */
    private initViewMediator(mediator: BaseMediator, viewNode: cc.Node, view: {new(): BaseView},
                             option?: OPEN_VIEW_OPTION, zOrder?: number): void {
        viewNode.zIndex = zOrder;
        mediator.view = viewNode.addComponent(view);
        mediator.view.__init__();
        cc.director.getScene().getChildByName('Canvas').addChild(viewNode);
        mediator.viewDidAppear();
        // 根据不同打开类型，存储到不同队列中。
        if (option === OPEN_VIEW_OPTION.OVERLAY || option === OPEN_VIEW_OPTION.SINGLE) {
            this._popViewList.push(mediator);
        } else if (option === OPEN_VIEW_OPTION.LAYER) {
            this._layerViewList.push(mediator);
        }
    }

    /**
     * 根据参数处理ui的打开方式
     * @param option
     * @private
     */
    private openViewOptionHandler(option: OPEN_VIEW_OPTION): void {
        // 设置默认值
        if (!option) {
            option = OPEN_VIEW_OPTION.OVERLAY;
        }
        // 根据不同操作做不同处理
        if (option === OPEN_VIEW_OPTION.SINGLE) {
            // TODO:暂时不提供这种关闭其他view的打开方式，可以通过BaseView.closeAllPopView()来实现。
        }
    }

    /**************************** getter and setter ******************************/
    get popViewList(): BaseMediator[] {
        return this._popViewList;
    }
    get layerViewList(): BaseMediator[] {
        return this._layerViewList;
    }
    get curScene(): BaseMediator {
        return this._curScene;
    }
}

/**
 node version_generator.js -v 1.0.0 -u http://http://10.232.32.217:8080/remote/ -s build/jsb-default/ -d assets/
 */
