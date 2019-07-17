package com.oauth2.authservice.config;

import com.oauth2.authservice.service.CustomUserDetailsService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.oauth2.config.annotation.web.configuration.EnableResourceServer;

@Configuration
@EnableWebSecurity
@Slf4j
public class WebSecurityConfig extends WebSecurityConfigurerAdapter {
    @Autowired
    private CustomUserDetailsService userDetailsService;

    @Override
    protected void configure(final AuthenticationManagerBuilder auth) throws Exception {
        /*authorities will cover the role makes hasRole('USER')fail*/
        /*on the contrary authority cannot serve as a role except with a prefix ROLE_*/
        auth
                .inMemoryAuthentication()
                .withUser("user").password(passwordEncoder().encode("password"))
                .roles("USER").authorities("ROLE_WTH","OOO");
        auth.userDetailsService(userDetailsService).passwordEncoder(passwordEncoder());
    }

    @Override
    @Bean
    public AuthenticationManager authenticationManagerBean() throws Exception {
        return super.authenticationManagerBean();
    }

    @Override
    protected void configure(final HttpSecurity http) throws Exception {
        http

                .csrf().disable();
//                  .httpBasic().and().formLogin().loginPage("/login").defaultSuccessUrl("/index")
//                .failureUrl("/login?error").permitAll()
//                .and().logout().logoutUrl("/logout").logoutSuccessUrl("/login")
//                .permitAll().and().rememberMe();//注销请求可直接访问

//        http.authorizeRequests()
//                .antMatchers(HttpMethod.GET, ROOT_PATTERN).access("#oauth2.hasScope('read')")
//                .antMatchers(HttpMethod.POST, ROOT_PATTERN).access("#oauth2.hasScope('write')")
//                .antMatchers(HttpMethod.PATCH, ROOT_PATTERN).access("#oauth2.hasScope('write')")
//                .antMatchers(HttpMethod.PUT, ROOT_PATTERN).access("#oauth2.hasScope('write')")
//                .antMatchers(HttpMethod.DELETE, ROOT_PATTERN).access("#oauth2.hasScope('write')");
//        http
//                .csrf().disable();
//                .authorizeRequests()
//                .antMatchers("/oauth/token*", "/login*").permitAll()
//                .antMatchers("/resources/**", "/login*").permitAll()
//                .antMatchers("/admin/**").hasRole("ADMIN")
//                .antMatchers("/anonymous*").anonymous()
//                .anyRequest().authenticated()
//                .and()
//                .formLogin()
//                .permitAll()
////                .loginPage("/login.html")
////                .loginProcessingUrl("/perform_login")
////                .defaultSuccessUrl("/homepage.html", true)
////                .failureUrl("/login.html?error=true")
//                .and()
//                .logout()
//                .logoutUrl("/perform_logout")
//                .permitAll()
//                .deleteCookies("JSESSIONID");
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }
}