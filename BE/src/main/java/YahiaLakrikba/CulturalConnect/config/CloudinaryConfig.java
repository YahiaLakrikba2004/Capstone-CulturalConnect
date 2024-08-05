package YahiaLakrikba.CulturalConnect.config;

import com.cloudinary.*;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class CloudinaryConfig {

    @Value("${CLOUDINARY_NAME}")
    private String cloudinaryName;

    @Value("${CLOUDINARY_KEY}")
    private String cloudinaryKey;

    @Value("${CLOUDINARY_SECRET}")
    private String cloudinarySecret;

    @Bean
    public Cloudinary cloudinary() {
        Cloudinary cloudinary = new Cloudinary(Cloudinary.asMap(
                "cloud_name", cloudinaryName,
                "api_key", cloudinaryKey,
                "api_secret", cloudinarySecret
        ));
        return cloudinary;
    }
}
