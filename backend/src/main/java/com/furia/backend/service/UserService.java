package com.furia.backend.service;

import com.furia.backend.model.User;

import java.util.Optional;

public interface UserService {
    User saveUser(User user);
    Optional<User> findByCpf(String cpf);
    Optional<User> findById(Long id);
    Optional<User> findByEmail(String email);
}
