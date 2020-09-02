package io.microservices.ms_profiles.web;

import io.microservices.ms_profiles.model.Profiles;
import io.microservices.ms_profiles.services.MapValidationErrorService;
import io.microservices.ms_profiles.services.ProfileService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

@RestController
@RequestMapping("/api/users")
public class ProfilesController {

    @Autowired
    private ProfileService profileService;

    @Autowired
    private MapValidationErrorService mapValidation;

    @PostMapping("")
    public ResponseEntity<?> createNewBookings(@Valid @RequestBody Profiles profiles, BindingResult result) {

        ResponseEntity<?> errorMap = mapValidation.MapValidationService(result);
        if(errorMap != null) {
            return errorMap;
        }
        Profiles profiles1 = profileService.saveOrUpdateProfiles(profiles);
        return new ResponseEntity<Profiles>(profiles1, HttpStatus.CREATED);
    }

    @GetMapping("/{username}")
    public ResponseEntity<?> getUsers(@PathVariable String username) {
        Profiles profiles = profileService.findByUsername(username);
        return new ResponseEntity<Profiles>(profiles, HttpStatus.OK);
    }

    @GetMapping("/all")
    public Iterable<Profiles> getAllPersons() {
        return profileService.findAllProfiles();
    }

    @DeleteMapping("/{username}")
    public ResponseEntity<?> deleteProject(@PathVariable String username){
        profileService.deleteProfilesByUsername(username);

        return new ResponseEntity<String>("User with username: '" + username + "' has been deleted.", HttpStatus.OK);
    }
}
