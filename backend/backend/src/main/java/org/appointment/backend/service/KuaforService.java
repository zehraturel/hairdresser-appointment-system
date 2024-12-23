package org.appointment.backend.service;

import org.appointment.backend.dto.*;
import org.appointment.backend.entity.Hizmet;
import org.appointment.backend.entity.Kuafor;

import java.time.LocalDate;
import java.util.List;
import java.util.Set;

public interface KuaforService {
    Kuafor registerKuafor(KuaforRegisterRequest request);
    KuaforDetailsResponse getKuaforDetails(Long kuaforId, String currentUserEmail); // Parametre uyumu sağlanıyor
    Kuafor addServiceToKuafor(Long kuaforId, Long hizmetId);
    Kuafor updateKuaforInfo(Long kuaforId, KuaforUpdateRequest updateRequest, String currentUserEmail); // Parametre uyumu sağlanıyor
    Kuafor save(Kuafor kuafor);
    Kuafor findKuaforByEmail(String email);
    List<KuaforRandevuResponseDto> getKuaforRandevular(String email, Long kuaforId, LocalDate tarih);
    KuaforDetailsResponse getKuaforByEmailForDetails(String email);

    // Yeni eklenen metot: Kuaförün hizmetlerini almak için
    List<String> getKuaforHizmetler(String email, Long kuaforId);
    List<KuaforDto> getAllKuaforler();
    KuaforDto getHizmetlerByKuaforId(Long kuaforId);
}
