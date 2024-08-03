package YahiaLakrikba.CulturalConnect.services;

import YahiaLakrikba.CulturalConnect.entities.User;
import YahiaLakrikba.CulturalConnect.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

@Service
public class ProfileService {

    @Autowired
    private UserRepository userRepository;

    /**
     * Recupera il profilo dell'utente attualmente autenticato.
     * @return l'utente corrente.
     */
    public User getCurrentUserProfile() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String username = authentication.getName(); // Ottieni il nome utente dall'autenticazione
        return userRepository.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("User not found"));
    }
}
