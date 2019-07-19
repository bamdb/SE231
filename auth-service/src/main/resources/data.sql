SET FOREIGN_KEY_CHECKS = 0;
INSERT INTO `role` VALUES (1, 'ROLE_ADMIN');
INSERT INTO `role` VALUES (2, 'ROLE_EDITOR');
INSERT INTO `role` VALUES (3, 'ROLE_USER');

INSERT INTO `user` VALUES (1, TRUE, NULL, NULL, '$2a$10$nPV9AOEqUi2Yc.t8NG09B.Ps3/aSIlR2SN5AtEBuAy3rsiwXpynaa', 'admin');
INSERT INTO `user` VALUES (2, TRUE, NULL, NULL, '$2a$10$BurYABJA4fnIRccPMSgeX.LyPY8TTXJnK.I7OZQZbhSkMGgwS8jDi', 'editor');
INSERT INTO `user` VALUES (3, TRUE, NULL, NULL, '$2a$10$amAhhuQuxDOPvpl/A6zRe.QcfZG8tniK2EalQducjIJeXXvnF25F2', 'user');

INSERT INTO `roles_authorities` VALUES (1, 1);
INSERT INTO `roles_authorities` VALUES (2, 1);
INSERT INTO `roles_authorities` VALUES (3, 1);

INSERT INTO `users_roles` VALUES (1, 1);
INSERT INTO `users_roles` VALUES (1, 2);
INSERT INTO `users_roles` VALUES (1, 3);
INSERT INTO `users_roles` VALUES (2, 2);
INSERT INTO `users_roles` VALUES (2, 3);
INSERT INTO `users_roles` VALUES (3, 3);

SET FOREIGN_KEY_CHECKS = 1;
