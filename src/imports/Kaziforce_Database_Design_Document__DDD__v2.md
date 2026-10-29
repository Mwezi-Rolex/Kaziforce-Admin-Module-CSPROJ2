**Kaziforce Database Design Document (DDD)**

**Table of Contents**

**1\. Introduction**

**1.1 Purpose**  
**1.2 Scope**  
**1.3 Objectives**  
**1.4 Intended Audience**  
**1.5 Document Structure**  
**1.6 References**  
**1.7 Definitions, Terms and Acronyms**  
**1.8 Design Principles**  
**1.9 Database Design Methodology**  
**1.10 Relationship to SRS and Technical Design Document**

**Part I — Database Architecture**

**2\. Database Architecture Overview**

**2.1 Overall Database Architecture**  
**2.2 Database Design Goals**  
**2.3 Database Technology Stack**  
**2.4 Polyglot Persistence Strategy**  
**2.5 Multi-Database Architecture**  
**2.6 Data Flow Across Services**  
**2.7 Data Ownership Model**  
**2.8 Bounded Context Data Separation**  
**2.9 CQRS Data Architecture**  
**2.10 Event Sourcing Architecture**  
**2.11 AI Data Architecture**  
**2.12 Data Lake Architecture**  
**2.13 Data Warehouse Architecture**  
**2.14 Knowledge Graph Architecture**  
**2.15 High-Level Database Deployment Architecture**

**3\. Database Technology Selection**

**3.1 PostgreSQL Design**  
**3.2 MongoDB Design**  
**3.3 Redis Design**  
**3.4 OpenSearch / Elasticsearch Design**  
**3.5 Neo4j Graph Database**  
**3.6 ClickHouse Analytics Database**  
**3.7 Object Storage Design**  
**3.8 Vector Database Strategy**  
**3.9 Database Selection Matrix**  
**3.10 Technology Decision Rationale**

**Part II — Enterprise Data Model**

**4\. Enterprise Data Model**

**4.1 Enterprise Data Domains**  
**4.2 Canonical Data Model**  
**4.3 Master Data Model**  
**4.4 Shared Reference Data**  
**4.5 Entity Classification**  
**4.6 Aggregate Roots**  
**4.7 Domain Relationships**  
**4.8 Cross-Service Data Dependencies**  
**4.9 Data Ownership Matrix**  
**4.10 Enterprise Entity Relationship Overview (ERD)**

**Part III — Microservice Database Designs**

**5\. Identity & Access Management Database**

**5.1 Overview**  
**5.2 Entity Relationship Diagram**  
**5.3 Core Tables**  
**5.4 Authentication Data Model**  
**5.5 Authorization Model**  
**5.6 Roles & Permissions**  
**5.7 MFA Data**  
**5.8 OAuth & SSO**  
**5.9 Sessions**  
**5.10 API Keys**  
**5.11 Security Constraints**  
**5.12 Indexing Strategy**  
**5.13 Partitioning Strategy**

**6\. Organization Management Database**

**6.1 Organizations**  
**6.2 Departments**  
**6.3 Teams**  
**6.4 Branches**  
**6.5 Business Units**  
**6.6 Organization Hierarchy**  
**6.7 Enterprise Relationships**  
**6.8 ERD**  
**6.9 Constraints**  
**6.10 Indexes**

**7\. User Profile Database**

**7.1 Professional Profiles**  
**7.2 Skills**  
**7.3 Certifications**  
**7.4 Licenses**  
**7.5 Languages**  
**7.6 Education**  
**7.7 Work Experience**  
**7.8 Portfolio**  
**7.9 Career Preferences**  
**7.10 Availability**  
**7.11 AI Profile Data**  
**7.12 Resume Storage**  
**7.13 Profile Search Model**  
**7.14 ERD**

**8\. Workforce Marketplace Database**

**8.1 Jobs**  
**8.2 Projects**  
**8.3 Engagement Models**  
**8.4 Applications**  
**8.5 Talent Matching**  
**8.6 Contracts**  
**8.7 Hiring Pipeline**  
**8.8 Offers**  
**8.9 Negotiations**  
**8.10 Marketplace Analytics**  
**8.11 ERD**

**9\. AI Matching Engine Database**

**9.1 Matching Profiles**  
**9.2 AI Features**  
**9.3 Embeddings**  
**9.4 Ranking Scores**  
**9.5 Recommendation History**  
**9.6 Feature Store**  
**9.7 AI Model Metadata**  
**9.8 Vector Indexes**  
**9.9 Semantic Search**  
**9.10 ERD**

**10\. Workforce Engagement Database**

**10.1 Activities**  
**10.2 Comments**  
**10.3 Reactions**  
**10.4 Shares**  
**10.5 Saves**  
**10.6 Feeds**  
**10.7 Trending Engine**  
**10.8 Content Moderation**  
**10.9 AI Feed Ranking**  
**10.10 ERD**

**11\. Messaging Database**

**11.1 Conversations**  
**11.2 Messages**  
**11.3 Attachments**  
**11.4 Read Receipts**  
**11.5 Typing Indicators**  
**11.6 Presence**  
**11.7 Message Search**  
**11.8 Message Retention**  
**11.9 Chat Analytics**  
**11.10 ERD**

**12\. Voice & Video Database**

**12.1 Calls**  
**12.2 Meetings**  
**12.3 Participants**  
**12.4 Call Recordings**  
**12.5 Live Sessions**  
**12.6 Streaming Metadata**  
**12.7 AI Meeting Insights**  
**12.8 ERD**

**13\. Notification Database**

**13.1 Notification Templates**  
**13.2 Delivery Channels**  
**13.3 User Preferences**  
**13.4 Delivery Logs**  
**13.5 Retry Queue**  
**13.6 Push Tokens**  
**13.7 Notification Analytics**  
**13.8 ERD**

**14\. Calendar & Scheduling Database**

**15\. Time Tracking Database**

**16\. Workforce Management Database**

**17\. HR Management Database**

**18\. Learning Management Database**

**19\. Certification & Credential Database**

**20\. AI Agent Database**

**21\. AI Memory Database**

**22\. Knowledge Base Database**

**23\. CRM Database**

**24\. Customer Support Database**

**25\. Finance & Wallet Database**

**25.1 Wallets**  
**25.2 Ledger**  
**25.3 Transactions**  
**25.4 Escrow**  
**25.5 Payments**  
**25.6 Payouts**  
**25.7 Billing**  
**25.8 Invoices**  
**25.9 Tax Records**  
**25.10 Financial Audits**  
**25.11 ERD**

**26\. Subscription & Licensing Database**

**27\. Analytics Database**

**28\. Audit & Compliance Database**

**Part IV — Data Engineering**

**29\. Entity Relationship Models**

**29.1 Enterprise ERD**  
**29.2 Service-Level ERDs**  
**29.3 Cross-Service Relationships**  
**29.4 Physical Data Models**

**30\. Field-Level Specifications**

**30.1 Naming Standards**  
**30.2 Data Types**  
**30.3 Default Values**  
**30.4 Constraints**  
**30.5 Enumerations**  
**30.6 Validation Rules**  
**30.7 Generated Fields**  
**30.8 Audit Fields**

**31\. Database Constraints**

**31.1 Primary Keys**  
**31.2 Foreign Keys**  
**31.3 Unique Constraints**  
**31.4 Check Constraints**  
**31.5 Exclusion Constraints**  
**31.6 Cascading Rules**

**32\. Indexing Strategy**

**32.1 B-Tree Indexes**  
**32.2 Hash Indexes**  
**32.3 Composite Indexes**  
**32.4 Partial Indexes**  
**32.5 Covering Indexes**  
**32.6 GIN Indexes**  
**32.7 BRIN Indexes**  
**32.8 Full-Text Indexes**  
**32.9 Vector Indexes**

**33\. Database Performance Design**

**33.1 Query Optimization**  
**33.2 Execution Plans**  
**33.3 Materialized Views**  
**33.4 Read Models**  
**33.5 Denormalization Strategy**  
**33.6 Connection Pooling**  
**33.7 Database Benchmark Targets**

**34\. Partitioning & Sharding**

**34.1 Horizontal Partitioning**  
**34.2 Vertical Partitioning**  
**34.3 Time-Based Partitioning**  
**34.4 Hash Partitioning**  
**34.5 Geo Partitioning**  
**34.6 Sharding Strategy**

**35\. Replication & High Availability**

**35.1 Replication Models**  
**35.2 Multi-Region Deployment**  
**35.3 Failover Strategy**  
**35.4 Read Replicas**  
**35.5 Disaster Recovery**

**36\. Caching Strategy**

**36.1 Redis Architecture**  
**36.2 Cache Keys**  
**36.3 TTL Policies**  
**36.4 Cache Invalidation**  
**36.5 Distributed Cache**

**37\. Search Architecture**

**37.1 Full-Text Search**  
**37.2 Semantic Search**  
**37.3 Vector Search**  
**37.4 AI Search**  
**37.5 Search Index Lifecycle**

**38\. Graph Database Design**

**38.1 Node Types**  
**38.2 Relationships**  
**38.3 Graph Queries**  
**38.4 Recommendation Graph**

**39\. Analytics Database Design**

**39.1 Fact Tables**  
**39.2 Dimension Tables**  
**39.3 Star Schema**  
**39.4 Snowflake Schema**  
**39.5 OLAP Design**  
**39.6 Materialized Views**

**Part V — Security & Governance**

**40\. Database Security**

**40.1 Encryption at Rest**  
**40.2 Encryption in Transit**  
**40.3 Key Management**  
**40.4 Row-Level Security**  
**40.5 Column-Level Security**  
**40.6 Dynamic Data Masking**  
**40.7 Secrets Management**  
**40.8 Access Control**

**41\. Compliance & Privacy**

**41.1 GDPR**  
**41.2 ISO 27001**  
**41.3 SOC 2**  
**41.4 PCI DSS**  
**41.5 Data Residency**  
**41.6 Consent Management**  
**41.7 Right to Erasure**  
**41.8 Retention Policies**

**42\. Data Governance**

**42.1 Master Data Management**  
**42.2 Metadata Management**  
**42.3 Data Lineage**  
**42.4 Data Catalog**  
**42.5 Data Stewardship**  
**42.6 Data Quality Framework**

**43\. Backup & Recovery**

**43.1 Backup Strategy**  
**43.2 Point-in-Time Recovery**  
**43.3 Snapshots**  
**43.4 Archive Storage**  
**43.5 Recovery Procedures**

**44\. Database Monitoring & Observability**

**44.1 Health Monitoring**  
**44.2 Performance Metrics**  
**44.3 Slow Query Monitoring**  
**44.4 Capacity Monitoring**  
**44.5 Alerting**  
**44.6 Database Dashboards**

**Part VI — Implementation**

**45\. Database DevSecOps**

**45.1 Schema Versioning**  
**45.2 Flyway/Liquibase**  
**45.3 CI/CD Integration**  
**45.4 Rollback Strategy**  
**45.5 Migration Testing**

**46\. Database Testing Strategy**

**46.1 Unit Testing**  
**46.2 Integration Testing**  
**46.3 Performance Testing**  
**46.4 Failover Testing**  
**46.5 Security Testing**  
**46.6 Data Integrity Testing**

**47\. Capacity Planning**

**47.1 Storage Estimates**  
**47.2 Growth Projections**  
**47.3 Database Sizing**  
**47.4 Scaling Strategy**

**48\. Database Design Traceability**

**48.1 Mapping DDD to SRS**  
**48.2 Mapping DDD to Technical Design Document**  
**48.3 Database Traceability Matrix**  
**48.4 Requirement Coverage Analysis**

**49\. Future Database Roadmap**

**49.1 Autonomous Database Operations**  
**49.2 AI-Native Databases**  
**49.3 Knowledge Graph Expansion**  
**49.4 Global Data Fabric**  
**49.5 Federated Learning Data Stores**  
**49.6 Digital Identity Ledger**  
**49.7 Blockchain Credential Storage**  
**49.8 Enterprise Data Mesh**

**Appendices**

**50\. Appendices**

**50.1 Complete Data Dictionary**  
**50.2 Table Catalog**  
**50.3 Column Catalog**  
**50.4 Database Naming Standards**  
**50.5 SQL Standards**  
**50.6 Database Configuration Matrix**  
**50.7 Storage Estimation Matrix**  
**50.8 Index Catalog**  
**50.9 Constraint Catalog**  
**50.10 Database Event Catalog**  
**50.11 Sample SQL Scripts**  
**50.12 Migration Scripts**  
**50.13 Glossary**  
**50.14 Acronyms**  
**50.15 References**

**1\. Introduction**

**1.1 Purpose**

The purpose of this Database Design Document (DDD) is to define the logical, physical, and operational database architecture for the Kaziforce platform. It serves as the authoritative technical specification for the design, implementation, deployment, optimization, governance, and maintenance of all data stores that support the platform's business capabilities.

This document translates the functional and non-functional requirements defined in the Software Requirements Specification (SRS) and the architectural decisions documented in the Technical Design Document (TDD) into a comprehensive database blueprint. It establishes how business entities, relationships, transactions, events, and analytical workloads are represented, stored, secured, and managed across the platform.

The DDD provides implementation guidance for a polyglot persistence architecture that leverages multiple database technologies, each selected according to its strengths and the characteristics of the data it manages. It specifies data models, schemas, indexing strategies, partitioning, replication, security controls, caching, search capabilities, analytics structures, and lifecycle management.

The objectives of this document are to:

-   Define the enterprise-wide data model for Kaziforce.
-   Establish standardized database design principles across all microservices.
-   Specify logical and physical schemas for every functional domain.
-   Ensure consistency of data structures across services.
-   Support scalability for millions of users, organizations, projects, and AI agents.
-   Enable high-performance transactional and analytical workloads.
-   Support secure, compliant, and auditable data management.
-   Provide a foundation for API design, event-driven communication, and reporting.
-   Enable efficient implementation by database engineers, backend developers, DevOps engineers, AI engineers, and system architects.
-   Serve as the primary reference for database evolution throughout the platform lifecycle.

**1.2 Scope**

This document covers the complete database architecture of the Kaziforce platform, including all logical, physical, operational, and governance aspects of enterprise data management.

The scope includes:

**Enterprise Data Architecture**

-   Enterprise data domains
-   Canonical data model
-   Master data management
-   Shared reference data
-   Cross-service data ownership
-   Data lifecycle management

**Microservice Databases**

Database designs for all platform services, including:

-   Identity and Access Management
-   Organization Management
-   User Profile Management
-   Workforce Marketplace
-   AI Matching Engine
-   AI Agent Services
-   AI Memory
-   Messaging
-   Voice and Video
-   Notifications
-   Calendar and Scheduling
-   Workforce Management
-   Human Resource Management
-   Time Tracking
-   Finance and Wallet
-   Billing and Subscription
-   Learning Management
-   Certifications and Credentials
-   CRM
-   Customer Support
-   Knowledge Base
-   Analytics
-   Audit and Compliance

**Database Technologies**

The document defines the use of:

-   PostgreSQL
-   MongoDB
-   Redis
-   OpenSearch / Elasticsearch
-   Neo4j
-   ClickHouse
-   Object Storage
-   Vector Database technologies

**Database Engineering**

The document includes:

-   Logical data models
-   Physical schemas
-   Entity relationship diagrams
-   Field specifications
-   Constraints
-   Keys
-   Relationships
-   Indexes
-   Views
-   Materialized views
-   Stored procedures where applicable
-   Triggers
-   Partitioning
-   Sharding
-   Replication
-   Backup
-   Disaster recovery
-   Performance optimization

**Data Governance**

The document also specifies:

-   Security architecture
-   Data privacy
-   Encryption
-   Data retention
-   Audit logging
-   Compliance
-   Monitoring
-   Data quality
-   Metadata management
-   Database DevSecOps
-   Capacity planning
-   Migration strategies

This document does not define business processes, application workflows, user interfaces, API contracts, or service implementation logic except where they directly influence database design.

**1.3 Objectives**

The primary objectives of this Database Design Document are to establish a secure, scalable, resilient, and maintainable enterprise data platform capable of supporting Kaziforce's AI-powered workforce ecosystem.

The specific objectives are to:

-   Define a consistent enterprise data architecture across all services.
-   Establish normalized and optimized database schemas.
-   Support Domain-Driven Design (DDD) bounded contexts.
-   Enable Event-Driven Architecture through reliable event persistence.
-   Support Command Query Responsibility Segregation (CQRS).
-   Enable efficient transactional processing.
-   Support large-scale analytical workloads.
-   Provide optimized search capabilities.
-   Support AI model training, inference, and feature storage.
-   Enable semantic and vector search.
-   Support graph-based professional relationship analysis.
-   Minimize data duplication while maintaining service autonomy.
-   Provide strong referential integrity.
-   Ensure high availability and fault tolerance.
-   Enable global multi-region deployment.
-   Support multi-tenant SaaS architecture.
-   Ensure regulatory compliance.
-   Facilitate disaster recovery and business continuity.
-   Support future platform evolution without major schema redesign.

**1.4 Intended Audience**

This document is intended for technical and business stakeholders responsible for designing, implementing, operating, securing, and maintaining the Kaziforce platform.

Primary audiences include:

**Executive Leadership**

-   Chief Technology Officer (CTO)
-   Chief Information Officer (CIO)
-   Chief Data Officer (CDO)
-   Enterprise Architecture Committee

**Architecture Teams**

-   Enterprise Architects
-   Solution Architects
-   Software Architects
-   Data Architects
-   Cloud Architects
-   AI Architects
-   Security Architects

**Engineering Teams**

-   Backend Engineers
-   Database Engineers
-   Data Engineers
-   AI Engineers
-   Machine Learning Engineers
-   DevOps Engineers
-   Site Reliability Engineers
-   Platform Engineers

**Quality Assurance**

-   QA Engineers
-   Database Test Engineers
-   Performance Engineers
-   Security Testing Teams

**Operations Teams**

-   Database Administrators (DBAs)
-   Infrastructure Engineers
-   Cloud Operations Engineers
-   Production Support Teams

**Governance Teams**

-   Information Security Teams
-   Compliance Officers
-   Risk Management Teams
-   Internal Auditors
-   Data Governance Teams

**Business Stakeholders**

-   Product Managers
-   Business Analysts
-   Project Managers
-   Technical Consultants
-   Integration Partners

**1.5 Document Structure**

This Database Design Document is organized into six major parts, each covering a specific aspect of the Kaziforce data architecture.

**Part I – Database Architecture** defines the overall database strategy, technology stack, polyglot persistence model, deployment architecture, and design principles.

**Part II – Enterprise Data Model** establishes the canonical enterprise data model, master data domains, ownership boundaries, and enterprise entity relationships.

**Part III – Microservice Database Designs** provides detailed database designs for every microservice, including schemas, entities, relationships, constraints, indexing strategies, partitioning, and optimization techniques.

**Part IV – Data Engineering** documents enterprise data structures, indexing, performance optimization, replication, caching, analytics, graph databases, search architecture, and advanced database engineering practices.

**Part V – Security and Governance** defines security controls, compliance requirements, privacy controls, backup strategies, disaster recovery, monitoring, governance, and operational management.

**Part VI – Implementation** covers database DevSecOps, migration strategies, testing methodologies, capacity planning, traceability, future evolution, and supporting appendices.

This structure aligns with internationally recognized software engineering and enterprise architecture practices, enabling each stakeholder group to locate implementation guidance relevant to their responsibilities.

**1.6 References**

This Database Design Document is based on the following primary reference documents and standards:

**Project Documentation**

-   Kaziforce Vision and Product Strategy
-   Kaziforce Business Requirements Document (BRD)
-   Kaziforce Software Requirements Specification (SRS)
-   Kaziforce Technical Design Document (TDD)
-   Kaziforce API Specifications
-   Kaziforce Event Catalog
-   Kaziforce Architecture Decision Records (ADRs)
-   Kaziforce Security Architecture
-   Kaziforce Infrastructure Architecture
-   Kaziforce DevSecOps Standards

**Industry Standards**

-   ISO/IEC/IEEE 29148 – Systems and Software Requirements Engineering
-   ISO/IEC 25010 – System and Software Quality Models
-   ISO/IEC 27001 – Information Security Management
-   ISO/IEC 27701 – Privacy Information Management
-   OWASP Application Security Verification Standard (ASVS)
-   NIST Cybersecurity Framework
-   PCI DSS
-   GDPR
-   SOC 2 Trust Services Criteria

**Technology References**

-   PostgreSQL Documentation
-   MongoDB Documentation
-   Redis Documentation
-   OpenSearch Documentation
-   Elasticsearch Documentation
-   Neo4j Documentation
-   ClickHouse Documentation
-   Apache Kafka Documentation
-   Kubernetes Documentation

**1.7 Definitions, Terms and Acronyms**

This document uses terminology consistent with the Kaziforce SRS and Technical Design Document.

Key terms include:

-   AI – Artificial Intelligence
-   API – Application Programming Interface
-   CQRS – Command Query Responsibility Segregation
-   DDD – Domain-Driven Design
-   DDD (Document) – Database Design Document
-   ERD – Entity Relationship Diagram
-   OLTP – Online Transaction Processing
-   OLAP – Online Analytical Processing
-   RLS – Row-Level Security
-   RBAC – Role-Based Access Control
-   JWT – JSON Web Token
-   MFA – Multi-Factor Authentication
-   CDC – Change Data Capture
-   ETL – Extract, Transform, Load
-   ELT – Extract, Load, Transform
-   PITR – Point-in-Time Recovery
-   RPO – Recovery Point Objective
-   RTO – Recovery Time Objective
-   SaaS – Software as a Service
-   ACID – Atomicity, Consistency, Isolation, Durability
-   BASE – Basically Available, Soft State, Eventual Consistency
-   CAP Theorem – Consistency, Availability, Partition Tolerance

Additional domain-specific terminology is defined in the Glossary appendix.

**1.8 Design Principles**

The Kaziforce database architecture is governed by the following principles:

-   Domain-driven data ownership.
-   Polyglot persistence using fit-for-purpose technologies.
-   Service-level database isolation.
-   High cohesion within bounded contexts.
-   Loose coupling between services.
-   Event-driven synchronization.
-   Security by design.
-   Privacy by design.
-   Multi-tenant isolation.
-   Scalability by default.
-   Cloud-native deployment.
-   AI-first data architecture.
-   Schema evolution without downtime.
-   Backward-compatible database migrations.
-   Immutable audit trails.
-   High availability.
-   Fault tolerance.
-   Performance optimization through indexing and caching.
-   Data integrity through constraints and validation.
-   Operational simplicity and observability.

These principles ensure that the database platform remains reliable, secure, maintainable, and adaptable as Kaziforce evolves.

**1.9 Database Design Methodology**

The Kaziforce Database Design Document follows a structured engineering methodology consisting of the following phases:

1.  Business domain analysis and identification of bounded contexts.
2.  Derivation of logical entities from functional requirements.
3.  Development of conceptual data models.
4.  Creation of logical entity relationship models.
5.  Definition of physical schemas for each database technology.
6.  Selection of storage technologies based on workload characteristics.
7.  Design of indexing, partitioning, and replication strategies.
8.  Integration of event-driven persistence and CQRS read models.
9.  Implementation of security, governance, and compliance controls.
10.  Validation against the SRS, TDD, performance targets, and scalability requirements.

Each phase incorporates design reviews, traceability verification, and alignment with enterprise architecture standards to ensure consistency and implementation readiness.

**1.10 Relationship to SRS and Technical Design Document**

This Database Design Document is a direct implementation artifact derived from the Kaziforce Software Requirements Specification (SRS) and the Technical Design Document (TDD).

The SRS defines **what** the platform must achieve by specifying functional requirements, business rules, user interactions, non-functional requirements, compliance obligations, and acceptance criteria.

The TDD defines **how** the platform is architected by describing the system architecture, microservices, APIs, integration patterns, security mechanisms, deployment models, event-driven workflows, AI components, and operational characteristics.

The DDD defines **how data is structured, stored, protected, processed, and managed** to support those functional and technical requirements. It translates business entities and architectural components into logical and physical database models, ensuring that every persistence mechanism aligns with the platform's domain boundaries, service contracts, scalability objectives, and security controls.

Collectively, these three documents provide complete traceability from business requirements to technical implementation:

-   **SRS:** Defines business capabilities and system requirements.
-   **TDD:** Defines the software architecture and implementation approach.
-   **DDD:** Defines the persistent data architecture that underpins and enables the solution.

Every database entity, relationship, constraint, index, partition, and storage technology described in this document is traceable to one or more requirements in the SRS and one or more architectural decisions documented in the TDD. This alignment ensures consistency across the platform, simplifies maintenance, supports auditability, and provides a robust foundation for future enhancements.

**Part I — Database Architecture**

**2\. Database Architecture Overview**

**2.1 Overall Database Architecture**

Kaziforce adopts a **cloud-native, distributed, polyglot persistence architecture** designed to support a global AI-powered workforce platform. The database architecture is built around a **microservices architecture**, where each service owns and manages its data independently while collaborating through event-driven communication.

Unlike traditional monolithic applications that rely on a single relational database, Kaziforce uses multiple purpose-built data stores. Each database technology is selected based on workload characteristics, consistency requirements, query patterns, scalability needs, and performance objectives. This approach enables the platform to optimize transactional processing, real-time collaboration, AI inference, graph analytics, search, reporting, and long-term data retention without compromising service autonomy.

The architecture follows the principle of **Database per Service**, ensuring that each bounded context has exclusive ownership of its persistence layer. Services never access another service's database directly. Instead, data is exchanged through well-defined APIs, asynchronous events, and materialized read models, preserving loose coupling and enabling independent deployment and evolution.

At the core of the architecture is PostgreSQL, which provides ACID-compliant transactional storage for critical business operations such as authentication, workforce engagements, financial transactions, payroll, contracts, subscriptions, and organizational data. MongoDB complements PostgreSQL by storing flexible and evolving document-oriented data, including professional profiles, resumes, AI conversation histories, portfolios, and collaboration artifacts.

Redis functions as the distributed caching and in-memory data platform, accelerating frequently accessed data, managing user sessions, implementing rate limiting, supporting distributed locks, and powering real-time features such as presence indicators and notification queues. OpenSearch provides enterprise-grade full-text, semantic, and vector search capabilities across professionals, jobs, projects, documents, and AI-generated content. Neo4j models professional relationships, organizational hierarchies, referral networks, and recommendation graphs to enable intelligent workforce discovery and relationship analysis. ClickHouse serves as the analytical database for operational dashboards, business intelligence, AI insights, workforce metrics, and historical reporting. Object storage provides durable and scalable storage for large binary assets such as resumes, contracts, certificates, videos, images, and AI training datasets.

All data services are deployed across multiple availability zones and regions using Kubernetes, with automated replication, backup, disaster recovery, and observability mechanisms. The architecture supports horizontal scaling, zero-downtime deployments, and continuous schema evolution through version-controlled database migrations.

**2.2 Database Design Goals**

The Kaziforce database architecture is designed to achieve the following strategic objectives:

**Scalability**

Support millions of users, organizations, projects, AI agents, and workforce engagements while maintaining predictable performance under continuously increasing workloads.

**High Availability**

Provide uninterrupted database services through multi-zone deployments, automatic failover, replication, and fault-tolerant clustering.

**Data Integrity**

Maintain strong consistency for transactional operations through ACID-compliant databases, referential integrity, validation rules, and robust constraint enforcement.

**Service Independence**

Allow each microservice to evolve independently without impacting other services through isolated schemas and service-owned databases.

**Performance**

Deliver low-latency transaction processing, high-throughput event handling, optimized search experiences, and responsive analytical queries.

**AI Readiness**

Support machine learning, recommendation engines, semantic search, vector embeddings, AI memory, and large-scale inference workloads.

**Security**

Protect sensitive workforce, financial, organizational, and personal information using encryption, access control, auditing, masking, and compliance controls.

**Multi-Tenancy**

Enable secure logical isolation of tenant data while maximizing infrastructure efficiency and supporting future deployment flexibility.

**Global Expansion**

Support cross-border workforce management through geographically distributed databases, regional data residency, and localized compliance requirements.

**Extensibility**

Facilitate future platform evolution through modular schemas, schema versioning, backward-compatible migrations, and flexible document storage.

**2.3 Database Technology Stack**

Kaziforce employs a polyglot persistence strategy in which each technology addresses a specific category of data and workload.

**Database Technology**

**Primary Purpose**

**Typical Workloads**

PostgreSQL

Relational transactional database

Users, organizations, contracts, payroll, wallet, billing, subscriptions

MongoDB

Document database

Profiles, resumes, AI memory, portfolios, chat metadata

Redis

In-memory database

Sessions, caching, queues, rate limiting, distributed locks

OpenSearch

Search engine

Full-text search, semantic search, vector search

Neo4j

Graph database

Professional relationships, recommendations, organizational hierarchy

ClickHouse

Analytical database

KPIs, dashboards, BI reporting, AI analytics

Object Storage

Binary storage

Images, resumes, contracts, certificates, videos, AI datasets

Apache Kafka

Event streaming platform

Domain events, CDC pipelines, asynchronous integration

Each technology has clearly defined ownership boundaries, operational responsibilities, backup strategies, and monitoring requirements.

**2.4 Polyglot Persistence Strategy**

Kaziforce recognizes that no single database technology is optimal for every workload. Consequently, the platform adopts a polyglot persistence model in which different data stores are selected according to their strengths.

Transactional operations requiring strong consistency are handled by PostgreSQL. Flexible and evolving content is stored in MongoDB. High-speed access to frequently requested data is provided by Redis. Search-intensive operations leverage OpenSearch, while relationship-centric queries are executed using Neo4j. Analytical workloads are offloaded to ClickHouse to avoid impacting operational systems.

This strategy offers several advantages:

-   Improved performance through workload specialization.
-   Better scalability by independently scaling each storage technology.
-   Reduced operational contention between OLTP and analytical workloads.
-   Enhanced flexibility for AI and machine learning workloads.
-   Optimized cost through fit-for-purpose infrastructure.
-   Simplified maintenance and technology evolution.

The use of multiple databases is transparent to end users, with application services abstracting storage concerns through repositories and domain services.

**2.5 Multi-Database Architecture**

The Kaziforce platform consists of independently deployed microservices, each responsible for one or more dedicated databases. No database is shared across unrelated business domains.

The architecture follows the **Database per Service** pattern with the following characteristics:

-   Each service owns its schema and data lifecycle.
-   Direct database access between services is prohibited.
-   Cross-service communication occurs through APIs and Kafka events.
-   Shared reference data is synchronized using event-driven replication.
-   Read models are generated through CQRS projections where necessary.
-   Each database can be independently upgraded, migrated, or replaced.

This approach minimizes coupling, improves fault isolation, and enables autonomous service evolution.

**2.6 Data Flow Across Services**

Data flows between services using asynchronous event-driven communication coordinated by Apache Kafka.

The typical lifecycle is:

1.  A command is submitted to a service.
2.  Business validation is performed.
3.  Transactional data is persisted in the service's primary database.
4.  A domain event is published to Kafka.
5.  Interested services consume the event.
6.  Local read models are updated.
7.  Search indexes, caches, analytics stores, and graph databases are synchronized.
8.  Notifications and AI services consume relevant events to perform downstream processing.

This architecture eliminates tight coupling, reduces distributed transactions, and enables eventual consistency across independently evolving services.

**2.7 Data Ownership Model**

Every business entity within Kaziforce has a single authoritative owner.

Ownership principles include:

-   Identity Service owns users, authentication credentials, roles, and permissions.
-   Organization Service owns organizational structures.
-   Profile Service owns professional profiles and skills.
-   Marketplace Service owns jobs, applications, and contracts.
-   Wallet Service owns financial transactions and balances.
-   AI Services own embeddings, prompts, and AI memory.
-   Messaging Service owns conversations and messages.
-   Notification Service owns notification history and delivery status.
-   Analytics Service owns aggregated reporting datasets.

Other services may maintain replicated read models but never become the authoritative source for another service's data.

**2.8 Bounded Context Data Separation**

Kaziforce applies Domain-Driven Design (DDD) principles by separating business domains into bounded contexts with clear ownership boundaries.

Each bounded context contains:

-   Independent database schema.
-   Independent migration history.
-   Independent repositories.
-   Independent domain models.
-   Independent APIs.
-   Independent event streams.

Examples of bounded contexts include:

-   Identity
-   Organizations
-   Workforce Marketplace
-   Profiles
-   Messaging
-   Wallet
-   HR
-   AI Services
-   Learning
-   Notifications
-   Analytics

This separation minimizes coupling, simplifies maintenance, and supports autonomous team ownership.

**2.9 CQRS Data Architecture**

Kaziforce implements Command Query Responsibility Segregation (CQRS) to optimize read and write operations independently.

Write models prioritize transactional consistency and are stored primarily in PostgreSQL.

Read models are optimized for query performance and are materialized into specialized stores, including Redis, OpenSearch, ClickHouse, and MongoDB.

Command workflows validate business rules, execute transactional updates, and emit domain events. Query workflows retrieve denormalized data structures designed specifically for presentation, reporting, analytics, and AI inference.

CQRS enables:

-   Independent optimization of read and write paths.
-   Reduced query complexity.
-   High-performance dashboards.
-   Efficient search indexes.
-   Scalable analytics.
-   Simplified event-driven synchronization.

**2.10 Event Sourcing Architecture**

Kaziforce leverages event-driven persistence for critical business processes while maintaining conventional relational state models for operational efficiency.

Every significant business action produces immutable domain events, including:

-   User registration.
-   Profile updates.
-   Job publication.
-   Application submission.
-   Contract execution.
-   Wallet transactions.
-   Payment processing.
-   AI recommendations.
-   Notification delivery.

Events are persisted within Kafka and archived for auditing, replay, analytics, and disaster recovery. Selected domains may reconstruct state from event histories where business requirements justify full event sourcing.

**2.11 AI Data Architecture**

Artificial Intelligence is a core capability of Kaziforce and is supported by dedicated data structures optimized for machine learning and intelligent automation.

The AI data architecture includes:

-   Feature stores.
-   Embedding repositories.
-   Prompt libraries.
-   AI conversation history.
-   AI memory storage.
-   Recommendation datasets.
-   Model metadata.
-   Inference logs.
-   Feedback datasets.
-   Fine-tuning datasets.
-   Semantic indexes.
-   Vector similarity storage.

AI services interact with transactional databases through controlled pipelines, ensuring that operational workloads remain isolated from computationally intensive AI processes.

**2.12 Data Lake Architecture**

The Kaziforce Data Lake serves as the centralized repository for raw, semi-structured, and unstructured data.

Typical contents include:

-   Event streams.
-   Log files.
-   Resumes.
-   Documents.
-   Images.
-   Videos.
-   AI training datasets.
-   Clickstream data.
-   Workforce telemetry.
-   Historical snapshots.
-   External integrations.

The Data Lake supports advanced analytics, AI model development, historical replay, and regulatory retention requirements while remaining decoupled from operational databases.

**2.13 Data Warehouse Architecture**

The enterprise data warehouse consolidates curated business data from operational systems into analytical schemas optimized for reporting and decision support.

The warehouse adopts dimensional modeling techniques, including star and snowflake schemas, with fact tables capturing measurable business events and dimension tables representing descriptive business entities.

Primary analytical domains include workforce utilization, hiring performance, financial operations, subscription growth, organizational productivity, AI effectiveness, customer engagement, and platform health. Historical snapshots and slowly changing dimensions enable trend analysis and longitudinal reporting without affecting transactional systems.

**2.14 Knowledge Graph Architecture**

Kaziforce employs a graph database to represent highly connected workforce relationships that are inefficient to model using relational structures.

The knowledge graph models professionals, organizations, skills, certifications, projects, referrals, teams, mentors, AI agents, learning paths, and collaboration networks as interconnected nodes linked by semantically meaningful relationships.

Graph traversal enables advanced capabilities such as professional recommendations, team composition analysis, referral discovery, organizational dependency mapping, fraud detection, expertise identification, and AI-assisted workforce planning. By combining graph analytics with AI-generated embeddings, Kaziforce delivers context-aware recommendations and intelligent relationship discovery that extend beyond simple keyword matching.

**2.15 High-Level Database Deployment Architecture**

The Kaziforce database platform is deployed as a highly available, cloud-native infrastructure spanning multiple availability zones and regions.

Each database technology is deployed in clustered configurations with automated replication, health monitoring, failover, and backup. PostgreSQL operates with primary and read-replica nodes, MongoDB is configured as a replica set or sharded cluster, Redis runs in clustered mode with automatic failover, OpenSearch is deployed across dedicated master, data, and coordinating nodes, Neo4j uses causal clustering, and ClickHouse is configured with replicated shards for analytical scalability.

Database services are orchestrated using Kubernetes and integrated with centralized monitoring, logging, secrets management, certificate management, and infrastructure-as-code pipelines. Automated backup schedules, point-in-time recovery, cross-region replication, and disaster recovery procedures ensure resilience against infrastructure failures while supporting stringent recovery objectives.

This deployment architecture provides the operational foundation required for a globally distributed, multi-tenant SaaS platform capable of supporting enterprise-scale workforce management, AI-driven services, and continuous platform evolution.

**3\. Database Technology Selection**

**3.1 PostgreSQL Design**

**Overview**

PostgreSQL is the primary Online Transaction Processing (OLTP) database for the Kaziforce platform. It serves as the system of record for business-critical transactional data that requires strong consistency, durability, referential integrity, and ACID compliance.

Its mature feature set, extensibility, rich indexing capabilities, advanced security controls, JSON support, partitioning, replication, and high availability make it the ideal foundation for the platform's core business domains.

**Primary Responsibilities**

PostgreSQL stores structured relational data for:

-   Identity and Access Management
-   Organizations and Business Units
-   User Accounts
-   Workforce Marketplace
-   Job Postings
-   Projects
-   Contracts
-   Workforce Assignments
-   Wallets
-   Financial Transactions
-   Billing
-   Subscription Management
-   Payroll
-   Invoices
-   HR Records
-   Calendar Events
-   Notifications Metadata
-   Audit Logs
-   Configuration Data

**Key Features Utilized**

-   ACID transactions
-   MVCC (Multi-Version Concurrency Control)
-   Declarative partitioning
-   Native JSONB support
-   Row-Level Security (RLS)
-   Generated columns
-   Materialized views
-   Window functions
-   Recursive queries
-   GIN, BRIN, B-Tree, Hash indexes
-   Logical replication
-   Physical streaming replication
-   Foreign Data Wrappers (FDW)
-   Full-text search where appropriate
-   Extensions such as PostGIS and pgvector (if selected)

**Availability Architecture**

-   Multi-node cluster
-   Primary node
-   Multiple read replicas
-   Automatic failover
-   Cross-region replication
-   Continuous WAL archiving
-   Point-in-Time Recovery (PITR)

**Security Controls**

-   TLS encryption
-   Transparent Data Encryption where supported by infrastructure
-   Role-Based Access Control
-   Row-Level Security
-   Column masking
-   Secret management
-   Audit logging
-   Database activity monitoring

**Performance Strategy**

-   Query optimization
-   Composite indexing
-   Connection pooling (PgBouncer)
-   Partition pruning
-   Read replicas
-   Materialized views
-   Parallel query execution

**Scalability Strategy**

-   Vertical scaling for write-intensive workloads
-   Horizontal scaling through read replicas
-   Service-level schema isolation
-   Time-based partitioning
-   Tenant-aware indexing
-   Optimized storage parameters

**3.2 MongoDB Design**

**Overview**

MongoDB provides flexible document-oriented storage for semi-structured and rapidly evolving data that does not naturally fit relational models.

Its schema flexibility enables rapid feature evolution without expensive schema migrations, making it ideal for AI-driven content, user-generated documents, collaboration artifacts, and rich profile information.

**Primary Responsibilities**

MongoDB stores:

-   Professional profiles
-   Resumes
-   CV parsing results
-   Skills metadata
-   Portfolios
-   Certificates metadata
-   AI memory
-   AI conversations
-   Chat attachments metadata
-   User preferences
-   Workflow definitions
-   Learning content
-   Knowledge base articles
-   Collaboration documents
-   Dynamic forms
-   Configuration documents

**Document Model**

Documents are organized into collections representing business aggregates.

Typical collections include:

-   profiles
-   resumes
-   ai\_memory
-   ai\_conversations
-   portfolios
-   learning\_materials
-   knowledge\_articles
-   workflow\_templates

**Key Features Utilized**

-   Flexible schema
-   BSON documents
-   Aggregation pipelines
-   Compound indexes
-   Text indexes
-   TTL indexes
-   Partial indexes
-   Atlas Search (optional)
-   Change Streams
-   Transactions where required

**Availability**

-   Replica Sets
-   Automatic elections
-   Read preference configuration
-   Cross-region replication

**Performance Strategy**

-   Embedded document optimization
-   Denormalization where appropriate
-   Aggregation optimization
-   Working set management
-   Compression

**3.3 Redis Design**

**Overview**

Redis functions as the high-performance in-memory platform supporting caching, distributed synchronization, real-time communication, and transient application state.

Redis dramatically reduces latency while minimizing database load across the platform.

**Primary Responsibilities**

Redis manages:

-   Authentication sessions
-   JWT blacklists
-   OAuth tokens
-   MFA verification codes
-   API rate limiting
-   Presence information
-   Typing indicators
-   Notification queues
-   Background jobs
-   Distributed locks
-   Leaderboards
-   Frequently accessed profile data
-   AI inference cache
-   Search cache
-   Feature flags

**Data Structures**

The implementation uses:

-   Strings
-   Hashes
-   Lists
-   Sets
-   Sorted Sets
-   Streams
-   HyperLogLog
-   Bitmaps
-   Bloom Filters where appropriate

**Deployment**

-   Redis Cluster
-   Sentinel failover
-   Persistent AOF
-   Snapshot backups
-   Multi-node replication

**Cache Strategy**

-   Cache-aside
-   Write-through
-   Write-behind for selected workloads
-   TTL-based expiration
-   Intelligent invalidation

**3.4 OpenSearch / Elasticsearch Design**

**Overview**

OpenSearch provides enterprise-grade search capabilities across structured, semi-structured, and unstructured data.

The platform supports traditional keyword search, semantic search, AI-powered ranking, autocomplete, faceted filtering, and vector similarity search.

**Indexed Data**

Search indexes include:

-   Professional profiles
-   Organizations
-   Jobs
-   Projects
-   Skills
-   Certifications
-   Courses
-   Knowledge articles
-   Support tickets
-   Messages
-   Documents
-   AI content

**Search Capabilities**

-   Full-text search
-   Semantic search
-   Vector search
-   Autocomplete
-   Spell correction
-   Synonyms
-   Faceted navigation
-   Geo-search
-   Ranking
-   Relevance scoring

**Index Management**

-   Dedicated indexes per domain
-   Alias-based versioning
-   Rolling index upgrades
-   Lifecycle policies
-   Snapshot backups

**AI Integration**

-   Embedding storage
-   Similarity search
-   Hybrid keyword + vector retrieval
-   RAG support

**3.5 Neo4j Graph Database**

**Overview**

Neo4j models highly connected workforce relationships that are difficult to represent efficiently in relational databases.

The graph enables sophisticated recommendation engines, relationship discovery, referral analysis, organizational mapping, and AI reasoning.

**Node Types**

Examples include:

-   Professional
-   Organization
-   Team
-   Project
-   Skill
-   Certification
-   Course
-   Mentor
-   AI Agent
-   Department
-   Client

**Relationship Types**

Examples include:

-   WORKS\_FOR
-   REPORTS\_TO
-   HAS\_SKILL
-   COMPLETED
-   REFERRED
-   HIRED
-   MANAGES
-   PARTICIPATED\_IN
-   KNOWS
-   MATCHED\_WITH

**Use Cases**

-   Professional recommendations
-   AI workforce planning
-   Team formation
-   Referral discovery
-   Fraud detection
-   Expertise identification
-   Career path analysis
-   Organization hierarchy visualization

**Query Language**

Cypher is used for:

-   Graph traversals
-   Pattern matching
-   Recommendation algorithms
-   Community detection

**3.6 ClickHouse Analytics Database**

**Overview**

ClickHouse is the analytical database powering enterprise reporting, business intelligence, operational dashboards, and AI analytics.

It is optimized for extremely fast aggregation over billions of records.

**Data Sources**

ClickHouse receives data from:

-   PostgreSQL
-   MongoDB
-   Kafka
-   OpenSearch
-   Event streams
-   AI services

**Analytical Domains**

-   Workforce productivity
-   Hiring analytics
-   Financial reporting
-   Revenue dashboards
-   Subscription analytics
-   AI effectiveness
-   Marketplace performance
-   Engagement metrics
-   User behavior
-   Platform operations

**Data Modeling**

-   Star schemas
-   Snowflake schemas
-   Fact tables
-   Dimension tables
-   Materialized views

**Performance Features**

-   Columnar storage
-   Compression
-   Parallel execution
-   Partition pruning
-   Distributed queries

**3.7 Object Storage Design**

**Overview**

Large binary assets are stored outside relational databases in enterprise object storage.

Only metadata and references are maintained in transactional databases.

**Stored Objects**

Examples include:

-   Resumes
-   Contracts
-   Certificates
-   Identification documents
-   Images
-   Videos
-   Audio recordings
-   AI datasets
-   Learning materials
-   Portfolio files
-   Generated reports

**Storage Architecture**

-   Bucket isolation
-   Lifecycle policies
-   Versioning
-   Encryption
-   CDN integration
-   Object replication
-   Immutable storage for compliance

**Security**

-   Signed URLs
-   Access policies
-   Encryption at rest
-   Encryption in transit
-   Malware scanning
-   Object auditing

**3.8 Vector Database Strategy**

**Overview**

Kaziforce incorporates vector search capabilities to support Artificial Intelligence, semantic retrieval, recommendation engines, Retrieval-Augmented Generation (RAG), and intelligent workforce matching.

Rather than relying solely on keyword matching, vector representations capture semantic meaning, enabling more accurate discovery of professionals, jobs, skills, documents, and AI-generated content.

**Vector Data Sources**

Embeddings are generated for:

-   Professional profiles
-   Skills
-   Job descriptions
-   Project requirements
-   Resumes
-   Learning content
-   Knowledge articles
-   AI conversations
-   Organizational documents
-   Support content

**Storage Strategy**

The platform supports multiple deployment options depending on scale and operational requirements:

-   PostgreSQL with pgvector for moderate vector workloads.
-   OpenSearch vector indexes for hybrid keyword and semantic search.
-   Dedicated vector databases such as Milvus, Qdrant, Weaviate, or Pinecone for large-scale AI workloads.

The selected implementation must support high-dimensional embeddings, approximate nearest-neighbor (ANN) search, metadata filtering, and horizontal scalability.

**AI Use Cases**

-   Candidate-job matching.
-   Talent recommendations.
-   Semantic profile search.
-   Personalized learning recommendations.
-   Intelligent knowledge retrieval.
-   AI assistant context retrieval.
-   Fraud pattern similarity.
-   Workforce capability analysis.

**Performance Strategy**

-   Approximate nearest-neighbor indexes.
-   Embedding version management.
-   Batch embedding refresh.
-   Metadata filtering.
-   Vector compression.
-   Incremental re-indexing.

**3.9 Database Selection Matrix**

**Technology**

**Primary Data Type**

**Consistency Model**

**Typical Workload**

**Primary Kaziforce Use Cases**

PostgreSQL

Structured relational data

Strong (ACID)

OLTP

Identity, Marketplace, HR, Finance, Billing, Contracts

MongoDB

Semi-structured documents

Strong/Eventual (configurable)

Document storage

Profiles, Resumes, AI Memory, Knowledge Base

Redis

In-memory key-value data

Eventual/In-memory

Caching and real-time

Sessions, Presence, Queues, Rate Limiting

OpenSearch

Search indexes and vectors

Eventual

Search and retrieval

Talent Search, Jobs, Documents, Semantic Search

Neo4j

Graph data

ACID

Relationship traversal

Recommendations, Referrals, Organizational Graphs

ClickHouse

Columnar analytical data

Eventual

OLAP

Dashboards, KPIs, AI Analytics, Reporting

Object Storage

Binary objects

Durable object storage

File storage

Resumes, Contracts, Images, Videos, Certificates

Vector Database

High-dimensional embeddings

Eventual

AI similarity search

Matching, RAG, Recommendations, Semantic Retrieval

**3.10 Technology Decision Rationale**

The Kaziforce technology stack was selected using a workload-driven architecture approach rather than attempting to satisfy all persistence requirements with a single database engine.

PostgreSQL was chosen for transactional integrity, mature SQL capabilities, and enterprise-grade reliability. MongoDB complements it by providing schema flexibility for rapidly evolving document-centric domains. Redis enables low-latency caching and real-time application state management. OpenSearch delivers scalable full-text and semantic search capabilities, while Neo4j efficiently models complex relationships that are impractical to represent relationally. ClickHouse isolates analytical processing from operational workloads, ensuring that business intelligence and reporting do not impact transactional performance. Object storage provides durable, cost-effective management of large binary assets, and vector database technologies enable modern AI features such as semantic search, recommendation engines, and Retrieval-Augmented Generation.

This combination of technologies aligns with Kaziforce's architectural principles of microservice autonomy, polyglot persistence, AI-first design, cloud-native deployment, and enterprise scalability. Each technology is assigned a clearly defined responsibility, minimizing overlap, reducing operational complexity, and allowing each persistence layer to evolve independently while collectively supporting a globally distributed, secure, and highly available workforce platform.

**Part II — Enterprise Data Model**

**4\. Enterprise Data Model**

**4.1 Enterprise Data Domains**

**Overview**

The Kaziforce Enterprise Data Model organizes all business information into well-defined business domains that align with the platform's Domain-Driven Design (DDD) architecture. Each domain represents a bounded context with clearly defined ownership, responsibilities, lifecycle, and persistence strategy. This separation enables independent service evolution, minimizes coupling, improves scalability, and supports autonomous development teams.

The enterprise data model serves as the canonical representation of business information across the platform. It provides a consistent vocabulary, standardized entity definitions, and shared semantics that enable interoperability between microservices while preserving service autonomy.

The primary enterprise data domains are:

**Identity Domain**

The Identity Domain manages authentication, authorization, and digital identity.

Core entities include:

-   User
-   Identity
-   Credential
-   Session
-   Role
-   Permission
-   OAuth Client
-   API Key
-   Multi-Factor Authentication Device
-   Authentication Event

Primary owner:

Identity Service

Primary database:

PostgreSQL

**Organization Domain**

Represents companies, government institutions, NGOs, educational institutions, business units, departments, branches, and teams.

Core entities include:

-   Organization
-   Department
-   Team
-   Business Unit
-   Branch
-   Organization Member
-   Position
-   Reporting Structure

Primary owner:

Organization Service

Primary database:

PostgreSQL

**Professional Profile Domain**

Represents workforce identity beyond authentication.

Core entities include:

-   Professional Profile
-   Skill
-   Certification
-   License
-   Education
-   Employment History
-   Portfolio
-   Language
-   Career Preference
-   Availability

Primary owner:

Profile Service

Primary databases:

PostgreSQL

MongoDB

OpenSearch

**Workforce Marketplace Domain**

Represents hiring and workforce engagement.

Core entities include:

-   Job
-   Project
-   Application
-   Contract
-   Proposal
-   Offer
-   Interview
-   Assignment
-   Engagement

Primary owner:

Marketplace Service

Primary database:

PostgreSQL

**Workforce Management Domain**

Supports enterprise workforce operations.

Entities include:

-   Workforce Assignment
-   Resource Allocation
-   Performance Review
-   Goal
-   Attendance
-   Workforce Planning

**Human Resource Domain**

Entities include:

-   Employee
-   Leave Request
-   Payroll
-   Benefits
-   Appraisal
-   Promotion

**Financial Domain**

Represents all monetary operations.

Core entities include:

-   Wallet
-   Ledger
-   Transaction
-   Payment
-   Invoice
-   Escrow
-   Tax
-   Subscription
-   Payout

**Communication Domain**

Represents collaboration services.

Entities include:

-   Conversation
-   Message
-   Channel
-   Attachment
-   Call
-   Meeting
-   Presence
-   Notification

**AI Domain**

Supports artificial intelligence.

Entities include:

-   AI Agent
-   AI Prompt
-   AI Conversation
-   AI Memory
-   Embedding
-   Recommendation
-   Feature Vector
-   Model Metadata

**Knowledge Domain**

Entities include:

-   Knowledge Article
-   FAQ
-   Learning Course
-   Certification Program
-   Learning Path
-   Assessment

**Analytics Domain**

Entities include:

-   Metric
-   Dashboard
-   KPI
-   Fact Table
-   Dimension Table
-   Report

**Governance Domain**

Entities include:

-   Audit Log
-   Compliance Event
-   Security Event
-   Consent
-   Data Retention Policy
-   Data Classification

**4.2 Canonical Data Model**

**Overview**

The Canonical Data Model (CDM) defines the enterprise-wide representation of business entities exchanged between microservices. It establishes a common language that eliminates duplication, minimizes transformation complexity, and ensures consistency across the platform.

The canonical model does not necessarily reflect the internal storage format of each service. Instead, it defines standardized business objects used in APIs, events, integrations, analytics, and AI pipelines.

The canonical model follows these principles:

-   Technology independent.
-   Service independent.
-   Version controlled.
-   Backward compatible.
-   Extensible.
-   Event friendly.
-   AI ready.

**Core Canonical Entities**

The enterprise canonical model includes, but is not limited to:

-   User
-   Organization
-   Professional
-   Skill
-   Certification
-   Project
-   Job
-   Contract
-   Assignment
-   Wallet
-   Payment
-   Invoice
-   Conversation
-   Message
-   Notification
-   Learning Course
-   AI Agent
-   Recommendation
-   Audit Event

Every canonical entity contains standardized identifiers, timestamps, ownership metadata, tenant information, lifecycle status, and audit fields.

**4.3 Master Data Model**

Master Data represents the authoritative business entities shared across multiple services.

Master Data entities have a single system of record while allowing downstream systems to maintain synchronized read models.

The Kaziforce Master Data Model includes:

**Identity Master Data**

-   User
-   Organization
-   Role
-   Permission

**Professional Master Data**

-   Skill
-   Certification
-   Occupation
-   Industry
-   Language

**Geographic Master Data**

-   Country
-   Region
-   County
-   City
-   Time Zone
-   Currency

**Financial Master Data**

-   Tax Category
-   Payment Method
-   Subscription Plan

**AI Master Data**

-   AI Model
-   Prompt Template
-   Embedding Model
-   Feature Definition

Master Data is synchronized using event-driven replication through Apache Kafka.

**4.4 Shared Reference Data**

Reference data provides standardized lookup values used consistently across the platform.

Examples include:

**Geographic**

-   Countries
-   Counties
-   States
-   Cities
-   Postal Codes

**Professional**

-   Skills Catalog
-   Occupations
-   Industries
-   Certifications
-   Professional Levels

**Financial**

-   Currencies
-   Tax Codes
-   Payment Providers
-   Billing Cycles

**Workflow**

-   Status Codes
-   Approval Types
-   Notification Types
-   Event Categories

**Security**

-   Roles
-   Permissions
-   Authentication Methods

Reference data changes infrequently and is distributed across services through event synchronization.

**4.5 Entity Classification**

Enterprise entities are classified according to their business responsibilities.

**Core Business Entities**

Represent primary business concepts.

Examples:

-   User
-   Professional
-   Organization
-   Job
-   Project
-   Wallet

**Transactional Entities**

Represent business activities.

Examples:

-   Application
-   Contract
-   Payment
-   Invoice
-   Assignment
-   Attendance

**Reference Entities**

Provide reusable lookup values.

Examples:

-   Country
-   Currency
-   Skill
-   Language
-   Industry

**Configuration Entities**

Store system configuration.

Examples:

-   Feature Flags
-   Notification Templates
-   Workflow Rules

**AI Entities**

Support machine learning.

Examples:

-   Embedding
-   Prompt
-   Recommendation
-   AI Memory

**Audit Entities**

Maintain compliance.

Examples:

-   Audit Log
-   Login History
-   Change History

**Analytical Entities**

Support reporting.

Examples:

-   Fact Tables
-   Dimension Tables
-   KPI Snapshots

**4.6 Aggregate Roots**

Following Domain-Driven Design, every aggregate has one aggregate root responsible for enforcing business invariants.

Examples include:

**Aggregate**

**Aggregate Root**

Identity

User

Organization

Organization

Workforce Profile

Professional Profile

Marketplace

Job

Hiring

Application

Contract Management

Contract

Wallet

Wallet

Finance

Transaction

Messaging

Conversation

AI

AI Agent

Learning

Course

Support

Ticket

Only aggregate roots may be referenced directly by external aggregates.

Child entities are managed exclusively through their aggregate root.

**4.7 Domain Relationships**

Business domains interact through clearly defined relationships while maintaining ownership boundaries.

Examples include:

-   One Organization employs many Professionals.
-   One Professional possesses many Skills.
-   One Job belongs to one Organization.
-   One Job receives many Applications.
-   One Contract generates many Payments.
-   One Wallet records many Transactions.
-   One User owns one Professional Profile.
-   One Professional participates in many Projects.
-   One AI Agent generates many Recommendations.
-   One Learning Course contains many Assessments.

Cross-domain relationships are implemented through identifiers, events, and APIs rather than direct database joins across services.

**4.8 Cross-Service Data Dependencies**

Kaziforce minimizes service coupling by defining explicit data dependencies.

Examples include:

**Identity → Profile**

User creation generates a Profile Created event.

**Organization → Marketplace**

Organizations publish jobs.

**Marketplace → Finance**

Successful contracts generate billing events.

**Finance → Analytics**

Transactions populate analytical fact tables.

**Messaging → Notification**

Messages trigger notification events.

**AI → Search**

Embeddings update semantic indexes.

**Profile → AI**

Profile updates refresh recommendation models.

All dependencies are implemented through Kafka events, asynchronous messaging, and API orchestration.

**4.9 Data Ownership Matrix**

**Business Entity**

**System of Record**

**Read Consumers**

User

Identity Service

All Services

Organization

Organization Service

Marketplace, HR, Analytics

Professional Profile

Profile Service

Marketplace, AI, Search

Skill

Profile Service

AI, Search, Analytics

Job

Marketplace Service

Search, AI, Analytics

Application

Marketplace Service

HR, Analytics

Contract

Marketplace Service

Finance

Wallet

Wallet Service

Billing, Analytics

Transaction

Finance Service

Reporting, BI

Conversation

Messaging Service

Notification

Notification

Notification Service

Analytics

AI Agent

AI Service

Marketplace

Recommendation

AI Service

Marketplace

Course

Learning Service

Profile

Audit Log

Audit Service

Compliance

Every entity has exactly one authoritative owner. Other services maintain replicated read models where necessary but never modify another service's authoritative data.

**4.10 Enterprise Entity Relationship Overview (ERD)**

**Overview**

The Kaziforce Enterprise Entity Relationship Diagram (ERD) provides a conceptual representation of the major business entities and their relationships across the platform. It serves as the foundation for all logical and physical database models developed within individual microservices.

At the highest level, the enterprise model is centered on the **User** entity, which represents the authenticated digital identity. A User may belong to one or more Organizations and owns a single Professional Profile. The Professional Profile aggregates personal information, skills, certifications, education, employment history, portfolio items, availability, and career preferences.

Organizations create Jobs and Projects, which receive Applications from Professionals. Successful applications result in Contracts and Assignments. Contracts generate Financial Transactions, including invoices, escrow records, wallet movements, payouts, and tax records.

Professionals communicate through Conversations and Messages, participate in Meetings, receive Notifications, complete Learning Courses, and interact with AI Agents that generate Recommendations and intelligent workforce insights.

Supporting domains such as Analytics, Governance, Knowledge Management, and Audit consume events from operational systems to produce dashboards, compliance reports, search indexes, graph relationships, and AI feature stores.

**High-Level Relationship Summary**

-   **User** 1:1 **Professional Profile**
-   **Organization** 1:N **Departments**
-   **Organization** 1:N **Teams**
-   **Organization** 1:N **Jobs**
-   **Organization** 1:N **Projects**
-   **Professional Profile** N:M **Skills**
-   **Professional Profile** N:M **Certifications**
-   **Professional Profile** 1:N **Applications**
-   **Job** 1:N **Applications**
-   **Application** 0..1 **Contract**
-   **Contract** 1:N **Payments**
-   **Professional Profile** 1:1 **Wallet**
-   **Wallet** 1:N **Transactions**
-   **Professional Profile** N:M **Conversations**
-   **Conversation** 1:N **Messages**
-   **Professional Profile** N:M **Learning Courses**
-   **AI Agent** 1:N **Recommendations**
-   **Recommendation** N:1 **Professional Profile**

The detailed logical ERDs and physical ERDs for each bounded context are presented in subsequent chapters of this Database Design Document. These service-level models expand on the enterprise view by defining attributes, keys, constraints, cardinality, indexes, and storage structures while maintaining alignment with the canonical enterprise data model and the architectural principles established in the Software Requirements Specification (SRS) and Technical Design Document (TDD).

**Part III — Microservice Database Designs**

**5\. Identity & Access Management Database**

**5.1 Overview**

**Purpose**

The Identity & Access Management (IAM) Database is the foundational persistence layer of the Kaziforce platform. It manages digital identities, authentication credentials, authorization policies, user sessions, API credentials, federated identity providers, and security audit information.

Every user, organization, AI agent, administrator, partner application, and external integration authenticates and authorizes through this service. Consequently, the IAM database is the root of trust for the entire Kaziforce ecosystem.

The database is designed to provide:

-   Strong transactional consistency
-   Enterprise-grade security
-   High availability
-   Multi-tenant isolation
-   Regulatory compliance
-   Horizontal scalability
-   Zero-trust security architecture
-   Integration with external Identity Providers (IdPs)

**Architectural Role**

The Identity Service is implemented as an independent microservice following the **Database per Service** pattern. No other service directly accesses its database. Identity information is shared through secure APIs and domain events.

The IAM database acts as the authoritative source for:

-   Users
-   Authentication credentials
-   Authorization policies
-   Identity federation
-   API consumers
-   Authentication history
-   Security events
-   Session lifecycle

**Database Technology**

**Primary Database**

-   PostgreSQL

**Supporting Technologies**

-   Redis (session cache, OTP cache, token blacklist)
-   Kafka (identity events)
-   OpenSearch (authentication analytics)
-   ClickHouse (security reporting)

**Design Principles**

The IAM database is designed according to the following principles:

-   Least privilege
-   Zero trust
-   Defense in depth
-   Immutable audit trails
-   Strong referential integrity
-   Service ownership
-   Event-driven synchronization
-   Multi-factor authentication
-   Tenant isolation
-   Fine-grained authorization

**5.2 Entity Relationship Diagram**

The Identity database is centered around the **User** entity, which acts as the aggregate root for authentication and authorization.

**Primary Entities**

-   User
-   UserCredential
-   UserSession
-   RefreshToken
-   OAuthProvider
-   OAuthAccount
-   MFADevice
-   Role
-   Permission
-   RolePermission
-   UserRole
-   OrganizationMembership
-   APIKey
-   LoginHistory
-   SecurityEvent
-   PasswordHistory
-   TrustedDevice
-   DeviceFingerprint
-   EmailVerification
-   PasswordReset
-   ServiceAccount

**High-Level Relationships**

User

├── UserCredential

├── PasswordHistory

├── UserSession

├── RefreshToken

├── MFADevice

├── TrustedDevice

├── DeviceFingerprint

├── LoginHistory

├── SecurityEvent

├── EmailVerification

├── PasswordReset

├── UserRole

│ └── Role

│ └── RolePermission

│ └── Permission

├── OAuthAccount

│ └── OAuthProvider

├── OrganizationMembership

└── APIKey

ServiceAccount

└── APIKey

All foreign key relationships enforce referential integrity with cascading rules applied only where appropriate.

**5.3 Core Tables**

The Identity database consists of the following core tables.

**Table**

**Purpose**

users

Master user identities

user\_credentials

Passwords and authentication credentials

password\_history

Password reuse prevention

roles

System roles

permissions

System permissions

role\_permissions

Role-permission mappings

user\_roles

User-role assignments

organization\_memberships

User membership within organizations

sessions

Active login sessions

refresh\_tokens

JWT refresh tokens

mfa\_devices

Registered MFA authenticators

trusted\_devices

Remembered devices

device\_fingerprints

Device identification

oauth\_providers

Identity providers

oauth\_accounts

Linked OAuth accounts

api\_keys

Service and application API keys

email\_verifications

Email verification workflow

password\_resets

Password reset requests

login\_history

Authentication history

security\_events

Security audit trail

service\_accounts

Machine identities

Each table includes:

-   UUID primary key
-   Tenant identifier
-   Created timestamp
-   Updated timestamp
-   Created by
-   Updated by
-   Soft delete flag
-   Version column
-   Audit metadata

**5.4 Authentication Data Model**

The authentication model supports multiple authentication mechanisms within a unified identity framework.

**Supported Authentication Types**

-   Username and password
-   Email and password
-   Mobile number and OTP
-   Passkeys (WebAuthn/FIDO2)
-   Multi-factor authentication
-   OAuth 2.0
-   OpenID Connect
-   SAML 2.0
-   Enterprise Single Sign-On
-   API key authentication
-   Service account authentication
-   JWT bearer authentication

**Authentication Lifecycle**

1.  User registration
2.  Identity verification
3.  Credential creation
4.  Password hashing
5.  MFA enrollment
6.  Session creation
7.  JWT issuance
8.  Refresh token generation
9.  Audit event creation
10.  Event publication

**Password Storage**

Passwords are never stored in plaintext.

Recommended hashing:

-   Argon2id
-   BCrypt (fallback)

Each password record stores:

-   password\_hash
-   algorithm
-   salt
-   iterations
-   password\_version
-   created\_at
-   expires\_at

**5.5 Authorization Model**

Kaziforce implements a layered authorization model.

**Authorization Levels**

-   Platform
-   Tenant
-   Organization
-   Business Unit
-   Department
-   Team
-   Resource
-   Record
-   Field

**Access Control Models**

The platform combines:

-   Role-Based Access Control (RBAC)
-   Attribute-Based Access Control (ABAC)
-   Policy-Based Access Control (PBAC)

**Authorization Flow**

Authentication validates identity.

Authorization evaluates:

-   User
-   Tenant
-   Roles
-   Permissions
-   Policies
-   Resource ownership
-   Organization membership
-   Context
-   Time
-   Device trust

Only then is access granted.

**5.6 Roles & Permissions**

Roles represent collections of permissions.

**Standard Platform Roles**

-   Super Administrator
-   Platform Administrator
-   Organization Administrator
-   HR Manager
-   Recruiter
-   Hiring Manager
-   Project Manager
-   Team Leader
-   Finance Manager
-   Professional
-   Client
-   AI Agent
-   Auditor
-   Support Engineer

**Permission Categories**

Identity

-   Create User
-   Update User
-   Delete User

Organization

-   Manage Organization
-   Invite Members
-   Manage Departments

Marketplace

-   Create Job
-   Publish Job
-   Hire Professional

Finance

-   View Wallet
-   Approve Payments
-   Release Escrow

AI

-   Use AI
-   Manage AI Agents

Administration

-   View Audit Logs
-   Configure System
-   Manage Integrations

The relationship structure is:

Role

↓

RolePermission

↓

Permission

Users inherit permissions through assigned roles.

**5.7 MFA Data**

The platform supports enterprise-grade Multi-Factor Authentication.

Supported methods include:

-   TOTP
-   SMS OTP
-   Email OTP
-   Push Notification
-   FIDO2
-   WebAuthn
-   Security Keys
-   Authenticator Apps

**MFA Tables**

-   mfa\_devices
-   recovery\_codes
-   mfa\_challenges

Stored attributes include:

-   secret
-   device\_name
-   issuer
-   enrollment\_date
-   last\_used
-   failed\_attempts
-   status

Recovery codes are encrypted before storage.

**5.8 OAuth & SSO**

Kaziforce supports federation with external identity providers.

**Supported Standards**

-   OAuth 2.0
-   OpenID Connect
-   SAML 2.0

**Supported Providers**

-   Google
-   Microsoft Entra ID
-   Apple
-   GitHub
-   LinkedIn
-   Facebook
-   X (Twitter)
-   Okta
-   Auth0
-   Keycloak

**Core Tables**

-   oauth\_providers
-   oauth\_accounts
-   saml\_providers
-   sso\_configurations

Stored data includes:

-   provider\_id
-   provider\_user\_id
-   access\_token (encrypted)
-   refresh\_token (encrypted)
-   scopes
-   expiration
-   tenant

**5.9 Sessions**

User sessions support continuous authentication across multiple devices.

**Session Attributes**

-   Session ID
-   User ID
-   Device
-   Browser
-   IP Address
-   Location
-   JWT ID
-   Refresh Token ID
-   Login Time
-   Last Activity
-   Expiration
-   Logout Time

**Redis Integration**

Redis maintains:

-   Active session cache
-   Online users
-   Token blacklist
-   Session expiration

PostgreSQL stores persistent session history.

**5.10 API Keys**

Kaziforce supports secure API authentication for integrations.

**Key Types**

-   Personal API Keys
-   Organization Keys
-   Service Keys
-   Internal Keys
-   Partner Keys

Stored attributes:

-   key\_id
-   hashed\_key
-   owner
-   scope
-   rate\_limit
-   expiration
-   status
-   rotation\_date

Keys are hashed before storage.

**5.11 Security Constraints**

The IAM database enforces comprehensive security controls.

**Database Constraints**

-   UUID primary keys
-   Foreign key constraints
-   Unique usernames
-   Unique emails
-   Unique API keys
-   Unique OAuth identities
-   Unique MFA registrations
-   Unique active refresh tokens

**Security Policies**

-   Password complexity
-   Password expiration
-   Password history
-   Login throttling
-   Device verification
-   Session expiration
-   IP restrictions
-   Geographic restrictions
-   Account lockout
-   Token rotation
-   Refresh token revocation
-   Encryption at rest
-   Encryption in transit

**Audit Requirements**

Every security-sensitive operation generates immutable audit records.

Examples include:

-   Login
-   Logout
-   Password change
-   MFA enrollment
-   Role assignment
-   Permission changes
-   API key creation
-   Token revocation

**5.12 Indexing Strategy**

The Identity database is optimized for extremely high authentication throughput.

**Primary Indexes**

Users

-   email
-   username
-   phone\_number

Sessions

-   user\_id
-   refresh\_token
-   expires\_at

Roles

-   role\_name

Permissions

-   permission\_code

OAuth

-   provider\_user\_id
-   provider\_id

API Keys

-   key\_hash

Security Events

-   user\_id
-   event\_type
-   timestamp

Login History

-   user\_id
-   login\_time

**Composite Indexes**

Examples include:

-   (tenant\_id, email)
-   (tenant\_id, username)
-   (user\_id, session\_status)
-   (user\_id, created\_at)
-   (role\_id, permission\_id)

**Specialized Indexes**

-   GIN indexes for JSONB policy documents
-   BRIN indexes for large audit tables
-   Partial indexes for active sessions
-   Covering indexes for authentication queries

**5.13 Partitioning Strategy**

The Identity database uses selective partitioning to optimize storage, maintenance, and query performance for high-volume tables.

**Time-Based Partitioning**

Monthly or quarterly partitions are applied to append-only tables, including:

-   login\_history
-   security\_events
-   audit\_logs
-   password\_resets
-   email\_verifications

This improves query performance for recent activity, simplifies archival, and accelerates data retention operations.

**Hash Partitioning**

Hash partitioning is applied to high-concurrency operational tables where write load must be distributed evenly, such as:

-   sessions
-   refresh\_tokens
-   api\_keys

Hashing on user\_id or tenant\_id reduces contention and balances storage across partitions.

**Tenant-Aware Strategy**

All primary tables include a tenant\_id column to support logical multi-tenancy. Frequently accessed tenant-specific queries are optimized through composite indexes that include tenant\_id, ensuring efficient isolation and predictable performance without requiring separate databases per tenant.

**Archival Strategy**

Historical authentication records that exceed the operational retention period are archived to long-term storage or analytical databases such as ClickHouse. This keeps the operational PostgreSQL database lean while preserving historical data for compliance, forensic investigations, and reporting.

**Partition Maintenance**

Partition creation, rotation, and retirement are fully automated through scheduled maintenance jobs. New partitions are provisioned in advance, and expired partitions are archived or purged in accordance with the platform's data retention policies, ensuring uninterrupted operation and minimal administrative overhead.

**6\. Organization Management Database**

**6.1 Organizations**

**Overview**

The Organization Management Database manages the enterprise structures that use Kaziforce to hire, manage, assign, pay, and monitor professionals. It is the system of record for organizations, departments, branches, teams, business units, ownership structures, reporting relationships, and enterprise memberships.

The Organization Service owns this database. Other services consume organization data through APIs, domain events, and replicated read models.

**Organization Entity**

The organizations table represents a legal, commercial, public, nonprofit, or institutional entity registered on Kaziforce.

Examples include:

-   Companies
-   Government agencies
-   NGOs
-   SACCOs
-   Schools
-   Hospitals
-   Consulting firms
-   Startups
-   Enterprises
-   International organizations

**Key Data Stored**

-   Organization identity
-   Legal name
-   Trading name
-   Registration number
-   Tax PIN
-   Industry
-   Organization type
-   Country
-   Headquarters
-   Verification status
-   Subscription status
-   Parent organization
-   Ownership metadata
-   Compliance status
-   Tenant identifier
-   Audit metadata

**Suggested Table: organizations**

**Column**

**Data Type**

**Description**

organization\_id

UUID

Primary identifier

tenant\_id

UUID

Tenant identifier

parent\_organization\_id

UUID

Optional parent organization

legal\_name

VARCHAR(255)

Registered legal name

trading\_name

VARCHAR(255)

Public or trading name

organization\_type

VARCHAR(80)

Company, NGO, Government, School, etc.

registration\_number

VARCHAR(100)

Legal registration number

tax\_identifier

VARCHAR(100)

Tax PIN or equivalent

industry\_code

VARCHAR(80)

Industry classification

country\_code

CHAR(2)

ISO country code

primary\_email

VARCHAR(255)

Main organization email

primary\_phone

VARCHAR(50)

Main phone number

website\_url

TEXT

Organization website

verification\_status

VARCHAR(50)

Pending, Verified, Rejected, Suspended

lifecycle\_status

VARCHAR(50)

Active, Inactive, Suspended, Closed

subscription\_status

VARCHAR(50)

Trial, Active, Past Due, Cancelled

metadata

JSONB

Flexible organization metadata

created\_at

TIMESTAMPTZ

Creation timestamp

updated\_at

TIMESTAMPTZ

Last update timestamp

deleted\_at

TIMESTAMPTZ

Soft delete timestamp

created\_by

UUID

Creator user ID

updated\_by

UUID

Last updater user ID

version

INTEGER

Optimistic locking version

**Design Notes**

The organizations table supports both standalone organizations and parent-child group structures. The parent\_organization\_id field enables holding-company structures, subsidiaries, regional offices, and enterprise groups.

Organization verification status is separated from lifecycle status to avoid mixing compliance review with account activity. An organization may be active but unverified, verified but suspended, or closed after previous verification.

**6.2 Departments**

**Overview**

Departments represent functional divisions within an organization. They help enterprises organize people, projects, budgets, approval workflows, workforce demand, and reporting responsibilities.

Examples include:

-   Human Resources
-   Finance
-   ICT
-   Operations
-   Sales
-   Legal
-   Procurement
-   Customer Support
-   Marketing
-   Engineering

**Suggested Table: departments**

**Column**

**Data Type**

**Description**

department\_id

UUID

Primary identifier

tenant\_id

UUID

Tenant identifier

organization\_id

UUID

Owning organization

parent\_department\_id

UUID

Optional parent department

department\_code

VARCHAR(50)

Internal code

name

VARCHAR(150)

Department name

description

TEXT

Department description

head\_user\_id

UUID

Department head

cost\_center\_code

VARCHAR(80)

Finance cost center

lifecycle\_status

VARCHAR(50)

Active, Inactive, Archived

metadata

JSONB

Flexible metadata

created\_at

TIMESTAMPTZ

Creation timestamp

updated\_at

TIMESTAMPTZ

Update timestamp

deleted\_at

TIMESTAMPTZ

Soft delete timestamp

version

INTEGER

Version number

**Relationships**

-   One organization has many departments.
-   One department may have many child departments.
-   One department may have one department head.
-   One department may own many teams.
-   One department may be linked to many projects and jobs.

**Design Notes**

The parent\_department\_id field supports hierarchical department structures. This is useful for large enterprises where departments contain sections, units, or divisions.

**6.3 Teams**

**Overview**

Teams represent operational working groups within departments or directly under organizations. Teams may be permanent, temporary, project-based, cross-functional, or AI-assisted.

Examples include:

-   Product Team
-   Recruitment Team
-   Payroll Team
-   Field Operations Team
-   Customer Success Team
-   AI Review Team
-   Project Delivery Team

**Suggested Table: teams**

**Column**

**Data Type**

**Description**

team\_id

UUID

Primary identifier

tenant\_id

UUID

Tenant identifier

organization\_id

UUID

Owning organization

department\_id

UUID

Optional department

business\_unit\_id

UUID

Optional business unit

team\_code

VARCHAR(50)

Internal team code

name

VARCHAR(150)

Team name

team\_type

VARCHAR(80)

Permanent, Project, Cross Functional, AI Assisted

description

TEXT

Team description

team\_lead\_user\_id

UUID

Team lead

lifecycle\_status

VARCHAR(50)

Active, Inactive, Archived

metadata

JSONB

Flexible metadata

created\_at

TIMESTAMPTZ

Creation timestamp

updated\_at

TIMESTAMPTZ

Update timestamp

deleted\_at

TIMESTAMPTZ

Soft delete timestamp

version

INTEGER

Optimistic lock version

**Suggested Table: team\_members**

**Column**

**Data Type**

**Description**

team\_member\_id

UUID

Primary identifier

tenant\_id

UUID

Tenant identifier

team\_id

UUID

Team identifier

user\_id

UUID

User identifier from Identity Service

professional\_profile\_id

UUID

Optional professional profile reference

member\_role

VARCHAR(80)

Lead, Member, Reviewer, Contributor

allocation\_percentage

NUMERIC(5,2)

Work allocation

joined\_at

TIMESTAMPTZ

Join date

left\_at

TIMESTAMPTZ

Leave date

status

VARCHAR(50)

Active, Inactive, Removed

metadata

JSONB

Flexible metadata

**Relationships**

-   One organization has many teams.
-   One department may have many teams.
-   One business unit may have many teams.
-   One team has many members.
-   One user may belong to many teams.

**6.4 Branches**

**Overview**

Branches represent physical or regional operating locations of an organization. They are used for location-based workforce management, reporting, compliance, payroll configuration, local hiring, and operational planning.

Examples include:

-   Nairobi Head Office
-   Mombasa Branch
-   Kisumu Regional Office
-   Kampala Office
-   Lagos Office
-   Remote Africa Region
-   Global Virtual Branch

**Suggested Table: branches**

**Column**

**Data Type**

**Description**

branch\_id

UUID

Primary identifier

tenant\_id

UUID

Tenant identifier

organization\_id

UUID

Owning organization

branch\_code

VARCHAR(50)

Internal branch code

name

VARCHAR(150)

Branch name

branch\_type

VARCHAR(80)

Head Office, Regional, Field, Virtual

country\_code

CHAR(2)

Country

region

VARCHAR(120)

Region, state, or county

city

VARCHAR(120)

City or town

physical\_address

TEXT

Physical address

postal\_address

TEXT

Postal address

latitude

NUMERIC(10,7)

Optional latitude

longitude

NUMERIC(10,7)

Optional longitude

manager\_user\_id

UUID

Branch manager

timezone

VARCHAR(80)

Branch timezone

lifecycle\_status

VARCHAR(50)

Active, Inactive, Closed

metadata

JSONB

Flexible metadata

created\_at

TIMESTAMPTZ

Creation timestamp

updated\_at

TIMESTAMPTZ

Update timestamp

deleted\_at

TIMESTAMPTZ

Soft delete timestamp

**Design Notes**

Branches support both physical and virtual operating locations. This is important for hybrid and remote-first organizations that manage distributed professionals.

**6.5 Business Units**

**Overview**

Business Units represent strategic operating divisions within an organization. They may own budgets, revenue targets, products, services, teams, projects, workforce plans, and P&L responsibilities.

Examples include:

-   Software Development
-   Consulting Services
-   Managed Services
-   Digital Marketing
-   Training Academy
-   Regional Business Unit
-   Enterprise Sales
-   Government Projects

**Suggested Table: business\_units**

**Column**

**Data Type**

**Description**

business\_unit\_id

UUID

Primary identifier

tenant\_id

UUID

Tenant identifier

organization\_id

UUID

Owning organization

parent\_business\_unit\_id

UUID

Optional parent BU

business\_unit\_code

VARCHAR(50)

Internal code

name

VARCHAR(150)

Business unit name

description

TEXT

Description

head\_user\_id

UUID

Business unit head

cost\_center\_code

VARCHAR(80)

Finance cost center

profit\_center\_code

VARCHAR(80)

Profit center code

lifecycle\_status

VARCHAR(50)

Active, Inactive, Archived

metadata

JSONB

Flexible metadata

created\_at

TIMESTAMPTZ

Creation timestamp

updated\_at

TIMESTAMPTZ

Update timestamp

deleted\_at

TIMESTAMPTZ

Soft delete timestamp

version

INTEGER

Version number

**Relationships**

-   One organization has many business units.
-   One business unit may have many child business units.
-   One business unit may own departments.
-   One business unit may own teams.
-   One business unit may own projects, jobs, and budgets.

**6.6 Organization Hierarchy**

**Overview**

Kaziforce supports complex organizational hierarchies required by SMEs, enterprises, government agencies, NGOs, regional institutions, multinational companies, and holding groups.

The hierarchy model supports:

-   Parent-child organizations
-   Subsidiaries
-   Departments
-   Sub-departments
-   Business units
-   Branches
-   Teams
-   Matrix reporting
-   Project-based reporting
-   Temporary working groups

**Hierarchy Design Options**

The Organization Management Database uses a hybrid hierarchy approach:

1.  **Adjacency List Model** for simple parent-child relationships.
2.  **Closure Table Model** for efficient hierarchy traversal.
3.  **Graph Projection** into Neo4j for advanced organizational analytics.

**Suggested Table: organization\_hierarchy\_paths**

**Column**

**Data Type**

**Description**

hierarchy\_path\_id

UUID

Primary identifier

tenant\_id

UUID

Tenant identifier

ancestor\_type

VARCHAR(50)

Organization, Department, BusinessUnit, Team

ancestor\_id

UUID

Ancestor entity ID

descendant\_type

VARCHAR(50)

Organization, Department, BusinessUnit, Team

descendant\_id

UUID

Descendant entity ID

depth

INTEGER

Distance between ancestor and descendant

relationship\_type

VARCHAR(80)

Owns, Contains, ReportsTo, Manages

created\_at

TIMESTAMPTZ

Creation timestamp

**Design Notes**

The closure table enables fast queries such as:

-   Get all departments under an organization.
-   Get all teams under a business unit.
-   Get full reporting chain for a department.
-   Get all descendants under a parent company.
-   Get all ancestors of a team.

**6.7 Enterprise Relationships**

**Overview**

Organizations may have relationships with other organizations. These relationships support partner ecosystems, vendor management, client relationships, consortiums, subcontracting, outsourcing, and enterprise workforce networks.

**Suggested Table: organization\_relationships**

**Column**

**Data Type**

**Description**

relationship\_id

UUID

Primary identifier

tenant\_id

UUID

Tenant identifier

source\_organization\_id

UUID

First organization

target\_organization\_id

UUID

Related organization

relationship\_type

VARCHAR(80)

Client, Vendor, Partner, Subsidiary, Contractor

relationship\_status

VARCHAR(50)

Active, Pending, Suspended, Ended

start\_date

DATE

Relationship start date

end\_date

DATE

Relationship end date

contract\_reference

VARCHAR(150)

Optional contract reference

metadata

JSONB

Flexible metadata

created\_at

TIMESTAMPTZ

Creation timestamp

updated\_at

TIMESTAMPTZ

Update timestamp

**Common Relationship Types**

-   Client
-   Vendor
-   Partner
-   Parent Company
-   Subsidiary
-   Contractor
-   Outsourcing Provider
-   Strategic Alliance
-   Regulator
-   Training Partner
-   Payment Partner

**Design Notes**

Enterprise relationships are directional. For example, Organization A may be the vendor of Organization B, while Organization B is the client of Organization A. Directionality should be preserved to avoid ambiguity.

**6.8 ERD**

**Conceptual ERD**

Organization

├── Department

│ └── Team

├── BusinessUnit

│ └── Team

├── Branch

├── OrganizationMembership

├── OrganizationRelationship

└── OrganizationHierarchyPath

BusinessUnit

├── Department

└── Team

Team

└── TeamMember

User

├── OrganizationMembership

└── TeamMember

**Relationship Summary**

**Parent Entity**

**Child Entity**

**Cardinality**

Organization

Department

1:N

Organization

Branch

1:N

Organization

Business Unit

1:N

Organization

Team

1:N

Department

Team

1:N

Business Unit

Team

1:N

Team

Team Member

1:N

User

Team Member

1:N

Organization

Organization Relationship

1:N

Organization

Organization Hierarchy Path

1:N

**ERD Design Notes**

The ERD is intentionally modular. The Organization Service owns organizational structure while the Identity Service owns user identity. User references are stored as UUIDs, but the Organization Service does not own the actual user records.

**6.9 Constraints**

**Primary Key Constraints**

Every table uses UUID primary keys:

-   organization\_id
-   department\_id
-   team\_id
-   branch\_id
-   business\_unit\_id
-   team\_member\_id
-   relationship\_id
-   hierarchy\_path\_id

**Foreign Key Constraints**

Recommended foreign key constraints within the Organization database:

-   departments.organization\_id → organizations.organization\_id
-   departments.parent\_department\_id → departments.department\_id
-   teams.organization\_id → organizations.organization\_id
-   teams.department\_id → departments.department\_id
-   teams.business\_unit\_id → business\_units.business\_unit\_id
-   branches.organization\_id → organizations.organization\_id
-   business\_units.organization\_id → organizations.organization\_id
-   business\_units.parent\_business\_unit\_id → business\_units.business\_unit\_id
-   team\_members.team\_id → teams.team\_id
-   organization\_relationships.source\_organization\_id → organizations.organization\_id
-   organization\_relationships.target\_organization\_id → organizations.organization\_id

Cross-service identifiers such as user\_id should be validated through service APIs or event-synchronized read models rather than direct foreign keys to the Identity database.

**Unique Constraints**

Recommended unique constraints:

-   Unique organization registration number per country.
-   Unique tax identifier per country.
-   Unique department code per organization.
-   Unique business unit code per organization.
-   Unique branch code per organization.
-   Unique team code per organization.
-   Unique active team membership per user and team.
-   Unique organization relationship per source, target, and relationship type.

**Check Constraints**

Recommended check constraints:

-   allocation\_percentage BETWEEN 0 AND 100
-   end\_date IS NULL OR end\_date >= start\_date
-   latitude BETWEEN -90 AND 90
-   longitude BETWEEN -180 AND 180
-   lifecycle\_status IN ('ACTIVE', 'INACTIVE', 'SUSPENDED', 'ARCHIVED', 'CLOSED')
-   verification\_status IN ('PENDING', 'VERIFIED', 'REJECTED', 'SUSPENDED')

**Soft Delete Rules**

All core tables should support soft deletes using deleted\_at. Records should not be physically deleted unless required by retention, legal, or privacy policies.

**Cascading Rules**

Hard cascading deletes should be avoided for business-critical records. Preferred behavior:

-   Restrict delete where child records exist.
-   Use soft delete for deactivation.
-   Use archival for old inactive structures.
-   Preserve historical membership, assignment, and reporting data.

**6.10 Indexes**

**Organization Indexes**

Recommended indexes for organizations:

-   idx\_organizations\_tenant\_id
-   idx\_organizations\_parent\_organization\_id
-   idx\_organizations\_country\_code
-   idx\_organizations\_legal\_name
-   idx\_organizations\_trading\_name
-   idx\_organizations\_verification\_status
-   idx\_organizations\_lifecycle\_status
-   idx\_organizations\_registration\_number\_country
-   idx\_organizations\_tax\_identifier\_country

**Department Indexes**

Recommended indexes for departments:

-   idx\_departments\_tenant\_organization
-   idx\_departments\_parent\_department
-   idx\_departments\_code
-   idx\_departments\_name
-   idx\_departments\_head\_user
-   idx\_departments\_lifecycle\_status

**Team Indexes**

Recommended indexes for teams:

-   idx\_teams\_tenant\_organization
-   idx\_teams\_department\_id
-   idx\_teams\_business\_unit\_id
-   idx\_teams\_team\_lead\_user\_id
-   idx\_teams\_team\_type
-   idx\_teams\_lifecycle\_status

**Team Member Indexes**

Recommended indexes for team\_members:

-   idx\_team\_members\_team\_id
-   idx\_team\_members\_user\_id
-   idx\_team\_members\_professional\_profile\_id
-   idx\_team\_members\_status
-   idx\_team\_members\_active\_membership

**Branch Indexes**

Recommended indexes for branches:

-   idx\_branches\_tenant\_organization
-   idx\_branches\_country\_region\_city
-   idx\_branches\_manager\_user\_id
-   idx\_branches\_lifecycle\_status
-   idx\_branches\_location

**Business Unit Indexes**

Recommended indexes for business\_units:

-   idx\_business\_units\_tenant\_organization
-   idx\_business\_units\_parent\_business\_unit
-   idx\_business\_units\_head\_user
-   idx\_business\_units\_cost\_center
-   idx\_business\_units\_profit\_center
-   idx\_business\_units\_lifecycle\_status

**Hierarchy Indexes**

Recommended indexes for organization\_hierarchy\_paths:

-   idx\_hierarchy\_ancestor
-   idx\_hierarchy\_descendant
-   idx\_hierarchy\_tenant\_depth
-   idx\_hierarchy\_relationship\_type

**Relationship Indexes**

Recommended indexes for organization\_relationships:

-   idx\_org\_relationships\_source
-   idx\_org\_relationships\_target
-   idx\_org\_relationships\_type
-   idx\_org\_relationships\_status
-   idx\_org\_relationships\_active\_period

**Indexing Design Notes**

Indexes must be tenant-aware wherever query patterns are tenant-scoped. Composite indexes should place tenant\_id first, followed by the most selective query column. Partial indexes should be used for active records where soft deletes are implemented.

Example:

CREATE INDEX idx\_organizations\_active\_tenant

ON organizations (tenant\_id, lifecycle\_status)

WHERE deleted\_at IS NULL;

This approach improves performance for common queries while reducing index bloat caused by inactive or archived records.

**7\. User Profile Database**

**7.1 Professional Profiles**

**Overview**

The User Profile Database manages professional workforce identity within Kaziforce. While the Identity Service owns authentication identity, the Profile Service owns the professional, career, skills, experience, portfolio, and employability data used for workforce discovery, hiring, matching, recommendations, learning, and AI-powered career intelligence.

The Professional Profile is the aggregate root for the Profile bounded context. It represents a user's professional presence on Kaziforce and is the primary entity used by the Marketplace Service, AI Matching Engine, Search Service, Learning Service, Workforce Management Service, and Analytics Service.

**Primary Database Technologies**

The Profile Service uses a hybrid persistence model:

**Data Store**

**Purpose**

PostgreSQL

Structured profile records, skills, certifications, education, experience, availability

MongoDB

Flexible profile documents, resumes, parsed CV data, portfolio metadata, AI-generated profile summaries

OpenSearch

Searchable professional profile index

Vector Store / pgvector

Semantic profile search and AI matching

Object Storage

CVs, certificates, images, videos, portfolio files

**Suggested Table: professional\_profiles**

**Column**

**Data Type**

**Description**

profile\_id

UUID

Primary profile identifier

tenant\_id

UUID

Tenant identifier

user\_id

UUID

User identifier from Identity Service

display\_name

VARCHAR(180)

Public professional display name

headline

VARCHAR(255)

Short professional title

professional\_summary

TEXT

Profile summary

profile\_type

VARCHAR(80)

Freelancer, Consultant, Contractor, Employee, AI Agent

primary\_category

VARCHAR(120)

Main professional category

experience\_level

VARCHAR(80)

Junior, Mid-Level, Senior, Expert

country\_code

CHAR(2)

Country of residence

city

VARCHAR(120)

City or location

timezone

VARCHAR(80)

User timezone

hourly\_rate\_min

NUMERIC(12,2)

Minimum hourly rate

hourly\_rate\_max

NUMERIC(12,2)

Maximum hourly rate

currency\_code

CHAR(3)

Preferred currency

visibility\_status

VARCHAR(50)

Public, Private, Invite Only

verification\_status

VARCHAR(50)

Unverified, Pending, Verified, Rejected

profile\_completion\_score

NUMERIC(5,2)

Completion percentage

availability\_status

VARCHAR(50)

Available, Busy, Not Available

search\_visibility

BOOLEAN

Whether profile is searchable

metadata

JSONB

Flexible profile metadata

created\_at

TIMESTAMPTZ

Record creation timestamp

updated\_at

TIMESTAMPTZ

Last update timestamp

deleted\_at

TIMESTAMPTZ

Soft delete timestamp

version

INTEGER

Optimistic locking version

**Design Notes**

The professional\_profiles table should not duplicate authentication credentials. It only stores professional identity and employability attributes. The user\_id is a cross-service reference to the Identity Service and should be validated using APIs or event-synchronized read models.

**7.2 Skills**

**Overview**

Skills are central to Kaziforce's workforce matching, search, AI recommendations, learning paths, and professional discovery. The skills model supports standardized skill catalogs, user-declared skills, verified skills, skill levels, endorsements, and AI-inferred skills.

**Suggested Table: skills**

**Column**

**Data Type**

**Description**

skill\_id

UUID

Primary skill identifier

skill\_name

VARCHAR(150)

Canonical skill name

skill\_slug

VARCHAR(180)

URL/search-friendly skill key

category

VARCHAR(120)

Skill category

subcategory

VARCHAR(120)

Skill subcategory

description

TEXT

Skill description

is\_active

BOOLEAN

Active status

is\_verified\_catalog\_skill

BOOLEAN

Whether skill is approved in catalog

metadata

JSONB

Extra metadata

created\_at

TIMESTAMPTZ

Creation timestamp

updated\_at

TIMESTAMPTZ

Update timestamp

**Suggested Table: profile\_skills**

**Column**

**Data Type**

**Description**

profile\_skill\_id

UUID

Primary identifier

tenant\_id

UUID

Tenant identifier

profile\_id

UUID

Professional profile

skill\_id

UUID

Skill reference

proficiency\_level

VARCHAR(50)

Beginner, Intermediate, Advanced, Expert

years\_of\_experience

NUMERIC(4,1)

Experience duration

is\_primary

BOOLEAN

Marks core skill

verification\_status

VARCHAR(50)

Self Declared, Verified, AI Inferred

source

VARCHAR(80)

User, Certificate, Resume, AI, Employer

endorsement\_count

INTEGER

Number of endorsements

last\_used\_at

DATE

Last known usage date

created\_at

TIMESTAMPTZ

Creation timestamp

updated\_at

TIMESTAMPTZ

Update timestamp

**Design Notes**

Skills should be normalized through the skills catalog to prevent duplication such as “JavaScript”, “Javascript”, and “JS”. AI-inferred skills should be flagged separately from user-declared and verified skills.

**7.3 Certifications**

**Overview**

Certifications validate professional competence and increase trust in hiring decisions. Kaziforce supports uploaded certificates, externally verified credentials, platform-issued certificates, learning-based certifications, and future blockchain-backed credentials.

**Suggested Table: certifications**

**Column**

**Data Type**

**Description**

certification\_id

UUID

Primary identifier

certification\_name

VARCHAR(200)

Certification name

issuing\_organization

VARCHAR(200)

Issuer name

category

VARCHAR(120)

Certification category

description

TEXT

Description

is\_active

BOOLEAN

Catalog status

metadata

JSONB

Extra metadata

**Suggested Table: profile\_certifications**

**Column**

**Data Type**

**Description**

profile\_certification\_id

UUID

Primary identifier

tenant\_id

UUID

Tenant identifier

profile\_id

UUID

Professional profile

certification\_id

UUID

Certification catalog reference

certificate\_title

VARCHAR(255)

User-facing title

issuer\_name

VARCHAR(200)

Actual issuing body

issue\_date

DATE

Date issued

expiry\_date

DATE

Expiry date

credential\_id

VARCHAR(150)

External credential number

credential\_url

TEXT

Verification URL

document\_object\_key

TEXT

Object storage reference

verification\_status

VARCHAR(50)

Pending, Verified, Rejected, Expired

verified\_by

UUID

Verifier user ID

verified\_at

TIMESTAMPTZ

Verification timestamp

metadata

JSONB

Extra metadata

created\_at

TIMESTAMPTZ

Creation timestamp

updated\_at

TIMESTAMPTZ

Update timestamp

**Design Notes**

Expired certifications should not be deleted. They remain part of the professional history but should be excluded from “currently valid” matching unless business rules allow historical recognition.

**7.4 Licenses**

**Overview**

Licenses represent legal or regulatory authorization to perform certain professional activities. These are important for regulated professions such as medicine, law, engineering, accounting, aviation, security, education, and financial services.

**Suggested Table: profile\_licenses**

**Column**

**Data Type**

**Description**

license\_id

UUID

Primary identifier

tenant\_id

UUID

Tenant identifier

profile\_id

UUID

Professional profile

license\_name

VARCHAR(200)

License name

license\_number

VARCHAR(150)

License number

issuing\_authority

VARCHAR(200)

Regulator or authority

country\_code

CHAR(2)

Country of issue

jurisdiction

VARCHAR(150)

Region, state, or county

issue\_date

DATE

Date issued

expiry\_date

DATE

Expiry date

license\_status

VARCHAR(50)

Active, Expired, Suspended, Revoked

verification\_status

VARCHAR(50)

Pending, Verified, Rejected

document\_object\_key

TEXT

License file reference

metadata

JSONB

Extra metadata

created\_at

TIMESTAMPTZ

Creation timestamp

updated\_at

TIMESTAMPTZ

Update timestamp

**Design Notes**

Licenses should support jurisdiction-specific validation. For example, a medical license may be valid in one country or region but not globally.

**7.5 Languages**

**Overview**

Languages support cross-border work, customer service roles, translation roles, localization, hiring filters, and AI matching.

**Suggested Table: languages**

**Column**

**Data Type**

**Description**

language\_code

VARCHAR(10)

ISO language code

language\_name

VARCHAR(120)

Language name

is\_active

BOOLEAN

Active status

**Suggested Table: profile\_languages**

**Column**

**Data Type**

**Description**

profile\_language\_id

UUID

Primary identifier

tenant\_id

UUID

Tenant identifier

profile\_id

UUID

Professional profile

language\_code

VARCHAR(10)

Language reference

speaking\_level

VARCHAR(50)

Basic, Conversational, Fluent, Native

writing\_level

VARCHAR(50)

Basic, Conversational, Fluent, Native

reading\_level

VARCHAR(50)

Basic, Conversational, Fluent, Native

is\_primary

BOOLEAN

Primary language flag

created\_at

TIMESTAMPTZ

Creation timestamp

**7.6 Education**

**Overview**

Education data records formal learning history and supports trust, qualification filtering, AI matching, and professional verification.

**Suggested Table: profile\_education**

**Column**

**Data Type**

**Description**

education\_id

UUID

Primary identifier

tenant\_id

UUID

Tenant identifier

profile\_id

UUID

Professional profile

institution\_name

VARCHAR(255)

School, college, or university

qualification\_type

VARCHAR(100)

Degree, Diploma, Certificate, Masters, PhD

field\_of\_study

VARCHAR(180)

Area of study

grade

VARCHAR(80)

Grade or classification

country\_code

CHAR(2)

Country

start\_date

DATE

Start date

end\_date

DATE

End date

is\_current

BOOLEAN

Ongoing education

verification\_status

VARCHAR(50)

Pending, Verified, Rejected

document\_object\_key

TEXT

Certificate or transcript reference

metadata

JSONB

Extra metadata

created\_at

TIMESTAMPTZ

Creation timestamp

updated\_at

TIMESTAMPTZ

Update timestamp

**Design Notes**

Education records should support partial dates because some users may know only graduation year. Where exact dates are unavailable, the service may store normalized start/end dates while maintaining raw date text in metadata.

**7.7 Work Experience**

**Overview**

Work experience captures a professional's career history and project exposure. It supports marketplace trust, profile ranking, AI matching, recommendations, and verification.

**Suggested Table: profile\_work\_experience**

**Column**

**Data Type**

**Description**

experience\_id

UUID

Primary identifier

tenant\_id

UUID

Tenant identifier

profile\_id

UUID

Professional profile

organization\_name

VARCHAR(255)

Employer or client

role\_title

VARCHAR(200)

Job title

employment\_type

VARCHAR(80)

Full-Time, Part-Time, Contract, Freelance, Internship

industry

VARCHAR(120)

Industry

location

VARCHAR(180)

Work location

country\_code

CHAR(2)

Country

start\_date

DATE

Start date

end\_date

DATE

End date

is\_current

BOOLEAN

Current role flag

responsibilities

TEXT

Work description

achievements

TEXT

Key achievements

verification\_status

VARCHAR(50)

Pending, Verified, Rejected

metadata

JSONB

Extra metadata

created\_at

TIMESTAMPTZ

Creation timestamp

updated\_at

TIMESTAMPTZ

Update timestamp

**Design Notes**

Work experience should support both traditional employment and project-based freelance history. AI matching should consider recency, role relevance, industry, verified status, and skill overlap.

**7.8 Portfolio**

**Overview**

Portfolio records showcase completed work, case studies, creative outputs, publications, code repositories, designs, reports, media, and other evidence of professional capability.

**Suggested Table: profile\_portfolio\_items**

**Column**

**Data Type**

**Description**

portfolio\_item\_id

UUID

Primary identifier

tenant\_id

UUID

Tenant identifier

profile\_id

UUID

Professional profile

title

VARCHAR(255)

Portfolio item title

description

TEXT

Description

portfolio\_type

VARCHAR(80)

Project, Design, Code, Article, Video, Case Study

project\_url

TEXT

Public URL

object\_key

TEXT

Object storage reference

thumbnail\_object\_key

TEXT

Thumbnail reference

skills\_used

JSONB

Skills demonstrated

completion\_date

DATE

Completion date

visibility\_status

VARCHAR(50)

Public, Private, Invite Only

verification\_status

VARCHAR(50)

Unverified, Verified, Flagged

metadata

JSONB

Extra metadata

created\_at

TIMESTAMPTZ

Creation timestamp

updated\_at

TIMESTAMPTZ

Update timestamp

**Design Notes**

Portfolio files should not be stored directly in PostgreSQL. Only metadata and object storage references should be stored in the profile database.

**7.9 Career Preferences**

**Overview**

Career preferences define the type of work a professional wants. They are used by the AI Matching Engine, Marketplace Service, Notification Service, and Recommendation Engine.

**Suggested Table: profile\_career\_preferences**

**Column**

**Data Type**

**Description**

preference\_id

UUID

Primary identifier

tenant\_id

UUID

Tenant identifier

profile\_id

UUID

Professional profile

preferred\_work\_types

JSONB

Freelance, Contract, Full-Time, Fractional

preferred\_industries

JSONB

Target industries

preferred\_roles

JSONB

Desired roles

preferred\_locations

JSONB

Target locations

remote\_preference

VARCHAR(50)

Remote, Hybrid, Onsite, Flexible

preferred\_rate\_min

NUMERIC(12,2)

Minimum preferred rate

preferred\_rate\_max

NUMERIC(12,2)

Maximum preferred rate

preferred\_currency

CHAR(3)

Currency

willing\_to\_relocate

BOOLEAN

Relocation flag

open\_to\_cross\_border\_work

BOOLEAN

Cross-border work flag

notice\_period\_days

INTEGER

Availability notice period

metadata

JSONB

Extra metadata

updated\_at

TIMESTAMPTZ

Update timestamp

**7.10 Availability**

**Overview**

Availability records determine whether a professional can be matched to new jobs, contracts, shifts, projects, or fractional assignments.

**Suggested Table: profile\_availability**

**Column**

**Data Type**

**Description**

availability\_id

UUID

Primary identifier

tenant\_id

UUID

Tenant identifier

profile\_id

UUID

Professional profile

availability\_status

VARCHAR(50)

Available, Busy, Unavailable

available\_from

DATE

Earliest start date

hours\_per\_week

INTEGER

Weekly availability

preferred\_schedule

JSONB

Days and hours

timezone

VARCHAR(80)

Timezone

max\_active\_projects

INTEGER

Maximum projects

current\_active\_projects

INTEGER

Current workload

updated\_at

TIMESTAMPTZ

Update timestamp

**Suggested Table: profile\_availability\_blocks**

**Column**

**Data Type**

**Description**

block\_id

UUID

Primary identifier

tenant\_id

UUID

Tenant identifier

profile\_id

UUID

Professional profile

block\_type

VARCHAR(50)

Available, Unavailable, Vacation, Booked

start\_time

TIMESTAMPTZ

Start datetime

end\_time

TIMESTAMPTZ

End datetime

reason

TEXT

Optional reason

source

VARCHAR(80)

Manual, Calendar, Contract, System

created\_at

TIMESTAMPTZ

Creation timestamp

**Design Notes**

Availability should integrate with Calendar, Marketplace, and Workforce Management services through events. Active contracts and assignments may automatically reduce available capacity.

**7.11 AI Profile Data**

**Overview**

AI Profile Data supports intelligent matching, professional ranking, recommendations, semantic search, skill inference, and career guidance.

**Suggested Table: profile\_ai\_features**

**Column**

**Data Type**

**Description**

ai\_feature\_id

UUID

Primary identifier

tenant\_id

UUID

Tenant identifier

profile\_id

UUID

Professional profile

feature\_set\_version

VARCHAR(80)

Feature set version

skill\_vector\_score

NUMERIC(8,4)

Skill strength score

experience\_score

NUMERIC(8,4)

Experience strength

reliability\_score

NUMERIC(8,4)

Reliability score

profile\_quality\_score

NUMERIC(8,4)

Profile quality

marketplace\_readiness\_score

NUMERIC(8,4)

Hiring readiness score

inferred\_roles

JSONB

AI-inferred roles

inferred\_skills

JSONB

AI-inferred skills

ai\_summary

TEXT

AI-generated summary

generated\_at

TIMESTAMPTZ

Generation timestamp

model\_version

VARCHAR(80)

AI model version

**Suggested Table: profile\_embeddings**

**Column**

**Data Type**

**Description**

embedding\_id

UUID

Primary identifier

tenant\_id

UUID

Tenant identifier

profile\_id

UUID

Professional profile

embedding\_type

VARCHAR(80)

Profile, Skills, Resume, Portfolio

model\_name

VARCHAR(120)

Embedding model

model\_version

VARCHAR(80)

Model version

vector\_dimension

INTEGER

Embedding dimension

vector\_ref

TEXT

Vector store reference or pgvector column

source\_hash

VARCHAR(128)

Hash of source content

generated\_at

TIMESTAMPTZ

Generation timestamp

expires\_at

TIMESTAMPTZ

Optional refresh expiry

**Design Notes**

AI-generated fields must be traceable to model version, source data, and generation timestamp. AI-inferred skills should not overwrite verified professional data without explicit validation.

**7.12 Resume Storage**

**Overview**

Resume storage handles uploaded CVs, parsed resumes, extracted skills, employment history, education, AI summaries, and document verification.

**Storage Model**

-   Original file stored in Object Storage.
-   Metadata stored in PostgreSQL.
-   Parsed resume document stored in MongoDB.
-   Extracted searchable fields indexed in OpenSearch.
-   Resume embeddings stored in vector database.

**Suggested Table: profile\_resumes**

**Column**

**Data Type**

**Description**

resume\_id

UUID

Primary identifier

tenant\_id

UUID

Tenant identifier

profile\_id

UUID

Professional profile

file\_name

VARCHAR(255)

Original file name

file\_type

VARCHAR(80)

PDF, DOCX, TXT

file\_size\_bytes

BIGINT

File size

object\_key

TEXT

Object storage key

checksum

VARCHAR(128)

File integrity hash

parse\_status

VARCHAR(50)

Pending, Parsed, Failed

parser\_version

VARCHAR(80)

Parser version

parsed\_document\_id

VARCHAR(120)

MongoDB document ID

is\_primary

BOOLEAN

Primary resume flag

uploaded\_at

TIMESTAMPTZ

Upload timestamp

parsed\_at

TIMESTAMPTZ

Parse timestamp

deleted\_at

TIMESTAMPTZ

Soft delete timestamp

**MongoDB Collection: parsed\_resumes**

Suggested document structure:

{

"resume\_id": "uuid",

"profile\_id": "uuid",

"tenant\_id": "uuid",

"raw\_text": "Extracted resume text",

"sections": {

"summary": "...",

"skills": \[\],

"experience": \[\],

"education": \[\],

"certifications": \[\],

"projects": \[\]

},

"parser\_metadata": {

"parser\_version": "v1.0",

"confidence\_score": 0.92,

"language": "en"

},

"created\_at": "timestamp"

}

**7.13 Profile Search Model**

**Overview**

The Profile Search Model enables fast discovery of professionals using keyword search, filters, ranking, semantic search, and AI matching.

**OpenSearch Index: profiles\_v1**

Suggested indexed fields:

**Field**

**Type**

**Purpose**

profile\_id

keyword

Profile identifier

tenant\_id

keyword

Tenant filtering

display\_name

text/keyword

Name search

headline

text

Title search

professional\_summary

text

Full-text search

skills

nested

Skill filters and search

certifications

nested

Certification filters

experience\_level

keyword

Filtering

country\_code

keyword

Location filtering

city

keyword/text

Location search

hourly\_rate\_min

double

Rate filtering

hourly\_rate\_max

double

Rate filtering

availability\_status

keyword

Availability filter

verification\_status

keyword

Trust filter

profile\_completion\_score

double

Ranking

ai\_summary

text

AI-generated searchable text

embedding\_vector

dense\_vector

Semantic search

**Ranking Signals**

Profile ranking should consider:

-   Skill relevance
-   Verified skills
-   Experience level
-   Profile completion
-   Availability
-   Location fit
-   Rate fit
-   Certification strength
-   Work history relevance
-   Portfolio quality
-   AI match score
-   Employer feedback
-   Response rate
-   Reliability score

**Synchronization**

Profile search indexes are updated through Kafka events:

-   ProfileCreated
-   ProfileUpdated
-   SkillAdded
-   CertificationVerified
-   ResumeParsed
-   AvailabilityChanged
-   ProfileVisibilityChanged
-   AIProfileFeaturesUpdated

**7.14 ERD**

**Conceptual ERD**

ProfessionalProfile

├── ProfileSkill

│ └── Skill

├── ProfileCertification

│ └── Certification

├── ProfileLicense

├── ProfileLanguage

│ └── Language

├── ProfileEducation

├── ProfileWorkExperience

├── ProfilePortfolioItem

├── ProfileCareerPreference

├── ProfileAvailability

│ └── ProfileAvailabilityBlock

├── ProfileResume

├── ProfileAIFeature

└── ProfileEmbedding

**Relationship Summary**

**Parent Entity**

**Child Entity**

**Cardinality**

Professional Profile

Profile Skills

1:N

Skill

Profile Skills

1:N

Professional Profile

Certifications

1:N

Professional Profile

Licenses

1:N

Professional Profile

Languages

1:N

Professional Profile

Education

1:N

Professional Profile

Work Experience

1:N

Professional Profile

Portfolio Items

1:N

Professional Profile

Career Preferences

1:1

Professional Profile

Availability

1:1

Availability

Availability Blocks

1:N

Professional Profile

Resumes

1:N

Professional Profile

AI Features

1:N

Professional Profile

Embeddings

1:N

**ERD Design Notes**

The Professional Profile aggregate should remain the central entry point for all profile changes. Child records such as skills, education, experience, and certifications are managed within the Profile Service and published outward through events. Search, AI matching, analytics, and marketplace services consume replicated views but do not directly modify authoritative profile data.

**8\. Workforce Marketplace Database**

**8.1 Jobs**

**Overview**

The Workforce Marketplace Database manages the commercial and operational data used to publish jobs, receive applications, evaluate candidates, issue offers, manage negotiations, create contracts, and track marketplace performance.

The Marketplace Service owns this database. It acts as the system of record for marketplace demand, hiring workflows, applications, contracts, offers, and engagement lifecycle data.

A Job represents an organization's demand for professional capability. Jobs may support freelance work, fractional roles, full-time hiring, short-term gigs, consulting assignments, AI-agent work, remote work, hybrid work, and cross-border engagements.

**Suggested Table: jobs**

**Column**

**Data Type**

**Description**

job\_id

UUID

Primary job identifier

tenant\_id

UUID

Tenant identifier

organization\_id

UUID

Hiring organization reference

department\_id

UUID

Optional department reference

business\_unit\_id

UUID

Optional business unit reference

branch\_id

UUID

Optional branch reference

created\_by\_user\_id

UUID

User who created the job

job\_title

VARCHAR(255)

Job title

job\_slug

VARCHAR(300)

URL-friendly job identifier

job\_description

TEXT

Full job description

job\_category

VARCHAR(150)

Main job category

job\_subcategory

VARCHAR(150)

Job subcategory

engagement\_model\_id

UUID

Engagement model reference

work\_mode

VARCHAR(50)

Remote, Hybrid, Onsite

country\_code

CHAR(2)

Country of work

city

VARCHAR(120)

City or location

timezone

VARCHAR(80)

Expected work timezone

experience\_level

VARCHAR(80)

Junior, Mid-Level, Senior, Expert

budget\_type

VARCHAR(50)

Fixed, Hourly, Monthly, Salary

budget\_min

NUMERIC(14,2)

Minimum budget

budget\_max

NUMERIC(14,2)

Maximum budget

currency\_code

CHAR(3)

Budget currency

expected\_start\_date

DATE

Expected start date

expected\_end\_date

DATE

Optional end date

application\_deadline

TIMESTAMPTZ

Deadline for applications

number\_of\_positions

INTEGER

Number of openings

visibility\_status

VARCHAR(50)

Draft, Private, Public, Invite Only

approval\_status

VARCHAR(50)

Pending, Approved, Rejected

job\_status

VARCHAR(50)

Draft, Open, Paused, Filled, Cancelled, Closed

search\_visibility

BOOLEAN

Whether job is searchable

metadata

JSONB

Flexible job metadata

published\_at

TIMESTAMPTZ

Publication timestamp

closed\_at

TIMESTAMPTZ

Closure timestamp

created\_at

TIMESTAMPTZ

Creation timestamp

updated\_at

TIMESTAMPTZ

Update timestamp

deleted\_at

TIMESTAMPTZ

Soft delete timestamp

version

INTEGER

Optimistic locking version

**Supporting Table: job\_required\_skills**

**Column**

**Data Type**

**Description**

job\_required\_skill\_id

UUID

Primary identifier

tenant\_id

UUID

Tenant identifier

job\_id

UUID

Job reference

skill\_id

UUID

Skill reference from Profile Service catalog

skill\_name

VARCHAR(150)

Denormalized skill name

proficiency\_level

VARCHAR(50)

Required level

years\_required

NUMERIC(4,1)

Minimum years required

is\_mandatory

BOOLEAN

Mandatory skill flag

weight

NUMERIC(5,2)

Matching weight

created\_at

TIMESTAMPTZ

Creation timestamp

**Design Notes**

Jobs should store denormalized copies of selected organization and skill attributes where required for historical accuracy. For example, if a skill is renamed in the skill catalog, the original job requirement should remain auditable.

**8.2 Projects**

**Overview**

Projects represent structured bodies of work created by organizations. A project may contain one or more jobs, milestones, deliverables, contracts, teams, tasks, budgets, and workforce assignments.

Projects are used for consulting assignments, outsourced delivery, enterprise workstreams, implementation projects, creative work, software delivery, operational support, and AI-assisted workforce programs.

**Suggested Table: projects**

**Column**

**Data Type**

**Description**

project\_id

UUID

Primary project identifier

tenant\_id

UUID

Tenant identifier

organization\_id

UUID

Owning organization

department\_id

UUID

Optional department

business\_unit\_id

UUID

Optional business unit

project\_owner\_user\_id

UUID

Internal project owner

project\_code

VARCHAR(80)

Internal project code

project\_name

VARCHAR(255)

Project name

project\_description

TEXT

Project description

project\_type

VARCHAR(100)

Consulting, Software, Operations, Research, Creative

project\_status

VARCHAR(50)

Draft, Active, On Hold, Completed, Cancelled

start\_date

DATE

Planned start date

end\_date

DATE

Planned end date

actual\_start\_date

DATE

Actual start date

actual\_end\_date

DATE

Actual end date

budget\_amount

NUMERIC(14,2)

Project budget

currency\_code

CHAR(3)

Currency

visibility\_status

VARCHAR(50)

Private, Organization, Public

metadata

JSONB

Flexible metadata

created\_at

TIMESTAMPTZ

Creation timestamp

updated\_at

TIMESTAMPTZ

Update timestamp

deleted\_at

TIMESTAMPTZ

Soft delete timestamp

**Supporting Table: project\_milestones**

**Column**

**Data Type**

**Description**

milestone\_id

UUID

Primary identifier

tenant\_id

UUID

Tenant identifier

project\_id

UUID

Project reference

milestone\_title

VARCHAR(255)

Milestone title

description

TEXT

Milestone details

due\_date

DATE

Due date

completion\_date

DATE

Actual completion date

milestone\_status

VARCHAR(50)

Pending, In Progress, Completed, Rejected

payment\_amount

NUMERIC(14,2)

Optional milestone payment

currency\_code

CHAR(3)

Currency

created\_at

TIMESTAMPTZ

Creation timestamp

updated\_at

TIMESTAMPTZ

Update timestamp

**8.3 Engagement Models**

**Overview**

Engagement Models define how organizations contract professionals on Kaziforce. They determine the commercial structure, payment basis, work expectations, contract rules, and marketplace eligibility.

**Supported Engagement Models**

-   Full-time employment
-   Part-time employment
-   Freelance gig
-   Fixed-price project
-   Hourly contract
-   Monthly retainer
-   Fractional role
-   Consulting assignment
-   Internship
-   Volunteer engagement
-   AI agent engagement
-   Managed team engagement

**Suggested Table: engagement\_models**

**Column**

**Data Type**

**Description**

engagement\_model\_id

UUID

Primary identifier

model\_code

VARCHAR(80)

Unique model code

model\_name

VARCHAR(150)

Model name

description

TEXT

Description

billing\_basis

VARCHAR(50)

Hourly, Fixed, Monthly, Salary, Milestone

requires\_timesheet

BOOLEAN

Whether time tracking is required

supports\_escrow

BOOLEAN

Whether escrow is supported

supports\_payroll

BOOLEAN

Whether payroll applies

supports\_milestones

BOOLEAN

Whether milestone billing applies

contract\_required

BOOLEAN

Whether contract is required

is\_active

BOOLEAN

Active status

metadata

JSONB

Flexible metadata

created\_at

TIMESTAMPTZ

Creation timestamp

updated\_at

TIMESTAMPTZ

Update timestamp

**Design Notes**

Engagement models should be configurable but controlled. Changes to an engagement model must not retroactively alter existing contracts unless explicit migration logic is applied.

**8.4 Applications**

**Overview**

Applications represent a professional's expression of interest in a job or project. They track submission details, candidate responses, screening status, ranking, hiring decisions, interviews, rejections, and conversion into offers or contracts.

**Suggested Table: applications**

**Column**

**Data Type**

**Description**

application\_id

UUID

Primary application identifier

tenant\_id

UUID

Tenant identifier

job\_id

UUID

Job reference

project\_id

UUID

Optional project reference

organization\_id

UUID

Hiring organization

profile\_id

UUID

Applicant professional profile

user\_id

UUID

Applicant user reference

cover\_letter

TEXT

Applicant cover letter

proposed\_rate

NUMERIC(14,2)

Applicant proposed rate

proposed\_currency

CHAR(3)

Proposed currency

proposed\_start\_date

DATE

Proposed start date

availability\_note

TEXT

Availability message

application\_status

VARCHAR(50)

Submitted, Screening, Shortlisted, Interview, Offered, Rejected, Withdrawn, Hired

source

VARCHAR(80)

Direct, Invite, AI Match, Search, Referral

ai\_match\_score

NUMERIC(8,4)

AI match score

recruiter\_score

NUMERIC(8,4)

Human review score

submitted\_at

TIMESTAMPTZ

Submission timestamp

reviewed\_at

TIMESTAMPTZ

Review timestamp

rejected\_at

TIMESTAMPTZ

Rejection timestamp

withdrawn\_at

TIMESTAMPTZ

Withdrawal timestamp

metadata

JSONB

Flexible metadata

created\_at

TIMESTAMPTZ

Creation timestamp

updated\_at

TIMESTAMPTZ

Update timestamp

**Suggested Table: application\_answers**

**Column**

**Data Type**

**Description**

answer\_id

UUID

Primary identifier

tenant\_id

UUID

Tenant identifier

application\_id

UUID

Application reference

question\_text

TEXT

Screening question

answer\_text

TEXT

Candidate answer

score

NUMERIC(8,4)

Optional scoring

evaluated\_by\_ai

BOOLEAN

Whether AI evaluated

created\_at

TIMESTAMPTZ

Creation timestamp

**Design Notes**

A professional should not be able to submit duplicate active applications for the same job unless the job explicitly allows multiple proposals.

**8.5 Talent Matching**

**Overview**

Talent Matching stores the results of human and AI-powered candidate matching. It connects jobs, projects, professionals, skills, recommendations, scoring features, and matching outcomes.

Matching data supports:

-   Candidate recommendations
-   Job recommendations
-   Search ranking
-   Shortlisting
-   Recruiter review
-   AI explainability
-   Feedback loops

**Suggested Table: talent\_matches**

**Column**

**Data Type**

**Description**

match\_id

UUID

Primary match identifier

tenant\_id

UUID

Tenant identifier

job\_id

UUID

Job reference

project\_id

UUID

Optional project reference

profile\_id

UUID

Candidate profile

model\_version

VARCHAR(80)

AI model version

match\_score

NUMERIC(8,4)

Overall match score

skill\_score

NUMERIC(8,4)

Skill relevance score

experience\_score

NUMERIC(8,4)

Experience score

availability\_score

NUMERIC(8,4)

Availability fit

budget\_score

NUMERIC(8,4)

Budget fit

location\_score

NUMERIC(8,4)

Location fit

reliability\_score

NUMERIC(8,4)

Reliability score

explanation

JSONB

Match explanation

match\_status

VARCHAR(50)

Suggested, Viewed, Shortlisted, Dismissed, Invited, Applied

generated\_at

TIMESTAMPTZ

Match generation time

feedback

JSONB

Recruiter or candidate feedback

created\_at

TIMESTAMPTZ

Creation timestamp

**Design Notes**

Matching scores should be immutable for a given model version and source data snapshot. When source data or the AI model changes, a new match record should be created rather than overwriting historical results.

**8.6 Contracts**

**Overview**

Contracts define the legally and commercially binding relationship between an organization and a professional. Contracts are created after an offer is accepted or an engagement is approved.

Contracts may support:

-   Full-time employment
-   Fractional engagements
-   Consulting retainers
-   Fixed-price projects
-   Hourly contracts
-   Milestone contracts
-   AI agent service contracts
-   Managed workforce agreements

**Suggested Table: contracts**

**Column**

**Data Type**

**Description**

contract\_id

UUID

Primary contract identifier

tenant\_id

UUID

Tenant identifier

organization\_id

UUID

Client organization

profile\_id

UUID

Professional profile

user\_id

UUID

Professional user

job\_id

UUID

Optional job reference

project\_id

UUID

Optional project reference

application\_id

UUID

Optional application reference

offer\_id

UUID

Optional offer reference

engagement\_model\_id

UUID

Engagement model

contract\_number

VARCHAR(100)

Human-readable contract number

contract\_title

VARCHAR(255)

Contract title

contract\_status

VARCHAR(50)

Draft, Pending Signature, Active, Suspended, Completed, Terminated, Cancelled

start\_date

DATE

Contract start date

end\_date

DATE

Contract end date

billing\_basis

VARCHAR(50)

Hourly, Fixed, Monthly, Milestone

rate\_amount

NUMERIC(14,2)

Contract rate

currency\_code

CHAR(3)

Contract currency

payment\_terms

VARCHAR(120)

Payment terms

requires\_timesheet

BOOLEAN

Whether timesheet is required

escrow\_required

BOOLEAN

Whether escrow applies

contract\_document\_object\_key

TEXT

Signed contract object reference

signed\_by\_organization\_at

TIMESTAMPTZ

Organization signature timestamp

signed\_by\_professional\_at

TIMESTAMPTZ

Professional signature timestamp

metadata

JSONB

Flexible metadata

created\_at

TIMESTAMPTZ

Creation timestamp

updated\_at

TIMESTAMPTZ

Update timestamp

deleted\_at

TIMESTAMPTZ

Soft delete timestamp

version

INTEGER

Optimistic locking version

**Design Notes**

Contract records should be immutable after activation except for allowed lifecycle transitions. Contract amendments should be stored separately to preserve legal auditability.

**8.7 Hiring Pipeline**

**Overview**

The Hiring Pipeline models the workflow used to evaluate, shortlist, interview, select, offer, reject, and hire candidates.

Pipeline stages may differ by organization, job type, engagement model, industry, and internal approval rules.

**Suggested Table: hiring\_pipelines**

**Column**

**Data Type**

**Description**

pipeline\_id

UUID

Primary pipeline identifier

tenant\_id

UUID

Tenant identifier

organization\_id

UUID

Organization

job\_id

UUID

Optional job-specific pipeline

pipeline\_name

VARCHAR(180)

Pipeline name

pipeline\_type

VARCHAR(80)

Default, Job Specific, Enterprise

is\_default

BOOLEAN

Default pipeline flag

status

VARCHAR(50)

Active, Inactive, Archived

created\_at

TIMESTAMPTZ

Creation timestamp

updated\_at

TIMESTAMPTZ

Update timestamp

**Suggested Table: hiring\_pipeline\_stages**

**Column**

**Data Type**

**Description**

stage\_id

UUID

Primary stage identifier

tenant\_id

UUID

Tenant identifier

pipeline\_id

UUID

Pipeline reference

stage\_name

VARCHAR(150)

Stage name

stage\_code

VARCHAR(80)

Stage code

stage\_order

INTEGER

Stage order

stage\_type

VARCHAR(80)

Screening, Interview, Assessment, Offer, Approval

is\_terminal

BOOLEAN

Terminal stage flag

requires\_approval

BOOLEAN

Approval required

created\_at

TIMESTAMPTZ

Creation timestamp

**Suggested Table: application\_stage\_history**

**Column**

**Data Type**

**Description**

stage\_history\_id

UUID

Primary identifier

tenant\_id

UUID

Tenant identifier

application\_id

UUID

Application

from\_stage\_id

UUID

Previous stage

to\_stage\_id

UUID

New stage

changed\_by\_user\_id

UUID

Actor

change\_reason

TEXT

Reason for movement

changed\_at

TIMESTAMPTZ

Timestamp

**8.8 Offers**

**Overview**

Offers represent proposed commercial terms issued to selected candidates before contract creation. An offer may be accepted, rejected, withdrawn, expired, or converted into a contract.

**Suggested Table: offers**

**Column**

**Data Type**

**Description**

offer\_id

UUID

Primary offer identifier

tenant\_id

UUID

Tenant identifier

organization\_id

UUID

Organization

job\_id

UUID

Job

project\_id

UUID

Optional project

application\_id

UUID

Application

profile\_id

UUID

Candidate profile

engagement\_model\_id

UUID

Engagement model

offered\_role\_title

VARCHAR(255)

Role title

offer\_amount

NUMERIC(14,2)

Offered amount

currency\_code

CHAR(3)

Currency

billing\_basis

VARCHAR(50)

Hourly, Monthly, Fixed, Salary

start\_date

DATE

Proposed start

end\_date

DATE

Proposed end

offer\_status

VARCHAR(50)

Draft, Sent, Accepted, Rejected, Withdrawn, Expired

offer\_expires\_at

TIMESTAMPTZ

Offer expiry

terms

JSONB

Offer terms

sent\_at

TIMESTAMPTZ

Sent timestamp

accepted\_at

TIMESTAMPTZ

Acceptance timestamp

rejected\_at

TIMESTAMPTZ

Rejection timestamp

created\_at

TIMESTAMPTZ

Creation timestamp

updated\_at

TIMESTAMPTZ

Update timestamp

**Design Notes**

Offer history should be preserved. Major changes should create a new offer version or negotiation record rather than silently overwriting terms.

**8.9 Negotiations**

**Overview**

Negotiations capture discussion and revision of commercial, scope, availability, payment, and contract terms between organizations and professionals.

Negotiations may occur before or after an offer is issued.

**Suggested Table: negotiations**

**Column**

**Data Type**

**Description**

negotiation\_id

UUID

Primary negotiation identifier

tenant\_id

UUID

Tenant identifier

job\_id

UUID

Optional job

project\_id

UUID

Optional project

application\_id

UUID

Optional application

offer\_id

UUID

Optional offer

organization\_id

UUID

Organization

profile\_id

UUID

Professional

negotiation\_status

VARCHAR(50)

Open, Accepted, Rejected, Closed, Cancelled

opened\_by\_user\_id

UUID

Actor who opened negotiation

opened\_at

TIMESTAMPTZ

Open timestamp

closed\_at

TIMESTAMPTZ

Close timestamp

metadata

JSONB

Flexible metadata

**Suggested Table: negotiation\_messages**

**Column**

**Data Type**

**Description**

negotiation\_message\_id

UUID

Primary identifier

tenant\_id

UUID

Tenant identifier

negotiation\_id

UUID

Negotiation

sender\_user\_id

UUID

Sender user

message\_type

VARCHAR(50)

Message, Counter Offer, Clarification, System

message\_body

TEXT

Message content

proposed\_terms

JSONB

Optional counter terms

created\_at

TIMESTAMPTZ

Creation timestamp

**8.10 Marketplace Analytics**

**Overview**

Marketplace Analytics captures operational metrics from jobs, applications, hiring activities, talent matches, offers, contracts, and marketplace conversion funnels.

Operational analytics may be stored in PostgreSQL for near-real-time dashboards and replicated to ClickHouse for large-scale BI.

**Suggested Table: marketplace\_events**

**Column**

**Data Type**

**Description**

marketplace\_event\_id

UUID

Primary event identifier

tenant\_id

UUID

Tenant identifier

event\_type

VARCHAR(100)

Event type

organization\_id

UUID

Organization

job\_id

UUID

Optional job

project\_id

UUID

Optional project

profile\_id

UUID

Optional profile

application\_id

UUID

Optional application

event\_payload

JSONB

Event data

occurred\_at

TIMESTAMPTZ

Event timestamp

created\_at

TIMESTAMPTZ

Record creation timestamp

**Key Metrics**

-   Jobs published
-   Applications received
-   Application conversion rate
-   Average time to shortlist
-   Average time to hire
-   Offer acceptance rate
-   Contract conversion rate
-   Talent match quality
-   Job fill rate
-   Hiring funnel drop-off
-   Average contract value
-   Marketplace revenue contribution

**Analytical Fact Tables**

Recommended ClickHouse fact tables:

-   fact\_job\_activity
-   fact\_application\_funnel
-   fact\_offer\_conversion
-   fact\_contract\_creation
-   fact\_talent\_match\_quality
-   fact\_marketplace\_revenue

**8.11 ERD**

**Conceptual ERD**

Organization

├── Project

│ ├── ProjectMilestone

│ ├── Job

│ └── Contract

├── Job

│ ├── JobRequiredSkill

│ ├── Application

│ │ ├── ApplicationAnswer

│ │ ├── ApplicationStageHistory

│ │ ├── Offer

│ │ │ ├── Negotiation

│ │ │ │ └── NegotiationMessage

│ │ └── Contract

│ └── TalentMatch

└── HiringPipeline

└── HiringPipelineStage

ProfessionalProfile

├── Application

├── TalentMatch

├── Offer

└── Contract

EngagementModel

├── Job

├── Offer

└── Contract

**Relationship Summary**

**Parent Entity**

**Child Entity**

**Cardinality**

Organization

Jobs

1:N

Organization

Projects

1:N

Project

Jobs

1:N

Job

Required Skills

1:N

Job

Applications

1:N

Professional Profile

Applications

1:N

Application

Application Answers

1:N

Job

Talent Matches

1:N

Professional Profile

Talent Matches

1:N

Organization

Hiring Pipelines

1:N

Hiring Pipeline

Hiring Pipeline Stages

1:N

Application

Stage History

1:N

Application

Offer

0:N

Offer

Negotiation

0:N

Negotiation

Negotiation Messages

1:N

Offer

Contract

0:1

Application

Contract

0:1

Engagement Model

Jobs

1:N

Engagement Model

Offers

1:N

Engagement Model

Contracts

1:N

**ERD Design Notes**

The Workforce Marketplace Database is designed around the job, application, offer, and contract lifecycle. These entities form the hiring transaction flow from demand creation to workforce engagement.

Cross-service references such as organization\_id, profile\_id, user\_id, and skill\_id are stored as UUIDs. The Marketplace Service does not directly own organization, profile, identity, or skill catalog records. It consumes their data through APIs and domain events.

The model supports both simple hiring workflows and complex enterprise procurement flows involving projects, milestones, multi-stage reviews, negotiations, offers, and contract creation.

**9\. AI Matching Engine Database**

**9.1 Matching Profiles**

**Overview**

The AI Matching Engine Database powers intelligent workforce discovery, candidate-job matching, talent recommendations, project staffing, semantic search, ranking, personalization, and AI-assisted hiring decisions within Kaziforce.

The AI Matching Engine does not replace the authoritative records owned by the Profile Service, Marketplace Service, Organization Service, or Identity Service. Instead, it maintains AI-optimized matching profiles, feature snapshots, embeddings, ranking scores, model metadata, and recommendation history derived from trusted source systems.

A Matching Profile is an AI-ready representation of a professional, job, project, organization demand, or AI agent capability. It is optimized for machine learning, similarity search, explainable recommendations, and ranking.

**Primary Data Stores**

**Data Store**

**Purpose**

PostgreSQL

Matching metadata, scores, model registry, recommendation history

Vector Database / pgvector

Embeddings and similarity search

OpenSearch

Hybrid keyword and semantic search

Redis

Low-latency match cache and ranking cache

ClickHouse

AI performance analytics

Object Storage

Training datasets, model artifacts, evaluation outputs

**Suggested Table: matching\_profiles**

**Column**

**Data Type**

**Description**

matching\_profile\_id

UUID

Primary matching profile identifier

tenant\_id

UUID

Tenant identifier

source\_entity\_type

VARCHAR(80)

Professional, Job, Project, Organization, AI Agent

source\_entity\_id

UUID

Source entity identifier

source\_service

VARCHAR(100)

Profile, Marketplace, Organization, AI Agent Service

profile\_version

INTEGER

Matching profile version

profile\_status

VARCHAR(50)

Active, Stale, Rebuilding, Archived

matching\_scope

VARCHAR(80)

Public, Tenant, Organization, Private

primary\_category

VARCHAR(150)

Main category

normalized\_title

VARCHAR(255)

Normalized title or role

normalized\_summary

TEXT

AI-ready summary

normalized\_skills

JSONB

Standardized skills

normalized\_experience

JSONB

Structured experience signals

normalized\_location

JSONB

Location and timezone data

normalized\_availability

JSONB

Availability signals

normalized\_budget

JSONB

Rate, budget, or compensation signals

source\_hash

VARCHAR(128)

Hash of source data snapshot

last\_synced\_at

TIMESTAMPTZ

Last source sync timestamp

created\_at

TIMESTAMPTZ

Creation timestamp

updated\_at

TIMESTAMPTZ

Update timestamp

deleted\_at

TIMESTAMPTZ

Soft delete timestamp

**Design Notes**

Matching profiles are derived records. They should be rebuilt when source data changes. The source\_hash prevents unnecessary reprocessing when incoming events do not materially change matching data.

**9.2 AI Features**

**Overview**

AI features are structured machine-readable variables used by matching models, ranking algorithms, recommendation engines, and scoring pipelines.

Features may be derived from professional profiles, job descriptions, skills, experience, availability, employer preferences, marketplace behavior, performance history, and user interactions.

**Feature Categories**

-   Skill features
-   Experience features
-   Availability features
-   Location features
-   Rate and budget features
-   Reliability features
-   Engagement history features
-   Learning and certification features
-   Communication behavior features
-   Hiring preference features
-   AI-agent capability features

**Suggested Table: ai\_feature\_definitions**

**Column**

**Data Type**

**Description**

feature\_definition\_id

UUID

Primary identifier

feature\_code

VARCHAR(120)

Unique feature code

feature\_name

VARCHAR(180)

Human-readable name

feature\_category

VARCHAR(100)

Skill, Experience, Availability, Cost, Trust

feature\_data\_type

VARCHAR(50)

Numeric, Boolean, Text, Vector, JSON

description

TEXT

Feature description

calculation\_method

TEXT

How feature is calculated

default\_value

JSONB

Default feature value

is\_active

BOOLEAN

Active flag

created\_at

TIMESTAMPTZ

Creation timestamp

updated\_at

TIMESTAMPTZ

Update timestamp

**Suggested Table: matching\_profile\_features**

**Column**

**Data Type**

**Description**

profile\_feature\_id

UUID

Primary identifier

tenant\_id

UUID

Tenant identifier

matching\_profile\_id

UUID

Matching profile reference

feature\_definition\_id

UUID

Feature definition reference

feature\_value\_numeric

NUMERIC(18,6)

Numeric feature value

feature\_value\_text

TEXT

Text feature value

feature\_value\_boolean

BOOLEAN

Boolean feature value

feature\_value\_json

JSONB

Complex feature value

confidence\_score

NUMERIC(8,4)

Confidence in feature

source

VARCHAR(100)

Profile, Resume, Behavior, AI, Marketplace

calculated\_by\_model\_id

UUID

Model that calculated the feature

calculated\_at

TIMESTAMPTZ

Calculation timestamp

expires\_at

TIMESTAMPTZ

Optional feature expiry

**Design Notes**

Feature values should be versioned and traceable. AI-inferred features must not overwrite verified source data. Features used in hiring decisions should support explainability and audit review.

**9.3 Embeddings**

**Overview**

Embeddings are numerical vector representations of text, profiles, skills, resumes, job descriptions, projects, and AI-agent capabilities. They allow Kaziforce to perform semantic matching beyond keyword search.

Embeddings support:

-   Candidate-job matching
-   Job recommendations
-   Talent discovery
-   Similar professional search
-   Skill similarity
-   Resume-job matching
-   Project-team matching
-   Knowledge retrieval
-   AI-agent assignment

**Suggested Table: embedding\_records**

**Column**

**Data Type**

**Description**

embedding\_id

UUID

Primary embedding identifier

tenant\_id

UUID

Tenant identifier

matching\_profile\_id

UUID

Matching profile reference

source\_entity\_type

VARCHAR(80)

Professional, Job, Resume, Project, Skill

source\_entity\_id

UUID

Source entity identifier

embedding\_type

VARCHAR(80)

Profile, Skill, Resume, Job, Project, Summary

embedding\_model\_id

UUID

Embedding model reference

vector\_dimension

INTEGER

Vector dimension

vector\_storage\_type

VARCHAR(80)

pgvector, OpenSearch, Qdrant, Milvus, Weaviate

vector\_ref

TEXT

Reference to vector storage location

content\_hash

VARCHAR(128)

Hash of embedded content

embedding\_status

VARCHAR(50)

Active, Stale, Failed, Archived

generated\_at

TIMESTAMPTZ

Generation timestamp

expires\_at

TIMESTAMPTZ

Optional refresh expiry

metadata

JSONB

Embedding metadata

**Design Notes**

Embeddings must be regenerated when source content changes or when embedding models are upgraded. Old embeddings should be retained temporarily to compare model performance and support rollback.

**9.4 Ranking Scores**

**Overview**

Ranking Scores represent computed match quality between two entities, usually a professional and a job, a professional and a project, an AI agent and a task, or a team and an organization requirement.

Ranking scores combine multiple signals into a single explainable score.

**Suggested Table: ranking\_scores**

**Column**

**Data Type**

**Description**

ranking\_score\_id

UUID

Primary identifier

tenant\_id

UUID

Tenant identifier

source\_entity\_type

VARCHAR(80)

Professional, AI Agent, Team

source\_entity\_id

UUID

Candidate entity

target\_entity\_type

VARCHAR(80)

Job, Project, Task, Organization Need

target\_entity\_id

UUID

Target entity

ranking\_model\_id

UUID

Ranking model used

overall\_score

NUMERIC(8,4)

Final match score

skill\_score

NUMERIC(8,4)

Skill fit score

experience\_score

NUMERIC(8,4)

Experience fit score

availability\_score

NUMERIC(8,4)

Availability fit score

location\_score

NUMERIC(8,4)

Location fit score

budget\_score

NUMERIC(8,4)

Budget fit score

reliability\_score

NUMERIC(8,4)

Trust and reliability score

certification\_score

NUMERIC(8,4)

Certification fit score

semantic\_similarity\_score

NUMERIC(8,4)

Vector similarity score

behavioral\_score

NUMERIC(8,4)

Marketplace behavior score

explanation

JSONB

Explainability payload

score\_version

INTEGER

Score version

calculated\_at

TIMESTAMPTZ

Calculation timestamp

expires\_at

TIMESTAMPTZ

Score expiry timestamp

**Score Interpretation**

**Score Range**

**Interpretation**

0.90 - 1.00

Excellent match

0.75 - 0.89

Strong match

0.60 - 0.74

Moderate match

0.40 - 0.59

Weak match

0.00 - 0.39

Poor match

**Design Notes**

Ranking scores should be immutable for a given model version and source snapshot. Recalculation should create a new record or increment score version.

**9.5 Recommendation History**

**Overview**

Recommendation History records every recommendation generated by the AI Matching Engine. This supports auditability, explainability, performance evaluation, personalization, and feedback loops.

Recommendations may be generated for:

-   Jobs recommended to professionals
-   Professionals recommended to employers
-   Projects recommended to teams
-   Courses recommended to professionals
-   AI agents recommended for tasks
-   Skills recommended for career development

**Suggested Table: recommendations**

**Column**

**Data Type**

**Description**

recommendation\_id

UUID

Primary recommendation identifier

tenant\_id

UUID

Tenant identifier

recommendation\_type

VARCHAR(100)

JobToProfessional, ProfessionalToJob, CourseToProfile

recipient\_entity\_type

VARCHAR(80)

Professional, Organization, Recruiter, AI Agent

recipient\_entity\_id

UUID

Recipient entity ID

recommended\_entity\_type

VARCHAR(80)

Job, Profile, Course, Project, AI Agent

recommended\_entity\_id

UUID

Recommended entity ID

model\_id

UUID

AI model used

ranking\_score\_id

UUID

Related ranking score

recommendation\_score

NUMERIC(8,4)

Final recommendation score

reason\_codes

JSONB

Machine-readable reason codes

explanation\_text

TEXT

Human-readable explanation

recommendation\_status

VARCHAR(50)

Generated, Viewed, Clicked, Dismissed, Applied, Converted

generated\_at

TIMESTAMPTZ

Generation timestamp

expires\_at

TIMESTAMPTZ

Expiry timestamp

metadata

JSONB

Additional context

**Suggested Table: recommendation\_feedback**

**Column**

**Data Type**

**Description**

feedback\_id

UUID

Primary identifier

tenant\_id

UUID

Tenant identifier

recommendation\_id

UUID

Recommendation reference

feedback\_actor\_type

VARCHAR(80)

Professional, Recruiter, Employer, System

feedback\_actor\_id

UUID

Actor identifier

feedback\_type

VARCHAR(80)

Clicked, Applied, Saved, Dismissed, Hired, Not Relevant

feedback\_value

NUMERIC(8,4)

Optional numeric feedback

feedback\_note

TEXT

Optional explanation

captured\_at

TIMESTAMPTZ

Feedback timestamp

**Design Notes**

Feedback data is critical for improving future recommendations. It should be retained for model evaluation and retraining while respecting privacy and retention policies.

**9.6 Feature Store**

**Overview**

The Feature Store provides a governed repository of reusable AI features used during model training and real-time inference.

The feature store supports:

-   Online features for real-time matching
-   Offline features for model training
-   Feature versioning
-   Feature lineage
-   Feature reuse
-   Feature quality monitoring
-   Point-in-time correctness

**Suggested Table: feature\_sets**

**Column**

**Data Type**

**Description**

feature\_set\_id

UUID

Primary identifier

feature\_set\_code

VARCHAR(120)

Unique code

feature\_set\_name

VARCHAR(180)

Human-readable name

entity\_type

VARCHAR(80)

Professional, Job, Project, Organization

version

VARCHAR(50)

Feature set version

description

TEXT

Description

owner\_team

VARCHAR(120)

Owning team

status

VARCHAR(50)

Draft, Active, Deprecated, Archived

created\_at

TIMESTAMPTZ

Creation timestamp

updated\_at

TIMESTAMPTZ

Update timestamp

**Suggested Table: feature\_values**

**Column**

**Data Type**

**Description**

feature\_value\_id

UUID

Primary identifier

tenant\_id

UUID

Tenant identifier

feature\_set\_id

UUID

Feature set reference

entity\_type

VARCHAR(80)

Entity type

entity\_id

UUID

Entity identifier

feature\_payload

JSONB

Feature values

event\_time

TIMESTAMPTZ

Business event time

computed\_at

TIMESTAMPTZ

Feature computation time

source\_snapshot\_id

VARCHAR(128)

Source data snapshot

quality\_score

NUMERIC(8,4)

Feature quality score

**Online Store**

Redis or a low-latency key-value store may be used for online inference features.

Example key pattern:

feature:online:{tenant\_id}:{entity\_type}:{entity\_id}:{feature\_set\_version}

**Offline Store**

ClickHouse or object storage may be used for large-scale historical training datasets.

**9.7 AI Model Metadata**

**Overview**

AI Model Metadata records all models used by the matching engine, including embedding models, ranking models, recommendation models, reranking models, classification models, and explainability models.

This metadata supports model governance, auditability, rollback, performance tracking, and regulatory review.

**Suggested Table: ai\_models**

**Column**

**Data Type**

**Description**

model\_id

UUID

Primary model identifier

model\_code

VARCHAR(120)

Unique model code

model\_name

VARCHAR(180)

Model name

model\_type

VARCHAR(80)

Embedding, Ranking, Recommendation, Classifier

model\_provider

VARCHAR(120)

Internal, OpenAI, Anthropic, Cohere, Hugging Face, Local

model\_version

VARCHAR(80)

Model version

artifact\_uri

TEXT

Object storage or registry URI

training\_dataset\_uri

TEXT

Dataset reference

evaluation\_report\_uri

TEXT

Evaluation report reference

status

VARCHAR(50)

Draft, Active, Deprecated, Retired

approval\_status

VARCHAR(50)

Pending, Approved, Rejected

approved\_by

UUID

Approver user ID

approved\_at

TIMESTAMPTZ

Approval timestamp

deployed\_at

TIMESTAMPTZ

Deployment timestamp

retired\_at

TIMESTAMPTZ

Retirement timestamp

metadata

JSONB

Extra metadata

**Suggested Table: model\_evaluation\_metrics**

**Column**

**Data Type**

**Description**

metric\_id

UUID

Primary metric identifier

model\_id

UUID

Model reference

evaluation\_dataset

VARCHAR(180)

Dataset name

metric\_name

VARCHAR(100)

Precision, Recall, NDCG, MRR, MAP

metric\_value

NUMERIC(12,6)

Metric value

segment

VARCHAR(120)

User, role, industry, country, or tenant segment

evaluated\_at

TIMESTAMPTZ

Evaluation timestamp

**Design Notes**

Only approved active models should be used in production. Model metadata must record the training dataset, evaluation results, deployment status, and retirement status.

**9.8 Vector Indexes**

**Overview**

Vector indexes enable approximate nearest-neighbor search across embeddings. They are used to retrieve similar profiles, jobs, projects, skills, documents, and AI agents.

**Supported Index Types**

Depending on selected vector storage, Kaziforce may use:

-   HNSW indexes
-   IVF indexes
-   Flat indexes for small datasets
-   Product quantization for large-scale retrieval
-   Hybrid keyword-vector indexes in OpenSearch

**Suggested Table: vector\_indexes**

**Column**

**Data Type**

**Description**

vector\_index\_id

UUID

Primary identifier

tenant\_id

UUID

Optional tenant-specific index

index\_name

VARCHAR(180)

Index name

index\_backend

VARCHAR(80)

pgvector, OpenSearch, Qdrant, Milvus, Weaviate

embedding\_model\_id

UUID

Embedding model

entity\_type

VARCHAR(80)

Profile, Job, Project, Skill, Resume

vector\_dimension

INTEGER

Vector dimension

distance\_metric

VARCHAR(50)

Cosine, DotProduct, Euclidean

index\_algorithm

VARCHAR(80)

HNSW, IVF, Flat

index\_status

VARCHAR(50)

Building, Active, Rebuilding, Failed, Archived

created\_at

TIMESTAMPTZ

Creation timestamp

rebuilt\_at

TIMESTAMPTZ

Last rebuild timestamp

metadata

JSONB

Backend-specific settings

**Design Notes**

Vector indexes should be versioned by embedding model. When the embedding model changes, a new vector index should be built and validated before production traffic is migrated.

**9.9 Semantic Search**

**Overview**

Semantic Search allows Kaziforce users and AI systems to retrieve relevant professionals, jobs, projects, courses, documents, and AI agents based on meaning rather than exact keywords.

Semantic search combines:

-   Full-text search
-   Vector similarity search
-   Structured filters
-   Personalization
-   Business rules
-   Ranking models
-   Re-ranking
-   Access control

**Search Flow**

1.  User submits a natural language query.
2.  Query is normalized and classified.
3.  Query embedding is generated.
4.  OpenSearch retrieves keyword candidates.
5.  Vector store retrieves semantic candidates.
6.  Structured filters are applied.
7.  Ranking model scores candidates.
8.  Business rules adjust final ranking.
9.  Results are returned with explanations.
10.  Search interaction is logged for learning.

**Suggested Table: semantic\_search\_queries**

**Column**

**Data Type**

**Description**

search\_query\_id

UUID

Primary identifier

tenant\_id

UUID

Tenant identifier

actor\_user\_id

UUID

User who searched

query\_text

TEXT

Raw search query

normalized\_query

TEXT

Normalized query

query\_embedding\_id

UUID

Query embedding reference

search\_context

VARCHAR(80)

TalentSearch, JobSearch, CourseSearch

filters

JSONB

Applied filters

result\_count

INTEGER

Number of results returned

latency\_ms

INTEGER

Search latency

created\_at

TIMESTAMPTZ

Query timestamp

**Suggested Table: semantic\_search\_results**

**Column**

**Data Type**

**Description**

search\_result\_id

UUID

Primary identifier

search\_query\_id

UUID

Search query reference

result\_entity\_type

VARCHAR(80)

Profile, Job, Project, Course

result\_entity\_id

UUID

Result entity

rank\_position

INTEGER

Result position

keyword\_score

NUMERIC(8,4)

Keyword score

vector\_score

NUMERIC(8,4)

Vector score

final\_score

NUMERIC(8,4)

Final ranking score

explanation

JSONB

Why result matched

**Design Notes**

Semantic search logs should be used for relevance tuning, but privacy-sensitive queries must follow data retention and anonymization policies.

**9.10 ERD**

**Conceptual ERD**

MatchingProfile

├── MatchingProfileFeature

│ └── AIFeatureDefinition

├── EmbeddingRecord

│ └── AIModel

├── RankingScore

│ └── AIModel

├── Recommendation

│ ├── RankingScore

│ └── RecommendationFeedback

└── FeatureValue

└── FeatureSet

AIModel

├── ModelEvaluationMetric

├── EmbeddingRecord

├── RankingScore

└── VectorIndex

SemanticSearchQuery

├── QueryEmbedding

└── SemanticSearchResult

**Relationship Summary**

**Parent Entity**

**Child Entity**

**Cardinality**

Matching Profile

Matching Profile Features

1:N

AI Feature Definition

Matching Profile Features

1:N

Matching Profile

Embedding Records

1:N

AI Model

Embedding Records

1:N

AI Model

Ranking Scores

1:N

Matching Profile

Ranking Scores

1:N

Ranking Score

Recommendations

1:N

Recommendation

Recommendation Feedback

1:N

Feature Set

Feature Values

1:N

AI Model

Model Evaluation Metrics

1:N

AI Model

Vector Indexes

1:N

Semantic Search Query

Semantic Search Results

1:N

**ERD Design Notes**

The AI Matching Engine Database is designed around derived, versioned, and explainable AI artifacts. It does not own the original professional, job, project, organization, or contract records. Instead, it consumes events from source services, transforms them into AI-ready matching profiles, generates features and embeddings, computes ranking scores, and stores recommendation history.

The design supports model versioning, embedding refresh, feature lineage, semantic search, explainable ranking, auditability, and continuous improvement through feedback loops. This ensures that Kaziforce can improve matching quality over time while maintaining transparency, security, and data governance.

**10\. Workforce Engagement Database**

**10.1 Activities**

**Overview**

The Workforce Engagement Database manages social, professional, and marketplace engagement activity within Kaziforce. It supports professional feeds, user activities, comments, reactions, shares, saves, content discovery, moderation, trending logic, AI feed ranking, and engagement analytics.

The Workforce Engagement Service owns this database. It receives events from Profile, Marketplace, Learning, AI, Organization, and Workforce Management services, then converts selected events into feed-ready activity records.

Activities represent user-visible actions or system-generated events that may appear in feeds, dashboards, notifications, analytics, or recommendation models.

**Suggested Table: activities**

**Column**

**Data Type**

**Description**

activity\_id

UUID

Primary activity identifier

tenant\_id

UUID

Tenant identifier

actor\_user\_id

UUID

User who performed the activity

actor\_profile\_id

UUID

Professional profile reference

actor\_organization\_id

UUID

Organization reference where applicable

activity\_type

VARCHAR(100)

PostCreated, JobPosted, CourseCompleted, ContractStarted

object\_type

VARCHAR(80)

Post, Job, Project, Profile, Course, Contract

object\_id

UUID

Referenced object

target\_type

VARCHAR(80)

Optional target entity type

target\_id

UUID

Optional target entity

title

VARCHAR(255)

Short activity title

body

TEXT

Activity content

media\_refs

JSONB

Media object references

visibility\_scope

VARCHAR(50)

Public, Network, Organization, Private

lifecycle\_status

VARCHAR(50)

Draft, Published, Hidden, Deleted, Archived

moderation\_status

VARCHAR(50)

Pending, Approved, Rejected, Flagged

engagement\_score

NUMERIC(12,4)

Computed engagement score

metadata

JSONB

Extra activity metadata

published\_at

TIMESTAMPTZ

Publication timestamp

created\_at

TIMESTAMPTZ

Creation timestamp

updated\_at

TIMESTAMPTZ

Update timestamp

deleted\_at

TIMESTAMPTZ

Soft delete timestamp

version

INTEGER

Optimistic locking version

**Activity Sources**

Activities may be created from:

-   User-created posts.
-   Job publication.
-   Project launch.
-   Contract start.
-   Certification verification.
-   Course completion.
-   Portfolio publication.
-   Professional milestone.
-   Organization update.
-   AI-generated workforce insight.
-   Marketplace achievement.

**Design Notes**

Activity records should remain lightweight. Large content, media files, videos, and documents should be stored in Object Storage, with only metadata and references stored in the database.

**10.2 Comments**

**Overview**

Comments enable discussions around activities, posts, jobs, professional updates, learning content, portfolio items, and marketplace announcements. Comments may support nested replies, moderation, mentions, attachments, and AI summarization.

**Suggested Table: comments**

**Column**

**Data Type**

**Description**

comment\_id

UUID

Primary comment identifier

tenant\_id

UUID

Tenant identifier

activity\_id

UUID

Parent activity

parent\_comment\_id

UUID

Optional parent comment for replies

author\_user\_id

UUID

Comment author

author\_profile\_id

UUID

Author professional profile

comment\_body

TEXT

Comment text

mention\_refs

JSONB

Mentioned users, profiles, organizations

attachment\_refs

JSONB

Attached object references

moderation\_status

VARCHAR(50)

Pending, Approved, Rejected, Flagged

lifecycle\_status

VARCHAR(50)

Published, Hidden, Deleted

edited\_at

TIMESTAMPTZ

Last edit timestamp

created\_at

TIMESTAMPTZ

Creation timestamp

updated\_at

TIMESTAMPTZ

Update timestamp

deleted\_at

TIMESTAMPTZ

Soft delete timestamp

**Nested Comments**

Nested replies are supported using parent\_comment\_id. For deep discussion threads, the service may also maintain a materialized path or closure table for efficient retrieval.

**Suggested Table: comment\_thread\_paths**

**Column**

**Data Type**

**Description**

thread\_path\_id

UUID

Primary identifier

tenant\_id

UUID

Tenant identifier

ancestor\_comment\_id

UUID

Ancestor comment

descendant\_comment\_id

UUID

Descendant comment

depth

INTEGER

Relationship depth

created\_at

TIMESTAMPTZ

Creation timestamp

**Design Notes**

Comments should be soft-deleted instead of physically removed to preserve moderation history, auditability, and conversation integrity.

**10.3 Reactions**

**Overview**

Reactions allow users to express lightweight engagement with activities and comments. They support feed ranking, recommendation signals, user behavior modeling, and engagement analytics.

**Supported Reaction Types**

-   Like
-   Celebrate
-   Support
-   Insightful
-   Interested
-   Helpful
-   Agree
-   Disagree

**Suggested Table: reactions**

**Column**

**Data Type**

**Description**

reaction\_id

UUID

Primary reaction identifier

tenant\_id

UUID

Tenant identifier

actor\_user\_id

UUID

User who reacted

actor\_profile\_id

UUID

Professional profile reference

target\_type

VARCHAR(50)

Activity, Comment

target\_id

UUID

Activity or comment ID

reaction\_type

VARCHAR(50)

Like, Celebrate, Helpful, Insightful

created\_at

TIMESTAMPTZ

Reaction timestamp

updated\_at

TIMESTAMPTZ

Update timestamp

**Design Notes**

A user should have only one active reaction per target. Changing a reaction should update the existing reaction record instead of creating duplicate active reactions.

Recommended unique constraint:

UNIQUE (tenant\_id, actor\_user\_id, target\_type, target\_id)

**10.4 Shares**

**Overview**

Shares allow activities, posts, jobs, courses, profiles, and portfolio items to be distributed across networks, organizations, teams, channels, and external platforms.

**Suggested Table: shares**

**Column**

**Data Type**

**Description**

share\_id

UUID

Primary share identifier

tenant\_id

UUID

Tenant identifier

actor\_user\_id

UUID

User who shared

actor\_profile\_id

UUID

Professional profile

source\_activity\_id

UUID

Original activity

shared\_object\_type

VARCHAR(80)

Activity, Job, Course, Profile, Portfolio

shared\_object\_id

UUID

Shared object

share\_message

TEXT

Optional share text

destination\_type

VARCHAR(80)

Feed, Organization, Team, External, Direct Message

destination\_id

UUID

Destination reference

external\_platform

VARCHAR(80)

LinkedIn, WhatsApp, X, Facebook, Email

visibility\_scope

VARCHAR(50)

Public, Network, Organization, Private

lifecycle\_status

VARCHAR(50)

Published, Hidden, Deleted

created\_at

TIMESTAMPTZ

Share timestamp

deleted\_at

TIMESTAMPTZ

Soft delete timestamp

**Design Notes**

External shares should record only metadata and not expose private content unless access rules permit it. Signed URLs or secure preview links should be used for protected content.

**10.5 Saves**

**Overview**

Saves allow users to bookmark activities, jobs, profiles, courses, posts, portfolio items, and AI recommendations for later action.

Saved content supports personalization, intent modeling, reminder workflows, and recommendation feedback.

**Suggested Table: saves**

**Column**

**Data Type**

**Description**

save\_id

UUID

Primary save identifier

tenant\_id

UUID

Tenant identifier

user\_id

UUID

User who saved item

profile\_id

UUID

Optional professional profile

saved\_object\_type

VARCHAR(80)

Activity, Job, Profile, Course, Post, Recommendation

saved\_object\_id

UUID

Saved object

collection\_name

VARCHAR(120)

Optional user collection

note

TEXT

Optional private note

created\_at

TIMESTAMPTZ

Save timestamp

deleted\_at

TIMESTAMPTZ

Soft delete timestamp

**Design Notes**

A user should not save the same object multiple times in the same active collection.

Recommended unique constraint:

UNIQUE (tenant\_id, user\_id, saved\_object\_type, saved\_object\_id, collection\_name)

WHERE deleted\_at IS NULL

**10.6 Feeds**

**Overview**

Feeds deliver personalized streams of workforce activity to users, organizations, teams, recruiters, professionals, administrators, and AI agents. Feeds may be public, network-based, organization-specific, role-specific, or AI-curated.

**Feed Types**

-   Home feed
-   Professional feed
-   Organization feed
-   Team feed
-   Job discovery feed
-   Learning feed
-   AI insight feed
-   Admin moderation feed
-   Trending feed

**Suggested Table: feed\_items**

**Column**

**Data Type**

**Description**

feed\_item\_id

UUID

Primary feed item identifier

tenant\_id

UUID

Tenant identifier

feed\_type

VARCHAR(80)

Home, Organization, Team, JobDiscovery, Learning

viewer\_user\_id

UUID

User for personalized feed

viewer\_profile\_id

UUID

Optional profile

activity\_id

UUID

Activity reference

ranking\_score

NUMERIC(12,6)

Feed ranking score

ranking\_reason

JSONB

Ranking explanation

seen\_status

VARCHAR(50)

Unseen, Seen, Dismissed

delivered\_at

TIMESTAMPTZ

Feed delivery timestamp

seen\_at

TIMESTAMPTZ

Seen timestamp

expires\_at

TIMESTAMPTZ

Optional expiry

created\_at

TIMESTAMPTZ

Creation timestamp

**Feed Generation Strategy**

Kaziforce supports both:

-   Pull-based feed generation
-   Push-based fanout
-   Hybrid fanout for high-scale feeds

**Design Notes**

For high-scale workloads, Redis may cache recent personalized feed items while PostgreSQL maintains persisted feed delivery records. ClickHouse stores feed analytics for long-term analysis.

**10.7 Trending Engine**

**Overview**

The Trending Engine identifies content gaining rapid engagement across the platform. Trending signals support discovery, alerts, AI recommendations, marketplace visibility, and analytics.

**Trending Inputs**

-   Reactions
-   Comments
-   Shares
-   Saves
-   Views
-   Click-throughs
-   Application conversions
-   Profile visits
-   Time decay
-   Actor reputation
-   Content freshness
-   Moderation status

**Suggested Table: trending\_scores**

**Column**

**Data Type**

**Description**

trending\_score\_id

UUID

Primary identifier

tenant\_id

UUID

Tenant identifier

object\_type

VARCHAR(80)

Activity, Job, Course, Profile

object\_id

UUID

Object identifier

time\_window

VARCHAR(50)

Hourly, Daily, Weekly

reaction\_count

INTEGER

Reaction count

comment\_count

INTEGER

Comment count

share\_count

INTEGER

Share count

save\_count

INTEGER

Save count

view\_count

INTEGER

View count

velocity\_score

NUMERIC(12,6)

Engagement growth rate

decay\_score

NUMERIC(12,6)

Freshness-adjusted score

final\_trending\_score

NUMERIC(12,6)

Final computed score

calculated\_at

TIMESTAMPTZ

Calculation timestamp

**Design Notes**

Trending scores should be recalculated periodically and stored by time window. Content flagged by moderation should be excluded from trending surfaces until approved.

**10.8 Content Moderation**

**Overview**

Content Moderation ensures that user-generated content complies with Kaziforce community standards, legal requirements, platform policies, marketplace trust rules, and enterprise safety standards.

Moderation may be automated, AI-assisted, human-reviewed, or escalation-based.

**Moderated Content Types**

-   Activities
-   Comments
-   Portfolio items
-   Profile summaries
-   Job posts
-   Messages metadata
-   Shared content
-   AI-generated content

**Suggested Table: moderation\_cases**

**Column**

**Data Type**

**Description**

moderation\_case\_id

UUID

Primary moderation case

tenant\_id

UUID

Tenant identifier

target\_type

VARCHAR(80)

Activity, Comment, Job, Profile, Portfolio

target\_id

UUID

Target content

reported\_by\_user\_id

UUID

Reporter user

moderation\_source

VARCHAR(80)

UserReport, AI, System, Admin

reason\_code

VARCHAR(100)

Spam, Abuse, Fraud, Hate, Unsafe, Misleading

severity

VARCHAR(50)

Low, Medium, High, Critical

case\_status

VARCHAR(50)

Open, Under Review, Resolved, Rejected, Escalated

assigned\_moderator\_id

UUID

Moderator

resolution\_action

VARCHAR(100)

No Action, Hide, Remove, Warn, Suspend

resolution\_note

TEXT

Resolution details

opened\_at

TIMESTAMPTZ

Open timestamp

resolved\_at

TIMESTAMPTZ

Resolution timestamp

metadata

JSONB

Extra metadata

**Suggested Table: moderation\_ai\_results**

**Column**

**Data Type**

**Description**

ai\_result\_id

UUID

Primary identifier

tenant\_id

UUID

Tenant identifier

target\_type

VARCHAR(80)

Activity, Comment, Job, Profile

target\_id

UUID

Target content

model\_id

UUID

AI moderation model

toxicity\_score

NUMERIC(8,4)

Toxicity score

spam\_score

NUMERIC(8,4)

Spam likelihood

fraud\_score

NUMERIC(8,4)

Fraud likelihood

policy\_violation\_score

NUMERIC(8,4)

Policy violation score

detected\_categories

JSONB

Detected policy categories

recommendation

VARCHAR(80)

Approve, Review, Reject

evaluated\_at

TIMESTAMPTZ

Evaluation timestamp

**Design Notes**

Moderation actions should be auditable. Removed content should be retained according to policy for dispute resolution, safety investigations, and compliance.

**10.9 AI Feed Ranking**

**Overview**

AI Feed Ranking determines the order in which feed items are displayed to users. It combines engagement signals, relevance, recency, professional interests, marketplace intent, network relationships, trust signals, and AI predictions.

**Ranking Signals**

-   Content freshness
-   User interests
-   Skill relevance
-   Job relevance
-   Professional network proximity
-   Organization relevance
-   Past interactions
-   Save behavior
-   Application behavior
-   Comment behavior
-   Content quality
-   Author trust score
-   Moderation status
-   Trending score
-   AI prediction score

**Suggested Table: feed\_ranking\_scores**

**Column**

**Data Type**

**Description**

feed\_ranking\_score\_id

UUID

Primary identifier

tenant\_id

UUID

Tenant identifier

viewer\_user\_id

UUID

Viewer

viewer\_profile\_id

UUID

Viewer profile

activity\_id

UUID

Activity being ranked

model\_id

UUID

Ranking model

relevance\_score

NUMERIC(12,6)

Relevance to viewer

freshness\_score

NUMERIC(12,6)

Time decay score

engagement\_score

NUMERIC(12,6)

Engagement score

network\_score

NUMERIC(12,6)

Network proximity score

marketplace\_intent\_score

NUMERIC(12,6)

Hiring/job intent signal

trust\_score

NUMERIC(12,6)

Trust and safety score

final\_score

NUMERIC(12,6)

Final ranking score

explanation

JSONB

Ranking explanation

calculated\_at

TIMESTAMPTZ

Calculation timestamp

expires\_at

TIMESTAMPTZ

Score expiry

**Redis Cache Strategy**

Recent ranking scores may be cached using Redis:

feed:rank:{tenant\_id}:{viewer\_user\_id}

feed:home:{tenant\_id}:{viewer\_user\_id}

feed:trending:{tenant\_id}:{time\_window}

Recommended TTL:

-   Home feed cache: 5–15 minutes.
-   Trending feed cache: 10–30 minutes.
-   Ranking score cache: 5–10 minutes.
-   Moderation exclusion cache: 30–60 minutes.

**Design Notes**

AI ranking should never surface content that violates access control, privacy, or moderation policies. Security and visibility filters must be applied before ranking and again before final delivery.

**10.10 ERD**

**Conceptual ERD**

Activity

├── Comment

│ └── CommentThreadPath

├── Reaction

├── Share

├── Save

├── FeedItem

├── TrendingScore

├── ModerationCase

│ └── ModerationAIResult

└── FeedRankingScore

User

├── Activity

├── Comment

├── Reaction

├── Share

├── Save

└── FeedItem

**Relationship Summary**

**Parent Entity**

**Child Entity**

**Cardinality**

Activity

Comments

1:N

Comment

Comment Replies

1:N

Comment

Comment Thread Paths

1:N

Activity

Reactions

1:N

Comment

Reactions

1:N

Activity

Shares

1:N

Activity

Saves

1:N

Activity

Feed Items

1:N

Activity

Trending Scores

1:N

Activity

Moderation Cases

1:N

Moderation Case

Moderation AI Results

1:N

Activity

Feed Ranking Scores

1:N

User

Activities

1:N

User

Comments

1:N

User

Reactions

1:N

User

Shares

1:N

User

Saves

1:N

**ERD Design Notes**

The Workforce Engagement Database is optimized for high-volume user interactions, feed delivery, content discovery, and AI-assisted ranking. The activities table serves as the central content object. Comments, reactions, shares, saves, feed items, trending scores, moderation cases, and ranking scores are linked to activities or other supported target objects.

The design separates authoritative content records from ranking, moderation, and analytics records. This ensures that engagement activity can scale independently while maintaining traceability, safety, and data governance.

Cross-service identifiers such as actor\_user\_id, actor\_profile\_id, actor\_organization\_id, job\_id, and course\_id are stored as UUID references. The Engagement Service consumes events from other services but does not directly modify their source records.

**11\. Messaging Database**

**11.1 Conversations**

**Overview**

The Messaging Database manages real-time and asynchronous communication between Kaziforce users, professionals, organizations, recruiters, teams, support agents, AI agents, and system services. It supports one-to-one conversations, group conversations, project chats, job-specific chats, contract discussions, organization channels, team rooms, support threads, and AI-assisted messaging.

The Messaging Service owns this database. Other services may trigger conversations or notifications through APIs and events, but they do not directly write to the Messaging database.

**Primary Data Stores**

**Data Store**

**Purpose**

PostgreSQL

Conversations, participants, message metadata, read receipts, retention policies

MongoDB

Message bodies, rich message documents, threaded content

Redis

Presence, typing indicators, real-time delivery state, temporary queues

OpenSearch

Message search

Object Storage

Attachments, voice notes, images, files

ClickHouse

Chat analytics and reporting

Kafka

Message events and downstream notifications

**Suggested Table: conversations**

**Column**

**Data Type**

**Description**

conversation\_id

UUID

Primary conversation identifier

tenant\_id

UUID

Tenant identifier

conversation\_type

VARCHAR(80)

Direct, Group, Project, Job, Contract, Team, Support, AI

title

VARCHAR(255)

Optional conversation title

description

TEXT

Optional description

owning\_entity\_type

VARCHAR(80)

Project, Job, Contract, Organization, Team, SupportTicket

owning\_entity\_id

UUID

Referenced business entity

created\_by\_user\_id

UUID

User who created the conversation

is\_private

BOOLEAN

Private conversation flag

is\_encrypted

BOOLEAN

Whether message payloads are encrypted

lifecycle\_status

VARCHAR(50)

Active, Archived, Closed, Deleted

last\_message\_id

UUID

Last message reference

last\_message\_at

TIMESTAMPTZ

Last message timestamp

metadata

JSONB

Flexible metadata

created\_at

TIMESTAMPTZ

Creation timestamp

updated\_at

TIMESTAMPTZ

Update timestamp

archived\_at

TIMESTAMPTZ

Archive timestamp

deleted\_at

TIMESTAMPTZ

Soft delete timestamp

version

INTEGER

Optimistic locking version

**Suggested Table: conversation\_participants**

**Column**

**Data Type**

**Description**

participant\_id

UUID

Primary participant identifier

tenant\_id

UUID

Tenant identifier

conversation\_id

UUID

Conversation reference

participant\_type

VARCHAR(50)

User, Organization, AI Agent, Support Agent

user\_id

UUID

User participant reference

profile\_id

UUID

Professional profile reference

organization\_id

UUID

Organization reference

ai\_agent\_id

UUID

AI agent reference

participant\_role

VARCHAR(80)

Owner, Admin, Member, Guest, Bot

joined\_at

TIMESTAMPTZ

Join timestamp

left\_at

TIMESTAMPTZ

Leave timestamp

muted\_until

TIMESTAMPTZ

Optional mute expiry

is\_pinned

BOOLEAN

Whether conversation is pinned

participant\_status

VARCHAR(50)

Active, Removed, Left, Blocked

notification\_preference

VARCHAR(50)

All, Mentions, Muted

metadata

JSONB

Flexible metadata

**Design Notes**

Conversation ownership is separated from participant membership. A project chat may be owned by a project, while participants may include professionals, recruiters, managers, and AI agents.

**11.2 Messages**

**Overview**

Messages represent communication units exchanged within conversations. Messages may include text, media, system events, attachments, voice notes, location, contract references, payment prompts, AI responses, or workflow actions.

Kaziforce supports both simple text messages and rich structured messages.

**Suggested Table: messages**

**Column**

**Data Type**

**Description**

message\_id

UUID

Primary message identifier

tenant\_id

UUID

Tenant identifier

conversation\_id

UUID

Conversation reference

sender\_type

VARCHAR(50)

User, System, AI Agent, Service

sender\_user\_id

UUID

Sender user reference

sender\_profile\_id

UUID

Sender profile reference

sender\_ai\_agent\_id

UUID

Sender AI agent reference

parent\_message\_id

UUID

Optional reply/thread parent

message\_type

VARCHAR(80)

Text, File, Image, Voice, System, Payment, Contract, AI

message\_summary

VARCHAR(500)

Short preview or summary

message\_body\_ref

VARCHAR(150)

MongoDB document reference

encrypted\_body\_ref

VARCHAR(150)

Encrypted payload reference

has\_attachments

BOOLEAN

Attachment flag

delivery\_status

VARCHAR(50)

Pending, Sent, Delivered, Failed, Deleted

edit\_status

VARCHAR(50)

Original, Edited, Redacted

moderation\_status

VARCHAR(50)

Pending, Approved, Flagged, Removed

sent\_at

TIMESTAMPTZ

Send timestamp

delivered\_at

TIMESTAMPTZ

Delivery timestamp

edited\_at

TIMESTAMPTZ

Last edit timestamp

deleted\_at

TIMESTAMPTZ

Soft delete timestamp

metadata

JSONB

Flexible metadata

version

INTEGER

Optimistic locking version

**MongoDB Collection: message\_documents**

Suggested document structure:

{

"message\_id": "uuid",

"tenant\_id": "uuid",

"conversation\_id": "uuid",

"body": {

"text": "Hello, please review the contract.",

"rich\_text": {},

"mentions": \[\],

"links": \[\],

"entities": \[\]

},

"ai\_metadata": {

"generated\_by\_ai": false,

"model\_id": null,

"safety\_labels": \[\]

},

"created\_at": "timestamp",

"updated\_at": "timestamp"

}

**Design Notes**

Message bodies may be stored in MongoDB to support flexible rich content and future schema evolution. PostgreSQL stores authoritative metadata, sequencing, delivery status, and relational references.

**11.3 Attachments**

**Overview**

Attachments support file sharing within conversations. Files may include resumes, contracts, invoices, images, voice notes, videos, design files, reports, certificates, and project documents.

Files are stored in Object Storage. The Messaging database stores metadata and access references only.

**Suggested Table: message\_attachments**

**Column**

**Data Type**

**Description**

attachment\_id

UUID

Primary attachment identifier

tenant\_id

UUID

Tenant identifier

message\_id

UUID

Message reference

conversation\_id

UUID

Conversation reference

uploaded\_by\_user\_id

UUID

Uploader

file\_name

VARCHAR(255)

Original file name

file\_type

VARCHAR(80)

PDF, DOCX, PNG, JPG, MP4, MP3

mime\_type

VARCHAR(150)

MIME type

file\_size\_bytes

BIGINT

File size

object\_key

TEXT

Object storage key

checksum

VARCHAR(128)

Integrity checksum

virus\_scan\_status

VARCHAR(50)

Pending, Clean, Infected, Failed

encryption\_status

VARCHAR(50)

Encrypted, Not Encrypted

access\_scope

VARCHAR(80)

Conversation, Private, Expiring

expires\_at

TIMESTAMPTZ

Optional expiry timestamp

metadata

JSONB

Flexible metadata

created\_at

TIMESTAMPTZ

Upload timestamp

deleted\_at

TIMESTAMPTZ

Soft delete timestamp

**Design Notes**

Attachments must be scanned before download access is granted. Sensitive files such as contracts, identification documents, invoices, and certificates should use short-lived signed URLs and strict access controls.

**11.4 Read Receipts**

**Overview**

Read Receipts track delivery and consumption status of messages by participants. They support seen status, unread counts, notification decisions, customer support SLAs, and conversation analytics.

**Suggested Table: message\_receipts**

**Column**

**Data Type**

**Description**

receipt\_id

UUID

Primary receipt identifier

tenant\_id

UUID

Tenant identifier

conversation\_id

UUID

Conversation reference

message\_id

UUID

Message reference

participant\_id

UUID

Conversation participant

user\_id

UUID

User reference

delivery\_status

VARCHAR(50)

Sent, Delivered, Read, Failed

delivered\_at

TIMESTAMPTZ

Delivery timestamp

read\_at

TIMESTAMPTZ

Read timestamp

device\_id

VARCHAR(150)

Device reference

created\_at

TIMESTAMPTZ

Creation timestamp

**Suggested Table: conversation\_read\_states**

**Column**

**Data Type**

**Description**

read\_state\_id

UUID

Primary identifier

tenant\_id

UUID

Tenant identifier

conversation\_id

UUID

Conversation reference

participant\_id

UUID

Participant reference

user\_id

UUID

User reference

last\_read\_message\_id

UUID

Last message read

last\_read\_at

TIMESTAMPTZ

Last read timestamp

unread\_count

INTEGER

Current unread count

updated\_at

TIMESTAMPTZ

Update timestamp

**Design Notes**

For high-volume group conversations, per-message receipts may be expensive. Kaziforce may use per-user last\_read\_message\_id for standard chats and detailed message receipts for enterprise, support, or compliance-sensitive conversations.

**11.5 Typing Indicators**

**Overview**

Typing indicators represent transient real-time state. They show when a participant is composing a message.

Typing indicators are not business records and should not be persisted long-term in PostgreSQL. Redis is the preferred store.

**Redis Key Pattern**

typing:{tenant\_id}:{conversation\_id}:{user\_id}

**Suggested Value**

{

"user\_id": "uuid",

"profile\_id": "uuid",

"conversation\_id": "uuid",

"started\_at": "timestamp",

"expires\_at": "timestamp"

}

**Recommended TTL**

5 to 15 seconds.

**Design Notes**

Typing state should be published through WebSocket events and expired automatically. No historical typing data should be retained unless required for diagnostics, and even then it should be anonymized.

**11.6 Presence**

**Overview**

Presence tracks whether users are online, offline, idle, busy, or away. It supports real-time collaboration, message delivery routing, availability indicators, and AI-assisted communication timing.

Presence is primarily stored in Redis because it changes frequently and has short-lived value.

**Redis Key Pattern**

presence:user:{tenant\_id}:{user\_id}

presence:conversation:{tenant\_id}:{conversation\_id}

**Suggested Presence States**

-   Online
-   Offline
-   Idle
-   Busy
-   Away
-   Invisible
-   Do Not Disturb

**Suggested PostgreSQL Table: presence\_snapshots**

**Column**

**Data Type**

**Description**

presence\_snapshot\_id

UUID

Primary identifier

tenant\_id

UUID

Tenant identifier

user\_id

UUID

User reference

presence\_status

VARCHAR(50)

Online, Offline, Idle, Busy, Away

device\_type

VARCHAR(80)

Web, Mobile, Desktop

last\_seen\_at

TIMESTAMPTZ

Last activity timestamp

captured\_at

TIMESTAMPTZ

Snapshot timestamp

**Design Notes**

PostgreSQL should store only coarse presence snapshots such as last\_seen\_at. Real-time presence should remain in Redis to avoid unnecessary database writes.

**11.7 Message Search**

**Overview**

Message Search enables users to find conversations, messages, attachments, links, mentions, and AI summaries. Search must respect tenant boundaries, conversation membership, privacy controls, and message retention policies.

**OpenSearch Index: messages\_v1**

Suggested indexed fields:

**Field**

**Type**

**Purpose**

message\_id

keyword

Message identifier

tenant\_id

keyword

Tenant filtering

conversation\_id

keyword

Conversation filtering

sender\_user\_id

keyword

Sender filtering

message\_type

keyword

Type filtering

message\_text

text

Full-text search

mentions

nested

Mention search

attachment\_names

text

Attachment search

sent\_at

date

Time filtering

moderation\_status

keyword

Safety filtering

lifecycle\_status

keyword

Deletion filtering

**Search Constraints**

Search results must be filtered by:

-   Tenant ID
-   Conversation membership
-   User access rights
-   Message lifecycle status
-   Retention policies
-   Legal holds
-   Moderation restrictions

**Design Notes**

Deleted or redacted messages should either be removed from the search index or indexed only with a tombstone state that prevents content retrieval.

**11.8 Message Retention**

**Overview**

Message retention defines how long messages, attachments, receipts, and conversation metadata are retained. Policies may vary by tenant, organization, conversation type, legal requirements, or compliance obligations.

**Suggested Table: message\_retention\_policies**

**Column**

**Data Type**

**Description**

retention\_policy\_id

UUID

Primary identifier

tenant\_id

UUID

Tenant identifier

organization\_id

UUID

Optional organization

conversation\_type

VARCHAR(80)

Direct, Group, Project, Contract, Support

retention\_days

INTEGER

Retention period

retain\_attachments

BOOLEAN

Whether attachments are retained

archive\_before\_delete

BOOLEAN

Archive flag

legal\_hold\_enabled

BOOLEAN

Whether legal holds override deletion

policy\_status

VARCHAR(50)

Active, Inactive

created\_at

TIMESTAMPTZ

Creation timestamp

updated\_at

TIMESTAMPTZ

Update timestamp

**Suggested Table: legal\_holds**

**Column**

**Data Type**

**Description**

legal\_hold\_id

UUID

Primary legal hold identifier

tenant\_id

UUID

Tenant identifier

target\_type

VARCHAR(80)

Conversation, Message, User, Organization

target\_id

UUID

Target identifier

hold\_reason

TEXT

Reason for legal hold

status

VARCHAR(50)

Active, Released

placed\_by\_user\_id

UUID

User who placed hold

placed\_at

TIMESTAMPTZ

Hold timestamp

released\_by\_user\_id

UUID

User who released hold

released\_at

TIMESTAMPTZ

Release timestamp

**Design Notes**

Retention jobs must respect legal holds. Messages under legal hold must not be deleted even if the retention period expires.

**11.9 Chat Analytics**

**Overview**

Chat Analytics provides insights into communication volume, responsiveness, collaboration patterns, support performance, AI assistant usage, and team engagement.

Operational analytics can be stored in PostgreSQL for recent data and replicated into ClickHouse for long-term reporting.

**Suggested Table: chat\_events**

**Column**

**Data Type**

**Description**

chat\_event\_id

UUID

Primary event identifier

tenant\_id

UUID

Tenant identifier

event\_type

VARCHAR(100)

MessageSent, MessageRead, ConversationCreated, AttachmentUploaded

conversation\_id

UUID

Conversation reference

message\_id

UUID

Optional message reference

actor\_user\_id

UUID

Actor

actor\_profile\_id

UUID

Actor profile

event\_payload

JSONB

Event details

occurred\_at

TIMESTAMPTZ

Business event timestamp

created\_at

TIMESTAMPTZ

Storage timestamp

**Key Metrics**

-   Messages sent
-   Active conversations
-   Average response time
-   Median response time
-   Unread message volume
-   Attachment volume
-   AI-generated replies
-   Support response SLA
-   Conversation resolution time
-   User engagement frequency
-   Group chat participation
-   Message delivery failures

**ClickHouse Fact Tables**

Recommended analytical tables:

-   fact\_message\_activity
-   fact\_conversation\_engagement
-   fact\_response\_time
-   fact\_attachment\_usage
-   fact\_ai\_chat\_usage
-   fact\_support\_chat\_sla

**Design Notes**

Analytics should be anonymized or aggregated where possible. Sensitive message content should not be replicated into analytical stores unless explicitly required and protected by strict access controls.

**11.10 ERD**

**Conceptual ERD**

Conversation

├── ConversationParticipant

├── Message

│ ├── MessageAttachment

│ ├── MessageReceipt

│ └── ChatEvent

├── ConversationReadState

├── MessageRetentionPolicy

└── LegalHold

User

├── ConversationParticipant

├── Message

├── MessageReceipt

├── ConversationReadState

└── PresenceSnapshot

**Relationship Summary**

**Parent Entity**

**Child Entity**

**Cardinality**

Conversation

Conversation Participants

1:N

Conversation

Messages

1:N

Conversation

Conversation Read States

1:N

Conversation

Chat Events

1:N

Message

Message Attachments

1:N

Message

Message Receipts

1:N

Message

Chat Events

1:N

User

Conversation Participants

1:N

User

Messages

1:N

User

Message Receipts

1:N

User

Presence Snapshots

1:N

Retention Policy

Conversations

1:N logical

Legal Hold

Conversation or Message

1:N logical

**ERD Design Notes**

The Messaging Database separates persistent conversation records from transient real-time state. Conversations, participants, message metadata, receipts, retention policies, and audit events are stored durably. Typing indicators and live presence are stored in Redis because they are short-lived and high-frequency.

Message bodies may be stored in MongoDB to support rich content, flexible schemas, and future AI-assisted message structures. Attachments are stored in Object Storage, with secure metadata references in PostgreSQL.

Search, analytics, and notifications consume message events asynchronously through Kafka. This preserves the performance of the messaging write path while enabling message search, chat analytics, notification delivery, moderation, and AI features.

**12\. Voice & Video Database**

**12.1 Calls**

**Overview**

The Voice & Video Database manages all real-time communication sessions within Kaziforce, including voice calls, video calls, webinars, live interviews, AI-assisted meetings, screen sharing, and streaming sessions.

The Voice & Video Service owns this database and is responsible for managing call metadata, participants, session lifecycle, recordings, meeting analytics, and AI-generated meeting insights.

Media traffic (audio, video, screen sharing) flows directly through WebRTC media servers (SFU/MCU) such as LiveKit, Janus, Jitsi, or Mediasoup. The database stores only metadata—not media streams.

**Primary Data Stores**

**Data Store**

**Purpose**

PostgreSQL

Call metadata, meetings, participants, recordings, scheduling

Redis

Live call state, participant presence, signaling cache

Object Storage

Meeting recordings, transcripts, screenshots

MongoDB

AI-generated meeting summaries, transcripts, annotations

ClickHouse

Call quality analytics and usage metrics

Kafka

Call lifecycle events and notifications

**Supported Call Types**

-   One-to-one voice call
-   One-to-one video call
-   Group voice call
-   Group video meeting
-   Webinar
-   Interview session
-   Screen sharing session
-   Live presentation
-   AI consultation
-   Customer support call

**Suggested Table: calls**

**Column**

**Data Type**

**Description**

call\_id

UUID

Primary call identifier

tenant\_id

UUID

Tenant identifier

conversation\_id

UUID

Related conversation (optional)

meeting\_id

UUID

Related scheduled meeting (optional)

initiated\_by\_user\_id

UUID

Call initiator

call\_type

VARCHAR(80)

Voice, Video, Webinar, ScreenShare

call\_mode

VARCHAR(80)

Direct, Group, Scheduled

media\_server

VARCHAR(100)

LiveKit, Janus, Jitsi, Mediasoup

signaling\_server

VARCHAR(150)

Signaling service

call\_status

VARCHAR(50)

Ringing, Connecting, Active, Ended, Failed, Cancelled

started\_at

TIMESTAMPTZ

Actual start time

ended\_at

TIMESTAMPTZ

End time

duration\_seconds

INTEGER

Call duration

recording\_enabled

BOOLEAN

Recording flag

transcription\_enabled

BOOLEAN

Live transcription flag

ai\_assistant\_enabled

BOOLEAN

AI assistant enabled

metadata

JSONB

Call metadata

created\_at

TIMESTAMPTZ

Creation timestamp

updated\_at

TIMESTAMPTZ

Update timestamp

**Design Notes**

The database stores signaling and session metadata only. Audio, video, and screen-sharing packets remain within the WebRTC infrastructure and are never persisted in relational storage.

**12.2 Meetings**

**Overview**

Meetings represent scheduled collaboration sessions between professionals, recruiters, organizations, AI assistants, or support teams.

Meetings may be linked to:

-   Interviews
-   Project discussions
-   Team meetings
-   Client consultations
-   AI coaching sessions
-   Training sessions
-   Webinars
-   Contract negotiations

**Suggested Table: meetings**

**Column**

**Data Type**

**Description**

meeting\_id

UUID

Primary meeting identifier

tenant\_id

UUID

Tenant identifier

organizer\_user\_id

UUID

Meeting organizer

organization\_id

UUID

Hosting organization

title

VARCHAR(255)

Meeting title

description

TEXT

Meeting description

meeting\_type

VARCHAR(80)

Interview, Project, Training, Webinar

meeting\_status

VARCHAR(50)

Scheduled, Active, Completed, Cancelled

scheduled\_start

TIMESTAMPTZ

Planned start

scheduled\_end

TIMESTAMPTZ

Planned end

actual\_start

TIMESTAMPTZ

Actual start

actual\_end

TIMESTAMPTZ

Actual end

timezone

VARCHAR(80)

Meeting timezone

recurrence\_rule

TEXT

Optional recurrence

meeting\_link

TEXT

Join URL

waiting\_room\_enabled

BOOLEAN

Waiting room

lobby\_enabled

BOOLEAN

Lobby enabled

recording\_enabled

BOOLEAN

Recording flag

transcription\_enabled

BOOLEAN

Transcription flag

ai\_assistant\_enabled

BOOLEAN

AI meeting assistant

metadata

JSONB

Flexible metadata

created\_at

TIMESTAMPTZ

Creation timestamp

updated\_at

TIMESTAMPTZ

Update timestamp

**Design Notes**

Meeting scheduling should integrate with Calendar, Notification, and Messaging services. Meeting links should use secure, signed tokens with configurable expiry.

**12.3 Participants**

**Overview**

Participants represent users, AI agents, guests, or external attendees who join a meeting or call.

**Suggested Table: meeting\_participants**

**Column**

**Data Type**

**Description**

participant\_id

UUID

Primary identifier

tenant\_id

UUID

Tenant identifier

meeting\_id

UUID

Meeting reference

call\_id

UUID

Active call reference

participant\_type

VARCHAR(50)

User, Guest, AI Agent

user\_id

UUID

Internal user

profile\_id

UUID

Professional profile

guest\_name

VARCHAR(180)

Guest display name

guest\_email

VARCHAR(255)

Guest email

ai\_agent\_id

UUID

AI agent reference

participant\_role

VARCHAR(80)

Host, CoHost, Presenter, Participant, Observer

join\_time

TIMESTAMPTZ

Join timestamp

leave\_time

TIMESTAMPTZ

Leave timestamp

connection\_status

VARCHAR(50)

Invited, Connected, Disconnected

audio\_enabled

BOOLEAN

Audio state

video\_enabled

BOOLEAN

Video state

screen\_share\_enabled

BOOLEAN

Screen share state

hand\_raised

BOOLEAN

Raised hand

network\_quality

VARCHAR(50)

Excellent, Good, Fair, Poor

metadata

JSONB

Flexible metadata

created\_at

TIMESTAMPTZ

Creation timestamp

**Design Notes**

Participant state changes should be propagated through WebSockets while long-term attendance information is persisted for reporting, compliance, and meeting analytics.

**12.4 Call Recordings**

**Overview**

Call recordings provide secure storage and management of recorded meetings, interviews, webinars, and support calls.

Actual recordings are stored in Object Storage. The database stores metadata, permissions, and processing status.

**Suggested Table: call\_recordings**

**Column**

**Data Type**

**Description**

recording\_id

UUID

Primary recording identifier

tenant\_id

UUID

Tenant identifier

meeting\_id

UUID

Meeting reference

call\_id

UUID

Call reference

recording\_type

VARCHAR(80)

Audio, Video, Screen, Composite

object\_key

TEXT

Object storage reference

file\_size\_bytes

BIGINT

File size

duration\_seconds

INTEGER

Recording duration

codec

VARCHAR(80)

Media codec

resolution

VARCHAR(80)

Video resolution

recording\_status

VARCHAR(50)

Recording, Processing, Ready, Failed

transcript\_status

VARCHAR(50)

Pending, Completed, Failed

retention\_policy\_id

UUID

Retention policy

checksum

VARCHAR(128)

File checksum

metadata

JSONB

Flexible metadata

created\_at

TIMESTAMPTZ

Creation timestamp

**Design Notes**

Recordings should support lifecycle management, encryption at rest, retention enforcement, and role-based access. Signed URLs should be used for secure playback.

**12.5 Live Sessions**

**Overview**

Live Sessions represent active WebRTC media sessions managed by SFUs or MCUs.

These records provide operational visibility into ongoing calls and support monitoring, diagnostics, and resilience.

**Suggested Table: live\_sessions**

**Column**

**Data Type**

**Description**

session\_id

UUID

Primary session identifier

tenant\_id

UUID

Tenant identifier

meeting\_id

UUID

Meeting reference

call\_id

UUID

Call reference

media\_server

VARCHAR(120)

Hosting media server

region

VARCHAR(80)

Media region

session\_status

VARCHAR(50)

Initializing, Active, Ending, Failed

participant\_count

INTEGER

Active participants

bitrate\_kbps

INTEGER

Aggregate bitrate

packet\_loss\_percent

NUMERIC(6,3)

Packet loss

average\_latency\_ms

INTEGER

Latency

average\_jitter\_ms

INTEGER

Jitter

cpu\_usage\_percent

NUMERIC(6,2)

Media server CPU

memory\_usage\_mb

INTEGER

Memory usage

started\_at

TIMESTAMPTZ

Session start

ended\_at

TIMESTAMPTZ

Session end

updated\_at

TIMESTAMPTZ

Last update

**Redis Cache**

Recommended Redis key:

call:live:{call\_id}

TTL should expire shortly after session termination.

**12.6 Streaming Metadata**

**Overview**

Streaming Metadata captures information about audio, video, screen-sharing, simulcast streams, adaptive bitrate layers, and media quality.

**Suggested Table: media\_streams**

**Column**

**Data Type**

**Description**

stream\_id

UUID

Primary stream identifier

tenant\_id

UUID

Tenant identifier

session\_id

UUID

Live session

participant\_id

UUID

Stream owner

stream\_type

VARCHAR(50)

Audio, Video, Screen

codec

VARCHAR(80)

Opus, VP9, H264, AV1

resolution

VARCHAR(80)

Video resolution

frame\_rate

INTEGER

FPS

bitrate\_kbps

INTEGER

Bitrate

transport\_protocol

VARCHAR(50)

UDP, TCP

encryption

VARCHAR(80)

DTLS-SRTP

stream\_status

VARCHAR(50)

Active, Muted, Paused, Ended

started\_at

TIMESTAMPTZ

Stream start

ended\_at

TIMESTAMPTZ

Stream end

**Design Notes**

Stream metadata supports troubleshooting, adaptive streaming decisions, and quality analytics without storing media packets.

**12.7 AI Meeting Insights**

**Overview**

AI Meeting Insights provide automated summaries, transcripts, action items, speaker analytics, sentiment analysis, and meeting intelligence.

Generated insights support:

-   Meeting summaries
-   Action items
-   Decision tracking
-   Task extraction
-   Speaker participation
-   Sentiment analysis
-   Keyword extraction
-   Follow-up recommendations

**Suggested Table: meeting\_ai\_insights**

**Column**

**Data Type**

**Description**

insight\_id

UUID

Primary insight identifier

tenant\_id

UUID

Tenant identifier

meeting\_id

UUID

Meeting reference

recording\_id

UUID

Recording reference

ai\_model\_id

UUID

AI model

summary

TEXT

AI-generated summary

action\_items

JSONB

Extracted actions

decisions

JSONB

Meeting decisions

key\_topics

JSONB

Major discussion topics

speaker\_statistics

JSONB

Speaking metrics

sentiment\_summary

JSONB

Overall sentiment

transcript\_object\_key

TEXT

Transcript location

confidence\_score

NUMERIC(8,4)

Confidence

generated\_at

TIMESTAMPTZ

Generation timestamp

**MongoDB Collection: meeting\_transcripts**

Suggested document structure:

{

"meeting\_id": "uuid",

"recording\_id": "uuid",

"language": "en",

"segments": \[

{

"speaker": "John Doe",

"start": 12.4,

"end": 16.9,

"text": "We should finalize the hiring plan."

}

\],

"keywords": \[\],

"summary": "...",

"created\_at": "timestamp"

}

**Design Notes**

AI-generated insights should reference the AI model version and generation timestamp. Human edits to summaries or action items should be versioned rather than replacing original AI outputs.

**12.8 ERD**

**Conceptual ERD**

Meeting

├── Call

│ ├── LiveSession

│ │ └── MediaStream

│ ├── MeetingParticipant

│ └── CallRecording

│ └── MeetingAIInsight

└── MeetingParticipant

User

├── Meeting

├── MeetingParticipant

└── Call

AIModel

└── MeetingAIInsight

**Relationship Summary**

**Parent Entity**

**Child Entity**

**Cardinality**

Meeting

Calls

1:N

Meeting

Participants

1:N

Call

Live Sessions

1:N

Live Session

Media Streams

1:N

Call

Call Recordings

1:N

Call

Participants

1:N

Recording

AI Meeting Insights

1:N

User

Meetings

1:N

User

Meeting Participants

1:N

AI Model

Meeting AI Insights

1:N

**ERD Design Notes**

The Voice & Video Database separates persistent meeting metadata from transient media state. PostgreSQL manages meetings, participants, recordings, and AI-generated insights, while Redis maintains real-time session state. Audio and video streams remain within the WebRTC media infrastructure and are not stored in relational databases.

Large artifacts such as recordings, transcripts, screenshots, and presentation files are stored in Object Storage, with only metadata and secure references maintained in the database. AI-generated transcripts and summaries are stored in MongoDB for flexibility and linked back to authoritative meeting records in PostgreSQL.

This architecture supports high-volume real-time collaboration, scalable media infrastructure, enterprise governance, AI-powered meeting intelligence, and long-term analytical reporting.

**13\. Notification Database**

**13.1 Notification Templates**

**Overview**

The Notification Database manages the creation, delivery, tracking, and analytics of notifications across the Kaziforce platform. It supports real-time, scheduled, transactional, and marketing notifications delivered through multiple communication channels.

The Notification Service owns this database and receives events from all other microservices through Kafka. It transforms business events into user notifications based on templates, user preferences, business rules, and delivery policies.

Notification templates provide reusable content definitions that separate presentation from business logic.

**Supported Notification Types**

-   Authentication notifications
-   Password reset
-   Multi-factor authentication (MFA)
-   Welcome messages
-   Job alerts
-   Application updates
-   Interview invitations
-   Offer notifications
-   Contract notifications
-   Payment notifications
-   Wallet alerts
-   Learning reminders
-   AI recommendations
-   System announcements
-   Marketing campaigns
-   Compliance alerts

**Suggested Table: notification\_templates**

**Column**

**Data Type**

**Description**

template\_id

UUID

Primary template identifier

template\_code

VARCHAR(120)

Unique template code

template\_name

VARCHAR(180)

Template name

notification\_category

VARCHAR(100)

Authentication, Marketplace, Payment, Learning

channel

VARCHAR(50)

Email, SMS, Push, In-App, WhatsApp

language\_code

VARCHAR(10)

Language

subject\_template

TEXT

Subject template

body\_template

TEXT

Message body template

html\_template

TEXT

HTML template

variables

JSONB

Supported template variables

version

INTEGER

Template version

approval\_status

VARCHAR(50)

Draft, Approved, Archived

is\_active

BOOLEAN

Active flag

created\_by

UUID

Creator

approved\_by

UUID

Approver

created\_at

TIMESTAMPTZ

Creation timestamp

updated\_at

TIMESTAMPTZ

Update timestamp

**Design Notes**

Templates should be immutable after approval. Changes should create new template versions rather than modifying previously approved templates to preserve auditability.

**13.2 Delivery Channels**

**Overview**

Kaziforce supports multiple notification delivery channels. Each notification may be delivered through one or more channels based on business rules and user preferences.

**Supported Channels**

-   In-App
-   Push Notification
-   Email
-   SMS
-   WhatsApp
-   Voice Call
-   Slack
-   Microsoft Teams
-   Webhooks
-   API Callback

**Suggested Table: delivery\_channels**

**Column**

**Data Type**

**Description**

channel\_id

UUID

Primary identifier

channel\_code

VARCHAR(80)

Unique channel code

channel\_name

VARCHAR(120)

Display name

provider

VARCHAR(120)

FCM, APNs, Twilio, SendGrid, WhatsApp Business

provider\_configuration

JSONB

Provider configuration

rate\_limit\_per\_second

INTEGER

Rate limit

priority

INTEGER

Delivery priority

supports\_rich\_content

BOOLEAN

Rich content support

supports\_scheduling

BOOLEAN

Scheduled delivery support

supports\_retry

BOOLEAN

Retry support

is\_active

BOOLEAN

Active status

created\_at

TIMESTAMPTZ

Creation timestamp

updated\_at

TIMESTAMPTZ

Update timestamp

**Suggested Table: notification\_deliveries**

**Column**

**Data Type**

**Description**

delivery\_id

UUID

Primary delivery identifier

tenant\_id

UUID

Tenant identifier

notification\_id

UUID

Notification reference

channel\_id

UUID

Delivery channel

recipient\_user\_id

UUID

Recipient

provider\_message\_id

VARCHAR(255)

Provider message reference

delivery\_status

VARCHAR(50)

Queued, Sent, Delivered, Failed

provider\_response

JSONB

Provider response

queued\_at

TIMESTAMPTZ

Queue timestamp

sent\_at

TIMESTAMPTZ

Sent timestamp

delivered\_at

TIMESTAMPTZ

Delivery confirmation

failed\_at

TIMESTAMPTZ

Failure timestamp

**Design Notes**

A single logical notification may generate multiple delivery records when fallback or multi-channel delivery strategies are used.

**13.3 User Preferences**

**Overview**

Notification preferences allow users and organizations to control how and when notifications are received.

Preferences support:

-   Channel selection
-   Quiet hours
-   Notification frequency
-   Category subscriptions
-   Language
-   Digest mode
-   Do Not Disturb
-   Organization-specific overrides

**Suggested Table: notification\_preferences**

**Column**

**Data Type**

**Description**

preference\_id

UUID

Primary identifier

tenant\_id

UUID

Tenant identifier

user\_id

UUID

User

organization\_id

UUID

Optional organization

notification\_category

VARCHAR(100)

Category

preferred\_channels

JSONB

Ordered list of channels

instant\_delivery

BOOLEAN

Immediate notifications

digest\_enabled

BOOLEAN

Digest mode

digest\_frequency

VARCHAR(50)

Daily, Weekly

quiet\_hours\_start

TIME

Quiet period start

quiet\_hours\_end

TIME

Quiet period end

timezone

VARCHAR(80)

User timezone

language\_code

VARCHAR(10)

Preferred language

do\_not\_disturb

BOOLEAN

DND enabled

marketing\_opt\_in

BOOLEAN

Marketing consent

created\_at

TIMESTAMPTZ

Creation timestamp

updated\_at

TIMESTAMPTZ

Update timestamp

**Design Notes**

Preferences should be evaluated before notification delivery. Critical security notifications may bypass quiet hours and marketing preferences when permitted by policy.

**13.4 Delivery Logs**

**Overview**

Delivery Logs maintain an immutable audit trail of notification delivery attempts and provider responses.

These logs support:

-   Troubleshooting
-   Compliance
-   SLA monitoring
-   Provider diagnostics
-   Delivery analytics
-   Customer support

**Suggested Table: notification\_delivery\_logs**

**Column**

**Data Type**

**Description**

log\_id

UUID

Primary identifier

tenant\_id

UUID

Tenant identifier

notification\_id

UUID

Notification

delivery\_id

UUID

Delivery record

provider

VARCHAR(120)

Delivery provider

event\_type

VARCHAR(80)

Queued, Sent, Delivered, Opened, Failed

event\_payload

JSONB

Raw provider payload

response\_code

VARCHAR(50)

Provider response code

response\_message

TEXT

Provider response

occurred\_at

TIMESTAMPTZ

Event timestamp

created\_at

TIMESTAMPTZ

Storage timestamp

**Logged Events**

-   Queued
-   Accepted
-   Sent
-   Delivered
-   Opened
-   Clicked
-   Failed
-   Expired
-   Bounced
-   Unsubscribed

**Design Notes**

Delivery logs should be append-only. Existing log records should never be updated except to correct technical corruption under controlled administrative procedures.

**13.5 Retry Queue**

**Overview**

Notification delivery failures may occur due to temporary provider outages, invalid tokens, network issues, or rate limits.

The Retry Queue manages controlled retry attempts.

**Suggested Table: notification\_retry\_queue**

**Column**

**Data Type**

**Description**

retry\_id

UUID

Primary identifier

tenant\_id

UUID

Tenant identifier

notification\_id

UUID

Notification

delivery\_id

UUID

Delivery

retry\_reason

VARCHAR(120)

Timeout, RateLimit, TemporaryFailure

retry\_attempt

INTEGER

Attempt number

maximum\_attempts

INTEGER

Maximum retries

next\_retry\_at

TIMESTAMPTZ

Scheduled retry

retry\_status

VARCHAR(50)

Pending, Running, Completed, Abandoned

last\_error

TEXT

Latest error

created\_at

TIMESTAMPTZ

Creation timestamp

updated\_at

TIMESTAMPTZ

Update timestamp

**Retry Strategy**

Recommended exponential backoff:

-   Retry 1: Immediate
-   Retry 2: 30 seconds
-   Retry 3: 2 minutes
-   Retry 4: 10 minutes
-   Retry 5: 30 minutes

Retry rules should be configurable by notification category and provider.

**Design Notes**

Permanent failures such as invalid email addresses or permanently revoked push tokens should not be retried indefinitely.

**13.6 Push Tokens**

**Overview**

Push Tokens represent mobile and web devices registered to receive push notifications.

Supported platforms include:

-   Android (FCM)
-   iOS (APNs)
-   Web Push
-   Desktop Push

**Suggested Table: push\_tokens**

**Column**

**Data Type**

**Description**

push\_token\_id

UUID

Primary identifier

tenant\_id

UUID

Tenant identifier

user\_id

UUID

User

device\_id

VARCHAR(180)

Device identifier

platform

VARCHAR(50)

Android, iOS, Web

provider

VARCHAR(80)

FCM, APNs

token

TEXT

Device push token

application\_version

VARCHAR(50)

App version

operating\_system

VARCHAR(80)

Device OS

device\_model

VARCHAR(120)

Device model

language\_code

VARCHAR(10)

Device language

timezone

VARCHAR(80)

Device timezone

is\_active

BOOLEAN

Active token

last\_used\_at

TIMESTAMPTZ

Last notification usage

expires\_at

TIMESTAMPTZ

Token expiry

created\_at

TIMESTAMPTZ

Registration timestamp

updated\_at

TIMESTAMPTZ

Update timestamp

**Design Notes**

Invalid or expired push tokens should be automatically deactivated after repeated provider failures. Duplicate active tokens for the same device should be prevented.

**13.7 Notification Analytics**

**Overview**

Notification Analytics measures the effectiveness, reliability, and business impact of the notification platform.

Operational metrics are maintained in PostgreSQL while historical analytical data is replicated to ClickHouse.

**Suggested Table: notification\_events**

**Column**

**Data Type**

**Description**

notification\_event\_id

UUID

Primary identifier

tenant\_id

UUID

Tenant identifier

notification\_id

UUID

Notification

user\_id

UUID

Recipient

event\_type

VARCHAR(80)

Created, Sent, Delivered, Opened, Clicked

channel

VARCHAR(50)

Delivery channel

provider

VARCHAR(120)

Delivery provider

metadata

JSONB

Event metadata

occurred\_at

TIMESTAMPTZ

Business event time

created\_at

TIMESTAMPTZ

Storage timestamp

**Key Metrics**

-   Notifications generated
-   Notifications sent
-   Delivery success rate
-   Delivery latency
-   Open rate
-   Click-through rate
-   Push notification success rate
-   Email bounce rate
-   SMS delivery rate
-   Channel performance
-   Retry rate
-   Provider reliability
-   User engagement
-   Quiet hour deferrals

**Recommended ClickHouse Fact Tables**

-   fact\_notification\_delivery
-   fact\_notification\_engagement
-   fact\_channel\_performance
-   fact\_provider\_performance
-   fact\_retry\_statistics
-   fact\_push\_delivery
-   fact\_email\_delivery
-   fact\_sms\_delivery

**Design Notes**

Notification analytics should support real-time dashboards as well as historical reporting. Personally identifiable information should be minimized or anonymized in long-term analytical datasets where appropriate.

**13.8 ERD**

**Conceptual ERD**

NotificationTemplate

│

└── Notification

├── NotificationDelivery

│ ├── NotificationDeliveryLog

│ └── NotificationRetryQueue

├── NotificationEvent

└── DeliveryChannel

User

├── NotificationPreference

├── PushToken

└── Notification

**Relationship Summary**

**Parent Entity**

**Child Entity**

**Cardinality**

Notification Template

Notifications

1:N

Notification

Deliveries

1:N

Delivery Channel

Deliveries

1:N

Delivery

Delivery Logs

1:N

Delivery

Retry Queue

1:N

Notification

Notification Events

1:N

User

Notification Preferences

1:N

User

Push Tokens

1:N

User

Notifications

1:N

**ERD Design Notes**

The Notification Database is designed around a single logical notification that can generate multiple delivery attempts across different channels. Templates define reusable content, while user preferences determine delivery behavior. Deliveries, retries, and logs are separated to provide a complete audit trail without affecting operational performance.

Push notification tokens, channel configurations, and delivery providers are independently managed to allow provider substitution without impacting application logic. Event-driven processing through Kafka enables scalable asynchronous notification delivery, while Redis can be used for temporary queues, rate limiting, deduplication, and burst control. ClickHouse supports large-scale notification analytics without placing analytical workloads on the transactional database.

**14\. Calendar & Scheduling Database**

**14.1 Overview**

The Calendar & Scheduling Database manages time-based coordination across Kaziforce. It supports meetings, interviews, work sessions, bookings, reminders, availability slots, scheduling rules, resource reservations, calendar integrations, and AI-assisted scheduling.

The Calendar Service owns this database. Other services interact with it through APIs and events. For example, the Marketplace Service may request interview scheduling, the Voice & Video Service may create meeting links, the Notification Service may send reminders, and the Workforce Management Service may consume availability data.

**Primary Responsibilities**

The Calendar & Scheduling Database supports:

-   User calendars
-   Organization calendars
-   Interview scheduling
-   Meeting scheduling
-   Professional availability
-   Booking slots
-   Resource reservations
-   Recurring events
-   Reminders
-   Calendar integrations
-   Conflict detection
-   Time zone management
-   AI scheduling recommendations

**Primary Data Stores**

**Data Store**

**Purpose**

PostgreSQL

Calendar events, bookings, availability, reminders, integrations

Redis

Short-lived availability cache, booking locks, reminder queue

Kafka

Calendar events and scheduling workflows

ClickHouse

Scheduling analytics

Object Storage

Optional calendar exports and meeting attachments

**14.2 Calendars**

**Overview**

A calendar represents a container for time-based events. Calendars may belong to individual users, organizations, teams, projects, departments, branches, or AI agents.

**Calendar Types**

-   Personal calendar
-   Organization calendar
-   Team calendar
-   Project calendar
-   Interview calendar
-   Resource calendar
-   AI agent calendar
-   Public booking calendar

**Suggested Table: calendars**

**Column**

**Data Type**

**Description**

calendar\_id

UUID

Primary calendar identifier

tenant\_id

UUID

Tenant identifier

owner\_type

VARCHAR(80)

User, Organization, Team, Project, Resource, AI Agent

owner\_id

UUID

Owner entity reference

calendar\_name

VARCHAR(180)

Calendar display name

calendar\_type

VARCHAR(80)

Personal, Team, Project, Interview, Resource

timezone

VARCHAR(80)

Default timezone

visibility\_status

VARCHAR(50)

Private, Shared, Public

sync\_enabled

BOOLEAN

External sync enabled

lifecycle\_status

VARCHAR(50)

Active, Inactive, Archived

metadata

JSONB

Flexible metadata

created\_at

TIMESTAMPTZ

Creation timestamp

updated\_at

TIMESTAMPTZ

Update timestamp

deleted\_at

TIMESTAMPTZ

Soft delete timestamp

**Design Notes**

Calendars should not duplicate identity, organization, or profile records. They store owner references only. Ownership is validated through source services.

**14.3 Calendar Events**

**Overview**

Calendar events represent scheduled time blocks. They may be meetings, interviews, work sessions, project reviews, reminders, deadlines, blocked time, leave periods, or AI-scheduled activities.

**Suggested Table: calendar\_events**

**Column**

**Data Type**

**Description**

event\_id

UUID

Primary event identifier

tenant\_id

UUID

Tenant identifier

calendar\_id

UUID

Calendar reference

created\_by\_user\_id

UUID

Creator

event\_title

VARCHAR(255)

Event title

event\_description

TEXT

Event description

event\_type

VARCHAR(80)

Meeting, Interview, Booking, Reminder, WorkBlock, Leave

related\_entity\_type

VARCHAR(80)

Job, Project, Contract, Meeting, Task

related\_entity\_id

UUID

Related entity reference

start\_time

TIMESTAMPTZ

Event start

end\_time

TIMESTAMPTZ

Event end

timezone

VARCHAR(80)

Event timezone

is\_all\_day

BOOLEAN

All-day event flag

location\_type

VARCHAR(80)

Physical, Virtual, Hybrid

location\_details

TEXT

Physical address or meeting link

recurrence\_rule

TEXT

RFC5545 recurrence rule

recurrence\_parent\_event\_id

UUID

Parent recurring event

event\_status

VARCHAR(50)

Scheduled, Confirmed, Tentative, Cancelled, Completed

visibility\_status

VARCHAR(50)

Private, Shared, Public

meeting\_link

TEXT

Online meeting link

metadata

JSONB

Flexible metadata

created\_at

TIMESTAMPTZ

Creation timestamp

updated\_at

TIMESTAMPTZ

Update timestamp

cancelled\_at

TIMESTAMPTZ

Cancellation timestamp

deleted\_at

TIMESTAMPTZ

Soft delete timestamp

version

INTEGER

Optimistic locking version

**Design Notes**

Recurring events should store recurrence rules separately from generated occurrences where possible. For performance, near-term recurring occurrences may be materialized into an occurrence table.

**14.4 Event Participants**

**Overview**

Event participants represent users, professionals, organization members, guests, AI agents, or external contacts invited to calendar events.

**Suggested Table: calendar\_event\_participants**

**Column**

**Data Type**

**Description**

participant\_id

UUID

Primary participant identifier

tenant\_id

UUID

Tenant identifier

event\_id

UUID

Event reference

participant\_type

VARCHAR(80)

User, Guest, AI Agent, Organization

user\_id

UUID

Internal user reference

profile\_id

UUID

Professional profile reference

organization\_id

UUID

Organization reference

ai\_agent\_id

UUID

AI agent reference

guest\_name

VARCHAR(180)

External guest name

guest\_email

VARCHAR(255)

External guest email

participant\_role

VARCHAR(80)

Organizer, Required, Optional, Observer

response\_status

VARCHAR(50)

Pending, Accepted, Declined, Tentative

response\_note

TEXT

Optional response note

responded\_at

TIMESTAMPTZ

Response timestamp

joined\_at

TIMESTAMPTZ

Actual join time

left\_at

TIMESTAMPTZ

Actual leave time

created\_at

TIMESTAMPTZ

Creation timestamp

**Design Notes**

Participant responses should publish events to Notification, Voice & Video, Marketplace, and Workforce Management services where applicable.

**14.5 Availability Rules**

**Overview**

Availability rules define when a user, professional, team, organization, or resource is generally available for scheduling.

These rules are used for:

-   Interview scheduling
-   Booking calendars
-   Work availability
-   Shift planning
-   AI scheduling
-   Capacity planning

**Suggested Table: availability\_rules**

**Column**

**Data Type**

**Description**

availability\_rule\_id

UUID

Primary rule identifier

tenant\_id

UUID

Tenant identifier

owner\_type

VARCHAR(80)

User, Profile, Team, Resource, Organization

owner\_id

UUID

Owner entity

rule\_name

VARCHAR(180)

Rule name

day\_of\_week

INTEGER

0-6 or ISO weekday

start\_time

TIME

Available start time

end\_time

TIME

Available end time

timezone

VARCHAR(80)

Rule timezone

effective\_from

DATE

Rule start date

effective\_to

DATE

Rule end date

is\_available

BOOLEAN

Available or unavailable block

priority

INTEGER

Rule priority

lifecycle\_status

VARCHAR(50)

Active, Inactive, Archived

metadata

JSONB

Flexible metadata

created\_at

TIMESTAMPTZ

Creation timestamp

updated\_at

TIMESTAMPTZ

Update timestamp

**Design Notes**

Availability rules should support overlapping rules with priority. For example, a professional may normally be available Monday to Friday but unavailable during a specific leave period.

**14.6 Booking Slots**

**Overview**

Booking slots represent concrete time windows that can be reserved by another party. They may be generated from availability rules or created manually.

**Suggested Table: booking\_slots**

**Column**

**Data Type**

**Description**

booking\_slot\_id

UUID

Primary slot identifier

tenant\_id

UUID

Tenant identifier

owner\_type

VARCHAR(80)

User, Profile, Team, Resource

owner\_id

UUID

Slot owner

calendar\_id

UUID

Calendar reference

slot\_type

VARCHAR(80)

Interview, Consultation, WorkSession, Demo

start\_time

TIMESTAMPTZ

Slot start

end\_time

TIMESTAMPTZ

Slot end

timezone

VARCHAR(80)

Slot timezone

slot\_status

VARCHAR(50)

Available, Held, Booked, Cancelled, Expired

hold\_expires\_at

TIMESTAMPTZ

Temporary hold expiry

booked\_by\_user\_id

UUID

User who booked

booking\_reference\_id

UUID

Booking reference

metadata

JSONB

Flexible metadata

created\_at

TIMESTAMPTZ

Creation timestamp

updated\_at

TIMESTAMPTZ

Update timestamp

**Redis Booking Lock**

Recommended key pattern:

booking:lock:{tenant\_id}:{booking\_slot\_id}

Recommended TTL:

-   2 to 10 minutes.

**Design Notes**

Booking slots require strong concurrency control to prevent double booking. PostgreSQL constraints and Redis locks should be used together.

**14.7 Bookings**

**Overview**

Bookings represent confirmed reservations of calendar time. A booking may create a calendar event, meeting link, notification reminder, and related marketplace workflow.

**Suggested Table: bookings**

**Column**

**Data Type**

**Description**

booking\_id

UUID

Primary booking identifier

tenant\_id

UUID

Tenant identifier

booking\_slot\_id

UUID

Slot reference

calendar\_event\_id

UUID

Created calendar event

booking\_type

VARCHAR(80)

Interview, Consultation, Meeting, WorkSession

requester\_user\_id

UUID

User requesting booking

requester\_profile\_id

UUID

Requester profile

host\_user\_id

UUID

Host user

host\_profile\_id

UUID

Host profile

organization\_id

UUID

Related organization

related\_entity\_type

VARCHAR(80)

Job, Application, Project, Contract

related\_entity\_id

UUID

Related entity

booking\_status

VARCHAR(50)

Requested, Confirmed, Cancelled, Completed, NoShow

cancellation\_reason

TEXT

Cancellation reason

confirmed\_at

TIMESTAMPTZ

Confirmation timestamp

cancelled\_at

TIMESTAMPTZ

Cancellation timestamp

completed\_at

TIMESTAMPTZ

Completion timestamp

metadata

JSONB

Flexible metadata

created\_at

TIMESTAMPTZ

Creation timestamp

updated\_at

TIMESTAMPTZ

Update timestamp

**14.8 Reminders**

**Overview**

Reminders trigger notifications before or after scheduled events. They support email, SMS, push, WhatsApp, and in-app notifications.

**Suggested Table: calendar\_reminders**

**Column**

**Data Type**

**Description**

reminder\_id

UUID

Primary reminder identifier

tenant\_id

UUID

Tenant identifier

event\_id

UUID

Calendar event

participant\_id

UUID

Optional participant

reminder\_type

VARCHAR(80)

BeforeEvent, AfterEvent, FollowUp

reminder\_offset\_minutes

INTEGER

Minutes before or after event

channel

VARCHAR(50)

Email, SMS, Push, In-App, WhatsApp

scheduled\_for

TIMESTAMPTZ

When reminder should run

reminder\_status

VARCHAR(50)

Pending, Sent, Failed, Cancelled

sent\_at

TIMESTAMPTZ

Sent timestamp

failure\_reason

TEXT

Failure details

created\_at

TIMESTAMPTZ

Creation timestamp

**Design Notes**

Reminders should be processed asynchronously and published to the Notification Service. Redis or Kafka delayed processing may be used for short-term reminders.

**14.9 External Calendar Integrations**

**Overview**

Kaziforce may integrate with external calendar providers for synchronization, availability lookup, and event creation.

Supported integrations may include:

-   Google Calendar
-   Microsoft Outlook / Microsoft 365
-   Apple Calendar
-   CalDAV
-   ICS feeds

**Suggested Table: calendar\_integrations**

**Column**

**Data Type**

**Description**

integration\_id

UUID

Primary integration identifier

tenant\_id

UUID

Tenant identifier

user\_id

UUID

Connected user

provider

VARCHAR(80)

Google, Microsoft, Apple, CalDAV

external\_account\_id

VARCHAR(255)

Provider account identifier

access\_token\_encrypted

TEXT

Encrypted access token

refresh\_token\_encrypted

TEXT

Encrypted refresh token

token\_expires\_at

TIMESTAMPTZ

Token expiry

sync\_direction

VARCHAR(50)

Import, Export, Bidirectional

sync\_status

VARCHAR(50)

Active, Failed, Disabled

last\_sync\_at

TIMESTAMPTZ

Last successful sync

failure\_reason

TEXT

Last failure

metadata

JSONB

Provider metadata

created\_at

TIMESTAMPTZ

Creation timestamp

updated\_at

TIMESTAMPTZ

Update timestamp

**Suggested Table: external\_calendar\_event\_links**

**Column**

**Data Type**

**Description**

external\_link\_id

UUID

Primary identifier

tenant\_id

UUID

Tenant identifier

integration\_id

UUID

Integration reference

local\_event\_id

UUID

Kaziforce event

external\_event\_id

VARCHAR(255)

Provider event ID

external\_calendar\_id

VARCHAR(255)

Provider calendar ID

sync\_status

VARCHAR(50)

Synced, Pending, Failed, Conflict

last\_synced\_at

TIMESTAMPTZ

Last sync timestamp

**Design Notes**

External access tokens must be encrypted and rotated where possible. Calendar synchronization must respect user consent and provider-specific rate limits.

**14.10 Conflict Detection**

**Overview**

Conflict detection prevents overlapping bookings, double scheduling, and resource contention.

**Suggested Table: scheduling\_conflicts**

**Column**

**Data Type**

**Description**

conflict\_id

UUID

Primary conflict identifier

tenant\_id

UUID

Tenant identifier

owner\_type

VARCHAR(80)

User, Profile, Team, Resource

owner\_id

UUID

Affected owner

source\_event\_id

UUID

First event

conflicting\_event\_id

UUID

Conflicting event

conflict\_type

VARCHAR(80)

TimeOverlap, ResourceConflict, AvailabilityViolation

severity

VARCHAR(50)

Low, Medium, High

resolution\_status

VARCHAR(50)

Open, Ignored, Resolved

detected\_at

TIMESTAMPTZ

Detection timestamp

resolved\_at

TIMESTAMPTZ

Resolution timestamp

metadata

JSONB

Conflict details

**Design Notes**

Conflict detection should occur during booking creation and event updates. For high-volume scheduling, near-term availability windows can be precomputed and cached.

**14.11 Scheduling Analytics**

**Overview**

Scheduling Analytics measures calendar usage, meeting load, interview efficiency, booking conversion, no-show rates, and resource utilization.

**Suggested Table: scheduling\_events**

**Column**

**Data Type**

**Description**

scheduling\_event\_id

UUID

Primary analytics event

tenant\_id

UUID

Tenant identifier

event\_type

VARCHAR(100)

EventCreated, BookingConfirmed, ReminderSent, NoShow

calendar\_id

UUID

Calendar reference

event\_id

UUID

Calendar event

booking\_id

UUID

Optional booking

actor\_user\_id

UUID

Actor

event\_payload

JSONB

Event data

occurred\_at

TIMESTAMPTZ

Business event timestamp

created\_at

TIMESTAMPTZ

Storage timestamp

**Key Metrics**

-   Meetings scheduled
-   Bookings confirmed
-   Booking conversion rate
-   Interview attendance rate
-   No-show rate
-   Reminder effectiveness
-   Average scheduling lead time
-   Calendar utilization
-   Resource utilization
-   Average meeting duration
-   Cancellation rate
-   Reschedule rate

**Recommended ClickHouse Fact Tables**

-   fact\_calendar\_events
-   fact\_booking\_conversion
-   fact\_meeting\_attendance
-   fact\_no\_show\_rate
-   fact\_resource\_utilization
-   fact\_reminder\_performance

**14.12 ERD**

**Conceptual ERD**

Calendar

├── CalendarEvent

│ ├── CalendarEventParticipant

│ ├── CalendarReminder

│ ├── Booking

│ └── SchedulingConflict

├── BookingSlot

│ └── Booking

└── ExternalCalendarEventLink

AvailabilityRule

└── BookingSlot

CalendarIntegration

└── ExternalCalendarEventLink

User

├── Calendar

├── CalendarEvent

├── Booking

└── CalendarIntegration

**Relationship Summary**

**Parent Entity**

**Child Entity**

**Cardinality**

Calendar

Calendar Events

1:N

Calendar

Booking Slots

1:N

Calendar Event

Participants

1:N

Calendar Event

Reminders

1:N

Calendar Event

Bookings

0:N

Booking Slot

Booking

0:1

Availability Rule

Booking Slots

1:N generated

Calendar Integration

External Event Links

1:N

Calendar Event

Scheduling Conflicts

1:N

User

Calendars

1:N

User

Calendar Events

1:N

User

Bookings

1:N

User

Calendar Integrations

1:N

**ERD Design Notes**

The Calendar & Scheduling Database is designed around calendars, events, availability rules, booking slots, and bookings. It supports both internal scheduling and external calendar synchronization.

The model separates recurring availability rules from concrete booking slots. This allows Kaziforce to support flexible availability, real-time booking, interview scheduling, workforce capacity planning, and AI-assisted scheduling without overloading transactional event records.

Cross-service identifiers such as user\_id, profile\_id, organization\_id, job\_id, application\_id, project\_id, and contract\_id are stored as UUID references. The Calendar Service validates them through APIs or event-synchronized read models rather than direct joins into other service databases.

**15\. Time Tracking Database**

**15.1 Overview**

The Time Tracking Database manages work time, attendance, timesheets, activity logs, approvals, billable hours, productivity evidence, work schedules, overtime, and time-based billing within Kaziforce.

The Time Tracking Service owns this database. It supports professionals, contractors, employees, fractional workers, consultants, gig workers, AI-supervised workers, project teams, and enterprise workforce managers.

The database enables organizations to track actual work performed against contracts, projects, assignments, milestones, shifts, and billing periods. It also provides auditable evidence for payroll, invoicing, escrow release, compliance reporting, productivity analytics, and workforce performance management.

**Primary Responsibilities**

The Time Tracking Database supports:

-   Manual time entry
-   Automatic time tracking
-   Timesheet generation
-   Attendance tracking
-   Work sessions
-   Break tracking
-   Billable and non-billable time
-   Project-based time allocation
-   Contract-based time allocation
-   Shift tracking
-   Overtime tracking
-   Timesheet approval workflows
-   Productivity evidence
-   Screenshots and activity metadata
-   GPS-based check-ins
-   Payroll and billing integration
-   Time analytics

**Primary Data Stores**

**Data Store**

**Purpose**

PostgreSQL

Timesheets, work logs, attendance, approvals, schedules

Redis

Active timers, session locks, real-time work status

Object Storage

Screenshots, evidence files, exported timesheets

ClickHouse

Productivity analytics and time reporting

Kafka

Time tracking events and integration workflows

**15.2 Timesheets**

**Overview**

A timesheet represents a summarized record of work time submitted by a professional or employee for a defined period. It may cover daily, weekly, biweekly, monthly, project-based, contract-based, or milestone-based work.

Timesheets are used for:

-   Billing
-   Payroll
-   Contract validation
-   Client approval
-   Workforce reporting
-   Productivity analysis
-   Compliance evidence

**Suggested Table: timesheets**

**Column**

**Data Type**

**Description**

timesheet\_id

UUID

Primary timesheet identifier

tenant\_id

UUID

Tenant identifier

organization\_id

UUID

Organization receiving the work

professional\_profile\_id

UUID

Professional profile reference

user\_id

UUID

Worker user reference

contract\_id

UUID

Related contract

project\_id

UUID

Related project

assignment\_id

UUID

Related workforce assignment

period\_start

DATE

Timesheet period start

period\_end

DATE

Timesheet period end

total\_hours

NUMERIC(10,2)

Total hours recorded

billable\_hours

NUMERIC(10,2)

Billable hours

non\_billable\_hours

NUMERIC(10,2)

Non-billable hours

overtime\_hours

NUMERIC(10,2)

Overtime hours

currency\_code

CHAR(3)

Billing currency

hourly\_rate

NUMERIC(14,2)

Hourly rate used for billing

calculated\_amount

NUMERIC(14,2)

Calculated billing amount

timesheet\_status

VARCHAR(50)

Draft, Submitted, Approved, Rejected, Locked, Paid

submitted\_at

TIMESTAMPTZ

Submission timestamp

approved\_at

TIMESTAMPTZ

Approval timestamp

rejected\_at

TIMESTAMPTZ

Rejection timestamp

approved\_by\_user\_id

UUID

Approver user

rejection\_reason

TEXT

Reason for rejection

metadata

JSONB

Flexible metadata

created\_at

TIMESTAMPTZ

Creation timestamp

updated\_at

TIMESTAMPTZ

Update timestamp

deleted\_at

TIMESTAMPTZ

Soft delete timestamp

version

INTEGER

Optimistic locking version

**Design Notes**

Timesheets should be treated as financial-supporting records. Once approved, they should be locked from ordinary edits. Corrections should be handled using adjustment records or versioned amendments.

**15.3 Work Logs**

**Overview**

Work logs represent detailed time entries within a timesheet. They capture when work was performed, what was done, whether the work was billable, and which project, task, milestone, or contract it belongs to.

**Suggested Table: work\_logs**

**Column**

**Data Type**

**Description**

work\_log\_id

UUID

Primary work log identifier

tenant\_id

UUID

Tenant identifier

timesheet\_id

UUID

Timesheet reference

organization\_id

UUID

Organization reference

professional\_profile\_id

UUID

Professional profile

user\_id

UUID

Worker user

contract\_id

UUID

Contract reference

project\_id

UUID

Project reference

task\_id

UUID

Optional task reference

milestone\_id

UUID

Optional milestone reference

work\_date

DATE

Work date

start\_time

TIMESTAMPTZ

Work start

end\_time

TIMESTAMPTZ

Work end

duration\_minutes

INTEGER

Duration in minutes

work\_description

TEXT

Work performed

work\_category

VARCHAR(100)

Development, Support, Admin, Meeting, Research

is\_billable

BOOLEAN

Billable flag

approval\_status

VARCHAR(50)

Draft, Submitted, Approved, Rejected

source

VARCHAR(80)

Manual, Timer, Import, System

metadata

JSONB

Extra metadata

created\_at

TIMESTAMPTZ

Creation timestamp

updated\_at

TIMESTAMPTZ

Update timestamp

deleted\_at

TIMESTAMPTZ

Soft delete timestamp

**Design Notes**

The duration\_minutes value should be generated or validated from start\_time and end\_time to prevent inconsistent entries. Manual overrides should be audited.

**15.4 Active Timers**

**Overview**

Active timers represent ongoing work sessions. They are high-frequency and short-lived, so Redis is the preferred storage layer. PostgreSQL should only store finalized work logs after a timer stops.

**Redis Key Pattern**

timer:active:{tenant\_id}:{user\_id}:{project\_id}

**Suggested Redis Value**

{

"tenant\_id": "uuid",

"user\_id": "uuid",

"professional\_profile\_id": "uuid",

"organization\_id": "uuid",

"project\_id": "uuid",

"contract\_id": "uuid",

"task\_id": "uuid",

"started\_at": "timestamp",

"last\_heartbeat\_at": "timestamp",

"description": "Working on API integration",

"is\_billable": true

}

**Suggested Table: timer\_sessions**

**Column**

**Data Type**

**Description**

timer\_session\_id

UUID

Primary timer session identifier

tenant\_id

UUID

Tenant identifier

user\_id

UUID

Worker user

professional\_profile\_id

UUID

Profile reference

organization\_id

UUID

Organization

contract\_id

UUID

Contract

project\_id

UUID

Project

task\_id

UUID

Task

started\_at

TIMESTAMPTZ

Timer start

stopped\_at

TIMESTAMPTZ

Timer stop

duration\_minutes

INTEGER

Total duration

timer\_status

VARCHAR(50)

Active, Paused, Stopped, Abandoned

converted\_work\_log\_id

UUID

Work log created from timer

metadata

JSONB

Flexible metadata

created\_at

TIMESTAMPTZ

Creation timestamp

updated\_at

TIMESTAMPTZ

Update timestamp

**Design Notes**

Timer recovery logic should handle browser crashes, mobile app shutdowns, and lost connectivity. Abandoned timers should be flagged for user review before conversion into billable work logs.

**15.5 Attendance**

**Overview**

Attendance records track presence for employees, contractors, shift workers, field workers, and managed workforce teams. Attendance may be captured using check-in/check-out, GPS verification, QR codes, biometric integrations, or manual supervisor entry.

**Suggested Table: attendance\_records**

**Column**

**Data Type**

**Description**

attendance\_id

UUID

Primary attendance identifier

tenant\_id

UUID

Tenant identifier

organization\_id

UUID

Organization

user\_id

UUID

Worker user

professional\_profile\_id

UUID

Profile reference

assignment\_id

UUID

Assignment reference

shift\_id

UUID

Shift reference

attendance\_date

DATE

Attendance date

check\_in\_time

TIMESTAMPTZ

Check-in timestamp

check\_out\_time

TIMESTAMPTZ

Check-out timestamp

total\_minutes

INTEGER

Total attendance duration

attendance\_status

VARCHAR(50)

Present, Absent, Late, Half Day, Leave, Remote

check\_in\_source

VARCHAR(80)

Mobile, Web, QR, GPS, Biometric, Manual

check\_out\_source

VARCHAR(80)

Mobile, Web, QR, GPS, Biometric, Manual

check\_in\_location

JSONB

GPS or location metadata

check\_out\_location

JSONB

GPS or location metadata

verified\_by\_user\_id

UUID

Supervisor verifier

verification\_status

VARCHAR(50)

Pending, Verified, Rejected

metadata

JSONB

Extra metadata

created\_at

TIMESTAMPTZ

Creation timestamp

updated\_at

TIMESTAMPTZ

Update timestamp

**Design Notes**

Attendance data may be sensitive because it can include location metadata. Access should be restricted, audited, and governed by tenant policy.

**15.6 Shifts and Work Schedules**

**Overview**

Shifts define planned work periods for employees, contractors, teams, field workers, and customer support agents. They support attendance tracking, workforce planning, payroll, overtime, and schedule compliance.

**Suggested Table: work\_shifts**

**Column**

**Data Type**

**Description**

shift\_id

UUID

Primary shift identifier

tenant\_id

UUID

Tenant identifier

organization\_id

UUID

Organization

team\_id

UUID

Optional team

shift\_name

VARCHAR(180)

Shift name

shift\_type

VARCHAR(80)

Day, Night, Weekend, Flexible, Remote

start\_time

TIME

Planned start time

end\_time

TIME

Planned end time

timezone

VARCHAR(80)

Shift timezone

break\_minutes

INTEGER

Planned break duration

recurrence\_rule

TEXT

Recurrence rule

lifecycle\_status

VARCHAR(50)

Active, Inactive, Archived

metadata

JSONB

Flexible metadata

created\_at

TIMESTAMPTZ

Creation timestamp

updated\_at

TIMESTAMPTZ

Update timestamp

**Suggested Table: worker\_shift\_assignments**

**Column**

**Data Type**

**Description**

worker\_shift\_assignment\_id

UUID

Primary identifier

tenant\_id

UUID

Tenant identifier

shift\_id

UUID

Shift reference

user\_id

UUID

Worker user

professional\_profile\_id

UUID

Profile reference

assignment\_id

UUID

Workforce assignment

effective\_from

DATE

Assignment start

effective\_to

DATE

Assignment end

assignment\_status

VARCHAR(50)

Active, Paused, Ended

created\_at

TIMESTAMPTZ

Creation timestamp

**Design Notes**

Shift definitions should remain separate from actual attendance records. Planned schedule and actual attendance must be compared during payroll and performance analysis.

**15.7 Breaks**

**Overview**

Break records capture pauses during work sessions or shifts. They are used to calculate payable time, rest compliance, overtime, productivity, and attendance accuracy.

**Suggested Table: work\_breaks**

**Column**

**Data Type**

**Description**

break\_id

UUID

Primary break identifier

tenant\_id

UUID

Tenant identifier

work\_log\_id

UUID

Optional work log reference

attendance\_id

UUID

Optional attendance reference

user\_id

UUID

Worker user

break\_type

VARCHAR(80)

Meal, Rest, Personal, System

break\_start

TIMESTAMPTZ

Break start

break\_end

TIMESTAMPTZ

Break end

duration\_minutes

INTEGER

Break duration

is\_paid

BOOLEAN

Paid break flag

source

VARCHAR(80)

Manual, Timer, System

created\_at

TIMESTAMPTZ

Creation timestamp

**Design Notes**

Break time should be excluded from billable work unless tenant policy allows paid breaks.

**15.8 Screenshots and Activity Evidence**

**Overview**

For selected contracts or managed work arrangements, Kaziforce may capture productivity evidence such as screenshots, activity levels, application usage, keyboard/mouse activity summaries, and work proofs.

Actual screenshots are stored in Object Storage. The database stores metadata only.

**Suggested Table: work\_evidence**

**Column**

**Data Type**

**Description**

evidence\_id

UUID

Primary evidence identifier

tenant\_id

UUID

Tenant identifier

work\_log\_id

UUID

Work log reference

timer\_session\_id

UUID

Timer session reference

user\_id

UUID

Worker user

evidence\_type

VARCHAR(80)

Screenshot, Activity, GPS, File, Note

object\_key

TEXT

Object storage reference

captured\_at

TIMESTAMPTZ

Capture timestamp

activity\_level

NUMERIC(5,2)

Activity percentage

app\_usage\_summary

JSONB

Application usage metadata

url\_usage\_summary

JSONB

Optional URL usage metadata

gps\_location

JSONB

Optional location metadata

privacy\_mask\_applied

BOOLEAN

Whether masking was applied

review\_status

VARCHAR(50)

Pending, Approved, Rejected, Flagged

metadata

JSONB

Flexible metadata

created\_at

TIMESTAMPTZ

Creation timestamp

**Design Notes**

Screenshot and activity monitoring must be policy-controlled, consent-based, and transparent to workers. Sensitive personal content should be masked where possible.

**15.9 Timesheet Approvals**

**Overview**

Timesheet approval workflows ensure that submitted time records are reviewed before billing, payroll, or escrow release.

Approvals may be performed by:

-   Project manager
-   Hiring manager
-   Organization administrator
-   Team lead
-   Client representative
-   Finance approver
-   Automated policy engine

**Suggested Table: timesheet\_approvals**

**Column**

**Data Type**

**Description**

approval\_id

UUID

Primary approval identifier

tenant\_id

UUID

Tenant identifier

timesheet\_id

UUID

Timesheet reference

approval\_level

INTEGER

Approval stage

approver\_user\_id

UUID

Approver

approver\_role

VARCHAR(100)

Manager, Client, Finance, Admin

approval\_status

VARCHAR(50)

Pending, Approved, Rejected, Escalated

approval\_note

TEXT

Comment or reason

decision\_at

TIMESTAMPTZ

Decision timestamp

created\_at

TIMESTAMPTZ

Creation timestamp

**Design Notes**

Approvals should be append-only. If a decision is reversed, a new approval event should be created instead of overwriting the original decision.

**15.10 Billing and Payroll Integration**

**Overview**

Approved timesheets create downstream financial events for invoicing, payroll, wallet settlement, escrow release, and analytics.

The Time Tracking Service does not own financial transactions. It publishes approved time events to Finance, Wallet, Payroll, and Billing services.

**Suggested Table: time\_billing\_links**

**Column**

**Data Type**

**Description**

billing\_link\_id

UUID

Primary identifier

tenant\_id

UUID

Tenant identifier

timesheet\_id

UUID

Timesheet reference

contract\_id

UUID

Contract reference

invoice\_id

UUID

Downstream invoice reference

payroll\_run\_id

UUID

Downstream payroll run reference

wallet\_transaction\_id

UUID

Downstream wallet transaction reference

billable\_hours

NUMERIC(10,2)

Approved billable hours

billing\_amount

NUMERIC(14,2)

Billing amount

currency\_code

CHAR(3)

Currency

integration\_status

VARCHAR(50)

Pending, Sent, Processed, Failed

sent\_at

TIMESTAMPTZ

Sent to downstream service

processed\_at

TIMESTAMPTZ

Downstream processed timestamp

failure\_reason

TEXT

Failure detail

created\_at

TIMESTAMPTZ

Creation timestamp

**Published Events**

-   TimesheetSubmitted
-   TimesheetApproved
-   TimesheetRejected
-   WorkLogCreated
-   AttendanceCheckedIn
-   AttendanceCheckedOut
-   BillableHoursApproved
-   OvertimeDetected
-   TimesheetLocked

**15.11 Time Tracking Analytics**

**Overview**

Time Tracking Analytics provides insight into workforce utilization, productivity, attendance, billable work, overtime, project effort, and organizational capacity.

**Suggested Table: time\_tracking\_events**

**Column**

**Data Type**

**Description**

time\_event\_id

UUID

Primary analytics event

tenant\_id

UUID

Tenant identifier

event\_type

VARCHAR(100)

TimerStarted, WorkLogCreated, TimesheetApproved

organization\_id

UUID

Organization

user\_id

UUID

Worker

professional\_profile\_id

UUID

Profile

project\_id

UUID

Project

contract\_id

UUID

Contract

timesheet\_id

UUID

Timesheet

event\_payload

JSONB

Event details

occurred\_at

TIMESTAMPTZ

Business event time

created\_at

TIMESTAMPTZ

Storage timestamp

**Key Metrics**

-   Total hours worked
-   Billable hours
-   Non-billable hours
-   Overtime hours
-   Utilization rate
-   Timesheet approval time
-   Timesheet rejection rate
-   Attendance rate
-   Late check-ins
-   No-shows
-   Project effort variance
-   Contract hours consumed
-   Worker productivity score
-   Average work session length
-   Manual versus timer-based entries

**Recommended ClickHouse Fact Tables**

-   fact\_work\_hours
-   fact\_billable\_hours
-   fact\_attendance
-   fact\_timesheet\_approvals
-   fact\_overtime
-   fact\_project\_effort
-   fact\_worker\_utilization
-   fact\_productivity\_evidence

**15.12 Constraints**

**Primary Key Constraints**

Each major table uses UUID primary keys:

-   timesheet\_id
-   work\_log\_id
-   timer\_session\_id
-   attendance\_id
-   shift\_id
-   break\_id
-   evidence\_id
-   approval\_id

**Foreign Key Constraints**

Recommended internal foreign keys:

-   work\_logs.timesheet\_id → timesheets.timesheet\_id
-   timesheet\_approvals.timesheet\_id → timesheets.timesheet\_id
-   work\_breaks.work\_log\_id → work\_logs.work\_log\_id
-   work\_evidence.work\_log\_id → work\_logs.work\_log\_id
-   timer\_sessions.converted\_work\_log\_id → work\_logs.work\_log\_id
-   worker\_shift\_assignments.shift\_id → work\_shifts.shift\_id

Cross-service identifiers such as user\_id, profile\_id, organization\_id, project\_id, contract\_id, and invoice\_id should be validated through APIs or event-synchronized read models.

**Check Constraints**

Recommended checks:

-   period\_end >= period\_start
-   end\_time > start\_time
-   duration\_minutes >= 0
-   total\_hours >= 0
-   billable\_hours >= 0
-   non\_billable\_hours >= 0
-   overtime\_hours >= 0
-   approval\_level >= 1
-   activity\_level BETWEEN 0 AND 100

**Unique Constraints**

Recommended unique constraints:

-   One timesheet per worker, contract, and period.
-   One active timer per worker, project, and contract.
-   One active shift assignment per worker and shift period.
-   One approval decision per approver and approval level.

**15.13 Indexing Strategy**

**Timesheet Indexes**

Recommended indexes:

-   idx\_timesheets\_tenant\_worker\_period
-   idx\_timesheets\_organization\_status
-   idx\_timesheets\_contract\_period
-   idx\_timesheets\_project\_period
-   idx\_timesheets\_status\_submitted\_at

**Work Log Indexes**

Recommended indexes:

-   idx\_work\_logs\_timesheet\_id
-   idx\_work\_logs\_worker\_date
-   idx\_work\_logs\_project\_date
-   idx\_work\_logs\_contract\_date
-   idx\_work\_logs\_billable

**Attendance Indexes**

Recommended indexes:

-   idx\_attendance\_worker\_date
-   idx\_attendance\_organization\_date
-   idx\_attendance\_shift\_id
-   idx\_attendance\_status

**Timer Indexes**

Recommended indexes:

-   idx\_timer\_sessions\_user\_status
-   idx\_timer\_sessions\_project\_status
-   idx\_timer\_sessions\_started\_at

**Evidence Indexes**

Recommended indexes:

-   idx\_work\_evidence\_work\_log\_id
-   idx\_work\_evidence\_timer\_session\_id
-   idx\_work\_evidence\_captured\_at
-   idx\_work\_evidence\_review\_status

**Approval Indexes**

Recommended indexes:

-   idx\_timesheet\_approvals\_timesheet
-   idx\_timesheet\_approvals\_approver
-   idx\_timesheet\_approvals\_status

**15.14 Partitioning Strategy**

**Time-Based Partitioning**

High-volume tables should be partitioned by month or quarter:

-   work\_logs
-   attendance\_records
-   timer\_sessions
-   work\_evidence
-   time\_tracking\_events

**Tenant-Aware Partitioning**

Large enterprise tenants may require tenant-based partitioning or tenant-isolated database deployment where data volume, compliance, or performance needs justify it.

**Archival Strategy**

Older time tracking records should be moved to cold storage or analytics storage after the operational retention period. Financially linked records must be retained according to legal, tax, contract, and audit requirements.

**15.15 ERD**

**Conceptual ERD**

Timesheet

├── WorkLog

│ ├── WorkBreak

│ └── WorkEvidence

├── TimesheetApproval

└── TimeBillingLink

TimerSession

└── WorkLog

WorkShift

└── WorkerShiftAssignment

└── AttendanceRecord

AttendanceRecord

└── WorkBreak

TimeTrackingEvent

**Relationship Summary**

**Parent Entity**

**Child Entity**

**Cardinality**

Timesheet

Work Logs

1:N

Timesheet

Timesheet Approvals

1:N

Timesheet

Time Billing Links

1:N

Work Log

Work Breaks

1:N

Work Log

Work Evidence

1:N

Timer Session

Work Log

0:1

Work Shift

Worker Shift Assignments

1:N

Worker Shift Assignment

Attendance Records

1:N

Attendance Record

Work Breaks

1:N

**ERD Design Notes**

The Time Tracking Database is designed around the timesheet lifecycle. Work logs capture detailed activity, timesheets aggregate work for approval, approvals validate submitted time, and billing links connect approved time to downstream finance and payroll services.

The design separates operational time capture from financial processing. This ensures the Time Tracking Service remains responsible for work evidence and time validation, while Finance, Wallet, Billing, and Payroll services remain responsible for monetary transactions.

High-volume records such as work logs, attendance records, timer sessions, and productivity evidence should be partitioned by time and replicated to ClickHouse for long-term analytics.

**16\. Workforce Management Database**

**16.1 Overview**

The Workforce Management Database manages how organizations plan, assign, structure, monitor, evaluate, and optimize their workforce within Kaziforce. It covers employees, freelancers, contractors, consultants, fractional workers, project teams, field teams, support teams, and AI-assisted workforce units.

The Workforce Management Service owns this database. It consumes identity, organization, profile, marketplace, contract, time tracking, finance, calendar, and AI data through APIs and domain events, but it does not directly modify records owned by those services.

**Primary Responsibilities**

The database supports:

-   Workforce assignments
-   Resource allocation
-   Workforce planning
-   Team deployment
-   Role assignment
-   Capacity tracking
-   Performance tracking
-   Workforce availability
-   Workload balancing
-   Assignment lifecycle management
-   Manager-worker reporting relationships
-   AI-assisted workforce optimization
-   Enterprise workforce visibility

**Primary Data Stores**

**Data Store**

**Purpose**

PostgreSQL

Assignments, resources, capacity plans, workload records

Redis

Real-time availability and workload cache

Neo4j

Workforce relationship graph and team dependency analysis

ClickHouse

Workforce analytics and productivity reporting

Kafka

Workforce events and downstream synchronization

**16.2 Workforce Assignments**

**Overview**

A Workforce Assignment represents the formal allocation of a professional, employee, contractor, consultant, freelancer, or AI agent to an organization, project, contract, team, department, job, or workstream.

Assignments connect workforce supply to business demand.

**Suggested Table: workforce\_assignments**

**Column**

**Data Type**

**Description**

assignment\_id

UUID

Primary assignment identifier

tenant\_id

UUID

Tenant identifier

organization\_id

UUID

Organization receiving the work

business\_unit\_id

UUID

Optional business unit

department\_id

UUID

Optional department

team\_id

UUID

Optional team

project\_id

UUID

Optional project

contract\_id

UUID

Optional contract

job\_id

UUID

Optional job

user\_id

UUID

Assigned user

professional\_profile\_id

UUID

Professional profile

assignment\_type

VARCHAR(80)

Employee, Contractor, Freelancer, Consultant, AI Agent

role\_title

VARCHAR(180)

Assigned role

role\_level

VARCHAR(80)

Junior, Mid-Level, Senior, Lead, Expert

allocation\_percentage

NUMERIC(5,2)

Allocation percentage

start\_date

DATE

Assignment start

end\_date

DATE

Assignment end

assignment\_status

VARCHAR(50)

Planned, Active, Paused, Completed, Terminated

reporting\_manager\_user\_id

UUID

Reporting manager

work\_mode

VARCHAR(50)

Remote, Hybrid, Onsite

location\_id

UUID

Optional branch or location

billing\_model

VARCHAR(80)

Hourly, Monthly, Fixed, Salary, Non-Billable

metadata

JSONB

Flexible assignment metadata

created\_at

TIMESTAMPTZ

Creation timestamp

updated\_at

TIMESTAMPTZ

Update timestamp

deleted\_at

TIMESTAMPTZ

Soft delete timestamp

version

INTEGER

Optimistic locking version

**Design Notes**

Assignments should preserve historical context. If a professional changes role, team, rate, or allocation, the existing assignment should be closed or versioned rather than overwritten.

**16.3 Resource Allocation**

**Overview**

Resource Allocation tracks how workforce capacity is distributed across projects, teams, contracts, departments, and business units.

It helps organizations prevent over-allocation, underutilization, and conflicting work commitments.

**Suggested Table: resource\_allocations**

**Column**

**Data Type**

**Description**

allocation\_id

UUID

Primary allocation identifier

tenant\_id

UUID

Tenant identifier

assignment\_id

UUID

Assignment reference

user\_id

UUID

Worker user

professional\_profile\_id

UUID

Profile reference

organization\_id

UUID

Organization

project\_id

UUID

Project

contract\_id

UUID

Contract

allocation\_start

DATE

Allocation start

allocation\_end

DATE

Allocation end

planned\_hours\_per\_week

NUMERIC(6,2)

Planned weekly hours

allocated\_percentage

NUMERIC(5,2)

Percentage of capacity

billable\_percentage

NUMERIC(5,2)

Billable allocation

allocation\_status

VARCHAR(50)

Planned, Active, Completed, Cancelled

created\_at

TIMESTAMPTZ

Creation timestamp

updated\_at

TIMESTAMPTZ

Update timestamp

**Design Notes**

Resource allocation should be compared against availability, active assignments, timesheets, and calendar events to detect workload conflicts.

**16.4 Workforce Capacity**

**Overview**

Workforce Capacity records available and allocated capacity at user, team, department, organization, and project levels.

It enables workforce planning, utilization reporting, hiring forecasts, and AI-driven staffing recommendations.

**Suggested Table: workforce\_capacity**

**Column**

**Data Type**

**Description**

capacity\_id

UUID

Primary capacity identifier

tenant\_id

UUID

Tenant identifier

capacity\_owner\_type

VARCHAR(80)

User, Team, Department, BusinessUnit, Organization

capacity\_owner\_id

UUID

Owner reference

period\_start

DATE

Capacity period start

period\_end

DATE

Capacity period end

total\_available\_hours

NUMERIC(10,2)

Available hours

allocated\_hours

NUMERIC(10,2)

Allocated hours

billable\_hours

NUMERIC(10,2)

Billable hours

non\_billable\_hours

NUMERIC(10,2)

Non-billable hours

utilization\_rate

NUMERIC(6,2)

Utilization percentage

capacity\_status

VARCHAR(50)

Available, FullyAllocated, OverAllocated

calculated\_at

TIMESTAMPTZ

Calculation timestamp

metadata

JSONB

Extra metadata

**Design Notes**

Capacity records may be generated periodically from assignments, calendar schedules, time tracking data, leave data, and availability records.

**16.5 Roles and Responsibilities**

**Overview**

Workforce roles define responsibilities within projects, teams, departments, and organizations. Roles may differ from Identity roles because they describe operational responsibilities rather than system permissions.

**Suggested Table: workforce\_roles**

**Column**

**Data Type**

**Description**

workforce\_role\_id

UUID

Primary role identifier

tenant\_id

UUID

Tenant identifier

organization\_id

UUID

Organization

role\_code

VARCHAR(100)

Internal role code

role\_name

VARCHAR(180)

Role name

role\_category

VARCHAR(100)

Technical, Business, Support, Management, AI

description

TEXT

Role description

default\_responsibilities

JSONB

Responsibility list

required\_skills

JSONB

Required skills

seniority\_level

VARCHAR(80)

Junior, Mid, Senior, Lead, Executive

lifecycle\_status

VARCHAR(50)

Active, Inactive, Archived

created\_at

TIMESTAMPTZ

Creation timestamp

updated\_at

TIMESTAMPTZ

Update timestamp

**Suggested Table: assignment\_responsibilities**

**Column**

**Data Type**

**Description**

responsibility\_id

UUID

Primary responsibility identifier

tenant\_id

UUID

Tenant identifier

assignment\_id

UUID

Assignment reference

workforce\_role\_id

UUID

Workforce role

responsibility\_text

TEXT

Specific responsibility

priority

INTEGER

Responsibility priority

status

VARCHAR(50)

Active, Completed, Removed

created\_at

TIMESTAMPTZ

Creation timestamp

**16.6 Workforce Plans**

**Overview**

Workforce Plans represent future staffing needs, capacity forecasts, hiring demand, project staffing scenarios, and budgeted workforce structures.

They help organizations plan required people, skills, roles, hours, costs, and AI-agent capacity.

**Suggested Table: workforce\_plans**

**Column**

**Data Type**

**Description**

workforce\_plan\_id

UUID

Primary plan identifier

tenant\_id

UUID

Tenant identifier

organization\_id

UUID

Organization

business\_unit\_id

UUID

Optional business unit

department\_id

UUID

Optional department

project\_id

UUID

Optional project

plan\_name

VARCHAR(255)

Plan name

plan\_type

VARCHAR(80)

Annual, Project, Department, Scenario

planning\_period\_start

DATE

Period start

planning\_period\_end

DATE

Period end

plan\_status

VARCHAR(50)

Draft, Approved, Active, Superseded, Archived

approved\_by\_user\_id

UUID

Approver

approved\_at

TIMESTAMPTZ

Approval timestamp

metadata

JSONB

Flexible metadata

created\_at

TIMESTAMPTZ

Creation timestamp

updated\_at

TIMESTAMPTZ

Update timestamp

**Suggested Table: workforce\_plan\_requirements**

**Column**

**Data Type**

**Description**

requirement\_id

UUID

Primary requirement identifier

tenant\_id

UUID

Tenant identifier

workforce\_plan\_id

UUID

Workforce plan

role\_title

VARCHAR(180)

Required role

skill\_requirements

JSONB

Required skills

required\_headcount

INTEGER

Required number of workers

required\_hours

NUMERIC(10,2)

Required hours

required\_start\_date

DATE

Start date

required\_end\_date

DATE

End date

estimated\_cost

NUMERIC(14,2)

Estimated cost

currency\_code

CHAR(3)

Currency

fulfillment\_status

VARCHAR(50)

Open, PartiallyFulfilled, Fulfilled, Cancelled

created\_at

TIMESTAMPTZ

Creation timestamp

**16.7 Performance Tracking**

**Overview**

Performance Tracking captures structured observations about workforce delivery, output quality, timeliness, collaboration, reliability, client satisfaction, and productivity.

It supports managerial review, professional growth, AI recommendations, workforce planning, and trust scoring.

**Suggested Table: workforce\_performance\_reviews**

**Column**

**Data Type**

**Description**

performance\_review\_id

UUID

Primary review identifier

tenant\_id

UUID

Tenant identifier

assignment\_id

UUID

Assignment

organization\_id

UUID

Organization

user\_id

UUID

Worker

professional\_profile\_id

UUID

Profile

reviewer\_user\_id

UUID

Reviewer

review\_period\_start

DATE

Review start

review\_period\_end

DATE

Review end

quality\_score

NUMERIC(5,2)

Work quality score

timeliness\_score

NUMERIC(5,2)

Timeliness score

collaboration\_score

NUMERIC(5,2)

Collaboration score

reliability\_score

NUMERIC(5,2)

Reliability score

productivity\_score

NUMERIC(5,2)

Productivity score

overall\_score

NUMERIC(5,2)

Overall score

strengths

TEXT

Strengths

improvement\_areas

TEXT

Improvement areas

review\_status

VARCHAR(50)

Draft, Submitted, Acknowledged, Final

created\_at

TIMESTAMPTZ

Creation timestamp

updated\_at

TIMESTAMPTZ

Update timestamp

**Design Notes**

Performance scores should be access-controlled because they may affect hiring, pay, contract renewal, and reputation.

**16.8 Goals and OKRs**

**Overview**

Goals and OKRs align workforce assignments with organizational outcomes.

They support:

-   Individual goals
-   Team goals
-   Department goals
-   Project goals
-   Business unit OKRs
-   AI-assisted performance tracking

**Suggested Table: workforce\_goals**

**Column**

**Data Type**

**Description**

goal\_id

UUID

Primary goal identifier

tenant\_id

UUID

Tenant identifier

owner\_type

VARCHAR(80)

User, Team, Department, Organization, Project

owner\_id

UUID

Owner reference

assignment\_id

UUID

Optional assignment

goal\_title

VARCHAR(255)

Goal title

goal\_description

TEXT

Goal description

goal\_type

VARCHAR(80)

KPI, OKR, Milestone, PersonalDevelopment

start\_date

DATE

Goal start

due\_date

DATE

Goal due date

progress\_percentage

NUMERIC(5,2)

Progress

goal\_status

VARCHAR(50)

Draft, Active, Completed, Cancelled

created\_by\_user\_id

UUID

Creator

created\_at

TIMESTAMPTZ

Creation timestamp

updated\_at

TIMESTAMPTZ

Update timestamp

**Suggested Table: goal\_key\_results**

**Column**

**Data Type**

**Description**

key\_result\_id

UUID

Primary key result identifier

tenant\_id

UUID

Tenant identifier

goal\_id

UUID

Goal reference

key\_result\_title

VARCHAR(255)

Key result

target\_value

NUMERIC(14,4)

Target value

current\_value

NUMERIC(14,4)

Current value

unit\_of\_measure

VARCHAR(80)

Percentage, Count, Amount, Hours

progress\_percentage

NUMERIC(5,2)

Progress

status

VARCHAR(50)

Active, Completed, AtRisk, Cancelled

updated\_at

TIMESTAMPTZ

Update timestamp

**16.9 Workforce Availability and Status**

**Overview**

Workforce availability and status records provide operational visibility into whether a worker is available, assigned, overloaded, on leave, idle, inactive, or ready for new work.

**Suggested Table: workforce\_status**

**Column**

**Data Type**

**Description**

workforce\_status\_id

UUID

Primary status identifier

tenant\_id

UUID

Tenant identifier

user\_id

UUID

Worker user

professional\_profile\_id

UUID

Profile

organization\_id

UUID

Optional organization

status\_type

VARCHAR(80)

Available, Assigned, Busy, OnLeave, Idle, OverAllocated

status\_reason

TEXT

Reason

effective\_from

TIMESTAMPTZ

Start timestamp

effective\_to

TIMESTAMPTZ

End timestamp

source

VARCHAR(80)

Manual, Calendar, TimeTracking, Contract, AI

created\_at

TIMESTAMPTZ

Creation timestamp

**Redis Cache**

Recommended key:

workforce:status:{tenant\_id}:{user\_id}

Recommended TTL:

-   5 to 30 minutes depending on source.

**16.10 AI Workforce Optimization**

**Overview**

AI Workforce Optimization uses workforce data to recommend better staffing, identify over-allocation, predict delivery risks, suggest suitable professionals, recommend skills development, and optimize workload distribution.

**Suggested Table: workforce\_ai\_recommendations**

**Column**

**Data Type**

**Description**

recommendation\_id

UUID

Primary recommendation identifier

tenant\_id

UUID

Tenant identifier

organization\_id

UUID

Organization

recommendation\_type

VARCHAR(100)

Staffing, Reallocation, Risk, Upskilling, Replacement

target\_entity\_type

VARCHAR(80)

Project, Team, Assignment, User, Role

target\_entity\_id

UUID

Target entity

recommended\_action

TEXT

Recommended action

confidence\_score

NUMERIC(8,4)

Confidence

impact\_estimate

JSONB

Estimated impact

model\_id

UUID

AI model reference

recommendation\_status

VARCHAR(50)

Generated, Viewed, Accepted, Rejected, Expired

generated\_at

TIMESTAMPTZ

Generation timestamp

expires\_at

TIMESTAMPTZ

Expiry timestamp

feedback

JSONB

Human feedback

**16.11 Workforce Analytics**

**Overview**

Workforce Analytics measures utilization, assignment performance, capacity, availability, productivity, staffing gaps, and organizational workforce efficiency.

**Suggested Table: workforce\_events**

**Column**

**Data Type**

**Description**

workforce\_event\_id

UUID

Primary analytics event

tenant\_id

UUID

Tenant identifier

event\_type

VARCHAR(120)

AssignmentCreated, CapacityUpdated, ReviewSubmitted

organization\_id

UUID

Organization

assignment\_id

UUID

Optional assignment

user\_id

UUID

Optional worker

professional\_profile\_id

UUID

Optional profile

project\_id

UUID

Optional project

event\_payload

JSONB

Event details

occurred\_at

TIMESTAMPTZ

Business event time

created\_at

TIMESTAMPTZ

Storage timestamp

**Key Metrics**

-   Active workforce count
-   Assignment utilization
-   Bench strength
-   Over-allocation rate
-   Underutilization rate
-   Average allocation percentage
-   Project staffing coverage
-   Role fulfillment rate
-   Capacity gap
-   Workforce cost by project
-   Performance score trends
-   Contract renewal likelihood
-   Workforce churn risk
-   AI recommendation acceptance rate

**Recommended ClickHouse Fact Tables**

-   fact\_workforce\_assignments
-   fact\_resource\_allocation
-   fact\_capacity\_utilization
-   fact\_workforce\_performance
-   fact\_staffing\_gap
-   fact\_workforce\_cost
-   fact\_ai\_workforce\_recommendations

**16.12 Constraints**

**Primary Key Constraints**

Core tables use UUID primary keys:

-   assignment\_id
-   allocation\_id
-   capacity\_id
-   workforce\_role\_id
-   workforce\_plan\_id
-   performance\_review\_id
-   goal\_id
-   key\_result\_id
-   recommendation\_id

**Foreign Key Constraints**

Recommended internal foreign keys:

-   resource\_allocations.assignment\_id → workforce\_assignments.assignment\_id
-   assignment\_responsibilities.assignment\_id → workforce\_assignments.assignment\_id
-   assignment\_responsibilities.workforce\_role\_id → workforce\_roles.workforce\_role\_id
-   workforce\_plan\_requirements.workforce\_plan\_id → workforce\_plans.workforce\_plan\_id
-   workforce\_performance\_reviews.assignment\_id → workforce\_assignments.assignment\_id
-   goal\_key\_results.goal\_id → workforce\_goals.goal\_id

Cross-service references such as user\_id, professional\_profile\_id, organization\_id, project\_id, contract\_id, team\_id, and department\_id should be validated through APIs or read models.

**Check Constraints**

Recommended checks:

-   allocation\_percentage BETWEEN 0 AND 100
-   allocated\_percentage BETWEEN 0 AND 100
-   billable\_percentage BETWEEN 0 AND 100
-   end\_date IS NULL OR end\_date >= start\_date
-   allocation\_end >= allocation\_start
-   period\_end >= period\_start
-   utilization\_rate BETWEEN 0 AND 200
-   performance scores between 0 and 100
-   goal progress between 0 and 100

**Unique Constraints**

Recommended unique constraints:

-   One active assignment per worker, contract, project, and role where applicable.
-   One active workforce status per worker and organization.
-   One capacity snapshot per owner and period.
-   One active workforce role code per organization.
-   One active plan requirement per role and period within a plan.

**16.13 Indexing Strategy**

**Assignment Indexes**

Recommended indexes:

-   idx\_assignments\_tenant\_org\_status
-   idx\_assignments\_user\_status
-   idx\_assignments\_profile\_status
-   idx\_assignments\_project\_status
-   idx\_assignments\_contract\_status
-   idx\_assignments\_date\_range

**Resource Allocation Indexes**

Recommended indexes:

-   idx\_resource\_allocations\_assignment
-   idx\_resource\_allocations\_worker\_period
-   idx\_resource\_allocations\_project\_period
-   idx\_resource\_allocations\_status

**Capacity Indexes**

Recommended indexes:

-   idx\_capacity\_owner\_period
-   idx\_capacity\_status
-   idx\_capacity\_tenant\_period

**Performance Indexes**

Recommended indexes:

-   idx\_performance\_assignment\_period
-   idx\_performance\_worker\_period
-   idx\_performance\_reviewer
-   idx\_performance\_overall\_score

**Workforce Plan Indexes**

Recommended indexes:

-   idx\_workforce\_plans\_org\_period
-   idx\_workforce\_plans\_status
-   idx\_plan\_requirements\_plan\_status

**Goal Indexes**

Recommended indexes:

-   idx\_workforce\_goals\_owner
-   idx\_workforce\_goals\_assignment
-   idx\_workforce\_goals\_status\_due\_date
-   idx\_goal\_key\_results\_goal

**16.14 Partitioning Strategy**

**Time-Based Partitioning**

Recommended monthly or quarterly partitioning for:

-   resource\_allocations
-   workforce\_capacity
-   workforce\_status
-   workforce\_events
-   workforce\_performance\_reviews

**Tenant-Aware Partitioning**

Large enterprise tenants may require separate schemas, dedicated database clusters, or tenant-based partitioning where compliance, performance, or data residency requirements justify isolation.

**Archival Strategy**

Completed assignments, historical capacity records, old statuses, and past performance reviews should be moved to archive or analytics storage after the operational retention period while preserving auditability.

**16.15 ERD**

**Conceptual ERD**

WorkforceAssignment

├── ResourceAllocation

├── AssignmentResponsibility

│ └── WorkforceRole

├── WorkforcePerformanceReview

├── WorkforceGoal

│ └── GoalKeyResult

└── TimeBillingLink

WorkforcePlan

└── WorkforcePlanRequirement

WorkforceCapacity

WorkforceStatus

WorkforceAIRecommendation

WorkforceEvent

**Relationship Summary**

**Parent Entity**

**Child Entity**

**Cardinality**

Workforce Assignment

Resource Allocations

1:N

Workforce Assignment

Assignment Responsibilities

1:N

Workforce Role

Assignment Responsibilities

1:N

Workforce Assignment

Performance Reviews

1:N

Workforce Assignment

Workforce Goals

1:N

Workforce Goal

Key Results

1:N

Workforce Plan

Plan Requirements

1:N

User/Profile

Workforce Status

1:N

Organization

Workforce Plans

1:N

Organization

Workforce AI Recommendations

1:N

**ERD Design Notes**

The Workforce Management Database is centered on the workforce\_assignments entity. Assignments define how workers are connected to organizations, teams, projects, contracts, and roles. Resource allocations define planned capacity, while timesheets and attendance records from the Time Tracking Service provide actual utilization.

The database separates planning, assignment, performance, goals, availability, and analytics to support enterprise workforce operations at scale. It also provides the data foundation for AI-assisted workforce planning, staffing recommendations, over-allocation detection, and productivity optimization.

**17\. HR Management Database**

**17.1 Overview**

The HR Management Database manages employee lifecycle records for organizations using Kaziforce as an internal workforce, HR, payroll, compliance, and people operations platform.

The HR Management Service owns this database. It supports structured human resource processes such as employee onboarding, employment records, leave management, benefits, appraisals, disciplinary records, payroll inputs, HR documents, policy acknowledgements, and HR compliance.

This database is separate from the Profile Service and Workforce Management Service. The Profile Service manages professional marketplace identity. The Workforce Management Service manages assignments and operational deployment. The HR Management Service manages formal employee and HR records.

**Primary Responsibilities**

The HR Management Database supports:

-   Employee records
-   Employment contracts
-   Onboarding
-   HR documents
-   Leave management
-   Benefits
-   Appraisals
-   Promotions
-   Disciplinary records
-   Policy acknowledgements
-   Payroll inputs
-   HR compliance
-   Employee lifecycle events

**Primary Data Stores**

**Data Store**

**Purpose**

PostgreSQL

Employee records, leave, benefits, appraisals, HR workflows

Object Storage

HR documents, contracts, payslips, policy files

Redis

HR workflow locks and approval cache

Kafka

HR events and downstream integrations

ClickHouse

HR analytics and workforce reports

**17.2 Employees**

**Overview**

The employees table represents formal employees within an organization. An employee may also have a Kaziforce user account, professional profile, workforce assignment, wallet, and payroll record, but the HR Service owns the formal employment relationship.

**Suggested Table: employees**

**Column**

**Data Type**

**Description**

employee\_id

UUID

Primary employee identifier

tenant\_id

UUID

Tenant identifier

organization\_id

UUID

Employer organization

user\_id

UUID

Identity Service user reference

professional\_profile\_id

UUID

Profile Service reference

employee\_number

VARCHAR(80)

Internal employee number

employment\_type

VARCHAR(80)

Full-Time, Part-Time, Fixed-Term, Intern, Casual

employment\_status

VARCHAR(50)

Active, Probation, Suspended, Terminated, Resigned

job\_title

VARCHAR(180)

Current job title

department\_id

UUID

Department reference

business\_unit\_id

UUID

Business unit reference

branch\_id

UUID

Branch reference

reporting\_manager\_user\_id

UUID

Line manager

hire\_date

DATE

Employment start date

probation\_end\_date

DATE

Probation end date

confirmation\_date

DATE

Confirmation date

termination\_date

DATE

Employment end date

work\_email

VARCHAR(255)

Work email

work\_phone

VARCHAR(50)

Work phone

payroll\_currency

CHAR(3)

Payroll currency

metadata

JSONB

Flexible HR metadata

created\_at

TIMESTAMPTZ

Creation timestamp

updated\_at

TIMESTAMPTZ

Update timestamp

deleted\_at

TIMESTAMPTZ

Soft delete timestamp

version

INTEGER

Optimistic locking version

**Design Notes**

Employee records are sensitive. Access should be restricted to authorized HR, finance, compliance, and management users. Historical employee records should not be deleted unless required by privacy law and retention policy.

**17.3 Employment Contracts**

**Overview**

Employment contracts define the legal employment terms between an organization and an employee.

**Suggested Table: employment\_contracts**

**Column**

**Data Type**

**Description**

employment\_contract\_id

UUID

Primary contract identifier

tenant\_id

UUID

Tenant identifier

employee\_id

UUID

Employee reference

organization\_id

UUID

Organization

contract\_number

VARCHAR(100)

Contract number

contract\_type

VARCHAR(80)

Permanent, Fixed-Term, Internship, Casual

contract\_status

VARCHAR(50)

Draft, Pending Signature, Active, Expired, Terminated

start\_date

DATE

Contract start

end\_date

DATE

Contract end

base\_salary

NUMERIC(14,2)

Base salary

currency\_code

CHAR(3)

Salary currency

pay\_frequency

VARCHAR(50)

Monthly, Weekly, Biweekly

working\_hours\_per\_week

NUMERIC(6,2)

Contracted hours

probation\_months

INTEGER

Probation duration

notice\_period\_days

INTEGER

Notice period

document\_object\_key

TEXT

Signed contract document

signed\_by\_employee\_at

TIMESTAMPTZ

Employee signature time

signed\_by\_employer\_at

TIMESTAMPTZ

Employer signature time

metadata

JSONB

Flexible contract metadata

created\_at

TIMESTAMPTZ

Creation timestamp

updated\_at

TIMESTAMPTZ

Update timestamp

**Design Notes**

Employment contracts should be versioned. Contract amendments should be recorded separately instead of overwriting original terms.

**17.4 Onboarding**

**Overview**

Onboarding tracks activities required to convert a candidate or new hire into an active employee.

**Suggested Table: employee\_onboarding**

**Column**

**Data Type**

**Description**

onboarding\_id

UUID

Primary onboarding identifier

tenant\_id

UUID

Tenant identifier

employee\_id

UUID

Employee

organization\_id

UUID

Organization

onboarding\_template\_id

UUID

Template reference

onboarding\_status

VARCHAR(50)

Not Started, In Progress, Completed, Cancelled

start\_date

DATE

Onboarding start

target\_completion\_date

DATE

Target completion

completed\_at

TIMESTAMPTZ

Completion timestamp

assigned\_hr\_user\_id

UUID

HR owner

metadata

JSONB

Flexible metadata

created\_at

TIMESTAMPTZ

Creation timestamp

updated\_at

TIMESTAMPTZ

Update timestamp

**Suggested Table: onboarding\_tasks**

**Column**

**Data Type**

**Description**

onboarding\_task\_id

UUID

Primary task identifier

tenant\_id

UUID

Tenant identifier

onboarding\_id

UUID

Onboarding reference

task\_title

VARCHAR(255)

Task title

task\_description

TEXT

Task details

task\_owner\_type

VARCHAR(80)

Employee, HR, Manager, IT, Finance

due\_date

DATE

Task due date

task\_status

VARCHAR(50)

Pending, Completed, Waived, Overdue

completed\_by\_user\_id

UUID

Completer

completed\_at

TIMESTAMPTZ

Completion time

metadata

JSONB

Flexible task metadata

**17.5 Leave Management**

**Overview**

Leave Management records employee leave entitlement, leave applications, approvals, balances, holidays, and absence history.

**Suggested Table: leave\_types**

**Column**

**Data Type**

**Description**

leave\_type\_id

UUID

Primary leave type

tenant\_id

UUID

Tenant identifier

organization\_id

UUID

Organization

leave\_code

VARCHAR(80)

Leave code

leave\_name

VARCHAR(150)

Annual, Sick, Maternity, Paternity, Compassionate

is\_paid

BOOLEAN

Paid leave flag

requires\_approval

BOOLEAN

Approval required

default\_annual\_entitlement\_days

NUMERIC(6,2)

Default annual entitlement

carry\_forward\_allowed

BOOLEAN

Carry forward flag

lifecycle\_status

VARCHAR(50)

Active, Inactive, Archived

created\_at

TIMESTAMPTZ

Creation timestamp

**Suggested Table: leave\_balances**

**Column**

**Data Type**

**Description**

leave\_balance\_id

UUID

Primary balance identifier

tenant\_id

UUID

Tenant identifier

employee\_id

UUID

Employee

leave\_type\_id

UUID

Leave type

leave\_year

INTEGER

Leave year

entitled\_days

NUMERIC(6,2)

Entitled days

accrued\_days

NUMERIC(6,2)

Accrued days

used\_days

NUMERIC(6,2)

Used days

pending\_days

NUMERIC(6,2)

Pending days

carried\_forward\_days

NUMERIC(6,2)

Carried forward

balance\_days

NUMERIC(6,2)

Remaining balance

updated\_at

TIMESTAMPTZ

Last update

**Suggested Table: leave\_requests**

**Column**

**Data Type**

**Description**

leave\_request\_id

UUID

Primary leave request

tenant\_id

UUID

Tenant identifier

employee\_id

UUID

Employee

leave\_type\_id

UUID

Leave type

start\_date

DATE

Leave start

end\_date

DATE

Leave end

requested\_days

NUMERIC(6,2)

Requested days

reason

TEXT

Leave reason

leave\_status

VARCHAR(50)

Draft, Submitted, Approved, Rejected, Cancelled

submitted\_at

TIMESTAMPTZ

Submission timestamp

approved\_by\_user\_id

UUID

Approver

approved\_at

TIMESTAMPTZ

Approval timestamp

rejected\_at

TIMESTAMPTZ

Rejection timestamp

rejection\_reason

TEXT

Rejection reason

created\_at

TIMESTAMPTZ

Creation timestamp

updated\_at

TIMESTAMPTZ

Update timestamp

**17.6 Benefits**

**Overview**

Benefits define employer-provided entitlements such as medical insurance, pension, allowances, wellness programs, transport, airtime, meal allowance, and professional development support.

**Suggested Table: benefit\_plans**

**Column**

**Data Type**

**Description**

benefit\_plan\_id

UUID

Primary benefit plan

tenant\_id

UUID

Tenant identifier

organization\_id

UUID

Organization

benefit\_code

VARCHAR(80)

Benefit code

benefit\_name

VARCHAR(180)

Benefit name

benefit\_type

VARCHAR(80)

Medical, Pension, Allowance, Wellness, Training

provider\_name

VARCHAR(180)

Provider

employer\_contribution

NUMERIC(14,2)

Employer contribution

employee\_contribution

NUMERIC(14,2)

Employee contribution

currency\_code

CHAR(3)

Currency

lifecycle\_status

VARCHAR(50)

Active, Inactive, Archived

metadata

JSONB

Flexible metadata

created\_at

TIMESTAMPTZ

Creation timestamp

**Suggested Table: employee\_benefits**

**Column**

**Data Type**

**Description**

employee\_benefit\_id

UUID

Primary identifier

tenant\_id

UUID

Tenant identifier

employee\_id

UUID

Employee

benefit\_plan\_id

UUID

Benefit plan

enrollment\_status

VARCHAR(50)

Enrolled, Waived, Suspended, Ended

effective\_from

DATE

Start date

effective\_to

DATE

End date

employee\_contribution\_amount

NUMERIC(14,2)

Employee contribution

employer\_contribution\_amount

NUMERIC(14,2)

Employer contribution

metadata

JSONB

Flexible metadata

created\_at

TIMESTAMPTZ

Creation timestamp

updated\_at

TIMESTAMPTZ

Update timestamp

**17.7 Appraisals**

**Overview**

Appraisals record structured employee performance reviews within HR processes. They may reuse workforce performance data but remain owned by HR when tied to employment decisions.

**Suggested Table: appraisal\_cycles**

**Column**

**Data Type**

**Description**

appraisal\_cycle\_id

UUID

Primary appraisal cycle

tenant\_id

UUID

Tenant identifier

organization\_id

UUID

Organization

cycle\_name

VARCHAR(180)

Cycle name

period\_start

DATE

Review period start

period\_end

DATE

Review period end

appraisal\_status

VARCHAR(50)

Planned, Active, Closed, Archived

created\_at

TIMESTAMPTZ

Creation timestamp

**Suggested Table: employee\_appraisals**

**Column**

**Data Type**

**Description**

appraisal\_id

UUID

Primary appraisal

tenant\_id

UUID

Tenant identifier

appraisal\_cycle\_id

UUID

Cycle

employee\_id

UUID

Employee

reviewer\_user\_id

UUID

Reviewer

self\_review\_score

NUMERIC(5,2)

Employee self-rating

manager\_score

NUMERIC(5,2)

Manager score

final\_score

NUMERIC(5,2)

Final appraisal score

strengths

TEXT

Strengths

improvement\_areas

TEXT

Improvement areas

development\_plan

TEXT

Development plan

appraisal\_status

VARCHAR(50)

Draft, Submitted, Reviewed, Finalized

submitted\_at

TIMESTAMPTZ

Submission timestamp

finalized\_at

TIMESTAMPTZ

Finalization timestamp

created\_at

TIMESTAMPTZ

Creation timestamp

updated\_at

TIMESTAMPTZ

Update timestamp

**17.8 Promotions and Transfers**

**Overview**

Promotions and transfers record changes in employee role, grade, department, branch, manager, salary band, or business unit.

**Suggested Table: employee\_movements**

**Column**

**Data Type**

**Description**

movement\_id

UUID

Primary movement identifier

tenant\_id

UUID

Tenant identifier

employee\_id

UUID

Employee

movement\_type

VARCHAR(80)

Promotion, Transfer, Demotion, Secondment

previous\_job\_title

VARCHAR(180)

Previous role

new\_job\_title

VARCHAR(180)

New role

previous\_department\_id

UUID

Previous department

new\_department\_id

UUID

New department

previous\_manager\_user\_id

UUID

Previous manager

new\_manager\_user\_id

UUID

New manager

effective\_date

DATE

Effective date

reason

TEXT

Movement reason

approved\_by\_user\_id

UUID

Approver

approved\_at

TIMESTAMPTZ

Approval timestamp

metadata

JSONB

Flexible metadata

created\_at

TIMESTAMPTZ

Creation timestamp

**Design Notes**

Employee movement records should preserve history and should trigger updates to employee, workforce assignment, payroll, and organization reporting structures.

**17.9 Disciplinary Records**

**Overview**

Disciplinary records track formal HR cases, warnings, investigations, hearings, resolutions, and corrective actions.

**Suggested Table: disciplinary\_cases**

**Column**

**Data Type**

**Description**

disciplinary\_case\_id

UUID

Primary case identifier

tenant\_id

UUID

Tenant identifier

employee\_id

UUID

Employee

organization\_id

UUID

Organization

case\_number

VARCHAR(100)

Case reference

case\_type

VARCHAR(100)

Warning, Investigation, Misconduct, Performance

severity

VARCHAR(50)

Low, Medium, High, Critical

case\_status

VARCHAR(50)

Open, Under Review, Resolved, Closed

incident\_date

DATE

Incident date

description

TEXT

Case description

action\_taken

TEXT

Corrective action

opened\_by\_user\_id

UUID

Case opener

assigned\_hr\_user\_id

UUID

HR owner

opened\_at

TIMESTAMPTZ

Open timestamp

resolved\_at

TIMESTAMPTZ

Resolution timestamp

metadata

JSONB

Flexible metadata

**Design Notes**

Disciplinary data is highly sensitive. It must be protected through strict role-based access control, audit logging, and retention policies.

**17.10 Payroll Inputs**

**Overview**

Payroll Inputs provide HR-controlled data required by Payroll and Finance services. The HR Service does not execute payroll payments but provides authoritative employee payroll inputs.

**Suggested Table: payroll\_inputs**

**Column**

**Data Type**

**Description**

payroll\_input\_id

UUID

Primary payroll input

tenant\_id

UUID

Tenant identifier

employee\_id

UUID

Employee

organization\_id

UUID

Organization

payroll\_period\_start

DATE

Period start

payroll\_period\_end

DATE

Period end

basic\_salary

NUMERIC(14,2)

Basic salary

allowances

JSONB

Allowance breakdown

deductions

JSONB

Deduction breakdown

overtime\_hours

NUMERIC(10,2)

Overtime hours

unpaid\_leave\_days

NUMERIC(6,2)

Unpaid leave

taxable\_benefits

JSONB

Taxable benefits

payroll\_status

VARCHAR(50)

Draft, Submitted, Approved, SentToPayroll

approved\_by\_user\_id

UUID

Approver

approved\_at

TIMESTAMPTZ

Approval timestamp

sent\_to\_payroll\_at

TIMESTAMPTZ

Sent timestamp

created\_at

TIMESTAMPTZ

Creation timestamp

**Published Events**

-   EmployeeCreated
-   EmployeeUpdated
-   EmployeeTerminated
-   LeaveApproved
-   LeaveRejected
-   PayrollInputApproved
-   BenefitEnrolled
-   AppraisalFinalized
-   EmployeeMovementApproved

**17.11 HR Documents**

**Overview**

HR Documents store metadata for employment files, contracts, certificates, policies, letters, disciplinary files, payslips, onboarding documents, and compliance evidence.

Files are stored in Object Storage. Metadata is stored in PostgreSQL.

**Suggested Table: hr\_documents**

**Column**

**Data Type**

**Description**

hr\_document\_id

UUID

Primary document identifier

tenant\_id

UUID

Tenant identifier

employee\_id

UUID

Optional employee

organization\_id

UUID

Organization

document\_type

VARCHAR(100)

Contract, Policy, Letter, Certificate, Payslip

document\_title

VARCHAR(255)

Document title

object\_key

TEXT

Object storage reference

file\_name

VARCHAR(255)

Original file name

mime\_type

VARCHAR(150)

MIME type

file\_size\_bytes

BIGINT

File size

confidentiality\_level

VARCHAR(50)

Public, Internal, Confidential, Restricted

verification\_status

VARCHAR(50)

Pending, Verified, Rejected

uploaded\_by\_user\_id

UUID

Uploader

uploaded\_at

TIMESTAMPTZ

Upload timestamp

expires\_at

TIMESTAMPTZ

Optional expiry

metadata

JSONB

Flexible metadata

**17.12 HR Analytics**

**Overview**

HR Analytics provides visibility into employee growth, retention, leave trends, appraisal outcomes, benefits usage, HR workload, payroll inputs, and employee lifecycle events.

**Suggested Table: hr\_events**

**Column**

**Data Type**

**Description**

hr\_event\_id

UUID

Primary analytics event

tenant\_id

UUID

Tenant identifier

organization\_id

UUID

Organization

employee\_id

UUID

Optional employee

event\_type

VARCHAR(120)

EmployeeCreated, LeaveApproved, AppraisalFinalized

event\_payload

JSONB

Event details

occurred\_at

TIMESTAMPTZ

Business event timestamp

created\_at

TIMESTAMPTZ

Storage timestamp

**Key Metrics**

-   Active employees
-   New hires
-   Employee exits
-   Leave utilization
-   Leave approval turnaround time
-   Appraisal completion rate
-   Average performance score
-   Benefit enrollment rate
-   Disciplinary case volume
-   Payroll input approval time
-   Employee turnover rate
-   Probation confirmation rate

**Recommended ClickHouse Fact Tables**

-   fact\_employee\_headcount
-   fact\_leave\_utilization
-   fact\_appraisal\_scores
-   fact\_employee\_movements
-   fact\_hr\_case\_management
-   fact\_benefit\_enrollment
-   fact\_payroll\_inputs

**17.13 Constraints**

**Primary Key Constraints**

Core tables use UUID primary keys:

-   employee\_id
-   employment\_contract\_id
-   onboarding\_id
-   leave\_type\_id
-   leave\_balance\_id
-   leave\_request\_id
-   benefit\_plan\_id
-   employee\_benefit\_id
-   appraisal\_id
-   movement\_id
-   disciplinary\_case\_id
-   payroll\_input\_id
-   hr\_document\_id

**Foreign Key Constraints**

Recommended internal foreign keys:

-   employment\_contracts.employee\_id → employees.employee\_id
-   employee\_onboarding.employee\_id → employees.employee\_id
-   onboarding\_tasks.onboarding\_id → employee\_onboarding.onboarding\_id
-   leave\_balances.employee\_id → employees.employee\_id
-   leave\_balances.leave\_type\_id → leave\_types.leave\_type\_id
-   leave\_requests.employee\_id → employees.employee\_id
-   leave\_requests.leave\_type\_id → leave\_types.leave\_type\_id
-   employee\_benefits.employee\_id → employees.employee\_id
-   employee\_benefits.benefit\_plan\_id → benefit\_plans.benefit\_plan\_id
-   employee\_appraisals.employee\_id → employees.employee\_id
-   employee\_movements.employee\_id → employees.employee\_id
-   disciplinary\_cases.employee\_id → employees.employee\_id
-   payroll\_inputs.employee\_id → employees.employee\_id
-   hr\_documents.employee\_id → employees.employee\_id

Cross-service fields such as user\_id, professional\_profile\_id, department\_id, business\_unit\_id, branch\_id, and organization\_id should be validated through APIs or synchronized read models.

**Check Constraints**

Recommended checks:

-   termination\_date IS NULL OR termination\_date >= hire\_date
-   probation\_end\_date IS NULL OR probation\_end\_date >= hire\_date
-   end\_date IS NULL OR end\_date >= start\_date
-   requested\_days > 0
-   leave balances must not be negative unless policy allows it
-   appraisal scores between 0 and 100
-   salary and contribution amounts must be >= 0

**Unique Constraints**

Recommended unique constraints:

-   Unique employee number per organization.
-   One active employee record per user and organization.
-   One active employment contract per employee unless concurrent contracts are allowed.
-   One leave balance per employee, leave type, and leave year.
-   One appraisal per employee and appraisal cycle.
-   One active benefit enrollment per employee and benefit plan.

**17.14 Indexing Strategy**

**Employee Indexes**

Recommended indexes:

-   idx\_employees\_tenant\_org\_status
-   idx\_employees\_user\_id
-   idx\_employees\_profile\_id
-   idx\_employees\_employee\_number
-   idx\_employees\_department
-   idx\_employees\_manager
-   idx\_employees\_hire\_date

**Leave Indexes**

Recommended indexes:

-   idx\_leave\_requests\_employee
-   idx\_leave\_requests\_org\_status
-   idx\_leave\_requests\_date\_range
-   idx\_leave\_balances\_employee\_year

**Benefits Indexes**

Recommended indexes:

-   idx\_employee\_benefits\_employee
-   idx\_employee\_benefits\_plan
-   idx\_employee\_benefits\_status

**Appraisal Indexes**

Recommended indexes:

-   idx\_appraisals\_cycle
-   idx\_appraisals\_employee
-   idx\_appraisals\_reviewer
-   idx\_appraisals\_status

**Payroll Input Indexes**

Recommended indexes:

-   idx\_payroll\_inputs\_employee\_period
-   idx\_payroll\_inputs\_org\_period
-   idx\_payroll\_inputs\_status

**HR Document Indexes**

Recommended indexes:

-   idx\_hr\_documents\_employee
-   idx\_hr\_documents\_org\_type
-   idx\_hr\_documents\_confidentiality

**17.15 ERD**

**Conceptual ERD**

Employee

├── EmploymentContract

├── EmployeeOnboarding

│ └── OnboardingTask

├── LeaveBalance

│ └── LeaveType

├── LeaveRequest

│ └── LeaveType

├── EmployeeBenefit

│ └── BenefitPlan

├── EmployeeAppraisal

│ └── AppraisalCycle

├── EmployeeMovement

├── DisciplinaryCase

├── PayrollInput

└── HRDocument

HREvent

**Relationship Summary**

**Parent Entity**

**Child Entity**

**Cardinality**

Employee

Employment Contracts

1:N

Employee

Onboarding Records

1:N

Onboarding

Onboarding Tasks

1:N

Employee

Leave Balances

1:N

Leave Type

Leave Balances

1:N

Employee

Leave Requests

1:N

Leave Type

Leave Requests

1:N

Employee

Employee Benefits

1:N

Benefit Plan

Employee Benefits

1:N

Appraisal Cycle

Employee Appraisals

1:N

Employee

Appraisals

1:N

Employee

Movements

1:N

Employee

Disciplinary Cases

1:N

Employee

Payroll Inputs

1:N

Employee

HR Documents

1:N

**ERD Design Notes**

The HR Management Database is centered on the employees entity. It maintains formal employment records and HR lifecycle data. It does not replace Identity, Profile, Workforce Management, Finance, or Payroll databases. Instead, it references those domains by UUID and exchanges information through APIs and Kafka events.

The design separates employee records, contracts, leave, benefits, appraisals, disciplinary records, payroll inputs, and HR documents to support secure HR operations, policy enforcement, compliance, and auditability.

**18\. Learning Management Database**

**18.1 Overview**

The Learning Management Database manages learning content, courses, lessons, assessments, enrollments, progress tracking, certificates, learning paths, instructor records, training providers, and learning analytics within Kaziforce.

The Learning Management Service owns this database. It supports professional upskilling, employer-sponsored training, compliance learning, AI-recommended courses, career development, workforce readiness, and certification pathways.

**Primary Responsibilities**

The database supports:

-   Course catalog management
-   Learning paths
-   Lessons and modules
-   Course enrollment
-   Learner progress tracking
-   Assessments and quizzes
-   Assignment submissions
-   Instructor management
-   Training provider records
-   Course reviews and ratings
-   Certificates of completion
-   Employer-sponsored learning
-   AI learning recommendations
-   Learning analytics

**Primary Data Stores**

**Data Store**

**Purpose**

PostgreSQL

Courses, enrollments, lessons, progress, assessments, certificates

MongoDB

Rich course content, lesson documents, quiz structures

Object Storage

Videos, PDFs, slides, images, SCORM packages, certificates

Redis

Progress cache, course recommendation cache, active learning sessions

OpenSearch

Course search and discovery

Vector Store

Semantic learning recommendations

ClickHouse

Learning analytics and reporting

Kafka

Learning events and integrations

**18.2 Courses**

**Overview**

Courses represent structured learning products available to professionals, employees, organizations, teams, and AI-assisted learners. Courses may be free, paid, employer-sponsored, certification-linked, or compliance-driven.

**Suggested Table: courses**

**Column**

**Data Type**

**Description**

course\_id

UUID

Primary course identifier

tenant\_id

UUID

Tenant identifier

provider\_id

UUID

Training provider reference

instructor\_id

UUID

Primary instructor reference

course\_code

VARCHAR(100)

Unique course code

course\_slug

VARCHAR(255)

URL-friendly identifier

title

VARCHAR(255)

Course title

subtitle

VARCHAR(255)

Short subtitle

description

TEXT

Course description

category

VARCHAR(120)

Course category

subcategory

VARCHAR(120)

Course subcategory

difficulty\_level

VARCHAR(50)

Beginner, Intermediate, Advanced, Expert

language\_code

VARCHAR(10)

Course language

estimated\_duration\_minutes

INTEGER

Estimated learning time

delivery\_mode

VARCHAR(80)

Self-Paced, Live, Hybrid, Cohort

pricing\_type

VARCHAR(50)

Free, Paid, Sponsored, Subscription

price\_amount

NUMERIC(14,2)

Course price

currency\_code

CHAR(3)

Price currency

certificate\_enabled

BOOLEAN

Whether certificate is issued

assessment\_required

BOOLEAN

Whether assessment is required

passing\_score

NUMERIC(5,2)

Minimum passing score

publication\_status

VARCHAR(50)

Draft, Review, Published, Archived

visibility\_status

VARCHAR(50)

Public, Private, Organization, Invite Only

average\_rating

NUMERIC(4,2)

Average rating

enrollment\_count

INTEGER

Total enrollments

metadata

JSONB

Flexible metadata

published\_at

TIMESTAMPTZ

Publication timestamp

created\_at

TIMESTAMPTZ

Creation timestamp

updated\_at

TIMESTAMPTZ

Update timestamp

deleted\_at

TIMESTAMPTZ

Soft delete timestamp

version

INTEGER

Optimistic locking version

**Design Notes**

Course records should store summary metadata only. Large rich content, videos, downloadable resources, and interactive learning materials should be stored in Object Storage or MongoDB, with PostgreSQL maintaining structured references.

**18.3 Training Providers**

**Overview**

Training Providers represent organizations or individuals that publish learning content on Kaziforce. They may include internal employer academies, universities, professional bodies, independent instructors, training companies, and AI-generated learning providers.

**Suggested Table: training\_providers**

**Column**

**Data Type**

**Description**

provider\_id

UUID

Primary provider identifier

tenant\_id

UUID

Tenant identifier

organization\_id

UUID

Optional organization reference

provider\_name

VARCHAR(255)

Provider name

provider\_type

VARCHAR(80)

Individual, Organization, University, ProfessionalBody, AI

country\_code

CHAR(2)

Country

website\_url

TEXT

Provider website

verification\_status

VARCHAR(50)

Pending, Verified, Rejected, Suspended

provider\_rating

NUMERIC(4,2)

Average provider rating

lifecycle\_status

VARCHAR(50)

Active, Inactive, Suspended

metadata

JSONB

Flexible provider metadata

created\_at

TIMESTAMPTZ

Creation timestamp

updated\_at

TIMESTAMPTZ

Update timestamp

**18.4 Instructors**

**Overview**

Instructors are individuals or AI agents responsible for delivering course content, supporting learners, assessing submissions, or facilitating live sessions.

**Suggested Table: instructors**

**Column**

**Data Type**

**Description**

instructor\_id

UUID

Primary instructor identifier

tenant\_id

UUID

Tenant identifier

provider\_id

UUID

Training provider

user\_id

UUID

Optional user reference

professional\_profile\_id

UUID

Optional profile reference

ai\_agent\_id

UUID

Optional AI instructor reference

display\_name

VARCHAR(180)

Instructor name

biography

TEXT

Instructor bio

expertise\_areas

JSONB

Skills and expertise

verification\_status

VARCHAR(50)

Pending, Verified, Rejected

average\_rating

NUMERIC(4,2)

Instructor rating

lifecycle\_status

VARCHAR(50)

Active, Inactive, Suspended

created\_at

TIMESTAMPTZ

Creation timestamp

updated\_at

TIMESTAMPTZ

Update timestamp

**18.5 Course Modules and Lessons**

**Overview**

Modules divide courses into logical sections. Lessons represent individual learning units such as videos, readings, quizzes, assignments, live sessions, labs, or downloadable resources.

**Suggested Table: course\_modules**

**Column**

**Data Type**

**Description**

module\_id

UUID

Primary module identifier

tenant\_id

UUID

Tenant identifier

course\_id

UUID

Course reference

module\_title

VARCHAR(255)

Module title

module\_description

TEXT

Module description

module\_order

INTEGER

Display order

estimated\_duration\_minutes

INTEGER

Estimated module duration

lifecycle\_status

VARCHAR(50)

Active, Inactive, Archived

created\_at

TIMESTAMPTZ

Creation timestamp

updated\_at

TIMESTAMPTZ

Update timestamp

**Suggested Table: lessons**

**Column**

**Data Type**

**Description**

lesson\_id

UUID

Primary lesson identifier

tenant\_id

UUID

Tenant identifier

course\_id

UUID

Course reference

module\_id

UUID

Module reference

lesson\_title

VARCHAR(255)

Lesson title

lesson\_type

VARCHAR(80)

Video, Reading, Quiz, Assignment, Live, Lab

lesson\_order

INTEGER

Display order

content\_document\_id

VARCHAR(120)

MongoDB content reference

media\_object\_key

TEXT

Object storage reference

estimated\_duration\_minutes

INTEGER

Estimated lesson duration

is\_preview\_enabled

BOOLEAN

Free preview flag

is\_required

BOOLEAN

Required lesson flag

lifecycle\_status

VARCHAR(50)

Active, Inactive, Archived

created\_at

TIMESTAMPTZ

Creation timestamp

updated\_at

TIMESTAMPTZ

Update timestamp

**MongoDB Collection: lesson\_contents**

{

"lesson\_id": "uuid",

"course\_id": "uuid",

"tenant\_id": "uuid",

"content\_blocks": \[

{

"type": "text",

"body": "Lesson explanation"

},

{

"type": "video",

"object\_key": "courses/course-001/video-001.mp4"

},

{

"type": "code",

"language": "javascript",

"body": "console.log('Kaziforce');"

}

\],

"resources": \[\],

"created\_at": "timestamp",

"updated\_at": "timestamp"

}

**18.6 Learning Paths**

**Overview**

Learning Paths group courses into structured career, skill, certification, compliance, or employer-sponsored pathways.

**Suggested Table: learning\_paths**

**Column**

**Data Type**

**Description**

learning\_path\_id

UUID

Primary learning path identifier

tenant\_id

UUID

Tenant identifier

provider\_id

UUID

Optional provider

path\_title

VARCHAR(255)

Learning path title

path\_description

TEXT

Description

path\_category

VARCHAR(120)

Category

target\_role

VARCHAR(180)

Target career role

difficulty\_level

VARCHAR(50)

Beginner, Intermediate, Advanced

estimated\_duration\_minutes

INTEGER

Estimated total duration

certificate\_enabled

BOOLEAN

Completion certificate flag

publication\_status

VARCHAR(50)

Draft, Published, Archived

visibility\_status

VARCHAR(50)

Public, Organization, Private

metadata

JSONB

Flexible metadata

created\_at

TIMESTAMPTZ

Creation timestamp

updated\_at

TIMESTAMPTZ

Update timestamp

**Suggested Table: learning\_path\_courses**

**Column**

**Data Type**

**Description**

path\_course\_id

UUID

Primary identifier

tenant\_id

UUID

Tenant identifier

learning\_path\_id

UUID

Learning path

course\_id

UUID

Course

course\_order

INTEGER

Sequence order

is\_required

BOOLEAN

Required course flag

created\_at

TIMESTAMPTZ

Creation timestamp

**18.7 Enrollments**

**Overview**

Enrollments represent a learner's registration into a course or learning path. They track course access, progress, completion, payment status, employer sponsorship, and certification eligibility.

**Suggested Table: course\_enrollments**

**Column**

**Data Type**

**Description**

enrollment\_id

UUID

Primary enrollment identifier

tenant\_id

UUID

Tenant identifier

course\_id

UUID

Course reference

user\_id

UUID

Learner user

professional\_profile\_id

UUID

Learner profile

organization\_id

UUID

Sponsoring organization

enrollment\_source

VARCHAR(80)

Self, Employer, AI Recommendation, Admin

enrollment\_status

VARCHAR(50)

Enrolled, InProgress, Completed, Dropped, Expired

payment\_status

VARCHAR(50)

Free, Pending, Paid, Sponsored, Refunded

progress\_percentage

NUMERIC(5,2)

Course progress

final\_score

NUMERIC(5,2)

Final score

enrolled\_at

TIMESTAMPTZ

Enrollment timestamp

started\_at

TIMESTAMPTZ

Start timestamp

completed\_at

TIMESTAMPTZ

Completion timestamp

expires\_at

TIMESTAMPTZ

Access expiry

metadata

JSONB

Flexible metadata

**Suggested Table: learning\_path\_enrollments**

**Column**

**Data Type**

**Description**

path\_enrollment\_id

UUID

Primary enrollment identifier

tenant\_id

UUID

Tenant identifier

learning\_path\_id

UUID

Learning path

user\_id

UUID

Learner

professional\_profile\_id

UUID

Profile

organization\_id

UUID

Sponsoring organization

enrollment\_status

VARCHAR(50)

Enrolled, InProgress, Completed, Dropped

progress\_percentage

NUMERIC(5,2)

Path progress

enrolled\_at

TIMESTAMPTZ

Enrollment timestamp

completed\_at

TIMESTAMPTZ

Completion timestamp

**18.8 Learner Progress**

**Overview**

Learner Progress tracks completion of lessons, modules, assessments, activities, and learning paths.

**Suggested Table: lesson\_progress**

**Column**

**Data Type**

**Description**

lesson\_progress\_id

UUID

Primary progress identifier

tenant\_id

UUID

Tenant identifier

enrollment\_id

UUID

Course enrollment

course\_id

UUID

Course

module\_id

UUID

Module

lesson\_id

UUID

Lesson

user\_id

UUID

Learner

progress\_status

VARCHAR(50)

NotStarted, InProgress, Completed

progress\_percentage

NUMERIC(5,2)

Lesson progress

time\_spent\_seconds

INTEGER

Time spent

last\_position\_seconds

INTEGER

Last video position

started\_at

TIMESTAMPTZ

Start timestamp

completed\_at

TIMESTAMPTZ

Completion timestamp

updated\_at

TIMESTAMPTZ

Update timestamp

**Design Notes**

Progress tracking should be idempotent. Repeated client events should not corrupt completion status or inflate time spent.

**18.9 Assessments and Questions**

**Overview**

Assessments evaluate learner understanding through quizzes, exams, assignments, practical tasks, case studies, peer reviews, or AI-graded exercises.

**Suggested Table: assessments**

**Column**

**Data Type**

**Description**

assessment\_id

UUID

Primary assessment identifier

tenant\_id

UUID

Tenant identifier

course\_id

UUID

Course

module\_id

UUID

Optional module

lesson\_id

UUID

Optional lesson

assessment\_title

VARCHAR(255)

Assessment title

assessment\_type

VARCHAR(80)

Quiz, Exam, Assignment, Project, Practical

passing\_score

NUMERIC(5,2)

Required passing score

max\_attempts

INTEGER

Maximum attempts

time\_limit\_minutes

INTEGER

Optional time limit

grading\_method

VARCHAR(80)

Auto, Manual, AI, Hybrid

question\_document\_id

VARCHAR(120)

MongoDB question document

lifecycle\_status

VARCHAR(50)

Active, Inactive, Archived

created\_at

TIMESTAMPTZ

Creation timestamp

updated\_at

TIMESTAMPTZ

Update timestamp

**Suggested Table: assessment\_attempts**

**Column**

**Data Type**

**Description**

attempt\_id

UUID

Primary attempt identifier

tenant\_id

UUID

Tenant identifier

assessment\_id

UUID

Assessment

enrollment\_id

UUID

Enrollment

user\_id

UUID

Learner

attempt\_number

INTEGER

Attempt count

score

NUMERIC(5,2)

Score achieved

passed

BOOLEAN

Pass flag

attempt\_status

VARCHAR(50)

Started, Submitted, Graded, Cancelled

started\_at

TIMESTAMPTZ

Attempt start

submitted\_at

TIMESTAMPTZ

Submission timestamp

graded\_at

TIMESTAMPTZ

Grading timestamp

graded\_by\_user\_id

UUID

Manual grader

ai\_model\_id

UUID

AI grader model

feedback

TEXT

Feedback

**MongoDB Collection: assessment\_questions**

{

"assessment\_id": "uuid",

"questions": \[

{

"question\_id": "uuid",

"type": "multiple\_choice",

"prompt": "What is workforce planning?",

"options": \[\],

"answer\_key": {},

"points": 5

}

\],

"created\_at": "timestamp"

}

**18.10 Certificates**

**Overview**

Certificates are issued after successful course, learning path, compliance program, or assessment completion.

**Suggested Table: learning\_certificates**

**Column**

**Data Type**

**Description**

learning\_certificate\_id

UUID

Primary certificate identifier

tenant\_id

UUID

Tenant identifier

certificate\_number

VARCHAR(120)

Certificate number

user\_id

UUID

Learner

professional\_profile\_id

UUID

Profile

course\_id

UUID

Optional course

learning\_path\_id

UUID

Optional path

enrollment\_id

UUID

Enrollment

certificate\_title

VARCHAR(255)

Certificate title

issuer\_name

VARCHAR(255)

Issuer

issue\_date

DATE

Issue date

expiry\_date

DATE

Optional expiry

final\_score

NUMERIC(5,2)

Final score

verification\_url

TEXT

Public verification URL

certificate\_object\_key

TEXT

PDF certificate object key

verification\_status

VARCHAR(50)

Valid, Expired, Revoked

issued\_at

TIMESTAMPTZ

Issue timestamp

revoked\_at

TIMESTAMPTZ

Revocation timestamp

metadata

JSONB

Flexible metadata

**Design Notes**

Certificates should be verifiable using a unique certificate number and verification URL. Certificate revocation should never delete the original record.

**18.11 Course Reviews and Ratings**

**Overview**

Course reviews capture learner feedback and support course quality, ranking, recommendations, and marketplace trust.

**Suggested Table: course\_reviews**

**Column**

**Data Type**

**Description**

review\_id

UUID

Primary review identifier

tenant\_id

UUID

Tenant identifier

course\_id

UUID

Course

enrollment\_id

UUID

Enrollment

user\_id

UUID

Reviewer

rating

NUMERIC(2,1)

Rating value

review\_title

VARCHAR(255)

Review title

review\_body

TEXT

Review text

moderation\_status

VARCHAR(50)

Pending, Approved, Rejected

created\_at

TIMESTAMPTZ

Creation timestamp

updated\_at

TIMESTAMPTZ

Update timestamp

**18.12 AI Learning Recommendations**

**Overview**

AI Learning Recommendations suggest courses, learning paths, skills, and certifications based on a professional's profile, career goals, marketplace demand, skills gaps, employer requirements, and workforce plans.

**Suggested Table: learning\_recommendations**

**Column**

**Data Type**

**Description**

recommendation\_id

UUID

Primary recommendation identifier

tenant\_id

UUID

Tenant identifier

user\_id

UUID

Recipient user

professional\_profile\_id

UUID

Recipient profile

recommendation\_type

VARCHAR(80)

Course, LearningPath, Skill, Certification

recommended\_entity\_id

UUID

Recommended course/path/skill

reason\_codes

JSONB

Recommendation reasons

relevance\_score

NUMERIC(8,4)

AI relevance score

model\_id

UUID

AI model

recommendation\_status

VARCHAR(50)

Generated, Viewed, Enrolled, Dismissed, Expired

generated\_at

TIMESTAMPTZ

Generation timestamp

expires\_at

TIMESTAMPTZ

Expiry timestamp

feedback

JSONB

Learner feedback

**18.13 Learning Search Model**

**Overview**

The Learning Search Model enables fast discovery of courses, learning paths, instructors, providers, certifications, and skills.

**OpenSearch Index: courses\_v1**

**Field**

**Type**

**Purpose**

course\_id

keyword

Course identifier

tenant\_id

keyword

Tenant filtering

title

text/keyword

Course title search

description

text

Full-text search

category

keyword

Category filtering

subcategory

keyword

Subcategory filtering

difficulty\_level

keyword

Difficulty filtering

language\_code

keyword

Language filtering

provider\_name

text/keyword

Provider search

instructor\_name

text/keyword

Instructor search

price\_amount

double

Price filtering

certificate\_enabled

boolean

Certificate filter

average\_rating

double

Ranking

enrollment\_count

integer

Popularity signal

embedding\_vector

dense\_vector

Semantic search

**18.14 Learning Analytics**

**Overview**

Learning Analytics measures learning activity, completion rates, skills development, certification performance, course quality, and workforce readiness.

**Suggested Table: learning\_events**

**Column**

**Data Type**

**Description**

learning\_event\_id

UUID

Primary event identifier

tenant\_id

UUID

Tenant identifier

event\_type

VARCHAR(120)

CourseEnrolled, LessonCompleted, CertificateIssued

user\_id

UUID

Learner

professional\_profile\_id

UUID

Profile

course\_id

UUID

Optional course

learning\_path\_id

UUID

Optional path

enrollment\_id

UUID

Optional enrollment

event\_payload

JSONB

Event details

occurred\_at

TIMESTAMPTZ

Business event timestamp

created\_at

TIMESTAMPTZ

Storage timestamp

**Key Metrics**

-   Course enrollments
-   Course completions
-   Completion rate
-   Drop-off rate
-   Average lesson progress
-   Assessment pass rate
-   Average score
-   Certificate issuance count
-   Learning path completion rate
-   Learner engagement time
-   Course rating
-   AI recommendation conversion
-   Employer-sponsored learning uptake
-   Skills gained

**Recommended ClickHouse Fact Tables**

-   fact\_course\_enrollment
-   fact\_lesson\_progress
-   fact\_assessment\_attempts
-   fact\_certificate\_issuance
-   fact\_learning\_path\_progress
-   fact\_course\_reviews
-   fact\_ai\_learning\_recommendations

**18.15 Constraints**

**Primary Key Constraints**

Core tables use UUID primary keys:

-   course\_id
-   provider\_id
-   instructor\_id
-   module\_id
-   lesson\_id
-   learning\_path\_id
-   enrollment\_id
-   assessment\_id
-   attempt\_id
-   learning\_certificate\_id
-   review\_id

**Foreign Key Constraints**

Recommended internal foreign keys:

-   courses.provider\_id → training\_providers.provider\_id
-   courses.instructor\_id → instructors.instructor\_id
-   course\_modules.course\_id → courses.course\_id
-   lessons.course\_id → courses.course\_id
-   lessons.module\_id → course\_modules.module\_id
-   learning\_path\_courses.learning\_path\_id → learning\_paths.learning\_path\_id
-   learning\_path\_courses.course\_id → courses.course\_id
-   course\_enrollments.course\_id → courses.course\_id
-   lesson\_progress.enrollment\_id → course\_enrollments.enrollment\_id
-   lesson\_progress.lesson\_id → lessons.lesson\_id
-   assessments.course\_id → courses.course\_id
-   assessment\_attempts.assessment\_id → assessments.assessment\_id
-   assessment\_attempts.enrollment\_id → course\_enrollments.enrollment\_id
-   learning\_certificates.enrollment\_id → course\_enrollments.enrollment\_id
-   course\_reviews.course\_id → courses.course\_id

Cross-service identifiers such as user\_id, professional\_profile\_id, organization\_id, ai\_model\_id, and skill\_id should be validated through APIs or event-synchronized read models.

**Check Constraints**

Recommended checks:

-   price\_amount >= 0
-   estimated\_duration\_minutes >= 0
-   passing\_score BETWEEN 0 AND 100
-   progress\_percentage BETWEEN 0 AND 100
-   final\_score BETWEEN 0 AND 100
-   rating BETWEEN 1 AND 5
-   max\_attempts >= 1
-   expiry\_date IS NULL OR expiry\_date >= issue\_date

**Unique Constraints**

Recommended unique constraints:

-   Unique course code per provider.
-   Unique course slug per tenant.
-   One active enrollment per user and course.
-   One active learning path enrollment per user and path.
-   One lesson progress record per enrollment and lesson.
-   One review per enrollment.
-   Unique certificate number.

**18.16 Indexing Strategy**

**Course Indexes**

Recommended indexes:

-   idx\_courses\_tenant\_status
-   idx\_courses\_provider
-   idx\_courses\_instructor
-   idx\_courses\_category
-   idx\_courses\_difficulty
-   idx\_courses\_rating
-   idx\_courses\_published\_at

**Enrollment Indexes**

Recommended indexes:

-   idx\_course\_enrollments\_user
-   idx\_course\_enrollments\_profile
-   idx\_course\_enrollments\_course
-   idx\_course\_enrollments\_status
-   idx\_course\_enrollments\_org

**Progress Indexes**

Recommended indexes:

-   idx\_lesson\_progress\_enrollment
-   idx\_lesson\_progress\_user\_course
-   idx\_lesson\_progress\_status

**Assessment Indexes**

Recommended indexes:

-   idx\_assessments\_course
-   idx\_attempts\_assessment
-   idx\_attempts\_user
-   idx\_attempts\_enrollment

**Certificate Indexes**

Recommended indexes:

-   idx\_certificates\_user
-   idx\_certificates\_profile
-   idx\_certificates\_course
-   idx\_certificates\_number
-   idx\_certificates\_status

**Recommendation Indexes**

Recommended indexes:

-   idx\_learning\_recommendations\_user\_status
-   idx\_learning\_recommendations\_profile
-   idx\_learning\_recommendations\_score
-   idx\_learning\_recommendations\_generated\_at

**18.17 Partitioning Strategy**

**Time-Based Partitioning**

Recommended monthly or quarterly partitioning for:

-   learning\_events
-   lesson\_progress
-   assessment\_attempts
-   learning\_recommendations

**Tenant-Aware Partitioning**

Large enterprise tenants with internal academies may require tenant-specific schemas, partitions, or dedicated database clusters.

**Archival Strategy**

Historical learning events, old recommendation records, expired enrollments, and retired course versions should be archived according to retention policy while preserving certificate and compliance learning records.

**18.18 ERD**

**Conceptual ERD**

TrainingProvider

├── Instructor

└── Course

├── CourseModule

│ └── Lesson

├── Assessment

│ └── AssessmentAttempt

├── CourseEnrollment

│ ├── LessonProgress

│ ├── AssessmentAttempt

│ └── LearningCertificate

└── CourseReview

LearningPath

├── LearningPathCourse

│ └── Course

└── LearningPathEnrollment

LearningRecommendation

LearningEvent

**Relationship Summary**

**Parent Entity**

**Child Entity**

**Cardinality**

Training Provider

Courses

1:N

Training Provider

Instructors

1:N

Instructor

Courses

1:N

Course

Modules

1:N

Module

Lessons

1:N

Course

Assessments

1:N

Course

Enrollments

1:N

Enrollment

Lesson Progress

1:N

Assessment

Attempts

1:N

Enrollment

Certificates

0:N

Course

Reviews

1:N

Learning Path

Learning Path Courses

1:N

Learning Path

Learning Path Enrollments

1:N

**ERD Design Notes**

The Learning Management Database is centered on the courses, course\_enrollments, and lesson\_progress entities. Courses define learning content. Enrollments define learner access. Progress records define actual learning activity. Assessments and certificates validate learning outcomes.

The design separates structured learning metadata in PostgreSQL from rich lesson content in MongoDB and media files in Object Storage. OpenSearch and vector indexes support course discovery and AI-powered recommendations. ClickHouse supports large-scale learning analytics without overloading transactional databases.

**19\. Certification & Credential Database**

**19.1 Overview**

The Certification & Credential Database manages verified credentials, professional certifications, digital badges, licenses, accreditation records, credential verification, issuer records, credential lifecycle events, and future blockchain-backed proof of qualifications within Kaziforce.

The Certification & Credential Service owns this database. It supports trust, compliance, employability, regulated professional verification, workforce eligibility, marketplace ranking, AI matching, and employer due diligence.

This service is separate from the Learning Management Service. The Learning Service may issue course completion certificates, while the Certification & Credential Service manages trusted credential validation, credential ownership, issuer verification, professional licensing, and credential portability.

**Primary Responsibilities**

The database supports:

-   Credential catalog management
-   Issuer management
-   Professional credential records
-   Certificate verification
-   License verification
-   Digital badges
-   Accreditation records
-   Credential expiry tracking
-   Credential revocation
-   Blockchain credential references
-   QR code verification
-   Employer credential checks
-   AI matching signals
-   Credential audit history

**Primary Data Stores**

**Data Store**

**Purpose**

PostgreSQL

Credential records, issuers, verification status, licenses, badges

Object Storage

Certificate files, scanned credentials, verification documents

MongoDB

Parsed credential metadata and external verification payloads

OpenSearch

Credential search and discovery

Vector Store

Semantic credential matching

Kafka

Credential events and downstream synchronization

ClickHouse

Credential analytics and compliance reporting

**19.2 Credential Issuers**

**Overview**

Credential Issuers are organizations authorized to issue certifications, licenses, academic credentials, professional memberships, training certificates, or digital badges.

Examples include:

-   Universities
-   Colleges
-   Professional bodies
-   Regulatory authorities
-   Training providers
-   Employers
-   Government agencies
-   Certification bodies
-   International accreditation bodies

**Suggested Table: credential\_issuers**

**Column**

**Data Type**

**Description**

issuer\_id

UUID

Primary issuer identifier

tenant\_id

UUID

Tenant identifier

organization\_id

UUID

Optional linked organization

issuer\_name

VARCHAR(255)

Official issuer name

issuer\_type

VARCHAR(100)

University, Regulator, Employer, ProfessionalBody, TrainingProvider

country\_code

CHAR(2)

Issuer country

registration\_number

VARCHAR(120)

Legal or accreditation number

website\_url

TEXT

Official website

contact\_email

VARCHAR(255)

Official contact email

verification\_endpoint\_url

TEXT

Optional API verification endpoint

public\_key

TEXT

Optional public key for signed credentials

issuer\_status

VARCHAR(50)

Pending, Verified, Suspended, Rejected

trust\_level

VARCHAR(50)

Low, Medium, High, Authoritative

metadata

JSONB

Flexible issuer metadata

verified\_by\_user\_id

UUID

Verifier user

verified\_at

TIMESTAMPTZ

Verification timestamp

created\_at

TIMESTAMPTZ

Creation timestamp

updated\_at

TIMESTAMPTZ

Update timestamp

**Design Notes**

Issuer verification is critical because credential trust depends on issuer authenticity. Only verified issuers should be allowed to issue trusted platform credentials.

**19.3 Credential Catalog**

**Overview**

The Credential Catalog defines known credential types that may be attached to professional profiles, jobs, learning records, and regulated workforce requirements.

**Suggested Table: credential\_catalog**

**Column**

**Data Type**

**Description**

credential\_catalog\_id

UUID

Primary catalog identifier

tenant\_id

UUID

Tenant identifier

issuer\_id

UUID

Optional issuer reference

credential\_name

VARCHAR(255)

Credential name

credential\_code

VARCHAR(120)

Internal credential code

credential\_type

VARCHAR(100)

Certificate, License, Degree, Diploma, Badge, Membership

category

VARCHAR(120)

Credential category

subcategory

VARCHAR(120)

Credential subcategory

description

TEXT

Credential description

validity\_period\_months

INTEGER

Default validity period

requires\_expiry\_date

BOOLEAN

Whether expiry is mandatory

requires\_license\_number

BOOLEAN

Whether license number is required

verification\_method

VARCHAR(100)

Manual, API, QR, Blockchain, IssuerConfirmation

lifecycle\_status

VARCHAR(50)

Active, Inactive, Archived

metadata

JSONB

Flexible metadata

created\_at

TIMESTAMPTZ

Creation timestamp

updated\_at

TIMESTAMPTZ

Update timestamp

**Design Notes**

The catalog reduces duplication and supports consistent credential names across the platform. Free-text credentials may be allowed, but verified credentials should map to catalog entries.

**19.4 Professional Credentials**

**Overview**

Professional Credentials represent certifications, licenses, degrees, diplomas, badges, and professional memberships claimed or verified for a professional profile.

**Suggested Table: professional\_credentials**

**Column**

**Data Type**

**Description**

professional\_credential\_id

UUID

Primary credential identifier

tenant\_id

UUID

Tenant identifier

professional\_profile\_id

UUID

Profile Service reference

user\_id

UUID

Identity Service user reference

credential\_catalog\_id

UUID

Optional catalog reference

issuer\_id

UUID

Issuer reference

credential\_title

VARCHAR(255)

Credential title

credential\_type

VARCHAR(100)

Certificate, License, Degree, Diploma, Badge, Membership

credential\_number

VARCHAR(150)

Certificate or license number

issue\_date

DATE

Issue date

expiry\_date

DATE

Expiry date

is\_lifetime\_valid

BOOLEAN

Lifetime validity flag

credential\_status

VARCHAR(50)

Active, Expired, Suspended, Revoked

verification\_status

VARCHAR(50)

Unverified, Pending, Verified, Rejected, Expired

verification\_score

NUMERIC(8,4)

Confidence score

document\_object\_key

TEXT

Uploaded document reference

credential\_url

TEXT

External verification URL

qr\_code\_object\_key

TEXT

QR code image reference

public\_verification\_code

VARCHAR(120)

Public verification code

metadata

JSONB

Flexible credential metadata

created\_at

TIMESTAMPTZ

Creation timestamp

updated\_at

TIMESTAMPTZ

Update timestamp

deleted\_at

TIMESTAMPTZ

Soft delete timestamp

version

INTEGER

Optimistic locking version

**Design Notes**

Professional credentials should never be physically deleted where they have been used in hiring, compliance, or matching decisions. They should be soft-deleted, expired, revoked, or archived depending on the lifecycle event.

**19.5 Credential Verification**

**Overview**

Credential Verification records how a professional credential was validated. Verification may be manual, automated, issuer-confirmed, API-based, QR-based, blockchain-based, or document-review based.

**Suggested Table: credential\_verifications**

**Column**

**Data Type**

**Description**

verification\_id

UUID

Primary verification identifier

tenant\_id

UUID

Tenant identifier

professional\_credential\_id

UUID

Credential reference

verification\_method

VARCHAR(100)

Manual, API, QR, Blockchain, IssuerConfirmation

verification\_status

VARCHAR(50)

Pending, Verified, Rejected, Failed

verified\_by\_user\_id

UUID

Internal verifier

verifying\_organization\_id

UUID

Verifying organization

external\_reference

VARCHAR(255)

External verification reference

verification\_response

JSONB

Raw or normalized verification payload

verification\_notes

TEXT

Verifier notes

confidence\_score

NUMERIC(8,4)

Confidence

verified\_at

TIMESTAMPTZ

Verification timestamp

expires\_at

TIMESTAMPTZ

Verification expiry

created\_at

TIMESTAMPTZ

Creation timestamp

**Suggested Table: credential\_verification\_requests**

**Column**

**Data Type**

**Description**

verification\_request\_id

UUID

Primary request identifier

tenant\_id

UUID

Tenant identifier

professional\_credential\_id

UUID

Credential

requested\_by\_user\_id

UUID

Requester

requested\_by\_organization\_id

UUID

Requesting organization

request\_reason

VARCHAR(120)

Hiring, Compliance, ProfileVerification, Renewal

request\_status

VARCHAR(50)

Submitted, InReview, Completed, Cancelled

priority

VARCHAR(50)

Low, Normal, High, Urgent

submitted\_at

TIMESTAMPTZ

Submission timestamp

completed\_at

TIMESTAMPTZ

Completion timestamp

metadata

JSONB

Flexible metadata

**Design Notes**

Each verification attempt should be stored as an immutable record. A credential may have multiple verification attempts over time.

**19.6 Licenses**

**Overview**

Licenses represent legal authorization to practice regulated work. Examples include medical licenses, engineering licenses, legal practice certificates, accounting licenses, aviation licenses, security licenses, and teaching licenses.

**Suggested Table: professional\_licenses**

**Column**

**Data Type**

**Description**

professional\_license\_id

UUID

Primary license identifier

tenant\_id

UUID

Tenant identifier

professional\_profile\_id

UUID

Profile reference

user\_id

UUID

User reference

issuer\_id

UUID

Licensing authority

license\_name

VARCHAR(255)

License name

license\_number

VARCHAR(150)

License number

profession\_category

VARCHAR(120)

Medicine, Law, Engineering, Accounting

issuing\_country\_code

CHAR(2)

Country of issue

jurisdiction

VARCHAR(150)

State, county, region, or board

issue\_date

DATE

Issue date

expiry\_date

DATE

Expiry date

license\_status

VARCHAR(50)

Active, Expired, Suspended, Revoked

verification\_status

VARCHAR(50)

Pending, Verified, Rejected

practice\_restrictions

JSONB

Restrictions or conditions

document\_object\_key

TEXT

License document

metadata

JSONB

Flexible metadata

created\_at

TIMESTAMPTZ

Creation timestamp

updated\_at

TIMESTAMPTZ

Update timestamp

**Design Notes**

Licenses should support jurisdiction-level validation. A license valid in one country or board may not authorize work elsewhere.

**19.7 Digital Badges**

**Overview**

Digital Badges represent verifiable micro-credentials awarded for achievements, completed skills, verified competencies, learning milestones, employer endorsements, or platform-recognized achievements.

**Suggested Table: digital\_badges**

**Column**

**Data Type**

**Description**

badge\_id

UUID

Primary badge identifier

tenant\_id

UUID

Tenant identifier

issuer\_id

UUID

Badge issuer

badge\_name

VARCHAR(255)

Badge name

badge\_description

TEXT

Badge description

badge\_category

VARCHAR(120)

Skill, Achievement, Compliance, Learning

badge\_image\_object\_key

TEXT

Badge image

criteria

JSONB

Badge criteria

validity\_period\_months

INTEGER

Validity period

lifecycle\_status

VARCHAR(50)

Active, Inactive, Archived

created\_at

TIMESTAMPTZ

Creation timestamp

updated\_at

TIMESTAMPTZ

Update timestamp

**Suggested Table: professional\_badges**

**Column**

**Data Type**

**Description**

professional\_badge\_id

UUID

Primary professional badge

tenant\_id

UUID

Tenant identifier

badge\_id

UUID

Badge reference

professional\_profile\_id

UUID

Profile reference

user\_id

UUID

User reference

awarded\_by\_user\_id

UUID

Awarding user

award\_reason

TEXT

Reason for award

issued\_at

TIMESTAMPTZ

Issue timestamp

expires\_at

TIMESTAMPTZ

Expiry timestamp

badge\_status

VARCHAR(50)

Active, Expired, Revoked

verification\_url

TEXT

Public verification URL

metadata

JSONB

Flexible metadata

**Design Notes**

Badges should be lightweight and shareable while preserving issuer trust, issuance criteria, expiry rules, and revocation history.

**19.8 Accreditation Records**

**Overview**

Accreditation Records confirm that institutions, training providers, programs, or credential issuers are recognized by an authority.

**Suggested Table: accreditation\_records**

**Column**

**Data Type**

**Description**

accreditation\_id

UUID

Primary accreditation identifier

tenant\_id

UUID

Tenant identifier

issuer\_id

UUID

Credential issuer

accrediting\_body\_name

VARCHAR(255)

Accrediting authority

accreditation\_number

VARCHAR(150)

Accreditation reference

accreditation\_scope

TEXT

Scope of accreditation

country\_code

CHAR(2)

Country

issue\_date

DATE

Issue date

expiry\_date

DATE

Expiry date

accreditation\_status

VARCHAR(50)

Active, Expired, Suspended, Revoked

evidence\_object\_key

TEXT

Supporting evidence

verification\_status

VARCHAR(50)

Pending, Verified, Rejected

metadata

JSONB

Flexible metadata

created\_at

TIMESTAMPTZ

Creation timestamp

updated\_at

TIMESTAMPTZ

Update timestamp

**19.9 Blockchain Credential References**

**Overview**

Kaziforce may support blockchain-backed credentials or decentralized identifiers in future versions. The database stores references to blockchain proofs while avoiding unnecessary duplication of on-chain data.

**Suggested Table: blockchain\_credential\_references**

**Column**

**Data Type**

**Description**

blockchain\_reference\_id

UUID

Primary blockchain reference

tenant\_id

UUID

Tenant identifier

professional\_credential\_id

UUID

Credential reference

blockchain\_network

VARCHAR(120)

Ethereum, Polygon, Hyperledger, Other

transaction\_hash

VARCHAR(255)

Blockchain transaction hash

smart\_contract\_address

VARCHAR(255)

Contract address

token\_id

VARCHAR(255)

NFT or credential token ID

decentralized\_identifier

TEXT

DID reference

proof\_type

VARCHAR(100)

VerifiableCredential, NFT, HashAnchor

proof\_payload

JSONB

Proof metadata

verification\_status

VARCHAR(50)

Pending, Verified, Failed

anchored\_at

TIMESTAMPTZ

Blockchain anchoring timestamp

created\_at

TIMESTAMPTZ

Creation timestamp

**Design Notes**

Blockchain references should supplement, not replace, internal credential records. The authoritative platform state remains in PostgreSQL, while blockchain references provide external proof and portability.

**19.10 QR Code Verification**

**Overview**

QR Code Verification enables employers, clients, institutions, and third parties to verify credential authenticity quickly.

**Suggested Table: credential\_qr\_codes**

**Column**

**Data Type**

**Description**

qr\_code\_id

UUID

Primary QR identifier

tenant\_id

UUID

Tenant identifier

professional\_credential\_id

UUID

Credential reference

public\_verification\_code

VARCHAR(120)

Public verification code

verification\_url

TEXT

Public verification URL

qr\_code\_object\_key

TEXT

Stored QR image

status

VARCHAR(50)

Active, Revoked, Expired

generated\_at

TIMESTAMPTZ

Generation timestamp

expires\_at

TIMESTAMPTZ

Optional expiry timestamp

revoked\_at

TIMESTAMPTZ

Revocation timestamp

**Suggested Table: credential\_verification\_access\_logs**

**Column**

**Data Type**

**Description**

access\_log\_id

UUID

Primary access log

tenant\_id

UUID

Tenant identifier

professional\_credential\_id

UUID

Credential

public\_verification\_code

VARCHAR(120)

Verification code

requester\_ip

INET

Requester IP

requester\_user\_agent

TEXT

User agent

requester\_country\_code

CHAR(2)

Derived country

access\_result

VARCHAR(50)

Valid, Expired, Revoked, NotFound

accessed\_at

TIMESTAMPTZ

Access timestamp

**Design Notes**

Public verification pages should expose only minimum required credential data. Sensitive personal data must not be displayed without consent.

**19.11 Credential Search Model**

**Overview**

Credential Search enables recruiters, employers, compliance teams, and AI services to discover verified professionals based on credentials, licenses, issuers, categories, validity, and trust level.

**OpenSearch Index: credentials\_v1**

**Field**

**Type**

**Purpose**

professional\_credential\_id

keyword

Credential identifier

tenant\_id

keyword

Tenant filter

professional\_profile\_id

keyword

Profile filter

credential\_title

text/keyword

Credential search

credential\_type

keyword

Type filtering

issuer\_name

text/keyword

Issuer search

category

keyword

Category filtering

issue\_date

date

Issue date filter

expiry\_date

date

Expiry filter

credential\_status

keyword

Active/expired filter

verification\_status

keyword

Verification filter

trust\_level

keyword

Issuer trust filtering

country\_code

keyword

Country filtering

embedding\_vector

dense\_vector

Semantic matching

**Ranking Signals**

Credential ranking may consider:

-   Verification status
-   Issuer trust level
-   Credential recency
-   Expiry status
-   Relevance to job requirements
-   License jurisdiction
-   Credential category
-   AI semantic similarity
-   Employer preference
-   Regulatory requirement match

**19.12 Credential Analytics**

**Overview**

Credential Analytics provides insights into credential coverage, verification volume, compliance readiness, professional trust signals, credential expiry risks, and workforce qualification trends.

**Suggested Table: credential\_events**

**Column**

**Data Type**

**Description**

credential\_event\_id

UUID

Primary event identifier

tenant\_id

UUID

Tenant identifier

event\_type

VARCHAR(120)

CredentialAdded, Verified, Rejected, Expired, Revoked

professional\_credential\_id

UUID

Credential reference

professional\_profile\_id

UUID

Profile reference

issuer\_id

UUID

Issuer reference

event\_payload

JSONB

Event details

occurred\_at

TIMESTAMPTZ

Business event timestamp

created\_at

TIMESTAMPTZ

Storage timestamp

**Key Metrics**

-   Credentials uploaded
-   Credentials verified
-   Verification approval rate
-   Verification rejection rate
-   Average verification turnaround time
-   Expired credentials
-   Credentials expiring soon
-   Verified professionals by category
-   Top credential issuers
-   Regulated license coverage
-   QR verification count
-   Blockchain-backed credential count
-   Credential fraud detection cases

**Recommended ClickHouse Fact Tables**

-   fact\_credential\_verification
-   fact\_credential\_expiry
-   fact\_professional\_credential\_coverage
-   fact\_issuer\_trust
-   fact\_qr\_verification\_access
-   fact\_license\_compliance

**19.13 Constraints**

**Primary Key Constraints**

Core tables use UUID primary keys:

-   issuer\_id
-   credential\_catalog\_id
-   professional\_credential\_id
-   verification\_id
-   verification\_request\_id
-   professional\_license\_id
-   badge\_id
-   professional\_badge\_id
-   accreditation\_id
-   blockchain\_reference\_id
-   qr\_code\_id

**Foreign Key Constraints**

Recommended internal foreign keys:

-   credential\_catalog.issuer\_id → credential\_issuers.issuer\_id
-   professional\_credentials.credential\_catalog\_id → credential\_catalog.credential\_catalog\_id
-   professional\_credentials.issuer\_id → credential\_issuers.issuer\_id
-   credential\_verifications.professional\_credential\_id → professional\_credentials.professional\_credential\_id
-   credential\_verification\_requests.professional\_credential\_id → professional\_credentials.professional\_credential\_id
-   professional\_licenses.issuer\_id → credential\_issuers.issuer\_id
-   digital\_badges.issuer\_id → credential\_issuers.issuer\_id
-   professional\_badges.badge\_id → digital\_badges.badge\_id
-   accreditation\_records.issuer\_id → credential\_issuers.issuer\_id
-   blockchain\_credential\_references.professional\_credential\_id → professional\_credentials.professional\_credential\_id
-   credential\_qr\_codes.professional\_credential\_id → professional\_credentials.professional\_credential\_id

Cross-service identifiers such as user\_id, professional\_profile\_id, and organization\_id should be validated through APIs or read models.

**Check Constraints**

Recommended checks:

-   expiry\_date IS NULL OR expiry\_date >= issue\_date
-   verification\_score BETWEEN 0 AND 1
-   confidence\_score BETWEEN 0 AND 1
-   validity\_period\_months IS NULL OR validity\_period\_months >= 0
-   credential\_status IN ('ACTIVE', 'EXPIRED', 'SUSPENDED', 'REVOKED')
-   verification\_status IN ('UNVERIFIED', 'PENDING', 'VERIFIED', 'REJECTED', 'EXPIRED')

**Unique Constraints**

Recommended unique constraints:

-   Unique issuer registration number per country.
-   Unique credential code per issuer.
-   Unique credential number per issuer where applicable.
-   Unique active QR code per credential.
-   Unique blockchain transaction reference per credential.
-   Unique active badge award per professional and badge unless repeatable.

**19.14 Indexing Strategy**

**Issuer Indexes**

Recommended indexes:

-   idx\_credential\_issuers\_name
-   idx\_credential\_issuers\_country
-   idx\_credential\_issuers\_status
-   idx\_credential\_issuers\_trust\_level

**Credential Catalog Indexes**

Recommended indexes:

-   idx\_credential\_catalog\_issuer
-   idx\_credential\_catalog\_type
-   idx\_credential\_catalog\_category
-   idx\_credential\_catalog\_status

**Professional Credential Indexes**

Recommended indexes:

-   idx\_professional\_credentials\_profile
-   idx\_professional\_credentials\_user
-   idx\_professional\_credentials\_issuer
-   idx\_professional\_credentials\_type
-   idx\_professional\_credentials\_status
-   idx\_professional\_credentials\_verification\_status
-   idx\_professional\_credentials\_expiry\_date
-   idx\_professional\_credentials\_public\_code

**Verification Indexes**

Recommended indexes:

-   idx\_credential\_verifications\_credential
-   idx\_credential\_verifications\_status
-   idx\_credential\_verifications\_method
-   idx\_credential\_verifications\_verified\_at
-   idx\_verification\_requests\_status\_priority

**License Indexes**

Recommended indexes:

-   idx\_professional\_licenses\_profile
-   idx\_professional\_licenses\_number
-   idx\_professional\_licenses\_jurisdiction
-   idx\_professional\_licenses\_status
-   idx\_professional\_licenses\_expiry\_date

**QR and Access Log Indexes**

Recommended indexes:

-   idx\_credential\_qr\_codes\_public\_code
-   idx\_credential\_qr\_codes\_status
-   idx\_credential\_access\_logs\_credential
-   idx\_credential\_access\_logs\_accessed\_at

**19.15 Partitioning Strategy**

**Time-Based Partitioning**

Recommended monthly or quarterly partitioning for high-volume tables:

-   credential\_events
-   credential\_verification\_access\_logs
-   credential\_verifications
-   credential\_verification\_requests

**Expiry-Based Optimization**

Indexes on expiry\_date should support:

-   Credentials expiring in 30 days.
-   Expired credentials.
-   Active credentials with no expiry.
-   License renewal reminders.

**Archival Strategy**

Expired, revoked, or superseded credentials should remain available for historical audit, but they may be moved to archive storage after the operational retention period. Verification access logs should be retained according to compliance and privacy policy.

**19.16 ERD**

**Conceptual ERD**

CredentialIssuer

├── CredentialCatalog

├── ProfessionalCredential

│ ├── CredentialVerification

│ ├── CredentialVerificationRequest

│ ├── CredentialQRCode

│ │ └── CredentialVerificationAccessLog

│ └── BlockchainCredentialReference

├── ProfessionalLicense

├── DigitalBadge

│ └── ProfessionalBadge

└── AccreditationRecord

CredentialEvent

**Relationship Summary**

**Parent Entity**

**Child Entity**

**Cardinality**

Credential Issuer

Credential Catalog Items

1:N

Credential Issuer

Professional Credentials

1:N

Credential Catalog

Professional Credentials

1:N

Professional Credential

Credential Verifications

1:N

Professional Credential

Verification Requests

1:N

Professional Credential

QR Codes

1:N

QR Code

Verification Access Logs

1:N

Professional Credential

Blockchain References

0:N

Credential Issuer

Professional Licenses

1:N

Credential Issuer

Digital Badges

1:N

Digital Badge

Professional Badges

1:N

Credential Issuer

Accreditation Records

1:N

**ERD Design Notes**

The Certification & Credential Database is centered on trusted credential ownership and verification. credential\_issuers define who can issue trusted credentials. credential\_catalog defines known credential types. professional\_credentials, professional\_licenses, and professional\_badges represent what a professional owns or claims. Verification records provide proof, status, and auditability.

The model supports manual verification, issuer verification, QR verification, API verification, and future blockchain-backed credential proofs. It also preserves credential history for trust, compliance, matching, and audit purposes.

**20\. AI Agent Database**

**20.1 Overview**

The AI Agent Database manages the configuration, lifecycle, identity, capabilities, assignments, execution history, memory references, governance controls, and performance records of AI agents within Kaziforce.

AI agents are digital workforce participants that can support users, organizations, professionals, recruiters, HR teams, finance teams, support teams, and platform operations. They may assist with matching, onboarding, candidate screening, customer support, learning recommendations, workforce planning, document review, contract drafting, analytics, and workflow automation.

The AI Agent Service owns this database. It integrates with the Identity Service for machine identity, the AI Matching Engine for recommendations, the Knowledge Base for retrieval, the Messaging Service for conversations, the Workflow Engine for task execution, and the Audit Service for governance.

**20.2 AI Agents**

**Overview**

An AI Agent represents an autonomous or semi-autonomous software worker configured to perform specific tasks within approved permissions and policy boundaries.

**Suggested Table: ai\_agents**

**Column**

**Data Type**

**Description**

ai\_agent\_id

UUID

Primary AI agent identifier

tenant\_id

UUID

Tenant identifier

organization\_id

UUID

Optional owning organization

service\_account\_id

UUID

Linked machine identity

agent\_code

VARCHAR(120)

Unique agent code

agent\_name

VARCHAR(180)

Display name

agent\_type

VARCHAR(100)

Recruiter, HR, Finance, Support, Learning, Analytics, Workflow

agent\_description

TEXT

Purpose and responsibilities

lifecycle\_status

VARCHAR(50)

Draft, Active, Paused, Suspended, Retired

autonomy\_level

VARCHAR(50)

Assistive, Supervised, Autonomous

default\_model\_id

UUID

Default AI model

knowledge\_scope

VARCHAR(80)

Public, Tenant, Organization, Restricted

owner\_user\_id

UUID

Responsible human owner

created\_by\_user\_id

UUID

Creator

metadata

JSONB

Flexible metadata

created\_at

TIMESTAMPTZ

Creation timestamp

updated\_at

TIMESTAMPTZ

Update timestamp

retired\_at

TIMESTAMPTZ

Retirement timestamp

deleted\_at

TIMESTAMPTZ

Soft delete timestamp

version

INTEGER

Optimistic locking version

**Design Notes**

AI agents should not operate without a responsible human owner or organizational accountability context. Agent records should preserve configuration history for auditability.

**20.3 Agent Capabilities**

**Overview**

Agent capabilities define what an AI agent is allowed and technically configured to do.

Examples include:

-   Search professionals
-   Rank candidates
-   Draft job descriptions
-   Screen applications
-   Summarize conversations
-   Create support replies
-   Recommend courses
-   Analyze timesheets
-   Generate reports
-   Draft contracts
-   Execute workflow actions

**Suggested Table: agent\_capabilities**

**Column**

**Data Type**

**Description**

capability\_id

UUID

Primary capability identifier

capability\_code

VARCHAR(120)

Unique capability code

capability\_name

VARCHAR(180)

Capability name

capability\_category

VARCHAR(100)

Search, Matching, HR, Finance, Support, Learning, Workflow

description

TEXT

Capability description

risk\_level

VARCHAR(50)

Low, Medium, High, Critical

requires\_human\_approval

BOOLEAN

Human approval requirement

is\_active

BOOLEAN

Active status

metadata

JSONB

Flexible metadata

created\_at

TIMESTAMPTZ

Creation timestamp

**Suggested Table: agent\_capability\_assignments**

**Column**

**Data Type**

**Description**

agent\_capability\_assignment\_id

UUID

Primary identifier

tenant\_id

UUID

Tenant identifier

ai\_agent\_id

UUID

AI agent reference

capability\_id

UUID

Capability reference

permission\_scope

VARCHAR(80)

Tenant, Organization, Project, User, ReadOnly

approval\_required

BOOLEAN

Override approval requirement

status

VARCHAR(50)

Active, Suspended, Revoked

assigned\_by\_user\_id

UUID

Assigning user

assigned\_at

TIMESTAMPTZ

Assignment timestamp

revoked\_at

TIMESTAMPTZ

Revocation timestamp

**20.4 Agent Tools**

**Overview**

Agent tools represent external or internal actions that an AI agent can call. Tool access must be governed because tools may read data, write data, send messages, create records, or trigger financial workflows.

**Tool Examples**

-   Search profiles
-   Read job record
-   Draft message
-   Create ticket
-   Generate report
-   Schedule interview
-   Send recommendation
-   Summarize document
-   Retrieve knowledge article
-   Update workflow status

**Suggested Table: agent\_tools**

**Column**

**Data Type**

**Description**

tool\_id

UUID

Primary tool identifier

tool\_code

VARCHAR(120)

Unique tool code

tool\_name

VARCHAR(180)

Tool name

tool\_type

VARCHAR(80)

API, Function, Retrieval, Workflow, Connector

owning\_service

VARCHAR(120)

Service that owns the tool

endpoint\_reference

TEXT

API or function reference

input\_schema

JSONB

Tool input schema

output\_schema

JSONB

Tool output schema

risk\_level

VARCHAR(50)

Low, Medium, High, Critical

requires\_approval

BOOLEAN

Approval before execution

timeout\_seconds

INTEGER

Tool timeout

is\_active

BOOLEAN

Active status

created\_at

TIMESTAMPTZ

Creation timestamp

updated\_at

TIMESTAMPTZ

Update timestamp

**Suggested Table: agent\_tool\_permissions**

**Column**

**Data Type**

**Description**

agent\_tool\_permission\_id

UUID

Primary identifier

tenant\_id

UUID

Tenant identifier

ai\_agent\_id

UUID

AI agent

tool\_id

UUID

Tool

permission\_level

VARCHAR(50)

Read, Execute, Write, Admin

allowed\_resource\_scope

JSONB

Resource access scope

rate\_limit\_per\_hour

INTEGER

Tool call limit

requires\_human\_approval

BOOLEAN

Human approval override

status

VARCHAR(50)

Active, Suspended, Revoked

granted\_by\_user\_id

UUID

User who granted permission

granted\_at

TIMESTAMPTZ

Grant timestamp

revoked\_at

TIMESTAMPTZ

Revocation timestamp

**Design Notes**

Tool permissions must be explicit. No AI agent should inherit broad system permissions automatically from its owner.

**20.5 Agent Prompts**

**Overview**

Agent prompts define system instructions, task instructions, guardrails, output formats, and domain-specific behavior for AI agents.

**Suggested Table: agent\_prompt\_templates**

**Column**

**Data Type**

**Description**

prompt\_template\_id

UUID

Primary prompt template

tenant\_id

UUID

Tenant identifier

ai\_agent\_id

UUID

AI agent

prompt\_type

VARCHAR(80)

System, Task, Guardrail, OutputFormat

prompt\_name

VARCHAR(180)

Prompt name

prompt\_content

TEXT

Prompt content

prompt\_version

INTEGER

Prompt version

language\_code

VARCHAR(10)

Language

approval\_status

VARCHAR(50)

Draft, Approved, Deprecated

approved\_by\_user\_id

UUID

Approver

approved\_at

TIMESTAMPTZ

Approval timestamp

created\_at

TIMESTAMPTZ

Creation timestamp

updated\_at

TIMESTAMPTZ

Update timestamp

**Design Notes**

Production prompts should be versioned and approved. Prompt changes can materially affect AI behavior and must be traceable.

**20.6 Agent Assignments**

**Overview**

Agent assignments define where and how an AI agent is deployed. An agent may be assigned to a user, organization, team, project, workflow, marketplace function, or support queue.

**Suggested Table: agent\_assignments**

**Column**

**Data Type**

**Description**

agent\_assignment\_id

UUID

Primary assignment identifier

tenant\_id

UUID

Tenant identifier

ai\_agent\_id

UUID

AI agent

assignment\_type

VARCHAR(80)

User, Organization, Team, Project, Workflow, SupportQueue

assignment\_target\_id

UUID

Target entity

assigned\_role

VARCHAR(120)

Assistant, Screener, Analyst, Advisor, Reviewer

assignment\_status

VARCHAR(50)

Active, Paused, Completed, Revoked

start\_date

DATE

Assignment start

end\_date

DATE

Assignment end

assigned\_by\_user\_id

UUID

Assigning user

created\_at

TIMESTAMPTZ

Creation timestamp

updated\_at

TIMESTAMPTZ

Update timestamp

**20.7 Agent Task Execution**

**Overview**

Agent Task Execution records tasks performed by AI agents. It provides traceability for agent actions, outcomes, approvals, errors, and human intervention.

**Suggested Table: agent\_tasks**

**Column**

**Data Type**

**Description**

agent\_task\_id

UUID

Primary task identifier

tenant\_id

UUID

Tenant identifier

ai\_agent\_id

UUID

AI agent

assignment\_id

UUID

Optional agent assignment

requested\_by\_user\_id

UUID

Requesting user

task\_type

VARCHAR(120)

ScreenCandidate, DraftJob, SummarizeMeeting, RecommendCourse

task\_status

VARCHAR(50)

Queued, Running, AwaitingApproval, Completed, Failed, Cancelled

input\_payload

JSONB

Task input

output\_payload

JSONB

Task output

confidence\_score

NUMERIC(8,4)

Output confidence

risk\_level

VARCHAR(50)

Low, Medium, High, Critical

requires\_approval

BOOLEAN

Approval required

approved\_by\_user\_id

UUID

Approver

approved\_at

TIMESTAMPTZ

Approval timestamp

started\_at

TIMESTAMPTZ

Start timestamp

completed\_at

TIMESTAMPTZ

Completion timestamp

failure\_reason

TEXT

Failure details

metadata

JSONB

Extra metadata

**Suggested Table: agent\_tool\_executions**

**Column**

**Data Type**

**Description**

tool\_execution\_id

UUID

Primary execution identifier

tenant\_id

UUID

Tenant identifier

agent\_task\_id

UUID

Agent task

ai\_agent\_id

UUID

AI agent

tool\_id

UUID

Tool

input\_payload

JSONB

Tool input

output\_payload

JSONB

Tool output

execution\_status

VARCHAR(50)

Started, Completed, Failed, Blocked

latency\_ms

INTEGER

Execution latency

error\_message

TEXT

Error details

started\_at

TIMESTAMPTZ

Execution start

completed\_at

TIMESTAMPTZ

Execution completion

**Design Notes**

All agent actions that read sensitive data, write data, send messages, approve actions, or trigger financial workflows must be logged.

**20.8 Agent Memory References**

**Overview**

AI Agent memory may be stored in the AI Memory Database or vector store. The AI Agent Database stores memory references and access scopes, not necessarily all memory content.

**Suggested Table: agent\_memory\_links**

**Column**

**Data Type**

**Description**

memory\_link\_id

UUID

Primary memory link

tenant\_id

UUID

Tenant identifier

ai\_agent\_id

UUID

AI agent

memory\_scope

VARCHAR(80)

User, Organization, Project, Conversation, Global

memory\_store\_type

VARCHAR(80)

MongoDB, VectorStore, ObjectStorage

memory\_reference\_id

VARCHAR(180)

Memory record reference

access\_level

VARCHAR(50)

Read, Write, ReadWrite

retention\_policy\_id

UUID

Retention policy

status

VARCHAR(50)

Active, Revoked, Expired

created\_at

TIMESTAMPTZ

Creation timestamp

expires\_at

TIMESTAMPTZ

Expiry timestamp

**20.9 Agent Governance and Guardrails**

**Overview**

Agent governance defines policies that restrict and monitor AI behavior. This includes safety rules, approval requirements, allowed domains, prohibited actions, risk classification, and escalation paths.

**Suggested Table: agent\_governance\_policies**

**Column**

**Data Type**

**Description**

governance\_policy\_id

UUID

Primary policy identifier

tenant\_id

UUID

Tenant identifier

policy\_name

VARCHAR(180)

Policy name

policy\_type

VARCHAR(80)

Safety, Privacy, ToolUse, HumanApproval, DataAccess

policy\_rules

JSONB

Machine-readable rules

severity

VARCHAR(50)

Low, Medium, High, Critical

lifecycle\_status

VARCHAR(50)

Draft, Active, Deprecated

created\_by\_user\_id

UUID

Creator

approved\_by\_user\_id

UUID

Approver

approved\_at

TIMESTAMPTZ

Approval timestamp

created\_at

TIMESTAMPTZ

Creation timestamp

**Suggested Table: agent\_policy\_assignments**

**Column**

**Data Type**

**Description**

policy\_assignment\_id

UUID

Primary assignment

tenant\_id

UUID

Tenant identifier

ai\_agent\_id

UUID

AI agent

governance\_policy\_id

UUID

Governance policy

enforcement\_mode

VARCHAR(50)

Monitor, Warn, Block, RequireApproval

assigned\_at

TIMESTAMPTZ

Assignment timestamp

assigned\_by\_user\_id

UUID

Assigning user

**20.10 Agent Performance Metrics**

**Overview**

Agent Performance Metrics measure effectiveness, reliability, adoption, accuracy, task completion, latency, human override rates, and business impact.

**Suggested Table: agent\_performance\_metrics**

**Column**

**Data Type**

**Description**

metric\_id

UUID

Primary metric identifier

tenant\_id

UUID

Tenant identifier

ai\_agent\_id

UUID

AI agent

metric\_date

DATE

Metric date

tasks\_completed

INTEGER

Completed tasks

tasks\_failed

INTEGER

Failed tasks

average\_latency\_ms

INTEGER

Average execution latency

average\_confidence\_score

NUMERIC(8,4)

Average confidence

human\_approval\_rate

NUMERIC(8,4)

Approval rate

human\_override\_rate

NUMERIC(8,4)

Override rate

user\_satisfaction\_score

NUMERIC(8,4)

Feedback score

cost\_amount

NUMERIC(14,4)

Estimated AI cost

currency\_code

CHAR(3)

Cost currency

business\_impact\_score

NUMERIC(8,4)

Estimated impact

created\_at

TIMESTAMPTZ

Creation timestamp

**20.11 Agent Audit Events**

**Overview**

Agent Audit Events provide immutable records of AI behavior, policy decisions, tool usage, prompt versions, user requests, approvals, failures, and governance outcomes.

**Suggested Table: agent\_audit\_events**

**Column**

**Data Type**

**Description**

agent\_audit\_event\_id

UUID

Primary audit event

tenant\_id

UUID

Tenant identifier

ai\_agent\_id

UUID

AI agent

agent\_task\_id

UUID

Optional task

event\_type

VARCHAR(120)

TaskStarted, ToolCalled, PolicyBlocked, HumanApproved

actor\_user\_id

UUID

Human actor where applicable

event\_payload

JSONB

Event details

risk\_level

VARCHAR(50)

Low, Medium, High, Critical

occurred\_at

TIMESTAMPTZ

Business event timestamp

created\_at

TIMESTAMPTZ

Storage timestamp

**Design Notes**

Agent audit events should be append-only and protected from modification. They support safety, compliance, incident investigation, and model governance.

**20.12 Constraints**

**Primary Key Constraints**

Core tables use UUID primary keys:

-   ai\_agent\_id
-   capability\_id
-   tool\_id
-   prompt\_template\_id
-   agent\_assignment\_id
-   agent\_task\_id
-   tool\_execution\_id
-   memory\_link\_id
-   governance\_policy\_id
-   metric\_id
-   agent\_audit\_event\_id

**Foreign Key Constraints**

Recommended internal foreign keys:

-   agent\_capability\_assignments.ai\_agent\_id → ai\_agents.ai\_agent\_id
-   agent\_capability\_assignments.capability\_id → agent\_capabilities.capability\_id
-   agent\_tool\_permissions.ai\_agent\_id → ai\_agents.ai\_agent\_id
-   agent\_tool\_permissions.tool\_id → agent\_tools.tool\_id
-   agent\_prompt\_templates.ai\_agent\_id → ai\_agents.ai\_agent\_id
-   agent\_assignments.ai\_agent\_id → ai\_agents.ai\_agent\_id
-   agent\_tasks.ai\_agent\_id → ai\_agents.ai\_agent\_id
-   agent\_tool\_executions.agent\_task\_id → agent\_tasks.agent\_task\_id
-   agent\_tool\_executions.tool\_id → agent\_tools.tool\_id
-   agent\_memory\_links.ai\_agent\_id → ai\_agents.ai\_agent\_id
-   agent\_policy\_assignments.ai\_agent\_id → ai\_agents.ai\_agent\_id
-   agent\_policy\_assignments.governance\_policy\_id → agent\_governance\_policies.governance\_policy\_id
-   agent\_performance\_metrics.ai\_agent\_id → ai\_agents.ai\_agent\_id
-   agent\_audit\_events.ai\_agent\_id → ai\_agents.ai\_agent\_id

Cross-service identifiers such as organization\_id, service\_account\_id, user\_id, model\_id, project\_id, and conversation\_id should be validated through APIs or read models.

**Check Constraints**

Recommended checks:

-   autonomy\_level IN ('ASSISTIVE', 'SUPERVISED', 'AUTONOMOUS')
-   risk\_level IN ('LOW', 'MEDIUM', 'HIGH', 'CRITICAL')
-   confidence\_score BETWEEN 0 AND 1
-   rate\_limit\_per\_hour >= 0
-   timeout\_seconds > 0
-   end\_date IS NULL OR end\_date >= start\_date
-   human\_approval\_rate BETWEEN 0 AND 1
-   human\_override\_rate BETWEEN 0 AND 1

**Unique Constraints**

Recommended unique constraints:

-   Unique agent code per tenant.
-   Unique capability code.
-   Unique tool code.
-   One active tool permission per agent and tool.
-   One active capability assignment per agent and capability.
-   One active policy assignment per agent and policy.
-   One metric record per agent and date.

**20.13 Indexing Strategy**

**AI Agent Indexes**

Recommended indexes:

-   idx\_ai\_agents\_tenant\_status
-   idx\_ai\_agents\_organization
-   idx\_ai\_agents\_type
-   idx\_ai\_agents\_owner
-   idx\_ai\_agents\_service\_account

**Capability Indexes**

Recommended indexes:

-   idx\_agent\_capabilities\_code
-   idx\_agent\_capabilities\_category
-   idx\_agent\_capabilities\_risk\_level
-   idx\_agent\_capability\_assignments\_agent

**Tool Indexes**

Recommended indexes:

-   idx\_agent\_tools\_code
-   idx\_agent\_tools\_type
-   idx\_agent\_tools\_service
-   idx\_agent\_tool\_permissions\_agent
-   idx\_agent\_tool\_permissions\_tool\_status

**Task Indexes**

Recommended indexes:

-   idx\_agent\_tasks\_agent\_status
-   idx\_agent\_tasks\_requested\_by
-   idx\_agent\_tasks\_type
-   idx\_agent\_tasks\_created\_at
-   idx\_agent\_tasks\_risk\_level

**Audit Indexes**

Recommended indexes:

-   idx\_agent\_audit\_events\_agent
-   idx\_agent\_audit\_events\_task
-   idx\_agent\_audit\_events\_type
-   idx\_agent\_audit\_events\_occurred\_at
-   idx\_agent\_audit\_events\_risk\_level

**20.14 Partitioning Strategy**

**Time-Based Partitioning**

Recommended monthly or quarterly partitioning for:

-   agent\_tasks
-   agent\_tool\_executions
-   agent\_audit\_events
-   agent\_performance\_metrics

**Tenant-Aware Partitioning**

Large enterprise tenants with intensive AI usage may require tenant-based partitions or dedicated AI data stores.

**Archival Strategy**

Old task outputs, tool execution payloads, prompt traces, and audit events should be archived according to data retention and AI governance policies. Sensitive prompt and output data should be encrypted and access-controlled.

**20.15 ERD**

**Conceptual ERD**

AIAgent

├── AgentCapabilityAssignment

│ └── AgentCapability

├── AgentToolPermission

│ └── AgentTool

├── AgentPromptTemplate

├── AgentAssignment

├── AgentTask

│ └── AgentToolExecution

├── AgentMemoryLink

├── AgentPolicyAssignment

│ └── AgentGovernancePolicy

├── AgentPerformanceMetric

└── AgentAuditEvent

**Relationship Summary**

**Parent Entity**

**Child Entity**

**Cardinality**

AI Agent

Capability Assignments

1:N

Capability

Capability Assignments

1:N

AI Agent

Tool Permissions

1:N

Tool

Tool Permissions

1:N

AI Agent

Prompt Templates

1:N

AI Agent

Agent Assignments

1:N

AI Agent

Agent Tasks

1:N

Agent Task

Tool Executions

1:N

AI Agent

Memory Links

1:N

AI Agent

Policy Assignments

1:N

Governance Policy

Policy Assignments

1:N

AI Agent

Performance Metrics

1:N

AI Agent

Audit Events

1:N

**ERD Design Notes**

The AI Agent Database is centered on the ai\_agents entity. Each agent has explicit capabilities, tools, prompts, assignments, governance policies, memory references, task history, performance records, and audit events.

The design separates configuration from execution. Agent definitions, capabilities, tools, prompts, and policies define what an agent is allowed to do. Tasks, tool executions, metrics, and audit events record what the agent actually did. This separation supports security, governance, transparency, troubleshooting, and continuous improvement.

**21\. AI Memory Database**

**21.1 Overview**

The AI Memory Database manages persistent, contextual, and retrievable memory used by Kaziforce AI agents, AI assistants, recommendation engines, workflow automation, semantic search, and personalized workforce intelligence.

AI memory allows the platform to remember useful context across interactions while enforcing privacy, tenant isolation, consent, retention, access control, and auditability.

The AI Memory Service owns this database. It does not own users, profiles, jobs, contracts, or organizational records. It stores AI-optimized memory artifacts derived from authorized interactions, source events, documents, user preferences, conversations, and workflow outcomes.

**Primary Responsibilities**

The AI Memory Database supports:

-   User memory
-   Organization memory
-   Project memory
-   Conversation memory
-   AI agent memory
-   Workflow memory
-   Long-term contextual memory
-   Short-term session memory
-   Semantic retrieval
-   Vector memory search
-   Memory summarization
-   Memory consent management
-   Memory retention and deletion
-   AI personalization
-   Retrieval-Augmented Generation (RAG)

**Primary Data Stores**

**Data Store**

**Purpose**

PostgreSQL

Memory metadata, ownership, consent, retention, audit records

MongoDB

Flexible memory documents and summaries

Vector Store / pgvector

Memory embeddings and semantic retrieval

Redis

Short-term session memory and temporary AI context

Object Storage

Large memory artifacts, transcripts, source documents

OpenSearch

Full-text memory search

ClickHouse

AI memory analytics

Kafka

Memory lifecycle events

**21.2 Memory Scopes**

**Overview**

Memory scope defines who or what a memory belongs to and where it may be used. Scope is essential for privacy, authorization, and safe AI behavior.

**Supported Memory Scopes**

-   User
-   Professional Profile
-   Organization
-   Team
-   Project
-   Contract
-   Conversation
-   AI Agent
-   Workflow
-   Global Platform Knowledge

**Suggested Table: memory\_scopes**

**Column**

**Data Type**

**Description**

memory\_scope\_id

UUID

Primary scope identifier

tenant\_id

UUID

Tenant identifier

scope\_type

VARCHAR(80)

User, Organization, Project, Conversation, Agent

scope\_entity\_id

UUID

Entity that owns the memory

scope\_name

VARCHAR(180)

Human-readable scope name

access\_policy

JSONB

Access rules

retention\_policy\_id

UUID

Retention policy

lifecycle\_status

VARCHAR(50)

Active, Suspended, Archived

created\_at

TIMESTAMPTZ

Creation timestamp

updated\_at

TIMESTAMPTZ

Update timestamp

**Design Notes**

Every memory record must belong to a clearly defined scope. AI agents must not retrieve memory outside their permitted scope.

**21.3 Memory Records**

**Overview**

Memory Records represent structured metadata for AI memories. The actual flexible content may be stored in MongoDB, vector storage, or object storage depending on size and retrieval needs.

**Suggested Table: ai\_memory\_records**

**Column**

**Data Type**

**Description**

memory\_id

UUID

Primary memory identifier

tenant\_id

UUID

Tenant identifier

memory\_scope\_id

UUID

Memory scope

owner\_type

VARCHAR(80)

User, Organization, Agent, Project, Conversation

owner\_id

UUID

Owner entity reference

memory\_type

VARCHAR(80)

Preference, Fact, Summary, Interaction, Document, Task

memory\_title

VARCHAR(255)

Short memory title

memory\_summary

TEXT

Concise summary

memory\_document\_id

VARCHAR(120)

MongoDB memory document reference

source\_entity\_type

VARCHAR(80)

Conversation, Meeting, Profile, Job, Workflow

source\_entity\_id

UUID

Source entity identifier

source\_service

VARCHAR(120)

Originating service

confidence\_score

NUMERIC(8,4)

Confidence in memory accuracy

importance\_score

NUMERIC(8,4)

Importance for future retrieval

sensitivity\_level

VARCHAR(50)

Public, Internal, Confidential, Restricted

memory\_status

VARCHAR(50)

Active, Stale, Archived, Deleted

created\_by\_agent\_id

UUID

AI agent that created memory

created\_by\_user\_id

UUID

User who created or approved memory

expires\_at

TIMESTAMPTZ

Optional expiry timestamp

last\_accessed\_at

TIMESTAMPTZ

Last retrieval timestamp

created\_at

TIMESTAMPTZ

Creation timestamp

updated\_at

TIMESTAMPTZ

Update timestamp

deleted\_at

TIMESTAMPTZ

Soft delete timestamp

version

INTEGER

Optimistic locking version

**MongoDB Collection: ai\_memory\_documents**

{

"memory\_id": "uuid",

"tenant\_id": "uuid",

"memory\_scope\_id": "uuid",

"content": {

"raw\_text": "The organization prefers senior backend engineers with fintech experience.",

"structured\_facts": \[\],

"preferences": {},

"entities": \[\],

"source\_excerpts": \[\]

},

"context": {

"source\_service": "Messaging",

"source\_entity\_type": "Conversation",

"source\_entity\_id": "uuid"

},

"created\_at": "timestamp",

"updated\_at": "timestamp"

}

**Design Notes**

Sensitive memory content should be encrypted. Memories generated automatically by AI should be reviewable, explainable, and deletable under privacy controls.

**21.4 Short-Term Session Memory**

**Overview**

Short-term memory stores temporary AI context for active sessions. It is useful for chat continuity, task execution, form completion, and workflow assistance.

Redis is the preferred store because this memory is temporary and high-frequency.

**Redis Key Patterns**

ai:session:{tenant\_id}:{session\_id}

ai:agent:context:{tenant\_id}:{agent\_id}:{conversation\_id}

ai:workflow:context:{tenant\_id}:{workflow\_instance\_id}

**Suggested TTL**

-   Chat session context: 30 minutes to 24 hours
-   Workflow task context: 1 hour to 7 days
-   AI tool execution context: 5 minutes to 1 hour

**Design Notes**

Short-term memory should not be promoted to long-term memory unless policy, consent, and usefulness criteria are satisfied.

**21.5 Long-Term Memory**

**Overview**

Long-term memory stores durable information that improves future personalization, recommendations, workflow continuity, and AI assistance.

Examples include:

-   User work preferences
-   Organization hiring preferences
-   Project context
-   Communication preferences
-   Repeated recruiter instructions
-   Approved AI summaries
-   Stable business rules
-   Task outcomes

**Suggested Table: long\_term\_memory\_profiles**

**Column**

**Data Type**

**Description**

long\_term\_memory\_profile\_id

UUID

Primary identifier

tenant\_id

UUID

Tenant identifier

memory\_scope\_id

UUID

Memory scope

profile\_type

VARCHAR(80)

User, Organization, Project, Agent

profile\_entity\_id

UUID

Entity reference

summary\_document\_id

VARCHAR(120)

MongoDB summary document

memory\_count

INTEGER

Number of active memories

last\_compacted\_at

TIMESTAMPTZ

Last memory compaction

last\_retrieved\_at

TIMESTAMPTZ

Last retrieval timestamp

lifecycle\_status

VARCHAR(50)

Active, Suspended, Archived

created\_at

TIMESTAMPTZ

Creation timestamp

updated\_at

TIMESTAMPTZ

Update timestamp

**Design Notes**

Long-term memory should be compacted periodically to reduce duplication, remove stale facts, and improve retrieval quality.

**21.6 Memory Embeddings**

**Overview**

Memory embeddings enable semantic retrieval of relevant memories based on natural language queries, tasks, conversations, and AI prompts.

**Suggested Table: memory\_embeddings**

**Column**

**Data Type**

**Description**

memory\_embedding\_id

UUID

Primary embedding identifier

tenant\_id

UUID

Tenant identifier

memory\_id

UUID

Memory record

embedding\_model\_id

UUID

AI model used

embedding\_type

VARCHAR(80)

Summary, FullText, Entity, Preference

vector\_dimension

INTEGER

Vector dimension

vector\_storage\_type

VARCHAR(80)

pgvector, OpenSearch, Qdrant, Milvus, Weaviate

vector\_ref

TEXT

Vector storage reference

content\_hash

VARCHAR(128)

Hash of embedded memory content

embedding\_status

VARCHAR(50)

Active, Stale, Failed, Archived

generated\_at

TIMESTAMPTZ

Generation timestamp

expires\_at

TIMESTAMPTZ

Optional refresh expiry

**Design Notes**

Embeddings should be regenerated when memory content changes or when embedding models are upgraded.

**21.7 Memory Retrieval**

**Overview**

Memory Retrieval records how memories are retrieved and used by AI agents, AI assistants, workflows, and recommendation engines.

**Suggested Table: memory\_retrieval\_logs**

**Column**

**Data Type**

**Description**

retrieval\_id

UUID

Primary retrieval identifier

tenant\_id

UUID

Tenant identifier

ai\_agent\_id

UUID

Requesting AI agent

requesting\_user\_id

UUID

User who triggered retrieval

memory\_scope\_id

UUID

Scope searched

query\_text

TEXT

Retrieval query

query\_embedding\_id

UUID

Query embedding reference

retrieved\_memory\_ids

JSONB

Retrieved memory IDs

retrieval\_method

VARCHAR(80)

Keyword, Vector, Hybrid, RuleBased

result\_count

INTEGER

Number of memories returned

latency\_ms

INTEGER

Retrieval latency

access\_decision

VARCHAR(50)

Allowed, Blocked, PartiallyAllowed

created\_at

TIMESTAMPTZ

Retrieval timestamp

**Design Notes**

Retrieval logs support auditability, debugging, relevance tuning, and privacy investigations.

**21.8 Memory Consent and Preferences**

**Overview**

Memory consent controls whether Kaziforce AI may store, use, summarize, or retrieve memory for a user, organization, project, or conversation.

**Suggested Table: memory\_consent\_preferences**

**Column**

**Data Type**

**Description**

consent\_id

UUID

Primary consent identifier

tenant\_id

UUID

Tenant identifier

subject\_type

VARCHAR(80)

User, Organization, Project

subject\_id

UUID

Subject entity

memory\_enabled

BOOLEAN

Whether memory is enabled

allow\_personalization

BOOLEAN

Personalization consent

allow\_training\_use

BOOLEAN

Whether use in training is allowed

allow\_cross\_session\_memory

BOOLEAN

Long-term memory consent

allowed\_memory\_types

JSONB

Allowed memory categories

blocked\_memory\_types

JSONB

Disallowed memory categories

consent\_source

VARCHAR(80)

User, Admin, Policy, SystemDefault

consent\_given\_at

TIMESTAMPTZ

Consent timestamp

consent\_revoked\_at

TIMESTAMPTZ

Revocation timestamp

updated\_at

TIMESTAMPTZ

Update timestamp

**Design Notes**

Memory storage must respect consent settings. Revoked consent should trigger memory deletion or anonymization workflows where required.

**21.9 Memory Retention and Deletion**

**Overview**

Memory Retention defines how long AI memories are kept and when they are archived, compacted, anonymized, or deleted.

**Suggested Table: memory\_retention\_policies**

**Column**

**Data Type**

**Description**

retention\_policy\_id

UUID

Primary policy identifier

tenant\_id

UUID

Tenant identifier

policy\_name

VARCHAR(180)

Policy name

memory\_type

VARCHAR(80)

Preference, Fact, Summary, Interaction, Document

retention\_days

INTEGER

Retention period

auto\_delete\_enabled

BOOLEAN

Auto-delete flag

anonymize\_on\_expiry

BOOLEAN

Anonymization flag

legal\_hold\_override

BOOLEAN

Legal hold override

lifecycle\_status

VARCHAR(50)

Active, Inactive, Archived

created\_at

TIMESTAMPTZ

Creation timestamp

updated\_at

TIMESTAMPTZ

Update timestamp

**Suggested Table: memory\_deletion\_requests**

**Column**

**Data Type**

**Description**

deletion\_request\_id

UUID

Primary request identifier

tenant\_id

UUID

Tenant identifier

requested\_by\_user\_id

UUID

Requesting user

target\_scope\_type

VARCHAR(80)

User, Organization, Project, Conversation

target\_scope\_id

UUID

Target scope

deletion\_reason

VARCHAR(120)

UserRequest, ConsentRevoked, RetentionExpired

request\_status

VARCHAR(50)

Submitted, Processing, Completed, Failed

submitted\_at

TIMESTAMPTZ

Submission timestamp

completed\_at

TIMESTAMPTZ

Completion timestamp

failure\_reason

TEXT

Failure reason

**Design Notes**

Deletion must cover PostgreSQL metadata, MongoDB documents, vector embeddings, Redis cache, OpenSearch indexes, and object storage artifacts where applicable.

**21.10 Memory Summarization and Compaction**

**Overview**

Memory Summarization condenses multiple related memory records into concise summaries to improve retrieval quality and reduce storage duplication.

**Suggested Table: memory\_compaction\_jobs**

**Column**

**Data Type**

**Description**

compaction\_job\_id

UUID

Primary job identifier

tenant\_id

UUID

Tenant identifier

memory\_scope\_id

UUID

Target memory scope

ai\_model\_id

UUID

Model used

input\_memory\_ids

JSONB

Source memories

output\_memory\_id

UUID

Resulting compacted memory

compaction\_status

VARCHAR(50)

Queued, Running, Completed, Failed

compression\_ratio

NUMERIC(8,4)

Reduction ratio

quality\_score

NUMERIC(8,4)

Summary quality score

started\_at

TIMESTAMPTZ

Start timestamp

completed\_at

TIMESTAMPTZ

Completion timestamp

failure\_reason

TEXT

Failure details

**Design Notes**

Compaction should preserve important facts, source traceability, consent boundaries, and audit history.

**21.11 Memory Audit Events**

**Overview**

Memory Audit Events provide immutable records of memory creation, update, retrieval, deletion, consent changes, compaction, and policy enforcement.

**Suggested Table: memory\_audit\_events**

**Column**

**Data Type**

**Description**

memory\_audit\_event\_id

UUID

Primary audit event

tenant\_id

UUID

Tenant identifier

memory\_id

UUID

Optional memory reference

memory\_scope\_id

UUID

Memory scope

event\_type

VARCHAR(120)

Created, Retrieved, Updated, Deleted, ConsentRevoked

actor\_type

VARCHAR(80)

User, AI Agent, System, Admin

actor\_id

UUID

Actor identifier

event\_payload

JSONB

Event details

risk\_level

VARCHAR(50)

Low, Medium, High, Critical

occurred\_at

TIMESTAMPTZ

Business event time

created\_at

TIMESTAMPTZ

Storage timestamp

**Design Notes**

Audit events should be append-only and protected from modification.

**21.12 Memory Search Model**

**Overview**

Memory Search enables authorized users, AI agents, and workflows to retrieve relevant memory using keyword, filters, semantic search, and hybrid retrieval.

**OpenSearch Index: ai\_memory\_v1**

**Field**

**Type**

**Purpose**

memory\_id

keyword

Memory identifier

tenant\_id

keyword

Tenant filter

memory\_scope\_id

keyword

Scope filter

owner\_type

keyword

Owner type

owner\_id

keyword

Owner reference

memory\_type

keyword

Memory type filtering

memory\_title

text/keyword

Title search

memory\_summary

text

Full-text search

source\_service

keyword

Source filtering

sensitivity\_level

keyword

Security filtering

memory\_status

keyword

Lifecycle filtering

importance\_score

double

Ranking

confidence\_score

double

Ranking

created\_at

date

Time filtering

embedding\_vector

dense\_vector

Semantic retrieval

**Design Notes**

Search must enforce access control before returning results. Restricted memories must never be surfaced to unauthorized agents or users.

**21.13 Memory Analytics**

**Overview**

Memory Analytics measures AI memory quality, usage, relevance, retrieval performance, consent status, retention actions, and AI personalization effectiveness.

**Suggested Table: memory\_events**

**Column**

**Data Type**

**Description**

memory\_event\_id

UUID

Primary analytics event

tenant\_id

UUID

Tenant identifier

event\_type

VARCHAR(120)

MemoryCreated, Retrieved, Deleted, Compacted

memory\_id

UUID

Optional memory

memory\_scope\_id

UUID

Memory scope

ai\_agent\_id

UUID

Optional agent

event\_payload

JSONB

Event details

occurred\_at

TIMESTAMPTZ

Business event timestamp

created\_at

TIMESTAMPTZ

Storage timestamp

**Key Metrics**

-   Total active memories
-   Memories created by type
-   Retrieval frequency
-   Retrieval latency
-   Memory relevance score
-   Memory deletion requests
-   Consent revocations
-   Stale memory count
-   Compaction ratio
-   Memory access denials
-   AI task success with memory
-   AI personalization engagement

**Recommended ClickHouse Fact Tables**

-   fact\_ai\_memory\_usage
-   fact\_memory\_retrieval
-   fact\_memory\_consent
-   fact\_memory\_retention
-   fact\_memory\_compaction
-   fact\_memory\_quality

**21.14 Constraints**

**Primary Key Constraints**

Core tables use UUID primary keys:

-   memory\_scope\_id
-   memory\_id
-   long\_term\_memory\_profile\_id
-   memory\_embedding\_id
-   retrieval\_id
-   consent\_id
-   retention\_policy\_id
-   deletion\_request\_id
-   compaction\_job\_id
-   memory\_audit\_event\_id

**Foreign Key Constraints**

Recommended internal foreign keys:

-   ai\_memory\_records.memory\_scope\_id → memory\_scopes.memory\_scope\_id
-   long\_term\_memory\_profiles.memory\_scope\_id → memory\_scopes.memory\_scope\_id
-   memory\_embeddings.memory\_id → ai\_memory\_records.memory\_id
-   memory\_retrieval\_logs.memory\_scope\_id → memory\_scopes.memory\_scope\_id
-   memory\_compaction\_jobs.memory\_scope\_id → memory\_scopes.memory\_scope\_id
-   memory\_compaction\_jobs.output\_memory\_id → ai\_memory\_records.memory\_id
-   memory\_audit\_events.memory\_scope\_id → memory\_scopes.memory\_scope\_id

Cross-service identifiers such as user\_id, organization\_id, project\_id, conversation\_id, ai\_agent\_id, and ai\_model\_id should be validated through APIs or read models.

**Check Constraints**

Recommended checks:

-   confidence\_score BETWEEN 0 AND 1
-   importance\_score BETWEEN 0 AND 1
-   retention\_days >= 0
-   latency\_ms >= 0
-   result\_count >= 0
-   expires\_at IS NULL OR expires\_at >= created\_at
-   compression\_ratio >= 0
-   quality\_score BETWEEN 0 AND 1

**Unique Constraints**

Recommended unique constraints:

-   One active memory scope per tenant, scope type, and scope entity.
-   One active consent preference per subject and tenant.
-   One active retention policy per memory type and tenant where applicable.
-   One active embedding per memory, model, and embedding type.
-   One long-term memory profile per memory scope and profile type.

**21.15 Indexing Strategy**

**Memory Scope Indexes**

Recommended indexes:

-   idx\_memory\_scopes\_tenant\_scope
-   idx\_memory\_scopes\_entity
-   idx\_memory\_scopes\_status

**Memory Record Indexes**

Recommended indexes:

-   idx\_ai\_memory\_records\_scope
-   idx\_ai\_memory\_records\_owner
-   idx\_ai\_memory\_records\_type
-   idx\_ai\_memory\_records\_status
-   idx\_ai\_memory\_records\_importance
-   idx\_ai\_memory\_records\_created\_at
-   idx\_ai\_memory\_records\_expires\_at

**Embedding Indexes**

Recommended indexes:

-   idx\_memory\_embeddings\_memory
-   idx\_memory\_embeddings\_model
-   idx\_memory\_embeddings\_status
-   Vector index on embedding vector where stored in PostgreSQL or vector store.

**Retrieval Indexes**

Recommended indexes:

-   idx\_memory\_retrieval\_logs\_agent
-   idx\_memory\_retrieval\_logs\_user
-   idx\_memory\_retrieval\_logs\_scope
-   idx\_memory\_retrieval\_logs\_created\_at

**Consent and Retention Indexes**

Recommended indexes:

-   idx\_memory\_consent\_subject
-   idx\_memory\_consent\_tenant
-   idx\_memory\_deletion\_requests\_status
-   idx\_memory\_retention\_policy\_type

**Audit Indexes**

Recommended indexes:

-   idx\_memory\_audit\_events\_memory
-   idx\_memory\_audit\_events\_scope
-   idx\_memory\_audit\_events\_type
-   idx\_memory\_audit\_events\_occurred\_at

**21.16 Partitioning Strategy**

**Time-Based Partitioning**

Recommended monthly or quarterly partitioning for:

-   memory\_retrieval\_logs
-   memory\_audit\_events
-   memory\_events
-   memory\_compaction\_jobs
-   memory\_deletion\_requests

**Scope-Based Optimization**

Large memory scopes such as enterprise organizations or high-volume AI agents may require separate vector indexes or tenant-aware partitions.

**Archival Strategy**

Expired and stale memories should be archived, anonymized, or deleted according to memory retention policies and consent requirements.

**21.17 ERD**

**Conceptual ERD**

MemoryScope

├── AIMemoryRecord

│ ├── MemoryEmbedding

│ ├── MemoryAuditEvent

│ └── MemoryEvent

├── LongTermMemoryProfile

├── MemoryRetrievalLog

├── MemoryCompactionJob

└── MemoryRetentionPolicy

MemoryConsentPreference

MemoryDeletionRequest

**Relationship Summary**

**Parent Entity**

**Child Entity**

**Cardinality**

Memory Scope

AI Memory Records

1:N

Memory Scope

Long-Term Memory Profiles

1:N

Memory Record

Memory Embeddings

1:N

Memory Scope

Retrieval Logs

1:N

Memory Scope

Compaction Jobs

1:N

Memory Record

Audit Events

1:N

Memory Scope

Audit Events

1:N

Memory Scope

Memory Events

1:N

Subject

Memory Consent Preferences

1:N logical

Scope

Deletion Requests

1:N logical

**ERD Design Notes**

The AI Memory Database is centered on memory\_scopes and ai\_memory\_records. Scopes define ownership and access boundaries. Memory records define what is remembered. Embeddings enable semantic retrieval. Consent preferences and retention policies control whether memory can be stored, retrieved, retained, anonymized, or deleted.

This design ensures that Kaziforce AI memory is useful, personalized, auditable, secure, and compliant with privacy expectations.

**22\. Knowledge Base Database**

**22.1 Overview**

The Knowledge Base Database manages structured and unstructured knowledge used by Kaziforce users, organizations, support teams, HR teams, professionals, administrators, and AI agents. It stores articles, FAQs, guides, policies, help content, standard operating procedures, troubleshooting content, product documentation, onboarding guides, internal knowledge, and AI-retrievable knowledge assets.

The Knowledge Base Service owns this database. It provides authoritative knowledge content for human users and retrieval-augmented AI systems. It integrates with the AI Agent Service, AI Memory Service, Search Service, Customer Support Service, Learning Management Service, Organization Service, and Notification Service.

**Primary Responsibilities**

The Knowledge Base Database supports:

-   Article management
-   FAQ management
-   Help center content
-   Internal knowledge articles
-   Organization-specific knowledge
-   AI-retrievable knowledge
-   Content versioning
-   Content publishing workflows
-   Content moderation
-   Knowledge categorization
-   Tagging
-   Search indexing
-   Vector embeddings
-   Access control
-   Knowledge analytics
-   Feedback and usefulness ratings

**Primary Data Stores**

**Data Store**

**Purpose**

PostgreSQL

Article metadata, categories, permissions, publishing workflow

MongoDB

Rich article bodies, structured knowledge documents, FAQ content

OpenSearch

Full-text knowledge search

Vector Store / pgvector

Semantic knowledge retrieval and RAG

Redis

Frequently accessed articles and search cache

Object Storage

Images, PDFs, guides, videos, attachments

ClickHouse

Knowledge analytics and usage reports

Kafka

Knowledge events and downstream indexing

**22.2 Knowledge Spaces**

**Overview**

Knowledge Spaces define logical containers for knowledge content. They allow Kaziforce to separate platform knowledge, organization-specific knowledge, public help content, internal policies, team knowledge, and AI-only retrieval content.

**Knowledge Space Types**

-   Platform Help Center
-   Organization Knowledge Base
-   Internal Operations Knowledge
-   HR Policy Knowledge
-   Project Knowledge Base
-   Product Documentation
-   AI Retrieval Knowledge
-   Support Knowledge Base
-   Training Knowledge Base

**Suggested Table: knowledge\_spaces**

**Column**

**Data Type**

**Description**

knowledge\_space\_id

UUID

Primary knowledge space identifier

tenant\_id

UUID

Tenant identifier

organization\_id

UUID

Optional organization owner

space\_name

VARCHAR(180)

Knowledge space name

space\_code

VARCHAR(100)

Unique space code

space\_type

VARCHAR(80)

Public, Organization, Internal, Project, AI

description

TEXT

Space description

visibility\_status

VARCHAR(50)

Public, Private, Organization, Restricted

default\_language\_code

VARCHAR(10)

Default language

lifecycle\_status

VARCHAR(50)

Active, Inactive, Archived

created\_by\_user\_id

UUID

Creator

metadata

JSONB

Flexible metadata

created\_at

TIMESTAMPTZ

Creation timestamp

updated\_at

TIMESTAMPTZ

Update timestamp

deleted\_at

TIMESTAMPTZ

Soft delete timestamp

**Design Notes**

Knowledge spaces provide access and governance boundaries. AI agents must only retrieve from knowledge spaces included in their approved knowledge scope.

**22.3 Categories**

**Overview**

Categories organize knowledge articles and FAQs into navigable groups. Categories may be hierarchical to support deep knowledge structures.

**Suggested Table: knowledge\_categories**

**Column**

**Data Type**

**Description**

category\_id

UUID

Primary category identifier

tenant\_id

UUID

Tenant identifier

knowledge\_space\_id

UUID

Knowledge space

parent\_category\_id

UUID

Optional parent category

category\_name

VARCHAR(180)

Category name

category\_slug

VARCHAR(220)

URL-friendly slug

description

TEXT

Category description

display\_order

INTEGER

Navigation order

lifecycle\_status

VARCHAR(50)

Active, Inactive, Archived

created\_at

TIMESTAMPTZ

Creation timestamp

updated\_at

TIMESTAMPTZ

Update timestamp

**Design Notes**

Hierarchical categories support platform help centers, HR policy repositories, product documentation, and support knowledge trees.

**22.4 Articles**

**Overview**

Articles are the primary knowledge objects in Kaziforce. They may represent help articles, guides, policies, onboarding instructions, product documentation, troubleshooting notes, SOPs, compliance notes, and AI-retrievable knowledge units.

**Suggested Table: knowledge\_articles**

**Column**

**Data Type**

**Description**

article\_id

UUID

Primary article identifier

tenant\_id

UUID

Tenant identifier

knowledge\_space\_id

UUID

Knowledge space

category\_id

UUID

Optional category

author\_user\_id

UUID

Author

owner\_team\_id

UUID

Optional owner team

article\_title

VARCHAR(255)

Article title

article\_slug

VARCHAR(300)

URL-friendly slug

article\_summary

TEXT

Short summary

article\_type

VARCHAR(80)

Help, Policy, SOP, Guide, FAQ, Technical, AI

language\_code

VARCHAR(10)

Article language

content\_document\_id

VARCHAR(120)

MongoDB content document

publication\_status

VARCHAR(50)

Draft, Review, Published, Archived

visibility\_status

VARCHAR(50)

Public, Internal, Organization, Restricted

ai\_retrieval\_enabled

BOOLEAN

Whether AI can retrieve article

search\_visibility

BOOLEAN

Whether article is searchable

version

INTEGER

Current article version

average\_rating

NUMERIC(4,2)

User rating

view\_count

INTEGER

Number of views

metadata

JSONB

Flexible metadata

published\_at

TIMESTAMPTZ

Publication timestamp

archived\_at

TIMESTAMPTZ

Archive timestamp

created\_at

TIMESTAMPTZ

Creation timestamp

updated\_at

TIMESTAMPTZ

Update timestamp

deleted\_at

TIMESTAMPTZ

Soft delete timestamp

**MongoDB Collection: knowledge\_article\_documents**

{

"article\_id": "uuid",

"tenant\_id": "uuid",

"knowledge\_space\_id": "uuid",

"version": 1,

"content": {

"format": "markdown",

"body": "# How to create a job post\\nStep-by-step guide...",

"blocks": \[\],

"links": \[\],

"entities": \[\]

},

"attachments": \[\],

"seo": {

"title": "How to create a job post",

"description": "Guide for employers"

},

"created\_at": "timestamp",

"updated\_at": "timestamp"

}

**Design Notes**

Article metadata is stored in PostgreSQL while rich article bodies are stored in MongoDB. This provides relational governance and flexible content authoring.

**22.5 Article Versions**

**Overview**

Article versioning preserves historical changes and supports auditability, rollback, compliance, editorial review, and AI retrieval traceability.

**Suggested Table: knowledge\_article\_versions**

**Column**

**Data Type**

**Description**

article\_version\_id

UUID

Primary version identifier

tenant\_id

UUID

Tenant identifier

article\_id

UUID

Article reference

version\_number

INTEGER

Version number

content\_document\_id

VARCHAR(120)

MongoDB document reference

change\_summary

TEXT

Summary of changes

changed\_by\_user\_id

UUID

Editor

publication\_status

VARCHAR(50)

Draft, Review, Published, Archived

approved\_by\_user\_id

UUID

Approver

approved\_at

TIMESTAMPTZ

Approval timestamp

created\_at

TIMESTAMPTZ

Version creation timestamp

**Design Notes**

Published versions should be immutable. New edits should create new versions instead of overwriting approved content.

**22.6 FAQs**

**Overview**

FAQs provide concise question-and-answer content for users, employers, professionals, support teams, and AI assistants.

**Suggested Table: knowledge\_faqs**

**Column**

**Data Type**

**Description**

faq\_id

UUID

Primary FAQ identifier

tenant\_id

UUID

Tenant identifier

knowledge\_space\_id

UUID

Knowledge space

category\_id

UUID

Optional category

question

TEXT

FAQ question

answer\_document\_id

VARCHAR(120)

MongoDB answer document

language\_code

VARCHAR(10)

FAQ language

publication\_status

VARCHAR(50)

Draft, Published, Archived

visibility\_status

VARCHAR(50)

Public, Internal, Organization, Restricted

ai\_retrieval\_enabled

BOOLEAN

AI retrieval flag

display\_order

INTEGER

Display order

created\_by\_user\_id

UUID

Creator

published\_at

TIMESTAMPTZ

Publication timestamp

created\_at

TIMESTAMPTZ

Creation timestamp

updated\_at

TIMESTAMPTZ

Update timestamp

**MongoDB Collection: knowledge\_faq\_answers**

{

"faq\_id": "uuid",

"answer": {

"format": "markdown",

"body": "You can reset your password from the login screen..."

},

"related\_links": \[\],

"created\_at": "timestamp"

}

**22.7 Tags and Taxonomy**

**Overview**

Tags and taxonomy improve search, filtering, recommendations, analytics, and AI retrieval.

**Suggested Table: knowledge\_tags**

**Column**

**Data Type**

**Description**

tag\_id

UUID

Primary tag identifier

tenant\_id

UUID

Tenant identifier

tag\_name

VARCHAR(120)

Tag name

tag\_slug

VARCHAR(150)

URL-friendly slug

tag\_type

VARCHAR(80)

Topic, Product, Role, Skill, Policy

lifecycle\_status

VARCHAR(50)

Active, Inactive, Archived

created\_at

TIMESTAMPTZ

Creation timestamp

**Suggested Table: knowledge\_article\_tags**

**Column**

**Data Type**

**Description**

article\_tag\_id

UUID

Primary identifier

tenant\_id

UUID

Tenant identifier

article\_id

UUID

Article

tag\_id

UUID

Tag

created\_at

TIMESTAMPTZ

Creation timestamp

**Suggested Table: knowledge\_faq\_tags**

**Column**

**Data Type**

**Description**

faq\_tag\_id

UUID

Primary identifier

tenant\_id

UUID

Tenant identifier

faq\_id

UUID

FAQ

tag\_id

UUID

Tag

created\_at

TIMESTAMPTZ

Creation timestamp

**22.8 Attachments**

**Overview**

Knowledge articles and FAQs may include attachments such as PDFs, images, diagrams, policy documents, templates, videos, spreadsheets, and downloadable resources.

Files are stored in Object Storage. Metadata is stored in PostgreSQL.

**Suggested Table: knowledge\_attachments**

**Column**

**Data Type**

**Description**

attachment\_id

UUID

Primary attachment identifier

tenant\_id

UUID

Tenant identifier

target\_type

VARCHAR(80)

Article, FAQ, Space

target\_id

UUID

Target entity

uploaded\_by\_user\_id

UUID

Uploader

file\_name

VARCHAR(255)

Original file name

mime\_type

VARCHAR(150)

MIME type

file\_size\_bytes

BIGINT

File size

object\_key

TEXT

Object storage reference

checksum

VARCHAR(128)

Integrity hash

access\_scope

VARCHAR(80)

Public, Internal, Restricted

virus\_scan\_status

VARCHAR(50)

Pending, Clean, Infected, Failed

lifecycle\_status

VARCHAR(50)

Active, Archived, Deleted

created\_at

TIMESTAMPTZ

Upload timestamp

deleted\_at

TIMESTAMPTZ

Soft delete timestamp

**22.9 Publishing Workflow**

**Overview**

Publishing workflow governs how knowledge content moves from draft to review, approval, publishing, archival, or deletion.

**Suggested Table: knowledge\_workflow\_actions**

**Column**

**Data Type**

**Description**

workflow\_action\_id

UUID

Primary workflow action

tenant\_id

UUID

Tenant identifier

target\_type

VARCHAR(80)

Article, FAQ

target\_id

UUID

Target entity

action\_type

VARCHAR(80)

SubmitForReview, Approve, Reject, Publish, Archive

from\_status

VARCHAR(50)

Previous status

to\_status

VARCHAR(50)

New status

actor\_user\_id

UUID

User performing action

action\_note

TEXT

Comment

acted\_at

TIMESTAMPTZ

Action timestamp

**Design Notes**

Workflow actions should be append-only. They provide auditability for content approval and publishing decisions.

**22.10 Access Control**

**Overview**

Knowledge content may be public, organization-specific, internal, restricted, or AI-only. Access control ensures users and AI agents only retrieve authorized content.

**Suggested Table: knowledge\_access\_rules**

**Column**

**Data Type**

**Description**

access\_rule\_id

UUID

Primary access rule

tenant\_id

UUID

Tenant identifier

target\_type

VARCHAR(80)

Space, Category, Article, FAQ

target\_id

UUID

Target entity

principal\_type

VARCHAR(80)

User, Role, Organization, Team, AI Agent

principal\_id

UUID

Principal identifier

access\_level

VARCHAR(50)

View, Edit, Approve, Admin

rule\_status

VARCHAR(50)

Active, Revoked

granted\_by\_user\_id

UUID

User who granted access

granted\_at

TIMESTAMPTZ

Grant timestamp

revoked\_at

TIMESTAMPTZ

Revocation timestamp

**Design Notes**

Access control must be enforced before search results or AI retrieval responses are returned.

**22.11 Knowledge Embeddings**

**Overview**

Knowledge embeddings support semantic search, AI assistants, RAG pipelines, support automation, and personalized content retrieval.

**Suggested Table: knowledge\_embeddings**

**Column**

**Data Type**

**Description**

knowledge\_embedding\_id

UUID

Primary embedding identifier

tenant\_id

UUID

Tenant identifier

target\_type

VARCHAR(80)

Article, FAQ, Attachment, Chunk

target\_id

UUID

Target entity

content\_chunk\_id

VARCHAR(120)

Optional chunk reference

embedding\_model\_id

UUID

Embedding model

vector\_dimension

INTEGER

Vector dimension

vector\_storage\_type

VARCHAR(80)

pgvector, OpenSearch, Qdrant, Milvus

vector\_ref

TEXT

Vector storage reference

content\_hash

VARCHAR(128)

Source content hash

embedding\_status

VARCHAR(50)

Active, Stale, Failed, Archived

generated\_at

TIMESTAMPTZ

Generation timestamp

expires\_at

TIMESTAMPTZ

Optional refresh expiry

**Design Notes**

Large articles should be chunked before embedding. Each chunk should preserve source article ID, version, title, section, and permissions.

**22.12 Knowledge Search Model**

**Overview**

Knowledge Search enables users and AI agents to find relevant articles, FAQs, guides, policies, and support content.

**OpenSearch Index: knowledge\_v1**

**Field**

**Type**

**Purpose**

content\_id

keyword

Article, FAQ, or chunk ID

tenant\_id

keyword

Tenant filtering

knowledge\_space\_id

keyword

Space filtering

category\_id

keyword

Category filtering

content\_type

keyword

Article, FAQ, Guide, Policy

title

text/keyword

Title search

summary

text

Summary search

body\_text

text

Full-text search

tags

keyword

Tag filtering

language\_code

keyword

Language filtering

publication\_status

keyword

Status filter

visibility\_status

keyword

Visibility filter

ai\_retrieval\_enabled

boolean

AI retrieval filter

version

integer

Version

published\_at

date

Freshness ranking

average\_rating

double

Quality ranking

embedding\_vector

dense\_vector

Semantic search

**Search Constraints**

Search must enforce:

-   Tenant boundaries
-   Knowledge space access
-   Article visibility
-   User role permissions
-   AI agent retrieval permissions
-   Publication status
-   Version validity

**22.13 AI Retrieval and RAG**

**Overview**

Knowledge content powers Retrieval-Augmented Generation for AI agents. RAG allows AI agents to answer questions using approved Kaziforce knowledge instead of relying only on model memory.

**Suggested Table: knowledge\_retrieval\_logs**

**Column**

**Data Type**

**Description**

retrieval\_log\_id

UUID

Primary retrieval log

tenant\_id

UUID

Tenant identifier

ai\_agent\_id

UUID

AI agent

requesting\_user\_id

UUID

User

query\_text

TEXT

Retrieval query

knowledge\_space\_ids

JSONB

Spaces searched

retrieved\_content\_refs

JSONB

Retrieved article/chunk references

retrieval\_method

VARCHAR(80)

Keyword, Vector, Hybrid

result\_count

INTEGER

Number of results

latency\_ms

INTEGER

Retrieval latency

access\_decision

VARCHAR(50)

Allowed, Blocked, Partial

created\_at

TIMESTAMPTZ

Retrieval timestamp

**Design Notes**

AI answers should be traceable to retrieved knowledge sources. Retrieval logs support explainability, debugging, and compliance review.

**22.14 Feedback and Ratings**

**Overview**

Feedback helps improve knowledge quality and detect outdated, unclear, or unhelpful content.

**Suggested Table: knowledge\_feedback**

**Column**

**Data Type**

**Description**

feedback\_id

UUID

Primary feedback identifier

tenant\_id

UUID

Tenant identifier

target\_type

VARCHAR(80)

Article, FAQ, AIAnswer

target\_id

UUID

Target entity

user\_id

UUID

Feedback provider

rating

NUMERIC(2,1)

Rating

was\_helpful

BOOLEAN

Helpful flag

feedback\_text

TEXT

Feedback comment

feedback\_status

VARCHAR(50)

New, Reviewed, Resolved

created\_at

TIMESTAMPTZ

Feedback timestamp

**Design Notes**

Low-rated articles should be flagged for review. AI answer feedback should be linked back to retrieval logs and source content where possible.

**22.15 Knowledge Analytics**

**Overview**

Knowledge Analytics measures how knowledge content is used, searched, retrieved, rated, and improved.

**Suggested Table: knowledge\_events**

**Column**

**Data Type**

**Description**

knowledge\_event\_id

UUID

Primary event identifier

tenant\_id

UUID

Tenant identifier

event\_type

VARCHAR(120)

ArticleViewed, SearchPerformed, ArticleRated, ArticlePublished

target\_type

VARCHAR(80)

Space, Article, FAQ, Search, Retrieval

target\_id

UUID

Target entity

actor\_user\_id

UUID

Acting user

ai\_agent\_id

UUID

Optional AI agent

event\_payload

JSONB

Event details

occurred\_at

TIMESTAMPTZ

Business event timestamp

created\_at

TIMESTAMPTZ

Storage timestamp

**Key Metrics**

-   Article views
-   FAQ views
-   Search volume
-   Top search queries
-   Zero-result searches
-   AI retrieval count
-   Article usefulness score
-   Content freshness
-   Most used articles
-   Least used articles
-   Knowledge gaps
-   Average rating
-   Feedback volume
-   Article update frequency

**Recommended ClickHouse Fact Tables**

-   fact\_knowledge\_views
-   fact\_knowledge\_search
-   fact\_knowledge\_feedback
-   fact\_knowledge\_retrieval
-   fact\_article\_quality
-   fact\_content\_freshness

**22.16 Constraints**

**Primary Key Constraints**

Core tables use UUID primary keys:

-   knowledge\_space\_id
-   category\_id
-   article\_id
-   article\_version\_id
-   faq\_id
-   tag\_id
-   attachment\_id
-   workflow\_action\_id
-   access\_rule\_id
-   knowledge\_embedding\_id
-   retrieval\_log\_id
-   feedback\_id
-   knowledge\_event\_id

**Foreign Key Constraints**

Recommended internal foreign keys:

-   knowledge\_categories.knowledge\_space\_id → knowledge\_spaces.knowledge\_space\_id
-   knowledge\_categories.parent\_category\_id → knowledge\_categories.category\_id
-   knowledge\_articles.knowledge\_space\_id → knowledge\_spaces.knowledge\_space\_id
-   knowledge\_articles.category\_id → knowledge\_categories.category\_id
-   knowledge\_article\_versions.article\_id → knowledge\_articles.article\_id
-   knowledge\_faqs.knowledge\_space\_id → knowledge\_spaces.knowledge\_space\_id
-   knowledge\_faqs.category\_id → knowledge\_categories.category\_id
-   knowledge\_article\_tags.article\_id → knowledge\_articles.article\_id
-   knowledge\_article\_tags.tag\_id → knowledge\_tags.tag\_id
-   knowledge\_faq\_tags.faq\_id → knowledge\_faqs.faq\_id
-   knowledge\_faq\_tags.tag\_id → knowledge\_tags.tag\_id

Cross-service identifiers such as user\_id, organization\_id, team\_id, ai\_agent\_id, and embedding\_model\_id should be validated through APIs or synchronized read models.

**Check Constraints**

Recommended checks:

-   rating BETWEEN 1 AND 5
-   average\_rating BETWEEN 1 AND 5
-   version >= 1
-   display\_order >= 0
-   file\_size\_bytes >= 0
-   latency\_ms >= 0
-   result\_count >= 0
-   expires\_at IS NULL OR expires\_at >= generated\_at

**Unique Constraints**

Recommended unique constraints:

-   Unique knowledge space code per tenant.
-   Unique category slug per knowledge space.
-   Unique article slug per knowledge space and language.
-   Unique tag slug per tenant.
-   Unique article version number per article.
-   One rating per user and article unless multiple feedback entries are allowed.

**22.17 Indexing Strategy**

**Knowledge Space Indexes**

Recommended indexes:

-   idx\_knowledge\_spaces\_tenant
-   idx\_knowledge\_spaces\_org
-   idx\_knowledge\_spaces\_type
-   idx\_knowledge\_spaces\_status

**Article Indexes**

Recommended indexes:

-   idx\_knowledge\_articles\_space
-   idx\_knowledge\_articles\_category
-   idx\_knowledge\_articles\_status
-   idx\_knowledge\_articles\_visibility
-   idx\_knowledge\_articles\_language
-   idx\_knowledge\_articles\_published\_at
-   idx\_knowledge\_articles\_ai\_retrieval

**FAQ Indexes**

Recommended indexes:

-   idx\_knowledge\_faqs\_space
-   idx\_knowledge\_faqs\_category
-   idx\_knowledge\_faqs\_status
-   idx\_knowledge\_faqs\_ai\_retrieval

**Tag Indexes**

Recommended indexes:

-   idx\_knowledge\_tags\_slug
-   idx\_article\_tags\_article
-   idx\_article\_tags\_tag
-   idx\_faq\_tags\_faq
-   idx\_faq\_tags\_tag

**Access Control Indexes**

Recommended indexes:

-   idx\_knowledge\_access\_rules\_target
-   idx\_knowledge\_access\_rules\_principal
-   idx\_knowledge\_access\_rules\_status

**Analytics and Retrieval Indexes**

Recommended indexes:

-   idx\_knowledge\_retrieval\_logs\_agent
-   idx\_knowledge\_retrieval\_logs\_user
-   idx\_knowledge\_retrieval\_logs\_created\_at
-   idx\_knowledge\_events\_type
-   idx\_knowledge\_events\_target
-   idx\_knowledge\_events\_occurred\_at

**22.18 Partitioning Strategy**

**Time-Based Partitioning**

Recommended monthly or quarterly partitioning for:

-   knowledge\_events
-   knowledge\_retrieval\_logs
-   knowledge\_feedback
-   knowledge\_workflow\_actions

**Tenant-Aware Partitioning**

Large enterprise knowledge bases may require tenant-isolated schemas, dedicated OpenSearch indexes, or separate vector indexes.

**Archival Strategy**

Archived articles should remain accessible to authorized administrators and audit users. Published article versions should be preserved for historical traceability. Old analytics events should be retained in ClickHouse and archived from PostgreSQL after the operational retention period.

**22.19 ERD**

**Conceptual ERD**

KnowledgeSpace

├── KnowledgeCategory

│ ├── KnowledgeArticle

│ │ ├── KnowledgeArticleVersion

│ │ ├── KnowledgeArticleTag

│ │ │ └── KnowledgeTag

│ │ ├── KnowledgeAttachment

│ │ ├── KnowledgeEmbedding

│ │ ├── KnowledgeFeedback

│ │ └── KnowledgeWorkflowAction

│ └── KnowledgeFAQ

│ ├── KnowledgeFAQTag

│ │ └── KnowledgeTag

│ ├── KnowledgeEmbedding

│ └── KnowledgeFeedback

├── KnowledgeAccessRule

└── KnowledgeRetrievalLog

KnowledgeEvent

**Relationship Summary**

**Parent Entity**

**Child Entity**

**Cardinality**

Knowledge Space

Categories

1:N

Knowledge Space

Articles

1:N

Knowledge Space

FAQs

1:N

Category

Child Categories

1:N

Category

Articles

1:N

Category

FAQs

1:N

Article

Article Versions

1:N

Article

Article Tags

1:N

FAQ

FAQ Tags

1:N

Tag

Article Tags

1:N

Tag

FAQ Tags

1:N

Article/FAQ

Attachments

1:N logical

Article/FAQ

Embeddings

1:N logical

Article/FAQ

Feedback

1:N logical

Space/Article/FAQ

Access Rules

1:N logical

Knowledge Retrieval

Knowledge Events

1:N logical

**ERD Design Notes**

The Knowledge Base Database is centered on knowledge\_spaces, knowledge\_articles, and knowledge\_faqs. Knowledge spaces provide governance and access boundaries. Articles and FAQs provide reusable human and AI-readable content. Article versions preserve editorial history. Tags, categories, and embeddings improve discovery and semantic retrieval.

The design separates relational metadata from rich content storage. PostgreSQL manages governance, publishing, permissions, workflow, and relationships. MongoDB stores flexible article and FAQ content. Object Storage stores attachments. OpenSearch and vector indexes support search and RAG. ClickHouse supports analytics without overloading the transactional database.

**23\. CRM Database**

**23.1 Overview**

The CRM Database manages customer relationship data for Kaziforce and tenant organizations using the platform to manage leads, prospects, customers, opportunities, pipelines, sales activities, accounts, contacts, deals, campaigns, and customer lifecycle records.

The CRM Service owns this database. It supports business development, enterprise sales, client relationship management, partner management, employer acquisition, professional acquisition, and revenue growth operations.

The CRM Database is separate from the Organization Management Database. The Organization Service owns verified organizations and internal enterprise structures. The CRM Service manages commercial relationship data, sales pipeline records, prospecting workflows, and customer engagement history.

**Primary Responsibilities**

The CRM Database supports:

-   Lead management
-   Account management
-   Contact management
-   Opportunity tracking
-   Sales pipelines
-   Deal stages
-   Sales activities
-   Campaign tracking
-   Partner relationship management
-   Customer lifecycle tracking
-   CRM notes and interactions
-   Sales forecasting
-   CRM analytics
-   AI sales recommendations

**Primary Data Stores**

**Data Store**

**Purpose**

PostgreSQL

Leads, accounts, contacts, opportunities, pipelines, sales activities

MongoDB

CRM notes, call summaries, interaction documents, dynamic forms

Redis

CRM dashboard cache, sales pipeline cache

OpenSearch

Account, lead, contact, and opportunity search

ClickHouse

CRM analytics and sales reporting

Kafka

CRM events and downstream integrations

**23.2 Leads**

**Overview**

Leads represent potential customers, employers, organizations, partners, professionals, or institutions that may become active users or paying clients on Kaziforce.

**Suggested Table: crm\_leads**

**Column**

**Data Type**

**Description**

lead\_id

UUID

Primary lead identifier

tenant\_id

UUID

Tenant identifier

lead\_source

VARCHAR(100)

Website, Referral, Campaign, Event, Partner, Manual

lead\_type

VARCHAR(80)

Employer, Professional, Partner, Enterprise, Government

company\_name

VARCHAR(255)

Lead company name

contact\_name

VARCHAR(180)

Primary contact name

contact\_email

VARCHAR(255)

Contact email

contact\_phone

VARCHAR(50)

Contact phone

job\_title

VARCHAR(180)

Contact role

industry

VARCHAR(120)

Industry

country\_code

CHAR(2)

Country

city

VARCHAR(120)

City

lead\_status

VARCHAR(50)

New, Contacted, Qualified, Disqualified, Converted

qualification\_score

NUMERIC(8,4)

Lead quality score

assigned\_owner\_user\_id

UUID

Sales owner

expected\_value

NUMERIC(14,2)

Estimated value

currency\_code

CHAR(3)

Currency

conversion\_account\_id

UUID

Converted account reference

conversion\_opportunity\_id

UUID

Converted opportunity reference

converted\_at

TIMESTAMPTZ

Conversion timestamp

metadata

JSONB

Flexible lead metadata

created\_at

TIMESTAMPTZ

Creation timestamp

updated\_at

TIMESTAMPTZ

Update timestamp

deleted\_at

TIMESTAMPTZ

Soft delete timestamp

**Design Notes**

Leads should be converted into accounts, contacts, and opportunities rather than overwritten. Original lead data should remain available for attribution and analytics.

**23.3 Accounts**

**Overview**

Accounts represent organizations or entities with an ongoing or potential commercial relationship with Kaziforce or a tenant organization.

Accounts may represent:

-   Employers
-   Enterprise customers
-   Government agencies
-   NGOs
-   Training partners
-   Recruitment partners
-   Service buyers
-   Channel partners

**Suggested Table: crm\_accounts**

**Column**

**Data Type**

**Description**

account\_id

UUID

Primary account identifier

tenant\_id

UUID

Tenant identifier

linked\_organization\_id

UUID

Optional Organization Service reference

account\_name

VARCHAR(255)

Account name

account\_type

VARCHAR(80)

Customer, Prospect, Partner, Vendor, Government

industry

VARCHAR(120)

Industry

company\_size

VARCHAR(80)

SME, Mid-Market, Enterprise

website\_url

TEXT

Website

country\_code

CHAR(2)

Country

city

VARCHAR(120)

City

account\_status

VARCHAR(50)

Prospect, Active, Dormant, Churned, Blacklisted

lifecycle\_stage

VARCHAR(80)

Lead, Qualified, Customer, Expansion, Renewal

owner\_user\_id

UUID

Account owner

annual\_revenue\_estimate

NUMERIC(18,2)

Estimated annual revenue

currency\_code

CHAR(3)

Currency

customer\_since

DATE

Customer start date

metadata

JSONB

Flexible account metadata

created\_at

TIMESTAMPTZ

Creation timestamp

updated\_at

TIMESTAMPTZ

Update timestamp

deleted\_at

TIMESTAMPTZ

Soft delete timestamp

version

INTEGER

Optimistic locking version

**Design Notes**

The CRM account may link to an organization record once the account becomes a verified organization on Kaziforce. The CRM account remains the sales and relationship record.

**23.4 Contacts**

**Overview**

Contacts represent individuals associated with CRM accounts, leads, opportunities, campaigns, or partner relationships.

**Suggested Table: crm\_contacts**

**Column**

**Data Type**

**Description**

contact\_id

UUID

Primary contact identifier

tenant\_id

UUID

Tenant identifier

account\_id

UUID

Optional account reference

linked\_user\_id

UUID

Optional Identity Service user

full\_name

VARCHAR(180)

Contact name

email

VARCHAR(255)

Email address

phone

VARCHAR(50)

Phone number

job\_title

VARCHAR(180)

Role title

department

VARCHAR(120)

Department

contact\_type

VARCHAR(80)

DecisionMaker, Influencer, User, Finance, Technical

preferred\_channel

VARCHAR(50)

Email, Phone, WhatsApp, InApp

consent\_status

VARCHAR(50)

Unknown, OptedIn, OptedOut

lifecycle\_status

VARCHAR(50)

Active, Inactive, Archived

metadata

JSONB

Flexible metadata

created\_at

TIMESTAMPTZ

Creation timestamp

updated\_at

TIMESTAMPTZ

Update timestamp

deleted\_at

TIMESTAMPTZ

Soft delete timestamp

**23.5 Opportunities**

**Overview**

Opportunities represent potential commercial deals. They track value, probability, expected close date, stage, products, services, competitors, risks, and sales ownership.

**Suggested Table: crm\_opportunities**

**Column**

**Data Type**

**Description**

opportunity\_id

UUID

Primary opportunity identifier

tenant\_id

UUID

Tenant identifier

account\_id

UUID

Account reference

lead\_id

UUID

Optional source lead

pipeline\_id

UUID

Sales pipeline

current\_stage\_id

UUID

Current pipeline stage

opportunity\_name

VARCHAR(255)

Opportunity title

opportunity\_type

VARCHAR(80)

NewBusiness, Renewal, Expansion, Upsell, Partner

description

TEXT

Opportunity description

estimated\_value

NUMERIC(14,2)

Estimated deal value

currency\_code

CHAR(3)

Currency

probability\_percentage

NUMERIC(5,2)

Win probability

expected\_close\_date

DATE

Expected close date

actual\_close\_date

DATE

Actual close date

opportunity\_status

VARCHAR(50)

Open, Won, Lost, Cancelled

loss\_reason

TEXT

Lost reason

owner\_user\_id

UUID

Sales owner

source\_campaign\_id

UUID

Optional campaign

metadata

JSONB

Flexible metadata

created\_at

TIMESTAMPTZ

Creation timestamp

updated\_at

TIMESTAMPTZ

Update timestamp

deleted\_at

TIMESTAMPTZ

Soft delete timestamp

**Design Notes**

Opportunity stage movements should be recorded in a separate history table to preserve pipeline traceability.

**23.6 Sales Pipelines**

**Overview**

Sales Pipelines define the stages used to manage opportunities from qualification to closure.

**Suggested Table: crm\_pipelines**

**Column**

**Data Type**

**Description**

pipeline\_id

UUID

Primary pipeline identifier

tenant\_id

UUID

Tenant identifier

pipeline\_name

VARCHAR(180)

Pipeline name

pipeline\_type

VARCHAR(80)

EnterpriseSales, SME, Partner, Renewal

is\_default

BOOLEAN

Default pipeline flag

lifecycle\_status

VARCHAR(50)

Active, Inactive, Archived

created\_at

TIMESTAMPTZ

Creation timestamp

updated\_at

TIMESTAMPTZ

Update timestamp

**Suggested Table: crm\_pipeline\_stages**

**Column**

**Data Type**

**Description**

stage\_id

UUID

Primary stage identifier

tenant\_id

UUID

Tenant identifier

pipeline\_id

UUID

Pipeline reference

stage\_name

VARCHAR(150)

Stage name

stage\_code

VARCHAR(80)

Stage code

stage\_order

INTEGER

Stage order

default\_probability

NUMERIC(5,2)

Default probability

is\_closed\_stage

BOOLEAN

Closed stage flag

is\_won\_stage

BOOLEAN

Won stage flag

lifecycle\_status

VARCHAR(50)

Active, Inactive, Archived

created\_at

TIMESTAMPTZ

Creation timestamp

**Suggested Table: crm\_opportunity\_stage\_history**

**Column**

**Data Type**

**Description**

stage\_history\_id

UUID

Primary history identifier

tenant\_id

UUID

Tenant identifier

opportunity\_id

UUID

Opportunity

from\_stage\_id

UUID

Previous stage

to\_stage\_id

UUID

New stage

changed\_by\_user\_id

UUID

User who changed stage

change\_note

TEXT

Optional note

changed\_at

TIMESTAMPTZ

Change timestamp

**23.7 Sales Activities**

**Overview**

Sales Activities track interactions between sales teams and leads, contacts, or accounts.

Examples include:

-   Calls
-   Emails
-   Meetings
-   Demos
-   Follow-ups
-   Proposals
-   WhatsApp messages
-   Site visits
-   Contract discussions

**Suggested Table: crm\_activities**

**Column**

**Data Type**

**Description**

activity\_id

UUID

Primary activity identifier

tenant\_id

UUID

Tenant identifier

activity\_type

VARCHAR(80)

Call, Email, Meeting, Demo, FollowUp, Proposal

related\_entity\_type

VARCHAR(80)

Lead, Account, Contact, Opportunity

related\_entity\_id

UUID

Related entity

subject

VARCHAR(255)

Activity subject

activity\_description

TEXT

Details

activity\_status

VARCHAR(50)

Planned, Completed, Cancelled, Overdue

owner\_user\_id

UUID

Activity owner

scheduled\_at

TIMESTAMPTZ

Scheduled time

completed\_at

TIMESTAMPTZ

Completion time

outcome

VARCHAR(120)

Outcome

next\_action

TEXT

Next step

metadata

JSONB

Flexible metadata

created\_at

TIMESTAMPTZ

Creation timestamp

updated\_at

TIMESTAMPTZ

Update timestamp

**23.8 CRM Notes and Interactions**

**Overview**

CRM notes capture rich commercial context from meetings, calls, emails, demos, proposals, negotiations, and customer conversations.

**Suggested Table: crm\_notes**

**Column**

**Data Type**

**Description**

note\_id

UUID

Primary note identifier

tenant\_id

UUID

Tenant identifier

related\_entity\_type

VARCHAR(80)

Lead, Account, Contact, Opportunity

related\_entity\_id

UUID

Related entity

author\_user\_id

UUID

Note author

note\_title

VARCHAR(255)

Note title

note\_summary

TEXT

Summary

note\_document\_id

VARCHAR(120)

MongoDB note document

visibility\_status

VARCHAR(50)

Private, Team, Organization

created\_at

TIMESTAMPTZ

Creation timestamp

updated\_at

TIMESTAMPTZ

Update timestamp

**MongoDB Collection: crm\_note\_documents**

{

"note\_id": "uuid",

"tenant\_id": "uuid",

"body": "Client is interested in enterprise workforce management and AI matching.",

"entities": \[\],

"action\_items": \[\],

"sentiment": "positive",

"created\_at": "timestamp"

}

**23.9 Campaigns**

**Overview**

Campaigns represent structured sales or marketing initiatives used to generate leads, nurture prospects, promote subscriptions, acquire employers, or activate professionals.

**Suggested Table: crm\_campaigns**

**Column**

**Data Type**

**Description**

campaign\_id

UUID

Primary campaign identifier

tenant\_id

UUID

Tenant identifier

campaign\_name

VARCHAR(255)

Campaign name

campaign\_type

VARCHAR(80)

Email, Event, Webinar, Ads, Referral, Partner

target\_segment

VARCHAR(180)

Target audience

campaign\_status

VARCHAR(50)

Draft, Active, Paused, Completed, Cancelled

budget\_amount

NUMERIC(14,2)

Campaign budget

currency\_code

CHAR(3)

Currency

start\_date

DATE

Campaign start

end\_date

DATE

Campaign end

owner\_user\_id

UUID

Campaign owner

metadata

JSONB

Flexible metadata

created\_at

TIMESTAMPTZ

Creation timestamp

updated\_at

TIMESTAMPTZ

Update timestamp

**Suggested Table: crm\_campaign\_members**

**Column**

**Data Type**

**Description**

campaign\_member\_id

UUID

Primary member identifier

tenant\_id

UUID

Tenant identifier

campaign\_id

UUID

Campaign

member\_type

VARCHAR(80)

Lead, Contact, Account

member\_id

UUID

Member entity

member\_status

VARCHAR(80)

Added, Contacted, Responded, Converted, Unsubscribed

response\_at

TIMESTAMPTZ

Response timestamp

created\_at

TIMESTAMPTZ

Creation timestamp

**23.10 AI CRM Intelligence**

**Overview**

AI CRM Intelligence supports lead scoring, opportunity risk detection, next-best action recommendations, churn prediction, proposal assistance, account summarization, and pipeline forecasting.

**Suggested Table: crm\_ai\_insights**

**Column**

**Data Type**

**Description**

crm\_ai\_insight\_id

UUID

Primary insight identifier

tenant\_id

UUID

Tenant identifier

insight\_type

VARCHAR(100)

LeadScore, DealRisk, NextBestAction, ChurnRisk, Forecast

target\_entity\_type

VARCHAR(80)

Lead, Account, Opportunity, Contact

target\_entity\_id

UUID

Target entity

model\_id

UUID

AI model reference

insight\_summary

TEXT

Human-readable insight

insight\_payload

JSONB

Machine-readable insight

confidence\_score

NUMERIC(8,4)

Confidence

recommendation\_status

VARCHAR(50)

Generated, Viewed, Accepted, Dismissed, Expired

generated\_at

TIMESTAMPTZ

Generation timestamp

expires\_at

TIMESTAMPTZ

Expiry timestamp

feedback

JSONB

Human feedback

**Design Notes**

AI-generated CRM insights should be advisory unless explicitly approved for automation. Sales users should be able to accept, dismiss, or provide feedback on recommendations.

**23.11 CRM Search Model**

**Overview**

CRM Search enables fast discovery of leads, accounts, contacts, opportunities, activities, campaigns, and notes.

**OpenSearch Index: crm\_v1**

**Field**

**Type**

**Purpose**

entity\_id

keyword

Lead, account, contact, or opportunity ID

tenant\_id

keyword

Tenant filtering

entity\_type

keyword

Lead, Account, Contact, Opportunity

name

text/keyword

Name search

email

keyword

Email lookup

phone

keyword

Phone lookup

company\_name

text/keyword

Company search

industry

keyword

Industry filtering

country\_code

keyword

Country filtering

status

keyword

Lifecycle/status filtering

owner\_user\_id

keyword

Owner filtering

summary\_text

text

Notes and description search

created\_at

date

Recency filtering

**23.12 CRM Analytics**

**Overview**

CRM Analytics measures sales activity, pipeline health, lead conversion, opportunity value, campaign performance, revenue forecasts, and account growth.

**Suggested Table: crm\_events**

**Column**

**Data Type**

**Description**

crm\_event\_id

UUID

Primary event identifier

tenant\_id

UUID

Tenant identifier

event\_type

VARCHAR(120)

LeadCreated, OpportunityWon, ActivityCompleted

target\_entity\_type

VARCHAR(80)

Lead, Account, Contact, Opportunity

target\_entity\_id

UUID

Target entity

actor\_user\_id

UUID

User who triggered event

event\_payload

JSONB

Event details

occurred\_at

TIMESTAMPTZ

Business event timestamp

created\_at

TIMESTAMPTZ

Storage timestamp

**Key Metrics**

-   Leads created
-   Lead qualification rate
-   Lead conversion rate
-   Opportunity win rate
-   Pipeline value
-   Weighted pipeline value
-   Average deal size
-   Sales cycle length
-   Campaign conversion rate
-   Activity completion rate
-   Account growth
-   Churn risk
-   Forecast accuracy
-   Revenue by source

**Recommended ClickHouse Fact Tables**

-   fact\_crm\_leads
-   fact\_crm\_opportunities
-   fact\_crm\_pipeline\_value
-   fact\_crm\_sales\_activity
-   fact\_crm\_campaign\_performance
-   fact\_crm\_account\_lifecycle
-   fact\_crm\_forecast\_accuracy

**23.13 Constraints**

**Primary Key Constraints**

Core tables use UUID primary keys:

-   lead\_id
-   account\_id
-   contact\_id
-   opportunity\_id
-   pipeline\_id
-   stage\_id
-   activity\_id
-   note\_id
-   campaign\_id
-   crm\_ai\_insight\_id

**Foreign Key Constraints**

Recommended internal foreign keys:

-   crm\_contacts.account\_id → crm\_accounts.account\_id
-   crm\_opportunities.account\_id → crm\_accounts.account\_id
-   crm\_opportunities.lead\_id → crm\_leads.lead\_id
-   crm\_opportunities.pipeline\_id → crm\_pipelines.pipeline\_id
-   crm\_opportunities.current\_stage\_id → crm\_pipeline\_stages.stage\_id
-   crm\_pipeline\_stages.pipeline\_id → crm\_pipelines.pipeline\_id
-   crm\_opportunity\_stage\_history.opportunity\_id → crm\_opportunities.opportunity\_id
-   crm\_campaign\_members.campaign\_id → crm\_campaigns.campaign\_id

Cross-service identifiers such as linked\_organization\_id, linked\_user\_id, owner\_user\_id, and model\_id should be validated through APIs or synchronized read models.

**Check Constraints**

Recommended checks:

-   probability\_percentage BETWEEN 0 AND 100
-   qualification\_score BETWEEN 0 AND 1
-   confidence\_score BETWEEN 0 AND 1
-   estimated\_value >= 0
-   expected\_value >= 0
-   budget\_amount >= 0
-   end\_date IS NULL OR end\_date >= start\_date
-   actual\_close\_date IS NULL OR expected\_close\_date IS NOT NULL

**Unique Constraints**

Recommended unique constraints:

-   Unique pipeline stage order per pipeline.
-   Unique pipeline stage code per pipeline.
-   Unique account name per tenant where appropriate.
-   Unique contact email per account where available.
-   Unique campaign member per campaign and entity.
-   Unique active lead email per tenant where duplicate detection is required.

**23.14 Indexing Strategy**

**Lead Indexes**

Recommended indexes:

-   idx\_crm\_leads\_tenant\_status
-   idx\_crm\_leads\_email
-   idx\_crm\_leads\_company
-   idx\_crm\_leads\_owner
-   idx\_crm\_leads\_source
-   idx\_crm\_leads\_created\_at

**Account Indexes**

Recommended indexes:

-   idx\_crm\_accounts\_tenant\_status
-   idx\_crm\_accounts\_name
-   idx\_crm\_accounts\_owner
-   idx\_crm\_accounts\_linked\_org
-   idx\_crm\_accounts\_lifecycle\_stage

**Contact Indexes**

Recommended indexes:

-   idx\_crm\_contacts\_account
-   idx\_crm\_contacts\_email
-   idx\_crm\_contacts\_phone
-   idx\_crm\_contacts\_linked\_user
-   idx\_crm\_contacts\_status

**Opportunity Indexes**

Recommended indexes:

-   idx\_crm\_opportunities\_account
-   idx\_crm\_opportunities\_pipeline\_stage
-   idx\_crm\_opportunities\_owner
-   idx\_crm\_opportunities\_status
-   idx\_crm\_opportunities\_expected\_close
-   idx\_crm\_opportunities\_value

**Activity Indexes**

Recommended indexes:

-   idx\_crm\_activities\_related\_entity
-   idx\_crm\_activities\_owner
-   idx\_crm\_activities\_status
-   idx\_crm\_activities\_scheduled\_at

**Campaign Indexes**

Recommended indexes:

-   idx\_crm\_campaigns\_status
-   idx\_crm\_campaigns\_date\_range
-   idx\_crm\_campaign\_members\_campaign
-   idx\_crm\_campaign\_members\_member

**23.15 Partitioning Strategy**

**Time-Based Partitioning**

Recommended monthly or quarterly partitioning for:

-   crm\_events
-   crm\_activities
-   crm\_opportunity\_stage\_history
-   crm\_ai\_insights

**Tenant-Aware Partitioning**

Large tenants with high CRM activity may require tenant-based partitions or tenant-isolated schemas.

**Archival Strategy**

Closed opportunities, old activities, completed campaigns, and historical CRM events should be archived after the operational retention period while preserving customer lifecycle history and revenue attribution.

**23.16 ERD**

**Conceptual ERD**

CRMLead

├── CRMAccount

│ ├── CRMContact

│ ├── CRMOpportunity

│ │ ├── CRMOpportunityStageHistory

│ │ └── CRMAIInsight

│ └── CRMActivity

└── CRMOpportunity

CRMPipeline

└── CRMPipelineStage

└── CRMOpportunity

CRMCampaign

└── CRMCampaignMember

CRMNote

CRMEvent

**Relationship Summary**

**Parent Entity**

**Child Entity**

**Cardinality**

Lead

Account

0:1 conversion

Lead

Opportunity

0:1 conversion

Account

Contacts

1:N

Account

Opportunities

1:N

Pipeline

Pipeline Stages

1:N

Pipeline Stage

Opportunities

1:N

Opportunity

Stage History

1:N

Campaign

Campaign Members

1:N

Lead/Account/Contact/Opportunity

Activities

1:N logical

Lead/Account/Contact/Opportunity

Notes

1:N logical

Lead/Account/Opportunity

AI Insights

1:N logical

**ERD Design Notes**

The CRM Database is centered on the commercial lifecycle from lead to account to opportunity to customer. Leads capture early interest, accounts represent relationship ownership, contacts represent people within those accounts, opportunities represent revenue potential, and pipelines manage sales progression.

The design separates commercial records from verified platform organizations. This allows Kaziforce to manage prospects before they become fully onboarded organizations while still linking CRM accounts to verified organization records when conversion occurs.

**24\. Customer Support Database**

**24.1 Overview**

The Customer Support Database manages support operations for Kaziforce users, professionals, employers, organizations, administrators, partners, and internal teams. It supports ticket creation, case management, service-level agreements, escalations, support queues, knowledge base linkage, customer conversations, issue categorization, agent assignment, resolution tracking, satisfaction surveys, and support analytics.

The Customer Support Service owns this database. It integrates with the Messaging Service, Notification Service, Knowledge Base Service, Identity Service, Organization Service, CRM Service, AI Agent Service, and Audit Service.

**Primary Responsibilities**

The database supports:

-   Support tickets
-   Support queues
-   Ticket categories
-   Ticket priorities
-   SLA policies
-   Escalations
-   Assignments
-   Ticket comments
-   Internal notes
-   Attachments
-   Customer satisfaction surveys
-   Knowledge base references
-   AI support suggestions
-   Support analytics

**Primary Data Stores**

**Data Store**

**Purpose**

PostgreSQL

Tickets, queues, assignments, SLAs, escalations, surveys

MongoDB

Long-form ticket notes, AI summaries, rich support conversations

Object Storage

Screenshots, documents, logs, evidence files

Redis

Support queue cache, assignment locks, SLA timers

OpenSearch

Ticket search

ClickHouse

Support analytics and SLA reporting

Kafka

Support events and downstream notifications

**24.2 Support Tickets**

**Overview**

Support tickets represent user-reported issues, service requests, complaints, incidents, inquiries, technical problems, account requests, billing queries, compliance concerns, or platform assistance requests.

**Suggested Table: support\_tickets**

**Column**

**Data Type**

**Description**

ticket\_id

UUID

Primary ticket identifier

tenant\_id

UUID

Tenant identifier

ticket\_number

VARCHAR(100)

Human-readable ticket number

requester\_user\_id

UUID

User who raised the ticket

requester\_profile\_id

UUID

Optional professional profile

requester\_organization\_id

UUID

Optional organization

assigned\_agent\_user\_id

UUID

Assigned support agent

support\_queue\_id

UUID

Support queue

category\_id

UUID

Ticket category

priority

VARCHAR(50)

Low, Medium, High, Urgent, Critical

severity

VARCHAR(50)

Minor, Major, Severe, Critical

ticket\_type

VARCHAR(80)

Incident, Request, Question, Complaint, Bug, Billing

subject

VARCHAR(255)

Ticket subject

description

TEXT

Short issue description

description\_document\_id

VARCHAR(120)

MongoDB rich description reference

ticket\_status

VARCHAR(50)

New, Open, Pending, On Hold, Escalated, Resolved, Closed

source\_channel

VARCHAR(80)

Web, Mobile, Email, WhatsApp, Chat, Phone, API

related\_entity\_type

VARCHAR(80)

Job, Contract, Payment, Profile, Organization, Course

related\_entity\_id

UUID

Related entity

sla\_policy\_id

UUID

SLA policy

first\_response\_due\_at

TIMESTAMPTZ

First response deadline

resolution\_due\_at

TIMESTAMPTZ

Resolution deadline

first\_responded\_at

TIMESTAMPTZ

First response timestamp

resolved\_at

TIMESTAMPTZ

Resolution timestamp

closed\_at

TIMESTAMPTZ

Closure timestamp

metadata

JSONB

Flexible metadata

created\_at

TIMESTAMPTZ

Creation timestamp

updated\_at

TIMESTAMPTZ

Update timestamp

deleted\_at

TIMESTAMPTZ

Soft delete timestamp

version

INTEGER

Optimistic locking version

**Design Notes**

Tickets should preserve full lifecycle history. Status changes, assignments, escalations, SLA changes, and resolution actions should be stored as separate events.

**24.3 Ticket Categories**

**Overview**

Ticket categories classify support requests for routing, analytics, automation, knowledge suggestions, and SLA assignment.

**Suggested Table: support\_ticket\_categories**

**Column**

**Data Type**

**Description**

category\_id

UUID

Primary category identifier

tenant\_id

UUID

Tenant identifier

parent\_category\_id

UUID

Optional parent category

category\_code

VARCHAR(100)

Unique category code

category\_name

VARCHAR(180)

Category name

description

TEXT

Category description

default\_priority

VARCHAR(50)

Default priority

default\_queue\_id

UUID

Default queue

default\_sla\_policy\_id

UUID

Default SLA

lifecycle\_status

VARCHAR(50)

Active, Inactive, Archived

created\_at

TIMESTAMPTZ

Creation timestamp

updated\_at

TIMESTAMPTZ

Update timestamp

**Example Categories**

-   Account access
-   Billing and payments
-   Wallet and payouts
-   Job posting
-   Applications
-   Contracts
-   Identity verification
-   Profile support
-   Technical issue
-   Abuse report
-   Content moderation
-   Learning support
-   AI assistant issue

**24.4 Support Queues**

**Overview**

Support queues group tickets by function, region, product area, severity, customer segment, or support tier.

**Suggested Table: support\_queues**

**Column**

**Data Type**

**Description**

support\_queue\_id

UUID

Primary queue identifier

tenant\_id

UUID

Tenant identifier

queue\_name

VARCHAR(180)

Queue name

queue\_type

VARCHAR(80)

General, Billing, Technical, Enterprise, Compliance

description

TEXT

Queue description

default\_sla\_policy\_id

UUID

Default SLA

assignment\_strategy

VARCHAR(80)

RoundRobin, LeastLoaded, SkillBased, Manual, AI

lifecycle\_status

VARCHAR(50)

Active, Inactive, Archived

created\_at

TIMESTAMPTZ

Creation timestamp

updated\_at

TIMESTAMPTZ

Update timestamp

**Suggested Table: support\_queue\_members**

**Column**

**Data Type**

**Description**

queue\_member\_id

UUID

Primary queue member identifier

tenant\_id

UUID

Tenant identifier

support\_queue\_id

UUID

Queue

agent\_user\_id

UUID

Support agent

role

VARCHAR(80)

Agent, Lead, Supervisor

skill\_tags

JSONB

Skills or categories handled

max\_active\_tickets

INTEGER

Capacity limit

availability\_status

VARCHAR(50)

Available, Busy, Offline, On Leave

joined\_at

TIMESTAMPTZ

Join timestamp

left\_at

TIMESTAMPTZ

Leave timestamp

lifecycle\_status

VARCHAR(50)

Active, Inactive

**24.5 Ticket Assignments**

**Overview**

Ticket assignments track which support agent or team is responsible for handling a ticket.

**Suggested Table: support\_ticket\_assignments**

**Column**

**Data Type**

**Description**

assignment\_id

UUID

Primary assignment identifier

tenant\_id

UUID

Tenant identifier

ticket\_id

UUID

Ticket

support\_queue\_id

UUID

Queue

assigned\_agent\_user\_id

UUID

Assigned agent

assignment\_type

VARCHAR(80)

Manual, Auto, Escalation, AIRecommended

assignment\_status

VARCHAR(50)

Active, Reassigned, Completed, Cancelled

assigned\_by\_user\_id

UUID

User who assigned

assigned\_at

TIMESTAMPTZ

Assignment timestamp

unassigned\_at

TIMESTAMPTZ

Unassignment timestamp

assignment\_reason

TEXT

Assignment reason

metadata

JSONB

Flexible metadata

**Design Notes**

Assignment history should be append-only. Reassignments should create new assignment records while closing prior active assignment records.

**24.6 Ticket Comments and Notes**

**Overview**

Ticket comments are customer-visible updates. Internal notes are private to support teams. Both support collaboration and traceability.

**Suggested Table: support\_ticket\_comments**

**Column**

**Data Type**

**Description**

comment\_id

UUID

Primary comment identifier

tenant\_id

UUID

Tenant identifier

ticket\_id

UUID

Ticket

author\_user\_id

UUID

Author

author\_type

VARCHAR(80)

Customer, Agent, System, AI Agent

comment\_visibility

VARCHAR(50)

Public, Internal

comment\_body

TEXT

Comment text

comment\_document\_id

VARCHAR(120)

MongoDB rich comment reference

has\_attachments

BOOLEAN

Attachment flag

created\_at

TIMESTAMPTZ

Creation timestamp

updated\_at

TIMESTAMPTZ

Update timestamp

deleted\_at

TIMESTAMPTZ

Soft delete timestamp

**MongoDB Collection: support\_comment\_documents**

{

"comment\_id": "uuid",

"ticket\_id": "uuid",

"tenant\_id": "uuid",

"body": {

"format": "markdown",

"text": "We are checking the payment reversal issue."

},

"mentions": \[\],

"attachments": \[\],

"created\_at": "timestamp"

}

**24.7 Attachments**

**Overview**

Support tickets may include screenshots, logs, documents, receipts, payment confirmations, identity verification files, contracts, invoices, and technical evidence.

Files are stored in Object Storage. Metadata is stored in PostgreSQL.

**Suggested Table: support\_attachments**

**Column**

**Data Type**

**Description**

attachment\_id

UUID

Primary attachment identifier

tenant\_id

UUID

Tenant identifier

ticket\_id

UUID

Ticket

comment\_id

UUID

Optional comment

uploaded\_by\_user\_id

UUID

Uploader

file\_name

VARCHAR(255)

Original file name

mime\_type

VARCHAR(150)

MIME type

file\_size\_bytes

BIGINT

File size

object\_key

TEXT

Object storage reference

checksum

VARCHAR(128)

Integrity checksum

virus\_scan\_status

VARCHAR(50)

Pending, Clean, Infected, Failed

confidentiality\_level

VARCHAR(50)

Public, Internal, Confidential, Restricted

lifecycle\_status

VARCHAR(50)

Active, Archived, Deleted

created\_at

TIMESTAMPTZ

Upload timestamp

deleted\_at

TIMESTAMPTZ

Soft delete timestamp

**24.8 SLA Policies**

**Overview**

Service-Level Agreement policies define required response and resolution timelines based on priority, severity, customer tier, ticket type, queue, or tenant configuration.

**Suggested Table: support\_sla\_policies**

**Column**

**Data Type**

**Description**

sla\_policy\_id

UUID

Primary SLA policy identifier

tenant\_id

UUID

Tenant identifier

policy\_name

VARCHAR(180)

SLA policy name

customer\_tier

VARCHAR(80)

Free, Standard, Premium, Enterprise

priority

VARCHAR(50)

Low, Medium, High, Urgent, Critical

first\_response\_minutes

INTEGER

First response target

resolution\_minutes

INTEGER

Resolution target

business\_hours\_only

BOOLEAN

Whether SLA counts business hours only

escalation\_enabled

BOOLEAN

Escalation enabled

lifecycle\_status

VARCHAR(50)

Active, Inactive, Archived

created\_at

TIMESTAMPTZ

Creation timestamp

updated\_at

TIMESTAMPTZ

Update timestamp

**Suggested Table: support\_sla\_events**

**Column**

**Data Type**

**Description**

sla\_event\_id

UUID

Primary SLA event

tenant\_id

UUID

Tenant identifier

ticket\_id

UUID

Ticket

sla\_policy\_id

UUID

SLA policy

event\_type

VARCHAR(80)

Started, Paused, Resumed, Breached, Met

event\_time

TIMESTAMPTZ

Event timestamp

reason

TEXT

Event reason

created\_at

TIMESTAMPTZ

Creation timestamp

**Design Notes**

SLA calculations should account for business hours, holidays, ticket pauses, waiting-on-customer status, and escalation rules.

**24.9 Escalations**

**Overview**

Escalations ensure high-priority or overdue tickets are routed to supervisors, specialist teams, or compliance handlers.

**Suggested Table: support\_escalations**

**Column**

**Data Type**

**Description**

escalation\_id

UUID

Primary escalation identifier

tenant\_id

UUID

Tenant identifier

ticket\_id

UUID

Ticket

escalation\_level

INTEGER

Escalation level

escalated\_from\_user\_id

UUID

Previous owner

escalated\_to\_user\_id

UUID

Escalated user

escalated\_to\_queue\_id

UUID

Escalated queue

escalation\_reason

VARCHAR(120)

SLA Risk, SLA Breach, Customer Complaint, Severity

escalation\_status

VARCHAR(50)

Active, Resolved, Cancelled

escalated\_at

TIMESTAMPTZ

Escalation timestamp

resolved\_at

TIMESTAMPTZ

Resolution timestamp

metadata

JSONB

Flexible metadata

**24.10 Ticket Status History**

**Overview**

Ticket Status History records every state transition for lifecycle traceability.

**Suggested Table: support\_ticket\_status\_history**

**Column**

**Data Type**

**Description**

status\_history\_id

UUID

Primary status history identifier

tenant\_id

UUID

Tenant identifier

ticket\_id

UUID

Ticket

from\_status

VARCHAR(50)

Previous status

to\_status

VARCHAR(50)

New status

changed\_by\_user\_id

UUID

Actor

change\_reason

TEXT

Reason

changed\_at

TIMESTAMPTZ

Change timestamp

**24.11 Knowledge Base Links**

**Overview**

Knowledge Base Links connect support tickets to helpful articles, FAQs, troubleshooting guides, policies, or AI-suggested content.

**Suggested Table: support\_knowledge\_links**

**Column**

**Data Type**

**Description**

support\_knowledge\_link\_id

UUID

Primary link identifier

tenant\_id

UUID

Tenant identifier

ticket\_id

UUID

Ticket

knowledge\_content\_type

VARCHAR(80)

Article, FAQ, Guide

knowledge\_content\_id

UUID

Knowledge item

link\_source

VARCHAR(80)

Agent, AI, Customer, System

usefulness\_status

VARCHAR(50)

Suggested, Used, Helpful, NotHelpful

linked\_at

TIMESTAMPTZ

Link timestamp

**24.12 Customer Satisfaction Surveys**

**Overview**

Customer Satisfaction Surveys measure support quality after resolution or closure.

**Suggested Table: support\_satisfaction\_surveys**

**Column**

**Data Type**

**Description**

survey\_id

UUID

Primary survey identifier

tenant\_id

UUID

Tenant identifier

ticket\_id

UUID

Ticket

requester\_user\_id

UUID

Customer

rating

NUMERIC(2,1)

Satisfaction rating

csat\_score

NUMERIC(5,2)

Customer satisfaction score

nps\_score

INTEGER

Net promoter score

feedback\_text

TEXT

Customer feedback

submitted\_at

TIMESTAMPTZ

Submission timestamp

created\_at

TIMESTAMPTZ

Creation timestamp

**Design Notes**

Survey requests should be sent only after ticket resolution or closure. Reopened tickets may trigger a new survey cycle.

**24.13 AI Support Assistance**

**Overview**

AI Support Assistance helps agents respond faster and more consistently by generating summaries, suggesting replies, recommending knowledge articles, classifying tickets, detecting sentiment, and identifying escalation risk.

**Suggested Table: support\_ai\_insights**

**Column**

**Data Type**

**Description**

support\_ai\_insight\_id

UUID

Primary AI insight

tenant\_id

UUID

Tenant identifier

ticket\_id

UUID

Ticket

ai\_agent\_id

UUID

AI agent

model\_id

UUID

AI model

insight\_type

VARCHAR(100)

Summary, SuggestedReply, Classification, EscalationRisk

insight\_summary

TEXT

Human-readable insight

insight\_payload

JSONB

Machine-readable output

confidence\_score

NUMERIC(8,4)

Confidence

recommendation\_status

VARCHAR(50)

Generated, Accepted, Edited, Dismissed

generated\_at

TIMESTAMPTZ

Generation timestamp

feedback

JSONB

Agent feedback

**Design Notes**

AI-suggested replies should not be sent automatically unless configured and approved. Support agents should be able to edit or reject AI suggestions.

**24.14 Support Search Model**

**Overview**

Support Search enables fast discovery of tickets, comments, notes, categories, customers, attachments, and support history.

**OpenSearch Index: support\_tickets\_v1**

**Field**

**Type**

**Purpose**

ticket\_id

keyword

Ticket identifier

tenant\_id

keyword

Tenant filter

ticket\_number

keyword

Ticket lookup

requester\_user\_id

keyword

Requester filter

requester\_organization\_id

keyword

Organization filter

assigned\_agent\_user\_id

keyword

Agent filter

support\_queue\_id

keyword

Queue filter

category\_id

keyword

Category filter

priority

keyword

Priority filter

severity

keyword

Severity filter

ticket\_status

keyword

Status filter

subject

text/keyword

Subject search

description

text

Description search

comments\_text

text

Comment search

source\_channel

keyword

Channel filter

created\_at

date

Date filtering

updated\_at

date

Recency ranking

embedding\_vector

dense\_vector

Semantic ticket search

**24.15 Support Analytics**

**Overview**

Support Analytics measures ticket volume, SLA performance, resolution quality, support agent productivity, queue workload, customer satisfaction, AI effectiveness, and operational health.

**Suggested Table: support\_events**

**Column**

**Data Type**

**Description**

support\_event\_id

UUID

Primary event identifier

tenant\_id

UUID

Tenant identifier

event\_type

VARCHAR(120)

TicketCreated, TicketAssigned, SLA Breached, TicketResolved

ticket\_id

UUID

Ticket

requester\_user\_id

UUID

Optional requester

assigned\_agent\_user\_id

UUID

Optional agent

support\_queue\_id

UUID

Optional queue

event\_payload

JSONB

Event details

occurred\_at

TIMESTAMPTZ

Business event time

created\_at

TIMESTAMPTZ

Storage timestamp

**Key Metrics**

-   Tickets created
-   Tickets resolved
-   Tickets reopened
-   Average first response time
-   Average resolution time
-   SLA breach rate
-   Queue backlog
-   Agent workload
-   Agent productivity
-   Customer satisfaction score
-   Escalation rate
-   AI suggestion acceptance rate
-   Knowledge article deflection rate
-   Ticket volume by category
-   Ticket volume by channel

**Recommended ClickHouse Fact Tables**

-   fact\_support\_tickets
-   fact\_support\_sla
-   fact\_support\_resolution\_time
-   fact\_support\_queue\_workload
-   fact\_support\_agent\_productivity
-   fact\_support\_csat
-   fact\_support\_ai\_assistance
-   fact\_support\_knowledge\_deflection

**24.16 Constraints**

**Primary Key Constraints**

Core tables use UUID primary keys:

-   ticket\_id
-   category\_id
-   support\_queue\_id
-   queue\_member\_id
-   assignment\_id
-   comment\_id
-   attachment\_id
-   sla\_policy\_id
-   sla\_event\_id
-   escalation\_id
-   status\_history\_id
-   survey\_id
-   support\_ai\_insight\_id

**Foreign Key Constraints**

Recommended internal foreign keys:

-   support\_tickets.category\_id → support\_ticket\_categories.category\_id
-   support\_tickets.support\_queue\_id → support\_queues.support\_queue\_id
-   support\_tickets.sla\_policy\_id → support\_sla\_policies.sla\_policy\_id
-   support\_queue\_members.support\_queue\_id → support\_queues.support\_queue\_id
-   support\_ticket\_assignments.ticket\_id → support\_tickets.ticket\_id
-   support\_ticket\_comments.ticket\_id → support\_tickets.ticket\_id
-   support\_attachments.ticket\_id → support\_tickets.ticket\_id
-   support\_attachments.comment\_id → support\_ticket\_comments.comment\_id
-   support\_sla\_events.ticket\_id → support\_tickets.ticket\_id
-   support\_escalations.ticket\_id → support\_tickets.ticket\_id
-   support\_ticket\_status\_history.ticket\_id → support\_tickets.ticket\_id
-   support\_satisfaction\_surveys.ticket\_id → support\_tickets.ticket\_id
-   support\_ai\_insights.ticket\_id → support\_tickets.ticket\_id

Cross-service identifiers such as requester\_user\_id, organization\_id, ai\_agent\_id, model\_id, and knowledge\_content\_id should be validated through APIs or event-synchronized read models.

**Check Constraints**

Recommended checks:

-   rating BETWEEN 1 AND 5
-   csat\_score BETWEEN 0 AND 100
-   nps\_score BETWEEN -100 AND 100
-   confidence\_score BETWEEN 0 AND 1
-   first\_response\_minutes >= 0
-   resolution\_minutes >= 0
-   escalation\_level >= 1
-   file\_size\_bytes >= 0

**Unique Constraints**

Recommended unique constraints:

-   Unique ticket number per tenant.
-   Unique category code per tenant.
-   Unique queue name per tenant.
-   One active queue membership per agent and queue.
-   One active ticket assignment per ticket.
-   One satisfaction survey per ticket closure cycle.
-   One default SLA policy per customer tier and priority where applicable.

**24.17 Indexing Strategy**

**Ticket Indexes**

Recommended indexes:

-   idx\_support\_tickets\_tenant\_status
-   idx\_support\_tickets\_number
-   idx\_support\_tickets\_requester
-   idx\_support\_tickets\_org
-   idx\_support\_tickets\_queue
-   idx\_support\_tickets\_agent
-   idx\_support\_tickets\_category
-   idx\_support\_tickets\_priority
-   idx\_support\_tickets\_created\_at
-   idx\_support\_tickets\_resolution\_due

**Comment Indexes**

Recommended indexes:

-   idx\_support\_comments\_ticket
-   idx\_support\_comments\_author
-   idx\_support\_comments\_created\_at
-   idx\_support\_comments\_visibility

**SLA Indexes**

Recommended indexes:

-   idx\_sla\_events\_ticket
-   idx\_sla\_events\_type\_time
-   idx\_tickets\_first\_response\_due
-   idx\_tickets\_resolution\_due

**Assignment and Escalation Indexes**

Recommended indexes:

-   idx\_support\_assignments\_ticket
-   idx\_support\_assignments\_agent
-   idx\_support\_assignments\_queue
-   idx\_support\_escalations\_ticket
-   idx\_support\_escalations\_status

**Analytics Indexes**

Recommended indexes:

-   idx\_support\_events\_ticket
-   idx\_support\_events\_type
-   idx\_support\_events\_occurred\_at
-   idx\_support\_events\_queue
-   idx\_support\_events\_agent

**24.18 Partitioning Strategy**

**Time-Based Partitioning**

Recommended monthly or quarterly partitioning for:

-   support\_events
-   support\_ticket\_status\_history
-   support\_sla\_events
-   support\_ai\_insights
-   support\_ticket\_comments

**Tenant-Aware Partitioning**

Large enterprise tenants may require tenant-based partitions, dedicated ticket indexes, or dedicated support databases where ticket volume or compliance rules require isolation.

**Archival Strategy**

Closed tickets should remain available for support history, legal compliance, dispute resolution, customer relationship management, and AI training where consent allows. Old tickets may be archived after the operational retention period while preserving summary records and analytics.

**24.19 ERD**

**Conceptual ERD**

SupportTicket

├── SupportTicketCategory

├── SupportQueue

│ └── SupportQueueMember

├── SupportTicketAssignment

├── SupportTicketComment

│ └── SupportAttachment

├── SupportSLAEvent

│ └── SupportSLAPolicy

├── SupportEscalation

├── SupportTicketStatusHistory

├── SupportKnowledgeLink

├── SupportSatisfactionSurvey

├── SupportAIInsight

└── SupportEvent

**Relationship Summary**

**Parent Entity**

**Child Entity**

**Cardinality**

Support Ticket

Comments

1:N

Support Ticket

Attachments

1:N

Support Ticket

Assignments

1:N

Support Ticket

SLA Events

1:N

Support Ticket

Escalations

1:N

Support Ticket

Status History

1:N

Support Ticket

Knowledge Links

1:N

Support Ticket

Satisfaction Surveys

0:N

Support Ticket

AI Insights

0:N

Support Queue

Queue Members

1:N

Support Queue

Tickets

1:N

Ticket Category

Tickets

1:N

SLA Policy

Tickets

1:N

SLA Policy

SLA Events

1:N

**ERD Design Notes**

The Customer Support Database is centered on the support\_tickets entity. Tickets capture customer issues and service requests, while comments, attachments, assignments, SLA events, escalations, knowledge links, surveys, and AI insights capture the operational lifecycle around each ticket.

The design separates ticket content from workflow, SLA, AI assistance, and analytics records. This makes support operations auditable, scalable, searchable, and measurable while preserving integration boundaries with Messaging, Knowledge Base, Notification, CRM, and AI Agent services.

**25\. Finance & Wallet Database**

**25.1 Wallets**

**Overview**

The Finance & Wallet Database manages all monetary records, wallet balances, ledgers, transactions, payments, payouts, escrow, billing, invoices, tax records, refunds, reconciliations, and financial audit trails within Kaziforce.

The Finance and Wallet Services own this database. It is one of the most sensitive persistence layers in the Kaziforce platform because it stores financial records that affect users, professionals, organizations, platform revenue, taxes, commissions, settlement, and compliance.

The Finance & Wallet Database must follow strict accounting, security, audit, and reconciliation principles. All money movement must be recorded using immutable double-entry ledger records. Wallet balances must be derived from ledger entries or verified against ledger entries, not treated as the sole source of financial truth.

**Primary Responsibilities**

The database supports:

-   User wallets
-   Organization wallets
-   Platform wallets
-   Escrow wallets
-   Ledger entries
-   Financial transactions
-   Deposits
-   Withdrawals
-   Payouts
-   Payment collections
-   Payment provider integration
-   Invoicing
-   Billing
-   Tax records
-   Refunds
-   Reversals
-   Reconciliation
-   Financial audit trails
-   Revenue reporting

**Primary Data Stores**

**Data Store**

**Purpose**

PostgreSQL

Wallets, ledgers, transactions, payments, payouts, invoices, tax records

Redis

Payment locks, idempotency keys, balance cache, fraud throttling

Kafka

Financial events and downstream settlement workflows

Object Storage

Receipts, invoices, tax certificates, settlement reports

ClickHouse

Financial analytics and revenue reporting

OpenSearch

Invoice, transaction, and audit search

**Suggested Table: wallets**

**Column**

**Data Type**

**Description**

wallet\_id

UUID

Primary wallet identifier

tenant\_id

UUID

Tenant identifier

wallet\_owner\_type

VARCHAR(80)

User, Organization, Platform, Escrow, AI Agent

wallet\_owner\_id

UUID

Owner entity reference

wallet\_type

VARCHAR(80)

Personal, Organization, Escrow, Revenue, Settlement

currency\_code

CHAR(3)

Wallet currency

wallet\_status

VARCHAR(50)

Active, Frozen, Suspended, Closed

available\_balance

NUMERIC(18,4)

Spendable balance

ledger\_balance

NUMERIC(18,4)

Ledger-calculated balance

reserved\_balance

NUMERIC(18,4)

Funds on hold

minimum\_balance

NUMERIC(18,4)

Minimum required balance

last\_reconciled\_at

TIMESTAMPTZ

Last reconciliation timestamp

metadata

JSONB

Flexible wallet metadata

created\_at

TIMESTAMPTZ

Creation timestamp

updated\_at

TIMESTAMPTZ

Update timestamp

closed\_at

TIMESTAMPTZ

Closure timestamp

version

INTEGER

Optimistic locking version

**Design Notes**

Wallet balances must be updated only through controlled financial transaction workflows. Direct manual balance updates should be prohibited except through auditable adjustment entries.

**25.2 Ledger**

**Overview**

The ledger is the authoritative financial record of all money movement in Kaziforce. It must implement double-entry accounting, where every debit has a corresponding credit.

The ledger should be immutable. Corrections must be made using reversal or adjustment entries rather than updating existing ledger records.

**Suggested Table: ledger\_accounts**

**Column**

**Data Type**

**Description**

ledger\_account\_id

UUID

Primary ledger account identifier

tenant\_id

UUID

Tenant identifier

wallet\_id

UUID

Optional wallet reference

account\_code

VARCHAR(100)

Ledger account code

account\_name

VARCHAR(180)

Ledger account name

account\_type

VARCHAR(80)

Asset, Liability, Revenue, Expense, Equity

currency\_code

CHAR(3)

Account currency

owner\_type

VARCHAR(80)

User, Organization, Platform, Escrow

owner\_id

UUID

Owner reference

account\_status

VARCHAR(50)

Active, Frozen, Closed

created\_at

TIMESTAMPTZ

Creation timestamp

updated\_at

TIMESTAMPTZ

Update timestamp

**Suggested Table: ledger\_entries**

**Column**

**Data Type**

**Description**

ledger\_entry\_id

UUID

Primary ledger entry identifier

tenant\_id

UUID

Tenant identifier

transaction\_id

UUID

Related financial transaction

ledger\_account\_id

UUID

Ledger account

wallet\_id

UUID

Wallet reference

entry\_type

VARCHAR(20)

Debit or Credit

amount

NUMERIC(18,4)

Entry amount

currency\_code

CHAR(3)

Entry currency

exchange\_rate

NUMERIC(18,8)

Exchange rate if applicable

base\_currency\_amount

NUMERIC(18,4)

Amount in base currency

description

TEXT

Entry description

entry\_status

VARCHAR(50)

Posted, Reversed, Voided

posted\_at

TIMESTAMPTZ

Posting timestamp

created\_at

TIMESTAMPTZ

Creation timestamp

**Accounting Rule**

For every completed financial transaction:

-   Total debits must equal total credits.
-   Ledger entries must be posted atomically.
-   Posted entries must not be updated.
-   Reversals must create new ledger entries.

**25.3 Transactions**

**Overview**

Transactions represent business-level financial events such as deposits, payments, platform fees, commissions, escrow holds, payouts, refunds, reversals, and tax deductions.

**Suggested Table: financial\_transactions**

**Column**

**Data Type**

**Description**

transaction\_id

UUID

Primary transaction identifier

tenant\_id

UUID

Tenant identifier

transaction\_reference

VARCHAR(120)

Human-readable reference

transaction\_type

VARCHAR(80)

Deposit, Payment, Payout, Fee, Refund, Escrow, Tax

source\_wallet\_id

UUID

Source wallet

destination\_wallet\_id

UUID

Destination wallet

related\_entity\_type

VARCHAR(80)

Contract, Invoice, Timesheet, Subscription, Order

related\_entity\_id

UUID

Related entity reference

gross\_amount

NUMERIC(18,4)

Gross transaction amount

fee\_amount

NUMERIC(18,4)

Platform or provider fee

tax\_amount

NUMERIC(18,4)

Tax amount

net\_amount

NUMERIC(18,4)

Net amount

currency\_code

CHAR(3)

Transaction currency

transaction\_status

VARCHAR(50)

Pending, Processing, Completed, Failed, Reversed, Cancelled

idempotency\_key

VARCHAR(150)

Idempotency key

initiated\_by\_user\_id

UUID

Initiating user

completed\_at

TIMESTAMPTZ

Completion timestamp

failed\_at

TIMESTAMPTZ

Failure timestamp

failure\_reason

TEXT

Failure details

metadata

JSONB

Flexible metadata

created\_at

TIMESTAMPTZ

Creation timestamp

updated\_at

TIMESTAMPTZ

Update timestamp

**Design Notes**

Every external payment or internal wallet movement must have a unique idempotency key to prevent duplicate charges, duplicate payouts, or duplicate ledger posting.

**25.4 Escrow**

**Overview**

Escrow protects both organizations and professionals by holding funds until agreed work conditions are met. Escrow may be linked to contracts, milestones, projects, invoices, or dispute processes.

**Suggested Table: escrow\_accounts**

**Column**

**Data Type**

**Description**

escrow\_account\_id

UUID

Primary escrow account identifier

tenant\_id

UUID

Tenant identifier

escrow\_wallet\_id

UUID

Escrow wallet reference

organization\_id

UUID

Funding organization

professional\_profile\_id

UUID

Beneficiary professional

contract\_id

UUID

Related contract

project\_id

UUID

Related project

escrow\_status

VARCHAR(50)

Open, Funded, PartiallyReleased, Released, Disputed, Refunded, Closed

total\_funded\_amount

NUMERIC(18,4)

Total funded

total\_released\_amount

NUMERIC(18,4)

Total released

total\_refunded\_amount

NUMERIC(18,4)

Total refunded

currency\_code

CHAR(3)

Escrow currency

opened\_at

TIMESTAMPTZ

Opening timestamp

closed\_at

TIMESTAMPTZ

Closure timestamp

metadata

JSONB

Flexible metadata

**Suggested Table: escrow\_movements**

**Column**

**Data Type**

**Description**

escrow\_movement\_id

UUID

Primary escrow movement

tenant\_id

UUID

Tenant identifier

escrow\_account\_id

UUID

Escrow account

transaction\_id

UUID

Financial transaction

movement\_type

VARCHAR(80)

Fund, Hold, Release, Refund, DisputeHold

amount

NUMERIC(18,4)

Movement amount

currency\_code

CHAR(3)

Currency

movement\_status

VARCHAR(50)

Pending, Completed, Failed, Reversed

reason

TEXT

Movement reason

created\_at

TIMESTAMPTZ

Creation timestamp

completed\_at

TIMESTAMPTZ

Completion timestamp

**Design Notes**

Escrow release should require approved business triggers such as milestone approval, timesheet approval, contract completion, or dispute resolution.

**25.5 Payments**

**Overview**

Payments represent funds collected from users, organizations, or external payers through payment providers. Payments may fund wallets, pay invoices, fund escrow, pay subscriptions, or settle service fees.

**Suggested Table: payments**

**Column**

**Data Type**

**Description**

payment\_id

UUID

Primary payment identifier

tenant\_id

UUID

Tenant identifier

payer\_type

VARCHAR(80)

User, Organization, External

payer\_id

UUID

Payer reference

wallet\_id

UUID

Wallet credited

invoice\_id

UUID

Optional invoice

payment\_provider

VARCHAR(100)

M-Pesa, Stripe, Flutterwave, PayPal, Bank

provider\_payment\_reference

VARCHAR(255)

Provider reference

amount

NUMERIC(18,4)

Payment amount

currency\_code

CHAR(3)

Currency

payment\_method

VARCHAR(80)

Card, MobileMoney, BankTransfer, Wallet

payment\_status

VARCHAR(50)

Initiated, Pending, Confirmed, Failed, Cancelled, Refunded

provider\_response

JSONB

Provider response

idempotency\_key

VARCHAR(150)

Idempotency key

initiated\_at

TIMESTAMPTZ

Initiation timestamp

confirmed\_at

TIMESTAMPTZ

Confirmation timestamp

failed\_at

TIMESTAMPTZ

Failure timestamp

created\_at

TIMESTAMPTZ

Creation timestamp

**Design Notes**

Provider callbacks must be idempotent. Payment confirmation should trigger ledger posting only once.

**25.6 Payouts**

**Overview**

Payouts represent outbound funds sent to professionals, organizations, partners, or external bank/mobile money accounts.

**Suggested Table: payouts**

**Column**

**Data Type**

**Description**

payout\_id

UUID

Primary payout identifier

tenant\_id

UUID

Tenant identifier

recipient\_type

VARCHAR(80)

User, Professional, Organization, Partner

recipient\_id

UUID

Recipient reference

source\_wallet\_id

UUID

Wallet debited

payout\_method

VARCHAR(80)

MobileMoney, BankTransfer, Card, Wallet

payout\_provider

VARCHAR(100)

M-Pesa, Bank, Stripe, Flutterwave

provider\_payout\_reference

VARCHAR(255)

Provider reference

amount

NUMERIC(18,4)

Payout amount

fee\_amount

NUMERIC(18,4)

Payout fee

tax\_withheld\_amount

NUMERIC(18,4)

Tax withheld

net\_amount

NUMERIC(18,4)

Net payout

currency\_code

CHAR(3)

Currency

payout\_status

VARCHAR(50)

Requested, Approved, Processing, Paid, Failed, Reversed

requested\_by\_user\_id

UUID

Requesting user

approved\_by\_user\_id

UUID

Approver

requested\_at

TIMESTAMPTZ

Request timestamp

approved\_at

TIMESTAMPTZ

Approval timestamp

paid\_at

TIMESTAMPTZ

Payment timestamp

failure\_reason

TEXT

Failure detail

metadata

JSONB

Flexible metadata

**Suggested Table: payout\_accounts**

**Column**

**Data Type**

**Description**

payout\_account\_id

UUID

Primary payout account

tenant\_id

UUID

Tenant identifier

owner\_type

VARCHAR(80)

User, Organization

owner\_id

UUID

Owner reference

payout\_method

VARCHAR(80)

MobileMoney, BankTransfer

account\_name

VARCHAR(180)

Account holder name

account\_number\_encrypted

TEXT

Encrypted account number

bank\_code

VARCHAR(80)

Bank code

mobile\_money\_provider

VARCHAR(80)

M-Pesa, Airtel Money, etc.

country\_code

CHAR(2)

Country

currency\_code

CHAR(3)

Currency

verification\_status

VARCHAR(50)

Pending, Verified, Rejected

is\_default

BOOLEAN

Default payout account

created\_at

TIMESTAMPTZ

Creation timestamp

updated\_at

TIMESTAMPTZ

Update timestamp

**Design Notes**

Payout accounts contain sensitive financial data and must be encrypted, masked, and strictly access-controlled.

**25.7 Billing**

**Overview**

Billing manages recurring charges, service fees, subscription charges, contract billing, usage-based billing, and platform commissions.

**Suggested Table: billing\_accounts**

**Column**

**Data Type**

**Description**

billing\_account\_id

UUID

Primary billing account

tenant\_id

UUID

Tenant identifier

owner\_type

VARCHAR(80)

User, Organization

owner\_id

UUID

Owner reference

billing\_email

VARCHAR(255)

Billing contact email

billing\_currency

CHAR(3)

Billing currency

billing\_status

VARCHAR(50)

Active, Suspended, Closed

default\_payment\_method\_id

UUID

Default payment method

tax\_profile\_id

UUID

Tax profile

metadata

JSONB

Flexible metadata

created\_at

TIMESTAMPTZ

Creation timestamp

updated\_at

TIMESTAMPTZ

Update timestamp

**Suggested Table: billing\_charges**

**Column**

**Data Type**

**Description**

charge\_id

UUID

Primary charge identifier

tenant\_id

UUID

Tenant identifier

billing\_account\_id

UUID

Billing account

charge\_type

VARCHAR(80)

Subscription, Contract, Usage, PlatformFee, Commission

related\_entity\_type

VARCHAR(80)

Subscription, Contract, Timesheet, Invoice

related\_entity\_id

UUID

Related entity

amount

NUMERIC(18,4)

Charge amount

tax\_amount

NUMERIC(18,4)

Tax amount

total\_amount

NUMERIC(18,4)

Total charge

currency\_code

CHAR(3)

Currency

charge\_status

VARCHAR(50)

Pending, Invoiced, Paid, Cancelled, WrittenOff

charge\_date

DATE

Charge date

created\_at

TIMESTAMPTZ

Creation timestamp

**Design Notes**

Billing charges should feed invoice generation and ledger posting. Charges should not be deleted after invoicing.

**25.8 Invoices**

**Overview**

Invoices represent formal billing documents issued to users, organizations, or customers. They may relate to subscriptions, contracts, milestone payments, platform fees, commissions, or professional services.

**Suggested Table: invoices**

**Column**

**Data Type**

**Description**

invoice\_id

UUID

Primary invoice identifier

tenant\_id

UUID

Tenant identifier

invoice\_number

VARCHAR(120)

Human-readable invoice number

billing\_account\_id

UUID

Billing account

customer\_type

VARCHAR(80)

User, Organization

customer\_id

UUID

Customer reference

invoice\_status

VARCHAR(50)

Draft, Issued, PartiallyPaid, Paid, Overdue, Cancelled, Refunded

issue\_date

DATE

Issue date

due\_date

DATE

Due date

subtotal\_amount

NUMERIC(18,4)

Subtotal

discount\_amount

NUMERIC(18,4)

Discount

tax\_amount

NUMERIC(18,4)

Tax

total\_amount

NUMERIC(18,4)

Total

amount\_paid

NUMERIC(18,4)

Amount paid

balance\_due

NUMERIC(18,4)

Outstanding balance

currency\_code

CHAR(3)

Currency

invoice\_object\_key

TEXT

PDF invoice reference

metadata

JSONB

Flexible metadata

issued\_at

TIMESTAMPTZ

Issue timestamp

paid\_at

TIMESTAMPTZ

Paid timestamp

created\_at

TIMESTAMPTZ

Creation timestamp

updated\_at

TIMESTAMPTZ

Update timestamp

**Suggested Table: invoice\_line\_items**

**Column**

**Data Type**

**Description**

invoice\_line\_item\_id

UUID

Primary line item

tenant\_id

UUID

Tenant identifier

invoice\_id

UUID

Invoice

charge\_id

UUID

Optional billing charge

item\_description

TEXT

Line item description

quantity

NUMERIC(14,4)

Quantity

unit\_price

NUMERIC(18,4)

Unit price

discount\_amount

NUMERIC(18,4)

Discount

tax\_amount

NUMERIC(18,4)

Tax

line\_total

NUMERIC(18,4)

Line total

created\_at

TIMESTAMPTZ

Creation timestamp

**Design Notes**

Invoices should be immutable after issuance except for controlled status changes. Corrections should use credit notes or revised invoices.

**25.9 Tax Records**

**Overview**

Tax Records manage VAT, withholding tax, digital service tax, income tax withholding, tax profiles, tax exemptions, and tax reporting.

**Suggested Table: tax\_profiles**

**Column**

**Data Type**

**Description**

tax\_profile\_id

UUID

Primary tax profile

tenant\_id

UUID

Tenant identifier

owner\_type

VARCHAR(80)

User, Organization

owner\_id

UUID

Owner reference

country\_code

CHAR(2)

Tax country

tax\_identifier

VARCHAR(120)

Tax PIN or equivalent

tax\_residency\_status

VARCHAR(80)

Resident, NonResident

exemption\_status

VARCHAR(50)

None, Exempt, Partial

verification\_status

VARCHAR(50)

Pending, Verified, Rejected

created\_at

TIMESTAMPTZ

Creation timestamp

updated\_at

TIMESTAMPTZ

Update timestamp

**Suggested Table: tax\_records**

**Column**

**Data Type**

**Description**

tax\_record\_id

UUID

Primary tax record

tenant\_id

UUID

Tenant identifier

tax\_profile\_id

UUID

Tax profile

transaction\_id

UUID

Financial transaction

invoice\_id

UUID

Optional invoice

tax\_type

VARCHAR(80)

VAT, WithholdingTax, DigitalServiceTax, IncomeTax

taxable\_amount

NUMERIC(18,4)

Taxable base

tax\_rate

NUMERIC(8,4)

Tax rate

tax\_amount

NUMERIC(18,4)

Tax amount

currency\_code

CHAR(3)

Currency

tax\_jurisdiction

VARCHAR(120)

Jurisdiction

reporting\_period

VARCHAR(20)

Reporting period

tax\_status

VARCHAR(50)

Calculated, Withheld, Remitted, Reversed

created\_at

TIMESTAMPTZ

Creation timestamp

remitted\_at

TIMESTAMPTZ

Remittance timestamp

**Design Notes**

Tax logic must support country-specific rules. Tax records should be immutable once remitted.

**25.10 Financial Audits**

**Overview**

Financial Audits provide traceability across wallets, ledger entries, transactions, payment provider callbacks, invoice lifecycle events, payout approvals, and reconciliations.

**Suggested Table: financial\_audit\_events**

**Column**

**Data Type**

**Description**

financial\_audit\_event\_id

UUID

Primary audit event

tenant\_id

UUID

Tenant identifier

event\_type

VARCHAR(120)

WalletCreated, PaymentConfirmed, LedgerPosted, PayoutApproved

actor\_type

VARCHAR(80)

User, System, Provider, Admin

actor\_id

UUID

Actor reference

related\_entity\_type

VARCHAR(80)

Wallet, Transaction, Payment, Payout, Invoice, LedgerEntry

related\_entity\_id

UUID

Related entity

event\_payload

JSONB

Event details

risk\_level

VARCHAR(50)

Low, Medium, High, Critical

occurred\_at

TIMESTAMPTZ

Business event time

created\_at

TIMESTAMPTZ

Storage timestamp

**Suggested Table: financial\_reconciliations**

**Column**

**Data Type**

**Description**

reconciliation\_id

UUID

Primary reconciliation identifier

tenant\_id

UUID

Tenant identifier

reconciliation\_type

VARCHAR(80)

Wallet, Provider, Bank, Ledger, Invoice

provider

VARCHAR(100)

Optional provider

period\_start

DATE

Period start

period\_end

DATE

Period end

expected\_amount

NUMERIC(18,4)

Expected total

actual\_amount

NUMERIC(18,4)

Actual total

variance\_amount

NUMERIC(18,4)

Difference

currency\_code

CHAR(3)

Currency

reconciliation\_status

VARCHAR(50)

Pending, Matched, Variance, Resolved

report\_object\_key

TEXT

Reconciliation report

performed\_by\_user\_id

UUID

Reconciler

performed\_at

TIMESTAMPTZ

Reconciliation timestamp

metadata

JSONB

Flexible metadata

**Design Notes**

Financial audit logs must be append-only. Reconciliation reports should be retained according to financial compliance requirements.

**25.11 ERD**

**Conceptual ERD**

Wallet

├── LedgerAccount

│ └── LedgerEntry

├── FinancialTransaction

│ ├── LedgerEntry

│ ├── Payment

│ ├── Payout

│ ├── TaxRecord

│ └── FinancialAuditEvent

└── EscrowAccount

└── EscrowMovement

BillingAccount

├── BillingCharge

└── Invoice

└── InvoiceLineItem

TaxProfile

└── TaxRecord

FinancialReconciliation

FinancialAuditEvent

**Relationship Summary**

**Parent Entity**

**Child Entity**

**Cardinality**

Wallet

Ledger Accounts

1:N

Ledger Account

Ledger Entries

1:N

Financial Transaction

Ledger Entries

1:N

Wallet

Financial Transactions

1:N

Escrow Account

Escrow Movements

1:N

Financial Transaction

Escrow Movements

1:N

Payment

Financial Transaction

1:1 logical

Payout

Financial Transaction

1:1 logical

Billing Account

Billing Charges

1:N

Billing Account

Invoices

1:N

Invoice

Invoice Line Items

1:N

Invoice

Payments

1:N logical

Tax Profile

Tax Records

1:N

Financial Transaction

Tax Records

1:N

Financial Entity

Financial Audit Events

1:N logical

Reconciliation

Financial Audit Events

1:N logical

**ERD Design Notes**

The Finance & Wallet Database is centered on wallets, ledger accounts, financial transactions, and ledger entries. Wallets represent account balances. Financial transactions represent business-level money movement. Ledger entries represent immutable accounting records. The ledger is the source of truth for all balances.

Escrow, payments, payouts, billing, invoices, and tax records are specialized financial domains that link back to transactions and ledger entries. This design ensures every financial event is traceable, auditable, reconcilable, and compliant.

Cross-service identifiers such as user\_id, organization\_id, professional\_profile\_id, contract\_id, project\_id, timesheet\_id, subscription\_id, and invoice\_id should be validated through service APIs or event-synchronized read models. No external service should update wallet balances directly.

**26\. Subscription & Licensing Database**

**26.1 Overview**

The Subscription & Licensing Database manages commercial access to Kaziforce platform features. It supports subscription plans, tenant billing entitlements, user seats, organization licenses, plan limits, renewals, trials, add-ons, coupons, discounts, usage-based entitlements, license enforcement, and subscription analytics.

The Subscription Service owns this database. It integrates with Finance & Wallet for billing and payments, Identity for users and tenants, Organization Management for organization ownership, Notification for renewal reminders, and Audit for compliance.

**Primary Responsibilities**

The database supports:

-   Subscription plans
-   Pricing tiers
-   Organization subscriptions
-   User seat licensing
-   Feature entitlements
-   Add-ons
-   Trials
-   Renewals
-   Coupons and discounts
-   Usage limits
-   License activation
-   License suspension
-   Billing integration
-   Subscription lifecycle events
-   Subscription analytics

**Primary Data Stores**

**Data Store**

**Purpose**

PostgreSQL

Plans, subscriptions, licenses, entitlements, renewals

Redis

Entitlement cache, license check cache, rate limit counters

Kafka

Subscription lifecycle events

ClickHouse

Subscription analytics and revenue reporting

Object Storage

License certificates, billing exports, signed agreements

**26.2 Subscription Plans**

**Overview**

Subscription plans define commercial packages available to organizations, professionals, teams, and enterprises. Plans determine pricing, included seats, platform capabilities, limits, support level, AI usage, marketplace access, and billing frequency.

**Suggested Table: subscription\_plans**

**Column**

**Data Type**

**Description**

plan\_id

UUID

Primary plan identifier

plan\_code

VARCHAR(100)

Unique plan code

plan\_name

VARCHAR(180)

Display name

plan\_type

VARCHAR(80)

Free, Professional, Business, Enterprise, Custom

description

TEXT

Plan description

billing\_interval

VARCHAR(50)

Monthly, Quarterly, Annual, OneTime

base\_price

NUMERIC(18,4)

Base plan price

currency\_code

CHAR(3)

Plan currency

included\_seats

INTEGER

Number of included seats

included\_ai\_credits

INTEGER

Included AI credits

marketplace\_fee\_rate

NUMERIC(8,4)

Marketplace commission rate

support\_level

VARCHAR(80)

Community, Standard, Priority, Enterprise

trial\_days

INTEGER

Trial duration

is\_public

BOOLEAN

Publicly selectable plan

lifecycle\_status

VARCHAR(50)

Draft, Active, Deprecated, Archived

metadata

JSONB

Flexible plan metadata

created\_at

TIMESTAMPTZ

Creation timestamp

updated\_at

TIMESTAMPTZ

Update timestamp

version

INTEGER

Optimistic locking version

**Design Notes**

Plans should be versioned. Existing subscriptions should preserve the plan version they were created under unless a formal migration or upgrade occurs.

**26.3 Plan Features and Entitlements**

**Overview**

Plan features define what a subscriber can access. Entitlements are enforceable rights derived from the plan, add-ons, licenses, and commercial agreements.

**Suggested Table: platform\_features**

**Column**

**Data Type**

**Description**

feature\_id

UUID

Primary feature identifier

feature\_code

VARCHAR(120)

Unique feature code

feature\_name

VARCHAR(180)

Feature name

feature\_category

VARCHAR(100)

Marketplace, HR, AI, Messaging, Analytics, Finance

description

TEXT

Feature description

enforcement\_type

VARCHAR(80)

Boolean, UsageLimit, SeatLimit, RateLimit

lifecycle\_status

VARCHAR(50)

Active, Inactive, Deprecated

created\_at

TIMESTAMPTZ

Creation timestamp

**Suggested Table: plan\_entitlements**

**Column**

**Data Type**

**Description**

plan\_entitlement\_id

UUID

Primary entitlement identifier

plan\_id

UUID

Subscription plan

feature\_id

UUID

Platform feature

entitlement\_code

VARCHAR(120)

Entitlement code

entitlement\_value

JSONB

Boolean, limit, quota, or config

usage\_limit

NUMERIC(18,4)

Optional numeric limit

reset\_period

VARCHAR(50)

Daily, Monthly, Annual, Never

is\_hard\_limit

BOOLEAN

Whether enforcement blocks usage

created\_at

TIMESTAMPTZ

Creation timestamp

**Example Entitlements**

-   Maximum users
-   Maximum active jobs
-   Maximum active contracts
-   AI credits per month
-   Advanced analytics access
-   Enterprise SSO access
-   API access
-   Custom branding
-   Priority support
-   Dedicated account manager
-   Bulk candidate matching
-   Private talent pools

**26.4 Subscriptions**

**Overview**

Subscriptions represent active or historical commercial relationships between Kaziforce and a subscribing owner such as an organization, professional, team, or enterprise tenant.

**Suggested Table: subscriptions**

**Column**

**Data Type**

**Description**

subscription\_id

UUID

Primary subscription identifier

tenant\_id

UUID

Tenant identifier

subscriber\_type

VARCHAR(80)

Organization, User, Team, Enterprise

subscriber\_id

UUID

Subscriber entity

plan\_id

UUID

Subscription plan

billing\_account\_id

UUID

Finance billing account reference

subscription\_status

VARCHAR(50)

Trial, Active, PastDue, Suspended, Cancelled, Expired

billing\_interval

VARCHAR(50)

Monthly, Quarterly, Annual

current\_period\_start

DATE

Current billing period start

current\_period\_end

DATE

Current billing period end

trial\_start

DATE

Trial start

trial\_end

DATE

Trial end

auto\_renew

BOOLEAN

Auto-renewal flag

cancellation\_reason

TEXT

Cancellation reason

cancelled\_at

TIMESTAMPTZ

Cancellation timestamp

suspended\_at

TIMESTAMPTZ

Suspension timestamp

activated\_at

TIMESTAMPTZ

Activation timestamp

metadata

JSONB

Flexible metadata

created\_at

TIMESTAMPTZ

Creation timestamp

updated\_at

TIMESTAMPTZ

Update timestamp

version

INTEGER

Optimistic locking version

**Design Notes**

Subscription state changes should generate events and should not be silently overwritten. Lifecycle transitions must be auditable.

**26.5 Subscription Items and Add-ons**

**Overview**

Subscription items represent chargeable components under a subscription. Add-ons extend a base subscription with extra capacity or features.

**Suggested Table: subscription\_items**

**Column**

**Data Type**

**Description**

subscription\_item\_id

UUID

Primary item identifier

tenant\_id

UUID

Tenant identifier

subscription\_id

UUID

Subscription

item\_type

VARCHAR(80)

BasePlan, AddOn, Seat, Usage, AI Credits

item\_name

VARCHAR(180)

Item display name

feature\_id

UUID

Optional feature

quantity

NUMERIC(18,4)

Quantity

unit\_price

NUMERIC(18,4)

Unit price

currency\_code

CHAR(3)

Currency

billing\_interval

VARCHAR(50)

Monthly, Annual, OneTime

item\_status

VARCHAR(50)

Active, Cancelled, Expired

effective\_from

DATE

Item start

effective\_to

DATE

Item end

created\_at

TIMESTAMPTZ

Creation timestamp

updated\_at

TIMESTAMPTZ

Update timestamp

**Suggested Table: subscription\_addons**

**Column**

**Data Type**

**Description**

addon\_id

UUID

Primary add-on identifier

addon\_code

VARCHAR(100)

Unique add-on code

addon\_name

VARCHAR(180)

Add-on name

addon\_type

VARCHAR(80)

Seats, AI Credits, Storage, API Calls, Support

description

TEXT

Add-on description

unit\_price

NUMERIC(18,4)

Unit price

currency\_code

CHAR(3)

Currency

lifecycle\_status

VARCHAR(50)

Active, Inactive, Archived

created\_at

TIMESTAMPTZ

Creation timestamp

**26.6 Licenses and Seats**

**Overview**

Licenses determine which users or entities can access subscription-controlled features. Seat licensing supports enterprise user allocation and role-based product access.

**Suggested Table: licenses**

**Column**

**Data Type**

**Description**

license\_id

UUID

Primary license identifier

tenant\_id

UUID

Tenant identifier

subscription\_id

UUID

Subscription

license\_key

VARCHAR(180)

Optional generated license key

license\_type

VARCHAR(80)

Seat, Organization, API, Enterprise, AI Agent

license\_status

VARCHAR(50)

Active, Suspended, Revoked, Expired

max\_users

INTEGER

Maximum users allowed

max\_ai\_agents

INTEGER

Maximum AI agents allowed

activation\_limit

INTEGER

Maximum activations

issued\_at

TIMESTAMPTZ

Issue timestamp

activated\_at

TIMESTAMPTZ

Activation timestamp

expires\_at

TIMESTAMPTZ

Expiry timestamp

revoked\_at

TIMESTAMPTZ

Revocation timestamp

metadata

JSONB

Flexible metadata

**Suggested Table: license\_assignments**

**Column**

**Data Type**

**Description**

license\_assignment\_id

UUID

Primary assignment identifier

tenant\_id

UUID

Tenant identifier

license\_id

UUID

License

assignee\_type

VARCHAR(80)

User, Team, AI Agent, ServiceAccount

assignee\_id

UUID

Assignee entity

assigned\_by\_user\_id

UUID

Assigning user

assignment\_status

VARCHAR(50)

Active, Suspended, Revoked

assigned\_at

TIMESTAMPTZ

Assignment timestamp

revoked\_at

TIMESTAMPTZ

Revocation timestamp

**Design Notes**

Seat allocation must be enforced in real time. Redis can cache license status and seat counts to avoid repeated database lookups.

**26.7 Usage Tracking**

**Overview**

Usage tracking records consumption of subscription-limited resources such as AI credits, API calls, active jobs, active contracts, messages, storage, analytics dashboards, and premium searches.

**Suggested Table: usage\_records**

**Column**

**Data Type**

**Description**

usage\_record\_id

UUID

Primary usage record

tenant\_id

UUID

Tenant identifier

subscription\_id

UUID

Subscription

feature\_id

UUID

Feature consumed

usage\_type

VARCHAR(100)

AI Credit, API Call, Job Post, Storage, Search

usage\_quantity

NUMERIC(18,4)

Quantity consumed

usage\_unit

VARCHAR(50)

Count, MB, GB, Credit, Hour

related\_entity\_type

VARCHAR(80)

Job, AI Task, API Request, Message

related\_entity\_id

UUID

Related entity

usage\_period\_start

DATE

Period start

usage\_period\_end

DATE

Period end

recorded\_at

TIMESTAMPTZ

Usage timestamp

metadata

JSONB

Flexible metadata

**Suggested Table: usage\_counters**

**Column**

**Data Type**

**Description**

usage\_counter\_id

UUID

Primary counter identifier

tenant\_id

UUID

Tenant identifier

subscription\_id

UUID

Subscription

feature\_id

UUID

Feature

period\_start

DATE

Counter period start

period\_end

DATE

Counter period end

used\_quantity

NUMERIC(18,4)

Used quantity

limit\_quantity

NUMERIC(18,4)

Limit quantity

reset\_at

TIMESTAMPTZ

Counter reset time

updated\_at

TIMESTAMPTZ

Last update timestamp

**Redis Usage Counter Pattern**

subscription:usage:{tenant\_id}:{subscription\_id}:{feature\_code}:{period}

**26.8 Renewals**

**Overview**

Renewals manage continuation of subscriptions after the current billing period ends. They support auto-renewal, manual renewal, failed renewal, grace periods, and renewal reminders.

**Suggested Table: subscription\_renewals**

**Column**

**Data Type**

**Description**

renewal\_id

UUID

Primary renewal identifier

tenant\_id

UUID

Tenant identifier

subscription\_id

UUID

Subscription

renewal\_period\_start

DATE

New period start

renewal\_period\_end

DATE

New period end

renewal\_amount

NUMERIC(18,4)

Renewal amount

currency\_code

CHAR(3)

Currency

renewal\_status

VARCHAR(50)

Pending, Processing, Completed, Failed, Cancelled

invoice\_id

UUID

Finance invoice reference

payment\_id

UUID

Finance payment reference

attempted\_at

TIMESTAMPTZ

Renewal attempt time

completed\_at

TIMESTAMPTZ

Renewal completion

failure\_reason

TEXT

Failure detail

created\_at

TIMESTAMPTZ

Creation timestamp

**Design Notes**

Failed renewal should not immediately delete access unless policy requires it. Grace periods should be configurable.

**26.9 Coupons and Discounts**

**Overview**

Coupons and discounts support promotional campaigns, enterprise negotiations, partner offers, annual discounts, trial extensions, and retention offers.

**Suggested Table: coupons**

**Column**

**Data Type**

**Description**

coupon\_id

UUID

Primary coupon identifier

coupon\_code

VARCHAR(100)

Coupon code

coupon\_name

VARCHAR(180)

Coupon name

discount\_type

VARCHAR(50)

Percentage, FixedAmount, TrialExtension

discount\_value

NUMERIC(18,4)

Discount value

currency\_code

CHAR(3)

Required for fixed discounts

max\_redemptions

INTEGER

Maximum redemptions

redemption\_count

INTEGER

Current redemptions

valid\_from

TIMESTAMPTZ

Validity start

valid\_until

TIMESTAMPTZ

Validity end

lifecycle\_status

VARCHAR(50)

Active, Expired, Disabled

metadata

JSONB

Flexible metadata

created\_at

TIMESTAMPTZ

Creation timestamp

**Suggested Table: subscription\_discounts**

**Column**

**Data Type**

**Description**

subscription\_discount\_id

UUID

Primary discount assignment

tenant\_id

UUID

Tenant identifier

subscription\_id

UUID

Subscription

coupon\_id

UUID

Coupon

discount\_amount

NUMERIC(18,4)

Applied discount

currency\_code

CHAR(3)

Currency

applied\_at

TIMESTAMPTZ

Application timestamp

expires\_at

TIMESTAMPTZ

Discount expiry

status

VARCHAR(50)

Active, Expired, Revoked

**26.10 Entitlement Enforcement**

**Overview**

Entitlement enforcement determines whether a tenant, user, organization, AI agent, or service account can access a feature or consume a resource.

**Suggested Table: entitlement\_checks**

**Column**

**Data Type**

**Description**

entitlement\_check\_id

UUID

Primary check identifier

tenant\_id

UUID

Tenant identifier

subscription\_id

UUID

Subscription

actor\_type

VARCHAR(80)

User, Organization, AI Agent, ServiceAccount

actor\_id

UUID

Actor entity

feature\_code

VARCHAR(120)

Requested feature

requested\_quantity

NUMERIC(18,4)

Quantity requested

decision

VARCHAR(50)

Allowed, Denied, RequiresUpgrade, LimitExceeded

decision\_reason

TEXT

Reason for decision

checked\_at

TIMESTAMPTZ

Check timestamp

metadata

JSONB

Flexible metadata

**Recommended Redis Cache Keys**

entitlement:{tenant\_id}:{feature\_code}

license:{tenant\_id}:{assignee\_type}:{assignee\_id}

subscription:status:{tenant\_id}:{subscription\_id}

**Design Notes**

Entitlement checks should be low-latency and cached, but billing-critical usage must still be persisted for reconciliation.

**26.11 Billing Integration**

**Overview**

The Subscription Service does not own financial settlement. It produces subscription charges and renewal events consumed by Finance & Wallet.

**Suggested Table: subscription\_billing\_links**

**Column**

**Data Type**

**Description**

subscription\_billing\_link\_id

UUID

Primary billing link

tenant\_id

UUID

Tenant identifier

subscription\_id

UUID

Subscription

billing\_account\_id

UUID

Finance billing account

invoice\_id

UUID

Finance invoice

payment\_id

UUID

Finance payment

charge\_id

UUID

Finance charge

billing\_status

VARCHAR(50)

Pending, Invoiced, Paid, Failed, Cancelled

billing\_period\_start

DATE

Billing period start

billing\_period\_end

DATE

Billing period end

amount

NUMERIC(18,4)

Billing amount

currency\_code

CHAR(3)

Currency

created\_at

TIMESTAMPTZ

Creation timestamp

updated\_at

TIMESTAMPTZ

Update timestamp

**Published Events**

-   SubscriptionCreated
-   SubscriptionActivated
-   SubscriptionRenewed
-   SubscriptionCancelled
-   SubscriptionSuspended
-   SubscriptionExpired
-   PlanUpgraded
-   PlanDowngraded
-   LicenseAssigned
-   LicenseRevoked
-   UsageLimitExceeded
-   EntitlementDenied

**26.12 Subscription Analytics**

**Overview**

Subscription Analytics provides visibility into recurring revenue, plan adoption, churn, expansion, renewals, trials, license utilization, add-on usage, and entitlement denials.

**Suggested Table: subscription\_events**

**Column**

**Data Type**

**Description**

subscription\_event\_id

UUID

Primary event identifier

tenant\_id

UUID

Tenant identifier

event\_type

VARCHAR(120)

SubscriptionCreated, Renewed, Cancelled, PlanChanged

subscription\_id

UUID

Subscription

subscriber\_type

VARCHAR(80)

Organization, User, Team

subscriber\_id

UUID

Subscriber

plan\_id

UUID

Plan

event\_payload

JSONB

Event details

occurred\_at

TIMESTAMPTZ

Business event timestamp

created\_at

TIMESTAMPTZ

Storage timestamp

**Key Metrics**

-   Active subscriptions
-   Monthly recurring revenue
-   Annual recurring revenue
-   Trial conversion rate
-   Churn rate
-   Renewal rate
-   Average revenue per account
-   Plan distribution
-   Add-on revenue
-   Seat utilization
-   AI credit utilization
-   Usage limit breaches
-   Failed renewal rate
-   Upgrade rate
-   Downgrade rate

**Recommended ClickHouse Fact Tables**

-   fact\_subscription\_lifecycle
-   fact\_subscription\_revenue
-   fact\_plan\_adoption
-   fact\_license\_utilization
-   fact\_usage\_consumption
-   fact\_trial\_conversion
-   fact\_subscription\_churn
-   fact\_entitlement\_denials

**26.13 Constraints**

**Primary Key Constraints**

Core tables use UUID primary keys:

-   plan\_id
-   feature\_id
-   plan\_entitlement\_id
-   subscription\_id
-   subscription\_item\_id
-   addon\_id
-   license\_id
-   license\_assignment\_id
-   usage\_record\_id
-   usage\_counter\_id
-   renewal\_id
-   coupon\_id
-   subscription\_discount\_id
-   entitlement\_check\_id

**Foreign Key Constraints**

Recommended internal foreign keys:

-   plan\_entitlements.plan\_id → subscription\_plans.plan\_id
-   plan\_entitlements.feature\_id → platform\_features.feature\_id
-   subscriptions.plan\_id → subscription\_plans.plan\_id
-   subscription\_items.subscription\_id → subscriptions.subscription\_id
-   subscription\_items.feature\_id → platform\_features.feature\_id
-   licenses.subscription\_id → subscriptions.subscription\_id
-   license\_assignments.license\_id → licenses.license\_id
-   usage\_records.subscription\_id → subscriptions.subscription\_id
-   usage\_records.feature\_id → platform\_features.feature\_id
-   usage\_counters.subscription\_id → subscriptions.subscription\_id
-   usage\_counters.feature\_id → platform\_features.feature\_id
-   subscription\_renewals.subscription\_id → subscriptions.subscription\_id
-   subscription\_discounts.subscription\_id → subscriptions.subscription\_id
-   subscription\_discounts.coupon\_id → coupons.coupon\_id

Cross-service identifiers such as tenant\_id, subscriber\_id, billing\_account\_id, invoice\_id, payment\_id, and actor\_id should be validated through APIs or synchronized read models.

**Check Constraints**

Recommended checks:

-   base\_price >= 0
-   included\_seats >= 0
-   included\_ai\_credits >= 0
-   marketplace\_fee\_rate BETWEEN 0 AND 100
-   trial\_days >= 0
-   quantity >= 0
-   unit\_price >= 0
-   used\_quantity >= 0
-   limit\_quantity >= 0
-   renewal\_period\_end >= renewal\_period\_start
-   valid\_until IS NULL OR valid\_until >= valid\_from

**Unique Constraints**

Recommended unique constraints:

-   Unique plan code.
-   Unique feature code.
-   One active subscription per subscriber and product scope where policy requires.
-   One active license assignment per assignee and license.
-   One usage counter per subscription, feature, and period.
-   Unique coupon code.
-   One active discount per subscription and coupon.

**26.14 Indexing Strategy**

**Plan Indexes**

Recommended indexes:

-   idx\_subscription\_plans\_code
-   idx\_subscription\_plans\_type
-   idx\_subscription\_plans\_status
-   idx\_plan\_entitlements\_plan
-   idx\_plan\_entitlements\_feature

**Subscription Indexes**

Recommended indexes:

-   idx\_subscriptions\_tenant\_status
-   idx\_subscriptions\_subscriber
-   idx\_subscriptions\_plan
-   idx\_subscriptions\_period\_end
-   idx\_subscriptions\_auto\_renew
-   idx\_subscriptions\_billing\_account

**License Indexes**

Recommended indexes:

-   idx\_licenses\_subscription
-   idx\_licenses\_status
-   idx\_license\_assignments\_license
-   idx\_license\_assignments\_assignee
-   idx\_license\_assignments\_status

**Usage Indexes**

Recommended indexes:

-   idx\_usage\_records\_subscription
-   idx\_usage\_records\_feature
-   idx\_usage\_records\_period
-   idx\_usage\_counters\_subscription\_feature\_period

**Renewal and Discount Indexes**

Recommended indexes:

-   idx\_subscription\_renewals\_subscription
-   idx\_subscription\_renewals\_status
-   idx\_subscription\_renewals\_period
-   idx\_coupons\_code
-   idx\_coupons\_validity
-   idx\_subscription\_discounts\_subscription

**Entitlement Indexes**

Recommended indexes:

-   idx\_entitlement\_checks\_subscription
-   idx\_entitlement\_checks\_actor
-   idx\_entitlement\_checks\_feature
-   idx\_entitlement\_checks\_decision
-   idx\_entitlement\_checks\_checked\_at

**26.15 Partitioning Strategy**

**Time-Based Partitioning**

Recommended monthly or quarterly partitioning for:

-   usage\_records
-   entitlement\_checks
-   subscription\_events
-   subscription\_renewals

**Tenant-Aware Partitioning**

Large enterprise customers with many users, AI agents, and API usage may require tenant-level partitioning for usage records and entitlement checks.

**Archival Strategy**

Historical usage records, entitlement checks, old renewal attempts, expired coupons, and cancelled subscriptions should be archived after the operational retention period while preserving financial traceability for audit and revenue analysis.

**26.16 ERD**

**Conceptual ERD**

SubscriptionPlan

├── PlanEntitlement

│ └── PlatformFeature

└── Subscription

├── SubscriptionItem

├── License

│ └── LicenseAssignment

├── UsageRecord

├── UsageCounter

├── SubscriptionRenewal

├── SubscriptionDiscount

│ └── Coupon

├── EntitlementCheck

└── SubscriptionBillingLink

SubscriptionAddon

SubscriptionEvent

**Relationship Summary**

**Parent Entity**

**Child Entity**

**Cardinality**

Subscription Plan

Plan Entitlements

1:N

Platform Feature

Plan Entitlements

1:N

Subscription Plan

Subscriptions

1:N

Subscription

Subscription Items

1:N

Subscription

Licenses

1:N

License

License Assignments

1:N

Subscription

Usage Records

1:N

Subscription

Usage Counters

1:N

Subscription

Renewals

1:N

Subscription

Discounts

1:N

Coupon

Subscription Discounts

1:N

Subscription

Entitlement Checks

1:N

Subscription

Billing Links

1:N

**ERD Design Notes**

The Subscription & Licensing Database is centered on plans, subscriptions, entitlements, licenses, and usage. Plans define commercial packages. Entitlements define enforceable access rights. Subscriptions bind a subscriber to a plan. Licenses allocate access to users, teams, AI agents, or service accounts. Usage records and counters track consumption against plan limits.

The design separates commercial subscription ownership from financial processing. The Subscription Service determines entitlement and access, while the Finance & Wallet Service owns invoicing, payment collection, ledger posting, and reconciliation.

**27\. Analytics Database**

**27.1 Overview**

The Analytics Database manages reporting, metrics, dashboards, KPIs, operational intelligence, business intelligence, product analytics, financial analytics, workforce analytics, AI performance analytics, and executive decision-support data for Kaziforce.

The Analytics Service owns this database. It does not own transactional source records. Instead, it consumes events and replicated data from operational services, transforms them into analytical models, and stores them in structures optimized for aggregation, trend analysis, dashboards, forecasting, and reporting.

**Primary Responsibilities**

The Analytics Database supports:

-   Executive dashboards
-   Operational dashboards
-   Workforce analytics
-   Marketplace analytics
-   Financial analytics
-   Subscription analytics
-   Learning analytics
-   Support analytics
-   CRM analytics
-   AI performance analytics
-   Product usage analytics
-   Compliance reporting
-   KPI tracking
-   Data marts
-   BI reporting
-   Forecasting datasets
-   Historical trend analysis

**Primary Data Stores**

**Data Store**

**Purpose**

ClickHouse

High-volume analytical queries, dashboards, aggregations

PostgreSQL

Analytics metadata, dashboard configuration, KPI definitions

Object Storage

Raw events, historical exports, data lake files

Kafka

Streaming event ingestion

Redis

Dashboard cache and query result cache

OpenSearch

Log and event exploration

Vector Store

AI-assisted analytics and semantic metric discovery

**27.2 Analytics Architecture**

**Overview**

Kaziforce uses a hybrid analytics architecture combining event streaming, data lake storage, columnar OLAP storage, dimensional modeling, and dashboard metadata management.

The architecture separates:

-   Raw event ingestion
-   Data validation
-   Transformation
-   Aggregation
-   Analytical storage
-   Dashboard delivery
-   AI insight generation

**Analytics Flow**

1.  Operational services publish domain events to Kafka.
2.  Events are validated and enriched.
3.  Raw events are persisted to Object Storage.
4.  Curated events are loaded into ClickHouse.
5.  Aggregated fact and dimension tables are created.
6.  KPI views and materialized views are refreshed.
7.  Dashboards query ClickHouse through the Analytics API.
8.  AI services consume analytical outputs for recommendations and forecasting.

**Design Notes**

Operational databases should not be queried directly for dashboards except in rare near-real-time cases. Analytical workloads should run against ClickHouse or read-optimized materialized views.

**27.3 Event Ingestion**

**Overview**

Event ingestion captures business and system events from Kaziforce microservices.

**Event Sources**

-   Identity Service
-   Organization Service
-   Profile Service
-   Marketplace Service
-   AI Matching Engine
-   Engagement Service
-   Messaging Service
-   Voice & Video Service
-   Notification Service
-   Calendar Service
-   Time Tracking Service
-   Workforce Management Service
-   HR Service
-   Learning Service
-   Credential Service
-   AI Agent Service
-   Knowledge Base Service
-   CRM Service
-   Support Service
-   Finance & Wallet Service
-   Subscription Service

**Suggested Table: analytics\_event\_registry**

**Column**

**Data Type**

**Description**

event\_registry\_id

UUID

Primary registry identifier

source\_service

VARCHAR(120)

Event-producing service

event\_type

VARCHAR(150)

Event name

event\_version

VARCHAR(30)

Event schema version

topic\_name

VARCHAR(180)

Kafka topic

schema\_ref

TEXT

Schema registry reference

retention\_days

INTEGER

Retention period

pii\_classification

VARCHAR(80)

None, Low, Medium, High

ingestion\_status

VARCHAR(50)

Active, Paused, Deprecated

created\_at

TIMESTAMPTZ

Creation timestamp

updated\_at

TIMESTAMPTZ

Update timestamp

**ClickHouse Table: raw\_events**

**Column**

**Type**

**Description**

event\_id

UUID

Event identifier

tenant\_id

UUID

Tenant

source\_service

String

Source service

event\_type

String

Event type

event\_version

String

Event schema version

entity\_type

String

Primary entity type

entity\_id

UUID

Primary entity ID

event\_payload

String

JSON payload

occurred\_at

DateTime64

Business event timestamp

ingested\_at

DateTime64

Analytics ingestion timestamp

**Design Notes**

Raw events should be immutable. Event corrections should be emitted as compensating events.

**27.4 Data Lake**

**Overview**

The Analytics Data Lake stores raw and semi-processed data for replay, historical analysis, machine learning, audit support, and long-term retention.

**Stored Data**

-   Raw Kafka events
-   CDC snapshots
-   Application logs
-   Security logs
-   AI model outputs
-   CSV exports
-   Parquet datasets
-   Training datasets
-   Archived analytical tables
-   External datasets

**Object Storage Layout**

data-lake/

raw/

service={service\_name}/

event\_type={event\_type}/

year={yyyy}/month={mm}/day={dd}/

curated/

domain={domain\_name}/

table={table\_name}/

year={yyyy}/month={mm}/

ml/

feature\_sets/

training\_datasets/

evaluation\_datasets/

exports/

dashboards/

reports/

**Design Notes**

Raw data should be stored in immutable append-only form. Curated datasets should be stored in columnar formats such as Parquet where supported.

**27.5 Dimensional Model**

**Overview**

The Analytics Database uses dimensional modeling to support fast reporting and business intelligence. Fact tables store measurable events. Dimension tables store descriptive context.

**Core Dimensions**

Recommended shared dimensions:

-   dim\_date
-   dim\_time
-   dim\_tenant
-   dim\_user
-   dim\_organization
-   dim\_professional
-   dim\_project
-   dim\_job
-   dim\_contract
-   dim\_country
-   dim\_currency
-   dim\_skill
-   dim\_subscription\_plan
-   dim\_channel
-   dim\_ai\_model

**Core Fact Tables**

Recommended enterprise fact tables:

-   fact\_user\_activity
-   fact\_marketplace\_funnel
-   fact\_workforce\_utilization
-   fact\_financial\_transactions
-   fact\_subscription\_revenue
-   fact\_learning\_progress
-   fact\_support\_tickets
-   fact\_notification\_delivery
-   fact\_ai\_recommendations
-   fact\_message\_activity
-   fact\_time\_tracking
-   fact\_hr\_lifecycle
-   fact\_credential\_verification
-   fact\_crm\_pipeline

**Design Notes**

Dimensions should support slowly changing dimension patterns where historical reporting requires preservation of prior values.

**27.6 Fact Tables**

**Overview**

Fact tables capture measurable business events at a defined grain. Every fact table must have a clearly documented grain to avoid incorrect aggregation.

**Example ClickHouse Table: fact\_marketplace\_funnel**

**Column**

**Type**

**Description**

event\_date

Date

Event date

tenant\_id

UUID

Tenant

organization\_id

UUID

Organization

job\_id

UUID

Job

professional\_profile\_id

UUID

Candidate profile

funnel\_stage

String

Viewed, Applied, Shortlisted, Interviewed, Offered, Hired

event\_count

UInt64

Count of events

conversion\_value

Decimal(18,4)

Optional value

currency\_code

String

Currency

occurred\_at

DateTime64

Event timestamp

**Example ClickHouse Table: fact\_financial\_transactions**

**Column**

**Type**

**Description**

transaction\_date

Date

Transaction date

tenant\_id

UUID

Tenant

transaction\_id

UUID

Transaction

transaction\_type

String

Payment, Payout, Fee, Refund

wallet\_owner\_type

String

User, Organization, Platform

wallet\_owner\_id

UUID

Owner

gross\_amount

Decimal(18,4)

Gross amount

fee\_amount

Decimal(18,4)

Fees

tax\_amount

Decimal(18,4)

Taxes

net\_amount

Decimal(18,4)

Net amount

currency\_code

String

Currency

status

String

Transaction status

**Example ClickHouse Table: fact\_workforce\_utilization**

**Column**

**Type**

**Description**

utilization\_date

Date

Date

tenant\_id

UUID

Tenant

organization\_id

UUID

Organization

professional\_profile\_id

UUID

Worker

project\_id

UUID

Project

contract\_id

UUID

Contract

available\_hours

Decimal(10,2)

Available hours

allocated\_hours

Decimal(10,2)

Allocated hours

worked\_hours

Decimal(10,2)

Worked hours

billable\_hours

Decimal(10,2)

Billable hours

utilization\_rate

Decimal(8,4)

Utilization rate

**27.7 Dimension Tables**

**Overview**

Dimension tables provide descriptive attributes used to slice and filter facts.

**Example Dimension: dim\_organization**

**Column**

**Type**

**Description**

organization\_key

UInt64

Surrogate key

organization\_id

UUID

Source organization ID

tenant\_id

UUID

Tenant

organization\_name

String

Organization name

organization\_type

String

Company, NGO, Government

industry

String

Industry

country\_code

String

Country

lifecycle\_status

String

Status

effective\_from

DateTime64

SCD start

effective\_to

DateTime64

SCD end

is\_current

UInt8

Current row flag

**Example Dimension: dim\_professional**

**Column**

**Type**

**Description**

professional\_key

UInt64

Surrogate key

professional\_profile\_id

UUID

Source profile ID

tenant\_id

UUID

Tenant

primary\_category

String

Professional category

experience\_level

String

Experience

country\_code

String

Country

verification\_status

String

Verification

effective\_from

DateTime64

SCD start

effective\_to

DateTime64

SCD end

is\_current

UInt8

Current row flag

**Design Notes**

Dimensions must avoid storing unnecessary sensitive data. Analytical user and professional dimensions should use pseudonymized identifiers where possible.

**27.8 KPI Definitions**

**Overview**

KPI definitions standardize how Kaziforce metrics are calculated across dashboards and reports.

**Suggested Table: kpi\_definitions**

**Column**

**Data Type**

**Description**

kpi\_id

UUID

Primary KPI identifier

kpi\_code

VARCHAR(120)

Unique KPI code

kpi\_name

VARCHAR(180)

KPI name

business\_domain

VARCHAR(100)

Marketplace, Finance, HR, AI

description

TEXT

KPI description

calculation\_formula

TEXT

Human-readable formula

query\_reference

TEXT

SQL or semantic metric reference

unit\_of\_measure

VARCHAR(80)

Count, Percentage, Currency, Hours

owner\_team

VARCHAR(120)

KPI owner

refresh\_frequency

VARCHAR(80)

RealTime, Hourly, Daily, Weekly

lifecycle\_status

VARCHAR(50)

Active, Deprecated, Archived

created\_at

TIMESTAMPTZ

Creation timestamp

updated\_at

TIMESTAMPTZ

Update timestamp

**Example KPIs**

-   Active professionals
-   Active organizations
-   Job fill rate
-   Application conversion rate
-   Time to hire
-   Gross marketplace volume
-   Platform revenue
-   Wallet payout success rate
-   Subscription MRR
-   AI recommendation acceptance rate
-   Timesheet approval time
-   Learning completion rate
-   Support SLA compliance
-   Notification delivery success rate

**27.9 Dashboards**

**Overview**

Dashboards organize analytical views for executives, administrators, organizations, professionals, support teams, HR managers, finance teams, and product teams.

**Suggested Table: analytics\_dashboards**

**Column**

**Data Type**

**Description**

dashboard\_id

UUID

Primary dashboard identifier

tenant\_id

UUID

Tenant identifier

dashboard\_code

VARCHAR(120)

Dashboard code

dashboard\_name

VARCHAR(180)

Dashboard name

dashboard\_type

VARCHAR(100)

Executive, Operational, Finance, HR, Marketplace

owner\_user\_id

UUID

Dashboard owner

visibility\_status

VARCHAR(50)

Private, Team, Organization, Platform

layout\_config

JSONB

Dashboard layout

filter\_config

JSONB

Available filters

lifecycle\_status

VARCHAR(50)

Active, Archived

created\_at

TIMESTAMPTZ

Creation timestamp

updated\_at

TIMESTAMPTZ

Update timestamp

**Suggested Table: dashboard\_widgets**

**Column**

**Data Type**

**Description**

widget\_id

UUID

Primary widget identifier

dashboard\_id

UUID

Dashboard

kpi\_id

UUID

Optional KPI

widget\_type

VARCHAR(80)

MetricCard, Table, LineChart, BarChart, PieChart, Funnel

widget\_title

VARCHAR(180)

Widget title

query\_reference

TEXT

Query or metric reference

visualization\_config

JSONB

Visualization settings

display\_order

INTEGER

Widget order

created\_at

TIMESTAMPTZ

Creation timestamp

updated\_at

TIMESTAMPTZ

Update timestamp

**27.10 Data Marts**

**Overview**

Data marts provide domain-specific analytical models optimized for specific users and business questions.

**Recommended Data Marts**

**Data Mart**

**Purpose**

Marketplace Data Mart

Jobs, applications, offers, contracts, hiring funnel

Workforce Data Mart

Assignments, utilization, capacity, performance

Finance Data Mart

Payments, payouts, wallets, revenue, taxes

Subscription Data Mart

Plans, renewals, usage, churn, MRR

Learning Data Mart

Enrollments, progress, assessments, certificates

Support Data Mart

Tickets, SLAs, CSAT, agent performance

CRM Data Mart

Leads, accounts, opportunities, campaigns

AI Data Mart

Recommendations, agents, model metrics, memory retrieval

Engagement Data Mart

Feeds, reactions, comments, shares

Notification Data Mart

Deliveries, opens, clicks, provider performance

**Design Notes**

Each data mart should expose governed datasets and reusable metrics. Direct raw event access should be restricted to data engineering and analytics teams.

**27.11 Materialized Views**

**Overview**

Materialized views accelerate frequently queried dashboard metrics.

**Example ClickHouse Materialized Views**

Recommended views include:

-   mv\_daily\_active\_users
-   mv\_monthly\_recurring\_revenue
-   mv\_marketplace\_conversion\_daily
-   mv\_wallet\_transaction\_summary
-   mv\_support\_sla\_daily
-   mv\_learning\_completion\_daily
-   mv\_ai\_recommendation\_performance
-   mv\_notification\_delivery\_daily
-   mv\_workforce\_utilization\_daily

**Example: mv\_marketplace\_conversion\_daily**

**Column**

**Type**

**Description**

event\_date

Date

Date

tenant\_id

UUID

Tenant

jobs\_published

UInt64

Jobs published

applications\_submitted

UInt64

Applications

offers\_sent

UInt64

Offers

contracts\_created

UInt64

Contracts

hires\_completed

UInt64

Hires

**Design Notes**

Materialized views must be documented with source tables, refresh logic, and aggregation grain.

**27.12 AI Analytics**

**Overview**

AI Analytics measures the behavior, accuracy, cost, adoption, effectiveness, risk, and business value of AI systems across Kaziforce.

**AI Analytical Areas**

-   AI matching quality
-   Recommendation acceptance
-   AI agent usage
-   AI task completion
-   AI cost per task
-   AI memory retrieval quality
-   Semantic search relevance
-   Model evaluation metrics
-   Human override rate
-   AI safety policy blocks
-   AI-generated content performance

**Suggested ClickHouse Table: fact\_ai\_operations**

**Column**

**Type**

**Description**

event\_date

Date

Date

tenant\_id

UUID

Tenant

ai\_agent\_id

UUID

AI agent

model\_id

UUID

Model

operation\_type

String

Match, Recommend, Summarize, Generate, Retrieve

request\_count

UInt64

Number of requests

success\_count

UInt64

Successful operations

failure\_count

UInt64

Failed operations

average\_latency\_ms

Float64

Average latency

average\_confidence\_score

Float64

Average confidence

human\_override\_count

UInt64

Human override count

estimated\_cost

Decimal(18,4)

Estimated AI cost

currency\_code

String

Currency

**27.13 Financial Analytics**

**Overview**

Financial Analytics provides visibility into revenue, payments, payouts, escrow, refunds, platform fees, commissions, tax, and reconciliation.

**Core Metrics**

-   Gross marketplace volume
-   Net revenue
-   Platform fees
-   Payment success rate
-   Payout success rate
-   Escrow balance
-   Refund rate
-   Failed payment rate
-   Tax collected
-   Revenue by product
-   Revenue by organization
-   Revenue by country
-   Wallet liability exposure

**Recommended Fact Tables**

-   fact\_financial\_transactions
-   fact\_wallet\_balances\_daily
-   fact\_payment\_provider\_performance
-   fact\_payout\_performance
-   fact\_escrow\_movement
-   fact\_invoice\_collection
-   fact\_tax\_records

**27.14 Workforce Analytics**

**Overview**

Workforce Analytics measures workforce availability, utilization, productivity, performance, staffing gaps, and workforce economics.

**Core Metrics**

-   Active workforce count
-   Utilization rate
-   Billable utilization
-   Capacity gap
-   Over-allocation rate
-   Underutilization rate
-   Assignment duration
-   Performance score trends
-   Timesheet approval cycle
-   Attendance rate
-   Overtime rate
-   Workforce cost
-   Contract renewal likelihood

**Recommended Fact Tables**

-   fact\_workforce\_utilization
-   fact\_resource\_allocation
-   fact\_time\_tracking
-   fact\_attendance
-   fact\_performance\_reviews
-   fact\_capacity\_planning
-   fact\_workforce\_ai\_recommendations

**27.15 Marketplace Analytics**

**Overview**

Marketplace Analytics measures demand, supply, matching, hiring, conversion, quality, and marketplace liquidity.

**Core Metrics**

-   Jobs published
-   Applications submitted
-   Application-to-shortlist rate
-   Shortlist-to-offer rate
-   Offer acceptance rate
-   Contract conversion rate
-   Time to hire
-   Job fill rate
-   Match quality score
-   Candidate response rate
-   Professional availability
-   Marketplace liquidity
-   Average contract value

**Recommended Fact Tables**

-   fact\_marketplace\_funnel
-   fact\_job\_activity
-   fact\_application\_activity
-   fact\_offer\_conversion
-   fact\_contract\_creation
-   fact\_talent\_match\_quality

**27.16 Product Usage Analytics**

**Overview**

Product Usage Analytics measures how users interact with Kaziforce products and modules.

**Suggested ClickHouse Table: fact\_product\_usage**

**Column**

**Type**

**Description**

event\_date

Date

Usage date

tenant\_id

UUID

Tenant

user\_id

UUID

User

organization\_id

UUID

Organization

module\_name

String

Module

action\_name

String

Action

session\_id

String

Session reference

device\_type

String

Web, Mobile, API

event\_count

UInt64

Number of events

duration\_seconds

UInt64

Duration

**Core Metrics**

-   Daily active users
-   Monthly active users
-   Feature adoption
-   Session duration
-   API usage
-   Module engagement
-   User retention
-   Activation rate
-   Conversion funnel
-   Drop-off rate

**27.17 Data Quality**

**Overview**

Analytics data must be reliable, timely, complete, and consistent.

**Suggested Table: data\_quality\_checks**

**Column**

**Data Type**

**Description**

data\_quality\_check\_id

UUID

Primary check identifier

dataset\_name

VARCHAR(180)

Dataset

check\_name

VARCHAR(180)

Check name

check\_type

VARCHAR(80)

Completeness, Freshness, Accuracy, Uniqueness, Validity

check\_query

TEXT

Validation query

threshold\_config

JSONB

Thresholds

severity

VARCHAR(50)

Low, Medium, High, Critical

lifecycle\_status

VARCHAR(50)

Active, Inactive

created\_at

TIMESTAMPTZ

Creation timestamp

**Suggested Table: data\_quality\_results**

**Column**

**Data Type**

**Description**

data\_quality\_result\_id

UUID

Primary result identifier

data\_quality\_check\_id

UUID

Check

dataset\_name

VARCHAR(180)

Dataset

check\_status

VARCHAR(50)

Passed, Warning, Failed

measured\_value

NUMERIC(18,4)

Measured value

expected\_value

NUMERIC(18,4)

Expected value

result\_details

JSONB

Details

checked\_at

TIMESTAMPTZ

Check timestamp

**27.18 Data Lineage**

**Overview**

Data lineage tracks where analytical data comes from, how it is transformed, and where it is consumed.

**Suggested Table: data\_lineage**

**Column**

**Data Type**

**Description**

lineage\_id

UUID

Primary lineage identifier

source\_system

VARCHAR(120)

Source service or system

source\_dataset

VARCHAR(180)

Source dataset

target\_dataset

VARCHAR(180)

Target dataset

transformation\_name

VARCHAR(180)

Transformation

transformation\_version

VARCHAR(50)

Version

transformation\_logic\_ref

TEXT

Code or job reference

owner\_team

VARCHAR(120)

Owning team

created\_at

TIMESTAMPTZ

Creation timestamp

updated\_at

TIMESTAMPTZ

Update timestamp

**Design Notes**

Lineage should support audits, debugging, impact analysis, and metric trust.

**27.19 Security and Privacy**

**Overview**

Analytics data often contains sensitive business, financial, and personal information. The Analytics Database must enforce strong governance.

**Required Controls**

-   Tenant isolation
-   Row-level access control
-   Data masking
-   Pseudonymization
-   Aggregation thresholds
-   Encryption at rest
-   Encryption in transit
-   Audit logging
-   Least privilege
-   Data retention
-   Access approval workflows
-   PII classification
-   Secure exports

**Design Notes**

Long-term analytics datasets should minimize personally identifiable information. Where individual-level analysis is not required, data should be aggregated or pseudonymized.

**27.20 Constraints**

**Primary Key Constraints**

Metadata tables use UUID primary keys:

-   event\_registry\_id
-   kpi\_id
-   dashboard\_id
-   widget\_id
-   data\_quality\_check\_id
-   data\_quality\_result\_id
-   lineage\_id

ClickHouse fact tables should use sorting keys and partition keys instead of conventional primary keys.

**Check Constraints**

Recommended checks:

-   KPI lifecycle status must be valid.
-   Refresh frequency must be valid.
-   Data quality thresholds must be non-negative where applicable.
-   Dashboard visibility must be valid.
-   Retention days must be greater than or equal to zero.

**Uniqueness Rules**

Recommended unique constraints:

-   Unique KPI code.
-   Unique dashboard code per tenant.
-   Unique event type, source service, and event version.
-   Unique widget order per dashboard.
-   Unique data quality check name per dataset.

**27.21 Indexing and Sorting Strategy**

**ClickHouse Sorting Keys**

Recommended sorting keys:

-   (tenant\_id, event\_date)
-   (tenant\_id, organization\_id, event\_date)
-   (tenant\_id, user\_id, event\_date)
-   (tenant\_id, source\_service, event\_type, occurred\_at)
-   (tenant\_id, metric\_date)
-   (tenant\_id, dashboard\_id)

**Partitioning Keys**

Recommended partitioning:

-   Monthly partitions by event date.
-   Domain-specific partitions for high-volume facts.
-   Tenant-aware clustering for enterprise tenants.

**PostgreSQL Indexes**

Recommended indexes:

-   idx\_kpi\_definitions\_code
-   idx\_kpi\_definitions\_domain
-   idx\_dashboards\_tenant
-   idx\_dashboards\_owner
-   idx\_dashboard\_widgets\_dashboard
-   idx\_event\_registry\_service\_type
-   idx\_data\_quality\_results\_dataset\_time
-   idx\_lineage\_source\_target

**27.22 Partitioning Strategy**

**ClickHouse Partitioning**

Recommended monthly partitioning:

PARTITION BY toYYYYMM(event\_date)

ORDER BY (tenant\_id, event\_date, entity\_id)

For very high-volume tables, partition by month and cluster by tenant or domain-specific entity.

**Data Retention**

Recommended retention tiers:

-   Hot analytics: 6 to 12 months.
-   Warm analytics: 1 to 3 years.
-   Cold analytics: archived to Object Storage.
-   Compliance records: retained according to legal and financial requirements.

**27.23 ERD**

**Conceptual ERD**

AnalyticsEventRegistry

└── RawEvents

KPIDefinition

└── DashboardWidget

AnalyticsDashboard

└── DashboardWidget

DataQualityCheck

└── DataQualityResult

DataLineage

FactTables

├── DimensionTables

├── MaterializedViews

└── DataMarts

**Relationship Summary**

**Parent Entity**

**Child Entity**

**Cardinality**

Event Registry

Raw Events

1:N logical

KPI Definition

Dashboard Widgets

1:N

Analytics Dashboard

Dashboard Widgets

1:N

Data Quality Check

Data Quality Results

1:N

Source Dataset

Target Dataset

1:N lineage

Dimension Tables

Fact Tables

1:N logical

Fact Tables

Materialized Views

1:N logical

Data Marts

Dashboards

1:N logical

**ERD Design Notes**

The Analytics Database is centered on events, facts, dimensions, KPIs, dashboards, and data governance metadata. Operational services publish events, which are transformed into analytical tables. Fact tables store measurable business activity, dimension tables provide descriptive context, and dashboards expose governed insights.

The Analytics Database must remain separate from transactional databases to protect operational performance. Its design prioritizes fast aggregation, historical reporting, metric consistency, data quality, lineage, privacy, and executive visibility.

**28\. Audit & Compliance Database**

**28.1 Overview**

The Audit & Compliance Database manages immutable audit trails, security events, compliance evidence, consent records, policy enforcement logs, regulatory reports, data access records, administrative actions, risk events, and investigation records across Kaziforce.

The Audit & Compliance Service owns this database. It consumes audit events from all microservices through Kafka and stores them in a tamper-resistant, queryable, and retention-controlled format.

**Primary Responsibilities**

The database supports:

-   Platform audit logs
-   User activity audit trails
-   Administrative action logs
-   Security event logging
-   Compliance evidence
-   Consent records
-   Data access logs
-   Data deletion requests
-   Policy enforcement records
-   Regulatory reporting
-   Risk events
-   Investigation cases
-   Legal holds
-   Data retention tracking

**Primary Data Stores**

**Data Store**

**Purpose**

PostgreSQL

Compliance metadata, cases, policies, consent, legal holds

ClickHouse

High-volume audit events and access logs

Object Storage

Immutable evidence archives, reports, exports

OpenSearch

Audit and security event search

Kafka

Audit event ingestion

Redis

Short-lived compliance workflow locks and alert throttling

**28.2 Audit Events**

**Overview**

Audit Events record important system, user, administrator, service, and AI actions. They provide evidence for accountability, security review, compliance audits, investigations, and dispute resolution.

**Suggested Table: audit\_events**

**Column**

**Data Type**

**Description**

audit\_event\_id

UUID

Primary audit event identifier

tenant\_id

UUID

Tenant identifier

source\_service

VARCHAR(120)

Service that produced the event

event\_type

VARCHAR(150)

Event type

actor\_type

VARCHAR(80)

User, Admin, Service, AI Agent, System

actor\_id

UUID

Actor identifier

actor\_ip

INET

Source IP address

actor\_user\_agent

TEXT

User agent

target\_type

VARCHAR(120)

Entity type affected

target\_id

UUID

Target entity identifier

action

VARCHAR(120)

Create, Read, Update, Delete, Approve, Reject

outcome

VARCHAR(50)

Success, Failure, Blocked

risk\_level

VARCHAR(50)

Low, Medium, High, Critical

event\_payload

JSONB

Structured event details

occurred\_at

TIMESTAMPTZ

Business event timestamp

ingested\_at

TIMESTAMPTZ

Audit ingestion timestamp

correlation\_id

VARCHAR(150)

Request correlation ID

trace\_id

VARCHAR(150)

Distributed trace ID

**Design Notes**

Audit events should be append-only. Existing records must not be updated or deleted except through controlled retention workflows.

**28.3 Security Events**

**Overview**

Security Events capture authentication, authorization, threat, abuse, and suspicious activity signals.

**Suggested Table: security\_events**

**Column**

**Data Type**

**Description**

security\_event\_id

UUID

Primary security event

tenant\_id

UUID

Tenant identifier

event\_type

VARCHAR(150)

LoginFailed, MFAFailed, PermissionDenied, SuspiciousAccess

user\_id

UUID

Affected user

organization\_id

UUID

Optional organization

severity

VARCHAR(50)

Low, Medium, High, Critical

source\_ip

INET

Source IP

country\_code

CHAR(2)

Derived country

device\_fingerprint

VARCHAR(255)

Device identifier

user\_agent

TEXT

User agent

detection\_source

VARCHAR(100)

IAM, WAF, Fraud, AI, Admin

event\_payload

JSONB

Event details

response\_action

VARCHAR(100)

Logged, Blocked, MFARequired, AccountLocked

occurred\_at

TIMESTAMPTZ

Event time

created\_at

TIMESTAMPTZ

Storage time

**Common Security Events**

-   Failed login
-   Suspicious login
-   MFA failure
-   Password reset attempt
-   Role escalation
-   Permission denied
-   API abuse
-   Token misuse
-   Account lockout
-   Data export attempt
-   Fraud signal
-   Policy violation

**28.4 Data Access Logs**

**Overview**

Data Access Logs track who accessed sensitive data, when it was accessed, from where, and for what purpose.

**Suggested Table: data\_access\_logs**

**Column**

**Data Type**

**Description**

data\_access\_log\_id

UUID

Primary access log

tenant\_id

UUID

Tenant identifier

actor\_type

VARCHAR(80)

User, Admin, Service, AI Agent

actor\_id

UUID

Actor

accessed\_entity\_type

VARCHAR(120)

User, Profile, Wallet, HRRecord, Credential

accessed\_entity\_id

UUID

Entity accessed

access\_type

VARCHAR(80)

Read, Export, Search, Download, View

data\_classification

VARCHAR(80)

Public, Internal, Confidential, Restricted

access\_reason

VARCHAR(180)

Business reason

access\_channel

VARCHAR(80)

API, AdminPortal, Report, AI, Export

access\_decision

VARCHAR(50)

Allowed, Denied, Masked

ip\_address

INET

Source IP

occurred\_at

TIMESTAMPTZ

Access time

created\_at

TIMESTAMPTZ

Storage time

metadata

JSONB

Additional context

**Design Notes**

Sensitive domains such as finance, HR, credentials, identity, and AI memory should always emit data access logs.

**28.5 Consent Records**

**Overview**

Consent Records store user and organization permissions for data processing, marketing, AI personalization, communication, cookies, analytics, and third-party integrations.

**Suggested Table: consent\_records**

**Column**

**Data Type**

**Description**

consent\_id

UUID

Primary consent identifier

tenant\_id

UUID

Tenant identifier

subject\_type

VARCHAR(80)

User, Organization

subject\_id

UUID

Subject identifier

consent\_type

VARCHAR(120)

Marketing, Analytics, AI Memory, Data Sharing, Cookies

consent\_status

VARCHAR(50)

Granted, Denied, Revoked, Expired

consent\_source

VARCHAR(80)

Web, Mobile, Admin, API, Import

policy\_version

VARCHAR(50)

Policy version accepted

granted\_at

TIMESTAMPTZ

Grant timestamp

revoked\_at

TIMESTAMPTZ

Revocation timestamp

expires\_at

TIMESTAMPTZ

Optional expiry

evidence\_payload

JSONB

Consent evidence

created\_at

TIMESTAMPTZ

Creation timestamp

**Design Notes**

Consent must be versioned. If policy text changes materially, new consent may be required.

**28.6 Compliance Policies**

**Overview**

Compliance Policies define rules for data retention, access control, consent, data residency, encryption, deletion, audit logging, and regulatory obligations.

**Suggested Table: compliance\_policies**

**Column**

**Data Type**

**Description**

compliance\_policy\_id

UUID

Primary policy identifier

tenant\_id

UUID

Tenant identifier

policy\_code

VARCHAR(120)

Unique policy code

policy\_name

VARCHAR(180)

Policy name

policy\_type

VARCHAR(100)

Retention, Privacy, Security, Access, Residency

regulatory\_framework

VARCHAR(120)

GDPR, Data Protection Act, SOC2, ISO27001, PCI DSS

policy\_rules

JSONB

Machine-readable policy rules

lifecycle\_status

VARCHAR(50)

Draft, Active, Deprecated, Archived

effective\_from

DATE

Effective start

effective\_to

DATE

Effective end

approved\_by\_user\_id

UUID

Approver

approved\_at

TIMESTAMPTZ

Approval timestamp

created\_at

TIMESTAMPTZ

Creation timestamp

updated\_at

TIMESTAMPTZ

Update timestamp

**28.7 Policy Enforcement Logs**

**Overview**

Policy Enforcement Logs record decisions made by compliance, privacy, security, and access-control engines.

**Suggested Table: policy\_enforcement\_logs**

**Column**

**Data Type**

**Description**

enforcement\_log\_id

UUID

Primary enforcement log

tenant\_id

UUID

Tenant identifier

compliance\_policy\_id

UUID

Policy reference

actor\_type

VARCHAR(80)

User, Service, AI Agent, Admin

actor\_id

UUID

Actor

target\_type

VARCHAR(120)

Entity type

target\_id

UUID

Target

enforcement\_action

VARCHAR(100)

Allow, Deny, Mask, Redact, Delete, Retain

decision

VARCHAR(50)

Allowed, Blocked, Modified

decision\_reason

TEXT

Reason

evaluated\_at

TIMESTAMPTZ

Evaluation timestamp

metadata

JSONB

Extra context

**28.8 Data Subject Requests**

**Overview**

Data Subject Requests manage privacy rights such as access, correction, deletion, restriction, portability, and objection.

**Suggested Table: data\_subject\_requests**

**Column**

**Data Type**

**Description**

request\_id

UUID

Primary request identifier

tenant\_id

UUID

Tenant identifier

subject\_type

VARCHAR(80)

User, Organization

subject\_id

UUID

Subject

request\_type

VARCHAR(100)

Access, Correction, Deletion, Export, Restriction, Objection

request\_status

VARCHAR(50)

Submitted, Verifying, Processing, Completed, Rejected

submitted\_by\_user\_id

UUID

Requester

assigned\_to\_user\_id

UUID

Handler

verification\_status

VARCHAR(50)

Pending, Verified, Failed

due\_date

DATE

Regulatory response deadline

completed\_at

TIMESTAMPTZ

Completion timestamp

rejection\_reason

TEXT

Rejection reason

result\_object\_key

TEXT

Export or response file

created\_at

TIMESTAMPTZ

Creation timestamp

updated\_at

TIMESTAMPTZ

Update timestamp

**Design Notes**

Deletion requests must coordinate with all data-owning services and respect legal holds, financial retention, HR retention, and regulatory obligations.

**28.9 Data Retention Records**

**Overview**

Data Retention Records track retention rules and execution outcomes across services and datasets.

**Suggested Table: data\_retention\_rules**

**Column**

**Data Type**

**Description**

retention\_rule\_id

UUID

Primary rule identifier

tenant\_id

UUID

Tenant identifier

service\_name

VARCHAR(120)

Owning service

dataset\_name

VARCHAR(180)

Dataset or table

data\_category

VARCHAR(120)

Finance, HR, Messaging, Audit, Analytics

retention\_days

INTEGER

Retention period

archive\_before\_delete

BOOLEAN

Archive flag

anonymize\_before\_delete

BOOLEAN

Anonymization flag

legal\_hold\_override

BOOLEAN

Whether legal holds prevent deletion

lifecycle\_status

VARCHAR(50)

Active, Inactive, Archived

created\_at

TIMESTAMPTZ

Creation timestamp

updated\_at

TIMESTAMPTZ

Update timestamp

**Suggested Table: data\_retention\_executions**

**Column**

**Data Type**

**Description**

retention\_execution\_id

UUID

Primary execution identifier

tenant\_id

UUID

Tenant identifier

retention\_rule\_id

UUID

Retention rule

execution\_status

VARCHAR(50)

Started, Completed, Failed, Skipped

records\_scanned

BIGINT

Records scanned

records\_archived

BIGINT

Records archived

records\_deleted

BIGINT

Records deleted

records\_anonymized

BIGINT

Records anonymized

started\_at

TIMESTAMPTZ

Start timestamp

completed\_at

TIMESTAMPTZ

Completion timestamp

failure\_reason

TEXT

Failure reason

**28.10 Legal Holds**

**Overview**

Legal Holds preserve data that must not be deleted or altered due to investigation, litigation, regulatory review, dispute, or compliance process.

**Suggested Table: legal\_holds**

**Column**

**Data Type**

**Description**

legal\_hold\_id

UUID

Primary legal hold identifier

tenant\_id

UUID

Tenant identifier

hold\_name

VARCHAR(180)

Hold name

hold\_reason

TEXT

Reason

target\_type

VARCHAR(120)

User, Organization, Contract, Wallet, Message, Dataset

target\_id

UUID

Target entity

hold\_status

VARCHAR(50)

Active, Released

placed\_by\_user\_id

UUID

User who placed hold

released\_by\_user\_id

UUID

User who released hold

placed\_at

TIMESTAMPTZ

Hold timestamp

released\_at

TIMESTAMPTZ

Release timestamp

metadata

JSONB

Extra context

**Design Notes**

Retention and deletion workflows must check legal holds before archiving, anonymizing, or deleting records.

**28.11 Compliance Evidence**

**Overview**

Compliance Evidence stores proof that controls, policies, audits, certifications, reviews, approvals, and assessments were performed.

**Suggested Table: compliance\_evidence**

**Column**

**Data Type**

**Description**

evidence\_id

UUID

Primary evidence identifier

tenant\_id

UUID

Tenant identifier

evidence\_type

VARCHAR(120)

PolicyApproval, AccessReview, BackupTest, SecurityTest

framework

VARCHAR(120)

ISO27001, SOC2, GDPR, PCI DSS

control\_id

VARCHAR(120)

Control reference

evidence\_title

VARCHAR(255)

Evidence title

evidence\_description

TEXT

Description

evidence\_object\_key

TEXT

Object storage evidence file

collected\_by\_user\_id

UUID

Collector

collected\_at

TIMESTAMPTZ

Collection timestamp

review\_status

VARCHAR(50)

Pending, Approved, Rejected

reviewed\_by\_user\_id

UUID

Reviewer

reviewed\_at

TIMESTAMPTZ

Review timestamp

metadata

JSONB

Extra metadata

**28.12 Compliance Cases and Investigations**

**Overview**

Compliance Cases manage investigations related to security incidents, policy violations, fraud, privacy incidents, abuse, suspicious activity, and regulatory inquiries.

**Suggested Table: compliance\_cases**

**Column**

**Data Type**

**Description**

compliance\_case\_id

UUID

Primary case identifier

tenant\_id

UUID

Tenant identifier

case\_number

VARCHAR(120)

Human-readable case number

case\_type

VARCHAR(120)

SecurityIncident, PrivacyRequest, Fraud, Abuse, AuditFinding

severity

VARCHAR(50)

Low, Medium, High, Critical

case\_status

VARCHAR(50)

Open, Investigating, Resolved, Closed

subject\_type

VARCHAR(80)

User, Organization, Transaction, System

subject\_id

UUID

Subject identifier

assigned\_to\_user\_id

UUID

Investigator

opened\_by\_user\_id

UUID

Case creator

summary

TEXT

Case summary

resolution\_summary

TEXT

Resolution

opened\_at

TIMESTAMPTZ

Open timestamp

resolved\_at

TIMESTAMPTZ

Resolution timestamp

closed\_at

TIMESTAMPTZ

Closure timestamp

metadata

JSONB

Extra metadata

**Suggested Table: compliance\_case\_events**

**Column**

**Data Type**

**Description**

case\_event\_id

UUID

Primary case event

tenant\_id

UUID

Tenant identifier

compliance\_case\_id

UUID

Case reference

event\_type

VARCHAR(120)

NoteAdded, EvidenceAttached, StatusChanged, Escalated

actor\_user\_id

UUID

Actor

event\_payload

JSONB

Event details

occurred\_at

TIMESTAMPTZ

Event timestamp

**28.13 Regulatory Reports**

**Overview**

Regulatory Reports store generated compliance, audit, financial, privacy, security, and operational reports required by internal teams, clients, or regulators.

**Suggested Table: regulatory\_reports**

**Column**

**Data Type**

**Description**

report\_id

UUID

Primary report identifier

tenant\_id

UUID

Tenant identifier

report\_type

VARCHAR(120)

Privacy, Security, Financial, Audit, Compliance

framework

VARCHAR(120)

GDPR, ISO27001, SOC2, PCI DSS, Local Law

reporting\_period\_start

DATE

Period start

reporting\_period\_end

DATE

Period end

report\_status

VARCHAR(50)

Draft, Generated, Reviewed, Submitted, Archived

report\_object\_key

TEXT

Object storage report file

generated\_by\_user\_id

UUID

Generator

reviewed\_by\_user\_id

UUID

Reviewer

submitted\_at

TIMESTAMPTZ

Submission timestamp

generated\_at

TIMESTAMPTZ

Generation timestamp

metadata

JSONB

Extra metadata

**28.14 Risk Register**

**Overview**

The Risk Register records compliance, security, operational, financial, AI, legal, and privacy risks.

**Suggested Table: risk\_register**

**Column**

**Data Type**

**Description**

risk\_id

UUID

Primary risk identifier

tenant\_id

UUID

Tenant identifier

risk\_code

VARCHAR(120)

Risk code

risk\_title

VARCHAR(255)

Risk title

risk\_category

VARCHAR(120)

Security, Privacy, Finance, AI, Operational, Legal

risk\_description

TEXT

Description

likelihood\_score

NUMERIC(5,2)

Likelihood

impact\_score

NUMERIC(5,2)

Impact

inherent\_risk\_score

NUMERIC(8,4)

Inherent risk

residual\_risk\_score

NUMERIC(8,4)

Residual risk

risk\_status

VARCHAR(50)

Open, Mitigating, Accepted, Closed

risk\_owner\_user\_id

UUID

Risk owner

mitigation\_plan

TEXT

Mitigation plan

target\_resolution\_date

DATE

Target date

created\_at

TIMESTAMPTZ

Creation timestamp

updated\_at

TIMESTAMPTZ

Update timestamp

**28.15 Compliance Analytics**

**Overview**

Compliance Analytics measures security posture, audit coverage, access activity, consent status, data subject request handling, retention execution, policy violations, and risk trends.

**Suggested Table: compliance\_events**

**Column**

**Data Type**

**Description**

compliance\_event\_id

UUID

Primary compliance event

tenant\_id

UUID

Tenant identifier

event\_type

VARCHAR(150)

ConsentGranted, DSRCompleted, PolicyBlocked, LegalHoldPlaced

source\_service

VARCHAR(120)

Source service

related\_entity\_type

VARCHAR(120)

Related entity type

related\_entity\_id

UUID

Related entity

event\_payload

JSONB

Event details

occurred\_at

TIMESTAMPTZ

Business event time

created\_at

TIMESTAMPTZ

Storage time

**Key Metrics**

-   Audit events captured
-   Security events by severity
-   Failed access attempts
-   Sensitive data access count
-   Consent grant rate
-   Consent revocation rate
-   Data subject requests submitted
-   Data subject request completion time
-   Retention jobs completed
-   Records deleted or anonymized
-   Legal holds active
-   Compliance cases open
-   Policy enforcement blocks
-   Risk score trends
-   Evidence review completion rate

**Recommended ClickHouse Fact Tables**

-   fact\_audit\_events
-   fact\_security\_events
-   fact\_data\_access
-   fact\_consent\_status
-   fact\_data\_subject\_requests
-   fact\_retention\_execution
-   fact\_policy\_enforcement
-   fact\_compliance\_cases
-   fact\_risk\_register

**28.16 Constraints**

**Primary Key Constraints**

Core tables use UUID primary keys:

-   audit\_event\_id
-   security\_event\_id
-   data\_access\_log\_id
-   consent\_id
-   compliance\_policy\_id
-   enforcement\_log\_id
-   request\_id
-   retention\_rule\_id
-   retention\_execution\_id
-   legal\_hold\_id
-   evidence\_id
-   compliance\_case\_id
-   case\_event\_id
-   report\_id
-   risk\_id

**Foreign Key Constraints**

Recommended internal foreign keys:

-   policy\_enforcement\_logs.compliance\_policy\_id → compliance\_policies.compliance\_policy\_id
-   data\_retention\_executions.retention\_rule\_id → data\_retention\_rules.retention\_rule\_id
-   compliance\_case\_events.compliance\_case\_id → compliance\_cases.compliance\_case\_id

Cross-service identifiers such as user\_id, organization\_id, transaction\_id, wallet\_id, contract\_id, ai\_agent\_id, and profile\_id should be validated through APIs or event-synchronized read models.

**Check Constraints**

Recommended checks:

-   retention\_days >= 0
-   records\_scanned >= 0
-   records\_archived >= 0
-   records\_deleted >= 0
-   records\_anonymized >= 0
-   reporting\_period\_end >= reporting\_period\_start
-   likelihood\_score BETWEEN 0 AND 5
-   impact\_score BETWEEN 0 AND 5
-   residual\_risk\_score >= 0
-   due\_date IS NULL OR due\_date >= created\_at::date

**Unique Constraints**

Recommended unique constraints:

-   Unique policy code per tenant.
-   Unique case number per tenant.
-   Unique risk code per tenant.
-   One active consent record per subject, consent type, and policy version.
-   One active legal hold per target and hold reason where applicable.
-   One active retention rule per service, dataset, and tenant.

**28.17 Indexing Strategy**

**Audit Event Indexes**

Recommended indexes:

-   idx\_audit\_events\_tenant\_time
-   idx\_audit\_events\_actor
-   idx\_audit\_events\_target
-   idx\_audit\_events\_source\_service
-   idx\_audit\_events\_event\_type
-   idx\_audit\_events\_risk\_level
-   idx\_audit\_events\_correlation\_id

**Security Event Indexes**

Recommended indexes:

-   idx\_security\_events\_user
-   idx\_security\_events\_severity
-   idx\_security\_events\_type
-   idx\_security\_events\_ip
-   idx\_security\_events\_occurred\_at

**Data Access Indexes**

Recommended indexes:

-   idx\_data\_access\_actor
-   idx\_data\_access\_entity
-   idx\_data\_access\_classification
-   idx\_data\_access\_occurred\_at

**Consent Indexes**

Recommended indexes:

-   idx\_consent\_subject
-   idx\_consent\_type\_status
-   idx\_consent\_policy\_version

**Compliance Case Indexes**

Recommended indexes:

-   idx\_compliance\_cases\_status
-   idx\_compliance\_cases\_severity
-   idx\_compliance\_cases\_subject
-   idx\_case\_events\_case

**Retention and Legal Hold Indexes**

Recommended indexes:

-   idx\_retention\_rules\_dataset
-   idx\_retention\_executions\_rule
-   idx\_legal\_holds\_target
-   idx\_legal\_holds\_status

**28.18 Partitioning Strategy**

**Time-Based Partitioning**

High-volume tables should be partitioned monthly or quarterly:

-   audit\_events
-   security\_events
-   data\_access\_logs
-   policy\_enforcement\_logs
-   compliance\_events
-   retention\_executions

**Tenant-Aware Partitioning**

Large enterprise tenants may require dedicated audit partitions, isolated audit storage, or separate encryption keys.

**Immutable Archive Strategy**

Older audit records should be exported to immutable Object Storage using write-once or object-lock policies where available.

**Retention Strategy**

Audit and compliance data retention should vary by data category:

-   Security logs: medium to long retention.
-   Financial audit logs: long retention.
-   HR audit logs: long retention.
-   Consent records: retained while legally relevant.
-   Data access logs: retained according to privacy and security policy.
-   Legal hold records: retained until released and archived.

**28.19 ERD**

**Conceptual ERD**

AuditEvent

SecurityEvent

DataAccessLog

ConsentRecord

CompliancePolicy

└── PolicyEnforcementLog

DataRetentionRule

└── DataRetentionExecution

LegalHold

ComplianceEvidence

ComplianceCase

└── ComplianceCaseEvent

RegulatoryReport

RiskRegister

ComplianceEvent

**Relationship Summary**

**Parent Entity**

**Child Entity**

**Cardinality**

Compliance Policy

Policy Enforcement Logs

1:N

Data Retention Rule

Data Retention Executions

1:N

Compliance Case

Case Events

1:N

Target Entity

Audit Events

1:N logical

Target Entity

Data Access Logs

1:N logical

Target Entity

Legal Holds

1:N logical

Subject

Consent Records

1:N logical

Risk

Compliance Evidence

0:N logical

**ERD Design Notes**

The Audit & Compliance Database is designed around immutable evidence capture. Audit events, security events, data access logs, policy enforcement logs, compliance cases, and retention executions create a complete accountability layer across Kaziforce.

The design separates operational compliance metadata in PostgreSQL from high-volume audit analytics in ClickHouse and immutable archives in Object Storage. This supports security investigations, regulatory reporting, legal defensibility, data governance, privacy compliance, and enterprise trust.

**Part IV — Data Engineering**

**29\. Entity Relationship Models**

**29.1 Enterprise ERD**

The Enterprise Entity Relationship Model provides the highest-level view of Kaziforce data domains and their relationships. It shows how major platform entities relate across Identity, Organizations, Profiles, Marketplace, Finance, Workforce, Learning, AI, CRM, Support, Analytics, and Compliance.

**Conceptual Enterprise ERD**

User

├── ProfessionalProfile

│ ├── Skills

│ ├── Certifications

│ ├── Credentials

│ ├── Applications

│ ├── WorkforceAssignments

│ ├── Wallet

│ ├── LearningEnrollments

│ └── AIRecommendations

├── EmployeeRecord

├── Conversations

├── Notifications

├── CalendarEvents

└── AuditEvents

Organization

├── Departments

├── BusinessUnits

├── Branches

├── Teams

├── Jobs

├── Projects

├── Contracts

├── Employees

├── Subscriptions

├── BillingAccounts

├── SupportTickets

└── CRMAccounts

Job

├── RequiredSkills

├── Applications

├── TalentMatches

├── Offers

└── Contracts

Project

├── Jobs

├── Milestones

├── WorkforceAssignments

├── Timesheets

└── Contracts

Contract

├── Timesheets

├── Invoices

├── Payments

├── EscrowAccounts

└── LedgerEntries

Wallet

├── LedgerAccounts

├── FinancialTransactions

├── Payments

├── Payouts

└── TaxRecords

AI Agent

├── AgentTasks

├── AgentTools

├── AgentMemoryLinks

├── Recommendations

└── AuditEvents

**Enterprise Relationship Principles**

The enterprise ERD follows these principles:

-   Each business entity has one authoritative owning service.
-   Cross-service relationships use UUID references.
-   Direct joins across service databases are prohibited.
-   Events synchronize replicated read models.
-   Analytical joins are allowed only in the Analytics Database.
-   Financial and audit relationships must be immutable and traceable.
-   AI-derived entities must reference their source entities and model versions.

**29.2 Service-Level ERDs**

Service-Level ERDs define detailed logical relationships inside each bounded context. These ERDs are owned by the responsible microservice and are implemented inside its database schema.

**Identity Service ERD**

User

├── UserCredential

├── UserSession

├── RefreshToken

├── MFADevice

├── UserRole

│ └── Role

│ └── RolePermission

│ └── Permission

├── OAuthAccount

├── APIKey

└── SecurityEvent

**Organization Service ERD**

Organization

├── Department

├── BusinessUnit

├── Branch

├── Team

│ └── TeamMember

├── OrganizationRelationship

└── OrganizationHierarchyPath

**Profile Service ERD**

ProfessionalProfile

├── ProfileSkill

│ └── Skill

├── ProfileCertification

├── ProfileLicense

├── ProfileEducation

├── ProfileWorkExperience

├── ProfilePortfolioItem

├── ProfileResume

├── ProfileAvailability

└── ProfileEmbedding

**Marketplace Service ERD**

Job

├── JobRequiredSkill

├── Application

│ ├── ApplicationAnswer

│ ├── ApplicationStageHistory

│ ├── Offer

│ │ └── Negotiation

│ └── Contract

├── TalentMatch

└── HiringPipeline

**Finance & Wallet Service ERD**

Wallet

├── LedgerAccount

│ └── LedgerEntry

├── FinancialTransaction

│ ├── Payment

│ ├── Payout

│ ├── TaxRecord

│ └── FinancialAuditEvent

└── EscrowAccount

└── EscrowMovement

**AI Matching Service ERD**

MatchingProfile

├── MatchingProfileFeature

├── EmbeddingRecord

├── RankingScore

└── Recommendation

└── RecommendationFeedback

**Analytics Service ERD**

RawEvent

├── FactTable

│ └── DimensionTable

├── MaterializedView

├── KPIDefinition

└── AnalyticsDashboard

└── DashboardWidget

**29.3 Cross-Service Relationships**

Cross-service relationships represent business links between entities owned by different services. These relationships are stored as identifiers and synchronized through events, not direct foreign keys.

**Cross-Service Relationship Matrix**

**Source Entity**

**Source Service**

**Target Entity**

**Target Service**

**Relationship**

User

Identity

Professional Profile

Profile

User owns profile

User

Identity

Employee

HR

User is employee

Organization

Organization

Job

Marketplace

Organization posts job

Organization

Organization

Subscription

Subscription

Organization owns subscription

Professional Profile

Profile

Application

Marketplace

Profile submits application

Job

Marketplace

Talent Match

AI Matching

Job receives matches

Contract

Marketplace

Timesheet

Time Tracking

Contract records work time

Timesheet

Time Tracking

Invoice

Finance

Approved time creates billing

Contract

Marketplace

Escrow Account

Finance

Contract funds escrow

Wallet

Finance

Payout

Finance

Wallet funds payout

Course

Learning

Credential

Credential

Course may issue credential

Support Ticket

Support

Knowledge Article

Knowledge Base

Ticket links article

AI Agent

AI Agent

Memory Record

AI Memory

Agent accesses memory

Any Entity

Any Service

Audit Event

Audit

Entity generates audit record

**Cross-Service Design Rules**

-   Use UUID references for external entities.
-   Do not enforce database-level foreign keys across service databases.
-   Validate external references through APIs or event-synchronized read models.
-   Use domain events to keep downstream read models updated.
-   Store denormalized snapshots where historical accuracy is required.
-   Use correlation IDs to trace workflows across services.
-   Use the Analytics Database for cross-domain reporting joins.

**29.4 Physical Data Models**

Physical Data Models translate logical ERDs into database-specific schemas, indexes, partitions, constraints, and storage layouts.

**PostgreSQL Physical Model**

PostgreSQL is used for structured transactional domains.

Physical design standards include:

-   UUID primary keys.
-   tenant\_id on tenant-scoped tables.
-   created\_at, updated\_at, and deleted\_at audit fields.
-   Optimistic locking through version.
-   Soft deletes for business records.
-   Foreign keys within the same service database.
-   Composite indexes for tenant-scoped queries.
-   Partial indexes for active records.
-   Time-based partitioning for high-volume event tables.
-   JSONB only for flexible metadata, not core relational fields.

**MongoDB Physical Model**

MongoDB is used for flexible documents.

Physical design standards include:

-   One collection per aggregate document type.
-   tenant\_id and source entity ID on every document.
-   Schema validation for critical collections.
-   Compound indexes on tenant and source entity fields.
-   TTL indexes for temporary documents.
-   Version fields for mutable content.
-   Separate collections for rich content, parsed documents, AI summaries, and conversation bodies.

**Redis Physical Model**

Redis is used for transient, cached, and real-time data.

Physical design standards include:

-   Consistent namespaced keys.
-   Tenant-aware key prefixes.
-   TTL on all transient keys.
-   No long-term financial source-of-truth storage.
-   Use hashes for structured cache objects.
-   Use sorted sets for queues, rankings, and timers.
-   Use streams for lightweight event buffers where appropriate.

**OpenSearch Physical Model**

OpenSearch is used for full-text, faceted, and hybrid search.

Physical design standards include:

-   One index per searchable domain.
-   Index aliases for zero-downtime reindexing.
-   Tenant filters on all documents.
-   Separate fields for keyword and text search.
-   Nested fields for structured lists.
-   Dense vector fields where hybrid search is required.
-   Lifecycle policies for old indexes.

**ClickHouse Physical Model**

ClickHouse is used for analytics.

Physical design standards include:

-   Fact and dimension table separation.
-   Date-based partitions.
-   Tenant-aware sorting keys.
-   Materialized views for high-frequency metrics.
-   Columnar compression.
-   Append-only event ingestion.
-   Aggregated tables for dashboard performance.

**Object Storage Physical Model**

Object Storage is used for large files.

Physical design standards include:

/{tenant\_id}/{service\_name}/{entity\_type}/{entity\_id}/{file\_type}/{file\_name}

Stored objects include:

-   Resumes
-   Contracts
-   Certificates
-   Invoices
-   Recordings
-   Attachments
-   Reports
-   AI datasets

All object references are stored in service databases as object keys, not raw files.

**Physical Model Governance**

Every physical model must define:

-   Table or collection name.
-   Field names and data types.
-   Primary keys.
-   Unique constraints.
-   Foreign keys where applicable.
-   Indexes.
-   Partitioning strategy.
-   Retention policy.
-   Encryption requirements.
-   Audit requirements.
-   Migration ownership.
-   Backup and recovery classification.

**30\. Field-Level Specifications**

**30.1 Naming Standards**

Kaziforce database fields must follow consistent naming standards across all services.

**General Rules**

-   Use snake\_case for all table, column, index, and constraint names.
-   Use clear business names, not abbreviations.
-   Use singular entity names for primary key fields.
-   Use UUID suffixes consistently with \_id.
-   Use timestamp suffixes consistently with \_at.
-   Use date-only suffixes consistently with \_date.
-   Use boolean prefixes such as is\_, has\_, can\_, or requires\_.
-   Use status fields with \_status.
-   Use type fields with \_type.
-   Use monetary fields with \_amount.
-   Use currency fields with currency\_code.

**Examples**

**Purpose**

**Standard Example**

Primary key

user\_id, wallet\_id, contract\_id

Foreign reference

organization\_id, profile\_id, invoice\_id

Timestamp

created\_at, updated\_at, paid\_at

Date

start\_date, end\_date, issue\_date

Boolean

is\_active, has\_attachments, requires\_approval

Status

payment\_status, contract\_status

Type

wallet\_type, notification\_type

Amount

gross\_amount, tax\_amount, net\_amount

**30.2 Data Types**

Kaziforce uses standard data types to improve consistency, portability, and maintainability.

**Data Category**

**Preferred Type**

**Usage**

Primary identifiers

UUID

All primary keys

External references

UUID

Cross-service entity references

Short text

VARCHAR(n)

Names, codes, titles

Long text

TEXT

Descriptions, notes, summaries

Money

NUMERIC(18,4)

Wallets, payments, invoices

Percentages

NUMERIC(8,4)

Rates, scores, percentages

Dates

DATE

Effective dates, issue dates

Timestamps

TIMESTAMPTZ

Events, updates, lifecycle tracking

Boolean values

BOOLEAN

True or false flags

Flexible metadata

JSONB

Non-core extensible fields

IP addresses

INET

Security and access logs

Country codes

CHAR(2)

ISO country codes

Currency codes

CHAR(3)

ISO currency codes

**Design Rules**

-   Use TIMESTAMPTZ, not TIMESTAMP, for time-aware records.
-   Use NUMERIC, not floating-point types, for money.
-   Use JSONB only for flexible metadata, not core searchable fields.
-   Use UUID for all internal entity identifiers.
-   Store large files in Object Storage, not database binary fields.

**30.3 Default Values**

Default values should make records predictable without hiding business logic.

**Field**

**Recommended Default**

created\_at

NOW()

updated\_at

NOW()

version

1

is\_active

TRUE

deleted\_at

NULL

metadata

{}

approval\_status

PENDING

verification\_status

UNVERIFIED

lifecycle\_status

ACTIVE or DRAFT depending on entity

currency\_code

Tenant default currency

tenant\_id

Required from request context

**Design Rules**

-   Defaults must not create valid financial transactions without explicit business action.
-   Status defaults must reflect safe initial states.
-   Approval, verification, and payment statuses should default to non-final states.
-   deleted\_at should default to NULL and be used for soft deletion.

**30.4 Constraints**

Constraints enforce data integrity at the database level.

**Primary Key Constraints**

Every table must have a UUID primary key.

Example:

wallet\_id UUID PRIMARY KEY

**Foreign Key Constraints**

Foreign keys should be used within the same service database.

Cross-service references should not use database-level foreign keys.

**Unique Constraints**

Use unique constraints for fields that must not duplicate.

Examples:

-   Unique email per tenant.
-   Unique invoice number per tenant.
-   Unique wallet per owner and currency.
-   Unique subscription plan code.
-   Unique active license assignment.

**Check Constraints**

Use check constraints for numeric ranges and valid date logic.

Examples:

CHECK (amount >= 0)

CHECK (end\_date IS NULL OR end\_date >= start\_date)

CHECK (confidence\_score BETWEEN 0 AND 1)

CHECK (allocation\_percentage BETWEEN 0 AND 100)

**Not Null Constraints**

Core business fields must be NOT NULL.

Examples:

-   Primary keys
-   tenant\_id
-   Status fields
-   Required amounts
-   Required timestamps
-   Required owner references

**30.5 Enumerations**

Enumerations standardize status, type, category, and lifecycle values.

**Recommended Approach**

Kaziforce may implement enumerations using:

-   PostgreSQL enum types for stable values.
-   Lookup tables for configurable values.
-   Application-level enum validation for evolving values.

**Common Enumeration Groups**

**Field**

**Example Values**

lifecycle\_status

DRAFT, ACTIVE, INACTIVE, ARCHIVED, DELETED

verification\_status

UNVERIFIED, PENDING, VERIFIED, REJECTED, EXPIRED

approval\_status

PENDING, APPROVED, REJECTED, CANCELLED

payment\_status

INITIATED, PENDING, CONFIRMED, FAILED, REFUNDED

transaction\_status

PENDING, PROCESSING, COMPLETED, FAILED, REVERSED

contract\_status

DRAFT, PENDING\_SIGNATURE, ACTIVE, COMPLETED, TERMINATED

subscription\_status

TRIAL, ACTIVE, PAST\_DUE, SUSPENDED, CANCELLED, EXPIRED

risk\_level

LOW, MEDIUM, HIGH, CRITICAL

**Design Rules**

-   Store enum values in uppercase.
-   Avoid free-text status values.
-   Do not reuse one enum for unrelated workflows.
-   Preserve historical enum values even if no longer used.
-   Deprecate values before removal.

**30.6 Validation Rules**

Validation must occur at multiple layers: API, service, domain model, and database.

**Required Validation Categories**

**Category**

**Example Rule**

Identity

Email must be valid and normalized

Finance

Amount must be positive and currency must be valid

Scheduling

End time must be after start time

Wallet

Available balance cannot be negative unless policy allows

Profile

Rate range must have minimum less than maximum

Subscription

Usage must not exceed hard limits

Credentials

Expiry date must be after issue date

AI

Confidence score must be between 0 and 1

Files

File size and MIME type must be allowed

**Cross-Service Validation**

Cross-service IDs must be validated using:

-   API lookup.
-   Event-synchronized read model.
-   Cached reference data.
-   Workflow orchestration.

Direct database joins across services are not allowed.

**30.7 Generated Fields**

Generated fields are values produced by the system to improve traceability, searchability, usability, or calculation accuracy.

**Common Generated Fields**

**Field**

**Purpose**

invoice\_number

Human-readable invoice reference

ticket\_number

Human-readable support reference

contract\_number

Human-readable contract reference

transaction\_reference

Financial transaction tracking

job\_slug

URL-friendly job identifier

course\_slug

URL-friendly course identifier

profile\_completion\_score

Profile quality indicator

balance\_due

Invoice outstanding balance

duration\_seconds

Calculated call or meeting duration

duration\_minutes

Calculated work log duration

**Design Rules**

-   Generated references must be unique within the correct tenant or domain.
-   Financial calculated fields must be reproducible from source records.
-   Slugs must handle collisions.
-   Generated values should not overwrite manually approved legal records.
-   Generated AI fields must include model version and generation timestamp.

**30.8 Audit Fields**

All business-critical tables must include standard audit fields.

**Standard Audit Fields**

**Field**

**Data Type**

**Description**

created\_at

TIMESTAMPTZ

Record creation timestamp

updated\_at

TIMESTAMPTZ

Last update timestamp

deleted\_at

TIMESTAMPTZ

Soft delete timestamp

created\_by

UUID

User or service that created record

updated\_by

UUID

User or service that last updated record

deleted\_by

UUID

User or service that deleted record

version

INTEGER

Optimistic locking version

metadata

JSONB

Flexible metadata

**Extended Audit Fields**

Sensitive tables may also include:

**Field**

**Purpose**

approved\_by\_user\_id

Approval tracking

approved\_at

Approval timestamp

verified\_by\_user\_id

Verification tracking

verified\_at

Verification timestamp

correlation\_id

Distributed workflow tracing

trace\_id

Observability tracing

source\_service

Event or record origin

source\_entity\_id

Original source record

**Design Rules**

-   Audit fields must not replace immutable audit event tables.
-   Soft-deleted records must remain queryable by authorized administrators.
-   Financial, HR, compliance, and audit records require append-only event history.
-   Every critical state change must emit an audit event.

**31\. Database Constraints**

**31.1 Primary Keys**

**Overview**

Primary Keys uniquely identify every record within a table and form the foundation of entity integrity across the Kaziforce platform.

Kaziforce adopts a globally unique identifier (UUID) strategy for all business entities to support distributed microservices, offline operations, event-driven architecture, and cross-region deployments.

**Primary Key Standards**

**Standard**

**Requirement**

Key Type

UUID (Version 7 preferred, Version 4 acceptable)

Nullability

NOT NULL

Uniqueness

Globally unique

Mutability

Immutable

Generation

Generated by the owning microservice

Scope

One primary key per table

**Naming Convention**

Primary keys follow the pattern:

<entity\_name>\_id

Examples:

**Table**

**Primary Key**

users

user\_id

organizations

organization\_id

jobs

job\_id

projects

project\_id

contracts

contract\_id

wallets

wallet\_id

invoices

invoice\_id

payments

payment\_id

ai\_agents

ai\_agent\_id

**Design Principles**

-   Primary keys must never change after creation.
-   Business identifiers must not be used as primary keys.
-   Sequential numeric IDs should be avoided for externally exposed entities.
-   Composite primary keys should only be used for associative tables where appropriate.

**Associative Table Example**

user\_roles

user\_role\_id (UUID)

OR

PRIMARY KEY(user\_id, role\_id)

The UUID approach is preferred for consistency across the platform.

**31.2 Foreign Keys**

**Overview**

Foreign Keys enforce referential integrity between related entities within the same microservice database.

Kaziforce follows Domain-Driven Design (DDD), where database-level foreign keys exist only inside a service boundary.

Cross-service relationships are maintained through APIs, events, and synchronized read models.

**Internal Foreign Keys**

Example:

organizations

\-------------

organization\_id

jobs

\-------------

job\_id

organization\_id

Constraint:

FOREIGN KEY (organization\_id)

REFERENCES organizations(organization\_id)

**Cross-Service References**

Instead of foreign keys:

contracts

professional\_profile\_id

organization\_id

wallet\_id

These IDs reference entities owned by other services.

Validation occurs through:

-   Service APIs
-   Kafka events
-   Cached read models
-   Saga workflows

Database-level foreign keys must **not** be created across service databases.

**Foreign Key Design Rules**

-   Parent records should exist before child creation.
-   Foreign keys should be indexed.
-   Foreign keys should not cross bounded contexts.
-   Circular foreign key dependencies should be avoided.
-   Nullable foreign keys should be used where business rules allow.

**31.3 Unique Constraints**

**Overview**

Unique Constraints prevent duplicate business records and preserve data integrity.

**Common Unique Constraints**

**Entity**

**Constraint**

User

Email per tenant

Organization

Registration number

Wallet

Owner + Currency

Invoice

Invoice number

Subscription Plan

Plan code

Coupon

Coupon code

API Key

API key hash

Knowledge Article

Slug

Certification

Certificate number

Role

Role name per tenant

**Composite Unique Constraints**

Example:

(wallet\_owner\_id,

currency\_code)

Ensures:

One wallet per owner per currency.

Example:

(user\_id,

organization\_id)

Ensures:

One organization membership per user.

Example:

(course\_id,

student\_id)

Ensures:

One enrollment per learner per course.

**Partial Unique Constraints**

Example:

UNIQUE(email)

WHERE deleted\_at IS NULL

Supports:

Soft deletes while preventing duplicate active records.

**31.4 Check Constraints**

**Overview**

Check Constraints validate business rules directly inside the database.

They protect against invalid values even if application validation fails.

**Numeric Constraints**

Examples:

CHECK(amount >= 0)

CHECK(balance >= 0)

CHECK(discount\_percentage BETWEEN 0 AND 100)

CHECK(confidence\_score BETWEEN 0 AND 1)

CHECK(utilization\_rate BETWEEN 0 AND 100)

**Date Constraints**

CHECK(end\_date >= start\_date)

CHECK(expiry\_date >= issue\_date)

CHECK(closed\_at >= created\_at)

**Financial Constraints**

CHECK(net\_amount =

gross\_amount -

fee\_amount -

tax\_amount)

**Status Constraints**

CHECK(status IN

(

'ACTIVE',

'SUSPENDED',

'CLOSED'

))

Where lookup tables are not used.

**Boolean Constraints**

CHECK(

NOT(

is\_deleted = TRUE

AND

deleted\_at IS NULL

))

**Tenant Constraints**

CHECK(tenant\_id IS NOT NULL)

For all tenant-owned records.

**31.5 Exclusion Constraints**

**Overview**

Exclusion Constraints prevent conflicting records that satisfy overlapping conditions.

They are especially useful for scheduling, bookings, allocations, and reservations.

**Workforce Scheduling**

Prevent overlapping assignments.

Professional

Assignment A

09:00–12:00

Assignment B

11:00–14:00

Rejected

**Meeting Rooms**

Prevent double booking.

Room A

Meeting 1

09:00–10:00

Meeting 2

09:30–11:00

Rejected

**Calendar Events**

Prevent conflicting reservations when exclusivity is required.

**Equipment Reservations**

Prevent two users reserving the same equipment simultaneously.

**PostgreSQL Example**

EXCLUDE USING gist

(

resource\_id WITH =,

time\_range WITH &&

)

**Recommended Uses**

-   Workforce schedules
-   Calendar reservations
-   Room booking
-   Asset reservation
-   Equipment allocation
-   Training sessions
-   Live event capacity
-   AI resource reservation

**31.6 Cascading Rules**

**Overview**

Cascading Rules define how changes to parent records affect related child records.

Kaziforce minimizes destructive cascades to preserve auditability and historical integrity.

**ON DELETE Rules**

**CASCADE**

Used only for short-lived dependent records.

Example:

Notification

Notification Preference

Deleting a notification may safely remove transient preference mappings.

**RESTRICT**

Used for financial and compliance records.

Example:

Wallet

Ledger Entries

Wallet deletion is prohibited while ledger entries exist.

**NO ACTION**

Preferred default.

Deletion is blocked until application logic determines the correct workflow.

**SET NULL**

Used for optional ownership.

Example:

Support Ticket

Assigned Agent

If the assigned agent leaves:

assigned\_agent\_id = NULL

Ticket history remains intact.

**SET DEFAULT**

Used where business defaults exist.

Example:

Knowledge Article

Category

Deleted category:

Category = "General"

**ON UPDATE Rules**

Primary keys should never change.

Therefore:

ON UPDATE CASCADE

should rarely be required.

If immutable UUIDs are used consistently:

ON UPDATE NO ACTION

is the recommended policy.

**Recommended Cascade Matrix**

**Parent Entity**

**Child Entity**

**Delete Rule**

**Update Rule**

Organization

Department

RESTRICT

NO ACTION

Organization

Job

RESTRICT

NO ACTION

User

Sessions

CASCADE

NO ACTION

User

MFA Devices

CASCADE

NO ACTION

Wallet

Ledger Entries

RESTRICT

NO ACTION

Invoice

Invoice Items

CASCADE

NO ACTION

Subscription

Subscription Items

CASCADE

NO ACTION

Ticket

Comments

CASCADE

NO ACTION

Course

Lessons

CASCADE

NO ACTION

Contract

Timesheets

RESTRICT

NO ACTION

Project

Tasks

CASCADE

NO ACTION

AI Agent

AI Tasks

RESTRICT

NO ACTION

**Constraint Governance**

All database constraints must comply with the following governance principles:

-   Constraints must enforce business integrity without violating service autonomy.
-   Cross-service integrity must be maintained through APIs, domain events, and saga orchestration rather than database foreign keys.
-   Financial, compliance, HR, audit, and ledger records must never rely on cascading deletes.
-   Every constraint must be documented in the Data Dictionary and traceable to the corresponding SRS and Technical Design Document requirements.
-   Constraint changes must be version-controlled through database migration scripts and reviewed as part of architecture governance.

**32\. Indexing Strategy**

**32.1 B-Tree Indexes**

**Overview**

B-Tree indexes are the default indexing mechanism in PostgreSQL and are the primary index type used throughout Kaziforce. They provide excellent performance for equality, range, sorting, and ordered retrieval operations.

**Recommended Use Cases**

B-Tree indexes should be used for:

-   Primary keys
-   Foreign keys
-   UUID lookups
-   Date range queries
-   Timestamp filtering
-   Status filtering
-   Sorting (ORDER BY)
-   Pagination
-   Tenant filtering
-   Unique constraints

**Examples**

CREATE INDEX idx\_users\_email

ON users(email);

CREATE INDEX idx\_jobs\_created\_at

ON jobs(created\_at);

CREATE INDEX idx\_contract\_status

ON contracts(contract\_status);

**Design Guidelines**

-   Index every foreign key.
-   Use B-Tree as the default unless another index type provides clear advantages.
-   Prefer composite indexes over multiple single-column indexes when queries consistently filter on multiple fields.
-   Regularly monitor index usage and remove unused indexes.

**32.2 Hash Indexes**

**Overview**

Hash indexes are optimized for equality (=) lookups only. While PostgreSQL supports WAL-logged hash indexes, they offer limited benefits compared to B-Tree indexes and should be used selectively.

**Recommended Use Cases**

-   Exact API key lookup
-   Session token lookup
-   Refresh token lookup
-   License key lookup
-   SHA-256 hash lookup
-   File checksum lookup

**Example**

CREATE INDEX idx\_api\_key\_hash

ON api\_keys

USING HASH(api\_key\_hash);

**Design Guidelines**

Use hash indexes only when:

-   Queries use exact equality.
-   Range scans are never required.
-   Performance testing demonstrates measurable improvement over B-Tree.

For most Kaziforce workloads, B-Tree remains the preferred choice.

**32.3 Composite Indexes**

**Overview**

Composite indexes optimize queries that filter, join, or sort using multiple columns.

**Design Principles**

Order columns based on:

1.  Equality predicates
2.  High-selectivity columns
3.  Range predicates
4.  Sort columns

**Examples**

Organization Jobs

CREATE INDEX idx\_jobs\_org\_status\_created

ON jobs

(

organization\_id,

job\_status,

created\_at DESC

);

Marketplace Applications

CREATE INDEX idx\_applications\_job\_status

ON applications

(

job\_id,

application\_status

);

Finance

CREATE INDEX idx\_transactions\_wallet\_time

ON transactions

(

wallet\_id,

created\_at DESC

);

Subscriptions

CREATE INDEX idx\_subscription\_tenant\_status

ON subscriptions

(

tenant\_id,

subscription\_status

);

**Recommended Composite Indexes**

**Table**

**Columns**

users

tenant\_id, email

jobs

organization\_id, status

applications

job\_id, status

contracts

organization\_id, status

invoices

organization\_id, invoice\_date

ledger\_entries

wallet\_id, created\_at

audit\_events

tenant\_id, occurred\_at

notifications

user\_id, read\_status

**32.4 Partial Indexes**

**Overview**

Partial indexes store only rows matching a condition, reducing storage requirements and improving query performance.

**Common Use Cases**

-   Active records
-   Non-deleted records
-   Pending approvals
-   Open tickets
-   Active subscriptions
-   Failed payments
-   Current contracts

**Examples**

Active Users

CREATE INDEX idx\_active\_users

ON users(email)

WHERE deleted\_at IS NULL;

Pending Approvals

CREATE INDEX idx\_pending\_approvals

ON approvals(created\_at)

WHERE approval\_status='PENDING';

Unread Notifications

CREATE INDEX idx\_unread\_notifications

ON notifications(user\_id)

WHERE is\_read=FALSE;

**Design Guidelines**

Partial indexes should be used whenever:

-   A large percentage of rows are inactive.
-   Queries consistently target a subset of records.
-   Soft-delete patterns are used.

**32.5 Covering Indexes**

**Overview**

Covering indexes include additional columns so PostgreSQL can satisfy queries directly from the index without reading the table.

Kaziforce uses PostgreSQL's INCLUDE clause.

**Example**

CREATE INDEX idx\_jobs\_listing

ON jobs

(

organization\_id,

job\_status

)

INCLUDE

(

title,

salary\_min,

salary\_max,

location

);

**Benefits**

-   Fewer heap lookups
-   Faster dashboard queries
-   Reduced I/O
-   Improved pagination performance

**Recommended Use Cases**

-   Marketplace listings
-   Search results
-   Notification lists
-   User dashboards
-   Admin dashboards
-   Analytics summaries

**32.6 GIN Indexes**

**Overview**

Generalized Inverted Indexes (GIN) support indexing composite data structures such as JSONB, arrays, and full-text search vectors.

They are widely used across Kaziforce for flexible and searchable content.

**JSONB Indexes**

Example

CREATE INDEX idx\_profile\_metadata

ON professional\_profiles

USING GIN(metadata);

**Array Indexes**

CREATE INDEX idx\_skills

ON jobs

USING GIN(required\_skills);

**Full-Text Search**

CREATE INDEX idx\_article\_search

ON knowledge\_articles

USING GIN(search\_vector);

**Recommended Domains**

-   AI metadata
-   Flexible settings
-   Skills arrays
-   Tags
-   Permissions
-   Search vectors
-   Dynamic configuration
-   Knowledge articles

**32.7 BRIN Indexes**

**Overview**

Block Range Indexes (BRIN) provide lightweight indexing for extremely large append-only tables where data is naturally ordered.

They consume significantly less storage than B-Tree indexes.

**Recommended Tables**

-   Audit logs
-   Analytics events
-   Ledger entries
-   Notification logs
-   API request logs
-   AI inference logs
-   System monitoring
-   Time tracking
-   Message history

**Example**

CREATE INDEX idx\_audit\_time

ON audit\_events

USING BRIN

(occurred\_at);

**Advantages**

-   Very small indexes
-   Fast sequential scans
-   Excellent for historical reporting
-   Efficient append-only workloads

**Design Guidelines**

Use BRIN only when:

-   Tables exceed tens of millions of rows.
-   Data is naturally ordered by timestamp or sequence.
-   Queries are predominantly time-range based.

**32.8 Full-Text Indexes**

**Overview**

Kaziforce supports enterprise-wide search using PostgreSQL Full-Text Search and OpenSearch.

PostgreSQL Full-Text Search is suitable for transactional search within a service, while OpenSearch powers global, multilingual, faceted, and semantic search.

**PostgreSQL Full-Text**

Example

CREATE INDEX idx\_resume\_search

ON resumes

USING GIN(search\_vector);

**Searchable Domains**

-   Jobs
-   Resumes
-   Knowledge articles
-   Learning content
-   Support articles
-   CRM notes
-   Contracts
-   Messages
-   AI documentation

**OpenSearch Integration**

Large-scale search is synchronized into OpenSearch indexes such as:

jobs\_index

profiles\_index

knowledge\_index

messages\_index

courses\_index

organizations\_index

**Design Guidelines**

-   Maintain language-aware search vectors.
-   Refresh search indexes asynchronously through Kafka events.
-   Avoid querying transactional databases for enterprise-wide search.

**32.9 Vector Indexes**

**Overview**

Vector indexes enable semantic similarity search for AI-powered capabilities including talent matching, recommendation systems, AI memory retrieval, document search, and knowledge discovery.

Kaziforce uses a dedicated vector database (such as pgvector, Milvus, Qdrant, Weaviate, or Pinecone depending on deployment) to store and index embeddings generated by AI models.

**Primary Use Cases**

-   AI-powered talent matching
-   Semantic profile search
-   Resume similarity search
-   Job recommendation
-   AI memory retrieval
-   Knowledge base retrieval (RAG)
-   AI agent context retrieval
-   Course recommendation
-   Similar project discovery
-   Document similarity
-   Enterprise semantic search

**Example Schema (pgvector)**

CREATE TABLE profile\_embeddings (

profile\_embedding\_id UUID PRIMARY KEY,

profile\_id UUID NOT NULL,

embedding VECTOR(1536),

model\_name VARCHAR(100),

model\_version VARCHAR(50),

created\_at TIMESTAMPTZ

);

CREATE INDEX idx\_profile\_embedding

ON profile\_embeddings

USING hnsw (embedding vector\_cosine\_ops);

**Recommended Vector Collections**

**Collection**

**Purpose**

profile\_embeddings

Professional profile matching

job\_embeddings

Semantic job search

resume\_embeddings

Resume similarity

knowledge\_embeddings

Knowledge Base retrieval

course\_embeddings

Learning recommendations

document\_embeddings

Enterprise document search

ai\_memory\_embeddings

AI long-term memory

support\_embeddings

Intelligent support responses

crm\_embeddings

Customer interaction analysis

**Index Algorithms**

Recommended approximate nearest neighbor (ANN) algorithms include:

**Algorithm**

**Recommended Use**

HNSW

Default production index for high accuracy and low latency

IVFFlat

Large datasets with configurable recall

DiskANN

Very large enterprise deployments

PQ (Product Quantization)

Memory-efficient billion-scale search

**Design Guidelines**

-   Store embeddings separately from transactional records.
-   Persist the originating model name and version with every embedding.
-   Regenerate embeddings when source content changes significantly.
-   Use cosine similarity as the default distance metric unless a model recommends otherwise.
-   Keep vector indexes synchronized through event-driven pipelines.
-   Encrypt sensitive embeddings where required by compliance policies.
-   Partition vector collections by tenant for large enterprise deployments.
-   Apply access controls identical to those governing the source documents or entities.

**Index Governance**

All indexes across Kaziforce must comply with the following governance principles:

-   Every index must support a documented query pattern or business requirement.
-   Index definitions must be traceable to the SRS, Technical Design Document (TDD), and Database Design Document (DDD).
-   Index usage shall be monitored continuously using database performance statistics.
-   Redundant, duplicate, and unused indexes should be removed during routine optimization.
-   High-write tables should balance read performance against index maintenance overhead.
-   Index creation, modification, and removal must be managed through version-controlled database migration scripts.
-   Regular index maintenance (REINDEX, VACUUM, ANALYZE, and statistics updates) should be incorporated into database operations to sustain optimal performance.

**33\. Database Performance Design**

**33.1 Query Optimization**

**Overview**

Kaziforce is designed as a high-performance, cloud-native, AI-enabled microservices platform capable of supporting millions of users, organizations, professionals, AI agents, and transactions. Query optimization is fundamental to achieving predictable low-latency performance while maintaining data consistency and scalability.

The primary objective is to minimize database I/O, reduce execution time, optimize CPU and memory utilization, and avoid unnecessary locking or contention.

**Query Optimization Principles**

The platform follows these principles:

-   Design queries to use indexes efficiently.
-   Minimize full table scans.
-   Retrieve only required columns.
-   Prefer indexed filtering over application-side filtering.
-   Push computation to the database only when efficient.
-   Avoid unnecessary joins across large tables.
-   Optimize pagination for large datasets.
-   Use asynchronous processing for expensive reporting queries.
-   Separate OLTP from OLAP workloads.
-   Cache frequently accessed data.

**Recommended Query Patterns**

**Primary Key Lookup**

SELECT \*

FROM users

WHERE user\_id = :user\_id;

**Composite Index Lookup**

SELECT job\_id, title, location

FROM jobs

WHERE organization\_id = :organization\_id

AND job\_status = 'ACTIVE'

ORDER BY created\_at DESC

LIMIT 20;

**Keyset Pagination (Preferred)**

SELECT \*

FROM messages

WHERE conversation\_id = :conversation\_id

AND created\_at < :cursor

ORDER BY created\_at DESC

LIMIT 50;

**Anti-Patterns**

Avoid:

-   SELECT \* in production APIs.
-   Unbounded result sets.
-   Functions on indexed columns in WHERE clauses.
-   Cartesian joins.
-   N+1 query patterns.
-   Multiple sequential queries that can be consolidated.
-   Excessive JSON parsing inside transactional queries.
-   Sorting without indexes.
-   OFFSET pagination on very large tables.

**Query Optimization Checklist**

Every production query should be evaluated for:

-   Index usage
-   Estimated cost
-   Rows scanned
-   Join strategy
-   Memory consumption
-   Execution time
-   Locking behavior
-   Parallel execution eligibility

**33.2 Execution Plans**

**Overview**

Execution plans describe how the database executes SQL statements. Every critical query must be analyzed before production deployment.

Kaziforce uses PostgreSQL EXPLAIN and EXPLAIN ANALYZE during development, testing, and production performance tuning.

**Example**

EXPLAIN ANALYZE

SELECT \*

FROM contracts

WHERE organization\_id = :organization\_id

AND contract\_status = 'ACTIVE';

**Execution Plan Review Checklist**

Review:

-   Sequential scans
-   Index scans
-   Bitmap index scans
-   Nested loop joins
-   Merge joins
-   Hash joins
-   Parallel execution
-   Sort operations
-   Aggregate operations

**Preferred Scan Types**

**Scan Type**

**Recommendation**

Index Scan

Preferred

Bitmap Index Scan

Acceptable

Parallel Index Scan

Preferred for large datasets

Sequential Scan

Only for small tables or unavoidable workloads

**Plan Monitoring**

The platform should monitor:

-   Slow query frequency
-   Execution time trends
-   Plan regressions
-   Buffer cache hit ratios
-   Temporary file usage
-   Parallel worker utilization

**33.3 Materialized Views**

**Overview**

Materialized Views store precomputed query results to accelerate reporting, dashboards, analytics, and AI workloads.

They reduce repeated aggregation over large transactional datasets.

**Suitable Use Cases**

-   Executive dashboards
-   Marketplace KPIs
-   Financial summaries
-   Workforce utilization
-   Daily activity reports
-   AI model metrics
-   Revenue analytics
-   Subscription analytics
-   Learning progress summaries

**Example**

CREATE MATERIALIZED VIEW mv\_daily\_job\_statistics AS

SELECT

organization\_id,

DATE(created\_at) AS report\_date,

COUNT(\*) AS jobs\_created

FROM jobs

GROUP BY

organization\_id,

DATE(created\_at);

**Refresh Strategy**

Recommended refresh frequencies:

**View Type**

**Refresh**

Executive dashboards

Every 15 minutes

Marketplace analytics

Every 5 minutes

Financial reporting

Hourly

AI metrics

Hourly

Learning metrics

Daily

Historical reporting

Nightly

**Design Guidelines**

-   Materialized views should be read-only.
-   Refresh asynchronously.
-   Partition large materialized views.
-   Maintain indexes on frequently filtered columns.
-   Track refresh status and duration.

**33.4 Read Models**

**Overview**

Kaziforce implements the Command Query Responsibility Segregation (CQRS) pattern.

Transactional write models are separated from optimized read models.

Read models are denormalized representations built specifically for querying.

**Benefits**

-   Faster API responses
-   Simplified queries
-   Reduced joins
-   Independent scaling
-   Better caching
-   Improved search integration

**Example Read Models**

**Read Model**

**Purpose**

User Dashboard

Dashboard summary

Professional Profile

Public profile

Organization Dashboard

Organization overview

Job Listing

Marketplace listing

Candidate Summary

Recruitment

Conversation List

Messaging

Notification Feed

Notifications

Workforce Dashboard

Workforce management

Executive Dashboard

Executive analytics

**Population Strategy**

Read models are populated through:

-   Kafka event consumers
-   Change Data Capture (CDC)
-   Domain events
-   Scheduled rebuilds
-   Snapshot synchronization

**Read Model Characteristics**

-   Read-only
-   Eventually consistent
-   Independently versioned
-   Optimized for specific use cases
-   Easily rebuildable

**33.5 Denormalization Strategy**

**Overview**

Denormalization improves query performance by reducing expensive joins while maintaining acceptable storage overhead.

Transactional consistency remains the responsibility of the owning service.

**Appropriate Denormalization**

Examples include:

-   User full name
-   Organization name
-   Job title
-   Candidate summary
-   Contract summary
-   Wallet balance snapshot
-   AI recommendation summary
-   Profile completion percentage
-   Current subscription tier
-   Active workforce count

**Event-Driven Synchronization**

Updates propagate using domain events.

Example:

OrganizationUpdated

↓

Kafka

↓

Job Service

↓

Read Model Updated

**Design Principles**

Denormalize:

-   Frequently displayed data
-   Frequently joined data
-   Dashboard summaries
-   Search indexes
-   Analytics summaries

Avoid denormalizing:

-   Financial source-of-truth records
-   Audit records
-   Compliance records
-   Ledger entries

**33.6 Connection Pooling**

**Overview**

Connection pooling reduces connection overhead and improves throughput.

Kaziforce uses PgBouncer (or equivalent) in front of PostgreSQL.

**Architecture**

Application

↓

PgBouncer

↓

PostgreSQL Cluster

**Recommended Configuration**

**Parameter**

**Recommended Value**

Pool Mode

Transaction

Maximum Client Connections

5,000+

Default Pool Size

50–200 per service

Reserve Pool

Enabled

Idle Timeout

300 seconds

Server Lifetime

1 hour

Actual values should be tuned based on deployment size, workload characteristics, available CPU and memory, and observed connection patterns.

**Best Practices**

-   Keep transactions short.
-   Avoid idle transactions.
-   Use prepared statements where appropriate.
-   Release connections immediately after use.
-   Monitor pool exhaustion.
-   Separate read and write pools when using read replicas.

**Monitoring Metrics**

Track:

-   Active connections
-   Idle connections
-   Pool utilization
-   Connection wait time
-   Connection failures
-   Transaction duration
-   Pool saturation

**33.7 Database Benchmark Targets**

**Overview**

Performance targets establish measurable objectives for scalability, reliability, and responsiveness across the Kaziforce platform.

These targets should be validated during performance testing and reviewed periodically as the platform evolves.

**Transaction Performance Targets**

**Metric**

**Target**

Simple primary key lookup

≤ 10 ms (P95)

Indexed transactional query

≤ 30 ms (P95)

Complex transactional query

≤ 100 ms (P95)

Read model query

≤ 50 ms (P95)

Search query (OpenSearch)

≤ 200 ms (P95)

Vector similarity search

≤ 300 ms (P95)

Dashboard query

≤ 2 seconds (P95)

Materialized view refresh

Configured SLA by workload

**Database Capacity Targets**

**Metric**

**Target**

Concurrent database connections

5,000+ (through pooling)

Transactions per second (OLTP)

Horizontally scalable by service

Kafka event ingestion

Millions of events per day

ClickHouse analytical rows

Billions of records

Vector embeddings

Tens of millions of vectors

Object storage capacity

Petabyte-scale capable

**Availability Targets**

**Metric**

**Target**

Database availability

99.95% or higher

Read replica failover

Automated

Backup success

100% scheduled execution

Recovery Point Objective (RPO)

≤ 15 minutes

Recovery Time Objective (RTO)

≤ 1 hour

**Monitoring KPIs**

The following metrics should be continuously monitored:

-   Query latency (P50, P95, P99)
-   Transactions per second
-   Slow query count
-   Buffer cache hit ratio
-   Lock contention
-   Deadlocks
-   Replication lag
-   Connection pool utilization
-   CPU utilization
-   Memory utilization
-   Disk I/O
-   Storage growth
-   Index usage
-   Vacuum and autovacuum health
-   Materialized view refresh duration
-   Read model synchronization lag

**Performance Governance**

To maintain long-term performance, Kaziforce shall adopt the following governance practices:

-   Benchmark all critical workloads before production releases.
-   Continuously profile slow queries and optimize execution plans.
-   Review indexes regularly and remove redundant or unused indexes.
-   Separate transactional, analytical, search, and AI workloads onto appropriate data stores.
-   Use automated performance regression testing within the CI/CD pipeline.
-   Capacity planning should be reviewed quarterly or after significant growth milestones.
-   All performance optimizations must preserve correctness, data integrity, security, and multi-tenant isolation.

**34\. Partitioning & Sharding**

**34.1 Horizontal Partitioning**

**Overview**

Horizontal Partitioning (also known as table partitioning) divides a logical table into multiple physical partitions, where each partition contains a subset of rows with the same schema. This strategy improves query performance, maintenance operations, backup efficiency, and scalability for large datasets.

Kaziforce uses horizontal partitioning extensively for high-volume transactional and analytical tables.

**Objectives**

-   Improve query performance
-   Reduce index size
-   Accelerate maintenance operations
-   Enable efficient archival
-   Support large-scale multi-tenant workloads
-   Improve backup and recovery times

**Suitable Tables**

**Domain**

**Tables**

Messaging

messages, attachments, read\_receipts

Notifications

notifications, notification\_logs

Finance

ledger\_entries, financial\_transactions

Audit

audit\_events, security\_events

Analytics

fact tables, raw\_events

AI

inference\_logs, memory\_events

Workforce

time\_entries, activity\_logs

**PostgreSQL Example**

CREATE TABLE audit\_events (

audit\_event\_id UUID,

tenant\_id UUID,

occurred\_at TIMESTAMPTZ

)

PARTITION BY RANGE (occurred\_at);

**Benefits**

-   Faster scans
-   Smaller indexes
-   Partition pruning
-   Parallel query execution
-   Efficient archival
-   Reduced VACUUM overhead

**Design Guidelines**

-   Use partition pruning whenever possible.
-   Keep partition sizes balanced.
-   Avoid excessive numbers of very small partitions.
-   Automate partition creation and retirement.

**34.2 Vertical Partitioning**

**Overview**

Vertical Partitioning separates frequently accessed columns from infrequently accessed or large columns into different tables while preserving one-to-one relationships.

This minimizes row width and reduces unnecessary disk I/O.

**Objectives**

-   Reduce table size
-   Improve cache utilization
-   Improve OLTP performance
-   Separate frequently updated data
-   Isolate large objects

**Example**

Instead of:

professional\_profiles

profile\_id

name

headline

summary

resume

portfolio

ai\_summary

metadata

Separate into:

professional\_profiles

profile\_id

name

headline

summary

profile\_documents

profile\_id

resume

portfolio

profile\_ai

profile\_id

embedding

ai\_summary

**Recommended Domains**

-   Professional profiles
-   Knowledge articles
-   Contracts
-   Messages with large attachments
-   Learning content
-   AI-generated content
-   CRM notes

**Design Guidelines**

-   Keep hot columns together.
-   Move large JSON documents into companion tables when appropriate.
-   Store binary files in Object Storage rather than relational tables.
-   Use lazy loading for infrequently accessed partitions.

**34.3 Time-Based Partitioning**

**Overview**

Time-Based Partitioning organizes records by time periods such as day, month, quarter, or year.

This is the primary partitioning strategy for append-only and event-driven workloads.

**Recommended Time Dimensions**

-   Day
-   Month
-   Quarter
-   Year

**Recommended Tables**

**Table**

**Partition**

audit\_events

Monthly

ledger\_entries

Monthly

notifications

Monthly

messages

Monthly

analytics\_events

Monthly

ai\_logs

Monthly

support\_logs

Monthly

login\_history

Monthly

**PostgreSQL Example**

PARTITION BY RANGE (created\_at)

Monthly partitions:

audit\_events\_2026\_01

audit\_events\_2026\_02

audit\_events\_2026\_03

**Benefits**

-   Faster historical queries
-   Efficient deletion
-   Simplified archival
-   Better index locality
-   Reduced maintenance time

**Retention Strategy**

**Data**

**Hot**

**Warm**

**Cold**

Audit

12 months

5 years

Archive

Finance

24 months

7+ years

Archive

Messaging

Configurable

Archive

Delete

Analytics

12 months

Data Lake

Archive

**34.4 Hash Partitioning**

**Overview**

Hash Partitioning distributes rows evenly across partitions using a hash function applied to one or more columns.

This approach minimizes data skew and balances write workloads.

**Suitable Partition Keys**

-   tenant\_id
-   organization\_id
-   user\_id
-   wallet\_id
-   conversation\_id

**PostgreSQL Example**

PARTITION BY HASH (tenant\_id);

Partitions:

tenant\_partition\_0

tenant\_partition\_1

tenant\_partition\_2

tenant\_partition\_3

**Recommended Use Cases**

-   Large SaaS deployments
-   Multi-tenant tables
-   User activity
-   Wallets
-   Notifications
-   Messaging
-   AI requests

**Benefits**

-   Balanced storage
-   Balanced writes
-   Better concurrency
-   Reduced hotspotting

**34.5 Geo Partitioning**

**Overview**

Geo Partitioning distributes data according to geographic regions to improve latency, satisfy data residency requirements, and support global deployments.

Kaziforce supports region-aware deployments for multinational organizations and regulatory compliance.

**Example Regions**

Africa

Europe

North America

Asia-Pacific

Middle East

South America

**Regional Deployment Model**

Global DNS

↓

Regional Load Balancer

↓

Regional Database Cluster

↓

Regional Storage

↓

Regional Cache

**Partition Key**

region\_code

or

country\_code

**Suitable Domains**

-   Organizations
-   Users
-   Workforce
-   CRM
-   Learning
-   Messaging
-   Analytics
-   AI inference
-   Object storage

**Regulatory Support**

Geo partitioning enables compliance with:

-   GDPR
-   Kenya Data Protection Act
-   Nigeria Data Protection Act
-   South Africa POPIA
-   UK GDPR
-   Other country-specific residency requirements

**Design Guidelines**

-   Keep sensitive personal data within the required jurisdiction.
-   Replicate only approved metadata across regions.
-   Use regional encryption keys.
-   Support disaster recovery across paired regions where legally permissible.

**34.6 Sharding Strategy**

**Overview**

Sharding distributes data across multiple independent database instances (shards), allowing Kaziforce to scale horizontally beyond the limits of a single database server.

Unlike partitioning, each shard is a separate database that owns a subset of the overall dataset.

**Sharding Objectives**

-   Support billions of records
-   Increase write throughput
-   Reduce database contention
-   Improve geographic scalability
-   Support enterprise-scale tenants
-   Enable independent scaling

**Shard Types**

**Shard Type**

**Description**

Tenant Shard

Data distributed by tenant

Organization Shard

Large organizations isolated to dedicated shards

Geographic Shard

Region-based distribution

Service Shard

Separate databases per microservice

Hybrid Shard

Combination of tenant and geographic sharding

**Recommended Shard Keys**

Priority order:

1.  tenant\_id
2.  organization\_id
3.  user\_id
4.  conversation\_id
5.  wallet\_id

**Sharding Architecture**

Application Layer

│

▼

Shard Router

│

┌──────┼──────┐

▼ ▼ ▼

Shard 1 Shard 2 Shard 3

(PostgreSQL Clusters)

**Shard Routing**

Routing decisions should be deterministic and based on the shard key. A centralized shard map or routing service should resolve the destination shard before database access.

Example routing strategy:

tenant\_id

│

Hash Function

│

Shard Number

│

Target Database Cluster

**Cross-Shard Operations**

Cross-shard joins should be avoided.

Instead, Kaziforce uses:

-   Event-driven synchronization
-   API composition
-   CQRS read models
-   Analytics pipelines
-   Distributed workflow orchestration (Saga pattern)

**Rebalancing Strategy**

As shards grow, data may need to be redistributed.

Recommended approaches:

-   Consistent hashing
-   Online shard migration
-   Background data copy with change capture
-   Incremental cutover
-   Zero-downtime shard reassignment

**High-Availability per Shard**

Each shard should include:

-   Primary database node
-   One or more synchronous replicas
-   One or more asynchronous read replicas
-   Automated failover
-   Continuous backups
-   Point-in-time recovery

**Monitoring Metrics**

Each shard should expose:

-   Storage utilization
-   CPU utilization
-   Memory utilization
-   Transactions per second
-   Query latency
-   Replication lag
-   Connection count
-   Lock contention
-   Deadlocks
-   Cache hit ratio

**Partitioning vs. Sharding**

**Characteristic**

**Partitioning**

**Sharding**

Scope

Single database

Multiple databases

Management

Database engine

Application and infrastructure

Cross-partition joins

Supported

Generally avoided

Scalability

Limited by one database server

Horizontal across many servers

Failover

Database cluster

Per-shard cluster

Typical Use

Large tables

Internet-scale deployments

**Design Principles**

Kaziforce adopts the following hierarchy:

1.  **Normalize** transactional data within each microservice.
2.  **Partition** large tables based on time, tenant, or hash keys.
3.  **Scale vertically** where practical.
4.  **Introduce read replicas** for read-heavy workloads.
5.  **Shard** only when partitioning and replication no longer meet scalability requirements.
6.  **Use event-driven architecture** and CQRS to minimize cross-shard dependencies.
7.  **Maintain tenant isolation** and data residency requirements throughout the sharding strategy.

This layered approach enables Kaziforce to support enterprise deployments, national workforce platforms, and global multi-region SaaS environments while maintaining high availability, predictable performance, and operational simplicity.

**35\. Replication & High Availability**

**35.1 Replication Models**

**Overview**

Kaziforce is designed as a mission-critical, cloud-native platform that requires continuous availability, fault tolerance, and data durability across all microservices. Replication ensures that data remains available even when individual servers, storage devices, or entire availability zones fail.

Different database technologies within Kaziforce use replication models optimized for their workloads.

**Replication Objectives**

-   Eliminate single points of failure
-   Maintain high availability
-   Improve read scalability
-   Support zero or near-zero data loss
-   Enable rapid disaster recovery
-   Support global deployments
-   Protect against hardware failures
-   Support maintenance without downtime

**Database Replication Matrix**

**Database**

**Replication Model**

**Primary Use**

PostgreSQL

Streaming Replication

Transactional workloads

MongoDB

Replica Sets

Document storage

Redis

Redis Sentinel / Redis Cluster

Cache and session data

ClickHouse

Replicated MergeTree

Analytics

OpenSearch

Replica Shards

Search

Neo4j

Causal Cluster

Graph workloads

Vector Database

Multi-node replication

AI similarity search

Object Storage

Cross-region replication

Files and backups

**PostgreSQL Replication**

Kaziforce uses PostgreSQL physical streaming replication.

Primary

│

┌──────────────┼──────────────┐

▼ ▼ ▼

Read Replica 1 Read Replica 2 Standby Replica

Characteristics:

-   WAL-based replication
-   Continuous synchronization
-   Automatic replica recovery
-   Point-in-time recovery support
-   Read scaling

**MongoDB Replica Sets**

Primary

/ \\

Secondary Secondary

Characteristics:

-   Automatic leader election
-   Majority write concern
-   Automatic failover
-   Replica reads

**Redis Replication**

Redis uses:

-   Redis Sentinel for HA
-   Redis Cluster for horizontal scaling

Capabilities:

-   Automatic failover
-   Replica promotion
-   Distributed cache
-   Session replication

**ClickHouse Replication**

Analytics clusters use:

-   ReplicatedMergeTree
-   Distributed tables
-   Multiple replicas per shard

Benefits:

-   Fault tolerance
-   High-speed analytical queries
-   Large-scale data processing

**Design Principles**

-   Every production database must have at least one replica.
-   Replication must be continuously monitored.
-   Replication lag must remain within defined service level objectives.
-   Replicas should be distributed across multiple availability zones.

**35.2 Multi-Region Deployment**

**Overview**

Kaziforce supports global deployments across multiple cloud regions to reduce latency, improve resilience, and satisfy data residency regulations.

**Multi-Region Architecture**

Global DNS

│

┌──────────────┼──────────────┐

▼ ▼ ▼

Africa Region Europe Region US Region

│ │ │

Application Application Application

│ │ │

Database Database Database

Cluster Cluster Cluster

**Regional Components**

Each region contains:

-   API Gateway
-   Kubernetes Cluster
-   PostgreSQL Cluster
-   Redis Cluster
-   Kafka Brokers
-   OpenSearch Cluster
-   ClickHouse Cluster
-   Object Storage
-   Monitoring Stack

**Data Residency**

Sensitive information remains within the appropriate legal jurisdiction.

Examples:

**Region**

**Residency**

Kenya

Kenya Data Protection Act

European Union

GDPR

United Kingdom

UK GDPR

South Africa

POPIA

Nigeria

NDPA

**Cross-Region Replication**

Data categories are replicated differently:

**Data**

**Replication Strategy**

Identity metadata

Multi-region

Financial ledger

Controlled replication

AI models

Global replication

Analytics

Aggregated replication

Object storage

Cross-region copy

Audit logs

Regional with backup copy

**Design Guidelines**

-   Deploy active workloads close to users.
-   Respect data sovereignty requirements.
-   Replicate only approved datasets across borders.
-   Encrypt all replicated data in transit and at rest.

**35.3 Failover Strategy**

**Overview**

Failover ensures uninterrupted service when infrastructure failures occur.

Kaziforce supports automated failover at the database, cache, messaging, and application layers.

**Database Failover**

PostgreSQL failover process:

Primary Failure

↓

Health Check

↓

Replica Promotion

↓

DNS / Proxy Update

↓

Application Reconnect

**Automatic Failover Components**

-   Patroni
-   etcd / Consul
-   PgBouncer
-   HAProxy
-   Cloud load balancers
-   Kubernetes Operators

**Redis Failover**

Redis Sentinel performs:

-   Failure detection
-   Leader election
-   Replica promotion
-   Client redirection

**MongoDB Failover**

Replica Set election:

Primary Lost

↓

Election

↓

New Primary

↓

Applications Continue

**Kafka Failover**

Kafka provides:

-   Broker redundancy
-   Partition replication
-   Leader election
-   Consumer rebalancing

**Failover Objectives**

**Objective**

**Target**

Database failover

≤ 60 seconds

Cache failover

≤ 30 seconds

Kafka broker recovery

Automatic

Application reconnect

Automatic

No manual intervention

Preferred

**Design Principles**

-   Failover must be automatic whenever possible.
-   Applications must retry transient failures using exponential backoff.
-   Stateful services should preserve data consistency during failover.
-   Health checks should detect failures quickly while avoiding false positives.

**35.4 Read Replicas**

**Overview**

Read Replicas improve scalability by offloading read-heavy workloads from primary databases.

Writes always occur on the primary database.

Reads are distributed across replicas.

**Read Architecture**

Primary

│

┌─────────┴─────────┐

▼ ▼

Read Replica 1 Read Replica 2

**Workloads**

Suitable for:

-   Dashboards
-   Reporting
-   Search synchronization
-   Read models
-   Analytics exports
-   Administrative queries
-   Historical lookups

Not suitable for:

-   Financial transactions
-   Authentication writes
-   Ledger posting
-   Payment confirmation
-   Workflow state transitions

**Read Routing**

Application routing:

Write

↓

Primary

Read

↓

Replica Pool

**Replica Consistency**

Kaziforce uses eventual consistency for replica reads.

Critical operations requiring immediate consistency should read from the primary.

**Monitoring**

Track:

-   Replication lag
-   Replica availability
-   Query latency
-   Replica CPU
-   Replica memory
-   Network throughput

**Design Guidelines**

-   Use read replicas for heavy reporting.
-   Avoid long-running queries on the primary.
-   Direct transactional reads requiring immediate consistency to the primary.
-   Continuously monitor replica lag and automatically reroute traffic if thresholds are exceeded.

**35.5 Disaster Recovery**

**Overview**

Disaster Recovery (DR) ensures Kaziforce can recover from catastrophic failures such as data corruption, regional outages, cyberattacks, cloud failures, or accidental deletion.

The DR strategy combines backups, replication, infrastructure automation, and recovery testing.

**Disaster Recovery Objectives**

**Metric**

**Target**

Recovery Point Objective (RPO)

≤ 15 minutes

Recovery Time Objective (RTO)

≤ 1 hour

Backup Success Rate

100% scheduled execution

Backup Verification

Automated

Recovery Testing

Quarterly minimum

**Backup Strategy**

**PostgreSQL**

-   Continuous WAL archiving
-   Daily full backups
-   Incremental backups
-   Point-in-time recovery (PITR)

**MongoDB**

-   Snapshot backups
-   Oplog replay
-   Continuous backup

**Redis**

-   RDB snapshots
-   AOF persistence
-   Replica synchronization

**ClickHouse**

-   Incremental backups
-   Replicated storage
-   Object Storage snapshots

**Object Storage**

-   Versioning
-   Cross-region replication
-   Object Lock / WORM where supported
-   Lifecycle management

**Disaster Recovery Architecture**

Primary Region

│

Continuous Replication

│

▼

Disaster Recovery Region

│

Warm Standby Cluster

│

Infrastructure as Code

**Recovery Process**

1.  Detect outage.
2.  Assess scope and impact.
3.  Promote disaster recovery infrastructure.
4.  Restore the latest verified backups if required.
5.  Replay transaction logs to the target recovery point.
6.  Validate database integrity and service health.
7.  Redirect application traffic.
8.  Resume normal operations.
9.  Conduct post-incident review and reconciliation.

**Backup Retention Policy**

**Backup Type**

**Recommended Retention**

Daily

30 days

Weekly

12 weeks

Monthly

12 months

Annual

7 years or applicable regulatory requirement

Financial & Compliance Archives

According to legal and regulatory obligations

**Recovery Validation**

Recovery exercises should verify:

-   Database consistency
-   Referential integrity
-   Ledger balancing
-   Application functionality
-   Authentication services
-   API availability
-   Event processing
-   Search indexes
-   Analytics pipelines
-   AI services
-   Monitoring and alerting

**Disaster Recovery Testing**

Kaziforce should perform regular recovery exercises, including:

-   Point-in-time recovery tests
-   Full regional failover simulations
-   Backup restoration verification
-   Database corruption recovery
-   Ransomware recovery scenarios
-   Network isolation testing
-   Cross-region failover validation
-   Object storage recovery
-   Kubernetes cluster restoration
-   Complete platform recovery drills

**High Availability Governance**

The following governance principles apply across all production environments:

-   Every production database must operate in a highly available cluster with automatic failover.
-   Critical services must span multiple availability zones, with multi-region deployment where business or regulatory requirements justify it.
-   Replication health, backup status, recovery readiness, and failover capability must be continuously monitored.
-   Backup and recovery procedures must be automated, version-controlled, documented, and regularly tested.
-   Recovery procedures must preserve transactional integrity, financial consistency, audit trails, and tenant isolation.
-   Changes to replication, backup, or disaster recovery configurations must follow formal change management and architecture review processes.

**36\. Caching Strategy**

**36.1 Redis Architecture**

**Overview**

Kaziforce uses Redis as the primary distributed in-memory data platform to improve application performance, reduce database load, support real-time features, and enable horizontally scalable microservices.

Redis is **never** the system of record for transactional or financial data. Instead, it serves as a high-performance caching, session, messaging, and coordination layer.

**Objectives**

The Redis architecture is designed to:

-   Reduce database latency
-   Improve API response times
-   Support real-time workloads
-   Minimize repeated database queries
-   Store ephemeral application state
-   Coordinate distributed services
-   Enable scalable rate limiting
-   Support distributed locking
-   Cache AI inference results
-   Accelerate authorization and permission checks

**High-Level Architecture**

API Gateway

│

▼

Application Services

│

┌──────────┴──────────┐

▼ ▼

Redis Cluster PostgreSQL

│ │

▼ ▼

Cached Data Source of Truth

**Redis Cluster Topology**

Redis Sentinel

│

┌─────────────┼─────────────┐

▼ ▼ ▼

Master 1 Master 2 Master 3

│ │ │

Replica 1 Replica 2 Replica 3

For very large deployments, Redis Cluster mode should be used with automatic sharding across multiple master nodes.

**Redis Usage Matrix**

**Use Case**

**Redis Structure**

User sessions

Hash

JWT blacklist

Set

OTP codes

String

API rate limiting

String / Counter

User profiles

Hash

Authorization cache

Hash

Feature flags

Hash

Notification queue

Stream / List

Presence

Set

Typing indicators

String

AI inference cache

Hash

Search result cache

Hash

Leaderboards

Sorted Set

Job queues

Stream

Distributed locks

String

Idempotency keys

String

**Redis Data Structures**

**Structure**

**Typical Usage**

String

Tokens, counters, locks

Hash

User objects, configuration

List

Lightweight queues

Set

Membership checks

Sorted Set

Rankings, scheduling

Stream

Event processing

Bitmap

Feature usage tracking

HyperLogLog

Approximate cardinality

**Design Principles**

-   Redis stores transient, reproducible, or derivable data.
-   Financial balances, ledger entries, and compliance records must not rely on Redis as the source of truth.
-   Redis should be deployed as a highly available cluster with automatic failover.
-   Cache population should be automated and event-driven where practical.

**36.2 Cache Keys**

**Overview**

Consistent cache key naming improves maintainability, avoids collisions, and supports predictable cache invalidation.

**Naming Convention**

{environment}:{service}:{entity}:{identifier}

Example:

prod:profile:user:6c2d...

**Recommended Key Patterns**

**User Profile**

profile:user:{user\_id}

**Professional Profile**

profile:professional:{profile\_id}

**Organization**

organization:{organization\_id}

**User Permissions**

permissions:{user\_id}

**Active Session**

session:{session\_id}

**OAuth Token**

oauth:{access\_token}

**API Rate Limit**

rate\_limit:{tenant\_id}:{user\_id}:{endpoint}

**Wallet Snapshot**

wallet:{wallet\_id}

**Subscription Status**

subscription:{subscription\_id}

**AI Embedding Cache**

embedding:{entity\_type}:{entity\_id}

**AI Response Cache**

ai\_response:{hash}

**Search Results**

search:{tenant\_id}:{query\_hash}

**Notification Preferences**

notification\_preferences:{user\_id}

**Conversation**

conversation:{conversation\_id}

**User Presence**

presence:{user\_id}

**Feature Flags**

feature\_flags:{tenant\_id}

**Key Design Rules**

-   Prefix keys by domain or service.
-   Include tenant identifiers where applicable.
-   Avoid personally identifiable information in key names.
-   Keep keys short but descriptive.
-   Use deterministic key generation for identical requests.

**36.3 TTL Policies**

**Overview**

Time-to-Live (TTL) policies control how long cached data remains valid before automatic expiration.

TTL values should balance freshness, consistency, and database load.

**Recommended TTL Matrix**

**Cached Data**

**Recommended TTL**

OTP codes

5 minutes

Login sessions

Session lifetime

JWT blacklist

Until token expiry

Rate limit counters

1 minute

User profile

15 minutes

Organization profile

30 minutes

Permissions

15 minutes

Feature flags

10 minutes

Dashboard widgets

5 minutes

Search results

10 minutes

AI responses

30 minutes

AI embeddings

24 hours

Notification preferences

1 hour

Subscription status

10 minutes

Wallet balance snapshot

1 minute

Exchange rates

Provider refresh interval

Leaderboards

5 minutes

Presence

60–120 seconds

Typing indicators

5–10 seconds

**TTL Design Principles**

-   Frequently changing data should have shorter TTLs.
-   Stable reference data may use longer TTLs.
-   Sensitive authorization data should expire quickly.
-   Never cache revoked security credentials beyond their validity.

**Adaptive TTL**

Certain caches may adjust TTL dynamically based on:

-   Data volatility
-   Access frequency
-   System load
-   Business priority
-   AI confidence
-   Cache hit rate

**36.4 Cache Invalidation**

**Overview**

Cache invalidation ensures cached data remains consistent with the underlying source of truth.

Kaziforce primarily uses **event-driven invalidation** to maintain cache consistency across distributed services.

**Invalidation Strategies**

**Write-Through**

Database Update

│

▼

Cache Update

Suitable for:

-   User preferences
-   Organization settings
-   Configuration

**Cache-Aside (Lazy Loading)**

Cache Miss

│

▼

Database

│

▼

Cache Population

Suitable for:

-   User profiles
-   Jobs
-   Courses
-   Knowledge articles

**Write-Behind**

Cache Update

│

▼

Asynchronous Database Write

Use only where temporary inconsistency is acceptable.

Not recommended for:

-   Finance
-   Compliance
-   Identity
-   Audit

**Event-Driven Invalidation**

Profile Updated

│

▼

Kafka Event

│

▼

Cache Removed

│

▼

Next Read Reloads Cache

Preferred for:

-   User profiles
-   Organizations
-   Jobs
-   Contracts
-   Permissions
-   AI summaries

**Cache Invalidation Triggers**

Invalidate cache when:

-   Profile updated
-   Organization modified
-   Job edited
-   Contract status changes
-   Permission changes
-   Subscription changes
-   Wallet updated
-   Invoice paid
-   Knowledge article updated
-   AI model regenerated
-   Feature flags changed

**Distributed Invalidation**

All application instances receive invalidation events through Kafka or Redis Pub/Sub to ensure cluster-wide cache consistency.

**Design Principles**

-   Prefer targeted invalidation over full cache flushes.
-   Invalidate immediately after successful transaction commits.
-   Never invalidate before transactional success.
-   Ensure idempotent invalidation handlers.

**36.5 Distributed Cache**

**Overview**

Kaziforce uses a distributed Redis Cluster to provide a shared cache accessible by all application instances and microservices.

This architecture supports horizontal scaling, high availability, and consistent caching behavior across the platform.

**Distributed Cache Architecture**

API Gateway

│

┌───────────┼───────────┐

▼ ▼ ▼

App Pod 1 App Pod 2 App Pod 3

│ │ │

└───────────┼───────────┘

▼

Redis Cluster

┌───────────┼───────────┐

▼ ▼ ▼

Master 1 Master 2 Master 3

│ │ │

Replica 1 Replica 2 Replica 3

**Cluster Features**

-   Automatic sharding
-   Automatic failover
-   Replica synchronization
-   Slot-based partitioning
-   Horizontal scalability
-   High availability
-   Rolling maintenance support

**Distributed Locking**

Redis distributed locks coordinate critical operations.

Typical use cases:

-   Payment processing
-   Wallet updates
-   Subscription renewals
-   Scheduled jobs
-   AI model execution
-   Workflow orchestration

Example key:

lock:wallet:{wallet\_id}

Locks should:

-   Have short expiration times.
-   Include unique ownership tokens.
-   Be released only by the owner.
-   Support automatic timeout recovery.

**Pub/Sub and Streams**

Redis Pub/Sub is appropriate for lightweight, transient notifications such as:

-   Cache invalidation
-   Presence updates
-   Typing indicators
-   Internal service notifications

Redis Streams are suitable for:

-   Lightweight asynchronous workflows
-   Background processing
-   Retry queues
-   Small-scale event pipelines

High-volume enterprise event streaming remains the responsibility of Kafka.

**Multi-Tenant Isolation**

Cache keys must include tenant context where required.

Example:

tenant:{tenant\_id}:profile:{profile\_id}

This prevents cache collisions and enforces logical isolation between tenants.

**Monitoring Metrics**

The distributed cache should expose:

-   Cache hit ratio
-   Cache miss ratio
-   Memory utilization
-   Evictions
-   Expired keys
-   Key count
-   Command latency
-   Replication lag
-   Cluster health
-   Lock contention
-   Pub/Sub throughput
-   Stream backlog

**Performance Targets**

**Metric**

**Target**

Cache hit ratio

≥ 90% for eligible workloads

Average cache read latency

≤ 5 ms

Cache write latency

≤ 10 ms

Lock acquisition latency

≤ 20 ms

Failover recovery

≤ 30 seconds

Cache availability

≥ 99.95%

**Caching Governance**

Kaziforce adopts the following governance principles:

-   Redis is an optimization layer and must never become the sole source of business-critical data.
-   Cached data must always be reproducible from authoritative data stores.
-   Cache invalidation should be event-driven wherever possible.
-   TTL values must be reviewed periodically based on usage patterns and business requirements.
-   Distributed cache deployments must support automatic failover, encryption in transit, authentication, and role-based access controls.
-   Cache performance metrics should be continuously monitored, with automated alerts for abnormal hit rates, memory pressure, replication failures, or excessive eviction activity.
-   All cache configuration changes must be managed through infrastructure-as-code and version-controlled deployment pipelines.

**37\. Search Architecture**

**37.1 Full-Text Search**

**Overview**

Kaziforce provides enterprise-grade full-text search across structured and unstructured content, enabling users to quickly discover jobs, professionals, organizations, projects, knowledge articles, courses, messages, support tickets, and documents.

The platform adopts a hybrid search architecture:

-   **PostgreSQL Full-Text Search** for service-local transactional search
-   **OpenSearch** for enterprise-wide distributed search
-   **Event-driven indexing** for near real-time synchronization

**Search Objectives**

-   Fast keyword search
-   Multi-language support
-   Typo tolerance
-   Faceted search
-   Filtering and sorting
-   Highlighting
-   Relevance ranking
-   Security-aware search
-   Multi-tenant isolation
-   Near real-time indexing

**Search Domains**

**Domain**

**Searchable Content**

Identity

Users, roles

Organizations

Companies, departments, branches

Profiles

Skills, experience, certifications

Marketplace

Jobs, projects, contracts

Learning

Courses, lessons, assessments

Knowledge Base

Articles, FAQs, documentation

Messaging

Conversations, messages

CRM

Leads, customers, opportunities

Support

Tickets, responses

AI

Agents, prompts, generated knowledge

**PostgreSQL Full-Text Search**

Example:

CREATE INDEX idx\_jobs\_search

ON jobs

USING GIN(search\_vector);

Search query:

SELECT \*

FROM jobs

WHERE search\_vector @@ plainto\_tsquery('software engineer');

**OpenSearch Architecture**

Users

│

Search API

│

OpenSearch Cluster

│

├── Jobs Index

├── Profiles Index

├── Organizations Index

├── Knowledge Index

├── Courses Index

├── Messages Index

├── CRM Index

└── Support Index

**Search Features**

-   Phrase search
-   Prefix search
-   Wildcard search
-   Boolean search
-   Fuzzy matching
-   Synonym expansion
-   Auto-complete
-   Highlighting
-   Ranking
-   Filtering
-   Aggregations
-   Pagination

**Design Principles**

-   OpenSearch is the primary search engine.
-   PostgreSQL Full-Text Search supports localized transactional search.
-   Search indexes are updated asynchronously through Kafka events.
-   Search must enforce tenant and authorization boundaries before returning results.

**37.2 Semantic Search**

**Overview**

Semantic Search allows users to retrieve information based on meaning rather than exact keywords.

Instead of matching words, Kaziforce compares semantic embeddings generated by AI models to identify conceptually similar content.

**Use Cases**

-   Talent discovery
-   Resume matching
-   Job recommendations
-   Knowledge retrieval
-   Course recommendations
-   Project similarity
-   Customer support suggestions
-   CRM opportunity matching
-   AI memory retrieval

**Semantic Search Architecture**

User Query

│

Embedding Model

│

Query Vector

│

Vector Database

│

Nearest Neighbors

│

Metadata Filtering

│

Ranked Results

**Indexed Domains**

**Domain**

**Semantic Content**

Professional Profiles

Skills, experience, summaries

Jobs

Responsibilities, requirements

Projects

Descriptions, technologies

Courses

Learning objectives

Knowledge Base

Articles

Messages

Conversation summaries

CRM Notes

Customer interactions

AI Memory

Stored knowledge

**Benefits**

-   Better relevance
-   Natural language search
-   Cross-language retrieval
-   Context awareness
-   Improved recommendations
-   Reduced dependence on exact wording

**Design Principles**

-   Semantic search complements, rather than replaces, keyword search.
-   Embeddings should be regenerated when source content changes materially.
-   Semantic ranking should be combined with business rules such as permissions, recency, and relevance.

**37.3 Vector Search**

**Overview**

Vector Search enables high-speed similarity retrieval using dense numerical embeddings produced by large language models and other machine learning models.

Kaziforce stores embeddings in a dedicated vector database or a PostgreSQL deployment with the pgvector extension, depending on deployment requirements.

**Primary Collections**

**Collection**

**Purpose**

profile\_embeddings

Professional similarity

job\_embeddings

Job matching

resume\_embeddings

Resume similarity

knowledge\_embeddings

Knowledge retrieval

course\_embeddings

Learning recommendations

ai\_memory\_embeddings

AI memory

document\_embeddings

Enterprise documents

crm\_embeddings

Customer insights

**Vector Search Flow**

User Query

│

Embedding Model

│

Embedding Vector

│

Vector Index

│

Nearest Neighbor Search

│

Metadata Filters

│

Ranked Results

**Recommended Index Algorithms**

**Algorithm**

**Recommended Usage**

HNSW

Default production workloads

IVFFlat

Large datasets

Product Quantization (PQ)

Memory-efficient deployments

DiskANN

Billion-scale vector search

**Distance Metrics**

**Metric**

**Usage**

Cosine Similarity

Default for text embeddings

Dot Product

Transformer-based models

Euclidean Distance

Specialized numerical datasets

**Metadata Filtering**

Vector search results should support filtering by:

-   Tenant
-   Organization
-   Country
-   Industry
-   Skills
-   Availability
-   Security classification
-   Document type
-   Lifecycle status

**Design Principles**

-   Store vectors separately from transactional data.
-   Persist model name, model version, and embedding generation timestamp.
-   Support incremental re-indexing.
-   Apply identical authorization rules to vector search results as to source entities.

**37.4 AI Search**

**Overview**

AI Search combines keyword search, semantic search, vector search, retrieval-augmented generation (RAG), knowledge graphs, and large language models to deliver intelligent, context-aware search experiences.

Rather than returning only matching records, AI Search can generate synthesized answers supported by authoritative platform data.

**AI Search Pipeline**

Natural Language Query

│

Intent Detection

│

Hybrid Retrieval

┌────────┼────────┐

▼ ▼ ▼

Keyword Semantic Vector

Search Search Search

│

Knowledge Graph

│

RAG Context Builder

│

Large Language Model

│

Grounded AI Response

**AI Search Capabilities**

-   Natural language queries
-   Conversational search
-   Question answering
-   Document summarization
-   Recommendation generation
-   Context-aware retrieval
-   Multi-document synthesis
-   AI-assisted filtering
-   Explainable recommendations
-   Follow-up questioning

**Enterprise AI Search**

Enterprise deployments may search across:

-   Internal knowledge
-   Workforce records
-   HR policies
-   Contracts
-   Training materials
-   CRM history
-   Support knowledge
-   AI memory
-   Organization documentation

All results must respect tenant isolation and user permissions.

**Retrieval-Augmented Generation (RAG)**

The RAG pipeline uses:

-   OpenSearch
-   Vector database
-   Knowledge graph
-   AI Memory
-   Structured SQL data
-   Business rules
-   Access control policies

The retrieved context is supplied to the LLM, reducing hallucinations and ensuring responses are grounded in authoritative data.

**AI Ranking Signals**

Ranking may incorporate:

-   Semantic similarity
-   Keyword relevance
-   Recency
-   Popularity
-   User preferences
-   Organization context
-   AI confidence score
-   Business priority
-   Security permissions
-   Quality score

**AI Governance**

AI Search must:

-   Cite authoritative source records where applicable.
-   Respect row-level security and tenant boundaries.
-   Prevent disclosure of unauthorized information.
-   Log AI retrieval operations for audit purposes.
-   Apply content moderation and safety policies before generating responses.

**37.5 Search Index Lifecycle**

**Overview**

Search indexes require continuous synchronization with transactional databases to ensure accuracy, freshness, and performance.

Kaziforce uses an event-driven indexing pipeline to manage the complete lifecycle of search indexes.

**Index Lifecycle**

Entity Created

│

Kafka Event

│

Indexing Service

│

OpenSearch / Vector Database

│

Search Index Updated

**Lifecycle Stages**

1.  Document creation
2.  Initial indexing
3.  Incremental updates
4.  Re-indexing
5.  Optimization
6.  Archiving
7.  Deletion

**Index Synchronization**

Changes originate from domain events published by microservices.

Example:

JobUpdated

│

Kafka

│

Search Indexer

│

Jobs Index Updated

**Re-indexing Strategy**

Full re-indexing may be required when:

-   Search mappings change.
-   Ranking algorithms are updated.
-   AI embedding models change.
-   New searchable fields are introduced.
-   Synonym dictionaries are updated.
-   Schema migrations occur.

Re-indexing should be performed using index aliases to enable zero-downtime deployments.

**Index Versioning**

Recommended naming convention:

jobs\_v1

jobs\_v2

jobs\_v3

Alias:

jobs\_current

This enables seamless cutover after validation.

**Retention Policy**

**Index Type**

**Retention Strategy**

Active transactional indexes

Continuous

Historical search indexes

Configurable archival

AI embeddings

Re-generated as required

Deleted entities

Removed after retention policy

Audit search indexes

Retained according to compliance requirements

**Monitoring Metrics**

Search infrastructure should monitor:

-   Query latency
-   Index size
-   Index growth
-   Indexing throughput
-   Failed indexing operations
-   Search error rate
-   Cache hit ratio
-   Vector search latency
-   OpenSearch cluster health
-   Shard utilization
-   Replica synchronization
-   Embedding generation backlog

**Search Architecture Governance**

Kaziforce adopts the following governance principles:

-   OpenSearch serves as the primary enterprise search engine, while PostgreSQL Full-Text Search supports localized transactional search.
-   Semantic and vector search complement keyword search through a hybrid retrieval strategy.
-   All search indexes must be updated asynchronously using Kafka events to avoid impacting transactional workloads.
-   Search results must enforce row-level security, tenant isolation, and role-based access control before presentation.
-   AI-generated search responses must be grounded using Retrieval-Augmented Generation (RAG) with authoritative platform data.
-   Search indexes, embeddings, and mappings must be version-controlled and support zero-downtime re-indexing through index aliases.
-   Search performance, relevance, and freshness should be continuously monitored and optimized through analytics, A/B testing, and periodic index maintenance.

**38\. Graph Database Design**

**38.1 Node Types**

**Overview**

Kaziforce uses a **Neo4j Graph Database** to model highly connected data that is inefficient to represent using traditional relational databases. The graph database powers AI-driven recommendations, professional networking, workforce discovery, relationship analytics, organizational hierarchies, knowledge navigation, fraud detection, and skill intelligence.

The graph model complements—not replaces—the transactional databases. PostgreSQL remains the system of record, while Neo4j stores graph projections synchronized through Kafka events.

**Graph Database Objectives**

-   Model complex relationships
-   Accelerate multi-hop traversals
-   Improve AI recommendations
-   Support knowledge discovery
-   Enable social and professional networking
-   Enhance fraud detection
-   Improve workforce intelligence
-   Power graph-based analytics

**Core Node Categories**

**Category**

**Node Label**

Identity

User

Professional

ProfessionalProfile

Organization

Organization

Department

Department

Team

Team

Business Unit

BusinessUnit

Branch

Branch

Job

Job

Project

Project

Contract

Contract

Skill

Skill

Certification

Certification

License

License

Course

Course

Credential

Credential

AI Agent

AIAgent

AI Memory

Memory

Knowledge Article

KnowledgeArticle

Customer

Customer

Lead

Lead

Support Ticket

SupportTicket

Wallet

Wallet

Invoice

Invoice

Country

Country

Industry

Industry

Language

Language

Technology

Technology

**Example Node Definitions**

**User**

(:User {

user\_id,

tenant\_id,

full\_name,

email,

account\_status

})

**Professional Profile**

(:ProfessionalProfile {

profile\_id,

headline,

experience\_level,

availability\_status

})

**Organization**

(:Organization {

organization\_id,

organization\_name,

organization\_type,

industry

})

**Skill**

(:Skill {

skill\_id,

skill\_name,

category

})

**Job**

(:Job {

job\_id,

title,

employment\_type,

location

})

**Node Design Principles**

-   Each node represents a unique business entity.
-   Nodes use globally unique UUIDs.
-   Node properties contain lightweight descriptive attributes.
-   Large documents remain in PostgreSQL or Object Storage.
-   Graph nodes are synchronized through domain events.

**38.2 Relationships**

**Overview**

Relationships are the primary strength of a graph database. They represent direct business connections between entities and enable efficient traversal across multiple hops.

**Core Relationship Types**

**Relationship**

**Source**

**Target**

HAS\_PROFILE

User

ProfessionalProfile

BELONGS\_TO

ProfessionalProfile

Organization

WORKS\_FOR

User

Organization

MEMBER\_OF

User

Team

REPORTS\_TO

User

User

HAS\_SKILL

ProfessionalProfile

Skill

REQUIRES\_SKILL

Job

Skill

APPLIED\_FOR

ProfessionalProfile

Job

MATCHED\_TO

ProfessionalProfile

Job

ASSIGNED\_TO

ProfessionalProfile

Project

OWNS

Organization

Project

MANAGES

User

Project

COMPLETED

ProfessionalProfile

Course

EARNED

ProfessionalProfile

Credential

CERTIFIED\_IN

ProfessionalProfile

Certification

KNOWS

User

User

FOLLOWS

User

Organization

REFERRED

User

User

CREATED

User

KnowledgeArticle

LINKS\_TO

KnowledgeArticle

KnowledgeArticle

USES

AIAgent

KnowledgeArticle

STORES

AIAgent

Memory

SUPPORTS

KnowledgeArticle

SupportTicket

**Example Relationships**

Professional possesses skill

(:ProfessionalProfile)-\[:HAS\_SKILL\]->(:Skill)

Job requires skill

(:Job)-\[:REQUIRES\_SKILL\]->(:Skill)

Professional matched to job

(:ProfessionalProfile)-\[:MATCHED\_TO {

score:0.94

}\]->(:Job)

Employee reports to manager

(:User)-\[:REPORTS\_TO\]->(:User)

Organization owns project

(:Organization)-\[:OWNS\]->(:Project)

Knowledge links

(:KnowledgeArticle)-\[:LINKS\_TO\]->(:KnowledgeArticle)

**Relationship Properties**

Relationships may include metadata such as:

-   Match score
-   Confidence score
-   Effective date
-   Expiration date
-   Source system
-   AI model version
-   Relationship strength
-   Verification status
-   Created timestamp

**Design Principles**

-   Relationships should represent business semantics.
-   Relationship names should use uppercase verbs.
-   Avoid duplicating relationship types.
-   Prefer explicit relationship types over generic links.
-   Maintain relationship direction consistently.

**38.3 Graph Queries**

**Overview**

Kaziforce uses Cypher as the primary graph query language for Neo4j.

Graph queries enable complex traversals that would require expensive recursive joins in relational databases.

**Typical Query Categories**

-   Skill matching
-   Workforce discovery
-   Organization hierarchy
-   Social connections
-   Knowledge traversal
-   AI reasoning
-   Fraud detection
-   Recommendation generation

**Find Professionals with a Skill**

MATCH

(p:ProfessionalProfile)-\[:HAS\_SKILL\]->

(s:Skill {skill\_name:'Node.js'})

RETURN p

**Find Jobs Matching Skills**

MATCH

(p:ProfessionalProfile)-\[:HAS\_SKILL\]->

(s:Skill)

MATCH

(j:Job)-\[:REQUIRES\_SKILL\]->

(s)

RETURN p,j

**Find Organization Hierarchy**

MATCH path=

(o:Organization)-\[:OWNS\*\]->

(n)

RETURN path

**Find Professional Network**

MATCH

(u:User)-\[:KNOWS\*1..3\]->

(friend)

RETURN friend

**Find Learning Path**

MATCH

(course:Course)-\[:PREREQUISITE\_OF\*\]->

(next)

RETURN next

**Find Related Knowledge**

MATCH

(article)-\[:LINKS\_TO\]->

(related)

RETURN related

**Fraud Detection Example**

MATCH

(u1)-\[:USES\_DEVICE\]->

(d)<-\[:USES\_DEVICE\]-

(u2)

RETURN u1,u2,d

**Multi-Hop Recommendation**

MATCH

(profile)-\[:HAS\_SKILL\]->

(skill)<-\[:REQUIRES\_SKILL\]-

(job)

RETURN profile,job

ORDER BY score DESC

**Query Optimization**

Graph queries should:

-   Use indexed node properties.
-   Minimize unnecessary traversals.
-   Limit traversal depth where appropriate.
-   Filter early.
-   Use parameterized queries.
-   Profile and optimize expensive traversals.

**38.4 Recommendation Graph**

**Overview**

The Recommendation Graph is the intelligence layer of Kaziforce.

It combines graph relationships, AI embeddings, behavioral analytics, semantic similarity, and business rules to generate personalized recommendations.

**Recommendation Domains**

**Domain**

**Recommendation**

Marketplace

Jobs

Professional

Candidates

Organizations

Professionals

Learning

Courses

Knowledge

Articles

CRM

Opportunities

Support

Knowledge articles

AI

Agent actions

Networking

Professional connections

Projects

Team members

**Recommendation Architecture**

Professional

│

HAS\_SKILL

│

Skill

│

REQUIRES\_SKILL

│

Job

│

MATCH\_SCORE

│

Recommendation

**Recommendation Sources**

The recommendation engine combines:

-   Graph relationships
-   AI embeddings
-   Semantic similarity
-   Historical interactions
-   User preferences
-   Organization preferences
-   Workforce availability
-   Geographic proximity
-   Certifications
-   Performance ratings
-   Learning history
-   AI confidence scores

**Recommendation Pipeline**

User Activity

│

Kafka Events

│

Graph Projection

│

Neo4j Graph

│

Vector Search

│

Ranking Engine

│

AI Scoring

│

Recommendation API

**Example Recommendation Relationships**

Professional recommended for job

(:ProfessionalProfile)

\-\[:RECOMMENDED\_FOR {

score:0.96

}\]->

(:Job)

Recommended course

(:ProfessionalProfile)

\-\[:SHOULD\_LEARN\]->

(:Course)

Suggested connection

(:User)

\-\[:MAY\_KNOW\]->

(:User)

Knowledge recommendation

(:KnowledgeArticle)

\-\[:RELATED\_TO\]->

(:KnowledgeArticle)

**Graph Algorithms**

The Recommendation Graph supports Neo4j Graph Data Science (GDS) algorithms including:

**Algorithm**

**Primary Use**

PageRank

Influence and authority ranking

Personalized PageRank

Personalized recommendations

Louvain

Community detection

Label Propagation

Workforce clustering

Node Similarity

Professional and job similarity

K-Nearest Neighbors (KNN)

Candidate recommendations

Weakly Connected Components

Organization and network analysis

Shortest Path

Organizational reporting and dependency analysis

Betweenness Centrality

Key influencer identification

Degree Centrality

Network importance

FastRP

Graph embeddings

GraphSAGE

AI-ready node embeddings

Link Prediction

Predicting future professional, project, or organizational relationships

**Graph Synchronization**

Neo4j is synchronized using Kafka event streams from all transactional microservices.

Example workflow:

Professional Profile Updated

│

Kafka Event

│

Graph Projection Service

│

Neo4j Updated

│

Recommendation Engine Refreshed

Graph projections should be idempotent, support replay, and maintain eventual consistency with source systems.

**Security Model**

Graph queries must enforce:

-   Tenant isolation
-   Role-Based Access Control (RBAC)
-   Attribute-Based Access Control (ABAC)
-   Row-level authorization
-   AI permission filtering
-   Organization-level visibility
-   Privacy and consent rules

Unauthorized nodes and relationships must never be traversed or returned.

**Performance Optimization**

Recommended optimization techniques include:

-   Index frequently queried node properties.
-   Use relationship indexes where supported.
-   Cache frequently executed traversals.
-   Limit traversal depth for interactive queries.
-   Precompute graph projections for expensive analytics.
-   Execute graph algorithms asynchronously.
-   Combine graph traversal with vector search for hybrid recommendations.

**Graph Database Governance**

Kaziforce adopts the following governance principles:

-   Neo4j serves as the authoritative graph engine for relationship-centric workloads, while PostgreSQL remains the transactional source of truth.
-   Graph data is synchronized exclusively through event-driven pipelines using Kafka and graph projection services.
-   Nodes and relationships must be versioned, auditable, and traceable to their originating transactional entities.
-   Recommendation results should combine graph algorithms, semantic embeddings, vector similarity, and configurable business rules.
-   Graph queries must respect tenant isolation, organizational boundaries, and security policies before returning results.
-   Graph schemas, algorithms, and projections should be version-controlled and evolve independently of transactional schemas while remaining aligned with the SRS and Technical Design Document.

**39\. Analytics Database Design**

**39.1 Fact Tables**

**Overview**

Fact tables are the core of the Kaziforce analytical data model. They store measurable business events generated across all platform services and provide the foundation for dashboards, reporting, business intelligence, AI analytics, and executive decision-making.

Kaziforce uses **ClickHouse** as the primary OLAP database for analytical workloads due to its columnar storage, high compression, and exceptional performance for large-scale aggregations.

**Objectives**

The fact table design aims to:

-   Capture immutable business events
-   Support high-volume analytical queries
-   Enable real-time dashboards
-   Provide historical trend analysis
-   Support AI model training
-   Enable executive reporting
-   Scale to billions of records

**General Structure**

Each fact table contains:

-   Surrogate fact key
-   Dimension foreign keys
-   Measures
-   Event timestamp
-   Tenant identifier
-   Source service
-   Correlation identifiers

**Core Fact Tables**

**Fact Table**

**Business Event**

fact\_user\_activity

User interactions

fact\_job\_postings

Job creation and lifecycle

fact\_job\_applications

Applications submitted

fact\_candidate\_matching

AI matching events

fact\_contracts

Contract lifecycle

fact\_workforce\_assignments

Workforce allocations

fact\_time\_entries

Time tracking

fact\_financial\_transactions

Wallet and payment events

fact\_ledger\_entries

Accounting transactions

fact\_learning\_activity

Learning progress

fact\_certifications

Credential issuance

fact\_notifications

Notification delivery

fact\_messages

Messaging activity

fact\_calls

Voice and video calls

fact\_support\_tickets

Support interactions

fact\_ai\_inference

AI model executions

fact\_ai\_recommendations

Recommendation events

fact\_search

Search activity

fact\_crm\_activity

Customer interactions

fact\_subscription\_usage

Subscription consumption

fact\_audit\_events

Security and compliance events

**Common Measures**

Examples include:

-   Count
-   Duration
-   Amount
-   Cost
-   Revenue
-   Score
-   Confidence
-   Response time
-   Completion rate
-   Success rate
-   Utilization
-   Conversion rate

**Design Principles**

-   Facts are immutable.
-   Facts represent measurable business events.
-   Fact tables should remain narrow where practical.
-   Historical facts are never updated except through controlled correction processes.
-   Fact ingestion is event-driven through Kafka and CDC pipelines.

**39.2 Dimension Tables**

**Overview**

Dimension tables provide descriptive business context for analytical measures. They contain relatively stable attributes used for filtering, grouping, slicing, and drilling into fact data.

**Core Dimensions**

**Dimension**

**Description**

dim\_date

Calendar hierarchy

dim\_time

Time hierarchy

dim\_user

User attributes

dim\_professional

Professional profile

dim\_organization

Organization details

dim\_department

Department hierarchy

dim\_team

Team hierarchy

dim\_location

Geographic hierarchy

dim\_country

Country information

dim\_industry

Industry classification

dim\_skill

Skills taxonomy

dim\_job

Job attributes

dim\_project

Project details

dim\_contract

Contract metadata

dim\_course

Learning catalog

dim\_certification

Certification catalog

dim\_subscription

Subscription plans

dim\_payment\_method

Payment metadata

dim\_ai\_model

AI model information

dim\_device

Client device metadata

dim\_channel

Communication channels

**Slowly Changing Dimensions (SCD)**

Kaziforce supports:

**Type**

**Usage**

SCD Type 1

Non-historical corrections

SCD Type 2

Historical business tracking (preferred)

SCD Type 3

Limited historical comparison

**Example SCD Type 2**

Professional

Version 1

Industry = Finance

Effective: Jan–Jun

Version 2

Industry = Healthcare

Effective: Jul–Present

**Design Principles**

-   Dimensions should use surrogate keys.
-   Preserve historical context where required.
-   Normalize only when justified.
-   Share common dimensions across fact tables where appropriate.

**39.3 Star Schema**

**Overview**

The Star Schema is the primary analytical modeling approach for Kaziforce. It consists of a central fact table surrounded by denormalized dimension tables, enabling fast query execution and simplified reporting.

**Example Star Schema**

dim\_date

│

dim\_user ───────┐

│

dim\_job ────────┤

│

dim\_organization├──── fact\_job\_applications

│

dim\_location ───┤

│

dim\_skill ──────┘

**Advantages**

-   High query performance
-   Simple SQL
-   Easy BI integration
-   Optimized OLAP processing
-   Efficient aggregations

**Typical Analytical Questions**

-   Applications by industry
-   Revenue by organization
-   Hiring by location
-   Workforce utilization by department
-   AI recommendation success rate
-   Course completion by profession
-   Payment trends over time

**Design Guidelines**

-   Keep dimensions descriptive.
-   Minimize joins.
-   Use surrogate keys.
-   Store measures only in fact tables.
-   Partition fact tables by date.

**39.4 Snowflake Schema**

**Overview**

The Snowflake Schema extends the Star Schema by normalizing dimensions into additional related tables. Kaziforce uses this model selectively for large hierarchical datasets where normalization reduces redundancy without significantly impacting analytical performance.

**Example Snowflake Schema**

Country

│

Region

│

City

│

Location

│

fact\_workforce\_assignments

Another example:

Industry Sector

│

Industry

│

Organization

│

fact\_contracts

**Recommended Use Cases**

-   Geographic hierarchies
-   Industry taxonomies
-   Skills taxonomy
-   Organization hierarchy
-   Learning catalog hierarchy
-   Certification frameworks

**Advantages**

-   Reduced duplication
-   Easier hierarchy maintenance
-   Better consistency
-   Smaller dimension tables

**Trade-Offs**

-   More joins
-   Slightly slower queries
-   More complex ETL

**Design Guidelines**

Use snowflake modeling only when:

-   Hierarchies are deep.
-   Reference data changes independently.
-   Storage reduction outweighs additional query complexity.

**39.5 OLAP Design**

**Overview**

Kaziforce separates Online Analytical Processing (OLAP) from Online Transaction Processing (OLTP). Analytical workloads execute exclusively against ClickHouse and related analytical stores, preventing heavy reporting from impacting transactional microservices.

**OLAP Architecture**

Transactional Databases

(PostgreSQL, MongoDB)

│

▼

Kafka / CDC Pipeline

│

▼

Data Processing Layer

│

▼

ClickHouse Analytics

│

▼

Dashboards / BI / AI

**OLAP Features**

-   Columnar storage
-   High compression
-   Parallel execution
-   Vectorized processing
-   Distributed queries
-   Materialized aggregations
-   Approximate analytics
-   Time-series optimization

**Analytical Cubes**

Representative cubes include:

**Cube**

**Measures**

Workforce Performance

Hours, utilization, productivity

Recruitment

Applications, hires, conversions

Finance

Revenue, expenses, profit

Learning

Enrollments, completions

AI

Recommendation accuracy, inference latency

CRM

Pipeline value, conversion rate

Support

Resolution time, SLA compliance

Executive

Enterprise KPIs

**Drill Operations**

Supported analytical operations:

-   Roll-up
-   Drill-down
-   Slice
-   Dice
-   Pivot
-   Trend analysis
-   Cohort analysis
-   Time-series analysis

**Design Principles**

-   Keep analytical workloads isolated from OLTP systems.
-   Support incremental event ingestion.
-   Optimize for aggregation and scan performance.
-   Maintain historical data for long-term analysis.

**39.6 Materialized Views**

**Overview**

Materialized Views precompute expensive aggregations and joins, significantly improving dashboard responsiveness and reducing repetitive analytical computation.

Kaziforce uses both database-native materialized views and ClickHouse materialized views where appropriate.

**Primary Use Cases**

-   Executive dashboards
-   Organization KPIs
-   Marketplace statistics
-   Workforce utilization
-   Financial summaries
-   Learning progress
-   AI performance metrics
-   Subscription analytics
-   Customer support metrics

**Example**

CREATE MATERIALIZED VIEW mv\_daily\_workforce\_summary AS

SELECT

organization\_id,

toDate(work\_date) AS report\_date,

COUNT(\*) AS assignments,

SUM(hours\_worked) AS total\_hours

FROM fact\_time\_entries

GROUP BY

organization\_id,

toDate(work\_date);

**Refresh Strategies**

**View Type**

**Strategy**

ClickHouse incremental views

Automatic on ingestion

Executive dashboards

Every 15 minutes

Financial summaries

Hourly

AI metrics

Hourly

Workforce KPIs

Every 5 minutes

Historical reports

Nightly rebuild

**Optimization Techniques**

-   Partition materialized views by date.
-   Index frequently filtered dimensions.
-   Aggregate at the lowest practical reporting granularity.
-   Refresh asynchronously.
-   Monitor refresh duration and failures.

**Materialized View Lifecycle**

Source Event

│

Kafka / CDC

│

Fact Table Updated

│

Materialized View Refresh

│

Dashboard / BI Query

**Analytics Database Governance**

Kaziforce adopts the following governance principles:

-   ClickHouse is the primary analytical database and must remain isolated from transactional workloads.
-   Fact tables are immutable and populated exclusively through event-driven ingestion pipelines.
-   Dimension tables provide standardized business context and should support historical tracking through Slowly Changing Dimensions where appropriate.
-   Star Schema is the default analytical modeling approach, while Snowflake Schema is reserved for complex hierarchical reference data.
-   Materialized views must be refreshed asynchronously and optimized for high-frequency dashboards and executive reporting.
-   All analytical models, ETL pipelines, dimensions, facts, and aggregations must be version-controlled, documented, and traceable to the Software Requirements Specification (SRS) and Technical Design Document (TDD).
-   Access to analytical data must enforce tenant isolation, role-based access control, and applicable regulatory and data governance policies.

**Part V — Security & Governance**

**40\. Database Security**

**40.1 Encryption at Rest**

**Overview**

Kaziforce protects all persistent data through encryption at rest to ensure confidentiality and integrity in the event of unauthorized physical access, storage compromise, or backup exposure.

Encryption at rest applies to:

-   PostgreSQL databases
-   MongoDB databases
-   Redis persistence files
-   ClickHouse storage
-   OpenSearch indexes
-   Neo4j databases
-   Vector databases
-   Object Storage
-   Database backups
-   Transaction logs
-   Snapshots
-   Archive storage

**Encryption Standards**

**Component**

**Standard**

Database storage

AES-256

Object Storage

AES-256

Backup archives

AES-256

Snapshot storage

AES-256

File systems

Cloud provider or LUKS encryption

WAL and transaction logs

Encrypted storage

**Protected Data Categories**

Encryption applies to:

-   Personally Identifiable Information (PII)
-   Authentication credentials
-   Financial records
-   Wallet balances
-   Ledger entries
-   Contracts
-   HR records
-   Learning records
-   AI memory
-   Customer data
-   Support conversations
-   Audit records
-   Compliance evidence
-   API credentials
-   OAuth tokens
-   Certificates

**Backup Encryption**

All backups must be encrypted before storage.

Backup requirements include:

-   Encrypted full backups
-   Encrypted incremental backups
-   Encrypted object storage
-   Encrypted off-site copies
-   Encrypted disaster recovery replicas

**Design Principles**

-   Encryption is mandatory for every production environment.
-   Encryption keys must be managed separately from encrypted data.
-   Temporary storage should also use encrypted volumes.
-   Encryption must not require application changes where transparent database encryption is available.

**40.2 Encryption in Transit**

**Overview**

All communication between applications, databases, caches, messaging systems, and storage services must be encrypted in transit.

**Protected Communication Channels**

**Communication**

**Protection**

Application → PostgreSQL

TLS 1.3

Application → MongoDB

TLS 1.3

Application → Redis

TLS

Application → OpenSearch

HTTPS/TLS

Application → Neo4j

TLS

Application → ClickHouse

TLS

Kafka communication

TLS

Object Storage

HTTPS

Backup transfer

TLS

Replication traffic

TLS

Administrative access

SSH + TLS

**Mutual TLS (mTLS)**

Service-to-service communication within the Kubernetes cluster should use Mutual TLS where supported.

Benefits:

-   Service authentication
-   Certificate-based identity
-   Zero-trust networking
-   Protection against impersonation

**Certificate Management**

Certificates should be:

-   Automatically renewed
-   Short-lived where practical
-   Rotated without downtime
-   Issued by a trusted internal or external Certificate Authority (CA)

**Design Principles**

-   Plain-text database connections are prohibited.
-   Legacy TLS versions should be disabled.
-   Certificate expiry should be continuously monitored.
-   Internal traffic should be encrypted regardless of network location.

**40.3 Key Management**

**Overview**

Cryptographic keys are among the platform's most sensitive assets. Kaziforce centralizes key management using enterprise-grade Key Management Services (KMS) or Hardware Security Modules (HSMs).

**Managed Keys**

The platform manages keys for:

-   Database encryption
-   Backup encryption
-   Object storage
-   API signing
-   JWT signing
-   OAuth secrets
-   TLS certificates
-   AI service credentials
-   Payment integrations
-   File encryption
-   Digital signatures

**Key Management Architecture**

Applications

│

▼

Secrets Manager

│

▼

Key Management Service (KMS/HSM)

│

▼

Encrypted Databases

**Key Lifecycle**

1.  Generate
2.  Approve
3.  Deploy
4.  Use
5.  Rotate
6.  Archive
7.  Revoke
8.  Destroy

**Key Rotation**

**Key Type**

**Recommended Rotation**

Database master keys

Annually or per organizational policy

Application secrets

90–180 days

JWT signing keys

Configurable with overlap during rotation

TLS certificates

Before expiry

API credentials

Per provider policy

Encryption keys for backups

According to backup lifecycle policy

**Design Principles**

-   Keys must never be hardcoded.
-   Separate encryption keys by environment.
-   Production keys must be isolated from non-production environments.
-   Key usage must be fully auditable.

**40.4 Row-Level Security**

**Overview**

Row-Level Security (RLS) restricts database access so users and services can access only the records they are authorized to view or modify.

RLS is particularly important for Kaziforce's multi-tenant architecture.

**Objectives**

-   Tenant isolation
-   Organization isolation
-   Department isolation
-   Workforce privacy
-   Financial separation
-   Compliance enforcement

**Access Model**

User

│

Role

│

Tenant

│

Row-Level Policy

│

Visible Records

**Typical Policies**

**Tenant Isolation**

Users may access only rows belonging to their tenant.

tenant\_id = current\_tenant

**Organization Isolation**

Employees access only their organization's records.

organization\_id = current\_organization

**HR Records**

Only authorized HR personnel may access employee records.

**Finance**

Users may access only their own wallets and transactions unless granted elevated financial roles.

**AI Memory**

AI agents may retrieve only memory entries explicitly authorized for their execution context.

**PostgreSQL Example**

CREATE POLICY tenant\_policy

ON professional\_profiles

USING (tenant\_id = current\_setting('app.tenant\_id')::UUID);

**Design Principles**

-   Enable RLS on tenant-owned tables.
-   Enforce policies at the database layer in addition to application authorization.
-   Validate policies through automated security testing.
-   Apply least-privilege principles to service accounts.

**40.5 Column-Level Security**

**Overview**

Certain columns contain highly sensitive information that requires stricter protection than the rest of the record.

Column-Level Security restricts access to individual fields based on user role, permissions, or business function.

**Sensitive Columns**

Examples include:

-   National ID numbers
-   Passport numbers
-   Tax identifiers
-   Salary
-   Bank account numbers
-   Mobile payment identifiers
-   Email addresses
-   Phone numbers
-   Date of birth
-   Medical accommodation data (where applicable)
-   Authentication secrets
-   API credentials
-   OAuth tokens

**Example Access Matrix**

**Column**

**HR**

**Finance**

**Manager**

**Employee**

Salary

✓

✓

Limited

No

Bank Account

No

✓

No

Own only

Tax ID

Limited

✓

No

Own only

Personal Email

Limited

No

No

Own only

**Implementation Options**

-   Database views
-   Security-definer functions
-   Role-based column grants
-   Attribute-based access control (ABAC)
-   Application-layer projection

**Design Principles**

-   Restrict sensitive columns to authorized roles.
-   Avoid returning confidential fields by default.
-   Audit all privileged column access.

**40.6 Dynamic Data Masking**

**Overview**

Dynamic Data Masking (DDM) protects sensitive information by presenting masked values to users who do not require full visibility.

The underlying stored data remains unchanged.

**Typical Masking Examples**

**Original**

**Masked**

[john.doe@example.com](mailto:john.doe@example.com)

j\*\*\*@example.com

+254712345678

+2547\*\*\*\*\*78

1234567890123456

\*\*\*\* \*\*\*\* \*\*\*\* 3456

National ID

\*\*\*\*\*\*123

Salary

Hidden or range only

**Masking Rules**

Masking may be applied based on:

-   User role
-   Department
-   Tenant
-   Business function
-   Geographic region
-   Regulatory requirements

**Typical Use Cases**

-   Customer support
-   Help desk
-   Sales teams
-   Reporting dashboards
-   Demonstration environments
-   Training environments

**Design Principles**

-   Sensitive values remain encrypted at rest.
-   Masking should occur dynamically during retrieval.
-   Privileged administrators should require explicit authorization to view unmasked data.
-   Masking policies should be centrally managed and consistently enforced.

**40.7 Secrets Management**

**Overview**

Kaziforce stores sensitive configuration values in a centralized Secrets Management solution rather than in source code, configuration files, or container images.

**Managed Secrets**

-   Database passwords
-   API keys
-   OAuth client secrets
-   JWT signing secrets
-   Payment gateway credentials
-   SMTP credentials
-   AI provider credentials
-   Cloud storage credentials
-   Kubernetes secrets
-   Kafka credentials
-   Redis authentication
-   TLS private keys

**Secrets Architecture**

Application

│

▼

Secrets Manager

│

▼

Runtime Injection

**Secret Lifecycle**

1.  Generate
2.  Store securely
3.  Grant access
4.  Rotate
5.  Revoke
6.  Audit
7.  Delete

**Best Practices**

-   Never store secrets in Git repositories.
-   Rotate secrets regularly.
-   Grant secrets only to authorized workloads.
-   Use short-lived credentials where possible.
-   Log secret access events without exposing secret values.

**Design Principles**

-   Secrets must be centrally managed.
-   Access should follow least-privilege principles.
-   Secret retrieval should be authenticated and audited.
-   Production and non-production secrets must remain isolated.

**40.8 Access Control**

**Overview**

Database Access Control governs authentication and authorization for administrators, applications, services, and automated processes interacting with Kaziforce databases.

The objective is to ensure that every access request is authenticated, authorized, audited, and limited to the minimum permissions required.

**Access Model**

Kaziforce combines:

-   Role-Based Access Control (RBAC)
-   Attribute-Based Access Control (ABAC)
-   Row-Level Security (RLS)
-   Column-Level Security (CLS)
-   Dynamic Data Masking (DDM)

**Database Roles**

**Role**

**Responsibilities**

Database Administrator

Infrastructure administration

Platform Administrator

Platform configuration

Service Account

Microservice access

Read-Only Analyst

Reporting and analytics

Security Auditor

Audit and compliance review

Developer

Non-production access

Support Engineer

Limited operational support

AI Service

AI inference and retrieval with scoped permissions

**Access Principles**

-   Least privilege
-   Need-to-know access
-   Separation of duties
-   Just-in-time privileged access where supported
-   Multi-factor authentication for administrative users
-   Individual accountability (no shared administrator accounts)

**Administrative Controls**

Administrative database access should require:

-   Multi-factor authentication
-   Bastion host or secure administrative gateway
-   Encrypted connections
-   Session logging
-   Command auditing
-   Time-bound privileged access where applicable

**Monitoring**

The platform should continuously monitor:

-   Failed login attempts
-   Privileged operations
-   Permission changes
-   Role assignments
-   Unusual access patterns
-   Large data exports
-   Schema modifications
-   Authentication anomalies

**Database Security Governance**

Kaziforce adopts the following security governance principles:

-   All production databases must enforce encryption at rest and encryption in transit using approved cryptographic standards.
-   Encryption keys, secrets, and certificates must be centrally managed, rotated, and audited through enterprise key and secrets management solutions.
-   Multi-tenant isolation shall be enforced using Row-Level Security, with additional protection provided through Column-Level Security and Dynamic Data Masking for sensitive information.
-   Access to databases must follow least-privilege principles, supported by RBAC, ABAC, MFA, and comprehensive audit logging.
-   All privileged database operations must be monitored, logged, and periodically reviewed for compliance and anomaly detection.
-   Database security controls must align with applicable standards and regulations, including ISO/IEC 27001, SOC 2, PCI DSS (where applicable), GDPR, the Kenya Data Protection Act, and other jurisdiction-specific requirements.
-   Security configurations, policies, and access rules must be version-controlled, periodically reviewed, and traceable to the Software Requirements Specification (SRS), Technical Design Document (TDD), and organizational security policies.

**41\. Compliance & Privacy**

**41.1 General Data Protection Regulation (GDPR)**

**Overview**

Kaziforce is designed to comply with the principles of the European Union General Data Protection Regulation (GDPR) where applicable. The platform incorporates privacy-by-design and privacy-by-default principles into its architecture, database design, APIs, AI services, and operational processes.

Although Kaziforce is intended for global deployment, GDPR compliance serves as a baseline privacy framework for handling personal data across jurisdictions.

**GDPR Principles**

Kaziforce implements the following GDPR principles:

-   Lawfulness, fairness, and transparency
-   Purpose limitation
-   Data minimization
-   Accuracy
-   Storage limitation
-   Integrity and confidentiality
-   Accountability

**Database Design Requirements**

The database architecture supports GDPR through:

-   Tenant isolation
-   Row-Level Security (RLS)
-   Column-Level Security (CLS)
-   Encryption at rest
-   Encryption in transit
-   Audit logging
-   Consent tracking
-   Data retention policies
-   Data deletion workflows
-   Pseudonymization where appropriate

**Personal Data Categories**

Examples include:

-   User identities
-   Contact information
-   Professional profiles
-   Employment history
-   Financial information
-   Authentication data
-   Device metadata
-   Location information
-   AI interaction history
-   Customer records

**GDPR Rights Supported**

Kaziforce supports:

-   Right to be informed
-   Right of access
-   Right to rectification
-   Right to erasure
-   Right to restrict processing
-   Right to data portability
-   Right to object
-   Rights relating to automated decision-making and profiling

**Design Principles**

-   Collect only data necessary for legitimate business purposes.
-   Record lawful processing purposes.
-   Minimize unnecessary duplication of personal data.
-   Ensure AI processing complies with applicable privacy requirements.

**41.2 ISO/IEC 27001**

**Overview**

Kaziforce aligns its database security controls with the principles of ISO/IEC 27001 to establish an Information Security Management System (ISMS).

The database architecture supports secure information handling throughout the data lifecycle.

**Key Control Areas**

-   Asset management
-   Identity and access management
-   Cryptography
-   Physical security
-   Operations security
-   Communications security
-   Supplier security
-   Incident management
-   Business continuity
-   Compliance

**Database Controls**

**Control**

**Implementation**

Access control

RBAC + ABAC

Encryption

AES-256 + TLS

Logging

Immutable audit trails

Monitoring

Continuous monitoring

Backup

Automated encrypted backups

Recovery

Disaster recovery procedures

Vulnerability management

Regular patching and scanning

Configuration management

Infrastructure as Code (IaC)

**Design Principles**

-   Security controls are applied consistently across all environments.
-   Security events are centrally monitored.
-   Administrative actions are fully auditable.
-   Security configurations are version-controlled.

**41.3 SOC 2**

**Overview**

Kaziforce supports the Trust Services Criteria defined by SOC 2 to demonstrate secure handling of customer data.

**Trust Service Principles**

The database design addresses:

-   Security
-   Availability
-   Processing integrity
-   Confidentiality
-   Privacy

**Database Security Controls**

Security

-   Multi-factor authentication
-   Encryption
-   Network isolation
-   Least privilege

Availability

-   High availability clusters
-   Replication
-   Automatic failover
-   Disaster recovery

Processing Integrity

-   ACID transactions
-   Validation rules
-   Audit trails
-   Event sourcing

Confidentiality

-   Data classification
-   Column-level protection
-   Dynamic masking
-   Secure backups

Privacy

-   Consent management
-   Retention controls
-   Data deletion workflows
-   Privacy audit logging

**Monitoring**

SOC 2 controls are supported through:

-   Continuous logging
-   Security monitoring
-   Alerting
-   Configuration audits
-   Periodic access reviews

**41.4 PCI DSS**

**Overview**

Where Kaziforce processes payment card information through integrated payment services, database controls should align with the Payment Card Industry Data Security Standard (PCI DSS).

Where possible, payment card information should be tokenized or handled by PCI-compliant payment providers rather than stored directly.

**Database Requirements**

-   Encryption of sensitive payment data
-   Network segmentation
-   Access restrictions
-   Audit logging
-   Key management
-   Secure authentication
-   Vulnerability management
-   Continuous monitoring

**Sensitive Authentication Data**

Kaziforce must not permanently store:

-   Card Verification Value (CVV/CVC)
-   Magnetic stripe data
-   PIN data
-   PIN blocks

**Stored Payment Data**

Where business requirements necessitate storage:

-   Use payment tokens instead of PANs whenever possible.
-   Encrypt stored cardholder data.
-   Restrict access to authorized financial services only.
-   Log all privileged access.

**Design Principles**

-   Minimize payment data storage.
-   Prefer certified payment gateways for card processing.
-   Isolate payment-related services from other workloads.

**41.5 Data Residency**

**Overview**

Kaziforce supports data residency requirements by allowing organizations to control where regulated data is stored and processed.

The platform supports regional deployments and configurable data localization policies.

**Supported Deployment Regions**

Examples include:

-   Kenya
-   East Africa
-   South Africa
-   European Union
-   United Kingdom
-   North America
-   Middle East
-   Asia-Pacific

**Residency Categories**

**Data Type**

**Residency Policy**

Personal Data

Regional

Financial Records

Regional or jurisdiction-specific

HR Records

Regional

AI Memory

Configurable

Audit Logs

Regional with approved backup strategy

Analytics

Aggregated where permitted

Object Storage

Region-specific

**Regional Database Architecture**

Global Platform

│

┌──────┼──────────┐

▼ ▼ ▼

Kenya EU North America

Region Region Region

**Design Principles**

-   Personal data should remain within the selected jurisdiction unless authorized.
-   Cross-border transfers must comply with applicable legal requirements.
-   Regional encryption keys should be supported.
-   Residency policies should be configurable at the tenant level.

**41.6 Consent Management**

**Overview**

Kaziforce records and manages user and organizational consent for data processing, communications, analytics, AI features, cookies, and third-party integrations.

Consent is managed centrally through the Audit & Compliance Database.

**Consent Types**

Examples include:

-   Terms and Conditions
-   Privacy Policy
-   Marketing communications
-   Email notifications
-   SMS notifications
-   Push notifications
-   Cookies
-   Analytics
-   AI personalization
-   AI memory
-   Third-party integrations

**Consent Record Structure**

Typical attributes include:

-   Consent identifier
-   Subject
-   Consent type
-   Consent status
-   Policy version
-   Source
-   Granted timestamp
-   Revoked timestamp
-   Expiration date
-   Evidence

**Consent Lifecycle**

Consent Requested

│

Granted / Denied

│

Policy Updated

│

Renewed or Revoked

**Design Principles**

-   Consent records must be versioned.
-   Consent withdrawal should take effect promptly.
-   Consent evidence must be retained for audit purposes.
-   Processing activities should reference applicable consent where required.

**41.7 Right to Erasure**

**Overview**

Kaziforce supports the "Right to Erasure" (Right to be Forgotten) through controlled deletion workflows while balancing legal, financial, contractual, and compliance obligations.

**Erasure Workflow**

Deletion Request

│

Identity Verification

│

Eligibility Assessment

│

Legal Hold Check

│

Deletion / Anonymization

│

Audit Record

**Deletion Categories**

**Data**

**Action**

Profile information

Delete or anonymize

AI memory

Delete or regenerate as appropriate

Search indexes

Remove

Cache

Invalidate

Object storage

Delete where permitted

Analytics

Anonymize or aggregate

Financial ledger

Retain where legally required

Audit records

Retain where legally required

**Exceptions**

Deletion may be delayed or denied when required for:

-   Legal obligations
-   Financial regulations
-   Tax compliance
-   Fraud investigations
-   Active litigation
-   Security investigations
-   Legal holds

**Design Principles**

-   Deletion workflows must be auditable.
-   Cascading deletion across microservices should use event-driven orchestration.
-   Anonymization should be preferred where records must be retained for legal purposes.

**41.8 Retention Policies**

**Overview**

Kaziforce applies configurable retention policies to ensure that data is retained only for as long as necessary to satisfy operational, contractual, legal, regulatory, and business requirements.

Retention policies are managed centrally through the Audit & Compliance Service.

**Sample Retention Matrix**

**Data Category**

**Recommended Retention**

User sessions

Until expiry

OTP codes

Minutes

Notifications

Configurable (e.g., 90–365 days)

Chat messages

Tenant-configurable

AI inference logs

Configurable

Audit logs

5–7 years or applicable regulation

Financial records

7 years or applicable regulation

Tax records

As required by applicable law

HR records

According to employment regulations

Learning history

Tenant-configurable

Support tickets

Configurable

Contracts

Contract term plus applicable retention period

Backups

According to backup policy

Compliance evidence

Until legal or regulatory obligations are satisfied

**Retention Lifecycle**

Create

│

Active

│

Archive

│

Retention Review

│

Delete / Anonymize

**Automated Retention**

Retention jobs should:

-   Execute on scheduled intervals.
-   Honor legal holds.
-   Generate audit records.
-   Produce execution reports.
-   Support rollback where appropriate.
-   Notify administrators of failures.

**Compliance & Privacy Governance**

Kaziforce adopts the following governance principles:

-   Privacy-by-design and privacy-by-default shall be applied throughout the database architecture, AI services, APIs, and data engineering processes.
-   Compliance controls shall align with applicable regulations and standards, including GDPR, ISO/IEC 27001, SOC 2, PCI DSS (where applicable), the Kenya Data Protection Act, and other jurisdiction-specific requirements.
-   Personal data shall be processed only for authorized purposes, protected through encryption, access controls, audit logging, and consent management.
-   Data residency, retention, deletion, and anonymization policies shall be configurable to satisfy tenant-specific regulatory obligations.
-   All compliance activities—including consent capture, data subject requests, legal holds, retention execution, and deletion workflows—must be fully auditable and traceable.
-   Compliance policies and privacy controls shall be reviewed periodically and updated in response to regulatory changes, organizational requirements, and security risk assessments.
-   Every compliance control defined in this Database Design Document shall remain traceable to the corresponding Software Requirements Specification (SRS), Technical Design Document (TDD), organizational policies, and applicable legal or regulatory requirements.

**42\. Data Governance**

**42.1 Master Data Management (MDM)**

**Overview**

Master Data Management (MDM) establishes a single, authoritative source of truth for core business entities across the Kaziforce platform. It ensures consistency, quality, governance, and synchronization of critical business data across all microservices, analytics, AI systems, and external integrations.

**Objectives**

-   Establish authoritative master records
-   Eliminate duplicate entities
-   Improve data quality
-   Support enterprise reporting
-   Enable AI-ready data
-   Ensure cross-service consistency
-   Simplify integrations
-   Strengthen regulatory compliance

**Master Data Domains**

**Domain**

**System of Record**

Users

Identity Service

Organizations

Organization Service

Professional Profiles

User Profile Service

Skills

Profile Service

Jobs

Marketplace Service

Projects

Marketplace Service

Contracts

Marketplace Service

Wallets

Finance Service

Courses

Learning Service

Certifications

Credential Service

AI Agents

AI Agent Service

Knowledge Articles

Knowledge Base Service

**MDM Principles**

-   One authoritative owner per entity.
-   Global UUIDs across all services.
-   Event-driven synchronization using Kafka.
-   Reference data managed centrally.
-   Version-controlled master records.
-   Immutable audit history for master data changes.

**42.2 Metadata Management**

**Overview**

Metadata Management provides standardized information describing data assets, enabling discovery, governance, lineage, security classification, and AI-driven data understanding.

**Metadata Categories**

**Category**

**Examples**

Business Metadata

Business definitions, owners

Technical Metadata

Tables, columns, indexes

Operational Metadata

Refresh times, ETL status

Security Metadata

Classification, sensitivity

AI Metadata

Embedding model, vector dimensions

Governance Metadata

Steward, retention, compliance

**Metadata Repository**

Each metadata record should include:

-   Entity name
-   Description
-   Business owner
-   Technical owner
-   Source system
-   Database location
-   Schema version
-   Classification
-   Sensitivity level
-   Retention policy
-   Last update
-   Lineage reference

**Design Principles**

-   Metadata should be automatically generated where possible.
-   Business metadata must be reviewed by data stewards.
-   Technical metadata should synchronize with schema changes.
-   Metadata should be searchable through the enterprise data catalog.

**42.3 Data Lineage**

**Overview**

Data Lineage records how data flows through Kaziforce, from creation to transformation, storage, analytics, AI processing, reporting, and archival.

It enables transparency, regulatory compliance, impact analysis, troubleshooting, and trust in analytical outputs.

**Lineage Scope**

Source System

│

API / Event

│

Operational Database

│

Kafka / CDC

│

Data Pipeline

│

Analytics Database

│

Materialized Views

│

Dashboards / AI

**Lineage Levels**

**Level**

**Description**

Business Lineage

Business process flow

System Lineage

Service-to-service flow

Table Lineage

Table dependencies

Column Lineage

Field transformations

AI Lineage

Model inputs and outputs

**Example**

Professional Profile

│

Kafka Event

│

Search Index

│

Vector Embedding

│

AI Recommendation

**Design Principles**

-   Capture lineage automatically through data pipelines.
-   Maintain lineage for all regulated datasets.
-   Track lineage across AI model training and inference.
-   Preserve lineage through schema evolution.

**42.4 Data Catalog**

**Overview**

The Data Catalog provides a centralized inventory of all enterprise data assets, enabling users to discover, understand, and govern information across the Kaziforce ecosystem.

**Catalog Contents**

The catalog should include:

-   Databases
-   Schemas
-   Tables
-   Collections
-   Views
-   Materialized views
-   Data pipelines
-   APIs
-   Events
-   Reports
-   Dashboards
-   AI datasets
-   Vector collections

**Search Features**

Users should be able to search by:

-   Business name
-   Technical name
-   Description
-   Data owner
-   Tags
-   Classification
-   Domain
-   Service
-   Regulatory category

**Typical Catalog Entry**

**Attribute**

**Example**

Name

professional\_profiles

Domain

User Profile

Owner

Profile Service

Classification

Confidential

Database

PostgreSQL

Steward

HR Data Team

Retention

7 Years

Lineage

Linked

**Design Principles**

-   Maintain a single enterprise catalog.
-   Automatically synchronize technical metadata.
-   Support business glossary integration.
-   Integrate with AI-powered metadata search.

**42.5 Data Stewardship**

**Overview**

Data Stewardship establishes accountability for data quality, governance, security, and lifecycle management.

Every critical data domain must have clearly identified business and technical stewards.

**Stewardship Roles**

**Role**

**Responsibilities**

Executive Data Owner

Business accountability

Business Data Steward

Business definitions and quality

Technical Data Steward

Technical implementation

Database Administrator

Database operations

Security Officer

Data protection

Compliance Officer

Regulatory compliance

AI Governance Lead

AI data governance

**Responsibilities**

Data stewards are responsible for:

-   Data quality
-   Metadata accuracy
-   Classification
-   Access approvals
-   Retention policies
-   Compliance
-   Issue resolution
-   Change review

**Governance Workflow**

Data Created

│

Assigned Steward

│

Quality Validation

│

Approval

│

Production

**Design Principles**

-   Every governed dataset must have an assigned steward.
-   Stewardship responsibilities should be documented.
-   Governance workflows must be auditable.

**42.6 Data Quality Framework**

**Overview**

The Data Quality Framework ensures that enterprise data remains accurate, complete, consistent, timely, valid, and unique throughout its lifecycle.

**Data Quality Dimensions**

**Dimension**

**Description**

Accuracy

Correct values

Completeness

Required fields populated

Consistency

No conflicting values

Timeliness

Current and up-to-date

Validity

Conforms to business rules

Uniqueness

No unintended duplicates

Integrity

Referential consistency

Reliability

Trusted data source

**Validation Layers**

-   API validation
-   Domain validation
-   Database constraints
-   ETL validation
-   Data quality rules
-   AI anomaly detection

**Quality Metrics**

Examples include:

-   Duplicate rate
-   Missing value percentage
-   Validation failure rate
-   Synchronization latency
-   Data freshness
-   Referential integrity score
-   AI confidence
-   Metadata completeness

**Automated Quality Monitoring**

Quality checks should run:

-   During ingestion
-   During ETL
-   During replication
-   Before analytics
-   Before AI training
-   Before reporting

**Data Governance Governance**

Kaziforce adopts the following governance principles:

-   Every business entity shall have a clearly identified authoritative owner.
-   Metadata, lineage, and catalog information shall be maintained as enterprise assets.
-   Data quality shall be continuously monitored through automated validation and governance workflows.
-   Governance policies shall be enforced consistently across operational databases, analytical platforms, AI systems, and integrations.
-   All governance activities shall be auditable and aligned with organizational policies, regulatory requirements, the SRS, and the Technical Design Document.

**43\. Backup & Recovery**

**43.1 Backup Strategy**

**Overview**

Kaziforce employs a multi-layered backup strategy designed to ensure business continuity, regulatory compliance, and rapid recovery from data loss or infrastructure failures.

**Backup Types**

**Backup**

**Frequency**

Full Backup

Daily

Incremental Backup

Hourly or configurable

WAL / Transaction Log Backup

Continuous

Snapshot Backup

Scheduled

Object Storage Backup

Continuous replication

**Protected Components**

-   PostgreSQL
-   MongoDB
-   Redis persistence
-   ClickHouse
-   OpenSearch
-   Neo4j
-   Vector database
-   Object Storage
-   Kubernetes configuration
-   Secrets (encrypted)
-   Infrastructure as Code

**Backup Principles**

-   Encrypt all backups.
-   Verify backup integrity.
-   Store backups in separate locations.
-   Automate backup execution.
-   Monitor backup success.

**43.2 Point-in-Time Recovery (PITR)**

**Overview**

Point-in-Time Recovery enables restoration of databases to a precise moment before accidental deletion, corruption, or operational failure.

**Supported Databases**

-   PostgreSQL (WAL replay)
-   MongoDB (Oplog replay)
-   ClickHouse (where supported by deployment strategy)

**Recovery Workflow**

Full Backup

│

WAL / Log Replay

│

Target Timestamp

│

Recovered Database

**Design Principles**

-   Continuous log archiving.
-   Recovery validation.
-   Automated recovery testing.
-   Recovery documentation.

**43.3 Snapshots**

**Overview**

Snapshots provide fast recovery of complete storage volumes or managed database instances.

**Snapshot Types**

-   Database snapshots
-   Volume snapshots
-   Kubernetes persistent volume snapshots
-   Object storage version snapshots

**Snapshot Policy**

**Environment**

**Frequency**

Production

Daily minimum

Staging

Daily

Development

As required

**Design Principles**

-   Encrypt snapshots.
-   Replicate critical snapshots across regions.
-   Periodically validate restoration.

**43.4 Archive Storage**

**Overview**

Archive Storage preserves historical information that is infrequently accessed but must remain available for legal, regulatory, or business purposes.

**Archived Data**

-   Audit logs
-   Compliance evidence
-   Financial records
-   Historical analytics
-   Expired contracts
-   AI model versions
-   Historical reports
-   Backup sets

**Storage Characteristics**

-   Low-cost storage
-   High durability
-   Encrypted
-   Immutable where required
-   Lifecycle-managed

**Archive Lifecycle**

Active

│

Warm Storage

│

Archive

│

Retention Complete

│

Delete

**43.5 Recovery Procedures**

**Overview**

Recovery Procedures define standardized processes for restoring databases, services, and platform functionality following operational failures or disasters.

**Recovery Sequence**

1.  Incident detection
2.  Impact assessment
3.  Activate recovery plan
4.  Restore infrastructure
5.  Restore databases
6.  Replay logs
7.  Validate integrity
8.  Restore applications
9.  Resume services
10.  Conduct post-incident review

**Recovery Validation**

Validation includes:

-   Database consistency
-   Referential integrity
-   Ledger balancing
-   Search index synchronization
-   AI model availability
-   Cache reconstruction
-   Application health
-   API validation

**Backup & Recovery Governance**

Kaziforce follows these principles:

-   All production databases must have automated, encrypted, and monitored backups.
-   Recovery procedures must be tested regularly.
-   RPO and RTO objectives shall be formally defined and monitored.
-   Recovery documentation shall be maintained under version control.
-   Backup and recovery controls shall comply with regulatory and organizational requirements.

**44\. Database Monitoring & Observability**

**44.1 Health Monitoring**

**Overview**

Kaziforce continuously monitors database health to ensure availability, reliability, and operational stability.

**Health Indicators**

-   Database availability
-   Cluster health
-   Replication status
-   Connection status
-   Storage utilization
-   Service readiness
-   Backup status
-   Replication lag

**Monitoring Stack**

Recommended tools include:

-   Prometheus
-   Grafana
-   OpenTelemetry
-   PostgreSQL Exporter
-   Redis Exporter
-   ClickHouse Exporter
-   OpenSearch monitoring
-   Kubernetes metrics

**44.2 Performance Metrics**

**Key Metrics**

**Metric**

**Description**

Query latency

P50, P95, P99

Transactions per second

Throughput

CPU utilization

Database CPU

Memory utilization

RAM usage

Disk I/O

Storage performance

Cache hit ratio

Buffer efficiency

Replication lag

Replica freshness

Lock contention

Concurrency health

**AI Metrics**

-   Embedding generation time
-   Vector search latency
-   AI inference duration
-   Recommendation generation time

**44.3 Slow Query Monitoring**

**Overview**

Slow queries are continuously identified, logged, analyzed, and optimized.

**Monitored Information**

-   SQL text
-   Execution plan
-   Execution time
-   Rows scanned
-   Index usage
-   Resource consumption
-   Calling service
-   Correlation ID

**Response**

Slow queries should trigger:

-   Performance alerts
-   Execution plan review
-   Index recommendations
-   Query optimization

**44.4 Capacity Monitoring**

**Overview**

Capacity monitoring ensures sufficient resources for future growth.

**Capacity Metrics**

-   Storage growth
-   Table growth
-   Index growth
-   Memory utilization
-   CPU utilization
-   Network throughput
-   Connection count
-   Object storage growth
-   Vector database growth
-   Search index growth

**Forecasting**

Capacity planning should include:

-   Growth trends
-   Seasonal demand
-   AI workload projections
-   Storage forecasts
-   Infrastructure scaling plans

**44.5 Alerting**

**Overview**

Automated alerting enables proactive operational response before service degradation affects users.

**Alert Categories**

**Category**

**Examples**

Availability

Database down

Performance

Slow queries

Capacity

Low storage

Security

Failed logins

Backup

Backup failure

Replication

Replica lag

AI

Failed embedding jobs

Compliance

Retention failures

**Alert Priorities**

-   Critical
-   High
-   Medium
-   Low

**Notification Channels**

-   Email
-   SMS
-   Collaboration platforms
-   Incident management systems
-   Pager escalation

**44.6 Database Dashboards**

**Overview**

Operational dashboards provide real-time visibility into database health, performance, security, compliance, and capacity.

**Dashboard Categories**

**Dashboard**

**Audience**

Operations Dashboard

DBAs

Executive Dashboard

Leadership

Performance Dashboard

Engineering

Security Dashboard

Security Team

Compliance Dashboard

Compliance Team

AI Database Dashboard

AI Engineers

Analytics Dashboard

Data Team

**Dashboard KPIs**

-   Availability
-   Query latency
-   Throughput
-   Error rate
-   Replication health
-   Backup success
-   Cache hit ratio
-   Storage utilization
-   AI workload performance
-   Security events
-   Compliance status
-   Cost metrics

**Database Monitoring & Observability Governance**

Kaziforce adopts the following governance principles:

-   All production database platforms shall expose standardized operational metrics through centralized observability tooling.
-   Monitoring shall cover availability, performance, security, capacity, compliance, AI workloads, and business-critical database operations.
-   Automated alerting shall be configured with severity-based escalation and integrated into incident management processes.
-   Observability data shall be retained according to operational and compliance requirements and protected through appropriate access controls.
-   Monitoring dashboards shall provide role-based visibility for operations, engineering, security, compliance, AI, and executive stakeholders.
-   Performance baselines, alert thresholds, and capacity forecasts shall be reviewed periodically to support proactive scaling and continuous improvement.
-   Database observability shall be fully integrated with the platform's DevSecOps, Site Reliability Engineering (SRE), and enterprise governance practices, ensuring traceability to the Software Requirements Specification (SRS), Technical Design Document (TDD), and organizational operational policies.

**Part VI — Implementation**

**45\. Database DevSecOps**

**45.1 Schema Versioning**

**Overview**

Schema Versioning ensures that every database schema change is controlled, traceable, repeatable, and synchronized with application releases. All schema modifications across Kaziforce microservices shall be managed through version-controlled migration scripts.

**Objectives**

-   Ensure consistent database deployments
-   Support automated CI/CD pipelines
-   Maintain schema history
-   Enable rollback where appropriate
-   Prevent configuration drift
-   Improve auditability

**Versioning Principles**

-   Every schema change receives a unique version identifier.
-   Schema changes are immutable after release.
-   Database versions align with application releases.
-   Production changes occur only through approved migration pipelines.

**Version Naming Convention**

V1\_\_Initial\_Schema.sql

V2\_\_Create\_User\_Profile.sql

V3\_\_Add\_Wallet\_Index.sql

V4\_\_Create\_Vector\_Table.sql

**Types of Schema Changes**

-   Table creation
-   Column addition
-   Column modification
-   Constraint changes
-   Index creation
-   View creation
-   Materialized view updates
-   Stored procedures
-   Partition creation
-   Security policy updates

**Governance**

-   No manual schema changes in production.
-   Every migration must be peer-reviewed.
-   All schema versions must be traceable to the SRS and TDD.

**45.2 Flyway/Liquibase**

**Overview**

Kaziforce standardizes database migration management using **Flyway** or **Liquibase**. The selected tool must support version-controlled migrations, repeatable deployments, validation, rollback planning, and automated execution.

**Tool Responsibilities**

-   Execute migrations
-   Track schema versions
-   Validate migration order
-   Detect checksum changes
-   Prevent duplicate execution
-   Support automated deployments

**Migration Workflow**

Developer

│

Migration Script

│

Git Repository

│

CI/CD Pipeline

│

Flyway / Liquibase

│

Database

**Migration Categories**

**Category**

**Example**

Schema

Create tables

Data

Seed reference data

Security

RLS policies

Index

Performance optimization

AI

Vector schema

Analytics

Materialized views

**Best Practices**

-   Keep migrations small.
-   Make migrations idempotent where possible.
-   Separate schema and data migrations.
-   Validate migrations before production deployment.

**45.3 CI/CD Integration**

**Overview**

Database changes are integrated into the DevSecOps pipeline, ensuring that schema updates are deployed automatically alongside application releases.

**CI/CD Pipeline**

Developer

│

Git Commit

│

Build

│

Static Analysis

│

Migration Validation

│

Unit Tests

│

Integration Tests

│

Deploy to Staging

│

Approval

│

Production Deployment

**Pipeline Activities**

-   Migration validation
-   SQL linting
-   Security scanning
-   Schema comparison
-   Automated testing
-   Performance validation
-   Deployment verification

**Supported Environments**

-   Development
-   Integration
-   QA
-   UAT
-   Staging
-   Production

**Design Principles**

-   Database deployments must be automated.
-   Infrastructure should be managed as code.
-   Production deployments require approval according to organizational policy.

**45.4 Rollback Strategy**

**Overview**

Rollback procedures minimize service disruption when deployments fail or introduce unacceptable risk.

Where direct rollback is unsafe, forward-fix strategies should be preferred.

**Rollback Types**

**Type**

**Usage**

Schema rollback

Safe reversible changes

Data rollback

Controlled restoration

Application rollback

Previous release deployment

Backup restore

Disaster recovery

PITR

Critical recovery

**Rollback Workflow**

Deployment Failure

│

Health Validation

│

Rollback Decision

│

Rollback or Forward Fix

│

Verification

**Rollback Guidelines**

-   Avoid destructive migrations.
-   Use feature flags for risky functionality.
-   Test rollback procedures before production.
-   Maintain backups before every production deployment.

**45.5 Migration Testing**

**Overview**

Every database migration must be validated before production deployment to ensure functional correctness, performance, compatibility, and data integrity.

**Validation Areas**

-   Schema creation
-   Constraint validation
-   Index creation
-   Foreign key validation
-   Migration order
-   Rollback validation
-   Performance impact
-   Data preservation

**Automated Tests**

-   Migration execution
-   Repeatability
-   Schema comparison
-   Data integrity verification
-   Performance benchmarking

**Success Criteria**

A migration is considered successful when:

-   It executes without errors.
-   Existing data remains valid.
-   Application compatibility is preserved.
-   Performance targets are maintained.
-   Rollback or recovery procedures have been validated where applicable.

**Database DevSecOps Governance**

Kaziforce adopts the following principles:

-   All database changes shall be version-controlled and deployed through automated CI/CD pipelines.
-   Migration scripts shall undergo code review, security scanning, and automated testing before deployment.
-   Production databases shall never be modified manually except through approved emergency procedures.
-   Database deployments shall be fully auditable and traceable to software releases.

**46\. Database Testing Strategy**

**46.1 Unit Testing**

**Overview**

Unit testing validates individual database components in isolation.

**Test Scope**

-   Stored procedures
-   Database functions
-   Views
-   Constraints
-   Triggers
-   Validation logic

**Objectives**

-   Validate correctness
-   Detect regressions
-   Improve reliability
-   Support continuous delivery

**46.2 Integration Testing**

**Overview**

Integration testing verifies interactions between databases, microservices, event pipelines, caches, and search platforms.

**Test Areas**

-   PostgreSQL ↔ Application
-   Kafka event synchronization
-   Redis cache consistency
-   OpenSearch indexing
-   Neo4j graph synchronization
-   ClickHouse ingestion
-   Vector database synchronization
-   Backup validation

**Validation**

-   Data consistency
-   Event ordering
-   Referential integrity
-   Search synchronization
-   Read model updates

**46.3 Performance Testing**

**Overview**

Performance testing validates that database services meet required response times and throughput under expected and peak workloads.

**Test Types**

-   Load testing
-   Stress testing
-   Spike testing
-   Endurance testing
-   Scalability testing
-   Benchmark testing

**Example KPIs**

**Metric**

**Target**

P95 query latency

≤ defined SLA

Cache hit ratio

≥ 90%

Replication lag

Within SLA

Search latency

≤ defined SLA

Vector search latency

≤ defined SLA

**46.4 Failover Testing**

**Overview**

Failover testing verifies high-availability and disaster recovery capabilities.

**Test Scenarios**

-   Primary database failure
-   Replica promotion
-   Network partition
-   Storage failure
-   Kubernetes node failure
-   Regional outage
-   Cache failure
-   Search cluster failure

**Validation**

-   Automatic failover
-   Data consistency
-   Application recovery
-   Acceptable recovery times
-   Service continuity

**46.5 Security Testing**

**Overview**

Security testing validates database protection against unauthorized access, privilege escalation, data leakage, and common attack vectors.

**Test Areas**

-   Authentication
-   Authorization
-   Row-Level Security
-   Column-Level Security
-   Encryption
-   SQL injection
-   Secrets management
-   Key rotation
-   Audit logging
-   Administrative access

**Validation**

-   Access controls enforced
-   Sensitive data protected
-   Security events logged
-   Compliance requirements satisfied

**46.6 Data Integrity Testing**

**Overview**

Data integrity testing ensures that information remains complete, accurate, and consistent across all database technologies.

**Validation Areas**

-   Primary keys
-   Foreign keys
-   Constraints
-   Data synchronization
-   Event consistency
-   Replication
-   ETL pipelines
-   AI datasets
-   Search indexes
-   Analytics data

**Automated Integrity Checks**

-   Referential integrity
-   Duplicate detection
-   Missing data detection
-   Check constraint validation
-   Cross-service consistency
-   Financial reconciliation

**Database Testing Governance**

Kaziforce adopts the following principles:

-   Every database release shall pass automated unit, integration, performance, security, failover, and integrity testing.
-   Testing shall be integrated into CI/CD pipelines.
-   Production deployments shall proceed only after successful validation against predefined acceptance criteria.
-   Test evidence shall be retained for audit and compliance purposes.

**47\. Capacity Planning**

**47.1 Storage Estimates**

**Overview**

Capacity planning estimates storage requirements across operational databases, analytics platforms, search indexes, AI datasets, backups, and archives.

**Storage Categories**

**Component**

**Storage Type**

PostgreSQL

Transactional

MongoDB

Documents

Redis

Memory

OpenSearch

Search indexes

ClickHouse

Analytics

Neo4j

Graph

Vector Database

Embeddings

Object Storage

Files

Backups

Recovery

Archives

Long-term retention

**Planning Factors**

-   Number of tenants
-   Active users
-   Organizations
-   Messages
-   Documents
-   AI embeddings
-   Search indexes
-   Historical data
-   Backup retention

**47.2 Growth Projections**

**Overview**

Growth projections estimate future infrastructure requirements based on expected business expansion and workload trends.

**Projection Dimensions**

-   User growth
-   Organization growth
-   Marketplace transactions
-   AI usage
-   Messaging volume
-   Learning content
-   Analytics events
-   Object storage
-   Search index size

**Planning Horizons**

**Horizon**

**Purpose**

1 Year

Operational planning

3 Years

Infrastructure planning

5 Years

Strategic planning

**Forecasting Inputs**

-   Historical trends
-   Business forecasts
-   Customer acquisition
-   Seasonal demand
-   AI adoption
-   Geographic expansion

**47.3 Database Sizing**

**Overview**

Database sizing determines the compute, memory, storage, and network resources required to support anticipated workloads.

**Sizing Considerations**

**PostgreSQL**

-   CPU cores
-   Memory
-   Storage
-   IOPS
-   Connection limits

**MongoDB**

-   Working set
-   Replica size
-   Storage growth

**Redis**

-   Memory footprint
-   Eviction policy
-   Cluster size

**ClickHouse**

-   Column compression
-   Analytical workload
-   Storage throughput

**OpenSearch**

-   Shards
-   Replicas
-   Heap memory

**Neo4j**

-   Graph size
-   Relationship count
-   Traversal workload

**Vector Database**

-   Number of vectors
-   Embedding dimensions
-   Index algorithm
-   Query concurrency

**Design Principles**

-   Size for peak workloads with defined headroom.
-   Review sizing periodically.
-   Support horizontal scaling where appropriate.

**47.4 Scaling Strategy**

**Overview**

Kaziforce is designed for horizontal scalability across all database technologies, enabling growth from startup deployments to enterprise and national-scale platforms.

**Scaling Approaches**

**Database**

**Scaling Strategy**

PostgreSQL

Read replicas, partitioning, sharding

MongoDB

Replica sets, sharding

Redis

Cluster mode

ClickHouse

Distributed clusters

OpenSearch

Shards and replicas

Neo4j

Causal clustering

Vector Database

Distributed vector clusters

Object Storage

Elastic scaling

**Scaling Lifecycle**

Vertical Scaling

│

Read Replicas

│

Partitioning

│

Sharding

│

Multi-Region Deployment

**Elastic Scaling**

Infrastructure should support:

-   Automatic node provisioning
-   Storage expansion
-   Read replica scaling
-   Cache scaling
-   Search cluster expansion
-   AI workload scaling
-   Regional expansion

**Capacity Monitoring**

Scaling decisions should be based on:

-   CPU utilization
-   Memory utilization
-   Storage growth
-   Query latency
-   Connection utilization
-   Replication lag
-   Cache efficiency
-   Search throughput
-   AI inference demand

**Capacity Planning Governance**

Kaziforce adopts the following governance principles:

-   Capacity planning shall be a continuous process supported by monitoring, forecasting, and periodic infrastructure reviews.
-   Database sizing shall consider business growth, AI workloads, regulatory requirements, disaster recovery, and performance objectives.
-   Scaling strategies shall prioritize horizontal scalability, high availability, and operational resilience.
-   Capacity assumptions, forecasts, and sizing decisions shall be documented and reviewed regularly.
-   Infrastructure growth shall be aligned with the platform roadmap, Software Requirements Specification (SRS), Technical Design Document (TDD), and enterprise architecture standards.

**49\. Database Design Traceability**

**49.1 Mapping DDD to Software Requirements Specification (SRS)**

**Overview**

The Database Design Document (DDD) translates the logical and business requirements defined in the Software Requirements Specification (SRS) into a complete physical and logical enterprise database architecture.

Every database object—including schemas, entities, tables, collections, indexes, relationships, partitions, and security controls—must be traceable to one or more approved business or non-functional requirements.

**Objectives**

The traceability process ensures:

-   Complete implementation of business requirements
-   Elimination of orphan database objects
-   Regulatory compliance
-   Simplified impact analysis
-   Controlled change management
-   Full auditability

**Mapping Levels**

**SRS Component**

**Database Artifact**

Functional Requirement

Tables, collections, relationships

Business Rule

Constraints, triggers, validation

Security Requirement

RLS, CLS, encryption, RBAC

Performance Requirement

Indexes, partitions, caching

Scalability Requirement

Sharding, replication

AI Requirement

Vector databases, embeddings

Analytics Requirement

Fact tables, dimensions

Compliance Requirement

Audit tables, retention policies

**Traceability Principles**

-   Every database object shall support at least one approved requirement.
-   Every functional requirement shall have supporting database structures.
-   Changes to requirements shall trigger traceability reviews.
-   Traceability shall be maintained throughout the project lifecycle.

**49.2 Mapping DDD to Technical Design Document (TDD)**

**Overview**

The Technical Design Document defines how Kaziforce is implemented, while the Database Design Document specifies how persistent data is modeled, stored, secured, and managed.

The DDD directly supports the architecture defined within the TDD.

**Typical Mapping**

**TDD Section**

**Database Component**

Microservices

Service databases

APIs

Database tables

Domain Models

Entity models

CQRS

Read models

Event Sourcing

Event store

AI Engine

Vector database

Search Engine

OpenSearch indexes

Analytics

ClickHouse schemas

Security

Database security controls

**Architecture Alignment**

The DDD implements the TDD architecture by defining:

-   Physical database structures
-   Storage technologies
-   Data ownership
-   Database interactions
-   Performance optimization
-   Security controls
-   Data governance
-   High availability

**Design Principles**

-   Database design shall never contradict the TDD.
-   Service boundaries shall remain consistent.
-   Database ownership shall follow bounded contexts.
-   Cross-service communication shall occur through APIs and events rather than direct database access.

**49.3 Database Traceability Matrix**

**Overview**

The Database Traceability Matrix (DTM) provides end-to-end visibility from business requirements through architecture, implementation, and physical database artifacts.

**Sample Matrix**

**Requirement**

**Service**

**Database Object**

**Technology**

**Verification**

User Registration

Identity

users

PostgreSQL

Integration Test

Professional Profile

Profile

professional\_profiles

PostgreSQL

API Test

AI Matching

AI Engine

profile\_embeddings

Vector Database

AI Validation

Job Search

Marketplace

jobs\_index

OpenSearch

Search Test

Financial Ledger

Finance

ledger\_entries

PostgreSQL

Reconciliation Test

Analytics

Analytics

fact\_transactions

ClickHouse

BI Validation

Knowledge Graph

Knowledge

Neo4j Graph

Neo4j

Graph Test

**Traceability Coverage**

The matrix should include:

-   Business requirement
-   Database technology
-   Schema
-   Table or collection
-   API
-   Event
-   Service owner
-   Test case
-   Deployment version

**Benefits**

-   Impact analysis
-   Audit readiness
-   Easier maintenance
-   Regulatory compliance
-   Release validation

**49.4 Requirement Coverage Analysis**

**Overview**

Requirement Coverage Analysis verifies that every approved requirement has been fully implemented within the database architecture.

**Coverage Categories**

**Status**

**Description**

Fully Covered

Completely implemented

Partially Covered

Additional work required

Planned

Scheduled for future release

Not Applicable

No database implementation required

**Coverage Dimensions**

Coverage should include:

-   Functional requirements
-   Security requirements
-   Performance requirements
-   Scalability requirements
-   Compliance requirements
-   AI requirements
-   Reporting requirements
-   Integration requirements

**Verification Activities**

Coverage is validated through:

-   Design reviews
-   Schema reviews
-   Code reviews
-   Migration validation
-   Integration testing
-   Security testing
-   Performance testing
-   User acceptance testing

**Traceability Governance**

Kaziforce adopts the following governance principles:

-   Every database artifact shall be traceable to an approved requirement.
-   No production database object shall exist without documented business justification.
-   Traceability shall be maintained throughout design, implementation, testing, deployment, and maintenance.
-   Traceability documentation shall be version-controlled and reviewed during every major release.

**50\. Future Database Roadmap**

**50.1 Autonomous Database Operations**

**Vision**

Kaziforce will progressively adopt autonomous database technologies capable of self-monitoring, self-optimization, self-healing, and predictive maintenance.

**Future Capabilities**

-   AI-assisted query optimization
-   Automatic indexing
-   Intelligent partition management
-   Predictive scaling
-   Self-healing replication
-   Autonomous backup verification
-   Automatic anomaly detection
-   AI-driven capacity planning

**50.2 AI-Native Databases**

Future database platforms will increasingly integrate AI directly into storage and query engines.

Planned capabilities include:

-   Native vector storage
-   Embedded machine learning
-   AI-assisted SQL optimization
-   Natural language querying
-   AI-generated execution plans
-   Intelligent indexing
-   Context-aware retrieval

**50.3 Knowledge Graph Expansion**

The Neo4j Knowledge Graph will evolve into a comprehensive enterprise knowledge network connecting:

-   Professionals
-   Organizations
-   Skills
-   Projects
-   Courses
-   Credentials
-   AI Agents
-   Knowledge Articles
-   Business Processes
-   Enterprise Assets

Future graph analytics will support advanced workforce intelligence and explainable AI recommendations.

**50.4 Global Data Fabric**

Kaziforce aims to implement a unified Global Data Fabric that provides secure, policy-driven access to distributed data regardless of physical location.

Key capabilities include:

-   Unified metadata
-   Cross-region data virtualization
-   Intelligent data routing
-   Federated querying
-   Multi-cloud integration
-   Automated governance
-   Global catalog synchronization

**50.5 Federated Learning Data Stores**

To support privacy-preserving AI, Kaziforce plans to adopt Federated Learning architectures where machine learning models are trained across distributed datasets without moving sensitive data.

Expected capabilities include:

-   Local model training
-   Secure parameter aggregation
-   Differential privacy
-   Secure multi-party computation
-   Cross-organization collaboration
-   Regulatory compliance for AI training

**50.6 Digital Identity Ledger**

Future releases will introduce a Digital Identity Ledger to maintain verifiable, tamper-evident records of workforce identities and lifecycle events.

Potential features include:

-   Decentralized identifiers (DIDs)
-   Verifiable credentials
-   Identity verification history
-   Trust scoring
-   Cross-border identity portability
-   Immutable audit trails

**50.7 Blockchain Credential Storage**

Professional credentials, certifications, licenses, and workforce achievements may be anchored to blockchain networks for long-term authenticity and verification.

Future capabilities include:

-   Credential hashing
-   Immutable verification
-   Smart contract validation
-   Cross-platform verification
-   Employer verification APIs
-   Academic credential interoperability

**50.8 Enterprise Data Mesh**

Kaziforce's long-term architecture will evolve toward an Enterprise Data Mesh, where each domain owns, governs, and publishes its data as a product while adhering to common interoperability standards.

**Data Products**

Examples include:

-   Identity Data Product
-   Workforce Data Product
-   Marketplace Data Product
-   Finance Data Product
-   Learning Data Product
-   AI Data Product
-   Analytics Data Product
-   Knowledge Data Product

**Core Principles**

-   Domain-oriented ownership
-   Data as a product
-   Self-service data platform
-   Federated computational governance
-   Standardized interoperability
-   Enterprise-wide discoverability

**Strategic Vision**

The future Kaziforce data platform will combine:

-   Polyglot persistence
-   AI-native databases
-   Vector search
-   Knowledge graphs
-   Enterprise Data Mesh
-   Global Data Fabric
-   Autonomous database operations
-   Blockchain-backed trust services
-   Privacy-preserving AI
-   Planet-scale distributed data architecture

This roadmap positions Kaziforce as an AI-first, globally distributed workforce platform capable of supporting enterprise, government, and multinational deployments while maintaining security, compliance, resilience, scalability, and data sovereignty.

**50\. Appendices**

**50.1 Complete Data Dictionary**

**Overview**

The Complete Data Dictionary serves as the authoritative reference for every database object across the Kaziforce platform. It provides standardized definitions, metadata, ownership, relationships, constraints, and governance information for all data assets.

**Objectives**

The Data Dictionary enables:

-   Enterprise-wide data standardization
-   Consistent terminology
-   Simplified development
-   Regulatory compliance
-   Data governance
-   Impact analysis
-   AI-ready metadata
-   Cross-service interoperability

**Data Dictionary Contents**

Each data object should include:

**Attribute**

**Description**

Object Name

Table, collection, or view name

Business Name

Human-readable name

Description

Business purpose

Domain

Functional domain

Microservice

Owning service

Database

Database technology

Schema

Database schema

Owner

Data owner

Steward

Data steward

Classification

Public, Internal, Confidential, Restricted

Retention Policy

Applicable retention rule

Security Controls

Encryption, RLS, CLS

Related APIs

API endpoints

Related Events

Kafka events

Related Reports

BI reports

Version

Current schema version

**Documentation Principles**

-   Every database object must appear in the Data Dictionary.
-   Updates shall be generated automatically where possible.
-   Business definitions shall be approved by data stewards.
-   The dictionary shall remain synchronized with production schemas.

**50.2 Table Catalog**

**Overview**

The Table Catalog provides a centralized inventory of all relational tables across Kaziforce.

**Table Metadata**

Each table entry should contain:

**Attribute**

**Description**

Table Name

Physical table

Schema

Database schema

Database

PostgreSQL, ClickHouse, etc.

Service

Owning microservice

Primary Key

Primary key column

Partition Strategy

Range, Hash, None

Estimated Size

Projected volume

Record Count

Current volume

Retention

Applicable retention policy

Security Classification

Data sensitivity

Replication Strategy

HA configuration

**Example**

**Table**

**Service**

**Database**

users

Identity

PostgreSQL

organizations

Organization

PostgreSQL

jobs

Marketplace

PostgreSQL

ledger\_entries

Finance

PostgreSQL

fact\_transactions

Analytics

ClickHouse

profile\_embeddings

AI Matching

Vector Database

**Governance**

-   All production tables must be cataloged.
-   Ownership must be assigned.
-   Deprecated tables must be clearly identified.
-   Catalog updates should be automated.

**50.3 Column Catalog**

**Overview**

The Column Catalog documents every column within every enterprise database object.

**Column Metadata**

Each column should include:

**Attribute**

**Description**

Column Name

Physical column

Business Name

Business meaning

Data Type

SQL type

Nullable

Yes/No

Default Value

Default expression

Constraint

PK, FK, Unique, Check

Index

Indexed status

Classification

Sensitivity

Encryption

Yes/No

Masking

Yes/No

Description

Business definition

**Example**

**Column**

**Type**

**Description**

user\_id

UUID

Unique user identifier

email

VARCHAR

User email address

tenant\_id

UUID

Tenant ownership

created\_at

TIMESTAMPTZ

Creation timestamp

updated\_at

TIMESTAMPTZ

Last modification

**Governance**

-   All columns shall have business definitions.
-   Sensitive columns shall be classified.
-   Deprecated columns shall be documented until removed.
-   Schema changes shall automatically update the catalog.

**50.4 Database Naming Standards**

**Overview**

Consistent naming conventions improve readability, maintainability, automation, and interoperability across the Kaziforce platform.

**General Principles**

Names should be:

-   Descriptive
-   Consistent
-   Singular where appropriate
-   Lowercase
-   Snake\_case
-   Free of abbreviations unless standardized

**Naming Standards**

**Object**

**Convention**

**Example**

Schema

snake\_case

identity

Table

snake\_case plural

professional\_profiles

Column

snake\_case

created\_at

Primary Key

entity\_id

user\_id

Foreign Key

referenced\_entity\_id

organization\_id

Index

idx\_table\_column

idx\_jobs\_status

Unique Constraint

uq\_table\_column

uq\_users\_email

Foreign Key Constraint

fk\_child\_parent

fk\_jobs\_organization

Check Constraint

chk\_table\_rule

chk\_wallet\_balance

View

vw\_name

vw\_active\_jobs

Materialized View

mv\_name

mv\_daily\_revenue

Sequence

seq\_name

seq\_invoice

Trigger

trg\_name

trg\_audit\_update

**Reserved Columns**

All transactional tables should include:

-   created\_at
-   updated\_at
-   created\_by
-   updated\_by
-   tenant\_id
-   version
-   deleted\_at (where soft delete is used)

**50.5 SQL Standards**

**Overview**

SQL coding standards ensure consistency, maintainability, portability, and performance across all database implementations.

**Formatting Standards**

-   SQL keywords in UPPERCASE
-   Object names in snake\_case
-   One column per line in SELECT statements
-   Explicit JOIN syntax
-   Parameterized queries
-   Consistent indentation

**Example**

SELECT

user\_id,

full\_name,

email

FROM users

WHERE tenant\_id = :tenant\_id

ORDER BY created\_at DESC;

**Coding Standards**

-   Avoid SELECT \*
-   Use explicit column lists
-   Prefer prepared statements
-   Minimize nested subqueries
-   Optimize joins
-   Use indexes effectively
-   Document complex queries

**Performance Standards**

-   Review execution plans
-   Avoid unnecessary scans
-   Limit result sets
-   Use keyset pagination
-   Optimize aggregation queries

**50.6 Database Configuration Matrix**

**Overview**

The Database Configuration Matrix documents recommended configuration baselines for all supported database technologies.

**Configuration Summary**

**Technology**

**Primary Purpose**

**High Availability**

**Replication**

**Partitioning**

PostgreSQL

OLTP

Cluster

Streaming

Native

MongoDB

Documents

Replica Set

Built-in

Sharding

Redis

Cache

Sentinel / Cluster

Replica

Cluster

ClickHouse

Analytics

Cluster

Replicated

Native

OpenSearch

Search

Cluster

Replica Shards

Native

Neo4j

Graph

Causal Cluster

Native

Cluster

Vector Database

AI Search

Distributed

Native

Native

Object Storage

Files

Multi-region

Cross-region

Lifecycle

**Configuration Categories**

Document configuration for:

-   Memory
-   CPU
-   Storage
-   Network
-   Connections
-   Replication
-   Backup
-   Security
-   Monitoring
-   Logging

**Governance**

-   Configurations should be managed as Infrastructure as Code (IaC).
-   Environment-specific values should be externalized.
-   Configuration changes must be version-controlled and approved.

**50.7 Storage Estimation Matrix**

**Overview**

The Storage Estimation Matrix provides planning assumptions for infrastructure sizing, budgeting, and long-term capacity management.

**Estimated Growth Areas**

**Domain**

**Expected Growth**

Users

High

Organizations

Medium

Jobs

High

Messages

Very High

Documents

Very High

AI Embeddings

Very High

Search Indexes

High

Analytics Events

Extremely High

Audit Logs

High

Knowledge Base

Medium

Learning Content

Medium

Financial Records

High

**Storage Categories**

**Storage Type**

**Example Workloads**

Transactional

PostgreSQL

Document

MongoDB

Memory

Redis

Search

OpenSearch

Analytics

ClickHouse

Graph

Neo4j

Vector

AI Embeddings

Object Storage

Files

Backup

Recovery

Archive

Compliance

**Capacity Planning Inputs**

Storage estimates should consider:

-   Number of tenants
-   Active users
-   Daily transactions
-   AI inference volume
-   Document uploads
-   Media uploads
-   Search index growth
-   Analytics event volume
-   Backup retention
-   Regulatory retention requirements

**Forecasting Horizons**

**Horizon**

**Planning Objective**

12 Months

Operational capacity

36 Months

Infrastructure expansion

60 Months

Strategic platform growth

**Appendix Governance**

The appendices constitute the authoritative reference library for the Kaziforce Database Design Document and shall be maintained throughout the platform lifecycle.

The following governance principles apply:

-   All appendix artifacts shall remain synchronized with the production database schemas and infrastructure.
-   Updates to tables, columns, constraints, indexes, configurations, or standards shall automatically trigger corresponding updates to the Data Dictionary and Catalogs.
-   Appendix content shall be generated where possible from source-controlled database metadata to minimize documentation drift.
-   All standards, catalogs, and matrices shall be version-controlled and reviewed as part of the architecture governance process.
-   The appendices shall serve as the primary reference for developers, database administrators, architects, AI engineers, DevOps engineers, auditors, and compliance teams.
-   Every appendix entry shall remain traceable to the Software Requirements Specification (SRS), Technical Design Document (TDD), implementation artifacts, and operational database environments.

**50.8 Index Catalog**

**Overview**

The Index Catalog provides a centralized inventory of all indexes implemented across the Kaziforce platform. It serves as the authoritative reference for database performance optimization, query tuning, capacity planning, and maintenance.

**Objectives**

The Index Catalog enables:

-   Performance optimization
-   Query tuning
-   Index governance
-   Capacity planning
-   Maintenance planning
-   Impact analysis
-   Database auditing

**Index Metadata**

Each index entry should include:

**Attribute**

**Description**

Index Name

Physical index name

Database

Database technology

Schema

Schema name

Table

Indexed table

Columns

Indexed columns

Index Type

B-Tree, GIN, BRIN, Hash, HNSW, etc.

Purpose

Business justification

Unique

Yes/No

Partition Aware

Yes/No

Status

Active, Deprecated

Created Version

Migration version

**Example**

**Index**

**Type**

**Purpose**

idx\_users\_email

B-Tree

Email lookup

idx\_jobs\_status\_created

Composite

Marketplace filtering

idx\_resume\_search

GIN

Full-text search

idx\_profile\_embedding

HNSW

Vector similarity

idx\_audit\_occurred\_at

BRIN

Time-series queries

**Governance**

-   Every production index must have documented justification.
-   Duplicate and unused indexes should be periodically removed.
-   Index health should be monitored continuously.

**50.9 Constraint Catalog**

**Overview**

The Constraint Catalog documents all integrity constraints implemented across Kaziforce databases.

**Constraint Types**

-   Primary Keys
-   Foreign Keys
-   Unique Constraints
-   Check Constraints
-   Exclusion Constraints
-   Default Constraints

**Constraint Metadata**

**Attribute**

**Description**

Constraint Name

Physical constraint

Database

Technology

Table

Table name

Columns

Applicable columns

Constraint Type

PK, FK, UNIQUE, CHECK

Business Rule

Requirement enforced

Related Requirement

SRS reference

Migration Version

Version introduced

**Example**

**Constraint**

**Type**

**Purpose**

pk\_users

Primary Key

User uniqueness

fk\_jobs\_organization

Foreign Key

Organization ownership

uq\_users\_email

Unique

Email uniqueness

chk\_wallet\_balance

Check

Non-negative balance

**Governance**

-   Every constraint must support a documented business rule.
-   Constraints must be version-controlled.
-   Constraint modifications require architectural review.

**50.10 Database Event Catalog**

**Overview**

Kaziforce uses an event-driven architecture in which database changes are propagated through Kafka domain events.

The Database Event Catalog documents every event that affects persistent data.

**Event Metadata**

Each event should include:

**Attribute**

**Description**

Event Name

Domain event

Producing Service

Source microservice

Consuming Services

Subscribers

Database Objects

Affected entities

Event Schema

Payload version

Topic

Kafka topic

Trigger

Business action

**Representative Events**

**Event**

**Producer**

UserCreated

Identity Service

UserUpdated

Identity Service

OrganizationCreated

Organization Service

ProfileUpdated

Profile Service

JobPublished

Marketplace Service

ContractSigned

Marketplace Service

WalletCredited

Finance Service

WalletDebited

Finance Service

PaymentCompleted

Finance Service

NotificationSent

Notification Service

CourseCompleted

Learning Service

CredentialIssued

Credential Service

AIRecommendationGenerated

AI Matching Service

SearchIndexUpdated

Search Service

**Governance**

-   Every published event shall be versioned.
-   Event schemas shall be backward compatible where possible.
-   Event ownership shall remain with the producing service.
-   Events shall be documented before production deployment.

**50.11 Sample SQL Scripts**

**Overview**

This appendix contains representative SQL scripts illustrating recommended implementation patterns used throughout Kaziforce.

**Sample Categories**

The appendix should include examples for:

-   Schema creation
-   Table creation
-   Constraints
-   Indexes
-   Partitions
-   Views
-   Materialized views
-   Stored procedures
-   Row-Level Security policies
-   Database roles
-   Performance tuning
-   Maintenance operations

**Example Scripts**

Typical examples include:

-   Create User table
-   Create Organization table
-   Create Wallet Ledger
-   Create AI Embedding table
-   Create Materialized View
-   Create Partition
-   Create Full-Text Index
-   Create Vector Index
-   Enable Row-Level Security
-   Configure Read Replica

**Governance**

-   Scripts are illustrative reference implementations.
-   Production deployments must use approved migration tools.
-   Example scripts shall remain synchronized with schema evolution.

**50.12 Migration Scripts**

**Overview**

This appendix documents the structure and organization of database migration scripts used throughout the Kaziforce platform.

**Migration Categories**

**Category**

**Description**

Initial schema

Base database creation

Feature migrations

New functionality

Security migrations

Security controls

Performance migrations

Indexes, partitions

AI migrations

Vector schema

Analytics migrations

Fact tables

Data migrations

Reference data

**Naming Convention**

Examples:

V1\_\_Initial\_Schema.sql

V2\_\_Identity\_Service.sql

V3\_\_Marketplace\_Module.sql

V4\_\_Wallet\_Module.sql

V5\_\_AI\_Vector\_Search.sql

V6\_\_Analytics\_Views.sql

**Migration Standards**

-   Sequential version numbering
-   Immutable migration history
-   Repeatable reference-data migrations where applicable
-   Automated validation
-   CI/CD integration
-   Rollback planning

**Governance**

-   Migration scripts are the only approved mechanism for production schema changes.
-   Manual production schema modifications are prohibited except under approved emergency procedures.
-   Migration history shall remain permanently auditable.

**50.13 Glossary**

**Overview**

The Glossary provides standardized definitions for business, technical, database, AI, and architecture terminology used throughout the Kaziforce documentation suite.

**Sample Terms**

**Term**

**Definition**

Aggregate Root

Primary entity governing a consistency boundary in Domain-Driven Design

AI Agent

Autonomous software component capable of performing defined business tasks

Bounded Context

Domain boundary with independent business rules and data ownership

CQRS

Command Query Responsibility Segregation

Data Mesh

Domain-oriented decentralized data architecture

Embedding

Numerical vector representing semantic meaning

Event Sourcing

Persisting state changes as immutable events

Knowledge Graph

Graph representation of connected business entities

Polyglot Persistence

Using multiple database technologies for different workloads

Read Model

Optimized query representation in CQRS

Saga

Distributed transaction coordination pattern

Vector Database

Database optimized for similarity search on embeddings

**Governance**

-   Definitions shall remain consistent across the SRS, TDD, DDD, API specifications, and operational documentation.
-   New terminology shall be approved through architecture governance.

**50.14 Acronyms**

**Overview**

This appendix lists abbreviations used throughout the Kaziforce documentation.

**Acronym Catalog**

**Acronym**

**Meaning**

ABAC

Attribute-Based Access Control

AI

Artificial Intelligence

API

Application Programming Interface

CDC

Change Data Capture

CI/CD

Continuous Integration / Continuous Deployment

CLS

Column-Level Security

CQRS

Command Query Responsibility Segregation

DDD

Database Design Document / Domain-Driven Design (context dependent)

DTM

Design Traceability Matrix

ERD

Entity Relationship Diagram

ETL

Extract, Transform, Load

GDPR

General Data Protection Regulation

GIN

Generalized Inverted Index

HNSW

Hierarchical Navigable Small World

IAM

Identity and Access Management

ISMS

Information Security Management System

KMS

Key Management Service

OLAP

Online Analytical Processing

OLTP

Online Transaction Processing

PITR

Point-in-Time Recovery

RAG

Retrieval-Augmented Generation

RBAC

Role-Based Access Control

RLS

Row-Level Security

RPO

Recovery Point Objective

RTO

Recovery Time Objective

SCD

Slowly Changing Dimension

SLA

Service Level Agreement

SRS

Software Requirements Specification

TDD

Technical Design Document

TLS

Transport Layer Security

UUID

Universally Unique Identifier

WAL

Write-Ahead Log

**Governance**

The acronym list shall remain synchronized across all official Kaziforce documentation.

**50.15 References**

**Overview**

This appendix identifies the authoritative standards, specifications, frameworks, and supporting documentation referenced throughout the Kaziforce Database Design Document.

**Internal References**

-   Kaziforce Software Requirements Specification (SRS)
-   Kaziforce Technical Design Document (TDD)
-   Kaziforce Enterprise Architecture
-   Kaziforce API Specifications
-   Kaziforce Event Catalog
-   Kaziforce Security Architecture
-   Kaziforce DevSecOps Standards
-   Kaziforce Infrastructure Architecture
-   Kaziforce Data Governance Policy

**Technology References**

-   PostgreSQL Documentation
-   MongoDB Documentation
-   Redis Documentation
-   ClickHouse Documentation
-   Neo4j Documentation
-   OpenSearch Documentation
-   Apache Kafka Documentation
-   Kubernetes Documentation
-   Flyway Documentation
-   Liquibase Documentation

**Standards and Frameworks**

-   ISO/IEC 27001
-   ISO/IEC 27701
-   ISO/IEC 25010
-   ISO/IEC 12207
-   ISO/IEC 11179 (Metadata Registry)
-   NIST Cybersecurity Framework (CSF)
-   NIST SP 800-53
-   OWASP ASVS
-   OWASP Top 10
-   PCI DSS
-   GDPR
-   SOC 2 Trust Services Criteria
-   Kenya Data Protection Act, 2019 (and applicable regulations)
-   Domain-Driven Design (DDD)
-   Event-Driven Architecture (EDA)
-   CQRS and Event Sourcing Patterns
-   Data Mesh Principles
-   TOGAF Enterprise Architecture Framework

**Reference Governance**

The References appendix is the authoritative bibliography for the Kaziforce Database Design Document and shall:

-   Be reviewed during every major architecture release.
-   Remain synchronized with the SRS, TDD, and enterprise architecture repository.
-   Reference only approved internal documents and recognized industry standards.
-   Be version-controlled alongside the Database Design Document.
-   Support auditability, regulatory compliance, and long-term maintainability of the Kaziforce platform documentation.

# 51\. DDD Amendments and Supplementary Specifications

This section supplements the base Database Design Document (Sections 1–50) following the SRS and TDD amendment review (SRS Section 23, TDD Section 23). It addresses three design gaps: the mobile offline-synchronization data model, a generic API-level idempotency store, and Database Traceability Matrix entries for the newly added SRS/TDD Section 23 requirements. All table and column designs in this section are additive and do not alter existing schemas.

## 51.1 Mobile Offline-Synchronization Data Model

Traces to SRS FR-MOB-001–007 and TDD Section 23.1. This subsection models the server-side tables required to support the mutation queue, delta-sync cursor, and conflict log specified in the TDD.

### 51.1.1 sync\_mutation\_queue

Stores client-originated offline mutations pending replay against authoritative services. Populated by the mobile client on reconnection; consumed and cleared by the relevant service after successful application.

**Column**

**Data Type**

**Description**

sync\_mutation\_id

UUID

Primary mutation identifier

tenant\_id

UUID

Tenant identifier

user\_id

UUID

Originating user

device\_id

VARCHAR(120)

Originating device identifier

entity\_type

VARCHAR(120)

Target entity (Project, Task, Message, etc.)

entity\_id

UUID

Target entity identifier

operation\_type

VARCHAR(50)

Create, Update, Delete

payload

JSONB

Mutation payload

idempotency\_key

VARCHAR(150)

Client-generated key, matches TDD-IDEM mechanism

client\_recorded\_at

TIMESTAMPTZ

Timestamp mutation was made offline

sync\_status

VARCHAR(50)

Pending, Syncing, Applied, Failed, Conflict

retry\_count

INTEGER

Retry attempts

last\_attempted\_at

TIMESTAMPTZ

Last sync attempt timestamp

applied\_at

TIMESTAMPTZ

Timestamp successfully applied

### 51.1.2 sync\_cursors

Tracks each device's last-synced position for delta-sync, per SRS FR-MOB-002 and TDD's GET /api/v1/sync?since={cursor} endpoint.

**Column**

**Data Type**

**Description**

sync\_cursor\_id

UUID

Primary cursor identifier

tenant\_id

UUID

Tenant identifier

user\_id

UUID

User identifier

device\_id

VARCHAR(120)

Device identifier

entity\_type

VARCHAR(120)

Entity scope of this cursor

last\_synced\_cursor

VARCHAR(200)

Opaque server-issued cursor value

last\_synced\_at

TIMESTAMPTZ

Last successful sync timestamp

### 51.1.3 sync\_conflict\_log

Records every detected sync conflict and its resolution, per TDD-MOB-005 through TDD-MOB-008. Required for audit trail on critical-field conflicts that require manual resolution.

**Column**

**Data Type**

**Description**

sync\_conflict\_id

UUID

Primary conflict identifier

tenant\_id

UUID

Tenant identifier

entity\_type

VARCHAR(120)

Conflicted entity type

entity\_id

UUID

Conflicted entity identifier

client\_version

JSONB

Client-submitted version of the record

server\_version

JSONB

Server's authoritative version at conflict time

conflict\_field\_class

VARCHAR(50)

NonCritical, Critical (per TDD-MOB-006/007)

resolution\_type

VARCHAR(50)

AutoLastWriteWins, ManualResolved, Rejected

resolved\_value

JSONB

Final value applied after resolution

resolved\_by\_user\_id

UUID

User who resolved (null if automatic)

detected\_at

TIMESTAMPTZ

Conflict detection timestamp

resolved\_at

TIMESTAMPTZ

Resolution timestamp

_Design Note: entity tables already carry a version integer column (optimistic locking, e.g. Section 6.9, 7.x, 8.x) which the sync engine uses for conflict detection per TDD-MOB-005. No changes to existing version columns are required._

## 51.2 Generic API Idempotency Store

Traces to SRS FR-ERR-005, FR-API-003 and TDD Section 23.2. Existing payment and wallet tables (Section 25) already carry per-record idempotency\_key columns. This subsection adds the generic, gateway-level idempotency cache that applies to any write endpoint, not only payments.

### 51.2.1 Primary Store: Redis

Per TDD-IDEM-002, the primary idempotency store is Redis, keyed and structured as follows. This is the authoritative mechanism for request-level deduplication; it is not a relational table.

Key: idemp:{tenant\_id}:{endpoint}:{idempotency\_key} Value: { status: "in\_progress"|"completed", response\_body, status\_code, created\_at } TTL: 24 hours (configurable per TDD-IDEM-002)

### 51.2.2 Durable Audit Table: api\_idempotency\_audit

While Redis serves live deduplication, a durable PostgreSQL audit record is retained for dispute resolution and compliance review beyond the Redis TTL window.

**Column**

**Data Type**

**Description**

idempotency\_audit\_id

UUID

Primary audit record identifier

tenant\_id

UUID

Tenant identifier

idempotency\_key

VARCHAR(150)

Client-supplied idempotency key

endpoint

VARCHAR(255)

Target endpoint (e.g. POST /api/v1/payments/release)

request\_hash

VARCHAR(128)

Hash of normalized request body, for mismatch detection

response\_status\_code

INTEGER

Cached response status code

duplicate\_attempt\_count

INTEGER

Number of duplicate requests observed

first\_processed\_at

TIMESTAMPTZ

First successful processing timestamp

last\_duplicate\_at

TIMESTAMPTZ

Most recent duplicate attempt timestamp

_Design Note: request\_hash allows detection of key reuse with a different payload, which should be rejected with a 422 conflict rather than served from cache, per FR-ERR-005._

## 51.3 Database Traceability Matrix Additions (Supplements Section 48/49.3)

The following entries extend the Database Traceability Matrix to cover SRS Section 23 and TDD Section 23 amendment requirements.

**SRS/TDD Requirement**

**Service**

**Database Object**

**Technology**

**Verification**

FR-MOB-001–007 (Mobile Offline/Sync)

Sync Service

sync\_mutation\_queue, sync\_cursors, sync\_conflict\_log

PostgreSQL

Mobile E2E, Sync Conflict Test

FR-ERR-005, FR-API-003 (Idempotency)

API Gateway

Redis idempotency cache, api\_idempotency\_audit

Redis + PostgreSQL

Integration, Chaos

FR-TEN-001–005 (Multi-Tenant Isolation)

All tenant-scoped services

tenant\_id column (existing, all primary tables)

PostgreSQL (row-level)

Security, Integration

NFR-AVL-007–011, NFR-DR-001–005 (SLA Targets)

All Services

Replication, backup, failover configuration

PostgreSQL, MongoDB, Redis

DR Drills, Failover Test

## 51.4 Retention Schedule Cross-Reference (Aligns SRS Section 23.9)

SRS Section 23.9 specifies entity-level retention periods (authentication logs, payment records, chat messages, AI logs, audit logs, KYC documents). These periods shall be implemented as seed data in the existing data\_retention\_rules table (Section 28.9 / 50.x), not as a separate mechanism.

**Data Category**

**Owning Service**

**Dataset(s)**

**Retention (Days)**

**Archive Before Delete**

**Anonymize Before Delete**

Authentication logs

Identity

auth\_logs

730

true

false

Payment transaction records

Finance

payments, transactions

2555

true

false

Chat and collaboration messages

Messaging

messages

365

false

true

AI interaction logs

AI Services

ai\_memory\_records, ai\_interaction\_logs

365

true

true

Audit logs

Audit

audit\_logs

2555

true

false

KYC/verification documents

Identity

kyc\_documents

1825

true

false

_These values populate data\_retention\_rules.retention\_days, archive\_before\_delete, and anonymize\_before\_delete for the listed datasets. Execution and audit follow the existing data\_retention\_executions workflow (Section 28.9) without schema changes._

## 51.5 Amendment Summary

This section closes the design gaps identified during DDD completeness review against the amended SRS and TDD:

-   Mobile offline-synchronization data model: sync\_mutation\_queue, sync\_cursors, sync\_conflict\_log (51.1).
-   Generic API idempotency store: Redis live cache plus api\_idempotency\_audit durable record, extending the existing per-record idempotency\_key columns in payment tables (51.2).
-   Database Traceability Matrix entries linking new SRS/TDD Section 23 requirements to concrete schema objects (51.3).
-   Retention schedule seed values aligned to the existing configurable data\_retention\_rules engine, replacing the standalone static table implied in SRS Section 23.9 (51.4).

**The Backend Engineering Document (BED) should implement the sync endpoints and idempotency audit logic against these schemas. The SRS Section 23.9 should be read as referencing this DDD's configurable retention engine as its implementation mechanism.**