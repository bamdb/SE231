package com.se.searchservice;

import com.google.gson.Gson;
import com.se.searchservice.entity.Item;
import com.se.searchservice.repository.ItemRepository;
import org.elasticsearch.index.query.MatchQueryBuilder;
import org.elasticsearch.index.query.QueryBuilders;
import org.elasticsearch.search.sort.SortBuilders;
import org.elasticsearch.search.sort.SortOrder;
import org.junit.Assert;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.elasticsearch.core.ElasticsearchTemplate;
import org.springframework.data.elasticsearch.core.query.NativeSearchQueryBuilder;
import org.springframework.test.context.junit4.SpringRunner;

import javax.annotation.Resource;
import java.util.List;

@RunWith(SpringRunner.class)
@SpringBootTest
public class SearchServiceApplicationTests {
    private static final String HTTP_PORT = "9200";
    private static final String HTTP_TRANSPORT_PORT = "9305";
    private static final String ES_WORKING_DIR = "target/es";

    private static Node node;

    @BeforeClass
    public static void startElasticsearch() throws Exception {
        removeOldDataDir(ES_WORKING_DIR + "/" + clusterName);

        Settings settings = Settings.builder()
                .put("path.home", ES_WORKING_DIR)
                .put("path.conf", ES_WORKING_DIR)
                .put("path.data", ES_WORKING_DIR)
                .put("path.work", ES_WORKING_DIR)
                .put("path.logs", ES_WORKING_DIR)
                .put("http.port", HTTP_PORT)
                .put("transport.tcp.port", HTTP_TRANSPORT_PORT)
                .put("index.number_of_shards", "1")
                .put("index.number_of_replicas", "0")
                .put("discovery.zen.ping.multicast.enabled", "false")
                .build();
        node = nodeBuilder().settings(settings).clusterName("monkeys.elasticsearch").client(false).node();
        node.start();
    }

    @AfterClass
    public static void stopElasticsearch() {
        node.close();
    }

    private static void removeOldDataDir(String datadir) throws Exception {
        File dataDir = new File(datadir);
        if (dataDir.exists()) {
            FileSystemUtils.deleteRecursively(dataDir);
        }
    }
}
