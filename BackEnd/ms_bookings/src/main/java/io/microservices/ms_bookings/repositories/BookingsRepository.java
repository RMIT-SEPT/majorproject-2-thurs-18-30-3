package io.microservices.ms_bookings.repositories;

import io.microservices.ms_bookings.model.Book;
import org.springframework.data.repository.CrudRepository;

public interface BookingsRepository extends CrudRepository <Book, Long> {

    Book findByCustomerName(String customerName);
    @Override
    Iterable<Book> findAllById(Iterable<Long> iterable);
}
