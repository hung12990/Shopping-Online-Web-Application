package com.example.assignment.dto;

import com.example.assignment.common.MessageValidation;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.Column;
import javax.validation.constraints.NotEmpty;
@Data
@NoArgsConstructor
@AllArgsConstructor
public class FormAccountDto {
    @NotEmpty(message = MessageValidation.MESSAGE_ACCOUNT_USERNAME)
    private String username;

    @NotEmpty(message = MessageValidation.MESSAGE_ACCOUNT_PASSWORD)
    private String password;

    @NotEmpty(message = MessageValidation.MESSAGE_ACCOUNT_NAME)
    private String name;

    @NotEmpty(message = MessageValidation.MESSAGE_ACCOUNT_EMAIL)
    private String email;
}
