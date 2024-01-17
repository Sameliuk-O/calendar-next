import { IData } from '@/app/components/CalendarBlock/CalendarBlock';
import { ModalBlock } from '@/app/components/ModalBlock';
import { handleFetchEvents } from '@/app/requests/handleFetchEvents';
import eventStore from '@/app/store/eventStore';

interface DeleteEventModalProps {
	openModal: boolean;
	handleModalClose: (value: boolean) => void;
	event: IData ;
}

export const DeleteEventModal = ( { openModal, handleModalClose, event }: DeleteEventModalProps) => {

	const onSubmit = () => {
		const data = {
			id: event._id,
		};
		fetch("/api/events", {
			method: "DELETE",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(data),
		})
			.then(() => {
				handleFetchEvents().then((res: any) => {
					if (res) {
						eventStore.setEvents(res);
					}
				})
			})

		handleModalClose(false)
	}

	return (
		<ModalBlock isOpen={openModal} onClose={() => handleModalClose(false)} title={'Delete Event ' + event?.title}>
			<h2>Do you really want to delete this event?</h2>
			<button onClick={onSubmit} className="py-2 px-5 my-3 bg-red-600 rounded-xl text-white hover:bg-red-900">Delete</button>
		</ModalBlock>
	)
}