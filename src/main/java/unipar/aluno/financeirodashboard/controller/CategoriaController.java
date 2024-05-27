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

    @GetMapping("/categoria/editar")
    public String showEditCategorias(){
        System.out.println("EDIÇÃO DE CATEGORIA ABERTA");
        return "editarCategoria";
    }


}
