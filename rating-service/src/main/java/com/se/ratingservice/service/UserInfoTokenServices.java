package com.se.ratingservice.service;

import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.autoconfigure.security.oauth2.resource.AuthoritiesExtractor;
import org.springframework.boot.autoconfigure.security.oauth2.resource.FixedAuthoritiesExtractor;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.oauth2.client.OAuth2RestOperations;
import org.springframework.security.oauth2.client.OAuth2RestTemplate;
import org.springframework.security.oauth2.client.resource.BaseOAuth2ProtectedResourceDetails;
import org.springframework.security.oauth2.common.DefaultOAuth2AccessToken;
import org.springframework.security.oauth2.common.OAuth2AccessToken;
import org.springframework.security.oauth2.common.exceptions.InvalidTokenException;
import org.springframework.security.oauth2.provider.OAuth2Authentication;
import org.springframework.security.oauth2.provider.OAuth2Request;
import org.springframework.security.oauth2.provider.token.RemoteTokenServices;

import java.security.Principal;
import java.util.Collections;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

@Slf4j
public class UserInfoTokenServices extends RemoteTokenServices {

    private static final String[] PRINCIPAL_KEYS = new String[] {"username", "id"};

    private final String userInfoEndpointUrl;

    private final String clientId;

    private OAuth2RestOperations restTemplate;

    private String tokenType = DefaultOAuth2AccessToken.BEARER_TYPE;

    private AuthoritiesExtractor authoritiesExtractor = new FixedAuthoritiesExtractor();

    public UserInfoTokenServices(String userInfoEndpointUrl, String clientId) {
        this.userInfoEndpointUrl = userInfoEndpointUrl;
        this.clientId = clientId;
    }


    public void setTokenType(String tokenType) {
        this.tokenType = tokenType;
    }

    public void setRestTemplate(OAuth2RestOperations restTemplate) {
        this.restTemplate = restTemplate;
    }

    public void setAuthoritiesExtractor(AuthoritiesExtractor authoritiesExtractor) {
        this.authoritiesExtractor = authoritiesExtractor;
    }


    @Override
    public OAuth2Authentication loadAuthentication(String accessToken)
            throws AuthenticationException, InvalidTokenException {
        Map<String, Object> map = getMap(this.userInfoEndpointUrl, accessToken);

        if (map.containsKey("error")) {
            log.debug("userinfo returned error: " + map.get("error"));
            throw new InvalidTokenException(accessToken);
        }
        return extractAuthentication(map);
    }

    private OAuth2Authentication extractAuthentication(Map<String, Object> map) {
        Principal principal = getPrincipal(map);
        OAuth2Request request = new OAuth2Request(null, this.clientId, null, true, null,
                null, null, null, null);

        List<GrantedAuthority> authorities = this.authoritiesExtractor
                .extractAuthorities(map);
        UsernamePasswordAuthenticationToken token = new UsernamePasswordAuthenticationToken(
                principal, "N/A", authorities);
        token.setDetails(map);
        return new OAuth2Authentication(request, token);
    }

    private MyPrincipal getPrincipal(Map<String, Object> map) {
        Map<String, Object> m = new LinkedHashMap<>();

        MyPrincipal myPrincipal = new MyPrincipal();
        if (map.containsKey("username"))
//            m.put("username", map.get("username"));
            myPrincipal.setUsername((String) map.get("username"));
        if (map.containsKey("id"))
//            m.put("id", map.get("id"));
                myPrincipal.setId((Integer)map.get("id"));
        return myPrincipal;
    }

    @Override
    public OAuth2AccessToken readAccessToken(String accessToken) {
        throw new UnsupportedOperationException("Not supported: read access token");
    }

    @SuppressWarnings({ "unchecked" })
    private Map<String, Object> getMap(String path, String accessToken) {
        log.debug("Getting user info from: " + path);
        try {
            OAuth2RestOperations restTemplate = this.restTemplate;
            if (restTemplate == null) {
                BaseOAuth2ProtectedResourceDetails resource = new BaseOAuth2ProtectedResourceDetails();
                resource.setClientId(this.clientId);
                restTemplate = new OAuth2RestTemplate(resource);
            }
            OAuth2AccessToken existingToken = restTemplate.getOAuth2ClientContext()
                    .getAccessToken();
            if (existingToken == null || !accessToken.equals(existingToken.getValue())) {
                DefaultOAuth2AccessToken token = new DefaultOAuth2AccessToken(
                        accessToken);
                token.setTokenType(this.tokenType);
                restTemplate.getOAuth2ClientContext().setAccessToken(token);
            }
            return restTemplate.getForEntity(path, Map.class).getBody();
        }
        catch (Exception ex) {
            log.info("Could not fetch user details: " + ex.getClass() + ", "
                    + ex.getMessage());
            return Collections.<String, Object>singletonMap("error",
                    "Could not fetch user details");
        }
    }
    private class MyPrincipal implements Principal {
        public Integer id;
        public String username;

        public Integer getId() {
            return id;
        }

        public void setId(Integer id) {
            this.id = id;
        }

        public String getUsername() {
            return username;
        }

        public void setUsername(String username) {
            this.username = username;
        }

        public MyPrincipal(Integer id, String username) {
            this.id = id;
            this.username = username;
        }

        public MyPrincipal() {
        }

        @Override
        public String getName() {
            return username;
        }
    }

}

