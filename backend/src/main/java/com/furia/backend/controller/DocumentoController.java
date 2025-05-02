package com.furia.backend.controller;

import com.furia.backend.model.Documento;
import com.furia.backend.model.User;
import com.furia.backend.repository.DocumentoRepository;
import com.furia.backend.repository.UserRepository;
import net.sourceforge.tess4j.ITesseract;
import net.sourceforge.tess4j.Tesseract;
import net.sourceforge.tess4j.TesseractException;
import org.apache.pdfbox.pdmodel.PDDocument;
import org.apache.pdfbox.rendering.PDFRenderer;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.awt.image.BufferedImage;
import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.nio.file.Files;
import java.nio.file.Path;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/documentos")
@CrossOrigin(origins = "http://localhost:5173")
public class DocumentoController {

    @Autowired
    private DocumentoRepository documentoRepository;

    @Autowired
    private UserRepository usuarioRepository;

    @PostMapping("/upload")
    @Transactional
    public ResponseEntity<?> uploadDocumento(
            @RequestParam("file") MultipartFile file,
            Authentication authentication) {

        try {
            if (file.isEmpty()) {
                return ResponseEntity.badRequest().body("Arquivo vazio");
            }

            String contentType = file.getContentType();
            if (contentType == null ||
                    (!contentType.startsWith("image/") &&
                            !contentType.equals("application/pdf") &&
                            !contentType.equals("text/plain"))) {
                return ResponseEntity.badRequest().body("Tipo de arquivo não suportado");
            }

            String email = authentication.getName();
            User usuario = usuarioRepository.findByEmail(email)
                    .orElseThrow(() -> new RuntimeException("Usuário não encontrado"));

            String textoExtraido;
            try {
                if (contentType.equals("text/plain")) {
                    textoExtraido = extrairTextoDeTxt(file);
                } else {
                    textoExtraido = processarDocumento(file);
                }
            } catch (TesseractException | IOException e) {
                return ResponseEntity.internalServerError()
                        .body("Erro no processamento do documento: " + e.getMessage());
            }
            boolean isValid = normalizarString(textoExtraido)
                    .contains(normalizarString(usuario.getNome()));

            System.out.println("Resultado da comparação: " + isValid);

            Documento doc = new Documento();
            doc.setNomeArquivo(file.getOriginalFilename());
            doc.setTextoExtraido(textoExtraido);
            doc.setValidado(isValid);
            doc.setUsuario(usuario);
            doc.setDataEnvio(LocalDateTime.now());

            documentoRepository.save(doc);

            // 7. Retorna resposta
            return ResponseEntity.ok(Map.of(
                    "status", "success",
                    "validado", isValid,
                    "usuario", Map.of(
                            "nome", usuario.getNome(),
                            "email", usuario.getEmail()
                    )
            ));

        } catch (Exception e) {
            return ResponseEntity.internalServerError()
                    .body("Erro ao processar documento: " + e.getMessage());
        }
    }

    private String normalizarString(String input) {
        return input.toLowerCase()
                .replaceAll("\\s+", " ")
                .replaceAll("[^a-z0-9\\s]", "")
                .trim();
    }

    private String extrairTextoDeTxt(MultipartFile file) throws IOException {
        String conteudo = new String(file.getBytes(), StandardCharsets.UTF_8)
                .replaceAll("\\p{C}", "");
        System.out.println("Conteúdo do TXT (processado): [" + conteudo + "]");
        return conteudo;
    }

    private String processarDocumento(MultipartFile file) throws IOException, TesseractException {
        Path tempFile = Files.createTempFile("doc_", "_ocr");
        try {
            file.transferTo(tempFile);

            ITesseract tesseract = new Tesseract();
            tesseract.setDatapath("C:\\Program Files\\Tesseract-OCR\\tessdata");
            tesseract.setLanguage("por");

            if (file.getContentType().equals("application/pdf")) {
                return processarPdf(tempFile, tesseract);
            } else {
                return tesseract.doOCR(tempFile.toFile());
            }
        } finally {
            Files.deleteIfExists(tempFile);
        }
    }

    private String processarPdf(Path pdfFile, ITesseract tesseract) throws IOException, TesseractException {
        StringBuilder textoExtraido = new StringBuilder();
        PDDocument document = PDDocument.load(pdfFile.toFile());

        try {
            PDFRenderer pdfRenderer = new PDFRenderer(document);
            for (int page = 0; page < document.getNumberOfPages(); ++page) {
                BufferedImage bim = pdfRenderer.renderImageWithDPI(page, 300);
                textoExtraido.append(tesseract.doOCR(bim)).append("\n--- Página ").append(page + 1).append(" ---\n");
            }
        } finally {
            document.close();
        }
        return textoExtraido.toString();
    }

    @GetMapping
    public ResponseEntity<List<Documento>> listarDocumentosDoUsuario(Authentication authentication) {
        String email = authentication.getName();
        User usuario = usuarioRepository.findByEmail(email).orElseThrow();
        return ResponseEntity.ok(documentoRepository.findByUsuario(usuario));
    }
}