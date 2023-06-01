package com.vira.authg.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.UNAUTHORIZED)
public class ApplicationAuthorizationException extends RuntimeException {

    private String clientId;
    private Object fieldValue;

    public ApplicationAuthorizationException(String clientId, Object fieldValue) {
        super(String.format("Application unauthorized with clientId %s : '%s'", clientId, fieldValue));

        this.clientId = clientId;
        this.fieldValue = fieldValue;
    }

    public String getClientId() {
        return clientId;
    }

    public Object getFieldValue() {
        return fieldValue;
    }
}
