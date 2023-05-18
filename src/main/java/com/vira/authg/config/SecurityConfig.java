package com.vira.authg.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.oauth2.server.resource.OAuth2ResourceServerConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.oauth2.server.resource.web.BearerTokenAuthenticationEntryPoint;
import org.springframework.security.oauth2.server.resource.web.access.BearerTokenAccessDeniedHandler;
import org.springframework.security.web.SecurityFilterChain;

import com.vira.authg.service.CustomOAuth2UserService;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

        @Autowired
        private CustomOAuth2UserService userService;

        @Bean
        SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
                http
                                .authorizeHttpRequests()
                                .requestMatchers("/oauth/**").permitAll()
                                .requestMatchers("/user/save").hasAnyAuthority("User")
                                .and()
                                .csrf()
                                .disable()
                                .oauth2ResourceServer(OAuth2ResourceServerConfigurer::jwt)
                                // Set unauthorized requests exception handler
                                .sessionManagement((sessionConfig) -> sessionConfig
                                                .sessionCreationPolicy(SessionCreationPolicy.STATELESS))
                                .exceptionHandling((exceptionHandlingConfig) -> exceptionHandlingConfig
                                                .authenticationEntryPoint(new BearerTokenAuthenticationEntryPoint())
                                                .accessDeniedHandler(new BearerTokenAccessDeniedHandler()))
                                .sessionManagement()
                                .sessionCreationPolicy(SessionCreationPolicy.STATELESS)
                                .and()
                                .oauth2Login()
                                .loginPage("/github")
                                .userInfoEndpoint()
                                .userService(userService);

                return http.build();
                // http
                // .httpBasic().disable()
                // .formLogin(AbstractHttpConfigurer::disable)
                // .authorizeHttpRequests((authConfig) -> {
                // authConfig
                // .mvcMatchers("/oauth/login").permitAll()
                // .mvcMatchers("/oauth/register").permitAll()
                // .mvcMatchers("/oauth/refresh").permitAll()
                // // .anyRequest().authenticated()
                // .anyRequest().permitAll();
                // })
                // .auth
                // .csrf((csrfConfig) -> csrfConfig
                // .ignoringRequestMatchers(
                // new MvcRequestMatcher(new HandlerMappingIntrospector(), "/oauth/login"),
                // new MvcRequestMatcher(new HandlerMappingIntrospector(), "/oauth/register"),
                // new MvcRequestMatcher(new HandlerMappingIntrospector(), "/oauth/refresh"),
                // new MvcRequestMatcher(new HandlerMappingIntrospector(), "/**")
                // ))
                // .oauth2ResourceServer(OAuth2ResourceServerConfigurer::jwt)
                // .sessionManagement((sessionConfig) ->
                // sessionConfig.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
                // .exceptionHandling((exceptionHandlingConfig) -> exceptionHandlingConfig
                // .authenticationEntryPoint(new BearerTokenAuthenticationEntryPoint())
                // .accessDeniedHandler(new BearerTokenAccessDeniedHandler())
                // );

                // return http.build();
        }

        @Bean
        PasswordEncoder getEncoder() {
                return new BCryptPasswordEncoder();
        }
}
