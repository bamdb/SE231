package com.se.imageservice;
import org.bson.types.Binary;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

@RestController
public class ImageController {
    @Autowired
    private ImageRepository imageRepository;

    @GetMapping(value="/books/{bookId}", produces = {MediaType.IMAGE_JPEG_VALUE, MediaType.IMAGE_PNG_VALUE})
    public byte[] getImageById(@PathVariable Long bookId){
        return imageRepository.findByBookId(bookId).get().getImage().getData();
    }

    @DeleteMapping("/books/{bookId}")
    public ResponseEntity<?> deleteByID(@PathVariable Long bookId){
        imageRepository.deleteByBookId(bookId);
        return ResponseEntity.ok().body("delete book successfully!");
    }

    @PutMapping("/books/{bookId}")
    public Image updateImageById(@PathVariable Long bookId, @RequestParam(value="book") MultipartFile file) throws IOException {
        Image image = imageRepository.findByBookId(bookId).orElse(new Image(bookId, new Binary(file.getBytes())));
        image.setImage(new Binary(file.getBytes()));
        return imageRepository.save(image);
    }

    @PostMapping("/books/{bookId}")
    public Image insertImageById(@PathVariable Long bookId, @RequestParam(value="book") MultipartFile file) throws IOException {
        Image image = new Image(bookId, new Binary(file.getBytes()));
        return imageRepository.save(image);
    }
}