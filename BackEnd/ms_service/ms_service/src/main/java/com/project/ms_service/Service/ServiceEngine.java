package com.project.ms_service.Service;

import com.project.ms_service.Service.ServiceException;
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
        try {
            service.setName(service.getUsername().toLowerCase());
            return serviceRepository.save(service);
        }catch (Exception e){
            throw new ServiceException("Service: " + service.getName().toLowerCase() + " already exists in the system.");
        }

    }

    public AppService findByName(String name) {
        AppService service = serviceRepository.findByName((name.toLowerCase()));

        if (service == null) {
            throw new ServiceException("Service: "+ name + "does not exists.");
        }
        return service;
    }

    public Iterable<AppService> findAllService() { return serviceRepository.findAll(); }

    public void deleteServiceByName(String name){
        AppService service = serviceRepository.findByName((name.toLowerCase()));

        if (name == null) {
            throw new ServiceException("Unable to delete service: "+ username + ". This service does not exist.");
        }
        serviceRepository.delete(service);
    }

}
