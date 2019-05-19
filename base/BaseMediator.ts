import BaseCommand from "./BaseCommand";
import { BaseView } from "./BaseView";

export default class BaseMediator {

    public static cmpt: {prototype: BaseView};

    public view: BaseView;

    test: number = 999;

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


}
