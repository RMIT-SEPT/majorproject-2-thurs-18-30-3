package io.microservices.ms_availability.web;

import io.microservices.ms_availability.model.Availability;
import io.microservices.ms_availability.services.AvailabilityService;
import io.microservices.ms_availability.services.MapValidationErrorService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

@RestController
@RequestMapping("/api/availabilities")
public class AvailabilityController {

    @Autowired
    private AvailabilityService service;

    @Autowired
    private MapValidationErrorService mapValidation;

    // Controller for POST request.
    @PostMapping("")
    public ResponseEntity<?> createNewAvailabilities(@Valid @RequestBody Availability availability, BindingResult result) {

        ResponseEntity<?> errorMap = mapValidation.MapValidationService(result);
        if(errorMap != null) {
            return errorMap;
        }
        Availability availability1 = service.createNewAvailability(availability);
        return new ResponseEntity<Availability>(availability1, HttpStatus.CREATED);
    }

    // For returning a single availability from database.
    @GetMapping("/{username}")
    public ResponseEntity<?> getAvailability(@PathVariable String username) {
        Availability availability = service.findByUsername(username);
        return new ResponseEntity<Availability>(availability, HttpStatus.OK);
    }

    // For returning all availabilities in the database.
    @GetMapping("/all")
    public Iterable<Availability> getAllAvailabilities() {
        return service.findAllAvailability();
    }

    // Deleting unavailability from database based on username.
    @DeleteMapping("/{username}")
    public ResponseEntity<?> deleteAvailability(@PathVariable String username){
        service.deleteAvailabilityByUsername(username);

        return new ResponseEntity<String>("Availability slot with username: '" + username +
                                                "' has been deleted.", HttpStatus.OK);
    }
}
