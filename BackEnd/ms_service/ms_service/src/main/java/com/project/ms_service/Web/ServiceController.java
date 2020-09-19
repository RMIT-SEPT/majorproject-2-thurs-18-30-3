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

@RestController
@RequestMapping("/api/service")
public class ServiceController {

    @Autowired
    private ServiceEngine serviceEngine;

    @PostMapping("")
    public ResponseEntity<AppService> createNewBookings(@RequestBody AppService service) {
        AppService sampleService = serviceEngine.saveOrUpdateService(service);
        return new ResponseEntity<AppService>(service, HttpStatus.CREATED);
    }
}

