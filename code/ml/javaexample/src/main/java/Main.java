import org.tensorflow.Graph;
import org.tensorflow.Session;
import org.tensorflow.Tensor;

import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.Arrays;

public class Main {
    public static void main(String[] args)throws Exception {

                Graph graph = new Graph() ;
                //edit th model path you want
                graph.importGraphDef(Files.readAllBytes(Paths.get(
                        "D:\\github\\imagerec\\SE231\\code\\image\\model2.pb"
                )));
                Session sess = new Session(graph) ;
                // x:the input data,y:the outputdata
                float[][] input=new float[1][5180];
                input[0][200]=1;
                Tensor x = Tensor.create(input);
                Tensor y = sess.runner().feed("dense_1_input" ,x).fetch("output").run().get(0);
                float[][] result = new float[1][5180];
                y.copyTo(result);
                System.out.println(Arrays.toString(y.shape()));
                System.out.println(Arrays.toString(result[0]));



    }
}
