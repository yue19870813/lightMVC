import {Controller} from "./Controller";
import BaseMediator from "./base/BaseMediator";
import BaseScene from "./base/BaseScene";
import {BaseView} from "./base/BaseView";
import {OPEN_VIEW_OPTION} from "./Constants";

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
        Controller.getInstance().__runScene__(mediator, view, data);
    }

    /**
     * 打开view界面
     * @param {{new(): BaseMediator}} mediator 界面mediator类型，类类型。
     * @param {{new(): BaseView}} view view 场景mediator类型，类类型。
     * @param {Object} data 自定义的任意类型透传数据。（可选）
     * @param {OPEN_VIEW_OPTION} option 打开ui的操作选项，枚举类型。
     */
    public popView(mediator: {new(): BaseMediator}, view: {new(): BaseView}, data?: any, option?: OPEN_VIEW_OPTION): void {
        Controller.getInstance().__popView__(mediator, view, data, option);
    }

    public registerCmd(): void {

    }

    public __sendCommand(): void {

    }

    public __undoCommand(): void {

    }

    public __sendNotification(): void {

    }
}

/** 导入到全局属性mvc中的对外接口和属性等api */
(<any>(window)).mvc = {
    /** mvc全局控制类 */
    facade: Facade.getInstance(),
    /** 打开view选项枚举 */
    OPEN_VIEW_OPTION : OPEN_VIEW_OPTION,
};