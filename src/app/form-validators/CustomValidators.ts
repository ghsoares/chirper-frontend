import { AbstractControl } from "@angular/forms";

export default class CustomValidators {
	public static matchesControl(controlName: string) {
		return function (control: AbstractControl) {
			const otherControl = control.root?.get(controlName);

			if (otherControl && control.value !== '') {
				if (otherControl.value !== control.value) {
					return { notMatch: { value: control.value } }
				}
			}

			return null;
		}
	}
}
