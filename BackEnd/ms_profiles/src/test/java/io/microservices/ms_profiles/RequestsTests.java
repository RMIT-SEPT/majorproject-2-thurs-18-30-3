package io.microservices.ms_profiles;

import io.microservices.ms_profiles.model.Profiles;
import io.microservices.ms_profiles.services.ProfileService;
import io.microservices.ms_profiles.web.ProfilesController;
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
@WebMvcTest(ProfilesController.class)
public class RequestsTests {

    @Autowired
    private MockMvc mvc;

    @MockBean
    private ProfileService service;

    @Test // Testing get api requests.
    public void testGetRequests() throws Exception {
        Profiles profile1 = new Profiles("Matumbaman", "Zhou","Zhou44", "matumbaman@hotmail.com", "500 elizabeth st", "0414344207", "Mj131213");
        List<Profiles> allProfiles = Arrays.asList(profile1);

        given(service.findAllProfiles()).willReturn(allProfiles);

        mvc.perform(get("/api/users/all")
                .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$", hasSize(1)))
                .andExpect(jsonPath("$[0].username", is(profile1.getUsername())));
    }

    @Test // Testing delete api request.
    public void testDeleteRequests() throws Exception {
        Profiles profile1 = new Profiles("Chou", "Jayson","Jay12", "jay.c@hotmail.com", "501 elizabeth st", "0245688790", "North2233");

        this.mvc.perform(delete("/api/users/Jay12")
                .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk());
    }
}
