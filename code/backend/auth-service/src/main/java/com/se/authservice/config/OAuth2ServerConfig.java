package com.se.authservice.config;
import com.se.authservice.service.impl.CustomUserDetailsService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Primary;
import org.springframework.data.redis.connection.RedisConnectionFactory;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.oauth2.config.annotation.configurers.ClientDetailsServiceConfigurer;
import org.springframework.security.oauth2.config.annotation.web.configuration.AuthorizationServerConfigurerAdapter;
import org.springframework.security.oauth2.config.annotation.web.configuration.EnableAuthorizationServer;
import org.springframework.security.oauth2.config.annotation.web.configurers.AuthorizationServerEndpointsConfigurer;
import org.springframework.security.oauth2.config.annotation.web.configurers.AuthorizationServerSecurityConfigurer;
import org.springframework.security.oauth2.provider.token.DefaultTokenServices;
import org.springframework.security.oauth2.provider.token.TokenStore;
import org.springframework.security.oauth2.provider.token.store.JwtAccessTokenConverter;
import org.springframework.security.oauth2.provider.token.store.redis.RedisTokenStore;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import org.springframework.web.filter.CorsFilter;

@Configuration
@EnableAuthorizationServer
@Slf4j
public class OAuth2ServerConfig extends AuthorizationServerConfigurerAdapter {

    private final TokenStore tokenStore;
    private final AuthenticationManager authenticationManager;

    private final CustomUserDetailsService userDetailsService;

    @Autowired
    public OAuth2ServerConfig(RedisTemplate<String, String> redisTemplate,
                              CustomUserDetailsService userDetailsService,
                              @Qualifier("authenticationManagerBean") AuthenticationManager authenticationManager) {
        RedisConnectionFactory redisConnectionFactory;
        redisConnectionFactory = redisTemplate.getConnectionFactory();
        this.tokenStore = new RedisTokenStore(redisConnectionFactory);
        this.authenticationManager = authenticationManager;
        this.userDetailsService = userDetailsService;
    }

    @Override
    public void configure(AuthorizationServerEndpointsConfigurer endpoints) throws Exception {
        endpoints
                .tokenStore(this.tokenStore)
                .authenticationManager(this.authenticationManager)
                .userDetailsService(userDetailsService)
                .tokenServices(defaultTokenServices())
                .accessTokenConverter(jwtAccessTokenConverter());
    }

    @Override
    public void configure(ClientDetailsServiceConfigurer clients) throws Exception {
        final BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();
        clients.inMemory()
                .withClient("browser")
                .authorizedGrantTypes("refresh_token", "password")
                .authorities("updatesomething")
                .secret(encoder.encode(""))
                .scopes("server")

                .and()
                .withClient("activity-service")
                .secret(encoder.encode("activity-service"))
                .authorizedGrantTypes("client_credentials", "refresh_token")
                .scopes("server")

                .and()
                .withClient("comment-service")
                .secret(encoder.encode("comment-service"))
                .authorizedGrantTypes("client_credentials", "refresh_token")
                .scopes("server")

                .and()
                .withClient("friend-service")
                .secret(encoder.encode("friend-service"))
                .authorizedGrantTypes("client_credentials", "refresh_token")
                .scopes("server")

                .and()
                .withClient("image-service")
                .secret(encoder.encode("image-service"))
                .authorizedGrantTypes("client_credentials", "refresh_token")
                .scopes("server")

                .and()
                .withClient("item-service")
                .secret(encoder.encode("item-service"))
                .authorizedGrantTypes("client_credentials", "refresh_token")
                .scopes("server")

                .and()
                .withClient("message-service")
                .secret(encoder.encode("message-service"))
                .authorizedGrantTypes("client_credentials", "refresh_token")
                .scopes("server")

                .and()
                .withClient("rating-service")
                .secret(encoder.encode("rating-service"))
                .authorizedGrantTypes("client_credentials", "refresh_token")
                .scopes("server")

                .and()
                .withClient("topic-service")
                .secret(encoder.encode("topic-service"))
                .authorizedGrantTypes("client_credentials", "refresh_token")
                .scopes("server");
    }

    @Override
    public void configure(AuthorizationServerSecurityConfigurer oauthServer) throws Exception {
        oauthServer
                .tokenKeyAccess("permitAll()")
                /*need to be authenticated to visit check_token*/
                /*default: denyAll*/
                .checkTokenAccess("permitAll()")
                .allowFormAuthenticationForClients();
        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        CorsConfiguration config = new CorsConfiguration();
        config.applyPermitDefaultValues();

        // Maybe there's a way to use config from AuthorizationServerEndpointsConfigurer endpoints?
        source.registerCorsConfiguration("/oauth/token", config);
        CorsFilter filter = new CorsFilter(source);
        oauthServer.addTokenEndpointAuthenticationFilter(filter);

    }

    @Bean
    @Primary
    public DefaultTokenServices defaultTokenServices() {
        DefaultTokenServices tokenServices = new DefaultTokenServices();
        tokenServices.setSupportRefreshToken(true);
        tokenServices.setTokenStore(this.tokenStore);
        tokenServices.setAccessTokenValiditySeconds(60 * 60 * 2);
        tokenServices.setRefreshTokenValiditySeconds(60 * 60 * 24 * 7);
        return tokenServices;
    }

    @Bean

    public JwtAccessTokenConverter jwtAccessTokenConverter() {

        JwtAccessTokenConverter converter = new JwtAccessTokenConverter();

        converter.setSigningKey("bamdb");
//        KeyPair keyPair = new KeyStoreKeyFactory(new ClassPathResource("keystore.jks"), "foobar".toCharArray())
//
//                .getKeyPair("test");
//
//        converter.setKeyPair(keyPair);
        return converter;

    }

}
