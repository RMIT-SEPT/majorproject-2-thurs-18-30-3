package io.microservices.ms_bookings.exceptions;

public class BookingsIdExceptionResponse {
    private String bookingsIdentifier;

    public BookingsIdExceptionResponse(String projectIdentifier) {
        this.bookingsIdentifier = projectIdentifier;
    }

    public String getBookingsIdentifier() {
        return bookingsIdentifier;
    }

    public void setBookingsIdentifier(String bookingsIdentifier) {
        this.bookingsIdentifier = bookingsIdentifier;
    }
}
