import { formatDate } from "@angular/common";


export class LocalDate extends Date {

	public override toString(): string {
		return formatDate(super.toString(), "yyyy-MM-dd", "en-US");
	}

	public override toJSON(key?: any): string {
		return this.toString();
	}

	public static fromString(s: string): LocalDate {
		const utc = new Date(s);

		return new LocalDate(utc.getTime() + utc.getTimezoneOffset() * 60000);
	}

	public static create(data: any): LocalDate {
		// if (data instanceof LocalDate) {
		// 	return new LocalDate(data.getTime());
		// }

		const utc = new Date(data);

		return new LocalDate(utc.getTime() + utc.getTimezoneOffset() * 60000);
	}
}

export class LocalDateTime extends Date {
	public override toString(): string {
		return formatDate(super.toString(), "yyyy-MM-dd HH:mm:ss", "en-US");
	}

	public override toJSON(key?: any): string {
		return this.toString();
	}

	public static fromString(s: string): LocalDateTime {
		const utc = new Date(s);

		return new LocalDateTime(utc.getTime() + utc.getTimezoneOffset() * 60000);
	}

	public static create(data: any): LocalDateTime {
		if (data instanceof LocalDateTime) {
			return new LocalDateTime(data.getTime());
		}

		const utc = new Date(data);

		return new LocalDateTime(utc.getTime() + utc.getTimezoneOffset() * 60000);
	}

	public static override now(): number {
		const utc = new Date(Date.now());

		return utc.getTime() + utc.getTimezoneOffset() * 60000;
	}
}