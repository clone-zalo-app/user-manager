export const frontendUrl = {
  DASHBOARD :'dashboard',
  CUSTOMER_MANAGER: 'customer-manager',
  SELLING: 'selling',
  CD_MANAGER: 'cd-manager',
  USER_MANAGER: 'user-manager',
  LOGIN: 'login',
  REGISTER: 'register',
  AUTH: 'auth',
  NOT_FOUND: '**'
};
export const ApiUrl = {

  ADMIN: {
    USER: 'user/'
  },
  EMPLOYEE: {
    GET_LIST_CATEGORY: '/employee/category/getListCategory',
    GET_LIST_PRODUCT: '/employee/product/getListProduct',

    // Customer
    CREATE_CUSTOMER: '/employee/customer/createCustomer',
    GET_LIST_CUSTOMER: '/employee/customer/getListCustomer'
  },
  AUTH: {
    LOGIN: 'auth/loginEmail',
    REGISTER: 'auth/signUpEmail',
    VERIFY: 'auth/changeStatus',
  }



}
export const LocalStorage = {
  CART: 'cart',
  USER: 'user',
  TOKEN: 'token'
}
