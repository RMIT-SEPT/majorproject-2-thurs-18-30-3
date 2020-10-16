package io.microservices.ms_availability.exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.context.request.WebRequest;

public class CustomResponseEntityExceptionHandler {
    @ExceptionHandler
    public final ResponseEntity<Object> handleProjectIdException(AvailabilitiesException ec, WebRequest request) {
        AvailabilityIdExceptionResponse ecResponse = new AvailabilityIdExceptionResponse(ec.getMessage());
        return new ResponseEntity(ecResponse, HttpStatus.BAD_REQUEST);
    }
}
