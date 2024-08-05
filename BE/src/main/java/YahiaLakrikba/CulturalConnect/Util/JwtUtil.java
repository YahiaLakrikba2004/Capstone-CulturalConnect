package YahiaLakrikba.CulturalConnect.Util;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import org.springframework.stereotype.Component;

import java.util.Date;

@Component
public class JwtUtil {

    // Usa una chiave segreta generata e assicurati che sia coerente con quella usata per la verifica
    private static final String SECRET_KEY = "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJvbWFyIiwiaWF0IjoxNzIyODQ5ODExLCJleHAiOjE3MjI5MzYyMTF9.xKgOvOnivvRPxGlkyzjpptlCS4PCyPQnkE7F1bHaHpI"; // Sostituisci con la chiave generata
    private static final long EXPIRATION_TIME = 86400000; // 1 giorno in millisecondi

    public String generateToken(String username) {
        return Jwts.builder()
                .setSubject(username)
                .setIssuedAt(new Date())
                .setExpiration(new Date(System.currentTimeMillis() + EXPIRATION_TIME))
                .signWith(SignatureAlgorithm.HS256, SECRET_KEY.getBytes())
                .compact();
    }


    public String extractUsername(String token) {
        return Jwts.parser()
                .setSigningKey(SECRET_KEY.getBytes())
                .parseClaimsJws(token)
                .getBody()
                .getSubject();
    }

    public boolean validateToken(String token, String username) {
        String tokenUsername = extractUsername(token);
        return (tokenUsername.equals(username) && !isTokenExpired(token));
    }

    private boolean isTokenExpired(String token) {
        Date expiration = Jwts.parser()
                .setSigningKey(SECRET_KEY.getBytes())
                .parseClaimsJws(token)
                .getBody()
                .getExpiration();
        return expiration.before(new Date());
    }
}