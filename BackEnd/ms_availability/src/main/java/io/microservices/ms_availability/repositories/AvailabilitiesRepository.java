package io.microservices.ms_availability.repositories;

import io.microservices.ms_availability.model.Availability;
import org.springframework.data.repository.CrudRepository;

public interface AvailabilitiesRepository extends CrudRepository <Availability, Long> {
    Availability findByUsername(String username);
    @Override
    Iterable<Availability> findAll();
}
