package com.vira.authg.service;

import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import com.vira.authg.dto.TokenRefreshDTO;
import com.vira.authg.dto.TokenResponseDTO;
import com.vira.authg.dto.UserLoginDTO;
import com.vira.authg.dto.UserRegisterDTO;
import com.vira.authg.exception.TokenGenerationException;

@AllArgsConstructor
@Service
public class AuthService {
    
    private final JwtService jwtService;
    private final UserService userService;

    public TokenResponseDTO register(final UserRegisterDTO userRegister) {
        userService.createUser(userRegister);
        String email = userRegister.getEmail();
        
        return getJwtTokenResponse(email);
    }
    
    public TokenResponseDTO login(final UserLoginDTO userLogin) {
        String email = userLogin.getEmail();
        String password = userLogin.getPassword();
        userService.checkCredentials(email, password);
        
        return this.getJwtTokenResponse(email);
    }

    public TokenResponseDTO refresh(final TokenRefreshDTO tokenRefreshDTO) {
        String token = tokenRefreshDTO.getToken();
        boolean isValid = this.jwtService.isValid(token);
        if (!isValid) {
            throw new TokenGenerationException("The provided token is not valid");
        }

        String email = this.jwtService.getEmail(token);
        return this.getJwtTokenResponse(email);
    }
    
    private TokenResponseDTO getJwtTokenResponse(final String email) {
        String token = this.jwtService.getToken(email);
        String tokenType = this.jwtService.getTokenType();
        Long expiresIn = this.jwtService.getTokenDuration();

        return new TokenResponseDTO(token, tokenType, expiresIn);
    }
}
