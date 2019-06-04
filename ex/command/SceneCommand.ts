import SimpleCommand from "../../core/command/SimpleCommand";

/**
 * TODO:根据配置文件加载场景
 * @example 数据格式如下：
 *  {
 *      viewClass: "",
 *      mediatorClass: "",
 *      children: [
 *          {
 *              viewClass: "",
 *              mediatorClass: "",
 *          }, {
 *              viewClass: "",
 *              mediatorClass: "",
 *          }
 *      ]
 *  }
 */
export class LoadSceneByCfgCmd extends SimpleCommand {

    public execute(body?: any): void {
        // TODO:
    }

    public undo(body?: any): void {
        // TODO:
    }

}
