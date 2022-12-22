export const API_PAYMENT_POST = 'http://localhost:8080/api/payment/create-payment'
export const API_PAYMENT_POST_SUCCESS = 'http://localhost:8080/api/payment/payment-result?'
export const API_REGISTER = 'http://localhost:8080/api/auth/signup'
export const API_FORGOT_PASSWORD = 'http://localhost:8080/api/auth/forgot-password?email='
export const API_CHECK_OTP_EXIST = 'http://localhost:8080/api/auth/confirm-forgot-password?otp='
export const API_RESET_PASSWORD = 'http://localhost:8080/api/auth/reset-password'
export const API_CONFIRM_ACCOUNT = 'http://localhost:8080/api/auth/confirm-account?otp='
export const API_EXIST_MAIL = 'http://localhost:8080/api/auth/exist-email?'
export const API_POST_DETAIL = 'http://localhost:8080/api/post-detail?post_id='
export const API_DISTRICT ='http://localhost:8080/api/address/district'
export const API_PROVINCE = 'http://localhost:8080/api/address/province'
export const API_ROOM_TYPE = 'http://localhost:8080/api/room-type/'
export const API_PROFILE = 'http://localhost:8080/api/auth/profile'
export const API_UPDATE_AVATAR = 'http://localhost:8080/api/auth/edit-avatar'
export const API_UPDATE_PROFILE = 'http://localhost:8080/api/auth/edit-profile'
export const API_GET_DISTRICT_BY_PROVINCE ='http://localhost:8080/api/address/district-by-provinceID?province-id='
export const API_POSTING =  'http://localhost:8080/api/posting/create-posting'
export const API_UPDATE_POSTING = 'http://localhost:8080/api/posting/edit-post?post-id='
export const API_UPDATE_IMG_POST = 'http://localhost:8080/api/posting/edit-image?post-id='
export const API_UTILITYS = 'http://localhost:8080/api/utility'
export const API_DOWNLOAD_IMG = 'http://localhost:8080/api/posting/download-image?post-id='

export const API_HOME_INTERESTING_PLACE = 'http://localhost:8080/api/home/interesting-place'
export const API_HOME_RECOMMENDED_PLACES = 'http://localhost:8080/api/home/recommended-places'
export const API_HOME_POST_TOP_RATE = 'http://localhost:8080/api/home/post-top-rate'

export const API_MAP_GEO = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'
export const API_CHANGE_PASSWORD = 'http://localhost:8080/api/auth/change-password'

export const API_VOUCHER = 'http://localhost:8080/api/voucher'
export const API_VOUCHER_HOST = 'http://localhost:8080/api/voucher/list-voucher-host'
export const API_CHECK_VOUCHER_BY_CODE = 'http://localhost:8080/api/booking/check-post-voucher?'
export const API_SERVICE_POST = 'http://localhost:8080/api/services/all-list'
export const API_PUSH_IMG_POST = 'http://localhost:8080/api/posting/insert-post-image?post-id='
export const API_PUSH_SINGLE_IMG_POST = 'http://localhost:8080/api/posting/insert-post-image-one?post-id='

export const API_BOOKING = 'http://localhost:8080/api/booking/create-booking?post-id='
export const API_CANCEL_BOOKING = 'http://localhost:8080/api/booking/cancel-booking?booking-id='

export const API_RATE = 'http://localhost:8080/api/rate/create-rate?bookingDetail-id='
export const API_RATE_BY_POST_ID = 'http://localhost:8080/api/post-detail/rate-post?post_id='
export const API_REPORT_HS ='http://localhost:8080/api/report/create-reportPost?'

export const API_VOUCHER_BY_POST_ID ='http://localhost:8080/api/post-detail/get-all-voucher?post_id='
export const API_VIEW_HISTORY_BOOKING ='http://localhost:8080/api/booking/history-booking-customer?index-page='

export const API_FOLLOW_HOST = 'http://localhost:8080/api/follow-favourite/create-follow?host-id='
export const API_LIKE_RATE = 'http://localhost:8080/api/like-dislike/create?'
export const API_FAVORITE_POST = 'http://localhost:8080/api/follow-favourite/create-favourite?'

export const API_ACCOUNT_HOST = 'http://localhost:8080/api/manage-account/view-account-host?index-page='
export const API_ACCOUNTS_CUSTOMER = 'http://localhost:8080/api/manage-account/view-account-customer?index-page='
export const API_UPDATE_HOST_STATUS ='http://localhost:8080/api/manage-account/update-status-account?'

