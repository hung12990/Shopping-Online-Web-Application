package com.example.assignment.common;

public class ContextURL {
    public static final String API_URL = "/api/v1/";

    //url product
    public static final String PRODUCT_FIND_ALL = "/products";

    public static final String PRODUCT_FIND_BY_CATEGORY = "/product/category/{id}";

    public static final String PRODUCT_FIND_BY_ID = "/product/{id}";

    public static final String PRODUCT_SAVE = "/product/save";

    public static final String PRODUCT_UPDATE = "/product/update/{id}";

    public static final String PRODUCT_DELETE = "/product/delete/{id}";

    public static final String PRODUCT_PAGE_COUNT = "/product/page-count";

    public static final String PRODUCT_STATISTICAL = "/product/statistical";

    //url account
    public static final String ACCOUNT_FIND_BY_USERNAME = "/account/{username}";

    public static final String ACCOUNT_SAVE = "/account/save";

    public static final String ACCOUNT_UPDATE = "/account/update/{id}";

    public static final String ACCOUNT_DELETE = "/account/delete/{id}";

    public static final String ACCOUNT_ROLE = "/role/{username}";

    public static final String ACCOUNT_FIND_ALL = "/accounts";



    //url order
    public static final String ORDER_SAVE = "/order/save";

    public static final String ORDER_FIND_BY_USERNAME = "/order/account/{username}";

    public static final String ORDER_FIND_ALL = "/orders";

    public static final String ORDER_UPDATE = "/order/update/{id}";

    public static final String ORDER_STATISTICAL = "/statistical";

    //url category
    public static final String CATEGORY_FIND_ALL = "/categories";

    //url Authority
    public static final String AUTHORITY_APPOINT = "/authority/{accountId}/is-a/{roleId}";

    public static final String AUTHORITY_RECALL = "/authority/{accountId}/not-a/{roleId}";
}
