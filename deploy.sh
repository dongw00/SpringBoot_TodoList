#! /bin/bash
mvn -N io.takari:maven:wrapper
mvn -N io.takari:maven:wrapper -Dmaven=3.5.2
./mvnw clean install
./mvnw spring-boot:run
