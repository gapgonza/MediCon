// public/js/script.js

const BASE_URL = '/api/turnos';
const TURNOS_DISPONIBLES_URL = '/api/turnos-disponibles';

document.getElementById('turnoForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    await guardarTurno();
});

async function guardarTurno() {
    const turnoId = document.getElementById('turnoId').value;
    const agenda_id = document.getElementById('agenda_id').value;
    const paciente_id = document.getElementById('paciente_id').value;
    const fecha = document.getElementById('fecha').value;
    const hora_inicio = document.getElementById('hora_inicio').value;
    const hora_fin = document.getElementById('hora_fin').value;
    const estado_id = document.getElementById('estado_id').value;

    const url = turnoId ? `${BASE_URL}/${turnoId}` : BASE_URL;
    const method = turnoId ? 'PUT' : 'POST';

    try {
        const response = await fetch(url, {
            method: method,
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ agenda_id, paciente_id, fecha, hora_inicio, hora_fin, estado_id })
        });

        if (response.ok) {
            await obtenerTurnos();
        } else {
            throw new Error('Error al guardar el turno');
        }
    } catch (error) {
        console.error(error);
        alert(error.message);
    }
}

async function obtenerTurnos() {
    try {
        const response = await fetch(BASE_URL);
        const turnos = await response.json();

        const list = document.getElementById('turnosList');
        list.innerHTML = '';
        turnos.forEach(turno => {
            const div = document.createElement('div');
            div.innerHTML = `
                Turno ID: ${turno.turno_id} | Agenda ID: ${turno.agenda_id} | Paciente ID: ${turno.paciente_id} 
                | Fecha: ${turno.fecha} | Hora Inicio: ${turno.hora_inicio} | Hora Fin: ${turno.hora_fin} 
                | Estado ID: ${turno.estado_id}
                <button onclick="editarTurno(${turno.turno_id})">Editar</button>
                <button onclick="eliminarTurno(${turno.turno_id})">Eliminar</button>
            `;
            list.appendChild(div);
        });
    } catch (error) {
        console.error(error);
        alert('Error al obtener los turnos');
    }
}

async function editarTurno(turnoId) {
    try {
        const response = await fetch(`${BASE_URL}/${turnoId}`);
        const turno = await response.json();

        document.getElementById('turnoId').value = turno.turno_id;
        document.getElementById('agenda_id').value = turno.agenda_id;
        document.getElementById('paciente_id').value = turno.paciente_id;
        document.getElementById('fecha').value = turno.fecha.split('T')[0];
        document.getElementById('hora_inicio').value = turno.hora_inicio;
        document.getElementById('hora_fin').value = turno.hora_fin;
        document.getElementById('estado_id').value = turno.estado_id;
    } catch (error) {
        console.error(error);
        alert('Error al editar el turno');
    }
}

async function eliminarTurno(turnoId) {
    try {
        const response = await fetch(`${BASE_URL}/${turnoId}`, {
            method: 'DELETE'
        });

        if (response.ok) {
            await obtenerTurnos();
        } else {
            throw new Error('Error al eliminar el turno');
        }
    } catch (error) {
        console.error(error);
        alert(error.message);
    }
}

// Cargar los turnos al cargar la página
obtenerTurnos();

import { Calendar } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';

document.addEventListener('DOMContentLoaded', function() {
    var calendarEl = document.getElementById('calendar');
    var calendar = new Calendar(calendarEl, {
        plugins: [ dayGridPlugin, interactionPlugin ],
        initialView: 'dayGridMonth',
        selectable: true,
        dateClick: function(info) {
            let fecha = info.dateStr;
            document.getElementById('fecha_reserva').value = `${fecha}T09:00`;
        },
        events: TURNOS_DISPONIBLES_URL,
        eventColor: '#378006',
    });
    calendar.render();
});


