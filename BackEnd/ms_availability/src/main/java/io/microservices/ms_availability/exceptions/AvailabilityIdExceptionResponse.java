package io.microservices.ms_availability.exceptions;

public class AvailabilityIdExceptionResponse {
    private String username;

    public AvailabilityIdExceptionResponse(String username) {
        this.username = username;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }
}
