import {Facade} from "../core/Facade";

export class AppFacade  {


}

/** 导入到全局属性mvc中的对外接口和属性等api */
(<any>(window)).mvc = {
    /** mvc全局控制类 */
    facade: Facade.getInstance(),

};

