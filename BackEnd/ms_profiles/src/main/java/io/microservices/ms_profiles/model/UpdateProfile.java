package io.microservices.ms_profiles.model;

import javax.validation.constraints.NotBlank;

public class UpdateProfile {
    @NotBlank(message = "User first name is required.")
    private String firstName;
    @NotBlank(message = "User last name is required.")
    private String lastName;
    @NotBlank(message = "User email is required.")
    private String email;
    @NotBlank(message = "Address field cannot be empty.")
    private String address;
    @NotBlank(message = "Phone number is required.")
    private String mobileNum;

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
}
