package com.furia.backend.controller;

import com.furia.backend.model.Documento;
import com.furia.backend.model.User;
import com.furia.backend.repository.UserRepository;
import com.furia.backend.service.DocumentoService;
import net.sourceforge.tess4j.ITesseract;
import net.sourceforge.tess4j.Tesseract;
import net.sourceforge.tess4j.TesseractException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.*;
import java.time.LocalDateTime;
import java.util.List;

@RestController
@RequestMapping("/api/documentos")
public class DocumentoController {

    @Autowired
    private DocumentoService documentoService;

    @Autowired
    private UserRepository usuarioRepository;

    @PostMapping("/upload")
    public ResponseEntity<?> uploadDocumento(@RequestParam("file") MultipartFile file, Authentication authentication) {
        try {
            Path tempDir = Files.createTempDirectory("uploads");
            Path tempFile = tempDir.resolve(file.getOriginalFilename());
            Files.write(tempFile, file.getBytes());

            ITesseract tesseract = new Tesseract();
            tesseract.setDatapath("C:\\Program Files\\Tesseract-OCR\\tessdata");
            tesseract.setLanguage("por");

            String textoExtraido = tesseract.doOCR(tempFile.toFile());

            String email = authentication.getName();
            User usuario = usuarioRepository.findByEmail(email).orElseThrow();

            boolean validado = textoExtraido.toLowerCase().contains(usuario.getNome().toLowerCase());

            Documento doc = new Documento();
            doc.setNomeArquivo(file.getOriginalFilename());
            doc.setTextoExtraido(textoExtraido);
            doc.setValidado(validado);
            doc.setUsuario(usuario);
            doc.setDataEnvio(LocalDateTime.now());

            documentoService.salvarDocumento(doc);

            return ResponseEntity.ok("Documento enviado com sucesso. Validação: " + (validado ? "Aprovado" : "Rejeitado"));

        } catch (IOException | TesseractException e) {
            return ResponseEntity.internalServerError().body("Erro ao processar documento: " + e.getMessage());
        }
    }

    @GetMapping
    public ResponseEntity<List<Documento>> listarDocumentosDoUsuario(Authentication authentication) {
        String email = authentication.getName();
        User usuario = usuarioRepository.findByEmail(email).orElseThrow();
        return ResponseEntity.ok(documentoService.listarPorUsuario(usuario));
    }
}
