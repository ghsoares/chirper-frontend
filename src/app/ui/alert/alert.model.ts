

export class Alert {
	title: string = "";
	message: string = "";
	autoClose: boolean = false;
	autoCloseSecs: number = 3;
	alertType: string = "";

	constructor(init?: Partial<Alert>) {
		Object.assign(this, init);
	}
}