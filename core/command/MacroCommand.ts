import BaseCommand from "../base/BaseCommand";

export default abstract class MacroCommand extends BaseCommand {

    protected abstract initialize(): void;

    protected addSubCommand(): void {

    }
}