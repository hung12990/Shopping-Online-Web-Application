package com.example.assignment.dto;

import com.example.assignment.common.Constant;
import com.example.assignment.common.MessageValidation;
import com.example.assignment.entity.Account;
import com.example.assignment.entity.Detail;
import com.example.assignment.entity.Order;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;
import java.time.LocalDate;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class FormOrderDto {
    @NotEmpty(message = MessageValidation.MESSAGE_ORDER_ADDRESS)
    private String address;

    @NotEmpty(message = MessageValidation.MESSAGE_ORDER_PHONE)
    private String phone;

    @NotNull(message = MessageValidation.MESSAGE_ORDER_DETAIL)
    private List<Detail> details;

    @NotNull(message = MessageValidation.MESSAGE_ORDER_ACCOUNT)
    private Account account;

    @NotNull(message = MessageValidation.MESSAGE_ORDER_AMOUNT)
    private Double amount;

}
