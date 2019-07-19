
SET FOREIGN_KEY_CHECKS = 0;

DROP TABLE IF EXISTS `authority`;
CREATE TABLE `authority`  (
  `id` bigint(20) NOT NULL,
  `name` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
);



INSERT INTO `authority` VALUES (1, 'comment');

DROP TABLE IF EXISTS `role`;
CREATE TABLE `role`  (
  `id` bigint(20) NOT NULL,
  `name` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
);


INSERT INTO `role` VALUES (1, 'ROLE_ADMIN');
INSERT INTO `role` VALUES (2, 'ROLE_EDITOR');
INSERT INTO `role` VALUES (3, 'ROLE_USER');


DROP TABLE IF EXISTS `user`;
CREATE TABLE `user`  (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `enabled` bit(1) NULL DEFAULT NULL,
  `img_url` varchar(255)  DEFAULT NULL,
  `mail` varchar(255)  DEFAULT NULL,
  `password` varchar(255)  NOT NULL,
  `username` varchar(255)  NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `UK_sb8bbouer5wak8vyiiy4pf2bx`(`username`)
) ;


INSERT INTO `user` VALUES (1, TRUE, NULL, NULL, '$2a$10$nPV9AOEqUi2Yc.t8NG09B.Ps3/aSIlR2SN5AtEBuAy3rsiwXpynaa', 'admin');
INSERT INTO `user` VALUES (2, TRUE, NULL, NULL, '$2a$10$BurYABJA4fnIRccPMSgeX.LyPY8TTXJnK.I7OZQZbhSkMGgwS8jDi', 'editor');
INSERT INTO `user` VALUES (3, TRUE, NULL, NULL, '$2a$10$amAhhuQuxDOPvpl/A6zRe.QcfZG8tniK2EalQducjIJeXXvnF25F2', 'user');


DROP TABLE IF EXISTS `roles_authorities`;
CREATE TABLE `roles_authorities`  (
  `role_id` bigint(20) NOT NULL,
  `authority_id` bigint(20) NOT NULL,
  PRIMARY KEY (`role_id`, `authority_id`) ,
  FOREIGN KEY (`role_id`) REFERENCES `role` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  FOREIGN KEY (`authority_id`) REFERENCES `authority` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ;

INSERT INTO `roles_authorities` VALUES (1, 1);
INSERT INTO `roles_authorities` VALUES (2, 1);
INSERT INTO `roles_authorities` VALUES (3, 1);

DROP TABLE IF EXISTS `users_roles`;
CREATE TABLE `users_roles`  (
  `user_id` bigint(20) NOT NULL,
  `role_id` bigint(20) NOT NULL,
  FOREIGN KEY (`user_id`) REFERENCES `user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  FOREIGN KEY (`role_id`) REFERENCES `role` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ;


INSERT INTO `users_roles` VALUES (1, 1);
INSERT INTO `users_roles` VALUES (1, 2);
INSERT INTO `users_roles` VALUES (1, 3);
INSERT INTO `users_roles` VALUES (2, 2);
INSERT INTO `users_roles` VALUES (2, 3);
INSERT INTO `users_roles` VALUES (3, 3);

DROP TABLE IF EXISTS `users_revoked_authorities`;
CREATE TABLE `users_revoked_authorities`  (
  `user_id` bigint(20) NOT NULL,
  `authority_id` bigint(20) NOT NULL,
  PRIMARY KEY (`user_id`, `authority_id`) ,
  FOREIGN KEY (`user_id`) REFERENCES `user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  FOREIGN KEY (`authority_id`) REFERENCES `authority` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ;


SET FOREIGN_KEY_CHECKS = 1;
