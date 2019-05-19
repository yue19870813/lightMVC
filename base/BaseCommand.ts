import BaseModel from "./BaseModel";

export default abstract class  BaseCommand {

    public abstract execute(): void;

    public abstract undo(): void;

    public getModel<T extends BaseModel>(model: {prototype: T}): T {

        return null;
    }

    public sendCmd(): void {

    }

    public undoCmd(): void {
        
    }

    public sendNoti(): void {

    }
}
