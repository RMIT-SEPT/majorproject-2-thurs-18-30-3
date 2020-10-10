package io.microservices.ms_bookings.services;

import io.microservices.ms_bookings.exceptions.BookingsException;
import io.microservices.ms_bookings.model.Book;
import io.microservices.ms_bookings.model.UpdateBookings;
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
            bookings.setEmployeeId(bookings.getEmployeeId());
            return bookingsRepository.save(bookings);
        }catch (Exception e){
            // Still think we need a unique identifier.... how would we handle duplicated bookings?
            throw new BookingsException("Booking with employee name: '"+ bookings.getEmployeeId()+ "' already exists in the system."); // need to fix
        }
    }

    // Method for GET specific bookings request
    public Book findByBookingsId(Long id){
        Book bookings = bookingsRepository.findById((id));

        if (bookings == null) {
            throw new BookingsException("Booking id: '"+ id + "' does not exist.");
        }
        return bookings;
    }
    // Method for GET all bookings request
    public Iterable<Book> findAllBookings() {
        return bookingsRepository.findAll();
    }

    // Method for DELETE bookings request
    public void deleteBookingsById(Long id){
        Book bookings = bookingsRepository.findById(id);

        if (bookings == null){
            throw new BookingsException("Unable to remove booking with id: '"+ id + "'. This booking does not exist.");
        }
        bookingsRepository.delete(bookings);
    }

    // Controller for PUT Request
    public Book modifyBookings (Long id, UpdateBookings bookings) {
        Book b1 = bookingsRepository.findById((id));
        try {
            b1.setCustomerId(bookings.getCustomerId());
            return bookingsRepository.save(b1);
        }catch (Exception e){
            throw new BookingsException("Bookings with id: " + b1.getId() + " could not be updated.");
        }
    }
}
