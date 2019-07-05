/*==============================================================*/
/* DBMS name:      MySQL 5.0                                    */
/* Created on:     2019/7/3 15:23:45                            */
/*==============================================================*/


drop table if exists Activity;

drop table if exists Admin;

drop table if exists Collect;

drop table if exists Edit;

drop table if exists Editor;

drop table if exists Friend;

drop table if exists Related;

drop table if exists Score;

drop table if exists Item;

drop table if exists Normal;

drop table if exists Topic;

drop table if exists User;

/*==============================================================*/
/* Table: Activity                                              */
/*==============================================================*/
create table Activity
(
   user_id              bigint not null,
   item_id              bigint not null,
   act_time             timestamp not null,
   act_type             int not null,
   primary key (user_id, item_id, act_time)
);

/*==============================================================*/
/* Table: Admin                                                 */
/*==============================================================*/
create table Admin
(
   id                   bigint not null,
   username             varchar(20) not null,
   password             varchar(20) not null,
   mail                 varchar(20) not null,
   imgurl               varchar(50),
   role                 int not null,
   primary key (id)
);

/*==============================================================*/
/* Table: Collect                                               */
/*==============================================================*/
create table Collect
(
   user_id              bigint not null,
   item_id              bigint not null,
   grade                int,
   collect_time         timestamp not null,
   status               int not null,
   primary key (user_id, item_id)
);

/*==============================================================*/
/* Table: Edit                                                  */
/*==============================================================*/
create table Edit
(
   Edi_id               bigint not null,
   Ite_id               bigint not null,
   edit_time            timestamp not null,
   edit_type            int not null,
   primary key (Edi_id, Ite_id)
);

/*==============================================================*/
/* Table: Editor                                                */
/*==============================================================*/
create table Editor
(
   id                   bigint not null,
   username             varchar(20) not null,
   password             varchar(20) not null,
   mail                 varchar(20) not null,
   imgurl               varchar(50),
   author_time          timestamp,
   edit_num             int,
   role                 int not null,
   primary key (id)
);

/*==============================================================*/
/* Table: Friend                                                */
/*==============================================================*/
create table Friend
(
   user_id0             bigint not null,
   user_id1             bigint not null,
   add_time             timestamp not null,
   primary key (user_id0, user_id1)
);

/*==============================================================*/
/* Table: Item                                                  */
/*==============================================================*/
create table Item
(
   id                   bigint not null,
   itemname             varchar(20) not null,
   `type`               int not null,
   pub_time             timestamp,
   chapter_num          int not null,
   main_author          varchar(20),
   imgurl               varchar(20),
   primary key (id)
);

/*==============================================================*/
/* Table: Normal                                                */
/*==============================================================*/
create table Normal
(
   id                   bigint not null,
   username             varchar(20) not null,
   password             varchar(20) not null,
   mail                 varchar(20) not null,
   imgurl               varchar(50),
   role                 int not null,
   primary key (id)
);

/*==============================================================*/
/* Table: Related                                               */
/*==============================================================*/
create table Related
(
   prior_id             bigint not null,
   subseq_id            bigint not null,
   relate_type          int not null,
   primary key (prior_id, subseq_id)
);

/*==============================================================*/
/* Table: Score                                                 */
/*==============================================================*/
create table Score
(
   item_id              bigint not null,
   avg_grade            float,
   `rank`               int,
   primary key (item_id)
);

/*==============================================================*/
/* Table: Topic                                                 */
/*==============================================================*/
create table Topic
(
   id                   bigint not null,
   user_id              bigint not null,
   title                varchar(20) not null,
   pub_time             timestamp,
   primary key (id)
);

/*==============================================================*/
/* Table: User                                                  */
/*==============================================================*/
create table User
(
   id                   bigint not null,
   username             varchar(20) not null,
   password             varchar(20) not null,
   mail                 varchar(20) not null,
   imgurl               varchar(50),
   role                 int not null,
   primary key (id)
);

alter table Activity add constraint FK_Act foreign key (user_id)
      references User (id) on delete restrict on update restrict;

alter table Activity add constraint FK_Acted foreign key (item_id)
      references Item (id) on delete restrict on update restrict;

alter table Admin add constraint FK_Inheritance_2 foreign key (id)
      references User (id) on delete restrict on update restrict;

alter table Collect add constraint FK_Collect foreign key (user_id)
      references User (id) on delete restrict on update restrict;

alter table Collect add constraint FK_Collect2 foreign key (item_id)
      references Item (id) on delete restrict on update restrict;

alter table Edit add constraint FK_Edit foreign key (Edi_id)
      references Editor (id) on delete restrict on update restrict;

alter table Edit add constraint FK_Edit2 foreign key (Ite_id)
      references Item (id) on delete restrict on update restrict;

alter table Editor add constraint FK_Inheritance_3 foreign key (id)
      references User (id) on delete restrict on update restrict;

alter table Friend add constraint FK_Friend foreign key (user_id0)
      references User (id) on delete restrict on update restrict;

alter table Friend add constraint FK_Friend2 foreign key (user_id1)
      references User (id) on delete restrict on update restrict;

alter table Normal add constraint FK_Inheritance_1 foreign key (id)
      references User (id) on delete restrict on update restrict;

alter table Related add constraint FK_Related foreign key (prior_id)
      references Item (id) on delete restrict on update restrict;

alter table Related add constraint FK_Related2 foreign key (subseq_id)
      references Item (id) on delete restrict on update restrict;

alter table Score add constraint FK_Reference_15 foreign key (item_id)
      references Item (id) on delete restrict on update restrict;

alter table Topic add constraint FK_Publish foreign key (user_id)
      references User (id) on delete restrict on update restrict;

