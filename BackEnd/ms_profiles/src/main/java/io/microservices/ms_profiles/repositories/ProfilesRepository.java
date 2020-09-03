package io.microservices.ms_profiles.repositories;

import io.microservices.ms_profiles.model.Profiles;
import org.springframework.data.repository.CrudRepository;

public interface ProfilesRepository extends CrudRepository <Profiles, Long> {

    Profiles findByUsername(String username);
    @Override
    Iterable<Profiles> findAll();
}
