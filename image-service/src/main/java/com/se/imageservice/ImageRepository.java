package com.se.imageservice;

import org.springframework.data.repository.CrudRepository;

import javax.transaction.Transactional;
import java.util.Optional;

public interface ImageRepository extends CrudRepository<Image, String> {
    Optional<Image> findByImageId(Long imageId);
    @Transactional
    void deleteByImageId(Long imageId);
    Boolean existsByImageId(Long itemId);
}
