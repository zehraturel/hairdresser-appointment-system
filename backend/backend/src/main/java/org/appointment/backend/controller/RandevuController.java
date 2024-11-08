package org.appointment.backend.controller;

import lombok.RequiredArgsConstructor;
import org.appointment.backend.dto.RandevuDto;
import org.appointment.backend.service.RandevuService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/randevu")
@RequiredArgsConstructor

public class RandevuController {

    private final RandevuService randevuService;

    @PostMapping("/ekleRandevu")
    public ResponseEntity<RandevuDto>kaydet(@RequestBody RandevuDto randevuDto) {
        return ResponseEntity.ok(randevuService.save(randevuDto));
    }

    @GetMapping("/listeleRandevu")
    public ResponseEntity<List<RandevuDto>> tumunuListele() {
        return ResponseEntity.ok(randevuService.getAll());
    }

    @PutMapping("/guncelle/{randevuId}")
    public ResponseEntity<RandevuDto> guncelle(@PathVariable Long randevuId, @RequestBody RandevuDto randevuDto) {
        randevuDto.setRandevuId(randevuId);
        return ResponseEntity.ok(randevuService.save(randevuDto));
    }

    @DeleteMapping("/sil/{randevuId}")
    public ResponseEntity<RandevuDto> sil(@PathVariable Long randevuId) {
        randevuService.delete(randevuId);
        return ResponseEntity.noContent().build();
    }


}
