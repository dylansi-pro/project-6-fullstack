package com.profile_management.backend.service;

import com.profile_management.backend.entity.UserType;
import com.profile_management.backend.dao.UserRepository;
import com.profile_management.backend.dao.UserTypeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UserTypeService {

    @Autowired
    private UserTypeRepository userTypeRepository;

    @Autowired
    private UserRepository userRepository;

    public List<UserType> getAllUserTypes() {
        return userTypeRepository.findAll();
    }

    public Optional<UserType> getUserTypeById(Long id) {
        return userTypeRepository.findById(id);
    }

    public UserType saveUserType(UserType userType) {
        if (userType.getId() != null && !userTypeRepository.existsById(userType.getId())) {
            throw new IllegalArgumentException("User type not found.");
        }

        // Empêche de modifier le nom du type ID 1 par sécurité
        if (Long.valueOf(1L).equals(userType.getId())) {
            userType.setType("undefined");
        }
        return userTypeRepository.save(userType);
    }

    public void deleteUserType(Long id) {
        if (Long.valueOf(1L).equals(id)) {
            throw new IllegalArgumentException("Cannot delete the default undefined user type.");
        }
        if (id == null || !userTypeRepository.existsById(id)) {
            throw new IllegalArgumentException("User type not found.");
        }
        if (userRepository.existsByUserTypeId(id)) {
            throw new IllegalStateException("Cannot delete a user type that is assigned to users.");
        }
        userTypeRepository.deleteById(id);
    }
}