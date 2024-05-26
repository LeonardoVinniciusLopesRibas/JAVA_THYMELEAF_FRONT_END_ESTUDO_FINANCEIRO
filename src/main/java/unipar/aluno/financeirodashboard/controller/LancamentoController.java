package unipar.aluno.financeirodashboard.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class LancamentoController {

    @GetMapping("/lancamento")
    public String showLancamento() {
        System.out.println("LANCAMENTO ABERTA!");
        return "lancamento";
    }

}
