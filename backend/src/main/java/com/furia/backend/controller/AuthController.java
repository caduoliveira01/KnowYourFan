package com.furia.backend.controller;

import com.furia.backend.config.JwtUtil;
import com.furia.backend.dto.AuthRequest;
import com.furia.backend.dto.AuthResponse;
import com.furia.backend.model.User;
import com.furia.backend.repository.UserRepository;
import com.furia.backend.service.UserService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/auth")
@CrossOrigin(origins = "http://localhost:5173")
public class AuthController {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private JwtUtil jwtUtil;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private UserService userService;


    @PostMapping
    public ResponseEntity<?> createUser(@Valid @RequestBody User user) {
        try {
            if (user.getCpf() == null || user.getCpf().isEmpty()) {
                return ResponseEntity.badRequest().body("CPF não pode ser vazio");
            }

            User savedUser = userService.saveUser(user);
            return ResponseEntity.ok(savedUser);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        } catch (Exception e) {
            return ResponseEntity.internalServerError().body("Erro ao processar requisição");
        }
    }


    @PostMapping("/login")
    public ResponseEntity<AuthResponse> login(@RequestBody AuthRequest request) {
        Optional<User> userOpt = userRepository.findByEmail(request.email);
        if (userOpt.isPresent()) {
            User user = userOpt.get();
            if (passwordEncoder.matches(request.senha, user.getSenha())) {
                String token = jwtUtil.generateToken(user.getEmail());
                return ResponseEntity.ok(new AuthResponse(token));
            }
        }
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
    }
}

