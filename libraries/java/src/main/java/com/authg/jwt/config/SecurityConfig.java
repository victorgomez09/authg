package com.authg.jwt.config;

import java.util.Arrays;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;

import com.authg.jwt.exception.JwtAccessDeniedHandler;
import com.authg.jwt.exception.JwtAuthenticationEntryPoint;
import com.authg.jwt.security.JwtConfigurer;
import com.authg.jwt.security.TokenProvider;
import com.authg.jwt.utils.AuthorizedPathsAntMatcher;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

    public final static String AUTHORIZATION_HEADER = "Authorization";

    private TokenProvider tokenProvider;

    private AuthorizedPathsAntMatcher authorizedPathsAntMatcher;

    private JwtAuthenticationEntryPoint jwtAuthenticationEntryPoint;

    private JwtAccessDeniedHandler jwtAccessDeniedHandler;

    public SecurityConfig(TokenProvider tokenProvider, AuthorizedPathsAntMatcher authorizedPathsAntMatcher,
            JwtAuthenticationEntryPoint jwtAuthenticationEntryPoint, JwtAccessDeniedHandler jwtAccessDeniedHandler) {
        this.tokenProvider = tokenProvider;
        this.authorizedPathsAntMatcher = authorizedPathsAntMatcher;
        this.jwtAuthenticationEntryPoint = jwtAuthenticationEntryPoint;
        this.jwtAccessDeniedHandler = jwtAccessDeniedHandler;
    }

    public static List<String> getAuthorizedPaths() {
        return Arrays.asList("/",
                "/login",
                "/openapi.yaml",
                "/openapi.json",
                "/swagger-ui.html",
                "/swagger-ui/**");
    }

    @Bean
    SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        final List<String> authorizedPaths = null == authorizedPathsAntMatcher ? getAuthorizedPaths()
                : authorizedPathsAntMatcher.getAuthorizedPaths();

        // @formatter:off
        http
            .exceptionHandling()
                .authenticationEntryPoint(jwtAuthenticationEntryPoint)
                .accessDeniedHandler(jwtAccessDeniedHandler)

            .and()
                .sessionManagement()
                    .sessionCreationPolicy(SessionCreationPolicy.STATELESS)
            .and().authorizeRequests()
                .antMatchers(authorizedPaths.toArray(String[]::new)).permitAll()
                .anyRequest().authenticated()
            .and().formLogin().disable()
            .apply(securityConfigurerAdapter());
        http.csrf().disable();
        // @formatter:on

        return http.build();
    }

    private JwtConfigurer securityConfigurerAdapter() {
        return new JwtConfigurer(tokenProvider);
    }
}