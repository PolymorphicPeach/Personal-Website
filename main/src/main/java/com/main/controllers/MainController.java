package com.main.controllers;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class MainController {

    @GetMapping("/bigfoot")
    public String bigfoot(){
        return "bigfoot";
    }

    @GetMapping("/aerial")
    public String aerial(){
        return "aerial";
    }

    @GetMapping("/podcast")
    public String podcast(){
        return "podcast";
    }

    @GetMapping("/ufo")
    public String ufo(){
        return "ufo";
    }

    @GetMapping("/")
    public String home(){
        return "home";
    }
}
