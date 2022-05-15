package com.example.assignment.dto;

import com.example.assignment.common.Constant;
import com.example.assignment.common.MessageValidation;
import com.example.assignment.entity.Category;
import com.example.assignment.entity.Product;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.constraints.Min;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;
import java.time.LocalDate;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class FormProductDto {

    @NotEmpty(message = MessageValidation.MESSAGE_PRODUCT_NAME)
    private String name;

    @NotNull(message = MessageValidation.MESSAGE_PRODUCT_PRICE)
    @Min(value = 0, message = MessageValidation.MESSAGE_PRODUCT_PRICE_VALUE)
    private Double price;

    @NotEmpty(message = MessageValidation.MESSAGE_PRODUCT_IMAGE)
    private String image;

    @NotNull(message = MessageValidation.MESSAGE_PRODUCT_CATEGORY)
    private Category category;

}
