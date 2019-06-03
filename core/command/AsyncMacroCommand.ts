/**
 * 命令基类
 */
import BaseCommand from "../base/BaseCommand";
import BaseModel from "../base/BaseModel";

export default abstract class SimpleCommand extends BaseCommand {

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