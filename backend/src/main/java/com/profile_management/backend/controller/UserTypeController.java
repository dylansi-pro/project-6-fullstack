package com.profile_management.backend.controller;

import com.profile_management.backend.entity.UserType;
import com.profile_management.backend.service.UserTypeService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/user-types")
@CrossOrigin("http://localhost:4200")
public class UserTypeController {

    @Autowired
    private UserTypeService userTypeService;

    @GetMapping
    public List<UserType> getAllUserTypes() {
        return userTypeService.getAllUserTypes();
    }

    @GetMapping("/{id}")
    public ResponseEntity<UserType> getUserTypeById(@PathVariable Long id) {
        return userTypeService.getUserTypeById(id)
                .map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<UserType> createUserType(@Valid @RequestBody UserType userType) {
        userType.setId(null);
        UserType saved = userTypeService.saveUserType(userType);
        return new ResponseEntity<>(saved, HttpStatus.CREATED);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteUserType(@PathVariable Long id) {
        userTypeService.deleteUserType(id);
        return ResponseEntity.noContent().build();
    }

    @PutMapping("/{id}")
    public ResponseEntity<UserType> updateUserType(@PathVariable Long id, @Valid @RequestBody UserType userType) {
        if (userTypeService.getUserTypeById(id).isEmpty()) {
            return ResponseEntity.notFound().build();
        }
        userType.setId(id);
        UserType updated = userTypeService.saveUserType(userType);
        return ResponseEntity.ok(updated);
    }
}