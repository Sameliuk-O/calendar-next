import React, { useState } from 'react';

import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import { getDay, startOfWeek } from 'date-fns';
import { format } from 'date-fns/format';
import { enUS } from 'date-fns/locale';
import { parse } from 'date-fns/parse';
import "react-big-calendar/lib/css/react-big-calendar.css";

import { CreateEventModal } from '@/app/components/CreateEventModal';
import { DeleteEventModal } from '../DeleteEventModal';

interface CustomCalendarProps {
	events: IData[];
	height: string
}

export interface IData {
	_id: string;
	title: string;
	start: Date | null;
	end: Date | null;
}

const locales = {
	"en-US": enUS,
};

let currentDate = new Date();
let currentDay = currentDate.getDay();

const localizer = dateFnsLocalizer({
	format,
	parse,
	startOfWeek: () => startOfWeek(currentDate, { weekStartsOn: currentDay as any}),
	getDay,
	locales,
});

const setEventCellStyling = () => {
	let style = {
		maxWidth: 200,
		fontFamily: 'Open Sans',

		background: "rgba(7, 97, 125, 0.1)",
		border: `1px solid #6E9ECF`,
		color: "#07617D",
		borderLeft: `3px solid #6E9ECF`,
		whiteSpace: 'nowrap',

		fontWeight: 200,
		fontSize: "14px",
	};
	return { style };
};

export const CalendarBlock = ({ events, height }: CustomCalendarProps) => {
	const [openModal, setOpenModal] = useState(false);
	const [openDeleteModal, setOpenDeleteModal] = useState(false);

	const [event, setEvent] = useState({start: '', end: ''});
	const [data, setData] = useState<IData>({_id: '', end: null, start: null, title: ''});

	const customDayPropGetter = (date: Date) => {
		const currentDate = new Date();

		if (date < currentDate ) {
			return {
				style: {
					cursor: "not-allowed",
					background: "rgba(184, 184, 184, 0.1)",
				},
			}
		} else {
			return {};
		}
	};

	const formats = {
		weekdayFormat: "EEE",
		timeGutterFormat: "hh a",
	};

	const handleSelect = ({ start, end }: {start:  Date; end: Date }) => {
		const currentDate = new Date();
		if (start < currentDate) {
			return null;
		}
		if (start > end) return;

		const startString = start.toString()
		const endString = end.toString()
		handleOpenPopup();
		setEvent({ start: startString, end: endString })
	};
	const handleOpenPopup = () => {
		setOpenModal(true);
	};
	const handleModalClose = () => {
		setOpenModal(false);
	};

	const handleEventSelect = (event: IData) => {
		setOpenDeleteModal(true);
		setData(event);
	};

	return (
		<>
			<Calendar
				localizer={localizer}
				formats={formats}
				popup={true}
				events={events}
				selectable
				min={new Date(currentDate.getFullYear(), currentDate.getMonth(), 0, 8, 0, 0)}
				max={new Date(currentDate.getFullYear(), currentDate.getMonth(), 0, 17, 0, 0)}
				longPressThreshold={1}
				eventPropGetter={setEventCellStyling}
				dayPropGetter={customDayPropGetter}
				onSelectEvent={handleEventSelect}
				onSelectSlot={handleSelect}
				views={{ day: true }}
				step={30}
				drilldownView={"day"}
				defaultView={"day"}
				style={{ height: height ? height : "68vh" }}
			/>

			<CreateEventModal
				openModal={openModal}
				handleModalClose={handleModalClose}
				timeZoneEvent={event}
			/>
			<DeleteEventModal
				openModal={openDeleteModal}
				handleModalClose={setOpenDeleteModal}
				event={data}
			/>
		</>
	);
};
