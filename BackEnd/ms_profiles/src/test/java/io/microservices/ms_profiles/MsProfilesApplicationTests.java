package io.microservices.ms_profiles;

import io.microservices.ms_profiles.exceptions.ProfilesException;
import io.microservices.ms_profiles.model.Profiles;
import io.microservices.ms_profiles.repositories.ProfilesRepository;
import io.microservices.ms_profiles.services.ProfileService;
import org.junit.Assert;
import org.junit.Rule;
import org.junit.jupiter.api.Test;
import org.junit.rules.ExpectedException;
import org.springframework.boot.test.context.SpringBootTest;

@SpringBootTest
class MsProfilesApplicationTests {
    private ProfileService p;

    @Rule
    public ExpectedException exceptionRule = ExpectedException.none();

    @Test
    void testFindUsernameNullExceptions() {
        try {
            p.findByUsername("");
        } catch (Exception e) {
            exceptionRule.expect(NullPointerException.class);
            exceptionRule.expectMessage("Null username.");
        }
    }
}
