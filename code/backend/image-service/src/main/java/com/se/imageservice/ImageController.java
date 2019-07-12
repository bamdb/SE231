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
    private final ImageRepository imageRepository;

    @Autowired
    public ImageController(ImageRepository imageRepository) {
        this.imageRepository = imageRepository;
    }

    @GetMapping(value="/id/{imageId}", produces = {MediaType.IMAGE_JPEG_VALUE, MediaType.IMAGE_PNG_VALUE})
    public byte[] getImageById(@PathVariable Long imageId){
        if (imageRepository.existsByImageId(imageId))
            return imageRepository.findByImageId(imageId).get().getImage().getData();
        else return null;
    }

    @DeleteMapping("/delete/id/{imageId}")
    public ResponseEntity<?> deleteByID(@PathVariable Long imageId){
        imageRepository.deleteByImageId(imageId);
        return ResponseEntity.ok().body("delete item successfully!");
    }

    @PostMapping("/update/id/{imageId}")
    public Image updateImageById(@PathVariable Long imageId, @RequestParam(value="image") MultipartFile file) throws IOException {
        Image image = imageRepository.findByImageId(imageId).orElse(new Image(imageId, new Binary(file.getBytes())));
        image.setImage(new Binary(file.getBytes()));
        return imageRepository.save(image);
    }

    @PostMapping("/insert/id/{imageId}")
    public Image insertImageById(@PathVariable Long imageId, @RequestParam(value="image") MultipartFile file) throws IOException {
        Image image = new Image(imageId, new Binary(file.getBytes()));
        return imageRepository.save(image);
    }
}