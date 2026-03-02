package com.labourhand.model;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "bids")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Bid {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "project_id", nullable = false)
    private Long projectId;

    @Column(name = "worker_id", nullable = false)
    private Long workerId;

    @Column(nullable = false)
    private long amount; // bid amount in INR

    @Column(name = "estimated_days", nullable = false)
    private int estimatedDays;

    @Column(columnDefinition = "TEXT")
    private String message;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private Status status = Status.PENDING;

    private boolean recommended = false;

    @Column(name = "submitted_at")
    private LocalDateTime submittedAt = LocalDateTime.now();

    public enum Status {
        PENDING,
        ACCEPTED,
        REJECTED
    }
}
