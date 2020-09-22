package com.project.ms_service.Exceptions;

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
    public final ResponseEntity<Object> handleProjectIdException(ServiceException ec, WebRequest request) {
        ServiceIdExceptionResponse ecResponse = new ServiceIdExceptionResponse(ec.getMessage());
        return new ResponseEntity(ecResponse, HttpStatus.BAD_REQUEST);
    }
}
