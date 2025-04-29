package com.furia.backend.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import lombok.Data;

import java.util.List;

@Entity
@Table(name = "app_users")
@Data
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank(message = "Nome é obrigatório")
    private String nome;

    @Column(unique = true)
    @Pattern(regexp = "(\\d{3}\\.\\d{3}\\.\\d{3}-\\d{2}|\\d{11})", message = "CPF inválido")
    private String cpf;

    @ElementCollection(fetch = FetchType.EAGER)
    @CollectionTable(name = "user_interests", joinColumns = @JoinColumn(name = "user_id"))
    @Column(name = "interest")
    private List<String> interesses;
    
    private String enderecoRua;
    private String enderecoCidade;
    private String enderecoEstado;
    private String enderecoCep;
    private String atividadesEventos;

    @NotBlank
    private String senha;
}