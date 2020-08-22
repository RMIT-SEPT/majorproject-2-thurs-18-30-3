package io.microservices.ms_bookings.model;

import com.fasterxml.jackson.annotation.JsonFormat;

import javax.validation.constraints.NotBlank;
import javax.persistence.*;
import javax.validation.constraints.Size;
import java.util.Date;

@Entity
public class Book {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
//    @Size(min = 5, message = "Minimum 5 characters is required.")
//    @NotBlank(message = "Service name must not be empty.")
    private String serviceName;
    @Size(min = 3, message = "Minimum 3 characters is required.")
    @NotBlank(message = "Service type must not be empty.")
    private String type;
    @NotBlank(message = "User email is required.")
    private String email;
    private long time;

    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-mm-dd@HH:mm:ss")
    private Date created_At;
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-mm-dd@HH:mm:ss")
    private Date updated_At;

    public Book() {
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getServiceName() {
        return serviceName;
    }

    public void setServiceName(String serviceName) {
        this.serviceName = serviceName;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public long getTime() {
        return time;
    }

    public void setTime(long time) {
        this.time = time;
    }

    @PrePersist
    protected void onCreate() { this.created_At = new Date(); }

    @PreUpdate
    protected void onUpdate() {
        this.updated_At = new Date();
    }
}
