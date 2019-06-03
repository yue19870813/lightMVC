/**
 * 命令控制类
 * @author ituuz
 * @description 负责控制和维护命令。
 */
import BaseCommand from "../base/BaseCommand";
import SimpleCommand from "../command/SimpleCommand";
import SyncMacroCommand from "../command/SyncMacroCommand";
import AsyncMacroCommand from "../command/AsyncMacroCommand";

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

    /**
     * 执行命令
     * @param {{new (): BaseCommand}} command 命令对象
     */
    public excuteCommand(command: {new (): BaseCommand}): void {
        if (cc.js.isChildClassOf(command, SimpleCommand)) {
            let cmd: SimpleCommand = new command() as SimpleCommand;
            cmd.execute();
        } else if (cc.js.isChildClassOf(command, SyncMacroCommand)) {

        } else if (cc.js.isChildClassOf(command, AsyncMacroCommand)) {

        } else {
            console.log(command.prototype + " 不是可执行的命令！");
        }
    }

    /**
     * 撤销命令
     * @param {{new (): BaseCommand}} command 命令对象
     */
    public undoCommand(command: {new (): BaseCommand}): void {
        if (cc.js.isChildClassOf(command, SimpleCommand)) {
            let cmd: SimpleCommand = new command() as SimpleCommand;
            cmd.undo();
        } else if (cc.js.isChildClassOf(command, SyncMacroCommand)) {

        } else if (cc.js.isChildClassOf(command, AsyncMacroCommand)) {

        } else {
            console.log(command.prototype + " 不是可执行的命令！");
        }
    }
}