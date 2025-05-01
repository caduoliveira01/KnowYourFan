package com.furia.backend.repository;

import com.furia.backend.model.Documento;
import com.furia.backend.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface DocumentoRepository extends JpaRepository<Documento, Long> {
    List<Documento> findByUsuario(User usuario);
}
