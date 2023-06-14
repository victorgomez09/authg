package com.authg.example.java;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Component;

import com.authg.jwt.config.SecurityConfig;
import com.authg.jwt.utils.AuthorizedPathsAntMatcher;

@Component
public class AntMatchers implements AuthorizedPathsAntMatcher {

	@Override
	public List<String> getAuthorizedPaths() {
		List<String> authorizedPaths = SecurityConfig.getAuthorizedPaths().stream().collect(Collectors.toList());
		authorizedPaths.add("/public");
		authorizedPaths.add("/public2");

		return authorizedPaths;
	}
    
}
