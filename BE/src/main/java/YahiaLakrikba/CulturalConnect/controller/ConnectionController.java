package YahiaLakrikba.CulturalConnect.controller;

import YahiaLakrikba.CulturalConnect.entities.Connection;
import YahiaLakrikba.CulturalConnect.repositories.ConnectionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/connections")
public class ConnectionController {

    @Autowired
    private ConnectionRepository connectionRepository;

    @PostMapping
    public Connection createConnection(@RequestBody Connection connection) {
        // Usa l'URL dell'immagine fornito o lascia vuoto se non è fornito
        return connectionRepository.save(connection);
    }

    @GetMapping
    public List<Connection> getAllConnections() {
        return connectionRepository.findAll();
    }

    @GetMapping("/{id}")
    public Connection getConnectionById(@PathVariable Long id) {
        return connectionRepository.findById(id).orElse(null);
    }

    @PutMapping("/{id}")
    public Connection updateConnection(@PathVariable Long id, @RequestBody Connection connection) {
        if (connectionRepository.existsById(id)) {
            connection.setId(id);
            return connectionRepository.save(connection);
        }
        return null;
    }

    @DeleteMapping("/{id}")
    public void deleteConnection(@PathVariable Long id) {
        connectionRepository.deleteById(id);
    }
}
