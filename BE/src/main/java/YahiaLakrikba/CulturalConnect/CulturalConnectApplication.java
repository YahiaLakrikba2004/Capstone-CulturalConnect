package YahiaLakrikba.CulturalConnect;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.ComponentScan;

@SpringBootApplication
@ComponentScan(basePackages = "YahiaLakrikba.CulturalConnect")
public class CulturalConnectApplication {
	public static void main(String[] args) {
		SpringApplication.run(CulturalConnectApplication.class, args);
	}
}

