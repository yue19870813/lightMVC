# lightMVC
light mvc
---
简易轻量级MVC框架，适用于中小型项目使用。后续会拓展lightMVC_ex内容来适应大型项目的开发。

#### 架构图
![架构图](./mvc.png)

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
- Model: 数据对象。
