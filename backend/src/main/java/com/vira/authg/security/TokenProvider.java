package com.vira.authg.security;

import java.nio.charset.StandardCharsets;
import java.util.Date;

import javax.crypto.SecretKey;
import javax.servlet.http.HttpServletRequest;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;

import com.vira.authg.config.AppProperties;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.MalformedJwtException;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.UnsupportedJwtException;
import io.jsonwebtoken.security.Keys;

@Service
public class TokenProvider {

    private static final Logger logger = LoggerFactory.getLogger(TokenProvider.class);

    private AppProperties appProperties;

    public TokenProvider(AppProperties appProperties) {
        this.appProperties = appProperties;
    }

    public String createToken(Authentication authentication) {
        UserPrincipal userPrincipal = (UserPrincipal) authentication.getPrincipal();

        Date now = new Date();
        Date expiryDate = new Date(now.getTime() + appProperties.getAuth().getTokenExpirationMsec());

        SecretKey key = Keys.hmacShaKeyFor(appProperties.getAuth().getTokenSecret().getBytes(StandardCharsets.UTF_8));
        return Jwts.builder()
                .setSubject(userPrincipal.getEmail())
                .setIssuedAt(new Date())
                .setExpiration(expiryDate)
                // .signWith(SignatureAlgorithm.HS512, appProperties.getAuth().getTokenSecret())
                .signWith(key, SignatureAlgorithm.HS512)
                .compact();
    }

    public String createApplicationToken(Long applicationId, String applicationName, String applicationAudience,
            String applicationIssuer) {
        Date now = new Date();
        Date expiryDate = new Date(now.getTime() + appProperties.getAuth().getTokenExpirationMsec());

        SecretKey key = Keys.hmacShaKeyFor(appProperties.getAuth().getTokenSecret().getBytes(StandardCharsets.UTF_8));
        return Jwts.builder()
                .setSubject(Long.toString(applicationId))
                .setSubject(applicationName)
                .setIssuedAt(new Date())
                .setExpiration(expiryDate)
                .setAudience(applicationAudience)
                .setIssuer(applicationIssuer)
                .signWith(key, SignatureAlgorithm.HS512)
                .compact();
    }

    public String getUserEmailFromToken(String token) {
        SecretKey key = Keys.hmacShaKeyFor(appProperties.getAuth().getTokenSecret().getBytes(StandardCharsets.UTF_8));
        Claims claims = Jwts.parserBuilder().setSigningKey(key).build().parseClaimsJws(token).getBody();
        // Claims claims = Jwts.parser()
        // .setSigningKey(appProperties.getAuth().getTokenSecret())
        // .parseClaimsJws(token)
        // .getBody();

        return claims.getSubject();
    }

    public boolean validateToken(String authToken) {
        try {
            SecretKey key = Keys
                    .hmacShaKeyFor(appProperties.getAuth().getTokenSecret().getBytes(StandardCharsets.UTF_8));
            Jwts.parserBuilder().setSigningKey(key).build().parseClaimsJws(authToken);
            // Jwts.parser().setSigningKey(appProperties.getAuth().getTokenSecret()).parseClaimsJws(authToken);
            return true;
            // } catch (SignatureException ex) {
            // logger.error("Invalid JWT signature");
        } catch (MalformedJwtException ex) {
            logger.error("Invalid JWT token");
        } catch (ExpiredJwtException ex) {
            logger.error("Expired JWT token");
        } catch (UnsupportedJwtException ex) {
            logger.error("Unsupported JWT token");
        } catch (IllegalArgumentException ex) {
            logger.error("JWT claims string is empty.");
        }
        return false;
    }

    public String getJwtFromRequest(HttpServletRequest request) {
        String bearerToken = request.getHeader("Authorization");
        if (StringUtils.hasText(bearerToken) && bearerToken.startsWith("Bearer ")) {
            return bearerToken.substring(7, bearerToken.length());
        }
        return null;
    }

}
