package YahiaLakrikba.CulturalConnect.services;

import YahiaLakrikba.CulturalConnect.entities.Event;
import YahiaLakrikba.CulturalConnect.repositories.EventRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class EventService {

    @Autowired
    private EventRepository eventRepository;

    // Recupera tutti gli eventi
    public List<Event> getAllEvents() {
        return eventRepository.findAll();
    }

    // Recupera un evento per ID
    public Optional<Event> getEventById(Long id) {
        return eventRepository.findById(id);
    }

    // Crea un nuovo evento
    public Event createEvent(Event event) {
        return eventRepository.save(event);
    }
    // Aggiorna un evento esistente
    public Event updateEvent(Event event) {
        if (event.getId() != null && eventRepository.existsById(event.getId())) {
            return eventRepository.save(event);
        } else {
            throw new IllegalArgumentException("Event ID is required for update.");
        }
    }

    // Elimina un evento per ID
    public boolean deleteEvent(Long id) {
        if (eventRepository.existsById(id)) {
            eventRepository.deleteById(id);
            return true;
        } else {
            return false;
        }
    }
}
