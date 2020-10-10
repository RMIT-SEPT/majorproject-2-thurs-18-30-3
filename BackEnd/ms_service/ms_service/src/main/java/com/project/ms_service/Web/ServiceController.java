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
@RequestMapping("/api/services")
public class ServiceController {

    @Autowired
    private ServiceEngine serviceEngine;

    @Autowired
    private MapValidationErrorService mapValidation;

    @PostMapping("")
    public ResponseEntity<?> createNewBookings(@Valid @RequestBody AppService service, BindingResult result) {
        ResponseEntity<?> errorMap = mapValidation.MapValidationService(result);
        if (errorMap != null) {
            return errorMap;
        }
        AppService sampleService = serviceEngine.saveOrUpdateService(service);
        return new ResponseEntity<>(sampleService, HttpStatus.CREATED);
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getServiceById(@PathVariable Long id) {
        AppService service = serviceEngine.findById(id);
        return new ResponseEntity<>(service, HttpStatus.OK);
    }

    @GetMapping("/all")
    public Iterable<AppService> getAllServices() {
        return serviceEngine.findAllService();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteService(@PathVariable Long id) {
        serviceEngine.deleteServiceById(id);

        return new ResponseEntity<>("Service ID: " + id + " has been deleted.", HttpStatus.OK);
    }


}

