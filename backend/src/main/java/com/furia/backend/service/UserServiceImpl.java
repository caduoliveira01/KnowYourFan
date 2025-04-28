package com.furia.backend.service;

import com.furia.backend.model.User;
import com.furia.backend.repository.UserRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class UserServiceImpl implements UserService {
    private final UserRepository userRepository;

    @Autowired
    public UserServiceImpl(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Override
    @Transactional
    public User saveUser(User user) {
        // Formata CPF se necessário
        if (user.getCpf() != null) {
            String rawCpf = user.getCpf().replaceAll("[^0-9]", "");
            if (!rawCpf.matches("\\d{11}")) {
                throw new IllegalArgumentException("CPF deve conter 11 dígitos");
            }
            user.setCpf(rawCpf.replaceAll("(\\d{3})(\\d{3})(\\d{3})(\\d{2})", "$1.$2.$3-$4"));
        }

        // Validações
        if (userRepository.existsByCpf(user.getCpf())) {
            throw new IllegalArgumentException("CPF já cadastrado");
        }

        if (user.getInteresses() == null || user.getInteresses().isEmpty()) {
            throw new IllegalArgumentException("Deve haver pelo menos 1 interesse");
        }

        return userRepository.save(user);
    }

    @Override
    public Optional<User> findByCpf(String cpf) {
        return userRepository.findByCpf(cpf);
    }
}