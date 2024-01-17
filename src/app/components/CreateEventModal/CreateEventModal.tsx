import React, { useState } from 'react';

import eventStore from '@/app/store/eventStore';

import { ModalBlock } from '@/app/components/ModalBlock';
import { handleFetchEvents } from '@/app/requests/handleFetchEvents';

export interface ITimeZoneEvent {
  start: string,
  end: string
}

interface ICreateModal {
  openModal: boolean,
  handleModalClose: (value: boolean)=>void,
  timeZoneEvent: ITimeZoneEvent
}
export const CreateEventModal = ({openModal, handleModalClose, timeZoneEvent}: ICreateModal) => {
  const [title, setTitle] = useState('');

  const formatDateString = (dateString: string): string => {
    const date = new Date(dateString);

    return date.toLocaleDateString('en-US');
  };

  const formatTimeString = (dateString: string): string => {
    const date = new Date(dateString);

    return date.toLocaleTimeString('en-US');
  };

  const onSubmit = () => {
    if(!title){
      return;
    }

    const schema = {
      title: title,
      start: timeZoneEvent.start,
      end: timeZoneEvent.end,
    };

    try {
      const url = "/api/events";
      fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(schema),
      })
        .then(() =>
          handleFetchEvents().then((res: any) => {
            if (res) {
              eventStore.setEvents(res);
            }

          }))


    } catch (error) {
      console.log(error);
    }

    setTitle('')
    handleModalClose(false);
  };

  return (
    <ModalBlock
      isOpen={openModal}
      onClose={() =>
        handleModalClose( false )
      }
      title={'Create Event'}
    >
      <p>
        Start Event: {formatDateString( timeZoneEvent.start )} , {formatTimeString( timeZoneEvent.start )}
      </p>
      <p>
        End Event: {formatDateString( timeZoneEvent.end )} , {formatTimeString( timeZoneEvent.end )}
      </p>
      <div className="my-5">
        <input
          type="text"
          className="border rounded bg-cyan-50 w-full pl-2 py-1.5"
          required
          placeholder="Add Title"
          value={title}
          onChange={( e ) => setTitle( e.target.value )}
        />

        <button type='submit' onClick={onSubmit} className="w-full border rounded border-cyan-500 mt-2 py-1.5 hover:bg-cyan-500 hover:text-white">
          Create Event
        </button>
      </div>
    </ModalBlock>
  );
};
