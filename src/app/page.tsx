'use client'
import { CalendarBlock } from '@/app/components/CalendarBlock';
import { handleFetchEvents } from '@/app/requests/handleFetchEvents';
import eventStore, { IEvents } from '@/app/store/eventStore';
import { observer, Provider } from 'mobx-react';
import { useEffect } from 'react';
import { Header } from './components/Header';

const Home = observer(() => {
    const {events} = eventStore
  useEffect(() => {
    handleFetchEvents().then((res: any) => {
      if (res) {
        eventStore.setEvents(res);
      }
    });
  }, []);


  const calendarEvents = events.map((item: IEvents) => {
    const { start, end } = item;
    return {
      ...item,
      start: new Date(start),
      end: new Date(end),
    };
  });

  const handleDownloadClick = () => {

    const blob = new Blob([JSON.stringify(calendarEvents, null, 2)], { type: "application/json" });

    const downloadLink = document.createElement("a");
    downloadLink.href = URL.createObjectURL(blob);
    downloadLink.download = "data.json";

    downloadLink.click();
  };

  return (
    <Provider eventStore={eventStore}>
      <main>
        <Header handleDownloadClick={handleDownloadClick}/>
        <CalendarBlock height="100vh" events={calendarEvents}/>
      </main>
    </Provider>
  );
} );

export default Home;