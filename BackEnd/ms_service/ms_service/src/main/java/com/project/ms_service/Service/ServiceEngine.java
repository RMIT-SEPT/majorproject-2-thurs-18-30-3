package com.project.ms_service.Service;

import com.project.ms_service.Model.AppService;
import com.project.ms_service.Repositories.ServiceRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ServiceEngine {

    @Autowired
    private ServiceRepository serviceRepository;

    public AppService saveOrUpdateService (AppService service) {
        //business logic yet to be implemented.

        return serviceRepository.save(service);
    }


}
