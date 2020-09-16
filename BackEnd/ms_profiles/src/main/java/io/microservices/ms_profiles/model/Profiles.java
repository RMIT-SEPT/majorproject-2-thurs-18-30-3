package io.microservices.ms_profiles.model;

import com.fasterxml.jackson.annotation.JsonFormat;

import javax.persistence.*;
import javax.persistence.Id;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;
import java.util.Date;

@Entity
public class Profiles {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
    private String type;
//    @NotBlank(message = "User first name is required.")
    private String firstName;
//    @NotBlank(message = "User last name is required.")
    private String lastName;
    @NotBlank(message = "Username must not be empty.")
    @Size(min = 5, message = "Username must have at least 5 characters.")
    @Column(updatable = false, unique = true)
    private String username;
    @NotBlank(message = "User email is required.")
    private String email;
    @NotBlank(message = "Address field cannot be empty.")
    private String address;
    @NotBlank(message = "Phone number is required.")
    private String mobileNum;
    @NotBlank(message = "Password is required.")
    @Size(min = 8, max = 20, message = "Password length required: 8-20 characters.")
    private String password;
    // testing
    private String confirmPassword;

    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-mm-dd@HH:mm:ss")
    private Date created_At;
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-mm-dd@HH:mm:ss")
    private Date updated_At;

    public Profiles() {
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public String getMobileNum() {
        return mobileNum;
    }

    public void setMobileNum(String mobileNum) {
        this.mobileNum = mobileNum;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getConfirmPassword() {
        return confirmPassword;
    }

    public void setConfirmPassword(String confirmPassword) {
        this.confirmPassword = confirmPassword;
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
