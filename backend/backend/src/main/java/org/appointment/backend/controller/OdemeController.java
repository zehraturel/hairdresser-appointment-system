package org.appointment.backend.controller;

import lombok.RequiredArgsConstructor;
import org.appointment.backend.dto.OdemeDto;
import org.appointment.backend.service.OdemeService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping
@RequiredArgsConstructor
public class OdemeController {

    private final OdemeService odemeService;

    @PostMapping
    public ResponseEntity<OdemeDto> kaydet (@RequestBody OdemeDto odemeDto) {
        return ResponseEntity.ok(odemeService.save(odemeDto));
    }

    @GetMapping
    public ResponseEntity<List<OdemeDto>> tumunuListele() {
        return ResponseEntity.ok(odemeService.getAll());
    }

    @PutMapping("/{odemeId}")
    public ResponseEntity<OdemeDto> guncelle(@PathVariable Long odemeId,@RequestBody OdemeDto odemeDto) {
        odemeDto.setOdemeId(odemeId);
        return ResponseEntity.ok(odemeService.save(odemeDto));
    }

    @DeleteMapping
    public ResponseEntity<OdemeDto> sil(@PathVariable Long odemeId) {
        odemeService.delete(odemeId);
        return ResponseEntity.noContent().build();
    }

}
