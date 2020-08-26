package io.microservices.ms_bookings.repositories;

import io.microservices.ms_bookings.model.Book;
import org.springframework.data.repository.CrudRepository;

public interface BookingsRepository extends CrudRepository <Book, Long> {

    Book findByBookIdentifier(String bookId);
    @Override
    Iterable<Book> findAllById(Iterable<Long> iterable);
}
