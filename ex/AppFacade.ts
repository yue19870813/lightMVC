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
}

/** 导入到全局属性mvc中的对外接口和属性等api */
(<any>(window)).mvc = {
    /** mvc全局控制类 */
    facade: AppFacade.getInstance().getFacade(),
};

