package com.project.ms_service.Service;

import com.project.ms_service.Exceptions.ServiceException;
import com.project.ms_service.Model.AppService;
import com.project.ms_service.Repositories.ServiceRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ServiceEngine {
    @Autowired
    private ServiceRepository serviceRepository;

    public AppService saveOrUpdateService(AppService service) {

        try {
            service.setName(service.getName().toLowerCase());
            return serviceRepository.save(service);
        } catch (Exception e) {
            throw new ServiceException("Service: " + service.getName().toLowerCase() + " already exists in the system.");
        }
    }

    public AppService findById(Long id) {
        AppService service = serviceRepository.findById(id);

        if (service == null) {
            throw new ServiceException("Service ID: " + id + " does not exist.");
        }
        return service;
    }

    public Iterable<AppService> findAllService() {
        return serviceRepository.findAll();
    }

    public void deleteServiceById(Long id) {
        AppService service = serviceRepository.findById(id);

        if (service == null) {
            throw new ServiceException("Unable to delete Service ID: " + id + " because it does not exist.");
        }
        serviceRepository.delete(service);
    }

}
