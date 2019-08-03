import SimpleCommand from "../../lightMVC/core/command/SimpleCommand";

/**
 * 根据配置加载场景或者view的命令。
 */
export default class LoadLayersCmd extends SimpleCommand {

    public execute(body?: any): void {

    }    
    
    public undo(body?: any): void {
        throw new Error("Method not implemented.");
    }
  
}
