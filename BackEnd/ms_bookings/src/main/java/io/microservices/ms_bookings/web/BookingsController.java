package io.microservices.ms_bookings.web;

import io.microservices.ms_bookings.model.Book;
import io.microservices.ms_bookings.services.BookService;
import io.microservices.ms_bookings.services.MapValidationErrorService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

@RestController
@RequestMapping("/api/book")
public class BookingsController {

    @Autowired
    private BookService bookService;

    @Autowired
    private MapValidationErrorService mapValidation;

    // Method for POST requests
    @PostMapping("")
    public ResponseEntity<?> createNewBookings(@Valid @RequestBody Book bookings, BindingResult result) {

        ResponseEntity<?> errorMap = mapValidation.MapValidationService(result);
        if(errorMap != null) {
            return errorMap;
        }
        Book bookings1 = bookService.createNewBookings(bookings);
        return new ResponseEntity<Book>(bookings, HttpStatus.CREATED);
    }

    // Method for GET specific booking request
    @GetMapping("/{customerName}")
    public ResponseEntity<?> getBookingsById(@PathVariable String customerName) {
        Book bookings = bookService.findByCustomerName(customerName);
        return new ResponseEntity<Book>(bookings, HttpStatus.OK);
    }

    // Method for GET all bookings request
    @GetMapping("/all")
    public Iterable<Book> getAllPersons() {
        return bookService.findAllBookings();
    }

    // Method for DELETE bookings requests.
    @DeleteMapping("/{bookingsId}")
    public ResponseEntity<?> deleteProject(@PathVariable String bookingsId){
        bookService.deleteBookingsByIdentifier(bookingsId);

        return new ResponseEntity<String>("Booking with ID: '"+bookingsId+"' was removed.", HttpStatus.OK);
    }
}
// final Booking Controller
