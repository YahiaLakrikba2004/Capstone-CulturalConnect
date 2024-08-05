package YahiaLakrikba.CulturalConnect.entities;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@Entity
public class Connection {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;
    private String bio;
    private String imageUrl;
    private String gender; // Nuovo campo per il genere

    @ElementCollection
    private List<String> interests;
}