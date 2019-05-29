import BaseCommand from "./BaseCommand";
import { BaseView } from "./BaseView";
import BaseModel from "./BaseModel";

/**
 * 视图中介者基类
 * @author Yue
 */
export default class BaseMediator {
    /** 当前中介者持有的view视图 */
    public view: BaseView;
    /** 当前视图的事件对象 */
    private _event;
    /**
     * 初始化接口,此时视图还没有创建，如果想操作视图view请在viewDidAppear函数中进行。
     * @param {Object} data 自定义的任意类型透传数据。（可选）
     * @override
     * */
    public init(data: any = null): void {

    }

    /**
     * 视图显示后会调用的接口
     * @override
     */
    public viewDidAppear(): void {

    }

    public bindEvent(event: string, data: any): void {

    }

    public registerNoti(noti: string, cb: (data: any)=>void, target: any): void {

    }

    public sendNoti(noti: string, data: any): void {

    }

    public sendCmd<T extends BaseCommand>(cmd: {prototype: T}, data: any): void {
        
    }
    
    public getModel<T extends BaseModel>(model: {prototype: T}): T {

        return null;
    }

}
