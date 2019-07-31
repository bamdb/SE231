package com.se.authservice.service.impl;

import com.se.authservice.dao.*;
import com.se.authservice.entity.Authority;
import com.se.authservice.entity.Role;
import com.se.authservice.entity.User;
import com.se.authservice.entity.Qrcode;
import com.se.authservice.helper.QRCodeUtil;
import com.se.authservice.repository.ImageRepository;
import com.se.authservice.service.UserService;
import org.bson.types.Binary;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import javax.annotation.Resource;
import javax.imageio.ImageIO;
import javax.mail.*;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeBodyPart;
import javax.mail.internet.MimeMessage;
import javax.mail.internet.MimeMultipart;
import java.awt.image.BufferedImage;
import java.io.ByteArrayOutputStream;
import java.util.Collection;
import java.util.Optional;
import java.util.Properties;
import java.util.UUID;

@Service
public class UserServiceImpl implements UserService {
    private static final BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();

    @Resource(name="authorityReadDaoImpl")
    private AuthorityReadDao authorityReadDao;

    @Resource(name="roleReadDaoImpl")
    private RoleReadDao roleReadDao;
    
    @Resource(name="userReadDaoImpl")
    private UserReadDao userReadDao;

    @Resource(name="userWriteDaoImpl")
    private UserWriteDao userWriteDao;

    @Resource(name="redisDaoImpl")
    private RedisDao redisDao;

    @Autowired
    private RestTemplate restTemplate;

    private final ImageRepository imageRepository;

    @Autowired
    public UserServiceImpl(ImageRepository imageRepository) {
        this.imageRepository = imageRepository;
    }

    @Override
    public User create(int hashCode){
        String value = redisDao.get(hashCode);
        if (value == null) {
            throw new IllegalArgumentException("hash code expired");
        }
        String[] values = value.split(",");
        String username = values[0];
        String password = values[1];
        String mail = values[2];

        Optional<User> existing = userReadDao.findByUsername(username);
        existing.ifPresent(it-> {throw new IllegalArgumentException("userDetail already exists: " + it.getUsername());});

        User userDetail = new User();
        userDetail.setPassword(password);
        userDetail.setUsername(username);
        userDetail.setMail(mail);
        return userWriteDao.save(userDetail);
    }


    public User changeRole(String username, String roleName, String c) {
        User user = userReadDao.findByUsername(username).orElseThrow(()->new UsernameNotFoundException(username));
        Collection<Role> roles = user.getRoles();
        if ("+".equals(c))
            roleReadDao.findByName(roleName).ifPresent(
                    role -> {if (!roles.contains(role)) roles.add(role);});
        if ("-".equals(c))
            roleReadDao.findByName(roleName).ifPresent(
                    roles::remove);
        user.setRoles(roles);
        return userWriteDao.save(user);
    }



    public User changeRevokeAuthority(String username, String revokeAuthorityName, String c) {
        User user = userReadDao.findByUsername(username).orElseThrow(()->new UsernameNotFoundException(username));
        Collection<Authority> revokeAuthorities = user.getRevokeAuthorities();
        if ("+".equals(c)) authorityReadDao.findByName(revokeAuthorityName).ifPresent(
                authority -> {if (!revokeAuthorities.contains(authority)) revokeAuthorities.add(authority);});
        else if ("-".equals(c)) authorityReadDao.findByName(revokeAuthorityName).ifPresent(
                revokeAuthorities::remove);
        user.setRevokeAuthorities(revokeAuthorities);
        return user;
    }

    public User disableUser(String username) {
        User user = userReadDao.findByUsername(username).orElseThrow(()->new UsernameNotFoundException(username));
        user.setEnabled(false);
        return user;
    }

    public User selectByUsername(String username) {
        return userReadDao.findByUsername(username).orElse(null);
    }

    public Iterable<User> selectAll() {
        return userReadDao.findAll();
    }

