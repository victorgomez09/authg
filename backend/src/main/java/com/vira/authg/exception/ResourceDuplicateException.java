package com.vira.authg.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.CONFLICT)
public class ResourceDuplicateException extends RuntimeException {

    private String resourceName;
    private String fieldName;
    private Object fieldValue;

    public ResourceDuplicateException(String resourceName, String fieldName, Object fieldValue) {
        super(String.format("%s already exists with %s : '%s'", resourceName, fieldName, fieldValue));
        this.resourceName = resourceName;
        this.fieldName = fieldName;
        this.fieldValue = fieldValue;
    }

    public String getResourceName() {
        return resourceName;
    }

    public String getFieldName() {
        return fieldName;
    }

    public Object getFieldValue() {
        return fieldValue;
    }

}
