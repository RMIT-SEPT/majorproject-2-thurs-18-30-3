package io.microservices.ms_bookings.model;

import javax.validation.constraints.NotBlank;

// Class for modifying bookings object
public class UpdateBookings {

    @NotBlank(message = "Customer name is required.")
    private Long customerId;

    // Constructor
    public UpdateBookings() {
        super();
    }
    public UpdateBookings(Long customerId) {
        this.customerId = customerId;
    }

    public Long getCustomerId() {
        return customerId;
    }

    public void setCustomerId(Long customerId) {
        this.customerId = customerId;
    }
}
