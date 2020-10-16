package io.microservices.ms_availability.services;

import io.microservices.ms_availability.exceptions.AvailabilitiesException;
import io.microservices.ms_availability.model.Availability;
import io.microservices.ms_availability.repositories.AvailabilitiesRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class AvailabilityService {
    @Autowired
    private AvailabilitiesRepository availabilityRepo;
    // Method for POST Request
    public Availability createNewAvailability(Availability availability) {
        try {
            availability.setUsername(availability.getUsername().toLowerCase());
            return availabilityRepo.save(availability);
        } catch (Exception e){
            throw new AvailabilitiesException("Username: " + availability.getUsername().toLowerCase() +
                                              "Already exists in the system.");
        }
    }
    // Method for GET specific Request
    public Availability findByUsername(String username) {
        Availability availability = availabilityRepo.findByUsername((username.toLowerCase()));
        if (availability == null) {
            throw new AvailabilitiesException("Username: " + username + "does not exists.");
        }
        return availability;
    }

    // Method for GET all Request
    public Iterable<Availability> findAllAvailability() { return availabilityRepo.findAll(); }

    // Method for DEL Request
    public void deleteAvailabilityByUsername(String username) {
        Availability availability = availabilityRepo.findByUsername((username.toLowerCase()));
        if (availability == null) {
            throw new AvailabilitiesException("Unable to delete user with username: " + username +
                                              ". This user does not exists.");
        }
        availabilityRepo.delete(availability);
    }
}
