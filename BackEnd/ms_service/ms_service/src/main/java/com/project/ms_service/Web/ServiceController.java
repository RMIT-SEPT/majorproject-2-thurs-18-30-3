package com.project.ms_service.Web;

import com.project.ms_service.Model.AppService;
import com.project.ms_service.Service.MapValidationErrorService;
import com.project.ms_service.Service.ServiceEngine;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

@RestController
@RequestMapping("/api/service")
public class ServiceController {

    @Autowired
    private ServiceEngine serviceEngine;

    @Autowired
    private MapValidationErrorService mapValidation;

    @PostMapping("")
    public ResponseEntity<?> createNewBookings(@Valid @RequestBody AppService service, BindingResult result) {
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
        return new ResponseEntity<AppService>(service, HttpStatus.OK);
    }

    @GetMapping("/all")
    public Iterable<AppService> findAllService() {
        return serviceEngine.findAllService();
    }

    @DeleteMapping("/{name}")
    public ResponseEntity<?> deleteProject(@PathVariable String name){
        serviceEngine.deleteServiceByName(name);

        return new ResponseEntity<String>("User with username: '" + name + "' has been deleted.", HttpStatus.OK);
    }



}

