import { LocalDate, LocalDateTime } from "../utils/local-date";
import { ChirpLike } from "./chirp-like";
import { User } from "./user";

export class Chirp {
	chirpId: number = 0;
	author: User = null;
	body: string = "";
	creationDate: LocalDateTime = new LocalDateTime(LocalDateTime.now());
	editDate: LocalDateTime = new LocalDateTime(LocalDateTime.now());
	tags: string[] = [];
	replyOf: Chirp = null;
	replies: Chirp[] = [];
	likes: ChirpLike[] = [];

	constructor(obj?: any) {
		if (obj?.creationDate != undefined) {
			obj.creationDate = LocalDate.create(obj.creationDate);
		}
		if (obj?.editDate != undefined) {
			obj.editDate = LocalDate.create(obj.editDate);
		}
		Object.assign(this, obj);
	}

	public static basic(
		authorName: string, authorUsername: string,
		body: string
	): Chirp {
		let c = new Chirp();
		let a = new User();

		a.profileName = authorName;
		a.username = authorUsername;

		c.author = a;
		c.body = body;

		return c;
	}
}
