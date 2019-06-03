/**
 * 命令基类
 */
import BaseCommand from "../base/BaseCommand";
import BaseModel from "../base/BaseModel";
import {Facade} from "../Facade";

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

    /**
     * 执行命令
     * @param {{new (): BaseCommand}} command 命令对象
     * @param {Object} body 命令参数
     */
    public sendCmd(command: {new (): BaseCommand}, body?: any): void {
        Facade.getInstance().__sendCommand__(command, body);
    }

    /**
     * 撤销命令
     * @param {{new (): BaseCommand}} command 命令对象
     * @param {Object} body 命令参数
     */
    public undoCmd(command: {new (): BaseCommand}, body?: any): void {
        Facade.getInstance().__undoCommand__(command, body);
    }

    public sendNoti(): void {

    }
}