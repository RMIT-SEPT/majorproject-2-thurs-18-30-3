package io.microservices.ms_bookings.services;

import io.microservices.ms_bookings.exceptions.BookingsException;
import io.microservices.ms_bookings.model.Book;
import io.microservices.ms_bookings.repositories.BookingsRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class BookService {
    @Autowired
    private BookingsRepository bookingsRepository;

    // Method for POST request
    public Book saveOrUpdateBookings (Book bookings) {

        try {
            bookings.setBookIdentifier(bookings.getBookIdentifier().toUpperCase());
            return bookingsRepository.save(bookings);
        }catch (Exception e){
            throw new BookingsException("Booking Id '"+ bookings.getBookIdentifier().toUpperCase()+ "' already exists in the system.");
        }
    }

    // Method for GET specific bookings request
    public Book findByBookIdentifier(String bookingsId){
        Book bookings = bookingsRepository.findByBookIdentifier((bookingsId.toUpperCase()));

        if (bookings == null) {
            throw new BookingsException("Booking's ID '"+ bookingsId + "' does not exists.");
        }
        return bookings;
    }
    // Method for GET all bookings request
    public Iterable<Book> findAllBookings() {
        return bookingsRepository.findAll();
    }

    // Method for DELETE bookings request
    public void deleteBookingsByIdentifier(String bookingsId){
        Book bookings = bookingsRepository.findByBookIdentifier(bookingsId.toUpperCase());

        if (bookings == null){
            throw new BookingsException("Unable to remove booking with ID '"+ bookingsId + "'. This ID does not exists.");
        }
        bookingsRepository.delete(bookings);
    }
}
