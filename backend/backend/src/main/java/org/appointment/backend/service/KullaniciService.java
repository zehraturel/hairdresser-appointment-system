package org.appointment.backend.service;

import org.appointment.backend.dto.AdminKullaniciDto;
import org.appointment.backend.dto.KullaniciDto;
import org.appointment.backend.entity.Kullanici;

import java.util.List;

public interface KullaniciService {
    KullaniciDto save(KullaniciDto kullaniciDto);
    KullaniciDto update(Long kullaniciId, KullaniciDto kullaniciDto);
    void delete(Long kullaniciId);
    KullaniciDto findByEmail(String email);
    List<AdminKullaniciDto> getAll();
    Kullanici findEntityByEmail(String email);
    void deleteByEmail(String email);
    boolean existsByEmail(String email);


}
