package com.se.authservice.repository;

import com.se.authservice.entity.Qrcode;
import org.springframework.data.repository.CrudRepository;

import javax.transaction.Transactional;
import java.util.Optional;

public interface ImageRepository extends CrudRepository<Qrcode, String> {
    Optional<Qrcode> findByImageId(String imageId);
    @Transactional
    void deleteByImageId(Long bookId);
    Boolean existsByImageId(Long itemId);
}