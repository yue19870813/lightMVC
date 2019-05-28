import BaseCommand from "./BaseCommand";
import { BaseView } from "./BaseView";
import BaseModel from "./BaseModel";

export default class BaseMediator {

    public view: BaseView;

    public init(): void {

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
