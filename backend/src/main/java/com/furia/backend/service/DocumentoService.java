package com.furia.backend.service;

import com.furia.backend.model.Documento;
import com.furia.backend.model.User;
import com.furia.backend.repository.DocumentoRepository;
import com.furia.backend.repository.UserRepository;
import jakarta.persistence.EntityNotFoundException;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@Service
public class DocumentoService {

    @Autowired
    UserRepository userRepository;

    private final DocumentoRepository documentoRepository;

    public DocumentoService(DocumentoRepository documentoRepository) {
        this.documentoRepository = documentoRepository;
    }

    @Transactional
    public Documento salvarDocumento(Documento documento) {
        User usuario = userRepository.findById(documento.getUsuario().getId())
                .orElseThrow(() -> new EntityNotFoundException("Usuário não encontrado"));

        documento.setUsuario(usuario);
        return documentoRepository.save(documento);
    }

    public List<Documento> listarPorUsuario(User usuario) {
        return documentoRepository.findByUsuario(usuario);
    }
}
