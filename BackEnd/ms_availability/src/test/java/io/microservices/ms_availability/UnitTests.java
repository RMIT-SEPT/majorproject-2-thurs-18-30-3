package io.microservices.ms_availability;

import io.microservices.ms_availability.model.Availability;
import io.microservices.ms_availability.repositories.AvailabilitiesRepository;
import io.microservices.ms_availability.services.AvailabilityService;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.boot.test.autoconfigure.orm.jpa.TestEntityManager;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.test.context.junit4.SpringRunner;

import static org.assertj.core.api.Assertions.assertThat;

@RunWith(SpringRunner.class)
@DataJpaTest
public class UnitTests {
    @Autowired
    private TestEntityManager entityManager;

    @Autowired
    private AvailabilitiesRepository repo;

    @MockBean
    private AvailabilityService service;

    @Test // Make sure findByUsername method returns username.
    public void testFindUsernameByReturningCorrectUsername() {
        Availability availability = new Availability("admin123", "saturday");
        entityManager.persist(availability);
        entityManager.flush();

        Availability found = repo.findByUsername(availability.getUsername());

        assertThat(found.getUsername()).isEqualTo(availability.getUsername());
    }

    @Test // Make sure findByUsername method only returns correct enquired user profile.
    public void testFindSpecificUsername() {
        Availability availability = new Availability("admin123", "saturday");
        Availability availability2 = new Availability("customer123", "sunday");
        Availability availability3 = new Availability("employee123", "monday");
        Availability availability4 = new Availability("user123", "tuesday");

        entityManager.persist(availability);
        entityManager.persist(availability2);
        entityManager.persist(availability3);
        entityManager.persist(availability4);

        Availability users = repo.findByUsername("admin123");
        assertThat(users).extracting(Availability::getUsername).isEqualToComparingFieldByField("admin123");
    }
}
