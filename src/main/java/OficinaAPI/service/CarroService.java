package OficinaAPI.service;

import OficinaAPI.model.Carro;
import OficinaAPI.model.Usuario;
import OficinaAPI.repository.CarroRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CarroService {
    private final CarroRepository carroRepository;
    private final UsuarioService usuarioService;

    public CarroService(CarroRepository carroRepository, UsuarioService usuarioService) {
        this.carroRepository = carroRepository;
        this.usuarioService = usuarioService;
    }

    public Carro create(Carro carro, Long usuarioId){
        Usuario usuario = usuarioService.findById(usuarioId);
        carro.setUsuario(usuario);

        return carroRepository.save(carro);
    }

    public List<Carro> findAll(){
        return carroRepository.findAll();
    }

    public Carro findById(Long id){
        Carro carro = carroRepository.findById(id).orElseThrow(
                () -> new IllegalArgumentException("Car not found!")
        );

        return carro;
    }

    public Carro update(Long id, Carro carro){
        Carro entity = carroRepository.findById(id).orElseThrow(
                () -> new IllegalArgumentException("Car not found!")
        );

        entity.setBrand(carro.getBrand());
        entity.setModel(carro.getModel());
        entity.setProblem(carro.getProblem());
        entity.setYear(carro.getYear());

        if (carro.getUsuario() != null && carro.getUsuario().getId() != null) {
            Usuario usuario = usuarioService.findById(carro.getUsuario().getId());
            entity.setUsuario(usuario);
        }

        if (carro.getStatus() != null){
            entity.setStatus(carro.getStatus());
        }

        return carroRepository.save(entity);
    }

    public void delete(Long id){
        Carro entity = carroRepository.findById(id).orElseThrow(
                () -> new IllegalArgumentException("Car not found!")
        );

        carroRepository.delete(entity);
    }
}
