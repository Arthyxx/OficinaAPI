package OficinaAPI.controller;

import OficinaAPI.model.Carro;
import OficinaAPI.service.CarroService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/carros/v1")
public class CarroController {
    private final CarroService carroService;

    public CarroController(CarroService carroService) {
        this.carroService = carroService;
    }

    @PostMapping
    public Carro create(@RequestBody @Valid Carro carro){
        return carroService.create(carro);
    }

    @GetMapping
    public List<Carro> findAll(){
        return carroService.findAll();
    }

    @GetMapping("/{id}")
    public Carro findById(@PathVariable Long id){
        return carroService.findById(id);
    }

    @PutMapping
    public Carro update(@RequestBody @Valid Carro carro){
        return carroService.update(carro);
    }

    @DeleteMapping
    public ResponseEntity<?> delete(@PathVariable Long id){
        carroService.delete(id);

        return ResponseEntity.noContent().build();
    }
}
