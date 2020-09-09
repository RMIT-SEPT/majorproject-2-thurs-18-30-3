package com.project.ms_service.Web;

import com.project.ms_service.Model.AppService;
import com.project.ms_service.Service.ServiceEngine;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/service")
public class ServiceController {

    @Autowired
    private ServiceEngine serviceEngine;

    @PostMapping("")
    public ResponseEntity<AppService> createNewBookings(@RequestBody AppService service) {
        ResponseEntity<?> errorMap = mapValidation.MapValidationService(result);
        if(errorMap != null) {
            return errorMap;
        }
        AppService sampleService = serviceEngine.saveOrUpdateService(service);
        return new ResponseEntity<AppService>(service, HttpStatus.CREATED);
    }

    @GetMapping("/{name}")
    public ResponseEntity<?> getUsers(@PathVariable String name) {
        AppService service = serviceEngine.findByName(name);
        return new ResponseEntity<AppService>(AppService, HttpStatus.OK);
    }

    @GetMapping("/all")
    public Iterable<AppService> findAllService() {
        return serviceEngine.findAllService();
    }

    @DeleteMapping("/{username}")
    public ResponseEntity<?> deleteProject(@PathVariable String name){
        serviceEngine.deleteServiceByName(name);

        return new ResponseEntity<String>("User with username: '" + name + "' has been deleted.", HttpStatus.OK);
    }



}

