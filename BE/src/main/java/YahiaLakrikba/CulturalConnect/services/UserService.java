package YahiaLakrikba.CulturalConnect.services;

import YahiaLakrikba.CulturalConnect.Util.JwtUtil;
import YahiaLakrikba.CulturalConnect.entities.User;
import YahiaLakrikba.CulturalConnect.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.util.List;
import java.util.Optional;

@Service
public class UserService {

    private static final Logger logger = LoggerFactory.getLogger(UserService.class);

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private JwtUtil jwtUtil; // Dipendenza per JwtUtil

    public User registerUser(User user) throws Exception {
        logger.debug("Checking if username {} already exists", user.getUsername());
        if (userRepository.findByUsername(user.getUsername()).isPresent()) {
            throw new Exception("Username already exists");
        }
        logger.debug("Checking if email {} already exists", user.getEmail());
        if (userRepository.findByEmail(user.getEmail()).isPresent()) {
            throw new Exception("Email already exists");
        }

        user.setPassword(passwordEncoder.encode(user.getPassword()));
        User savedUser = userRepository.save(user);
        logger.info("User registered successfully: {}", savedUser.getUsername());
        return savedUser;
    }

    public Optional<User> findUserByUsername(String username) {
        return userRepository.findByUsername(username);
    }

    public boolean checkPassword(String rawPassword, String encodedPassword) {
        return passwordEncoder.matches(rawPassword, encodedPassword);
    }

    public List<User> getAllUsers() {
        List<User> users = userRepository.findAll();
        logger.info("Fetched users: {}", users);
        return users;
    }

    public User findByUsername(String username) {
        return userRepository.findByUsername(username).orElseThrow(() -> new RuntimeException("User not found"));
    }

    public Optional<User> getUserById(Long id) {
        return userRepository.findById(id);
    }

    public User updateUser(User user) {
        Optional<User> existingUser = userRepository.findById(user.getId());
        if (existingUser.isEmpty()) {
            throw new RuntimeException("User not found with id " + user.getId());
        }

        User existing = existingUser.get();
        if (user.getPassword() != null && !user.getPassword().isEmpty()) {
            existing.setPassword(passwordEncoder.encode(user.getPassword()));
        }
        if (user.getUsername() != null) {
            existing.setUsername(user.getUsername());
        }
        if (user.getEmail() != null) {
            existing.setEmail(user.getEmail());
        }
        if (user.getRole() != null) {
            existing.setRole(user.getRole());
        }
        return userRepository.save(existing);
    }

    public User getCurrentUser() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String username = authentication.getName();
        return userRepository.findByUsername(username).orElse(null);
    }

    public void deleteUser(Long id) {
        userRepository.deleteById(id);
    }

    public Optional<User> getUserByUsername(String username) {
        return userRepository.findByUsername(username);
    }

    public String generateToken(User user) {
        return jwtUtil.generateToken(user.getUsername());
    }

    public User updateProfilePic(Long userId, MultipartFile profilePic) throws IOException {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found with id " + userId));

        // Pulisce il nome del file
        String fileName = StringUtils.cleanPath(profilePic.getOriginalFilename());

        // Imposta la directory di upload
        String uploadDir = "uploads/";
        File uploadDirFile = new File(uploadDir);
        if (!uploadDirFile.exists()) {
            uploadDirFile.mkdirs();
        }

        // Salva il file
        File file = new File(uploadDir + fileName);
        profilePic.transferTo(file);

        // Aggiorna il percorso del file nel database
        user.setProfilePic(uploadDir + fileName);
        return userRepository.save(user);
    }

    // Metodo per codificare la password (separato per chiarezza)
    public String encodePassword(String rawPassword) {
        return passwordEncoder.encode(rawPassword);
    }
}
