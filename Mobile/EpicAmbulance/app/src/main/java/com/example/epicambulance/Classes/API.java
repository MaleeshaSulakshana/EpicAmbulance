package com.example.epicambulance.Classes;

public class API {

    //    Base api
    public static final String BASE_URL = "http://192.168.1.7:5117";

    //    Login api
    public static final String USER_LOGIN_API = BASE_URL + "/api/auth/login";

    //    User api
    public static final String USER_API = BASE_URL + "/api/users";

    //    Hospitals api
    public static final String HOSPITALS_API = BASE_URL + "/api/hospitals";

    //    Bookings api
    public static final String BOOKINGS_API = BASE_URL + "/api/bookings";

    //    Booking comments api
    public static final String BOOKING_COMMENTS_API = BASE_URL + "/api/comments";

    //    User api
    public static final String CREW_MEMBER_API = BASE_URL + "/api/ambulanceCrewMembers";

}
