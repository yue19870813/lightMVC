
// declare class mvc {
// 	public static facade: Facade;
// }

declare class Facade {
	public popView(): void;
	public runScene(mediator: {new(): BaseMediator}, view: {new(): BaseScene}, data:any = null): void;
}

declare class BaseMediator {

}

declare class BaseScene {

}