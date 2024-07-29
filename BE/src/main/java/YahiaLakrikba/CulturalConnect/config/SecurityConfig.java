package YahiaLakrikba.CulturalConnect.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.provisioning.InMemoryUserDetailsManager;
import org.springframework.security.web.SecurityFilterChain;

import static org.springframework.security.config.Customizer.withDefaults;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public UserDetailsService userDetailsService() {
        UserDetails user = User.withUsername("user")
                .password(passwordEncoder().encode("password"))
                .roles("USER")
                .build();

        return new InMemoryUserDetailsManager(user);
    }

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
                .csrf(csrf -> csrf.disable()) // Disabilita la protezione CSRF per le API
                .authorizeRequests(authorizeRequests ->
                        authorizeRequests
                                .requestMatchers("/api/auth/**").permitAll() // Permetti accesso pubblico per autenticazione
                                .requestMatchers("/api/events/**").permitAll() // Permetti accesso pubblico per eventi
                                .requestMatchers("/api/recipes/**").permitAll() // Permetti accesso pubblico per ricette
                                .requestMatchers("/api/connections/**").permitAll() // Permetti accesso pubblico per connessioni
                                .requestMatchers("/api/articles/**").permitAll() // Permetti accesso pubblico per articoli
                                .anyRequest().authenticated() // Richiedi autenticazione per tutte le altre richieste
                )
                .formLogin(formLogin -> formLogin
                        .loginPage("/login") // Configura la pagina di login
                        .defaultSuccessUrl("/users", true)
                )
                .httpBasic(withDefaults()); // Autenticazione di base per API

        return http.build();
    }
}
