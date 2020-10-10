package io.microservices.ms_bookings.repositories;

import io.microservices.ms_bookings.model.Book;
import org.springframework.data.repository.CrudRepository;

public interface BookingsRepository extends CrudRepository <Book, String> {

    Book findById(Long id);
    @Override
    Iterable<Book> findAll();
}
