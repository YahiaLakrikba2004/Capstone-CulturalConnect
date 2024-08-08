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
        try {
            Connection createdConnection = connectionService.createConnection(connection);
            return new ResponseEntity<>(createdConnection, HttpStatus.CREATED);
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping
    public ResponseEntity<List<Connection>> getAllConnections() {
        try {
            List<Connection> connections = connectionService.getAllConnections();
            return new ResponseEntity<>(connections, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<Connection> getConnectionById(@PathVariable Long id) {
        Connection connection = connectionService.getConnectionById(id);
        if (connection != null) {
            return new ResponseEntity<>(connection, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<Connection> updateConnection(@PathVariable Long id, @RequestBody Connection connection) {
        Connection updatedConnection = connectionService.updateConnection(id, connection);
        if (updatedConnection != null) {
            return new ResponseEntity<>(updatedConnection, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteConnection(@PathVariable Long id) {
        boolean deleted = connectionService.deleteConnection(id);
        if (deleted) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @PostMapping("/toggle/{id}")
    public ResponseEntity<Void> toggleOnlineStatus(@PathVariable Long id) {
        connectionService.toggleOnlineStatus(id);
        return new ResponseEntity<>(HttpStatus.OK);
    }
}
