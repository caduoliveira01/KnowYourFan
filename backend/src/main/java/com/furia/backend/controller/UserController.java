package com.furia.backend.controller;

import com.furia.backend.model.User;
import com.furia.backend.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/users")
@CrossOrigin(origins = "http://localhost:5173", allowCredentials = "true")
public class UserController {


    @Autowired
    private UserService userService;


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

    @GetMapping("/me")
    public ResponseEntity<Map<String, Object>> getCurrentUser(@AuthenticationPrincipal UserDetails userDetails) {
        if (userDetails == null) {
            return ResponseEntity.status(401).body(Map.of("error", "Usuário não autenticado"));
        }

        return userService.findByEmail(userDetails.getUsername())
                .map(user -> ResponseEntity.ok(Map.<String, Object>of(
                        "id", user.getId(),
                        "nome", user.getNome(),
                        "email", user.getEmail(),
                        "cpf", user.getCpf(),
                        "endereco", user.getEndereco(),
                        "interesses", user.getInteresses(),
                        "verificado", user.isValidado()
                )))
                .orElse(ResponseEntity.status(404).body(Map.of("error", "Usuário não encontrado")));
    }

}
