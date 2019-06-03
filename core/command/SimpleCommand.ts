/**
 * 命令基类
 */
import BaseCommand from "../base/BaseCommand";
import BaseModel from "../base/BaseModel";

export default abstract class SimpleCommand extends BaseCommand {

    /**
     * 执行命令接口
     * @param {Object} body 命令参数
     */
    public abstract execute(body?: any): void;

    /**
     * 撤销命令接口
     * @param {Object} body 命令参数
     */
    public abstract undo(body?: any): void;

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