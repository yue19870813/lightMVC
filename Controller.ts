import { BaseView } from "./base/BaseView";
import BaseMediator from "./base/BaseMediator";

/**
 * mvc框架控制类
 * @author ituuz
 * @since 2019-05-18
 */
export class Controller {

    private static _instance: Controller = new Controller();

    // 上一个场景
    private _lastScene: {prototype: BaseMediator};
    // 当前场景
    private _currScene: {prototype: BaseMediator};
    // 当前显示的view列表
    private _viewList: BaseView[];

    private constructor () {

    }

    public static getInstance(): Controller {
        return this._instance;
    }

    public __runScene(scene: {new(): BaseMediator}, data:any = null): void {
        if (this._currScene) {
            // 保存当前场景
            this._lastScene = this._currScene;
        }
        
        
        let sceneView = new scene();
        sceneView.test = 777;
        console.dir(sceneView);
        let cmpt = (<any>scene).cmpt;
        console.log(cmpt.path());
        
    }
}
