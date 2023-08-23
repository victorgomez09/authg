package com.gensoft.authg.security;

import com.gensoft.authg.config.AppProperties;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.oauth2.jwt.JwtClaimsSet;
import org.springframework.security.oauth2.jwt.JwtDecoder;
import org.springframework.security.oauth2.jwt.JwtEncoder;
import org.springframework.security.oauth2.jwt.JwtEncoderParameters;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class TokenProvider {

    private static final Logger logger = LoggerFactory.getLogger(TokenProvider.class);

    private final AppProperties appProperties;
    private final JwtEncoder encoder;
    private final JwtDecoder decoder;
    private final AuthenticationManager authenticationManager;

    public String createToken(Authentication authentication) {
//        UserPrincipal userPrincipal = (UserPrincipal) authentication.getPrincipal();

//        Date now = new Date();
//        Date expiryDate = new Date(now.getTime() + appProperties.getAuth().getTokenExpirationMsec());

//        return Jwts.builder()
//                .setSubject(Long.toString(userPrincipal.getId()))
//                .setIssuedAt(new Date())
//                .setIssuer("self")
//                .setExpiration(expiryDate)
//                .signWith(SignatureAlgorithm.HS512, appProperties.getAuth().getTokenSecret())
//                .compact();
        UserPrincipal localUser = (UserPrincipal) authentication.getPrincipal();

        Instant now = Instant.now();
        long expiry = 36000L;
        String scope = localUser.getAuthorities().stream()
                .map(GrantedAuthority::getAuthority)
                .collect(Collectors.joining(" "));
        JwtClaimsSet claims = JwtClaimsSet.builder()
                .issuer("self")
                .issuedAt(now)
                .expiresAt(now.plusSeconds(expiry))
                .subject(localUser.getUsername())
                .claim("scope", scope)
                .build();

        return this.encoder.encode(JwtEncoderParameters.from(claims)).getTokenValue();

    }

    public Long getUserIdFromToken(String token) {
        return Long.parseLong(decoder.decode(token).getSubject());
    }

}
