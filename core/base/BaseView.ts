/**
 * 视图基类
 */
import ViewEvent from "./ViewEvent";

const {ccclass, property} = cc._decorator;

@ccclass
export class BaseView extends cc.Component {

    /** 当前视图的事件对象 */
    private __event__: ViewEvent;

    public __init__(): void {
        this.__event__ = new ViewEvent();
    }

    public init(): void {

    }

    public onLoad () {

    }

    public start () {

    }

    public update (dt: number) {

    }

    /**
     * 发送UI事件
     * @param {string} event 事件名称
     * @param {Object} body 事件参数
     */
    public sendEvent(event: string, body: any): void {
        this.__event__.emit(event, body)
    }

    /**
     * 绑定UI事件
     * @param {string} name 事件名称
     * @param {(body: any)=>void} cb 事件回调
     * @param {BaseMediator} target 事件回调绑定对象
     * @private 私有函数，不得调用。
     */
    public __bindEvent__(name: string, cb: (body: any)=>void, target): void {
        this.__event__.on(name, cb, target);
    }

    public closeView(): void {

    }

    public closeAllPopView(): void {

    }

    /**
     * 但界面被关闭时会被调用，子类可以重写该方法。
     * @override
     */
    public onClose(): void {

    }

    /**
     * 子类覆盖，返回UI的prefab路径
     * @return {string}
     */
    public static path(): string {
        return "";
    }
}