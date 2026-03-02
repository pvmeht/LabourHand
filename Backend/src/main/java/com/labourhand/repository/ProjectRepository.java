package com.labourhand.repository;

import com.labourhand.model.Project;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import java.util.List;

public interface ProjectRepository extends JpaRepository<Project, Long> {

    List<Project> findByOwnerId(Long ownerId);

    List<Project> findByStatus(Project.Status status);

    List<Project> findByCategory(String category);

    List<Project> findByOwnerIdAndStatus(Long ownerId, Project.Status status);

    // Returns all open projects sorted by distance from given lat/lng (Haversine
    // approximation)
    @Query(value = """
            SELECT *, (
                6371 * ACOS(
                    COS(RADIANS(:lat)) * COS(RADIANS(lat)) *
                    COS(RADIANS(lng) - RADIANS(:lng)) +
                    SIN(RADIANS(:lat)) * SIN(RADIANS(lat))
                )
            ) AS distance
            FROM projects
            WHERE status = 'OPEN_FOR_BIDS'
            ORDER BY distance ASC
            LIMIT 50
            """, nativeQuery = true)
    List<Object[]> findNearbyProjectsRaw(@Param("lat") double lat, @Param("lng") double lng);
}
