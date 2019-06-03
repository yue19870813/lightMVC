import BaseCommand from "./BaseCommand";
import { BaseView } from "./BaseView";
import BaseModel from "./BaseModel";
import {Facade} from "../Facade";

/**
 * 视图中介者基类
 * @author Yue
 * @description 生命周期
 *      BaseMediator.init
 *      BaseView.__init
 *      BaseMediator.viewDidAppear
 */
export default class BaseMediator {
    /** 当前中介者持有的view视图 */
    public view: BaseView;
    /**
     * 初始化接口,此时视图还没有创建，如果想操作视图view请在viewDidAppear函数中进行。
     * @param {Object} data 自定义的任意类型透传数据。（可选）
     * @override
     * */
    public init(data?: any): void {

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
        this.view.__bindEvent(name, cb, target);
    }

    public registerNoti(noti: string, cb: (data: any)=>void, target: any): void {

    }

    public sendNoti(noti: string, data: any): void {

    }

    public sendCmd<T extends BaseCommand>(cmd: {prototype: T}, data: any): void {
        
    }

    /**
     * todo:  will remove
     * 打开view界面
     * @param {{new(): BaseMediator}} mediator 界面mediator类型，类类型。
     * @param {{new(): BaseView}} view view 场景mediator类型，类类型。
     * @param {Object} data 自定义的任意类型透传数据。（可选）
     */
    public popView(mediator: {new(): BaseMediator}, view: {new(): BaseView}, data?: any): void {
        Facade.getInstance().addLayer(mediator, view, data);
    }
    
    public getModel<T extends BaseModel>(model: {prototype: T}): T {

        return null;
    }

}
