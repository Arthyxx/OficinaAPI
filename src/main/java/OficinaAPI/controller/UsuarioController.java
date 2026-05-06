package OficinaAPI.controller;

import OficinaAPI.model.Usuario;
import OficinaAPI.service.UsuarioService;
import jakarta.validation.Valid;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/usuario")
public class UsuarioController {
    private final UsuarioService service;

    public UsuarioController(UsuarioService service) {
        this.service = service;
    }

    @PostMapping
    public Usuario create(@RequestBody @Valid Usuario usuario){
        return service.create(usuario);
    }

    @GetMapping
    public List<Usuario> findAll(){
        return service.findAll();
    }
}
