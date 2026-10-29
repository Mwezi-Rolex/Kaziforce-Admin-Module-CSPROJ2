---
tags:
  - "#ics410XCSIInote"
links:
  - "[[ICS 410X CS Project II Notes MOC]]"
Created: 2026-09-10
Platform: Physical (LT 1)
---
# Diagrams used in the report
## Claude Use case diagram
```plantuml
@startuml

left to right direction

actor Viewer
actor Moderator
actor "Super Admin" as SuperAdmin

Viewer <|-- Moderator
Moderator <|-- SuperAdmin

rectangle "Admin and Moderation System" {

    usecase "Login / Authenticate" as UC0
    usecase "View Dashboard Analytics" as UC1
    usecase "Search / Filter Audit Log" as UC2
    usecase "Export Audit Log CSV" as UC2b
    usecase "Review Moderation Queue" as UC3
    usecase "Approve Content" as UC4
    usecase "Reject Content" as UC5
    usecase "Escalate Content" as UC6
    usecase "Suspend User Account" as UC7
    usecase "Assign Role" as UC8
    usecase "Permanently Ban Account" as UC9
    usecase "Modify System Settings" as UC10
}

Viewer --> UC0
Viewer --> UC1
Viewer --> UC2

UC2b ..> UC2 : <<extend>>

Moderator --> UC3
Moderator --> UC4
Moderator --> UC5
Moderator --> UC6
Moderator --> UC7

SuperAdmin --> UC8
SuperAdmin --> UC9
SuperAdmin --> UC10

@enduml
```
## ChatGPT Sequence Diagram
```plantuml
@startuml
title Admin and Moderation System - Moderation Sequence Diagram

autonumber

actor Moderator
participant "React Admin UI" as UI
participant "Node.js / Express API" as API
participant "JWT Middleware" as JWT
participant "RBAC Middleware" as RBAC
participant "ModerationEngine" as ME
database "PostgreSQL" as DB
participant "AuditLogger" as AL


== Load Moderation Queue ==

Moderator -> UI: Open moderation queue

UI -> API: GET /moderation/queue

API -> JWT: Validate JWT

alt JWT valid
    JWT --> API: Token valid

    API -> RBAC: Verify operator role

    alt Role authorized
        RBAC --> API: Access granted

        API -> ME: Request prioritized moderation queue
        ME -> DB: Query flagged content
        DB --> ME: Return flagged items
        ME --> API: Return moderation queue
        API --> UI: HTTP 200 + queue data
        UI --> Moderator: Display moderation queue

    else Role unauthorized
        RBAC --> API: Access denied
        API --> UI: HTTP 403 Forbidden
        UI --> Moderator: Display access denied
    end

else JWT invalid or missing
    JWT --> API: Authentication failed
    API --> UI: HTTP 401 Unauthorized
    UI --> Moderator: Display authentication error
end


== Resolve Flagged Content ==

loop While moderation items remain

    Moderator -> UI: Select flagged item
    UI --> Moderator: Display content and metadata

    Moderator -> UI: Choose moderation decision
    UI -> API: POST /moderation/{flagId}/decision

    API -> JWT: Validate JWT
    JWT --> API: Token valid

    API -> RBAC: Verify operator role

    alt Role authorized
        RBAC --> API: Access granted

        API -> ME: Process moderation decision

        alt Approve Content
            ME -> DB: Update flag/content status to APPROVED
            DB --> ME: State updated

        else Reject Content
            ME -> DB: Update flag/content status to REJECTED
            DB --> ME: State updated

        else Escalate Content
            ME -> DB: Update flag status to ESCALATED
            DB --> ME: State updated
        end

        ME -> AL: Record administrative action
        AL -> DB: INSERT audit log event
        DB --> AL: Audit event persisted
        AL --> ME: Audit logging successful

        ME --> API: Moderation action completed
        API --> UI: HTTP 200 + result
        UI --> Moderator: Display success confirmation

    else Role unauthorized
        RBAC --> API: Access denied
        API --> UI: HTTP 403 Forbidden
        UI --> Moderator: Display access denied
    end

end

@enduml
```
## Grok Class Diagram
```plantuml

@startuml Class_Diagram_Admin_Moderation
title Admin and Moderation System - Class Diagram (Figure 4.4)

' ======================
' Core Logic / Controller Classes
' ======================

class AuthController {
  - jwtSecret : String
  - tokenExpiry : Number
  --
  + login(email : String, password : String) : JWT
  + verifyJWT(token : String) : TokenClaims
  + refreshToken(token : String) : JWT
  - hashPassword(rawPassword : String) : String
}

class UserAccountManager {
  - db : Database
  --
  + searchUsers(query : String, page : Int, limit : Int) : PaginatedResult<User>
  + getUserById(id : UUID) : User
  + suspendUser(userId : UUID, actorId : UUID) : void
  + banUser(userId : UUID, actorId : UUID) : void
  + assignRole(userId : UUID, roleId : UUID, actorId : UUID) : void
  + bulkMutateStatus(userIds : List<UUID>, status : String, actorId : UUID) : Boolean
}

class ModerationEngine {
  - db : Database
  --
  + getPrioritizedQueue(severityFilter : String, page : Int) : PaginatedResult<ContentFlag>
  + getFlagById(id : UUID) : ContentFlag
  + processDecision(flagId : UUID, decision : String, actorId : UUID) : void
  + bulkResolveFlags(flagIds : List<UUID>, action : String, actorId : UUID) : Boolean
}

class AuditLogger {
  - db : Database
  --
  + writeEvent(actorId : UUID, action : String, targetId : UUID, meta : Object) : void
  + searchAuditTrail(filters : LogFilter, page : Int) : PaginatedResult<AuditEvent>
  - formatJSONPayload(event : AuditPayload) : String
}

class SettingsController {
  - db : Database
  --
  + getSettings() : List<SystemSetting>
  + getSetting(key : String) : SystemSetting
  + updateSetting(key : String, value : String, actorId : UUID) : void
}

' ======================
' Domain / Data Classes
' ======================

class User {
  + id : UUID
  + email : String
  + role : String
  + status : String
  + createdAt : DateTime
  --
  + getters / setters
}

class ContentFlag {
  + id : UUID
  + contentId : UUID
  + reporterId : UUID
  + severity : String
  + status : String
  + createdAt : DateTime
  --
  + getters / setters
}

class AuditEvent {
  + id : UUID
  + actorId : UUID
  + actionType : String
  + targetId : UUID
  + meta : Object
  + createdAt : DateTime
  --
  + getters / setters
}

class SystemSetting {
  + key : String
  + value : String
  + updatedAt : DateTime
  + updatedBy : UUID
  --
  + getters / setters
}

' ======================
' Relationships
' ======================

' All operational classes depend on AuditLogger
AuthController ..> AuditLogger : «uses»
UserAccountManager ..> AuditLogger : «uses»
ModerationEngine ..> AuditLogger : «uses»
SettingsController ..> AuditLogger : «uses»

' Domain entities manipulated by the managers
UserAccountManager ..> User : manipulates
ModerationEngine ..> ContentFlag : manipulates
AuditLogger ..> AuditEvent : creates
SettingsController ..> SystemSetting : manipulates

note right of AuditLogger
  Cross-cutting service.
  Every state-changing operation
  must invoke writeEvent().
  Database enforces INSERT-only
  constraint on audit_log table.
end note

@enduml
```
## claude entity-relationship diagram
```mermaid
erDiagram
    users ||--o{ flags : "reports"
    users }o--o{ roles : "user_roles"
    roles }o--o{ permissions : "role_permissions"
    content_items ||--o{ flags : "targets"
    users ||--o{ audit_log : "acts as (no cascade delete)"

    users {
        uuid id PK
        string email UK
        string password_hash
        boolean is_deleted
        timestamp created_at
    }

    roles {
        uuid id PK
        string name
    }

    permissions {
        uuid id PK
        string name
        string resource_type
    }

    role_permissions {
        uuid role_id PK FK
        uuid permission_id PK FK
    }

    user_roles {
        uuid user_id PK FK
        uuid role_id PK FK
    }

    content_items {
        uuid id PK
        string content_type
        uuid owner_id FK
        timestamp created_at
    }

    flags {
        uuid id PK
        uuid content_item_id FK
        uuid reported_by FK
        string severity
        string flag_status
        timestamp created_at
    }

    audit_log {
        uuid id PK
        uuid operator_id FK
        string action_type
        string target_entity_type
        uuid target_entity_id
        timestamp created_at
    }

    system_settings {
        string key PK
        string value
        timestamp updated_at
    }
```
## claude activity
```mermaid
flowchart TD
    subgraph System["System / Ingestion"]
        A([Start: Content flagged]) --> B[Ingest flag payload]
        B --> C[Apply rule-based severity scoring]
        C --> D[Enqueue in moderation queue]
    end

    subgraph Mod["Moderator Workflow"]
        D --> E[Operator reviews queued item]
        E --> F{Decision}
        F -->|Approve| G[Set Flag & Content: Approved]
        F -->|Reject| H[Set Content: Suspended]
        F -->|Escalate| I[Transfer to Super Admin queue]
    end

    subgraph SA["Super Admin Workflow"]
        I --> J[Conduct review]
        J --> K{Resolution}
        K -->|Overrule| L[Set Flag & Content: Approved]
        K -->|Uphold & Ban| M[Set User: Terminated]
    end

    subgraph Sys2["Transactional Persistence Layer"]
        G --> N[BEGIN TRANSACTION]
        H --> N
        L --> N
        M --> N
        N --> O[Execute SQL State Mutation]
        O --> P[INSERT INTO audit_log]
        P --> Q[COMMIT TRANSACTION]
        Q --> R([End: State Persisted & Audited])
    end
```
## claude system architecture
```mermaid
flowchart TB
    subgraph Internet["Public Internet"]
        A[React.js SPA<br/>Client Browser]
    end

    subgraph VPS["Azure Virtual Private Server"]
        subgraph Edge["Edge / Nginx :443"]
            B[TLS 1.2/1.3 Termination]
            C[Load Distribution]
            D[Security Header Injection]
        end

        subgraph AppLayer["Node.js / Express :3000<br/>(loopback 127.0.0.1)"]
            E[Auth Middleware]
            F[Rate-Limiting Middleware]
            G[RBAC Middleware]
            H[Controller Logic]
        end

        subgraph DataLayer["PostgreSQL :5432<br/>(localhost)"]
            I[(Relational Store)]
            J[Row-Level Security]
            K[audit_log — INSERT-only]
        end
    end

    A -->|HTTPS 443| B
    B --> C --> D
    D -->|HTTP 3000, internal loopback| E
    E --> F --> G --> H
    H -->|PG wire protocol 5432, localhost| I
    I --> J
    I --> K
```

