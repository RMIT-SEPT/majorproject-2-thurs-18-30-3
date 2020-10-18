package io.microservices.ms_profiles;

import io.microservices.ms_profiles.model.Profiles;
import io.microservices.ms_profiles.model.UpdateProfile;
import io.microservices.ms_profiles.repositories.ProfilesRepository;
import io.microservices.ms_profiles.services.ProfileService;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.boot.test.autoconfigure.orm.jpa.TestEntityManager;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.test.context.junit4.SpringRunner;

import java.util.Arrays;
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.BDDMockito.given;

@RunWith(SpringRunner.class)
@DataJpaTest
public class UnitTestings {

    @Autowired
    private TestEntityManager entityManager;

    @Autowired
    private ProfilesRepository repo;

    @MockBean
    private ProfileService service;

    @Test // Make sure findByUsername method returns username.
    public void testFindUsernameByReturningCorrectUsername() {
        Profiles profile = new Profiles("Chou", "Minjin","Chou123", "minjin_7@hotmail.com", "500 elizabeth st", "0414044207", "Mj131515");
        entityManager.persist(profile);
        entityManager.flush();

        Profiles found = repo.findByUsername(profile.getUsername());

        assertThat(found.getUsername()).isEqualTo(profile.getUsername());
    }

    @Test // Make sure findByUsername method only returns correct enquired user profile.
    public void testFindSpecificUsername() {
        Profiles profile1 = new Profiles("zhou", "Mantubaman","Zhou44", "matumbaman@hotmail.com", "500 elizabeth st", "0414344207", "Mj131213");
        Profiles profile2 = new Profiles("Kong", "Jay","Jay12", "jay.c@hotmail.com", "501 elizabeth st", "0245688790", "North2233");
        Profiles profile3 = new Profiles("Chatchapat", "North","North2", "north216@hotmail.com", "462 elizabeth st", "0425036215", "hu12345656");
        Profiles profile4 = new Profiles("Van", "Jacky","Jacky3", "jack2@hotmail.com", "450 elizabeth st", "01941356218", "jjabc22323");

        entityManager.persist(profile1);
        entityManager.persist(profile2);
        entityManager.persist(profile3);
        entityManager.persist(profile4);

        Profiles users = repo.findByUsername("Jay12");
        assertThat(users).extracting(Profiles::getUsername).isEqualToComparingFieldByField("Jay12");
    }

    @Test //Testing if updated attributes work for Profiles class.
    public void testProfileModifications() {
        Profiles profile1 = new Profiles("zhou", "Mantubaman","Zhou44", "matumbaman@hotmail.com", "500 elizabeth st", "0414344207", "Mj131213");
        entityManager.persist(profile1);
        entityManager.flush();

        profile1.setFirstName("chan");
        entityManager.persist(profile1);
        entityManager.flush();

        Profiles p = repo.findByUsername(profile1.getUsername());

        assertThat(p.getFirstName()).isEqualTo("chan");
    }

    @Test // Test if profile service method for editing profiles worked.
    public void testPutRequestsModifyFunction() {
        Profiles profile1 = new Profiles("zhou", "Mantubaman","Zhou44", "matumbaman@hotmail.com", "500 elizabeth st", "0414344207", "Mj131213");
        UpdateProfile up = new UpdateProfile("Chou", "Chicken", "minjin_8@hotmail.com", "270 Elizabeth st", "0414025152");
        entityManager.persist(profile1);
        entityManager.flush();
        profile1 = service.modifyProfiles("Zhou44", up);

        List<Profiles> allProfiles = Arrays.asList(profile1);
        given(service.findAllProfiles()).willReturn(allProfiles);
        Profiles p = repo.findByUsername(profile1.getUsername());
        assertThat(p.getFirstName()).isEqualTo("Chou");
    } // Test failed due to @MockBean configurations on ProfilesService

    @Test //Test if profile service method for finding specific profiles worked.
    public void testGetSpecificRequestsFunction() {
        Profiles profile1 = new Profiles("zhou", "Mantubaman","Zhou44", "matumbaman@hotmail.com", "500 elizabeth st", "0414344207", "Mj131213");
        entityManager.persist(profile1);
        entityManager.flush();
        Profiles p1 = service.findByUsername(profile1.getUsername());

        assertThat(p1.getUsername()).isEqualTo(profile1.getUsername());
    } // Test failed due to @MockBean configurations on ProfilesService
}
