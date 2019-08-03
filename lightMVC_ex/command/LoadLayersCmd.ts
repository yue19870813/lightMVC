import SimpleCommand from "../../lightMVC/core/command/SimpleCommand";
import { Facade } from "../../lightMVC/core/Facade";
import JSUtil from "../../lightMVC/util/JSUtil";

/**
 * 根据配置加载场景或者view的命令。
 */
export default class LoadLayersCmd extends SimpleCommand {

    public undo(body?: any): void {
        throw new Error("Method not implemented.");
    }
    
    public execute(body?: any): void {
        body = {
            viewClass: "MainSceneView",
            medClass: "MainSceneMediator",
            children: [
                {
                    viewClass: "FirstView",
                    medClass: "FirstMediator",
                }
            ]
        };

        // 加载完场景开始加载view
        let loadViewChildren = ()=>{
            // TODO 
        };

        let viewModule = null;
        // load scene
        JSUtil.importCls(body.viewClass).then((module)=>{
            viewModule = module;
            return JSUtil.importCls(body.mediatorClass);
        }).then((medModule)=>{
            Facade.getInstance().runScene(medModule, viewModule, null, loadViewChildren.bind(this));
        });
    }    
    
    public loadView(viewCls, medCls): Promise<any> {
        return new Promise<any>((resolve, reject)=>{
            Facade.getInstance().addLayer(medCls, viewCls, 0, null, ()=>{
                resolve();
            });
        });
    }
  
}
