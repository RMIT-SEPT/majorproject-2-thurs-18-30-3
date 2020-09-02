package io.microservices.ms_profiles.exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.context.request.WebRequest;

@ControllerAdvice
@RestController
public class CustomResponseEntityExceptionHandler {
    @ExceptionHandler
    public final ResponseEntity<Object> handleProjectIdException(ProfilesException ec, WebRequest request) {
        ProfilesIdExceptionResponse ecResponse = new ProfilesIdExceptionResponse(ec.getMessage());
        return new ResponseEntity(ecResponse, HttpStatus.BAD_REQUEST);
    }
}
