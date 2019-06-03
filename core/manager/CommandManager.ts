/**
 * 命令控制类
 * @author ituuz
 * @description 负责控制和维护命令。
 */
import BaseCommand from "../base/BaseCommand";
import SimpleCommand from "../command/SimpleCommand";

export default class CommandManager {

    // 实例
    private static _instance: CommandManager = new CommandManager();

    /**
     * @constructor
     * @private
     */
    private constructor () {

    }

    /**
     * 单例获取类
     */
    public static getInstance(): CommandManager {
        return this._instance;
    }

    public excuteCommand(command: {new (): BaseCommand}): void {
        if (cc.js.isChildClassOf(command, SimpleCommand)) {

        }

    }
}