    public User updateUser(User user) {
        BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();
        User u = userReadDao.findByUsername(user.getUsername()).orElse(userReadDao.findById(user.getId()).orElse(null));
        if (u == null) return null;
        if (!user.getPassword().equals("")) u.setPassword(encoder.encode( user.getPassword() ));
        if (!user.getUsername().equals("")) u.setUsername(user.getUsername());
        if (!user.getImgUrl().equals("")) u.setImgUrl(user.getImgUrl());
        if (!user.getMail().equals("")) u.setMail(user.getMail());
        return userWriteDao.save(u);
    }

    public void deleteUserByUsername(String username) {
        userWriteDao.deleteByUsername(username);
    }

    public void deleteUserById(Long id) {
        userWriteDao.deleteById(id);
    }
    public User selectUserById(Long id) {
        return userReadDao.findById(id).orElse(null);
    }

    public User truncate(User user) {
        if (user == null) return null;
        user.setPassword(null);
        user.setEnabled(null);
        user.setRevokeAuthorities(null);
        user.setRoles(null);
        return user;
    }

    public int verification(User user) throws Exception {
        String username = user.getUsername();
        Optional<User> existing = userReadDao.findByUsername(username);
        existing.ifPresent(it-> {throw new IllegalArgumentException("userDetail already exists: " + it.getUsername());});

        Long currentTime = System.currentTimeMillis();
        int hashCode = (username + currentTime.toString()).hashCode();
        BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();
        user.setPassword(encoder.encode(user.getPassword()));
        String detailValue = username + "," + user.getPassword() + "," + user.getMail();

        redisDao.set(hashCode, detailValue);

        Properties props = new Properties();
        props.setProperty("mail.debug", "true");
        props.setProperty("mail.smtp.auth", "true");
        props.setProperty("mail.host", "smtp.office365.com");
        props.setProperty("mail.transport.protocol", "smtp");
        props.setProperty("mail.smtp.port", "587");
        props.put("mail.smtp.starttls.enable", "true");

        Session session = Session.getInstance(props);
        MimeMessage msg = new MimeMessage(session);

        msg.setFrom(new InternetAddress("bamdb@outlook.com"));

        msg.addRecipient(Message.RecipientType.TO, new InternetAddress(user.getMail()));

        msg.setSubject("欢迎注册Bamdb");

        Multipart multipart = new MimeMultipart();

        String url = "http://202.120.40.8:30741/auth/signup?hashCode="+hashCode;
        MimeBodyPart htmlPart = new MimeBodyPart();
        htmlPart.setContent("<h3>请点击以下链接，激活您的账号</h3><a href="+url+"><h3>点此激活</h3></a>", "text/html; charset=utf-8");
        multipart.addBodyPart(htmlPart);

        msg.setContent(multipart);

        Transport transport = session.getTransport();
        transport.connect("bamdb@outlook.com", "ABM@ndy4sVJ8W2J");
        transport.sendMessage(msg, new Address[]{new InternetAddress(user.getMail())});
        transport.close();

        return hashCode;
    }

    public String qrencode() throws Exception {
        String uuid = UUID.randomUUID().toString();
        String imgPath = "http://lain.bgm.tv/pic/user/m/icon.jpg";
        BufferedImage image = QRCodeUtil.createImage(uuid, imgPath);
        ByteArrayOutputStream baos = new ByteArrayOutputStream();
        ImageIO.write(image, "jpg", baos);
        Qrcode qrcode1 = new Qrcode(uuid, new Binary(baos.toByteArray()));
        imageRepository.save(qrcode1);
        return uuid;
    }

    public byte[] getQrcode(String uuid) {
        Qrcode qrcode = imageRepository.findByImageId(uuid).orElse(null);
        if (qrcode != null) {
            return qrcode.getImage().getData();
        }
        return null;
    }

    public void saveToken(String uuid, String accessToken) {
        // notify qrcode login page
        restTemplate.getForObject("http://47.103.107.39:8080/qrcode?token={1}&uuid={2}", void.class,
                accessToken, uuid);
    }

}