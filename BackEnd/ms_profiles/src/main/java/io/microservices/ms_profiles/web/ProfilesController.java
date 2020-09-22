package io.microservices.ms_profiles.web;

import io.microservices.ms_profiles.model.Profiles;
import io.microservices.ms_profiles.model.UpdateProfile;
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
@CrossOrigin(origins = "*", allowedHeaders = "*")
public class ProfilesController {

    @Autowired
    private ProfileService profileService;

    @Autowired
    private MapValidationErrorService mapValidation;

    // Controller for POST request.
    @PostMapping("")
    public ResponseEntity<?> createNewProfile(@Valid @RequestBody Profiles profiles, BindingResult result) {

        ResponseEntity<?> errorMap = mapValidation.MapValidationService(result);
        if(errorMap != null) {
            return errorMap;
        }
        Profiles profiles1 = profileService.saveOrUpdateProfiles(profiles);
        return new ResponseEntity<Profiles>(profiles1, HttpStatus.CREATED);
    }

    // For returning a single profile from database.
    @GetMapping("/{username}")
    public ResponseEntity<?> getUsers(@PathVariable String username) {
        Profiles profiles = profileService.findByUsername(username);
        return new ResponseEntity<Profiles>(profiles, HttpStatus.OK);
    }

    // For returning all profiles in the database.
    @GetMapping("/all")
    public Iterable<Profiles> getAllPersons() {
        return profileService.findAllProfiles();
    }

    // Deleting user profile from database based on username.
    @DeleteMapping("/{username}")
    public ResponseEntity<?> deleteProfile(@PathVariable String username){
        profileService.deleteProfilesByUsername(username);

        return new ResponseEntity<String>("User with username: '" + username + "' has been deleted.", HttpStatus.OK);
    }

    // Controller for PUT requests.
    @PutMapping("/{username}")
    public ResponseEntity<?> updateProfile(@PathVariable String username, @Valid @RequestBody UpdateProfile profiles){

        Profiles profiles1 = profileService.modifyProfiles(username, profiles);
        return new ResponseEntity<Profiles>(profiles1, HttpStatus.CREATED);
    }
}
