package YahiaLakrikba.CulturalConnect.services;

import YahiaLakrikba.CulturalConnect.entities.Connection;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import YahiaLakrikba.CulturalConnect.repositories.ConnectionRepository;

@Service
public class FriendshipService {

    @Autowired
    private ConnectionRepository connectionRepository;

    @Transactional
    public void sendFriendRequest(Long requesterId, Long receiverId) {
        if (requesterId.equals(receiverId)) {
            throw new RuntimeException("Cannot send a friend request to yourself");
        }

        Connection requester = connectionRepository.findById(requesterId)
                .orElseThrow(() -> new RuntimeException("Requester not found"));
        Connection receiver = connectionRepository.findById(receiverId)
                .orElseThrow(() -> new RuntimeException("Receiver not found"));

        if (requester.getSentRequests().contains(receiverId)) {
            throw new RuntimeException("Friend request already sent");
        }

        if (receiver.getReceivedRequests().contains(requesterId)) {
            throw new RuntimeException("Friend request already received");
        }

        requester.getSentRequests().add(receiverId);
        receiver.getReceivedRequests().add(requesterId);

        connectionRepository.save(requester);
        connectionRepository.save(receiver);
    }

    @Transactional
    public void acceptFriendRequest(Long receiverId, Long requesterId) {
        Connection receiver = connectionRepository.findById(receiverId)
                .orElseThrow(() -> new RuntimeException("Receiver not found"));
        Connection requester = connectionRepository.findById(requesterId)
                .orElseThrow(() -> new RuntimeException("Requester not found"));

        if (!receiver.getReceivedRequests().contains(requesterId)) {
            throw new RuntimeException("No pending friend request to accept");
        }

        receiver.getReceivedRequests().remove(requesterId);
        requester.getSentRequests().remove(receiverId);

        requester.getFriends().add(receiver);
        receiver.getFriends().add(requester);

        connectionRepository.save(receiver);
        connectionRepository.save(requester);
    }

    @Transactional
    public void cancelFriendRequest(Long requesterId, Long receiverId) {
        Connection requester = connectionRepository.findById(requesterId)
                .orElseThrow(() -> new RuntimeException("Requester not found"));
        Connection receiver = connectionRepository.findById(receiverId)
                .orElseThrow(() -> new RuntimeException("Receiver not found"));

        if (!requester.getSentRequests().contains(receiverId)) {
            throw new RuntimeException("No friend request to cancel");
        }

        requester.getSentRequests().remove(receiverId);
        receiver.getReceivedRequests().remove(requesterId);

        connectionRepository.save(requester);
        connectionRepository.save(receiver);
    }
}
