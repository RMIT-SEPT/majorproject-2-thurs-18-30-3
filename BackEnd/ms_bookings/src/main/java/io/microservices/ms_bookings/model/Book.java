package io.microservices.ms_bookings.model;

import com.fasterxml.jackson.annotation.JsonFormat;

import javax.validation.constraints.NotBlank;
import javax.persistence.*;
import javax.validation.constraints.Size;
import java.util.Date;


// Main class for bookings object
@Entity
public class Book {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Size(min = 5, message = "Minimum 5 characters is required.")
    @NotBlank(message = "Service name must not be empty.")
    private String serviceName;
    @NotBlank(message ="Booking identifier is required")
    @Size(min = 4,max =5, message = "Please enter 4 to 5 characters")
    @Column(updatable = false, unique = true)
    private String bookIdentifier;
    @NotBlank(message ="Username is required.")
    private String username;
    @NotBlank(message ="Time slot is required")
    private long time;
    @NotBlank(message ="Date is required")
    private String date;


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

    public String getBookIdentifier() {
        return bookIdentifier;
    }

    public void setBookIdentifier(String bookingIdentifier) {
        this.bookIdentifier = bookingIdentifier;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public long getTime() {
        return time;
    }

    public void setTime(long time) {
        this.time = time;
    }

    public String getDate() {
        return date;
    }

    public void setDate(String date) {
        this.date = date;
    }

    public Date getCreated_At() {
        return created_At;
    }

    public void setCreated_At(Date created_At) {
        this.created_At = created_At;
    }

    public Date getUpdated_At() {
        return updated_At;
    }

    public void setUpdated_At(Date updated_At) {
        this.updated_At = updated_At;
    }

    @PrePersist
    protected void onCreate() { this.created_At = new Date(); }

    @PreUpdate
    protected void onUpdate() {
        this.updated_At = new Date();
    }
}
