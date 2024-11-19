package org.appointment.backend.repo;

import org.appointment.backend.entity.Kullanici;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;


public interface KullaniciRepository extends JpaRepository<Kullanici,Long> {
    Optional<Kullanici> findByEmail(String email);
}