package YahiaLakrikba.CulturalConnect.services;

import YahiaLakrikba.CulturalConnect.entities.Connection;
import YahiaLakrikba.CulturalConnect.repositories.ConnectionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ConnectionService {

    @Autowired
    private ConnectionRepository connectionRepository;

    public Connection createConnection(Connection connection) {
        return connectionRepository.save(connection);
    }

    public List<Connection> getAllConnections() {
        return connectionRepository.findAll();
    }

    public Connection getConnectionById(Long id) {
        return connectionRepository.findById(id).orElse(null);
    }

    public Connection updateConnection(Long id, Connection connection) {
        Optional<Connection> existingConnection = connectionRepository.findById(id);
        if (existingConnection.isPresent()) {
            Connection updatedConnection = existingConnection.get();
            updatedConnection.setName(connection.getName());
            updatedConnection.setInterests(connection.getInterests());
            updatedConnection.setBio(connection.getBio());
            updatedConnection.setImageUrl(connection.getImageUrl());
            updatedConnection.setOnline(connection.getOnline());
            return connectionRepository.save(updatedConnection);
        } else {
            return null;
        }
    }

    public boolean deleteConnection(Long id) {
        if (connectionRepository.existsById(id)) {
            connectionRepository.deleteById(id);
            return true;
        } else {
            return false;
        }
    }

    public void toggleOnlineStatus(Long id) {
        Optional<Connection> connectionOptional = connectionRepository.findById(id);
        if (connectionOptional.isPresent()) {
            Connection connection = connectionOptional.get();
            connection.setOnline(!connection.getOnline());
            connectionRepository.save(connection);
        }
    }
}
