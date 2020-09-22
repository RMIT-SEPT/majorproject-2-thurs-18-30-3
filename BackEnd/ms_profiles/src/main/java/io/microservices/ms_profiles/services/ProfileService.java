package io.microservices.ms_profiles.services;

import io.microservices.ms_profiles.exceptions.ProfilesException;
import io.microservices.ms_profiles.model.Profiles;
import io.microservices.ms_profiles.model.UpdateProfile;
import io.microservices.ms_profiles.repositories.ProfilesRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ProfileService {
    @Autowired
    private ProfilesRepository profilesRepository;
    // Controller for POST Request
    public Profiles saveOrUpdateProfiles (Profiles profiles) {

        try {
            profiles.setUsername(profiles.getUsername().toLowerCase());
            return profilesRepository.save(profiles);
        }catch (Exception e){
            throw new ProfilesException("Username: " + profiles.getUsername().toLowerCase() + " already exists in the system.");
        }
    }
    // Controller for GET specific Request
    public Profiles findByUsername(String username) {
        Profiles profiles = profilesRepository.findByUsername((username.toLowerCase()));

        if (profiles == null) {
            throw new ProfilesException("Username: "+ username + "does not exists.");
        }
        return profiles;
    }
    // Controller for GET all Request
    public Iterable<Profiles> findAllProfiles() { return profilesRepository.findAll(); }

    public void deleteProfilesByUsername(String username) {
        Profiles profiles = profilesRepository.findByUsername((username.toLowerCase()));

        if (profiles == null) {
            throw new ProfilesException("Unable to delete user with username: "+ username + ". This user does not exist.");
        }
        profilesRepository.delete(profiles);
    }
    // Controller for PUT Request
    public Profiles modifyProfiles (String username, UpdateProfile profiles) {
        Profiles p1 = profilesRepository.findByUsername((username.toLowerCase()));
        try {
            p1.setFirstName(profiles.getFirstName());
            p1.setLastName(profiles.getLastName());
            p1.setEmail(profiles.getEmail());
            p1.setAddress(profiles.getAddress());
            p1.setMobileNum(profiles.getMobileNum());
            return profilesRepository.save(p1);
        }catch (Exception e){
            throw new ProfilesException("Username: " + p1.getUsername().toLowerCase() + " could not be updated.");
        }
    }
}
