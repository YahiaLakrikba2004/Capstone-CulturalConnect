package YahiaLakrikba.CulturalConnect.entities;// src/main/java/YahiaLakrikba/CulturalConnect/entities/User.java

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
@Table(name = "users")
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, unique = true)
    private String username;

    @Column(nullable = false)
    private String password;

    @Column(nullable = false, unique = true)
    private String email;

    private String role;

    private String profilePic; // Nuovo campo per la foto del profilo
}
