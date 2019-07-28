lightMVC_ex
---
增加lightMVC_ex内容来拓展复杂功能，以保证core中功能简洁，新增功能下面列出。

#### v2.0新增功能 
- 框架全局可调用的接口
    - 框架初始化
    - initScene：初始化第一个场景
- 新增GameMediator基类
    - runScene
    - popView
    - addLayer
- 新增GameView基类，对应GameMediator，暂无新增功能。
- 资源管理支持
    - 主动加载通用资源和模块资源
    - 自动释放不需要的模块资源
    - 主动释放接口，方便自定义策略

