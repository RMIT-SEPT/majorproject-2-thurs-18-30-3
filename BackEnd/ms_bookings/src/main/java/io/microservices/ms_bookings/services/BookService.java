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
    public Book createNewBookings(Book bookings) {

        try {
            bookings.setEmployeeName(bookings.getEmployeeName());
            return bookingsRepository.save(bookings);
        }catch (Exception e){
            // Still think we need a unique identifier.... how would we handle duplicated bookings?
            throw new BookingsException("Booking Id '"+ bookings.getEmployeeName()+ "' already exists in the system."); // need to fix
        }
    }

    // Method for GET specific bookings request
    public Book findByCustomerName(String customerName){
        Book bookings = bookingsRepository.findByCustomerName((customerName));

        if (bookings == null) {
            throw new BookingsException("Customer Name: '"+ customerName + "' does not have a booking.");
        }
        return bookings;
    }
    // Method for GET all bookings request
    public Iterable<Book> findAllBookings() {
        return bookingsRepository.findAll();
    }

    // Method for DELETE bookings request
    public void deleteBookingsByIdentifier(String bookingsId){
        Book bookings = bookingsRepository.findByCustomerName(bookingsId.toUpperCase());

        if (bookings == null){
            throw new BookingsException("Unable to remove booking with ID '"+ bookingsId + "'. This ID does not exists.");
        }
        bookingsRepository.delete(bookings);
    }
}
