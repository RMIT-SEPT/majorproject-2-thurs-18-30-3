package com.project.ms_profile.Service;

import com.project.ms_profile.Model.User;
import com.project.ms_profile.Repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    public User saveOrUpdateUser (User user) {
        //business logic yet to be implemented.
        // return new User("Danny", "Van", "12413", "danny@rmit", "admin" , "123");
         return userRepository.save(user);
    }

}
