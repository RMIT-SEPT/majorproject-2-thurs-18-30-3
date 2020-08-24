package io.microservices.ms_bookings.web;

import io.microservices.ms_bookings.model.Book;
import io.microservices.ms_bookings.service.BookService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.validation.Valid;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/book")
public class BookingsController {

    @Autowired
    private BookService bookService;

    @PostMapping("")
    public ResponseEntity<?> createNewBookings(@Valid @RequestBody Book bookings, BindingResult result) {
        if (result.hasErrors()) {
            Map<String, String> errorMap = new HashMap<>();
            for (FieldError error: result.getFieldErrors()) {
                return new ResponseEntity<List<FieldError>>(result.getFieldErrors(), HttpStatus.BAD_REQUEST);
            }
        }
        Book bookings1 = bookService.saveOrUpdateBookings(bookings);
        return new ResponseEntity<Book>(bookings, HttpStatus.CREATED);
    }
}
