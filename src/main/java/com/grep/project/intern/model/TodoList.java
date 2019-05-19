package com.grep.project.intern.model;

import lombok.*;
import org.springframework.format.annotation.DateTimeFormat;

import javax.persistence.*;
import java.time.ZonedDateTime;

@Data
@Entity
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "todoList")
public class TodoList {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @NonNull
    private String title;

    @NonNull
    private String content;

    @NonNull
    private int sequence;

    @DateTimeFormat(pattern = "yyyy-MM-dd'T'HH:mm")
    private ZonedDateTime dueDate;

    @NonNull
    private boolean done;


    @Override
    public String toString() {
        return "title = " + title + ", dueDate = " + dueDate + ", sequence  = " + sequence + ", done = " + done;
    }
}
