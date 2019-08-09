package com.se.authservice.helper;

import com.google.zxing.*;
import com.google.zxing.common.BitMatrix;
import com.google.zxing.common.HybridBinarizer;
import com.google.zxing.qrcode.decoder.ErrorCorrectionLevel;
import com.se.authservice.repository.ImageRepository;
import org.bson.types.Binary;
import org.springframework.beans.factory.annotation.Autowired;

import javax.annotation.Resource;
import javax.imageio.ImageIO;
import java.awt.*;
import java.awt.geom.RoundRectangle2D;
import java.awt.image.BufferedImage;
import java.io.ByteArrayOutputStream;
import java.io.File;
import java.io.OutputStream;
import java.net.URL;
import java.util.Hashtable;

public class QRCodeUtil {
    private static final String CHARSET = "utf-8";
    private static final String FORMAT_NAME = "JPG";
    // 二维码尺寸
    private static final int QRCODE_SIZE = 300;
    // LOGO宽度
    private static final int WIDTH = 60;
    // LOGO高度
    private static final int HEIGHT = 60;

    public static BufferedImage createImage(String content, String imgPath) throws Exception {
        Hashtable hints = new Hashtable();
        hints.put(EncodeHintType.ERROR_CORRECTION, ErrorCorrectionLevel.H);
        hints.put(EncodeHintType.CHARACTER_SET, CHARSET);
        hints.put(EncodeHintType.MARGIN, 1);
        BitMatrix bitMatrix = new MultiFormatWriter().encode(content, BarcodeFormat.QR_CODE, QRCODE_SIZE, QRCODE_SIZE,
                hints);
        int width = bitMatrix.getWidth();
        int height = bitMatrix.getHeight();
        BufferedImage image = new BufferedImage(width, height, BufferedImage.TYPE_INT_RGB);
        for (int x = 0; x < width; x++) {
            for (int y = 0; y < height; y++) {
                image.setRGB(x, y, bitMatrix.get(x, y) ? 0xFF000000 : 0xFFFFFFFF);
            }
        }
<<<<<<< HEAD
        // QRCodeUtil.insertImage(image, imgPath);
        return image;
    }

//    private static void insertImage(BufferedImage source, String imgPath) throws Exception {
//        URL url = new URL(imgPath);
//        BufferedImage img = ImageIO.read(url);
//        File file = new File("icon.jpg");
//        ImageIO.write(img, "jpg", file);
//        Image src = ImageIO.read(file);
//        int width = WIDTH;
//        int height = HEIGHT;
//        Image image = src.getScaledInstance(width, height, Image.SCALE_SMOOTH);
//        BufferedImage tag = new BufferedImage(width, height, BufferedImage.TYPE_INT_RGB);
//        Graphics g = tag.getGraphics();
//        g.drawImage(image, 0, 0, null); // 绘制缩小后的图
//        g.dispose();
//        src = image;
//
//        Graphics2D graph = source.createGraphics();
//        int x = (QRCODE_SIZE - width) / 2;
//        int y = (QRCODE_SIZE - height) / 2;
//        graph.drawImage(src, x, y, width, height, null);
//        Shape shape = new RoundRectangle2D.Float(x, y, width, width, 6, 6);
//        graph.setStroke(new BasicStroke(3f));
//        graph.draw(shape);
//        graph.dispose();
//    }
=======
        QRCodeUtil.insertImage(image, imgPath);
        return image;
    }

    private static void insertImage(BufferedImage source, String imgPath) throws Exception {
        URL url = new URL(imgPath);
        BufferedImage img = ImageIO.read(url);
        File file = new File("icon.jpg");
        ImageIO.write(img, "jpg", file);
        Image src = ImageIO.read(file);
        int width = WIDTH;
        int height = HEIGHT;
        Image image = src.getScaledInstance(width, height, Image.SCALE_SMOOTH);
        BufferedImage tag = new BufferedImage(width, height, BufferedImage.TYPE_INT_RGB);
        Graphics g = tag.getGraphics();
        g.drawImage(image, 0, 0, null); // 绘制缩小后的图
        g.dispose();
        src = image;

        Graphics2D graph = source.createGraphics();
        int x = (QRCODE_SIZE - width) / 2;
        int y = (QRCODE_SIZE - height) / 2;
        graph.drawImage(src, x, y, width, height, null);
        Shape shape = new RoundRectangle2D.Float(x, y, width, width, 6, 6);
        graph.setStroke(new BasicStroke(3f));
        graph.draw(shape);
        graph.dispose();
    }
>>>>>>> master
}
