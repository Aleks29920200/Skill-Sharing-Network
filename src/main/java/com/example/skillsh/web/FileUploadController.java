package com.example.skillsh.web;

import com.example.skillsh.domain.dto.file.FileUploadModel;
import com.example.skillsh.services.file.FileService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.util.Map;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
public class FileUploadController {

    private final FileService fileService;

    public FileUploadController(FileService fileService) {
        this.fileService = fileService;
    }

    @PostMapping("/api/upload")
    public ResponseEntity<?> uploadModel(@ModelAttribute FileUploadModel modelUploadDTO) throws IOException {
        // Note: We use @ModelAttribute here because file uploads usually come as 'multipart/form-data'
        // which Spring handles better with ModelAttribute or RequestPart, not RequestBody (JSON).

        int fileId = this.fileService.upload(modelUploadDTO);

        // Return JSON with the ID
        return ResponseEntity.ok(Map.of(
                "message", "File uploaded successfully",
                "fileId", fileId
        ));
    }
}