package YahiaLakrikba.CulturalConnect.repositories;

import YahiaLakrikba.CulturalConnect.entities.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, Long> {
}