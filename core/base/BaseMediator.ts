import BaseCommand from "./BaseCommand";
import { BaseView } from "./BaseView";
import BaseModel from "./BaseModel";
import {Facade} from "../Facade";

/**
 * 视图中介者基类
 * @author Yue
 * @description 生命周期
 *      BaseMediator.init
 *      BaseView.__init__
 *      BaseMediator.viewDidAppear
 */
export default class BaseMediator {
    /** 当前中介者持有的view视图 */
    public view: BaseView;
    /** 当前中介者中注册的消息列表 */
    private _notiMap: Map<string, {key: string, cb: (data: any)=>void, target: any}>;

    /**
     * 初始化接口,此时视图还没有创建，如果想操作视图view请在viewDidAppear函数中进行。
     * @param {Object} data 自定义的任意类型透传数据。（可选）
     * @override
     * */
    public init(data?: any): void {

    }

    /**
     * 内部初始化使用，外部不要调用。
     * @private
     */
    private __init__(): void {
        this._notiMap = new Map<string, {key: string, cb: (data: any)=>void, target: any}>();
    }

    /**
     * 视图显示后会调用的接口
     * @override
     */
    public viewDidAppear(): void {

    }

    /**
     * 绑定UI事件，接收view层派发的事件。
     * @param {string} name 事件名称
     * @param {(any)=>void} cb 事件回调
     * @param {BaseMediator} target 回调绑定对象
     */
    public bindEvent(name: string, cb: (body: any)=>void, target: BaseMediator): void {
        this.view.__bindEvent__(name, cb, target);
    }

    /**
     * 注册消息监听
     * @param {string} noti 通知key值
     * @param {(data: any)=>void} cb 通知监听的回调函数
     * @param {Object} target 回调绑定的对象
     */
    public registerNoti(noti: string, cb: (data: any)=>void, target: any): void {
        this._notiMap.set(noti, {key: noti, cb: cb, target: target});
    }

    /**
     * 发送消息通知
     * @param {string} noti 通知key值
     * @param {Object} body 消息传递的参数
     */
    public sendNoti(noti: string, body: any): void {
        Facade.getInstance().__sendNotification__(noti, body);
    }

    /**
     * 发送命令接口
     * @param {{new (): BaseCommand}} cmd 命令类
     * @param {Object} data 命令参数
     */
    public sendCmd<T extends BaseCommand>(cmd: {new (): T}, data: any): void {
        Facade.getInstance().__sendCommand__(cmd, data);
    }

    /**
     * 打开view界面
     * @param {{new(): BaseMediator}} mediator 界面mediator类型，类类型。
     * @param {{new(): BaseView}} view view 场景mediator类型，类类型。
     * @param {Object} data 自定义的任意类型透传数据。（可选）
     */
    public popView(mediator: {new(): BaseMediator}, view: {new(): BaseView}, data?: any): void {
        Facade.getInstance().addLayer(mediator, view, data);
    }

    /**
     * 获取model对象
     * @param {{new (): BaseModel}} model
     */
    public getModel<T extends BaseModel>(model: {new (): T}): T {
        return Facade.getInstance().getModel(model);
    }

}
