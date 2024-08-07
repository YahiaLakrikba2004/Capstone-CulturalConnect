package YahiaLakrikba.CulturalConnect.Util;

import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

public class CommentRequest {

    @NotNull(message = "L'ID dell'articolo non può essere nullo")
    private Long articleId;

    @NotNull(message = "Il testo del commento non può essere nullo")
    @Size(min = 1, message = "Il testo del commento non può essere vuoto")
    private String text;

    // Costruttori, getter e setter
    public CommentRequest() {
    }

    public CommentRequest(Long articleId, String text) {
        this.articleId = articleId;
        this.text = text;
    }

    public Long getArticleId() {
        return articleId;
    }

    public void setArticleId(Long articleId) {
        this.articleId = articleId;
    }

    public String getText() {
        return text;
    }

    public void setText(String text) {
        this.text = text;
    }
}