//host
export const API_HOST_MANAGE_POST = 'http://localhost:8080/api/manage-post/view-all-post-host?index-page='
export const API_HOST_LIST_REPORT_POST = 'http://localhost:8080/api/manage-post/all-report-post?post-id='
export const API_HOST_MANAGE_VOUCHER = 'http://localhost:8080/api/manage-voucher/view-all-voucher?index-page='
export const API_HOST_CREATE_VOUCHER ='http://localhost:8080/api/voucher/insert'

export const API_HOST_LIST_PENDING_CONFIRM_BOOKING = 'http://localhost:8080/api/manage-post/all-booking-host?'
export const API_HOST_LIST_CURRENT_BOOKING = 'http://localhost:8080/api/manage-post/all-current-booking-host?'
export const API_HOST_CONFIRM_BOOKING = 'http://localhost:8080/api/booking/confirm-booking?'
export const API_HOST_CHECKOUT = 'http://localhost:8080/api/booking/update-status-booking?booking-id='

export const API_HOST_VOUCHER_STATUS_UPDATE = 'http://localhost:8080/api/manage-voucher/update-status-voucher?'

export const API_HOST_MANAGE_LIST_RATE = 'http://localhost:8080/api/manage-rate/all-rate?index-page='
export const API_HOST_MANAGE_LIST_RATE_DETAIL = 'http://localhost:8080/api/manage-rate/all-detail-rate?'
export const API_HOST_REPORT_RATE = 'http://localhost:8080/api/report/create-reportRate?rate-id='
export const API_HOST_UPDATE_STATUS_POST = 'http://localhost:8080/api/manage-post/update-status-post-host?'

export const API_HOST_UPDATE_VOUCHER_FOR_POST ='http://localhost:8080/api/posting/insert-post-voucher?post-id='

export const API_HOST_DASH_BOARD = 'http://localhost:8080/api/dashboard/host'
//admin
export const API_ADMIN_MANAGE_POST = 'http://localhost:8080/api/manage-post/view-all-post?index-page='
export const API_ADMIN_MANAGE_POST_RATE ='http://localhost:8080/api/report/list-reportPost-admin?index-page='
export const API_ADMIN_LIST_REPORT_BY_POST = 'http://localhost:8080/api/report/list-reportPost-detail-admin?'
export const API_ADMIN_MANAGE_REPORT_RATE = 'http://localhost:8080/api/report/list-reportRate-admin?index-page='
export const API_ADMIN_UPDATE_STATUS_POST_IN_MANAGE_REPORT = 'http://localhost:8080/api/posting/update-status?'
export const API_ADMIN_UPDATE_STATUS_REPORT_POST = 'http://localhost:8080/api/report/update-status-report-post?'
export const API_ADMIN_UPDATE_STATUS_REPORT_RATE = 'http://localhost:8080/api/report/update-status-report-rate?'
export const API_HISTORY_HANDLE_REPORT_POST  = 'http://localhost:8080/api/report/all-history-report-post?'
export const API_HISTORY_DETAIL_REPORT = 'http://localhost:8080/api/report/all-detail-history-report-post?'

export const API_ADMIN_GET_COMPLAIN = 'http://localhost:8080/api/report/all-complaint-post?index-page='
export const API_ADMIN_RESOLVE_COMPLAIN = 'http://localhost:8080/api/report/resolve-complaintPost?'

export const API_ADMIN_DASH_BOARD = 'http://localhost:8080/api/dashboard/admin'

//host vs admin
export const API_CREATE_COMPLAIN = 'http://localhost:8080/api/report/create-complaintPost?post-id='
export const API_HOST_REPORT_RATE_TYPE = 'http://localhost:8080/api/report-type/all-report-type-host'
export const API_CUS_REPORT_RATE_TYPE = 'http://localhost:8080/api/report-type/all-report-type-customer'


export const API_SEARCH_FAST = 'http://localhost:8080/api/search/fill-search'
export const API_SEARCH_DETAIL = 'http://localhost:8080/api/search/filter-search?index-page='
export const API_SEARCH_MORE_BY_TITLE = 'http://localhost:8080/api/search?index-page='
export const API_SEARCH_MORE_BY_PROVINCE = 'http://localhost:8080/api/search/search-by-province?index-page='

