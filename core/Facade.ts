import {ViewManager} from "./manager/ViewManager";
import BaseMediator from "./base/BaseMediator";
import BaseScene from "./base/BaseScene";
import {BaseView} from "./base/BaseView";
import {OPEN_VIEW_OPTION} from "./Constants";
import BaseCommand from "./base/BaseCommand";
import CommandManager from "./manager/CommandManager";
import ModelManager from "./manager/ModelManager";
import BaseModel from "./base/BaseModel";
import NotificationManager from "./manager/NotificationManager";

export class Facade {

    private static _instance: Facade = new Facade();

    private constructor () {

    }

    public static getInstance(): Facade {
        return this._instance;
    }
    /**
     * 运行场景
     * @param {{new(): BaseMediator}} mediator 场景mediator类型，类类型。
     * @param {{new(): BaseScene}} view 场景mediator类型，类类型。
     * @param {Object} data 自定义的任意类型透传数据。（可选）
     */
    public runScene(mediator: {new(): BaseMediator}, view: {new(): BaseScene}, data?: any): void {
        ViewManager.getInstance().__runScene__(mediator, view, data);
    }

    /**
     * 打开view界面
     * @param {{new(): BaseMediator}} mediator 界面mediator类型，类类型。
     * @param {{new(): BaseView}} view view 场景mediator类型，类类型。
     * @param {Object} data 自定义的任意类型透传数据。（可选）
     */
    public popView(mediator: {new(): BaseMediator}, view: {new(): BaseView}, data?: any): void {
        ViewManager.getInstance().__showView__(mediator, view, data, OPEN_VIEW_OPTION.OVERLAY, 0);
    }

    /**
     * 创建view层
     * @param {{new(): BaseMediator}} mediator 界面mediator类型，类类型。
     * @param {{new(): BaseView}} view view 场景mediator类型，类类型。
     * @param {number} zOrder ui层级
     * @param {Object} data 自定义的任意类型透传数据。（可选）
     */
    public addLayer(mediator: {new(): BaseMediator}, view: {new(): BaseView}, zOrder?: number, data?: any): void {
        ViewManager.getInstance().__showView__(mediator, view, data, OPEN_VIEW_OPTION.LAYER, zOrder);
    }
    /**
     * 执行命令
     * @param {{new (): BaseCommand}} command 命令对象
     * @param {Object} body 命令参数
     */
    public __sendCommand__(command: {new (): BaseCommand}, body?: any): void {
        CommandManager.getInstance().__executeCommand__(command, body);
    }

    /**
     * 撤销命令
     * @param {{new (): BaseCommand}} command 命令对象
     * @param {Object} body 命令参数
     */
    public __undoCommand__(command: {new (): BaseCommand}, body?: any): void {
        CommandManager.getInstance().__undoCommand__(command, body);
    }

    /**
     * 发送消息通知
     * @param {string} noti 通知key值
     * @param {Object} body 消息传递的参数
     * @private
     */
    public __sendNotification__(noti: string, body: any): void {
        NotificationManager.getInstance().__sendNotification__(noti, body);
    }

    /**
     * 注册数据model
     * @param {{new (): BaseModel}} model
     */
    public registerModel(model: {new (): BaseModel}): void {
        ModelManager.getInstance().registerModel(model);
    }

    /**
     * 获取model对象
     * @param {{new (): BaseModel}} model
     */
    public getModel<T extends BaseModel>(model: {new (): T}): T {
        return ModelManager.getInstance().getModel(model);
    }
}

