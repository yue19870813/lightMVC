/**
 * 视图事件类，负责处理view与mediator之间的事件监听和派发
 * @author Yue
 */
export default class ViewEvent{

    /** 事件列表 */
    private _eventList: __ViewEvent[];

    public constructor() {
        // 初始化事件列表
        this._eventList = [];
    }

    /**
     * 注册事件
     * @param {string} name 事件名称
     * @param {(...args)=>void} cb 事件回调
     * @param {BaseMediator} target 绑定事件的对象
     */
    public on(name: string, cb: (...args)=>void, target: BaseMediator): void {
        let event = new __ViewEvent(name, cb, target);
        for (let e of this._eventList) {
            if (e.equals(event)) {
                console.log("事件[" + name + "]已存在！");
                return;
            }
        }
        this._eventList.push(event);
    }

    /**
     * 派发事件
     * @param {string} name 事件名称
     * @param {...} args 事件参数，动态参数列表
     */
    public emit(name: string, ...args): void {
        for (let e of this._eventList) {
            if (e.name === name) {
                console.log("事件[" + name + "]已存在！");
                e.cb && e.cb.call(e.target, args);
                break;
            }
        }
    }

    /**
     * 移除指定事件
     * @param {string} name 事件名称
     * @return {boolean} 是否移除
     */
    public remove(name: string): boolean {

        return true;
    }

    /**
     * 销毁接口
     */
    public destroy(): void {

    }
}

/**
 * 事件对象结构，用于内部使用。
 * @private
 */
class __ViewEvent {
    /** 事件名称 */
    public name: string;
    /** 事件回调 */
    public cb: (...args)=>void;
    /** 绑定事件的对象 */
    public target: BaseMediator;

    /***
     * @param {string} name 事件名称
     * @param {(...args)=>void} cb 事件回调
     * @param {BaseMediator} target 绑定事件的对象
     */
    public constructor(name: string, cb: (...args)=>void, target: BaseMediator) {
        this.name = name;
        this.cb = cb;
        this.target = target;
    }

    /**
     * 判断两个对象是否相等
     * @param {__ViewEvent} event 目标事件对象
     * @return {boolean} 是否相等
     */
    public equals(event: __ViewEvent): boolean {
        return this.name === event.name;
    }
}
