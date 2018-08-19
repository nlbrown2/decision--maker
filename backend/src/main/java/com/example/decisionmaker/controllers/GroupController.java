//package com.example.decisionmaker.controllers;
//
//import com.example.decisionmaker.entity.Group;
//import com.example.decisionmaker.service.GroupService;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.http.HttpStatus;
//import org.springframework.web.bind.annotation.*;
//
//import java.util.List;
//
//@RestController
//@RequestMapping("/groups")
//public class GroupController {
//
//    @Autowired
//    private GroupService service;
//
//    @ResponseStatus(HttpStatus.OK)
//    @ResponseBody
//    @GetMapping("/list")
//    List<Group> findAll() {
//        return service.getAll();
//    }
//
//    @ResponseStatus(HttpStatus.OK)
//    @ResponseBody
//    @GetMapping("/{id}")
//    Group findById(@PathVariable("id") Integer id) {
//        return service.getById(id);
//    }
//
//}
