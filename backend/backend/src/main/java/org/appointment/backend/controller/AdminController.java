package org.appointment.backend.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/admin")
public class AdminController {

    @GetMapping("/dashboard")
    @PreAuthorize("hasRole('ROLE_ADMIN')") // Sadece ADMIN rolüne sahip kullanıcılar erişebilir
    public ResponseEntity<String> getAdminDashboard() {
        return ResponseEntity.ok("Admin paneline hoş geldiniz!");
    }
}