import { ChirpLike } from "./chirp-like";
import { User } from "./user";

export class Chirp {
	chirpId: number = 0;
	author: User = null;
	body: string = "";
	tags: string[] = [];
	replyOf: Chirp = null;
	replies: Chirp[] = [];
	likes: ChirpLike[] = [];

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
