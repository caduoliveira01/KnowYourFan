package com.furia.backend.repository;

import com.furia.backend.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.query.Param;

import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {

    boolean existsByCpf(@Param("cpf") String cpf);

    Optional<User> findByCpf(@Param("cpf") String cpf);

    Optional<User> findById(@Param("id") Long id);

    Optional<User> findByEmail(String email);
}