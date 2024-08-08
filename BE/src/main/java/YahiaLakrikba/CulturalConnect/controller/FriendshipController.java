package YahiaLakrikba.CulturalConnect.controller;

import YahiaLakrikba.CulturalConnect.services.FriendshipService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/friendships")
public class FriendshipController {

    @Autowired
    private FriendshipService friendshipService;

    @PostMapping("/send")
    public ResponseEntity<?> sendFriendRequest(@RequestParam Long requesterId, @RequestParam Long receiverId) {
        try {
            friendshipService.sendFriendRequest(requesterId, receiverId);
            return ResponseEntity.ok("Friend request sent successfully");
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body(e.getMessage());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("An error occurred");
        }
    }

    @PostMapping("/accept")
    public ResponseEntity<?> acceptFriendRequest(@RequestParam Long receiverId, @RequestParam Long requesterId) {
        try {
            friendshipService.acceptFriendRequest(receiverId, requesterId);
            return ResponseEntity.ok("Friend request accepted successfully");
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("An error occurred");
        }
    }

    @DeleteMapping("/cancel")
    public ResponseEntity<?> cancelFriendRequest(@RequestParam Long requesterId, @RequestParam Long receiverId) {
        try {
            friendshipService.cancelFriendRequest(requesterId, receiverId);
            return ResponseEntity.ok("Friend request canceled successfully");
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("An error occurred");
        }
    }
}
