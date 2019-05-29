import BaseCommand from "./BaseCommand";
import { BaseView } from "./BaseView";
import BaseModel from "./BaseModel";

export default class BaseMediator {

    public view: BaseView;

    /**
     * 初始化接口,此时视图还没有创建，如果想操作视图view请在viewDidAppear函数中进行。
     * @override
     * */
    public init(): void {

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
