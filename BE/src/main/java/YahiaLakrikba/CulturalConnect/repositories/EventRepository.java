package YahiaLakrikba.CulturalConnect.repositories;

import YahiaLakrikba.CulturalConnect.entities.Event;
import org.springframework.data.jpa.repository.JpaRepository;

public interface EventRepository extends JpaRepository<Event, Long> {
}
