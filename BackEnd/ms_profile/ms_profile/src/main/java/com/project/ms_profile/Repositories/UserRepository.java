package com.project.ms_profile.Repositories;

import com.project.ms_profile.Model.User;
import org.springframework.data.repository.CrudRepository;

public interface UserRepository extends CrudRepository <User, Long> {
    @Override
    Iterable<User> findAllById(Iterable<Long> iterable);

}
