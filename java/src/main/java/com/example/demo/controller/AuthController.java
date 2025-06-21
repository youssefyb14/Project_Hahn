package com.example.demo.controller;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpMethod;
import org.springframework.http.MediaType;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;

import java.util.Map;
import java.util.HashMap;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "http://localhost:3000")
public class AuthController {

    @Value("${github.client.id}")
    private String githubClientId;

    @Value("${github.client.secret}")
    private String githubClientSecret;

    private final RestTemplate restTemplate = new RestTemplate();

    @PostMapping("/github")
    public ResponseEntity<?> handleGitHubAuth(@RequestBody Map<String, String> request) {
        try {
            String code = request.get("code");
            System.out.println("GitHub Auth - Code reçu: " + code);
            System.out.println("GitHub Auth - Client ID: " + githubClientId);
            System.out.println("GitHub Auth - Client Secret: " + (githubClientSecret != null ? "PRÉSENT" : "MANQUANT"));
            
            if (code == null || code.isEmpty()) {
                System.out.println("GitHub Auth - Code manquant");
                return ResponseEntity.badRequest().body(Map.of("error", "Code d'autorisation manquant"));
            }
            
            // Échanger le code contre un token d'accès
            String tokenUrl = "https://github.com/login/oauth/access_token";
            
            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.APPLICATION_FORM_URLENCODED);
            headers.set("Accept", "application/json");
            
            MultiValueMap<String, String> tokenRequest = new LinkedMultiValueMap<>();
            tokenRequest.add("client_id", githubClientId);
            tokenRequest.add("client_secret", githubClientSecret);
            tokenRequest.add("code", code);
            tokenRequest.add("redirect_uri", "http://localhost:3000/github/callback");
            
            System.out.println("GitHub Auth - Requête token: " + tokenRequest);
            
            HttpEntity<MultiValueMap<String, String>> tokenEntity = new HttpEntity<>(tokenRequest, headers);
            
            ResponseEntity<Map> tokenResponse = restTemplate.postForEntity(tokenUrl, tokenEntity, Map.class);
            
            System.out.println("GitHub Auth - Réponse token: " + tokenResponse.getBody());
            
            String accessToken = (String) tokenResponse.getBody().get("access_token");
            
            if (accessToken == null) {
                System.out.println("GitHub Auth - Token d'accès manquant dans la réponse");
                return ResponseEntity.badRequest().body(Map.of("error", "Impossible d'obtenir le token d'accès: " + tokenResponse.getBody()));
            }
            
            System.out.println("GitHub Auth - Token obtenu: " + accessToken.substring(0, 10) + "...");
            
            // Récupérer les informations de l'utilisateur
            String userUrl = "https://api.github.com/user";
            HttpHeaders userHeaders = new HttpHeaders();
            userHeaders.set("Authorization", "token " + accessToken);
            userHeaders.set("Accept", "application/vnd.github.v3+json");
            
            HttpEntity<String> userEntity = new HttpEntity<>(userHeaders);
            ResponseEntity<Map> userResponse = restTemplate.exchange(userUrl, HttpMethod.GET, userEntity, Map.class);
            
            System.out.println("GitHub Auth - Données utilisateur: " + userResponse.getBody());
            
            Map<String, Object> response = new HashMap<>();
            response.put("user", userResponse.getBody());
            response.put("token", accessToken);
            
            return ResponseEntity.ok(response);
            
        } catch (Exception e) {
            System.err.println("GitHub Auth - Exception: " + e.getMessage());
            e.printStackTrace();
            return ResponseEntity.badRequest().body(Map.of("error", "Erreur lors de l'authentification GitHub: " + e.getMessage()));
        }
    }
} 