package io.microservices.ms_bookings.exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;
// Class for handling bookings related exceptions.
@ResponseStatus(HttpStatus.BAD_REQUEST)
public class BookingsException extends RuntimeException {

    public BookingsException(String message) {
        super(message);
    }
}
