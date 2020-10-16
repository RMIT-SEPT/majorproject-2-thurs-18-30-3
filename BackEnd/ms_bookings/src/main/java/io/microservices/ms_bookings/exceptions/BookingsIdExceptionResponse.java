package io.microservices.ms_bookings.exceptions;

public class BookingsIdExceptionResponse {
    private String serviceName;

    public BookingsIdExceptionResponse(String serviceName) {
        this.serviceName = serviceName;
    }

    public String getServiceName() {
        return serviceName;
    }

    public void setServiceName(String serviceName) {
        this.serviceName = serviceName;
    }
}
