package io.microservices.ms_bookings.web;

import io.microservices.ms_bookings.model.Book;
import io.microservices.ms_bookings.service.BookService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/book")
public class BookingsController {

    @Autowired
    private BookService bookService;

    @PostMapping("")
    public ResponseEntity<Book> createNewBookings(@RequestBody Book bookings) {
        Book bookings1 = bookService.saveOrUpdateBookings(bookings);
        return new ResponseEntity<Book>(bookings, HttpStatus.CREATED);
    }
}
