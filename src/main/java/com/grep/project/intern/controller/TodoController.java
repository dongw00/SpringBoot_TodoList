package com.grep.project.intern.controller;

import com.grep.project.intern.model.TodoList;
import com.grep.project.intern.model.TodoListRepository;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.net.URI;
import java.net.URISyntaxException;
import java.util.Collection;
import java.util.Optional;

@RestController
@RequestMapping("/api")
@Api(value = "Todo List")
public class TodoController {
    private final Logger log = LoggerFactory.getLogger(TodoController.class);
    private TodoListRepository todoListRepository;

    public TodoController(TodoListRepository todoListRepository) {
        this.todoListRepository = todoListRepository;
    }

    @ApiOperation(value = "모든 todo를 GET")
    @GetMapping("/todo")
    Collection<TodoList> groups() {
        return todoListRepository.findAll();
    }

    @ApiOperation(value = "해당 id todo를 GET")
    @GetMapping("/todo/{id}")
    ResponseEntity<?> getTodo(@PathVariable Long id) {
        Optional<TodoList> todoList = todoListRepository.findById(id);
        return todoList.map(res -> ResponseEntity.ok().body(res))
                .orElse(new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    @ApiOperation(value = "todo POST")
    @PostMapping("/todo")
    ResponseEntity<TodoList> createGroup(@Valid @RequestBody TodoList todoList) throws URISyntaxException {
        log.info("todo를 생성했습니다 : {}", todoList);
        TodoList result = todoListRepository.save(todoList);
        return ResponseEntity.created(new URI("/api/todo/" + result.getId()))
                .body(result);
    }

    @ApiOperation(value = "todo 수정")
    @PutMapping("/todo/{id}")
    ResponseEntity<TodoList> updateGroup(@Valid @RequestBody TodoList todoList) {
        log.info("해당 todo를 수정하였습니다 :  {}", todoList);
        TodoList result = todoListRepository.save(todoList);
        return ResponseEntity.ok().body(result);
    }

    @ApiOperation(value = "todo 삭제")
    @DeleteMapping("/todo/{id}")
    public ResponseEntity<?> deleteGroup(@PathVariable Long id) {
        log.info("해당 todo를 삭제하였습니다 : {}", id);
        todoListRepository.deleteById(id);
        return ResponseEntity.ok().build();
    }
}
