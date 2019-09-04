import org.tensorflow.Graph;
import org.tensorflow.Session;
import org.tensorflow.Tensor;

import javax.imageio.ImageIO;
import java.awt.*;
import java.awt.image.BufferedImage;
import java.io.File;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.Arrays;

public class Main {
    public static void main(String[] args)throws Exception {
        BufferedImage bimg = ImageIO.read(new File("D:\\BaiduNetdiskDownload\\video\\img_eva\\img_250.jpg"));
        BufferedImage buffImg = null;
        buffImg = new BufferedImage(128, 128, BufferedImage.TYPE_INT_RGB);
        buffImg.getGraphics().drawImage(bimg.getScaledInstance(128, 128, Image.SCALE_SMOOTH), 0, 0, null);
        int [][] data = new int[buffImg.getWidth()][buffImg.getHeight()];
        float[][][][] imagedata=new float[1][128][128][3];
        for(int i=0;i<128;++i)
        {
            for(int j=0;j<128;++j)
            {
                imagedata[0][i][j][0]=(float)(((buffImg.getRGB(i,j) & 0xff0000) >> 16)/255.0);
                imagedata[0][i][j][1]=(float)(((buffImg.getRGB(i,j) &  0xff00) >> 8)/255.0);
                imagedata[0][i][j][2]=(float)(((buffImg.getRGB(i,j) &  0xff) )/255.0);
            }
        }
        Graph graph = new Graph() ;
        //edit th model path you want
        graph.importGraphDef(Files.readAllBytes(Paths.get(
                "D:\\github\\imagerec\\SE231\\code\\image\\model1.pb"
        )));
        Session sess = new Session(graph) ;
        // x:the input data,y:the outputdata
        Tensor x = Tensor.create(imagedata);
        Tensor y = sess.runner().feed("conv2d_1_input" ,x).fetch("output").run().get(0);
        float[][] result = new float[1][3];
        y.copyTo(result);
        System.out.println(Arrays.toString(imagedata[0][50][50]));
        System.out.println(Arrays.toString(y.shape()));
        System.out.println(Arrays.toString(result[0]));




    }
}
