package com.se.imageservice.controller;
import com.se.imageservice.entity.Image;
import com.se.imageservice.repository.ImageRepository;
import org.bson.types.Binary;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpServletRequest;
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

    @PreAuthorize("hasRole('EDITOR')")
    @DeleteMapping("/delete/id/{imageId}")
    public ResponseEntity<?> deleteByID(@PathVariable Long imageId){
        imageRepository.deleteByImageId(imageId);
        return ResponseEntity.ok().body("delete item successfully!");
    }

    /*TO BE REVISED*/
    @PreAuthorize("hasRole('USER')")
    @PostMapping("/update")
    public Image updateImageById(@RequestParam("imageId") Long imageId, @RequestParam("image") MultipartFile file) throws IOException {
        Image image = imageRepository.findByImageId(imageId).orElse(new Image(imageId, new Binary(file.getBytes())));
        image.setImage(new Binary(file.getBytes()));
        return imageRepository.save(image);
    }

    /*TO BE REVISED*/
    @PreAuthorize("hasRole('USER')")
    @PostMapping("/insert")
    public Image insertImageById(@RequestParam("imageId") Long imageId, @RequestParam("image") MultipartFile file) throws IOException {
        Image image = new Image(imageId, new Binary(file.getBytes()));
        return imageRepository.save(image);
    }
}