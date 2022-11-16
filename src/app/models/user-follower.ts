
export class UserFollower {
	userFollowerId: number = 0;
	userId: number = 0;
	followerId: number = 0;

	constructor(obj?: any) {
		obj = { ...obj };
		if (obj?.user != undefined) {
			obj.userId = obj.user.userId;
		}
		if (obj?.follower != undefined) {
			obj.followerId = obj.follower.userId;
		}
		Object.assign(this, obj);
	}

	public toJSON(user: boolean = true, follower: boolean = true): any {
		const follow: any = {
			followerId: this.followerId
		};

		if (user) follow.user = { userId: this.userId };
		if (follower) follow.follower = { userId: this.followerId };

		return follow;
	}
}
