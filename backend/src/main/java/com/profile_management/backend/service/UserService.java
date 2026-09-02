package com.profile_management.backend.service;

import com.profile_management.backend.entity.User;
import com.profile_management.backend.dao.UserRepository;
import com.profile_management.backend.dao.UserTypeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private UserTypeRepository userTypeRepository;

    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    public Optional<User> getUserById(Long id) {
        return userRepository.findById(id);
    }

    public User saveUser(User user) {
        if (user.getUserType() == null || user.getUserType().getId() == null) {
            throw new IllegalArgumentException("User type is mandatory.");
        }

        user.setUserType(userTypeRepository.findById(user.getUserType().getId())
                .orElseThrow(() -> new IllegalArgumentException("User type not found.")));

        return userRepository.save(user);
    }

    public void deleteUser(Long id) {
        if (id == null || !userRepository.existsById(id)) {
            throw new IllegalArgumentException("User not found.");
        }
        userRepository.deleteById(id);
    }
}