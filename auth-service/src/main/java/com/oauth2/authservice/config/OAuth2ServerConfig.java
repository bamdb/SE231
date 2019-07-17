package com.oauth2.authservice.config;

import com.oauth2.authservice.service.CustomUserDetailsService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Primary;
import org.springframework.core.annotation.Order;
import org.springframework.core.io.ClassPathResource;
import org.springframework.data.redis.connection.RedisConnectionFactory;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.oauth2.config.annotation.configurers.ClientDetailsServiceConfigurer;
import org.springframework.security.oauth2.config.annotation.web.configuration.AuthorizationServerConfigurerAdapter;
import org.springframework.security.oauth2.config.annotation.web.configuration.EnableAuthorizationServer;
import org.springframework.security.oauth2.config.annotation.web.configurers.AuthorizationServerEndpointsConfigurer;
import org.springframework.security.oauth2.config.annotation.web.configurers.AuthorizationServerSecurityConfigurer;
import org.springframework.security.oauth2.provider.client.ClientCredentialsTokenEndpointFilter;
import org.springframework.security.oauth2.provider.token.ConsumerTokenServices;
import org.springframework.security.oauth2.provider.token.DefaultTokenServices;
import org.springframework.security.oauth2.provider.token.TokenStore;
import org.springframework.security.oauth2.provider.token.store.JwtAccessTokenConverter;
import org.springframework.security.oauth2.provider.token.store.KeyStoreKeyFactory;
import org.springframework.security.oauth2.provider.token.store.redis.RedisTokenStore;

import java.security.KeyPair;

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
                .withClient("user-service")
                .secret(encoder.encode("user-service"))
                .authorizedGrantTypes("client_credentials", "refresh_token")
                .scopes("server");
    }

    @Override
    public void configure(AuthorizationServerSecurityConfigurer oauthServer) throws Exception {
        oauthServer
                .tokenKeyAccess("permitAll()")
                /*need to be authenticated to visit check_token*/
                /*default: denyAll*/
//                .checkTokenAccess("isAuthenticated()")
                .checkTokenAccess("permitAll()")
                .allowFormAuthenticationForClients();
//                .addTokenEndpointAuthenticationFilter(checkTokenEndpointFilter())
//                .passwordEncoder(new BCryptPasswordEncoder());

    }
//    @Bean
//    public ClientCredentialsTokenEndpointFilter checkTokenEndpointFilter() {
//        ClientCredentialsTokenEndpointFilter filter =
//                new ClientCredentialsTokenEndpointFilter("/oauth/check_token");
//        filter.setAuthenticationManager(authenticationManager);
//        filter.setAllowOnlyPost(true);
//        return filter;
//    }
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
