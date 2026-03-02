package com.labourhand.service;

import com.labourhand.dto.ProjectDto;
import com.labourhand.model.*;
import com.labourhand.repository.*;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ProjectService {

    private final ProjectRepository projectRepository;
    private final UserRepository userRepository;
    private final BidRepository bidRepository;
    private final UserService userService;
    private final OwnerProfileRepository ownerProfileRepository;

    public List<ProjectDto.Response> getAllOpenProjects() {
        return projectRepository.findByStatus(Project.Status.OPEN_FOR_BIDS)
                .stream()
                .map(p -> toResponse(p, null))
                .collect(Collectors.toList());
    }

    public List<ProjectDto.Response> getNearbyProjects(double lat, double lng) {
        // Uses native Haversine query; rows are [project columns..., distance]
        List<Object[]> rows = projectRepository.findNearbyProjectsRaw(lat, lng);
        return rows.stream().map(row -> {
            Long id = ((Number) row[0]).longValue();
            Project p = projectRepository.findById(id).orElse(null);
            if (p == null)
                return null;
            Double dist = ((Number) row[row.length - 1]).doubleValue();
            return toResponse(p, dist);
        }).filter(r -> r != null).collect(Collectors.toList());
    }

    public List<ProjectDto.Response> getProjectsByCategory(String category) {
        return projectRepository.findByCategory(category)
                .stream().map(p -> toResponse(p, null)).collect(Collectors.toList());
    }

    public List<ProjectDto.Response> getMyProjects() {
        User owner = userService.getCurrentUser();
        return projectRepository.findByOwnerId(owner.getId())
                .stream().map(p -> toResponse(p, null)).collect(Collectors.toList());
    }

    public ProjectDto.Response getById(Long id) {
        Project p = projectRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Project not found: " + id));
        return toResponse(p, null);
    }

    @Transactional
    public ProjectDto.Response createProject(ProjectDto.Request req) {
        User owner = userService.getCurrentUser();
        Project p = Project.builder()
                .title(req.getTitle())
                .description(req.getDescription())
                .category(req.getCategory())
                .budget(req.getBudget())
                .timelineDays(req.getTimelineDays())
                .location(req.getLocation())
                .lat(req.getLat())
                .lng(req.getLng())
                .deadline(req.getDeadline())
                .ownerId(owner.getId())
                .status(Project.Status.OPEN_FOR_BIDS)
                .build();
        p = projectRepository.save(p);
        // Increment projectsPosted counter
        ownerProfileRepository.findById(owner.getId()).ifPresent(op -> {
            op.setProjectsPosted(op.getProjectsPosted() + 1);
            ownerProfileRepository.save(op);
        });
        return toResponse(p, null);
    }

    @Transactional
    public ProjectDto.Response updateProject(Long id, ProjectDto.Request req) {
        Project p = projectRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Project not found"));
        if (req.getTitle() != null)
            p.setTitle(req.getTitle());
        if (req.getDescription() != null)
            p.setDescription(req.getDescription());
        if (req.getCategory() != null)
            p.setCategory(req.getCategory());
        if (req.getBudget() > 0)
            p.setBudget(req.getBudget());
        if (req.getTimelineDays() > 0)
            p.setTimelineDays(req.getTimelineDays());
        if (req.getLocation() != null)
            p.setLocation(req.getLocation());
        if (req.getLat() != null)
            p.setLat(req.getLat());
        if (req.getLng() != null)
            p.setLng(req.getLng());
        if (req.getDeadline() != null)
            p.setDeadline(req.getDeadline());
        return toResponse(projectRepository.save(p), null);
    }

    @Transactional
    public ProjectDto.Response updateProgress(Long id, ProjectDto.ProgressRequest req) {
        Project p = projectRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Project not found"));
        p.setProgress(req.getProgress());
        if (req.getStatus() != null)
            p.setStatus(req.getStatus());
        return toResponse(projectRepository.save(p), null);
    }

    public void deleteProject(Long id) {
        projectRepository.deleteById(id);
    }

    // ── DTO Mapper ─────────────────────────────────────────────────────────
    public ProjectDto.Response toResponse(Project p, Double distanceKm) {
        ProjectDto.Response r = new ProjectDto.Response();
        r.setId(p.getId());
        r.setTitle(p.getTitle());
        r.setDescription(p.getDescription());
        r.setCategory(p.getCategory());
        r.setBudget(p.getBudget());
        r.setTimelineDays(p.getTimelineDays());
        r.setLocation(p.getLocation());
        r.setLat(p.getLat());
        r.setLng(p.getLng());
        r.setStatus(p.getStatus().name());
        r.setOwnerId(p.getOwnerId());
        r.setProgress(p.getProgress());
        r.setDeadline(p.getDeadline());
        r.setDistanceKm(distanceKm);
        r.setBidCount((int) bidRepository.findByProjectId(p.getId()).size());
        r.setPostedAt(formatRelative(p.getCreatedAt()));
        userRepository.findById(p.getOwnerId()).ifPresent(u -> r.setOwnerName(u.getName()));
        return r;
    }

    private String formatRelative(LocalDateTime dt) {
        if (dt == null)
            return "";
        long hours = java.time.Duration.between(dt, LocalDateTime.now()).toHours();
        if (hours < 24)
            return hours + " hours ago";
        long days = hours / 24;
        return days + " day" + (days > 1 ? "s" : "") + " ago";
    }
}
