package com.furia.backend.controller;

import com.furia.backend.model.User;
import com.furia.backend.service.UserService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

@RestController
@RequestMapping("/api/users")
public class UserController {


    @Autowired
    private UserService userService;


    @PostMapping
    public ResponseEntity<?> createUser(@Valid @RequestBody User user) {
        try {

            User savedUser = userService.saveUser(user);
            return ResponseEntity.ok(savedUser);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        } catch (Exception e) {
            return ResponseEntity.internalServerError().body("Erro ao processar requisição");
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<User> updateUser(@PathVariable Long id, @RequestBody User updatedUser) {
        return userService.findById(id).map(user -> {
            user.setCpf(updatedUser.getCpf());
            user.setEndereco(updatedUser.getEndereco());
            user.setInteresses(updatedUser.getInteresses());
            user.setEventos(updatedUser.getEventos());
            user.setCompras(updatedUser.getCompras());
            user.setAtividades(updatedUser.getAtividades());
            return ResponseEntity.ok(userService.saveUser(user));
        }).orElse(ResponseEntity.notFound().build());
    }
}
