package com.profile_management.backend.dao;

import com.profile_management.backend.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    boolean existsByUserTypeId(Long userTypeId);
}
