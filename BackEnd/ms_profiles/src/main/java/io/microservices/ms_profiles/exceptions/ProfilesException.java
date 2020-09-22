package io.microservices.ms_profiles.exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

// Class for handling users related exceptions.
@ResponseStatus(HttpStatus.BAD_REQUEST)
public class ProfilesException extends RuntimeException{
    public ProfilesException(String message) {
        super(message);
    }
}
