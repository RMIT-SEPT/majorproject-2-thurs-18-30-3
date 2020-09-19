package io.microservices.ms_bookings.exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.BAD_REQUEST)
public class BookingsException extends RuntimeException {

    public BookingsException(String message) {
        super(message);
    }
}
