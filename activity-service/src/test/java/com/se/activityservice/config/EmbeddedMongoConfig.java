package com.se.activityservice.config;

import com.mongodb.client.MongoClient;
import de.flapdoodle.embed.mongo.MongodExecutable;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.mongodb.repository.config.EnableMongoRepositories;

@Configuration
@EnableMongoRepositories
public class EmbeddedMongoConfig {

    private static final String DB_NAME = "integrationTest";
    private static final int DB_PORT = 12345;
    private static final String DB_HOST = "localhost";
    private static final String DB_COLLECTION = "products";

    private MongodExecutable mongodExecutable = null;

    @Bean(name="mongoClient")
    public MongoClient mongoClient() throws IOException {
        // Lots of calls here to de.flapdoodle.embed.mongo code base to
        // create an embedded db and insert some JSON data
    }

    @Autowired
    @Bean(name="mongoDbFactory")
    public MongoDbFactory mongoDbFactory(MongoClient mongoClient) {
        return new SimpleMongoDbFactory(mongoClient, DB_NAME);
    }

    @Autowired
    @Bean(name="mongoTemplate")
    public MongoTemplate mongoTemplate(MongoClient mongoClient) {
        return new MongoTemplate(mongoClient, DB_NAME);
    }

    @PreDestroy
    public void shutdownEmbeddedMongoDB() {
        if (this.mongodExecutable != null) {
            this.mongodExecutable.stop();
        }
    }
}