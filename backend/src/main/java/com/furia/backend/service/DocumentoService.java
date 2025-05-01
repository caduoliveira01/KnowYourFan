package com.furia.backend.service;

import com.furia.backend.model.Documento;
import com.furia.backend.model.User;
import com.furia.backend.repository.DocumentoRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class DocumentoService {

    private final DocumentoRepository documentoRepository;

    public DocumentoService(DocumentoRepository documentoRepository) {
        this.documentoRepository = documentoRepository;
    }

    public Documento salvarDocumento(Documento doc) {
        return documentoRepository.save(doc);
    }

    public List<Documento> listarPorUsuario(User usuario) {
        return documentoRepository.findByUsuario(usuario);
    }
}
