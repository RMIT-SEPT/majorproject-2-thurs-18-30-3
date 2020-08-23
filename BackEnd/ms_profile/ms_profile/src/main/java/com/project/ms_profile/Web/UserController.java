package com.project.ms_profile.Web;

import com.project.ms_profile.Model.User;
import com.project.ms_profile.Service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/user")
public class UserController {

    @Autowired
    private UserService userService;

    @PostMapping("")
    public ResponseEntity<User> createNewBookings(@RequestBody User users) {
        User sampleUser = userService.saveOrUpdateUser(users);
        return new ResponseEntity<User>(users, HttpStatus.CREATED);
    }
}


