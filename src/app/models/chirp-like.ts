import { Chirp } from "./chirp";
import { User } from "./user";

export class ChirpLike {
	likeId: number = 0;
	userId: number = 0;
	chirpId: number = 0;

	constructor(obj?: any) {
		obj = { ...obj };
		if (obj?.user != undefined) {
			obj.userId = obj.user.userId;
		}
		if (obj?.chirp != undefined) {
			obj.chirpId = obj.chirp.chirpId;
		}
		Object.assign(this, obj);
	}

	public toJSON(user: boolean = true, chirp: boolean = true): any {
		const like: any = {
			likeId: this.likeId
		};

		if (user) like.user = {userId: this.userId};
		if (chirp) like.chirp = {chirpId: this.chirpId};

		return like;
	}
}
