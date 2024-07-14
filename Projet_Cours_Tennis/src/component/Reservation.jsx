import React, { useState, useEffect } from 'react';
import { Calendar, momentLocalizer, Views } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { useParams } from 'react-router-dom';
import './style.css';

const localizer = momentLocalizer(moment);

const Reservation = () => {
    const { id } = useParams();
    const [ressource, setRessource] = useState({});
    const [events, setEvents] = useState([]);
    const [view, setView] = useState(Views.WEEK);

    const convertToDateObject = (item) => {
        // Convertit les dates en objet Date
        if (item.start) item.start = new Date(item.start);
        if (item.end) item.end = new Date(item.end);
        return item;
    };

    useEffect(() => {
        // Si les data sont déjà stockées dans le localStorage, on les récupère
        const storedData = JSON.parse(localStorage.getItem('FetchedData'));
        if (storedData) {
            const foundRessource = storedData.find(item => item.ID === parseInt(id));
            if (foundRessource) {
                
                setRessource(foundRessource);

                const formattedReservations = (foundRessource.reservations || [])
                    .map(convertToDateObject);

                setEvents(formattedReservations);
            }
        }
    }, [id]);

    const handleNavigate = (date, view) => {
        // On empêche la navigation en dehors des heures d'ouverture
        if (view === Views.MONTH) {
            setView(Views.DAY);
        }
    };

    const handleSelect = ({ start, end }) => {
        // On empêche la sélection en dehors des heures d'ouverture
        if (view === Views.WEEK || view === Views.DAY) {
            // On empêche la sélection dans des heures pas rondes
            if (start.getMinutes() === 0) {
                
                const title = window.prompt('New Event name');
                if (title) {
                    const endAdjusted = new Date(start);
                    endAdjusted.setHours(start.getHours() + 1);

                    const newEvent = { start, end: endAdjusted, title };

                    const updatedRessource = {
                        ...ressource,
                        reservations: [...(ressource.reservations || []), newEvent]
                    };
                    setRessource(updatedRessource);

                    setEvents(updatedRessource.reservations);

                    saveToLocalStorage(updatedRessource);
                }
            } else {
                alert("Les réservations doivent commencer à une heure ronde.");
            }
        } else {
            alert("Les réservations ne sont autorisées que dans les vues 'semaine' ou 'jour'.");
        }
    };

    // On met à jour les data dans le localStorage
    const saveToLocalStorage = (updatedRessource) => {
        const storedData = JSON.parse(localStorage.getItem('FetchedData')) || [];
        const newData = storedData.map(item => item.ID === parseInt(id) ? updatedRessource : item);
        localStorage.setItem('FetchedData', JSON.stringify(newData));
    };

    return (
        <>
            <div className="container">
                <h1 className="title">Reservation</h1>
                {ressource.NAME}
                <br />
            </div>
            <br />
            <br />

            <Calendar
                localizer={localizer}
                events={events}
                defaultView={Views.WEEK}
                view={view}
                onView={setView}
                onNavigate={handleNavigate}
                startAccessor="start"
                endAccessor="end"
                style={{ height: 500, width: '100%' }}
                onSelectSlot={handleSelect}
                selectable
                min={new Date(0, 0, 0, 8, 0, 0)}
                max={new Date(0, 0, 0, 20, 0, 0)}
            />
        </>
    );
}

export default Reservation;
