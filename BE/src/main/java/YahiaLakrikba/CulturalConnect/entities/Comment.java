package YahiaLakrikba.CulturalConnect.entities;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "comments")
public class Comment {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "article_id", nullable = false)
    private Long articleId;

    @Column(name = "created_at", nullable = false, updatable = false)
    private LocalDateTime createdAt;

    @Column(name = "likes")
    private Integer likes;

    @Column(name = "text", nullable = false)
    private String text;

    public Comment() {
        this.createdAt = LocalDateTime.now();
        this.likes = 0; // Inizializza i like a 0
    }

    public Comment(Long articleId, String text) {
        this.articleId = articleId;
        this.text = text;
        this.createdAt = LocalDateTime.now();
        this.likes = 0; // Inizializza i like a 0
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public Long getArticleId() { return articleId; }
    public void setArticleId(Long articleId) { this.articleId = articleId; }

    public String getText() { return text; }
    public void setText(String text) { this.text = text; }

    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }

    public Integer getLikes() { return likes; }
    public void setLikes(Integer likes) { this.likes = likes; }
}
