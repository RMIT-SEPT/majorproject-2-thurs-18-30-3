package com.project.ms_service.Repositories;

import com.project.ms_service.Model.AppService;
import org.springframework.data.repository.CrudRepository;

public interface ServiceRepository extends CrudRepository <AppService, String> {

    AppService findById(Long id);
    @Override
    Iterable<AppService> findAll();

}


