package OficinaAPI.controller;

import OficinaAPI.model.Carro;
import OficinaAPI.service.CarroService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/carros")
public class CarroController {
    private final CarroService carroService;

    public CarroController(CarroService carroService) {
        this.carroService = carroService;
    }

    @PostMapping("/usuario/{usuarioId}")
    public Carro create(@RequestBody @Valid Carro carro, @PathVariable Long usuarioId){
        return carroService.create(carro, usuarioId);
    }

    @GetMapping
    public List<Carro> findAll(){
        return carroService.findAll();
    }

    @GetMapping("/{id}")
    public Carro findById(@PathVariable Long id){
        return carroService.findById(id);
    }

    @PutMapping("/{id}")
    public Carro update(@PathVariable Long id,@RequestBody @Valid Carro carro){
        return carroService.update(id, carro);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> delete(@PathVariable Long id){
        carroService.delete(id);

        return ResponseEntity.noContent().build();
    }
}
