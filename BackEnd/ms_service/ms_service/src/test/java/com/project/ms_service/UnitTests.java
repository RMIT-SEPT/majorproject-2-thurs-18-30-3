package com.project.ms_service;

import com.project.ms_service.Model.AppService;
import com.project.ms_service.Repositories.ServiceRepository;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.boot.test.autoconfigure.orm.jpa.TestEntityManager;
import org.springframework.test.context.junit4.SpringRunner;

import static org.assertj.core.api.Assertions.assertThat;


@RunWith(SpringRunner.class)
@DataJpaTest
public class UnitTests {

    @Autowired
    private TestEntityManager entityManager;

    @Autowired
    private ServiceRepository serviceRepo;

    // UNIT TEST 1 = Test to see whether the correct service is returned
    @Test
    public void testForCorrectServiceRetrieval() {
        AppService service = new AppService("Slice of Ham", "description test", "photo coordinates");
        entityManager.persist(service);
        entityManager.flush();

        AppService retrieval = serviceRepo.findById(service.getId());

        assertThat(retrieval.getName()).isEqualTo(service.getName());

    }

    // UNIT TEST 2 = Test whether service returns the correct description
    @Test
    public void testThatServiceReturnsCorrectDescription() {

        AppService service = new AppService("Slice of Ham", "description test", "photo coordinates");
        entityManager.persist(service);
        entityManager.flush();

        AppService retrieval = serviceRepo.findById(service.getId());

        assertThat(retrieval.getDescription()).isEqualTo(service.getDescription());
    }

    // UNIT TEST 3 = Test whether description modification is persistent
    @Test
    public void ServiceDescriptionModificationTest() {

        AppService service = new AppService("Slice of Ham", "description test", "photo coordinates");
        entityManager.persist(service);
        entityManager.flush();

        service.setDescription("Hello World");
        entityManager.persist(service);
        entityManager.flush();

        AppService retrieval = serviceRepo.findById(service.getId());

        assertThat(retrieval.getDescription()).isEqualTo("Hello World");
    }


    // UNIT TEST 4 = Make sure findByService method returns the correct service in a database with other services.
    @Test
    public void testFindSpecificService() {

        AppService service1 = new AppService("Pizza Delivery", "description test", "photo coordinates");
        AppService service2 = new AppService("Apricot Slice", "description test", "photo coordinates");
        AppService service3 = new AppService("Slice of Ham", "description test", "photo coordinates");

        entityManager.persist(service1);
        entityManager.persist(service2);
        entityManager.persist(service3);

        AppService retrieval = serviceRepo.findById(service2.getId());

        assertThat(service2).extracting(AppService::getName).isEqualToComparingFieldByField(service2.getName());
    }


}