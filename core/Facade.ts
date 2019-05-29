import { Controller } from "./Controller";
import BaseMediator from "./base/BaseMediator";
import BaseScene from "./base/BaseScene";

export class Facade {

    private static _instance: Facade = new Facade();

    private constructor () {

    }

    public static getInstance(): Facade {
        return this._instance;
    }

    public runScene(mediator: {new(): BaseMediator}, view: {new(): BaseScene}, data:any = null): void {
        console.log("-----------=========================");
        Controller.getInstance().__runScene(mediator, view, data);
    }

    public popView(): void {
        console.log("===================== popView");
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

export class MVC {
    static facade = Facade.getInstance();
} 

(<any>(window)).mvc = MVC;