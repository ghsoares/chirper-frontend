import { LocalDate, LocalDateTime } from "../utils/local-date";
import { ChirpLike } from "./chirp-like";
import { User } from "./user";

export class Chirp {
	private _body: string = "";

	chirpId: number = 0;
	author: User = null;
	bodyHTML: string = "";
	creationDate: string = "";
	editDate: string = "";
	tags: string[] = [];
	replyOf: Chirp = null;
	replies: Chirp[] = [];
	likes: ChirpLike[] = [];

	public set body(val: string) {
		this._body = val;
		this.parseHTMLBody();
	}

	public get body(): string {
		return this._body;
	}

	constructor(obj?: any) {
		this.assign(obj);
	}

	public assign(obj?: any): void {
		if (!(obj instanceof Chirp)) {
			obj = { ...obj };
			if (obj?.author) {
				obj.author = new User(obj.author);
			}
			if (obj?.replyOf) {
				obj.replyOf = new Chirp(obj.replyOf);
			}
			if (obj?.replies) {
				obj.replies = obj.replies.map((c: any) => new Chirp(c));
			}
			if (obj?.likes) {
				obj.likes = obj.likes.map((l: any) => new ChirpLike(l));
			}
		}
		Object.assign(this, obj);
	
		for (let r of this.replies) {
			r.replyOf = this;
		}
		for (let l of this.likes) {
			l.chirpId = this.chirpId;
		}
	}

	public parseHTMLBody(): void {
		this.bodyHTML = this.body;
		this.bodyHTML = this.bodyHTML.replace(/\n/g, "<br>");
		this.bodyHTML = this.bodyHTML.replace(/ /g, "&nbsp");
		this.bodyHTML = this.bodyHTML.replace(/(#\w+)/g, '<span class="chirp-tag">$1</span>');
	}

	public toJSON(author: boolean = true, replyOf: boolean = true): any {
		const chirp: any = {
			chirpId: this.chirpId,
			body: this.body,
			creationDate: this.creationDate,
			editDate: this.editDate,
			tags: this.tags,
			replies: this.replies.map(r => r.toJSON(true, false)),
			likes: this.likes.map(l => l.toJSON(true, false))
		};

		if (author) chirp.author = this.author?.toJSON() ?? null;
		if (replyOf) chirp.replyOf = this.replyOf?.toJSON() ?? null;

		if (chirp.replies.length == 0) {
			chirp.replies = null;
		}
		if (chirp.likes.length == 0) {
			chirp.likes = null;
		}

		return chirp;
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

	public static fromId(id: number): Chirp {
		let u = new Chirp();
		u.chirpId = id;
		return u;
	}
}
