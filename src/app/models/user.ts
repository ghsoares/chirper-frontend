import { LocalDate } from "../utils/local-date";
import { Chirp } from "./chirp";
import { ChirpLike } from "./chirp-like";
import { UserFollower } from "./user-follower";

export class User {
	userId: number = 0;
	profileName: string = "";
	username: string = "";
	bio: string = "";
	email: string = "";
	password: string = "";
	birthDate: LocalDate = new LocalDate(LocalDate.now());
	chirps: Chirp[] = [];
	followers: UserFollower[] = [];
	follows: UserFollower[] = [];
	likes: ChirpLike[] = [];
	token: string;

	constructor(obj?: any) {
		this.assign(obj);
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

	public static fromUsernamePassword(
		username: string, password: string
	): User {
		let u = new User();
		u.username = username;
		u.password = password;
		return u;
	}

	public static fromId(id: number): User {
		let u = new User();
		u.userId = id;
		return u;
	}

	public assign(obj?: any): void {
		if (!(obj instanceof User)) {
			obj = { ...obj };
			if (obj?.birthDate) {
				obj.birthDate = LocalDate.create(obj.birthDate);
			}
			if (obj?.chirps) {
				obj.chirps = obj.chirps.map((c: any) => new Chirp(c));
			}
			if (obj?.likes) {
				obj.likes = obj.likes.map((l: any) => new ChirpLike(l));
			}
			if (obj?.followers) {
				obj.followers = obj.followers.map((f: any) => new UserFollower(f));
			}
			if (obj?.follows) {
				obj.follows = obj.follows.map((f: any) => new UserFollower(f));
			}
			Object.assign(this, obj);
		}

		Object.assign(this, obj);

		for (let c of this.chirps) {
			c.author = this;
		}
		for (let l of this.likes) {
			l.userId = this.userId;
		}
		for (let f of this.followers) {
			f.userId = this.userId;
		}
		for (let f of this.follows) {
			f.followerId = this.userId;
		}
	}

	public toJSON(): any {
		const user: any = {
			userId: this.userId,
			profileName: this.profileName,
			username: this.username,
			bio: this.bio,
			email: this.email,
			password: this.password,
			birthDate: this.birthDate.toString(),
			chirps: this.chirps.map(c => c.toJSON(false)),
			likes: this.likes.map(l => l.toJSON(false)),
			followers: this.followers.map(f => f.toJSON(false, true)),
			follows: this.follows.map(f => f.toJSON(true, false)),
			token: this.token
		};

		if (user.chirps.length == 0) {
			user.chirps = null;
		}
		if (user.likes.length == 0) {
			user.likes = null;
		}
		if (user.followers.length == 0) {
			user.followers = null;
		}
		if (user.follows.length == 0) {
			user.follows = null;
		}

		return user;
	}
}
