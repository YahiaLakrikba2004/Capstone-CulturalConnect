package YahiaLakrikba.CulturalConnect.Util;

import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;

public class KeyGenerator {
    public static void main(String[] args) {
        var key = Keys.secretKeyFor(SignatureAlgorithm.HS256);
        System.out.println("Secret Key (Base64): " + key.getEncoded());
    }
}
