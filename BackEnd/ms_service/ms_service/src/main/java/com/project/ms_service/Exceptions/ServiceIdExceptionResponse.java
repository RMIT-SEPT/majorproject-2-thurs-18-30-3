package com.project.ms_service.ms_service.Exceptions;

public class ServiceIdExceptionResponse {
    private String serviceName;

    public ServiceIdExceptionResponse(String serviceName) { this.serviceName = serviceName; }

    public String getServiceName() {
        return serviceName;
    }

    public void setServiceName(String serviceName) {
        this.serviceName = serviceName;
    }
}