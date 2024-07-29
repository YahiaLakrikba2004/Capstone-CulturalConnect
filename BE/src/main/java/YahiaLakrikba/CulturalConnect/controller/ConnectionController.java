package YahiaLakrikba.CulturalConnect.controller;

import YahiaLakrikba.CulturalConnect.entities.Connection;
import YahiaLakrikba.CulturalConnect.services.ConnectionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/connections")
public class ConnectionController {

    @Autowired
    private ConnectionService connectionService;

    @PostMapping
    public ResponseEntity<Connection> createConnection(@RequestBody Connection connection) {
        Connection createdConnection = connectionService.createConnection(connection);
        return new ResponseEntity<>(createdConnection, HttpStatus.CREATED);
    }

    @GetMapping
    public List<Connection> getAllConnections() {
        return connectionService.getAllConnections();
    }

    @PutMapping("/{id}")
    public ResponseEntity<Connection> updateConnection(
            @PathVariable Long id,
            @RequestBody Connection connection) {
        Connection updatedConnection = connectionService.updateConnection(id, connection);
        if (updatedConnection != null) {
            return new ResponseEntity<>(updatedConnection, HttpStatus.OK);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteConnection(@PathVariable Long id) {
        if (connectionService.deleteConnection(id)) {
            return ResponseEntity.noContent().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }
}
