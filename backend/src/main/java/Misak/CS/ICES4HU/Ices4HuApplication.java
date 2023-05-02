package Misak.CS.ICES4HU;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import org.springframework.web.filter.CorsFilter;

import java.util.Arrays;
import java.util.Collections;

@CrossOrigin(origins = "http://localhost:3000")
@SpringBootApplication
public class Ices4HuApplication {

	public static void main(String[] args) {
		SpringApplication.run(Ices4HuApplication.class, args);
	}
//	@Bean
//	public CorsFilter corsFilter() {
//		final UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
//		final CorsConfiguration config = new CorsConfiguration();
//		config.setAllowCredentials(true);
//		// Don't do this in production, use a proper list  of allowed origins
//		config.setAllowedOrigins(Collections.singletonList("*"));
//		config.setAllowedHeaders(Arrays.asList("Origin", "Content-Type", "Accept"));
//		config.setAllowedMethods(Arrays.asList("GET", "POST", "PUT", "OPTIONS", "DELETE", "PATCH"));
//		source.registerCorsConfiguration("/**", config);
//		return new CorsFilter(source);
//	}

}
