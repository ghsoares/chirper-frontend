import { LocalDate } from "../utils/local-date";
import { Chirp } from "./chirp";
import { ChirpLike } from "./chirp-like";

export class User {
	userId: number = 0;
	profileName: string = "";
	username: string = "";
	bio: string = "";
	email: string = "";
	password: string = "";
	birthDate: LocalDate = new LocalDate(LocalDate.now());
	chirps: Chirp[] = [];
	likes: ChirpLike[] = [];
	token: string;

	constructor(obj?: any) {
		if (obj?.birthDate != undefined) {
			obj.birthDate = LocalDate.create(obj.birthDate);
		}
		Object.assign(this, obj);
	}

	public static basic(
		name: string, username: string,
		bio: string
	): User {
		let u = new User();

		u.profileName = name;
		u.username = username;
		u.bio = bio;

		return u;
	}
}
