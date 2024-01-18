import { makeAutoObservable } from 'mobx';

export interface IEvents {
	_id: string
	title: string;
	start: string;
	end: string;
	duration?: number;
}

class EventStore {
	events: IEvents[] = [];

	constructor() {
		makeAutoObservable(this);
	}

	setEvents(value: IEvents[]) {
		this.events = [...value];
	}
}

const eventStore = new EventStore();
export default eventStore;
