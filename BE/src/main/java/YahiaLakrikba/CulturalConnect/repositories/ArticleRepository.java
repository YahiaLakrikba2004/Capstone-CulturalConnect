package YahiaLakrikba.CulturalConnect.repositories;

import YahiaLakrikba.CulturalConnect.entities.Article;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ArticleRepository extends JpaRepository<Article, Long> {
}
