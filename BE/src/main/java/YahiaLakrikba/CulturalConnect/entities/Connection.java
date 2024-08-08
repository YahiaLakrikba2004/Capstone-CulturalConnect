package YahiaLakrikba.CulturalConnect.entities;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.util.HashSet;
import java.util.List;
import java.util.Set;

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
    private String gender;

    @ElementCollection
    private List<String> interests;

    private Boolean online;

    @Enumerated(EnumType.STRING)
    private FriendshipStatus friendshipStatus;

    @ManyToMany
    @JoinTable(
            name = "connection_friends",
            joinColumns = @JoinColumn(name = "connection_id"),
            inverseJoinColumns = @JoinColumn(name = "friend_id")
    )
    private Set<Connection> friends = new HashSet<>();

    @ElementCollection
    private Set<Long> sentRequests = new HashSet<>();

    @ElementCollection
    private Set<Long> receivedRequests = new HashSet<>();
}
