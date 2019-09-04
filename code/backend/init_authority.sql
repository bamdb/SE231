# ALLOW CASCADE AND IMPORT META DATA OF ROLES AND AUTHORITIES
SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for authority
-- ----------------------------
DROP TABLE IF EXISTS `authority`;
CREATE TABLE `authority`  (
  `id` bigint(20) NOT NULL,
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of authority
-- ----------------------------

INSERT INTO `authority` VALUES (1, 'comment');

-- ----------------------------
-- Table structure for role
-- ----------------------------
DROP TABLE IF EXISTS `role`;
CREATE TABLE `role`  (
  `id` bigint(20) NOT NULL,
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of role
-- ----------------------------
INSERT INTO `role` VALUES (1, 'ROLE_ADMIN');
INSERT INTO `role` VALUES (2, 'ROLE_EDITOR');
INSERT INTO `role` VALUES (3, 'ROLE_USER');

-- ----------------------------
-- Table structure for user
-- ----------------------------
DROP TABLE IF EXISTS `user`;
CREATE TABLE `user`  (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `enabled` bit(1) NULL DEFAULT NULL,
  `img_url` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  `mail` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  `password` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `username` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE INDEX `UK_sb8bbouer5wak8vyiiy4pf2bx`(`username`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 11 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of user
-- ----------------------------
INSERT INTO `user` VALUES (1, b'1', NULL, NULL, '$2a$10$nPV9AOEqUi2Yc.t8NG09B.Ps3/aSIlR2SN5AtEBuAy3rsiwXpynaa', 'admin');
INSERT INTO `user` VALUES (2, b'1', NULL, NULL, '$2a$10$BurYABJA4fnIRccPMSgeX.LyPY8TTXJnK.I7OZQZbhSkMGgwS8jDi', 'editor');
INSERT INTO `user` VALUES (3, b'1', NULL, NULL, '$2a$10$amAhhuQuxDOPvpl/A6zRe.QcfZG8tniK2EalQducjIJeXXvnF25F2', 'user');

-- ----------------------------
-- Table structure for roles_authorities
-- ----------------------------
DROP TABLE IF EXISTS `roles_authorities`;
CREATE TABLE `roles_authorities`  (
  `role_id` bigint(20) NOT NULL,
  `authority_id` bigint(20) NOT NULL,
  UNIQUE INDEX `UK25smxy6ecrk4ybggi9ffbhfmo`(`role_id`, `authority_id`) USING BTREE,
  INDEX `FKrf0e1q6uuld13g1kggo98g2h7`(`authority_id`) USING BTREE,
  CONSTRAINT `FKkyir4v3y22xtr38aasr85n0q8` FOREIGN KEY (`role_id`) REFERENCES `role` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `FKrf0e1q6uuld13g1kggo98g2h7` FOREIGN KEY (`authority_id`) REFERENCES `authority` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of roles_authorities
-- ----------------------------
INSERT INTO `roles_authorities` VALUES (1, 1);
INSERT INTO `roles_authorities` VALUES (2, 1);
INSERT INTO `roles_authorities` VALUES (3, 1);

-- ----------------------------
-- Table structure for users_roles
-- ----------------------------
DROP TABLE IF EXISTS `users_roles`;
CREATE TABLE `users_roles`  (
  `user_id` bigint(20) NOT NULL,
  `role_id` bigint(20) NOT NULL,
  INDEX `FKt4v0rrweyk393bdgt107vdx0x`(`role_id`) USING BTREE,
  INDEX `FKgd3iendaoyh04b95ykqise6qh`(`user_id`) USING BTREE,
  CONSTRAINT `FKgd3iendaoyh04b95ykqise6qh` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `FKt4v0rrweyk393bdgt107vdx0x` FOREIGN KEY (`role_id`) REFERENCES `role` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of users_roles
-- ----------------------------
INSERT INTO `users_roles` VALUES (1, 1);
INSERT INTO `users_roles` VALUES (1, 2);
INSERT INTO `users_roles` VALUES (1, 3);
INSERT INTO `users_roles` VALUES (2, 2);
INSERT INTO `users_roles` VALUES (2, 3);
INSERT INTO `users_roles` VALUES (3, 3);

-- ----------------------------
-- Table structure for users_revoked_authorities
-- ----------------------------
DROP TABLE IF EXISTS `users_revoked_authorities`;
CREATE TABLE `users_revoked_authorities`  (
  `user_id` bigint(20) NOT NULL,
  `authority_id` bigint(20) NOT NULL,
  UNIQUE INDEX `UKs7exmvaq7g0wkn7v03hhgml4f`(`user_id`, `authority_id`) USING BTREE,
  INDEX `FKioy0ro0acmsp9q9txsvmhj78k`(`authority_id`) USING BTREE,
  CONSTRAINT `FKhi3tspvv1wbialkubwwgcw1md` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `FKioy0ro0acmsp9q9txsvmhj78k` FOREIGN KEY (`authority_id`) REFERENCES `authority` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of users_revoked_authorities
-- ----------------------------
SET FOREIGN_KEY_CHECKS = 1;
