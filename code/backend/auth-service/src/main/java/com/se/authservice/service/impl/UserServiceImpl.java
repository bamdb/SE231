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
        htmlPart.setContent(generateContent(url), "text/html; charset=utf-8");
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
        String imgPath = "https://raw.githubusercontent.com/bamdb/SE231/master/code/frontend/public/bamdb.jpg";
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
        restTemplate.getForObject("http://47.103.123.5:8080/qrcode?token={1}&uuid={2}", void.class,
                accessToken, uuid);
    }


    private String generateContent(String url) {
        return "<div>\n" +
                "\t<style type=\"text/css\">\n" +
                "\t\t.rps_fd0d body {\n" +
                "\t\t\tmargin: 0 auto;\n" +
                "\t\t\tpadding: 0;\n" +
                "\t\t\tfont-family: Microsoft Yahei, Tahoma, Arial;\n" +
                "\t\t\tcolor: #333333;\n" +
                "\t\t\tbackground-color: #fff;\n" +
                "\t\t\tfont-size: 12px\n" +
                "\t\t}\n" +
                "\n" +
                "\t\t.rps_fd0d a {\n" +
                "\t\t\tcolor: #00a2ca;\n" +
                "\t\t\tline-height: 22px;\n" +
                "\t\t\ttext-decoration: none\n" +
                "\t\t}\n" +
                "\n" +
                "\t\t.rps_fd0d a:hover {\n" +
                "\t\t\ttext-decoration: underline;\n" +
                "\t\t\tcolor: #00a2ca\n" +
                "\t\t}\n" +
                "\n" +
                "\t\t.rps_fd0d td {\n" +
                "\t\t\tfont-family: 'Microsoft YaHei'\n" +
                "\t\t}\n" +
                "\t</style>\n" +
                "\t<div class=\"rps_fd0d\">\n" +
                "\t\t<div leftmargin=\"0\" topmargin=\"0\" marginwidth=\"0\" marginheight=\"0\"\n" +
                "\t\t\tstyle=\"background-color: rgb(255, 255, 255); font-family: &quot;Microsoft YaHei&quot;, serif, EmojiFont;\">\n" +
                "\t\t\t<div class=\"_2Ypz6DjF0cnPXsnj_7roel\" style=\"height: 297px;\">\n" +
                "\t\t\t\t<table width=\"800\" border=\"0\" align=\"center\" cellpadding=\"0\" cellspacing=\"0\" bgcolor=\"#ffffff\"\n" +
                "\t\t\t\t\tstyle=\"font-family: &quot;Microsoft YaHei&quot;; transform: scale(0.48375, 0.48375); transform-origin: left top;\"\n" +
                "\t\t\t\t\tmin-scale=\"0.48375\">\n" +
                "\t\t\t\t\t<tbody>\n" +
                "\t\t\t\t\t\t<tr>\n" +
                "\t\t\t\t\t\t\t<td>\n" +
                "\t\t\t\t\t\t\t\t<table width=\"800\" border=\"0\" align=\"center\" cellpadding=\"0\" cellspacing=\"0\"\n" +
                "\t\t\t\t\t\t\t\t\theight=\"40\">\n" +
                "\t\t\t\t\t\t\t\t</table>\n" +
                "\t\t\t\t\t\t\t</td>\n" +
                "\t\t\t\t\t\t</tr>\n" +
                "\t\t\t\t\t\t<tr>\n" +
                "\t\t\t\t\t\t\t<td>\n" +
                "\t\t\t\t\t\t\t\t<table width=\"800\" border=\"0\" align=\"center\" cellpadding=\"0\" cellspacing=\"0\"\n" +
                "\t\t\t\t\t\t\t\t\tbgcolor=\"#000000\" height=\"48\" style=\"font-family:'Microsoft YaHei'\">\n" +
                "\t\t\t\t\t\t\t\t\t<tbody>\n" +
                "\t\t\t\t\t\t\t\t\t\t<tr>\n" +
                "\t\t\t\t\t\t\t\t\t\t\t<td height=\"48\" border=\"0\" align=\"center\" valign=\"middle\"\n" +
                "\t\t\t\t\t\t\t\t\t\t\t\tstyle=\"padding-left:20px\">\n" +
                "\t\t\t\t\t\t\t\t\t\t\t\t<img\n" +
                "\t\t\t\t\t\t\t\t\t\t\t\t\t\tdata-imagetype=\"External\"\n" +
                "\t\t\t\t\t\t\t\t\t\t\t\t\t\tsrc=\"https://raw.githubusercontent.com/bamdb/SE231/master/code/frontend/public/bamdb_app.jpg\"\n" +
                "\t\t\t\t\t\t\t\t\t\t\t\t\t\talt=\"Bamdb\" width=\"80\" height=\"48\" border=\"0\">\n" +
                "\t\t\t\t\t\t\t\t\t\t\t</td>\n" +
                "\t\t\t\t\t\t\t\t\t\t\t<td width=\"703\" height=\"48\" colspan=\"2\" align=\"right\" valign=\"middle\"\n" +
                "\t\t\t\t\t\t\t\t\t\t\t\tstyle=\"color:#ffffff; padding-right:20px\">\n" +
                "\t\t\t\t\t\t\t\t\t\t\t\t<a href=\"http://www.bamdb.cn\"\n" +
                "\t\t\t\t\t\t\t\t\t\t\t\t\ttarget=\"_blank\" rel=\"noopener noreferrer\" data-auth=\"Verified\"\n" +
                "\t\t\t\t\t\t\t\t\t\t\t\t\toriginalsrc=\"http://www.aliyun.com/?&amp;msctype=email&amp;mscareaid=cn&amp;mscsiteid=cn&amp;mscmsgid=8220119080801337185&amp;&amp;spm=a2c4k.12684508.zh-cnt.3&amp;\"\n" +
                "\t\t\t\t\t\t\t\t\t\t\t\t\tshash=\"WQh3kqi+ws6lVSdJnL0zhuOM2Zi01rQTFxdn4mWxdkNN09G6JJjm6ThhKXmgrmDSmT/ZTLY4IA99jKpR+cbDIR1U49CsubPWLLI45bTX/fZGDlaEHKGy5ALwYRXoFJBQ3GZpTERwIyFGOmsIEjpbKUsdfAaP8Eb7H9piA8vZ8Zg=\"\n" +
                "\t\t\t\t\t\t\t\t\t\t\t\t\tstyle=\"color:#ffffff; text-decoration:none; font-family:'Microsoft YaHei'\"\n" +
                "\t\t\t\t\t\t\t\t\t\t\t\t\t>首页</a>\n" +
                "\t\t\t\t\t\t\t\t\t\t\t\t&nbsp;&nbsp;&nbsp;<span style=\"color:#6c7479\">|</span>&nbsp;&nbsp; <a\n" +
                "\t\t\t\t\t\t\t\t\t\t\t\t\thref=\"http://www.bamdb.cn/#/itembrowse/book\"\n" +
                "\t\t\t\t\t\t\t\t\t\t\t\t\ttarget=\"_blank\" rel=\"noopener noreferrer\" data-auth=\"Verified\"\n" +
                "\t\t\t\t\t\t\t\t\t\t\t\t\toriginalsrc=\"http://www.aliyun.com/product/ecs/?&amp;msctype=email&amp;mscareaid=cn&amp;mscsiteid=cn&amp;mscmsgid=8220119080801337185&amp;&amp;spm=a2c4k.12684508.zh-cnt.4&amp;\"\n" +
                "\t\t\t\t\t\t\t\t\t\t\t\t\tshash=\"kQ2q2uKsjPnYc87+e14dUYY1uHSmLhHgo24eAY/z+RXrfU/YfKVTaIWr5MJjG8zuhrZUXE1v+eNtyPQR/iLyqqGpD4kYVT61j9gZNtppZ8TeBDqKHPTBmxz0dvKha+E7uHA4eXoulWgBW425eD4NIi844lz1VkzmTMWppA2wJ+4=\"\n" +
                "\t\t\t\t\t\t\t\t\t\t\t\t\tstyle=\"color:#ffffff; text-decoration:none; font-family:'Microsoft YaHei'\"\n" +
                "\t\t\t\t\t\t\t\t\t\t\t\t\t>\n" +
                "\t\t\t\t\t\t\t\t\t\t\t\t\t发现书籍</a> &nbsp;&nbsp;&nbsp;<span\n" +
                "\t\t\t\t\t\t\t\t\t\t\t\t\tstyle=\"color:#6c7479\">|</span>&nbsp;&nbsp; <a\n" +
                "\t\t\t\t\t\t\t\t\t\t\t\t\thref=\"http://www.bamdb.cn/#/itembrowse/movie\"\n" +
                "\t\t\t\t\t\t\t\t\t\t\t\t\ttarget=\"_blank\" rel=\"noopener noreferrer\" data-auth=\"Verified\"\n" +
                "\t\t\t\t\t\t\t\t\t\t\t\t\toriginalsrc=\"http://www.aliyun.com/act/webbaindex.html?&amp;msctype=email&amp;mscareaid=cn&amp;mscsiteid=cn&amp;mscmsgid=8220119080801337185&amp;&amp;spm=a2c4k.12684508.zh-cnt.5&amp;\"\n" +
                "\t\t\t\t\t\t\t\t\t\t\t\t\tshash=\"SfU8QEq9v4kZFqqJddm2vaZM0iKvEiTARGMPNPVkxUMaqH4NEumFPyic1Xg0JaPVbwTNuxe7GKILRCUu/95sD6/q+Bm7z5PrTNuMPj8uVcjbNM7uYUp1PqJeBNgQUW6NNDcu9f0LagGWYF4bv3nmaOSSqyzVdfvN/gUJYGlueZI=\"\n" +
                "\t\t\t\t\t\t\t\t\t\t\t\t\tstyle=\"color:#ffffff; text-decoration:none; font-family:'Microsoft YaHei'\"\n" +
                "\t\t\t\t\t\t\t\t\t\t\t\t\t>\n" +
                "\t\t\t\t\t\t\t\t\t\t\t\t\t精选电影</a> &nbsp;&nbsp;&nbsp;<span\n" +
                "\t\t\t\t\t\t\t\t\t\t\t\t\tstyle=\"color:#6c7479\">|</span>&nbsp;&nbsp; <a\n" +
                "\t\t\t\t\t\t\t\t\t\t\t\t\thref=\"http://www.bamdb.cn/#/itembrowse/flash\"\n" +
                "\t\t\t\t\t\t\t\t\t\t\t\t\ttarget=\"_blank\" rel=\"noopener noreferrer\" data-auth=\"Verified\"\n" +
                "\t\t\t\t\t\t\t\t\t\t\t\t\toriginalsrc=\"http://home.console.aliyun.com/?&amp;msctype=email&amp;mscareaid=cn&amp;mscsiteid=cn&amp;mscmsgid=8220119080801337185&amp;&amp;spm=a2c4k.12684508.zh-cnt.6&amp;\"\n" +
                "\t\t\t\t\t\t\t\t\t\t\t\t\tshash=\"zVzjpR4GDIvSZGNb+q8NT5+oBuKWi7uV3p7/G6UxLVxmR5croU8NGrMRn6h/IvuulNPYt3Y63hZ+0VJjDmvX9KHL85Ah1ZB+Mwfh9EYed84y5d0IPBBNMvSq4Tt27JR4vsXVHlIr1K7W7wNULf/p66DWz9NkAY5kmWagNvrH8hY=\"\n" +
                "\t\t\t\t\t\t\t\t\t\t\t\t\tstyle=\"color:#ffffff; text-decoration:none; font-family:'Microsoft YaHei'\"\n" +
                "\t\t\t\t\t\t\t\t\t\t\t\t\t>\n" +
                "\t\t\t\t\t\t\t\t\t\t\t\t\t更多动漫</a> &nbsp;&nbsp;&nbsp;<span\n" +
                "\t\t\t\t\t\t\t\t\t\t\t\t\tstyle=\"color:#6c7479\">|</span>&nbsp;&nbsp; <a\n" +
                "\t\t\t\t\t\t\t\t\t\t\t\t\thref=\"http://www.bamdb.cn/#/login\"\n" +
                "\t\t\t\t\t\t\t\t\t\t\t\t\ttarget=\"_blank\" rel=\"noopener noreferrer\" data-auth=\"Verified\"\n" +
                "\t\t\t\t\t\t\t\t\t\t\t\t\toriginalsrc=\"http://i.aliyun.com/?&amp;msctype=email&amp;mscareaid=cn&amp;mscsiteid=cn&amp;mscmsgid=8220119080801337185&amp;spm=5176.383338.201.51.1UNnoL\"\n" +
                "\t\t\t\t\t\t\t\t\t\t\t\t\tshash=\"sNuJArz95TfHUbu0OM2OBl7JRaeHGu0azHbxw0HgkI5yhSiVrPPItgvn+QlBJ9t87hLGtHs1cO72asFQjnIGcXC0q35QG6WZBzbV+PKRKJlzVsPl19yWkP6LNed9gF+N6NImf+IYMv/3sCHmm0iLa8zf1i3KkRBqFRx7GorqWIQ=\"\n" +
                "\t\t\t\t\t\t\t\t\t\t\t\t\tstyle=\"color:#ffffff; text-decoration:none\"\n" +
                "\t\t\t\t\t\t\t\t\t\t\t\t\t>\n" +
                "\t\t\t\t\t\t\t\t\t\t\t\t\t登录</a>\n" +
                "\t\t\t\t\t\t\t\t\t\t\t</td>\n" +
                "\t\t\t\t\t\t\t\t\t\t</tr>\n" +
                "\t\t\t\t\t\t\t\t\t</tbody>\n" +
                "\t\t\t\t\t\t\t\t</table>\n" +
                "\t\t\t\t\t\t\t</td>\n" +
                "\t\t\t\t\t\t</tr>\n" +
                "\t\t\t\t\t\t<tr>\n" +
                "\t\t\t\t\t\t\t<td>\n" +
                "\t\t\t\t\t\t\t\t<table width=\"800\" border=\"0\" align=\"left\" cellpadding=\"0\" cellspacing=\"0\"\n" +
                "\t\t\t\t\t\t\t\t\tstyle=\"border:1px solid #edecec; border-top:none; border-bottom:none; padding:0 20px; font-size:14px; color:#333333\">\n" +
                "\t\t\t\t\t\t\t\t\t<tbody>\n" +
                "\t\t\t\t\t\t\t\t\t\t<tr>\n" +
                "\t\t\t\t\t\t\t\t\t\t\t<td width=\"760\" height=\"56\" border=\"0\" align=\"left\" colspan=\"2\"\n" +
                "\t\t\t\t\t\t\t\t\t\t\t\tstyle=\"font-size:16px; vertical-align:bottom; font-family:'Microsoft YaHei'\">\n" +
                "\t\t\t\t\t\t\t\t\t\t\t\t尊敬的用户：</td>\n" +
                "\t\t\t\t\t\t\t\t\t\t</tr>\n" +
                "\t\t\t\t\t\t\t\t\t\t<tr>\n" +
                "\t\t\t\t\t\t\t\t\t\t\t<td width=\"760\" height=\"30\" border=\"0\" align=\"left\" colspan=\"2\">&nbsp;</td>\n" +
                "\t\t\t\t\t\t\t\t\t\t</tr>\n" +
                "\t\t\t\t\t\t\t\t\t\t<tr>\n" +
                "\t\t\t\t\t\t\t\t\t\t\t<td width=\"40\" height=\"32\" border=\"0\" align=\"left\" valign=\"middle\"\n" +
                "\t\t\t\t\t\t\t\t\t\t\t\tstyle=\"width:40px; text-align:left; vertical-align:middle; line-height:32px; float:left\">\n" +
                "\t\t\t\t\t\t\t\t\t\t\t</td>\n" +
                "\t\t\t\t\t\t\t\t\t\t\t<td width=\"720\" height=\"32\" border=\"0\" align=\"left\" valign=\"middle\"\n" +
                "\t\t\t\t\t\t\t\t\t\t\t\tstyle=\"width:720px; text-align:left; vertical-align:middle; line-height:32px; font-family:'Microsoft YaHei'\">\n" +
                "\t\t\t\t\t\t\t\t\t\t\t\t欢迎注册Bamdb，点击下面的激活链接，即可激活您的账号。\n" +
                "\t\t\t\t\t\t\t\t\t\t\t</td>\n" +
                "\t\t\t\t\t\t\t\t\t\t</tr>\n" +
                "\t\t\t\t\t\t\t\t\t\t<tr>\n" +
                "\t\t\t\t\t\t\t\t\t\t\t<td width=\"720\" height=\"32\" colspan=\"2\"\n" +
                "\t\t\t\t\t\t\t\t\t\t\t\tstyle=\"padding-left:40px; font-family:'Microsoft YaHei'\">\n" +
                "\t\t\t\t\t\t\t\t\t\t\t\t<a href=\""+url+"\">点此激活</a>\n" +
                "\t\t\t\t\t\t\t\t\t\t\t</td>\n" +
                "\t\t\t\t\t\t\t\t\t\t</tr>\n" +
                "\t\t\t\t\t\t\t\t\t\t<tr>\n" +
                "\t\t\t\t\t\t\t\t\t\t\t<td width=\"720\" height=\"32\" colspan=\"2\" style=\"padding-left:40px\">&nbsp;\n" +
                "\t\t\t\t\t\t\t\t\t\t\t</td>\n" +
                "\t\t\t\t\t\t\t\t\t\t</tr>\n" +
                "\t\t\t\t\t\t\t\t\t\t<tr>\n" +
                "\t\t\t\t\t\t\t\t\t\t\t<td width=\"720\" height=\"32\" colspan=\"2\" style=\"padding-left:40px\">&nbsp;\n" +
                "\t\t\t\t\t\t\t\t\t\t\t</td>\n" +
                "\t\t\t\t\t\t\t\t\t\t</tr>\n" +
                "\t\t\t\t\t\t\t\t\t\t<tr>\n" +
                "\t\t\t\t\t\t\t\t\t\t\t<td width=\"720\" height=\"32\" colspan=\"2\" style=\"padding-left:40px\">&nbsp;\n" +
                "\t\t\t\t\t\t\t\t\t\t\t</td>\n" +
                "\t\t\t\t\t\t\t\t\t\t</tr>\n" +
                "\t\t\t\t\t\t\t\t\t\t<tr>\n" +
                "\t\t\t\t\t\t\t\t\t\t\t<td width=\"720\" height=\"14\" colspan=\"2\"\n" +
                "\t\t\t\t\t\t\t\t\t\t\t\tstyle=\"padding-bottom:16px; border-bottom:1px dashed #e5e5e5; font-family:'Microsoft YaHei'\">\n" +
                "\t\t\t\t\t\t\t\t\t\t\t\tBamdb Project</td>\n" +
                "\t\t\t\t\t\t\t\t\t\t</tr>\n" +
                "\t\t\t\t\t\t\t\t\t\t<tr>\n" +
                "\t\t\t\t\t\t\t\t\t\t\t<td width=\"720\" height=\"14\" colspan=\"2\"\n" +
                "\t\t\t\t\t\t\t\t\t\t\t\tstyle=\"padding:8px 0 28px; color:#999999; font-size:12px; font-family:'Microsoft YaHei'\">\n" +
                "\t\t\t\t\t\t\t\t\t\t\t\t此为系统邮件请勿回复</td>\n" +
                "\t\t\t\t\t\t\t\t\t\t</tr>\n" +
                "\t\t\t\t\t\t\t\t\t</tbody>\n" +
                "\t\t\t\t\t\t\t\t</table>\n" +
                "\t\t\t\t\t\t\t</td>\n" +
                "\t\t\t\t\t\t</tr>\n" +
                "\t\t\t\t\t\t<!-- <tr>\n" +
                "\t\t\t\t\t\t\t<td>\n" +
                "\t\t\t\t\t\t\t\t<table width=\"800\" height=\"100\" border=\"0\" align=\"center\" cellpadding=\"0\"\n" +
                "\t\t\t\t\t\t\t\t\tcellspacing=\"0\">\n" +
                "\t\t\t\t\t\t\t\t\t<tbody>\n" +
                "\t\t\t\t\t\t\t\t\t\t<tr>\n" +
                "\t\t\t\t\t\t\t\t\t\t\t<td width=\"800\" height=\"100\" align=\"center\" valign=\"middle\">\n" +
                "\t\t\t\t\t\t\t\t\t\t\t</td>\n" +
                "\t\t\t\t\t\t\t\t\t\t</tr>\n" +
                "\t\t\t\t\t\t\t\t\t</tbody>\n" +
                "\t\t\t\t\t\t\t\t</table>\n" +
                "\t\t\t\t\t\t\t</td>\n" +
                "\t\t\t\t\t\t</tr> -->\n" +
                "\t\t\t\t\t\t<tr>\n" +
                "\t\t\t\t\t\t\t<td>\n" +
                "\t\t\t\t\t\t\t\t<table align=\"center\" border=\"0\" width=\"100%\" cellpadding=\"0\" cellspacing=\"0\"\n" +
                "\t\t\t\t\t\t\t\t\tbgcolor=\"#fff\">\n" +
                "\t\t\t\t\t\t\t\t\t<tbody>\n" +
                "\t\t\t\t\t\t\t\t\t\t<tr>\n" +
                "\t\t\t\t\t\t\t\t\t\t\t<td>\n" +
                "\t\t\t\t\t\t\t\t\t\t\t\t<p\n" +
                "\t\t\t\t\t\t\t\t\t\t\t\t\tstyle=\"line-height:22px; font-family:'Microsoft YaHei'; font-size:12px; color:#999; text-align:center\">\n" +
                "\t\t\t\t\t\t\t\t\t\t\t\t\t此邮件为Bamdb官方邮箱发出的「注册激活」邮件\n" +
                "\t\t\t\t\t\t\t\t\t\t\t\t</p>\n" +
                "\t\t\t\t\t\t\t\t\t\t\t</td>\n" +
                "\t\t\t\t\t\t\t\t\t\t</tr>\n" +
                "\t\t\t\t\t\t\t\t\t</tbody>\n" +
                "\t\t\t\t\t\t\t\t</table>\n" +
                "\t\t\t\t\t\t\t</td>\n" +
                "\t\t\t\t\t\t</tr>\n" +
                "\t\t\t\t\t</tbody>\n" +
                "\t\t\t\t</table>\n" +
                "\t\t\t</div>\n" +
                "\t\t</div>\n" +
                "\t</div>\n" +
                "</div>";
    }
}