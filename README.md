# lightMVC
light mvc
---
简易轻量级MVC框架，适用于中小型项目使用。后续会拓展lightMVC_ex内容来适应大型项目的开发。

#### 架构图
![架构图](./mvc.png)
#### 节点功能
- Facade:全局控制类，持有对MVC各层的管理对象。原则上来说，除了初始化框架调用init和运行第一个场景外，都不应该引用和调用Facada中的任何接口和属性。该类是个全局的单例对象，包含几个重要的接口如下：
``` javascript
/**
 * 初始化框架配置
 * @param {boolean} debug 是否是调试状态
 * @param {cc.Size} designResolution 设计分辨率
 * @param {boolean} fitHeight 是否高适配
 * @param {boolean} fitWidth 是否宽适配
 */
public init(debug: boolean, designResolution: cc.Size, fitHeight: boolean, fitWidth: boolean): void;

/**
 * 运行场景
 * @param {{new(): BaseMediator}} mediator 场景mediator类型，类类型。
 * @param {{new(): BaseScene}} view 场景mediator类型，类类型。
 * @param {Object} data 自定义的任意类型透传数据。（可选）
 * @param {()=>void} cb 加载完成回调.
 */
public runScene(mediator: {new(): BaseMediator}, view: {new(): BaseScene}, data?: any, cb?: ()=>void): void;
```
- Model:数据对象，用于处理数据逻辑以及存储数据，常用来与服务器做数据交互，同时通过消息通知View层刷新显示。主要接口如下：
``` javascript
/** Model初始化时会调用的接口，可以用来初始化一些数据 */
public init(): void;
/**
 * 发送消息接口，当数据变化时需要调用此接口发送消息刷新View层。
 * @param {string} noti 消息名称
 * @param {Object} data 消息数据
 */
public sendNoti(noti: string, data?: any): void;
/** 清理接口，子类可以实现清理逻辑 */
public clear(): void;
```
- View:显示层，根据业务逻辑及数据显示，同时处理用户输入，通过事件与其他层交互。主要接口如下：
``` javascript
/** View创建时会被调用，子类可以重写 */
public init(): void;
/**
 * 发送UI事件，逻辑层接收事件处理逻辑。
 * @param {string} event 事件名称
 * @param {Object} body 事件参数
 */
public sendEvent(event: string, body?: any): void;
/** 关闭当前的界面 */
public closeView(): void;
/** 关闭所有弹出的界面 */
public closeAllPopView(): void;
/** 当界面被关闭时会被调用，子类可以重写该方法 */
public onClose(): void;
/** 子类覆盖，返回UI的prefab路径,默认是空节点 */
public static path(): string;
```
- Mediator:逻辑层中介者，负责接收Model层通知来刷新View层显示，同时还要接收View层事件来处理用户输入，并通过Command处理数据层数据。主要接口如下：
``` javascript
/**
 * 初始化接口,此时视图还没有创建，如果想操作视图view请在viewDidAppear函数中进行。
 * @param {Object} data 自定义的任意类型透传数据。（可选）
 * @override
 * */
public init(data?: any): void;
/**
 * 视图显示后会调用的接口
 * @override
 */
public viewDidAppear(): void;
/**
 * 绑定UI事件，接收view层派发的事件
 * @param {string} name 事件名称
 * @param {(any)=>void} cb 事件回调
 * @param {BaseMediator} target 回调绑定对象
 */
public bindEvent(name: string, cb: (body: any)=>void, target: BaseMediator): void;
/**
 * 注册消息监听
 * @param {string} noti 通知key值
 * @param {(data: any)=>void} cb 通知监听的回调函数
 * @param {Object} target 回调绑定的对象
 */
public registerNoti(noti: string, cb: (data: any)=>void, target: any): void;
/**
 * 发送消息通知
 * @param {string} noti 通知key值
 * @param {Object} body 消息传递的参数
 */
public sendNoti(noti: string, body: any): void;
/**
 * 发送命令接口
 * @param {{new (): BaseCommand}} cmd 命令类
 * @param {Object} data 命令参数
 */
public sendCmd<T extends BaseCommand>(cmd: {new (): T}, data?: any): void;
/**
 * 打开新场景
 * @param data {Object} data 自定义的任意类型透传数据。（可选）
 */
public runScene(mediator: {new(): BaseMediator}, view: {new(): BaseScene}, data?: any): void;
/**
 * 返回上一场景
 * @returns {boolean}是否存在上一个场景
 */
public backScene(): boolean;
/**
 * 打开view界面
 * @param {{new(): BaseMediator}} mediator 界面mediator类型，类类型。
 * @param {{new(): BaseView}} view view 场景mediator类型，类类型。
 * @param {Object} data 自定义的任意类型透传数据。（可选）
 */
public popView(mediator: {new(): BaseMediator}, view: {new(): BaseView}, data?: any): void;
/**
 * 添加层级
 * @param {{new(): BaseMediator}} mediator 界面mediator类型，类类型。
 * @param {{new(): BaseView}} view view 场景mediator类型，类类型。
 * @param {number} zOrder 层级。（可选）
 * @param {Object} data 自定义的任意类型透传数据。（可选）
 */
public addLayer(mediator: {new(): BaseMediator}, view: {new(): BaseView}, zOrder?: number, data?: any): void;
/** 获取model对象 */
public getModel<T extends BaseModel>(model: {new (): T}): T;
/** 销毁接口 */
public destroy(): void;
```

