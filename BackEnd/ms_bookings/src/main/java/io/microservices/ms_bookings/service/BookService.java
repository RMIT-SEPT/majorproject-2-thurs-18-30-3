package io.microservices.ms_bookings.service;

import io.microservices.ms_bookings.model.Book;
import io.microservices.ms_bookings.repositories.BookingsRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class BookService {
    @Autowired
    private BookingsRepository bookingsRepository;

    public Book saveOrUpdateBookings (Book bookings) {
        //business logic yet to be implemented.
        return bookingsRepository.save(bookings);
    }
}
