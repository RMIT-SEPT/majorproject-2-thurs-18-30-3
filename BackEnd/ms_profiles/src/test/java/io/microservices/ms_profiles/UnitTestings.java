package io.microservices.ms_profiles;

import io.microservices.ms_profiles.model.Profiles;
import io.microservices.ms_profiles.repositories.ProfilesRepository;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.boot.test.autoconfigure.orm.jpa.TestEntityManager;
import org.springframework.test.context.junit4.SpringRunner;
import static org.assertj.core.api.Assertions.assertThat;


@RunWith(SpringRunner.class)
@DataJpaTest
public class UnitTestings {

    @Autowired
    private TestEntityManager entityManager;

    @Autowired
    private ProfilesRepository repo;

    @Test // Make sure findByUsername method returns username.
    public void testFindUsernameByReturningCorrectUsername() {
        Profiles profile = new Profiles("Chou123", "minjin_7@hotmail.com", "500 elizabeth st", "0414044207", "Mj131515");
        entityManager.persist(profile);
        entityManager.flush();

        Profiles found = repo.findByUsername(profile.getUsername());

        assertThat(found.getUsername()).isEqualTo(profile.getUsername());
    }

    @Test // Make sure findByUsername method only returns correct enquired user profile.
    public void testFindSpecificUsername() {
        Profiles profile1 = new Profiles("Zhou44", "matumbaman@hotmail.com", "500 elizabeth st", "0414344207", "Mj131213");
        Profiles profile2 = new Profiles("Jay12", "jay.c@hotmail.com", "501 elizabeth st", "0245688790", "North2233");
        Profiles profile3 = new Profiles("North2", "north216@hotmail.com", "462 elizabeth st", "0425036215", "hu12345656");
        Profiles profile4 = new Profiles("Jacky3", "jack2@hotmail.com", "450 elizabeth st", "01941356218", "jjabc22323");

        entityManager.persist(profile1);
        entityManager.persist(profile2);
        entityManager.persist(profile3);
        entityManager.persist(profile4);

        Profiles users = repo.findByUsername("Jay12");
        assertThat(users).extracting(Profiles::getUsername).isEqualToComparingFieldByField("Jay12");
    }
}
