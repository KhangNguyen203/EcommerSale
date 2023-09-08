import axios from "axios";
import cookie from "react-cookies";


const SERVER_CONTEXT = "/SanThuongMaiDT";
const SERVER = "http://localhost:8080";

export const endpoints = {
    "categories": `${SERVER_CONTEXT}/api/categories/`,
    "login": `${SERVER_CONTEXT}/api/login/`,
    "current-user": `${SERVER_CONTEXT}/api/current-user/`,
    "register": `${SERVER_CONTEXT}/api/users/`,
    "products": `${SERVER_CONTEXT}/api/products/`,
    "products-asc": `${SERVER_CONTEXT}/api/products-asc/`,
    "store-info": (storeId) =>`${SERVER_CONTEXT}/api/store-info/${storeId}`,
    "store-cate": (storeId) =>`${SERVER_CONTEXT}/api/store-categories/${storeId}`,
    "store-products": (storeId) =>`${SERVER_CONTEXT}/api/store-products/${storeId}`,
    "store-product-desc": (storeId) =>`${SERVER_CONTEXT}/api/store-product-desc/${storeId}`,
    "store-product-asc": (storeId) =>`${SERVER_CONTEXT}/api/store-product-asc/${storeId}`,
    "reviews": (storeId) => `${SERVER_CONTEXT}/api/store/${storeId}/reviews/`,
    "avg-star": (storeId) => `${SERVER_CONTEXT}/api/store/${storeId}/avgStarReview/`,
    "count-products": (storeId) => `${SERVER_CONTEXT}/api/store/${storeId}/countProducts/`,
    "add-review": `${SERVER_CONTEXT}/api/reviews/`,
    "create-store": `${SERVER_CONTEXT}/api/create-store/`,
    "pay": `${SERVER_CONTEXT}/api/pay/`,
    "details": (productId) => `${SERVER_CONTEXT}/api/products/${productId}/`,
    "comments-pro": (productId) => `${SERVER_CONTEXT}/api/products/${productId}/comments/`,
    "add-comment-pro": `${SERVER_CONTEXT}/api/comments/`,
}

export const authApis = () => {
    return axios.create({
        baseURL: SERVER,
        headers: {
            "Authorization": cookie.load("token")
        }
    });
}

export default axios.create({
    baseURL: SERVER
})