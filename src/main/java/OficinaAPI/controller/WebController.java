package OficinaAPI.controller;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class WebController {
    @GetMapping("/dashboard")
        public String home(Model model){
            model.addAttribute("message", "Bem-vindo a nossa oficina!");
            return "dashboard";
        }

        @GetMapping("/login")
        public String login(Model model){
            model.addAttribute("message", "Login");

            return "login";
        }

        @GetMapping("/cadastro")
        public String cadastro(Model model){
            model.addAttribute("message", "Produtos");

            return "cadastro";
        }
    }
