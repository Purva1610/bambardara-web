package com.bambardara.demo.rbac;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertTrue;

import java.time.LocalDate;
import java.util.List;
import java.util.UUID;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.transaction.annotation.Transactional;

import com.bambardara.demo.auth.entity.User;
import com.bambardara.demo.auth.repository.UserRepository;
import com.bambardara.demo.rbac.dto.AuditLogResponse;
import com.bambardara.demo.rbac.service.AuditLogService;

/**
 * GET /api/super-admin/audit-logs' filtering and default newest-first
 * ordering, exercised directly against the service (and therefore the real
 * Specification -> SQL path, see AuditLogSpecifications).
 */
@SpringBootTest
@Transactional
class AuditLogSearchServiceTest {

    @Autowired
    private AuditLogService auditLogService;

    @Autowired
    private UserRepository userRepository;

    private final String marker = UUID.randomUUID().toString().substring(0, 8);

    private Pageable newestFirst(int size) {
        return PageRequest.of(0, size, Sort.by(Sort.Direction.DESC, "createdAt"));
    }

    private User persistActor(String label) {
        String subject = "audit-search-actor-" + UUID.randomUUID();
        User user = User.forKeycloakSubject(subject, "Audit Actor " + label + " " + marker, subject + "@keycloak.local");
        return userRepository.saveAndFlush(user);
    }

    private void seedLogs() {

        User actorA = persistActor("A");
        User actorB = persistActor("B");

        auditLogService.record(actorA, "TEST_ACTION_ONE-" + marker, "ROLE", "1", null, "x", "first");
        auditLogService.record(actorA, "TEST_ACTION_TWO-" + marker, "USER", "2", null, "y", "second");
        auditLogService.record(actorB, "TEST_ACTION_ONE-" + marker, "ROLE_MODULE", "3", null, "z", "third");
    }

    @Test
    void search_byActionSubstring_returnsMatchingLogsOnly() {

        seedLogs();

        Page<AuditLogResponse> page =
                auditLogService.search(null, "TEST_ACTION_ONE-" + marker, null, null, null, newestFirst(10));

        assertEquals(2, page.getTotalElements());
        assertTrue(page.getContent().stream().allMatch(l -> l.getAction().contains("TEST_ACTION_ONE-" + marker)));
    }

    @Test
    void search_byModule_filtersOnTargetType() {

        seedLogs();

        Page<AuditLogResponse> page = auditLogService.search(null, marker, "USER", null, null, newestFirst(10));

        assertEquals(1, page.getTotalElements());
        assertEquals("USER", page.getContent().get(0).getTargetType());
    }

    @Test
    void search_byActorNameSubstring_returnsOnlyThatActorsLogs() {

        seedLogs();

        Page<AuditLogResponse> page = auditLogService.search("Audit Actor B " + marker, marker, null, null, null, newestFirst(10));

        assertEquals(1, page.getTotalElements());
        assertEquals("ROLE_MODULE", page.getContent().get(0).getTargetType());
    }

    @Test
    void results_areOrderedNewestFirst() {

        seedLogs();

        List<AuditLogResponse> content = auditLogService.search(null, marker, null, null, null, newestFirst(10)).getContent();

        assertEquals(3, content.size());
        for (int i = 0; i < content.size() - 1; i++) {
            assertTrue(!content.get(i).getCreatedAt().isBefore(content.get(i + 1).getCreatedAt()),
                    "Each entry should not be older than the one after it");
        }
    }

    @Test
    void dateRange_excludesLogsOutsideIt() {

        seedLogs();

        LocalDate tomorrow = LocalDate.now().plusDays(1);

        Page<AuditLogResponse> future = auditLogService.search(null, marker, null, tomorrow, null, newestFirst(10));
        assertEquals(0, future.getTotalElements());

        Page<AuditLogResponse> today =
                auditLogService.search(null, marker, null, LocalDate.now(), LocalDate.now(), newestFirst(10));
        assertEquals(3, today.getTotalElements());
    }

    @Test
    void pagination_respectsPageSize() {

        seedLogs();

        Page<AuditLogResponse> firstPage = auditLogService.search(null, marker, null, null, null,
                PageRequest.of(0, 2, Sort.by(Sort.Direction.DESC, "createdAt")));

        assertEquals(2, firstPage.getContent().size());
        assertEquals(3, firstPage.getTotalElements());
        assertEquals(2, firstPage.getTotalPages());
    }
}
