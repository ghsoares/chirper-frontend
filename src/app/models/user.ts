import { Chirp } from "./chirp";
import { ChirpLike } from "./chirp-like";

export class User {
	userId: number = 0;
	profileName: string = "";
	username: string = "";
	bio: string = "";
	email: string = "";
	password: string = "";
	birthDate: Date = new Date(Date.now());
	chirps: Chirp[] = [];
	likes: ChirpLike[] = [];
	token: string;
}
