package io.microservices.ms_availability;

import io.microservices.ms_availability.model.Availability;
import io.microservices.ms_availability.services.AvailabilityService;
import io.microservices.ms_availability.services.MapValidationErrorService;
import io.microservices.ms_availability.web.AvailabilityController;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;

import java.util.Arrays;
import java.util.List;

import static org.hamcrest.Matchers.hasSize;
import static org.hamcrest.Matchers.is;
import static org.mockito.BDDMockito.given;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@RunWith(SpringRunner.class)
@WebMvcTest(AvailabilityController.class)
public class RequestsTests {

    @Autowired
    private MockMvc mvc;

    @MockBean
    private AvailabilityService service;

    @MockBean
    private MapValidationErrorService mapVal;

    @Test // Testing get api requests.
    public void testGetRequests() throws Exception {
        Availability availability = new Availability("admin123", "saturday");
        List<Availability> allAvailabilities = Arrays.asList(availability);

        given(service.findAllAvailability()).willReturn(allAvailabilities);

        mvc.perform(get("/api/availabilities/all")
                .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$", hasSize(1)))
                .andExpect(jsonPath("$[0].username", is(availability.getUsername())));
    }

    @Test
    public void testSpecificRequests() throws Exception {
        Availability availability = new Availability("admin123", "saturday");

        mvc.perform(get("/api/availabilities/admin123")
                .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk());
    }

    @Test // Testing delete api request.
    public void testDeleteRequests() throws Exception {
        Availability availability = new Availability("Jay12", "sunday");

        this.mvc.perform(delete("/api/availabilities/Jay12")
                .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk());
    }
}
