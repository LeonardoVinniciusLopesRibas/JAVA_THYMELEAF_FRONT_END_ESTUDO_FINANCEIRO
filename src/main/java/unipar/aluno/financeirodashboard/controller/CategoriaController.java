package unipar.aluno.financeirodashboard.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class CategoriaController {

    @GetMapping("/categoria")
    public String showCategoria() {
        System.out.println("CATEGORIA ABERTA!");
        return "categoria";
    }


}
