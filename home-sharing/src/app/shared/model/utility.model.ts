export class UtilitiesResponse {
	message: string;
	data: UtilitiesListObj;
}
export class UtilitiesData {
	id: number;
	name: string;
	icon: string;
}
export class UtilitiesListObj {
	utilities: UtilitiesData[];
}
