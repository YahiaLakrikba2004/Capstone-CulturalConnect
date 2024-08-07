package YahiaLakrikba.CulturalConnect.services;

import YahiaLakrikba.CulturalConnect.entities.User;
import YahiaLakrikba.CulturalConnect.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.Optional;

@Service
public class ProfileService {

    @Autowired
    private UserRepository userRepository;

    public Optional<User> getUserByUsername(String username) {
        return userRepository.findByUsername(username);
    }

    public User updateProfile(User user) {
        // Logica per aggiornare l'utente nel database
        return userRepository.save(user);
    }

    public String saveProfilePic(MultipartFile file) throws IOException {
        // Logica per salvare l'immagine del profilo e restituire il percorso
        String fileName = file.getOriginalFilename();
        Path filePath = Paths.get("path/to/save/" + fileName);
        Files.write(filePath, file.getBytes());
        return filePath.toString();
    }
}
