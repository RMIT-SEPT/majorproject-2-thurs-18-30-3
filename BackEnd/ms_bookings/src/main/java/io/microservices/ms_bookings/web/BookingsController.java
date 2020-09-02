package io.microservices.ms_bookings.web;

import io.microservices.ms_bookings.model.Book;
import io.microservices.ms_bookings.services.BookService;
import io.microservices.ms_bookings.services.MapValidationErrorService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/book")
public class BookingsController {

    @Autowired
    private BookService bookService;

    @Autowired
    private MapValidationErrorService mapValidation;

    @PostMapping("")
    public ResponseEntity<?> createNewBookings(@Valid @RequestBody Book bookings, BindingResult result) {

        ResponseEntity<?> errorMap = mapValidation.MapValidationService(result);
        if(errorMap != null) {
            return errorMap;
        }
        Book bookings1 = bookService.saveOrUpdateBookings(bookings);
        return new ResponseEntity<Book>(bookings, HttpStatus.CREATED);
    }

    @GetMapping("/{bookingsId}")
    public ResponseEntity<?> getBookingsById(@PathVariable String bookingsId) {
        Book bookings = bookService.findByBookIdentifier(bookingsId);
        return new ResponseEntity<Book>(bookings, HttpStatus.OK);
    }

    @GetMapping("/all")
    public Iterable<Book> getAllPersons() {
        return bookService.findAllBookings();
    }


    public ResponseEntity<?> deleteProject(@PathVariable String bookingsId){
        bookService.deleteBookingsByIdentifier(bookingsId);

        return new ResponseEntity<String>("Booking with ID: '"+bookingsId+"' was removed.", HttpStatus.OK);
    }
}
// final Booking Controller
