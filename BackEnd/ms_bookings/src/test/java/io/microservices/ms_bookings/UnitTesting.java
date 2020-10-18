package io.microservices.ms_bookings;

import io.microservices.ms_bookings.model.Book;
import io.microservices.ms_bookings.model.UpdateBookings;
import io.microservices.ms_bookings.repositories.BookingsRepository;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.boot.test.autoconfigure.orm.jpa.TestEntityManager;
import org.springframework.test.context.junit4.SpringRunner;

import static org.assertj.core.api.Assertions.assertThat;

@RunWith(SpringRunner.class)
@DataJpaTest
public class UnitTesting {

    @Autowired
    private TestEntityManager entityManager;

    @Autowired
    private BookingsRepository bookingRepo;

    int i = 1;
    Long id = (long)i;
    // UNIT TEST 1 = Test to see whether the correct booking is returned
    @Test
    public void testForCorrectServiceRetrievalBooking() {
        Book booking = new Book( id, "service name", "employeeid","customerid","time","date");
        entityManager.persist(booking);
        entityManager.flush();

        Book retrieval = bookingRepo.findById(booking.getId());

        assertThat(retrieval.getServiceName()).isEqualTo(booking.getServiceName());

    }

    // UNIT TEST 2 = Test whether service returns the correct description
    @Test
    public void testThatServiceReturnsCorrectDescription1() {
        int i = 1;
        Long id = (long)i;

        Book booking = new Book( id, "service name", "employeeid","customerid","time","date");
        entityManager.persist(booking);
        entityManager.flush();

        Book retrieval = bookingRepo.findById(booking.getId());

        assertThat(retrieval.getServiceName()).isEqualTo(booking.getServiceName());

    }

    // UNIT TEST 3 = Test whether description modification is persistent
    @Test
    public void ServiceDescriptionModificationTest() {
        int i = 1;
        Long id = (long)i;

        Book booking = new Book( id, "service name", "employeeid","customerid","time","date");
        entityManager.persist(booking);
        entityManager.flush();

        booking.setServiceName("Hello World");
        entityManager.persist(booking);
        entityManager.flush();

        Book retrieval = bookingRepo.findById(booking.getId());

        assertThat(retrieval.getServiceName()).isEqualTo("Hello World");
    }


    // UNIT TEST 4 = Test whether description modification is persistent
    @Test
    public void ServiceDescriptionModificationTest1() {

        int i1 = 1;
        int i2 = 2;
        int i3 = 3;
        Long id1 = (long)i1;
        Long id2 = (long)i2;
        Long id3 = (long)i3;

        Book booking0 = new Book( id1, "service name", "employeeid","customerid","time","date");
        Book booking1 = new Book( id2, "service name", "employeeid","customerid","time","date");
        Book booking2 = new Book( id3, "service name", "employeeid","customerid","time","date");

        entityManager.persist(booking0);
        entityManager.persist(booking1);
        entityManager.persist(booking2);

        assertThat(booking0).extracting(Book::getServiceName).isEqualToComparingFieldByField(booking1.getServiceName());

    }







}
