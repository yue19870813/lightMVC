import {Facade} from "../core/Facade";

export class AppFacade  {

    private static _instance: AppFacade = new AppFacade();

    private constructor () {

    }

    /**
     * 单例获取类
     * @return {AppFacade}
     */
    public static getInstance(): AppFacade {
        return this._instance;
    }

    /**
     * 获取Facade
     * @return {Facade}
     */
    public getFacade(): Facade {
        return Facade.getInstance();
    }

    /**
     * 初始化框架配置
     * @param {boolean} debug 是否是调试状态
     * @param {cc.Size} designResolution 设计分辨率
     * @param {boolean} fitHeight 是否高适配
     * @param {boolean} fitWidth 是否宽适配
     */
    public initFramework(debug: boolean, designResolution: cc.Size, fitHeight: boolean, fitWidth: boolean): void {
        // 初始化框架基本配置
        this.getFacade().init(debug, designResolution, fitHeight, fitWidth);
    }

    // TODO:初始化游戏数据
    public initAppData(): void {

    }

    /**
     * 根据配置生成场景
     * @param {Object} cfg 配置
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
    public createSceneWithCfg(cfg: any): void {
        // TODO 根据配置生成场景
    }
}

/** 导入到全局属性mvc中的对外接口和属性等api */
(<any>(window)).mvc = {
    appFacade: AppFacade.getInstance(),
};

