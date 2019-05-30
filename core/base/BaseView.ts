/**
 * 视图基类
 */
import ViewEvent from "./ViewEvent";

const {ccclass, property} = cc._decorator;

@ccclass
export class BaseView extends cc.Component {

    /** 当前视图的事件对象 */
    private _event: ViewEvent;

    public __init(): void {
        this._event = new ViewEvent();
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
        this._event.emit(event, body)
    }

    public __bindEvent(name: string, cb: (body: any)=>void, target): void {
        this._event.on(name, cb, target);
    }

    public static path(): string {
        return "";
    }
}
