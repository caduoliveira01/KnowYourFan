package com.furia.backend.controller;

import net.sourceforge.tess4j.ITesseract;
import net.sourceforge.tess4j.Tesseract;
import net.sourceforge.tess4j.TesseractException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;

@RestController
@RequestMapping("/api/documentos")
public class DocumentoController {

    @PostMapping("/upload")
    public ResponseEntity<String> uploadDocumento(@RequestParam("file") MultipartFile file) {
        try {
            Path tempDir = Files.createTempDirectory("uploads");
            Path tempFile = tempDir.resolve(file.getOriginalFilename());
            Files.write(tempFile, file.getBytes());

            ITesseract tesseract = new Tesseract();
            tesseract.setDatapath("C:\\Program Files\\Tesseract-OCR\\tessdata");
            tesseract.setLanguage("por");

            String textoExtraido = tesseract.doOCR(tempFile.toFile());

            return ResponseEntity.ok("Texto extraído:\n" + textoExtraido);

        } catch (IOException | TesseractException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Erro ao processar documento: " + e.getMessage());
        }
    }
}
