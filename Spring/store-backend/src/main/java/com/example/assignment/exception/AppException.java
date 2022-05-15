package com.example.assignment.exception;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
public class AppException extends RuntimeException{
    private Integer code;
    private String resource;
    private String field;
    private String value;

    public AppException(Integer code, String resource, String field, String value){
        super(String.format("Error %s with %s : %s", resource, field, value));
        this.code = code;
    }
}
