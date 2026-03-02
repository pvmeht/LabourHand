package com.labourhand.controller;

import com.labourhand.dto.ProjectDto;
import com.labourhand.service.ProjectService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/projects")
@RequiredArgsConstructor
public class ProjectController {

    private final ProjectService projectService;

    @GetMapping
    public ResponseEntity<List<ProjectDto.Response>> getAll() {
        return ResponseEntity.ok(projectService.getAllOpenProjects());
    }

    @GetMapping("/nearby")
    public ResponseEntity<List<ProjectDto.Response>> getNearby(
            @RequestParam(defaultValue = "12.9716") double lat,
            @RequestParam(defaultValue = "77.5946") double lng) {
        return ResponseEntity.ok(projectService.getNearbyProjects(lat, lng));
    }

    @GetMapping("/my")
    public ResponseEntity<List<ProjectDto.Response>> getMyProjects() {
        return ResponseEntity.ok(projectService.getMyProjects());
    }

    @GetMapping("/category/{category}")
    public ResponseEntity<List<ProjectDto.Response>> getByCategory(@PathVariable String category) {
        return ResponseEntity.ok(projectService.getProjectsByCategory(category));
    }

    @GetMapping("/{id}")
    public ResponseEntity<ProjectDto.Response> getById(@PathVariable Long id) {
        return ResponseEntity.ok(projectService.getById(id));
    }

    @PostMapping
    public ResponseEntity<ProjectDto.Response> create(@Valid @RequestBody ProjectDto.Request req) {
        return ResponseEntity.ok(projectService.createProject(req));
    }

    @PutMapping("/{id}")
    public ResponseEntity<ProjectDto.Response> update(
            @PathVariable Long id, @RequestBody ProjectDto.Request req) {
        return ResponseEntity.ok(projectService.updateProject(id, req));
    }

    @PutMapping("/{id}/progress")
    public ResponseEntity<ProjectDto.Response> updateProgress(
            @PathVariable Long id, @RequestBody ProjectDto.ProgressRequest req) {
        return ResponseEntity.ok(projectService.updateProgress(id, req));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        projectService.deleteProject(id);
        return ResponseEntity.noContent().build();
    }
}
