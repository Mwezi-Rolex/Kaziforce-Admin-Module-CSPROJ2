**A Web-based Admin and Moderation Module for a Digital Workforce Marketplace Platform (Capstone)**

Student Name: Samuel Mugabi Mwesigwa

Student Admission Number: 167999

Class: ICS 4.1D

Supervisor: Dr Dickson Owour

An Informatics and Computer Science Project Proposal Submitted to the School of Computing

and Engineering Sciences in partial fulfilment of the requirements for the award of a

Degree in Bachelor of Science in Informatics and Computer Science

**School of Computing and Engineering Sciences**

**Strathmore University**

**Nairobi, Kenya**

**December 2026**

# Declaration and Approval

I declare that this project proposal has not been submitted to Strathmore University or any other University for the award of a Degree in Bachelor of Science in Informatics and Computer Science or any other Degree. To the best of my knowledge and belief, the research proposal contains no material previously published or written by another person except where due reference is made in the research proposal itself.

Student Admission Number: \_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

Sign: \_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_ Date: \_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

Supervisor's Signature:

Sign: \_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_ Date: \_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

# Acknowledgment

I would like to extend my heartfelt gratitude to my supervisor for his guidance, my friends for their support, my parents for their love, and my personal Lord and Saviour, Jesus Christ, for His grace and mercy that made all this possible.

# Abstract

Digital labour platforms operating in Sub-Saharan African emerging markets face a structural governance deficit that external regulation alone cannot resolve, lacking the tools to manage user accounts, moderate flagged content, or resolve disputes. To address this gap, this project proposes the development of a web-based Admin and Moderation System for a digital workforce marketplace platform that connects skilled workers with employers. The project utilizes an applied experimental research paradigm and follows an Agile software development methodology. The system is architected as a decoupled web application, utilizing React.js for the frontend Single Page Application, Node.js and Express for the REST API, and PostgreSQL hosted on an Azure Virtual Private Server for data persistence. Key features include JSON Web Token (JWT) role-based access control across three privilege tiers, a structured content moderation queue, and an INSERT-only immutable audit log to prevent data manipulation. Ultimately, the proposed system provides platform operators with a scalable, transparent, and auditable governance control plane that enhances trust and operational accountability.

# Table of Contents

[Declaration and Approval ii](#_Toc232117495)

[Acknowledgment iii](#_Toc232117496)

[Abstract iv](#_Toc232117497)

[Table of Contents v](#_Toc232117498)

[List of Figures viii](#_Toc232117499)

[List of Tables ix](#_Toc232117500)

[List of Abbreviations x](#_Toc232117501)

[Chapter One: Introduction 11](#_Toc232117502)

[1.1 Background 11](#_Toc232117503)

[1.2 Problem Statement 12](#_Toc232117504)

[1.3 General Objective / Aim 13](#_Toc232117505)

[1.3.1 Specific Objectives 14](#_Toc232117506)

[1.3.2 Research Questions 14](#_Toc232117507)

[1.4 Justification(s) 14](#_Toc232117508)

[1.5 Scope and Limitations 15](#_Toc232117509)

[1.5.1 Scope of the Project 15](#_Toc232117510)

[1.5.2 Limitation(s) in the Project 16](#_Toc232117511)

[1.5.3 Delimitations in the Project 16](#_Toc232117512)

[Chapter Two: Literature Review 17](#_Toc232117513)

[2.1 Introduction 17](#_Toc232117514)

[2.2 Challenges Faced by Digital Workforce Marketplace Platforms 17](#_Toc232117515)

[2.2.1 Governance Deficits in Platform Labour Markets 17](#_Toc232117516)

[2.2.2 Content Moderation at Scale 17](#_Toc232117517)

[2.2.3 Role-Based Access Control in Web Systems 17](#_Toc232117518)

[2.2.4 Auditability and Accountability Requirements 18](#_Toc232117519)

[2.3 Related Applications and Solutions 18](#_Toc232117520)

[2.3.1 Community Platform Moderation Systems 18](#_Toc232117521)

[2.3.2 Gig Economy Risk Management 18](#_Toc232117522)

[2.3.3 Enterprise RBAC Systems 19](#_Toc232117523)

[2.3.4 Machine Learning Flagging Systems 19](#_Toc232117524)

[2.4 Gaps in Existing Solutions 19](#_Toc232117525)

[2.5 Conceptual Framework 19](#_Toc232117526)

[Chapter Three: Development Methodology 21](#_Toc232117527)

[3.1 Introduction 21](#_Toc232117528)

[3.2 Research Paradigm 21](#_Toc232117529)

[3.2.1 Data Acquisition 22](#_Toc232117530)

[3.2.2 Data Preprocessing 22](#_Toc232117531)

[3.2.3 Model Training 22](#_Toc232117532)

[3.2.4 Model Validation and Testing 23](#_Toc232117533)

[3.3 Software Development Methodology 23](#_Toc232117534)

[3.3.1 Requirements Elicitation 24](#_Toc232117535)

[3.3.2 Sprint Planning 24](#_Toc232117536)

[3.3.3 Iterative Development 25](#_Toc232117537)

[3.3.4 Coding and Development 25](#_Toc232117538)

[3.3.5 Testing and Deployment 25](#_Toc232117539)

[3.3.6 Justification of the Methodology 26](#_Toc232117540)

[3.4 System Analysis and Design 26](#_Toc232117541)

[3.4.1 Use Case Diagram 26](#_Toc232117542)

[3.4.2 Class Diagram 27](#_Toc232117543)

[3.4.3 Entity Relationship Diagram (ERD) 27](#_Toc232117544)

[3.4.4 Database Schema 28](#_Toc232117545)

[3.4.5 System Architecture 28](#_Toc232117546)

[3.4.6 Wireframes 29](#_Toc232117547)

[3.5 System Development Tools and Techniques 29](#_Toc232117548)

[3.6 System Deliverables 31](#_Toc232117549)

[3.6.1 System Documentation 31](#_Toc232117550)

[3.6.2 Authentication Module 31](#_Toc232117551)

[3.6.3 User Management Module 32](#_Toc232117552)

[3.6.4 Content Moderation Queue Module 32](#_Toc232117553)

[3.6.5 Immutable Audit Logging Module 32](#_Toc232117554)

[3.6.6 System Settings Panel Module 33](#_Toc232117555)

[References 34](#_Toc232117556)

[Appendix 37](#_Toc232117557)

[Appendix A1: Time Schedule 37](#_Toc232117558)

[Appendix A2: Turn-It-In Report 38](#_Toc232117559)

# List of Figures

[Figure 2.1: Conceptual Framework 20](#_Toc232086473)

[Figure 3.1: Agile Software Process Template 24](#_Toc232086474)

# List of Tables

[Table 3.1: System Development Tools and Techniques 31](#_Toc232086218)

[Table A1: Project Timeline and Task Durations 37](#_Toc232086219)

# List of Abbreviations

API Application Programming Interface

DBMS Database Management System

ERD Entity Relationship Diagram

ILO International Labour Organization

JWT JSON Web Token

NDA Non-Disclosure Agreement

OOAD Object-Oriented Analysis and Design

RBAC Role-Based Access Control

REST Representational State Transfer

SDLC Software Development Life Cycle

SPA Single Page Application

TLS Transport Layer Security

SSA Sub-Saharan Africa

UML Unified Modelling Language

UUID Universally Unique Identifier

VPS Virtual Private Server

# Chapter One: Introduction

## 1.1 Background

Sub-Saharan Africa's labour market is the fastest-growing in the world. By 2023, Africa's total labour force had reached 576 million, surpassing India's 534 million, and projections indicate it will exceed one billion by 2043 (ISS African Futures, 2025). Despite this scale, structural deficiencies persist: informal employment accounts for 85.3% of total employment across Africa, compared to a global average of 57.8%, with Sub-Saharan Africa recording informal employment rates as high as 91.4% among female workers (ISS African Futures, 2025). In 2024, approximately 29.3% of employed Africans qualified as working poor, earning less than US$2.15 per day at purchasing power parity (ISS African Futures, 2025). These conditions create both a substantial demand for labour market intermediaries and a correspondingly high risk of exploitation, fraud, and governance failure in platforms that mediate the worker-employer relationship.

Digital labour platforms have emerged as a structural response to this fragmentation. According to the International Labour Organization, the number of such platforms grew from 193 in 2010 to over 1,070 by 2023, and the World Bank estimates that online platforms may engage up to 435 million active workers globally, a figure projected to exceed one billion by 2030 (Transnational Institute, 2025; ILO, 2021). In Sub-Saharan Africa, platform proliferation has occurred unevenly: the supply of labour from lower- and middle-income countries on global platforms is substantial, yet in 2023 nearly three in four young adult workers in the region remained in informal employment, with structural labour market constraints rather than workforce supply representing the primary barrier to formalisation (ILO, 2024). Regionally developed platforms that serve the African context directly, rather than routing labour supply through globally headquartered intermediaries, have therefore acquired particular significance.

Against this backdrop, the industry partner organisation is developing an AI-powered digital workforce marketplace designed to serve emerging markets across Africa, connecting skilled workers seeking opportunities with businesses requiring talent and execution capacity. The platform is composed of several interdependent functional modules addressing the full lifecycle of a labour marketplace transaction, including user authentication and identity management, profile and skills management, a gig marketplace, a ratings and reputation system, a notifications service, and the administrative governance layer that is the subject of this proposal. Taken together, these modules constitute a vertically integrated operating system for digital workforce management.

The governance layer of a platform of this nature is not an optional feature. Gillespie (2018) establishes that content moderation and administrative oversight are constitutive functions of any platform that mediates user-generated activity: they define what the platform permits, who may participate, and how disputes are resolved. In the context of a workforce marketplace, these functions are amplified. A platform that connects workers with employers in markets characterised by high informality and weak institutional trust bears a heightened responsibility to enforce its own policies, manage user accounts with integrity, and maintain an auditable record of operator decisions. Without a centralised administrative layer, platform operators lack the mechanisms to fulfil these responsibilities, and the platform's trust infrastructure, upon which the entire marketplace model depends, is structurally incomplete.

The administrative governance of web-based platforms is further complicated by the scale and speed at which user-generated content and interactions accumulate. Gorwa et al. (2020) demonstrate that platforms lacking structured moderation infrastructure experience measurable increases in harmful content persistence and user attrition, and identify the absence of a human-in-the-loop moderation system as a root cause of policy enforcement failures at scale. For a workforce marketplace processing applications, reviews, complaints, and account activities across a growing user base in multiple African markets, these risks are not hypothetical: they represent the conditions under which the platform will operate from its first deployment. The design and implementation of a robust admin and moderation module is, therefore, a prerequisite for responsible operation, not a subsequent enhancement.

## 1.2 Problem Statement

The platform currently lacks a centralised operator-facing governance layer. The existing module architecture addresses participant-facing functionality exclusively: workers and employers can create accounts, post and apply for gigs, rate each other, and receive notifications. No module provides platform operators with the tools necessary to manage user accounts, review and act on flagged content, or produce an auditable record of administrative decisions. This is a structural gap, not a feature deferral: the moderation queue, role-based access controls, and audit logging that constitute an administrative system cannot be retrofitted onto the participant-facing modules without architectural rework.

The effects of this gap are threefold. First, user account management is uncontrolled: there is no interface through which an operator can suspend a fraudulent account, reassign roles, or investigate account-level anomalies. In a marketplace serving labour markets with high rates of informality and limited identity verification infrastructure, this creates a direct vector for fraud and impersonation. Second, content disputes have no resolution path: flagged gig listings, abusive reviews, or disputed transactions accumulate without a structured process for review, approval, rejection, or escalation. Third, operator decisions are not logged: without an immutable audit trail, the platform cannot demonstrate accountability to its users, its industry partners, or any future regulatory inquiry.

The consequences of absent platform governance are documented in the literature. Gorwa et al. (2020) find that platforms without moderation infrastructure sustain harmful content at significantly higher rates than those with structured human review systems, and associate this with increased user attrition. Gillespie (2018) further notes that the absence of visible governance mechanisms erodes user trust in the platform as an institution, independent of the quality of the underlying service. For a platform operating in markets where digital trust is nascent and reputational damage is difficult to reverse, these consequences represent an existential risk to platform adoption. The central question this proposal addresses is therefore: how should a web-based administrative and moderation system be designed and developed to provide the platform's operators with the governance tooling necessary for effective user management, content moderation, and audit accountability?

## 1.3 General Objective / Aim

To develop and validate a web-based Admin and Moderation System that provides the platform's operators with governance tooling for user management, content moderation, and audit logging.

### 1.3.1 Specific Objectives

The following specific objectives guide the achievement of the general objective:

**i.** To examine the governance and moderation challenges faced by digital workforce marketplace platforms in emerging markets.

**ii.** To review existing administrative and moderation systems and identify gaps relevant to the platform context.

**iii.** To design a role-based administration and content moderation system architecture for the platform.

**iv.** To develop and validate a web-based Admin and Moderation System that provides the platform's operators with governance tooling for user management, content moderation, and audit logging.

### 1.3.2 Research Questions

The following research questions correspond directly to the specific objectives listed above:

**i.** What governance and moderation challenges do digital workforce marketplace platforms in emerging markets face?

**ii.** What gaps exist in current administrative and moderation solutions that are relevant to a digital workforce marketplace?

**iii.** How should a role-based administration and moderation system be architected for a digital workforce marketplace platform?

**iv.** How effective is the developed Admin and Moderation System in enabling platform operators to manage users, moderate content, and maintain an auditable record of administrative decisions?

## 1.4 Justification(s)

From an academic standpoint, this proposal addresses a gap in the literature on administrative governance systems for digital labour platforms in emerging market contexts. The majority of existing research on platform moderation and administrative systems is grounded in the context of consumer social media platforms operating in high-income economies (Gillespie, 2018; Gorwa et al., 2020). The specific governance requirements of a workforce marketplace serving African markets, where informality rates exceed 85% and institutional trust in labour intermediaries is low, remain understudied. This project contributes a designed and tested system architecture to that gap and frames the administrative module within a broader multi-component platform, providing a replicable reference for future capstone and industry projects of similar scope.

From an industry standpoint, the Organisation requires this module as a prerequisite for responsible deployment. A digital marketplace that mediates employment relationships in contexts of high informality and limited regulatory oversight cannot operate without user account management, policy enforcement tooling, and an auditable record of operator decisions. Without the Admin and Moderation System, the platform would be unable to fulfil its own terms of service, respond to disputes between workers and employers, or demonstrate accountability to the industry partners who commissioned the broader system. The module is not an enhancement to a functioning platform; it is a structural requirement for the platform to function as designed.

From a social standpoint, platform governance directly affects the fairness and dignity of labour market outcomes for workers. In informal labour markets where workers have limited recourse to institutional protections, the platform itself constitutes the primary governance mechanism. A platform that cannot manage fraudulent accounts, moderate abusive content, or log operator decisions provides workers with no meaningful protection against exploitation. This project therefore serves a social function beyond its technical scope: by equipping the platform with a robust administrative layer, it contributes to the conditions under which digital labour platforms can serve as instruments of labour market formalisation rather than vectors for its continuation.

## 1.5 Scope and Limitations

### 1.5.1 Scope of the Project

The system is a web-based administrative module within the platform, accessible via a standard browser without client-side installation. Three privilege tiers are implemented: Super Admin, who holds full platform control; Moderator, who manages the content queue and user-level actions; and Viewer, who has read-only access to dashboard analytics and logs. Four functional areas are delivered: user management (account CRUD, role assignment, suspension); content moderation queue (flag review with approve, reject, and escalate workflows); audit logging (INSERT-only record of all operator actions with date-range filtering and CSV export); and system settings (feature toggles and configuration key/value management). The authentication module, covering login, JWT session management, and role-gated route protection, is included as supporting context to visualise the complete functional loop of the system. The system is developed and evaluated within the industry partner's development environment.

### 1.5.2 Limitation(s) in the Project

The system is evaluated within the industry partner's development environment. Production-scale load testing, which would require a live user base generating real platform activity, is outside the scope of this proposal phase. Data used for system testing is synthetic. Real user and activity data from the industry partner is governed by a Non-Disclosure Agreement; it is not available for use in development or testing prior to NDA execution. The machine learning behavioural flagging component, which would auto-triage incoming moderation flags by risk score using a trained classifier, is architected into the system design but not implemented in Phase 1. It is reflected in the entity relationship diagram and system architecture as a Phase 2 extension.

### 1.5.3 Delimitations in the Project

The following areas are explicitly excluded from the scope of this project. The admin and moderation system is web-based only; a native mobile admin interface is not included. Third-party trust-and-safety API integrations, such as automated content classifiers, are excluded; moderation logic is human-in-the-loop and rule-based in this phase. Real-time chat moderation is handled by a separate module in the broader platform architecture and falls outside this project's boundary. Financial transaction oversight, including payment processing, disbursement management, and financial dispute resolution, are functions of separate platform modules and are not addressed here. Automated user verification against external identity databases is handled by the platform's authentication module and is similarly out of scope.

# Chapter Two: Literature Review

## 2.1 Introduction

The rapid proliferation of digital workforce marketplaces necessitates a critical examination of the administrative architectures that govern them (ILO, 2021). This chapter reviews literature concerning governance challenges in digital labour platforms, content moderation systems, role-based access control (RBAC), and auditability (Gorwa et al., 2020). It also evaluates existing administrative solutions, highlights critical architectural gaps, and discusses the conceptual framework for a unified, web-based administrative module (Altman and Altman, 2026).

## 2.2 Challenges Faced by Digital Workforce Marketplace Platforms

### 2.2.1 Governance Deficits in Platform Labour Markets

Digital labour platforms often operate with severely limited regulatory oversight, effectively making the platform the de facto regulatory authority responsible for establishing rules and enforcing compliance (Shobhit, 2025). Trust deficits between workers and employers are a primary barrier to market matching, especially in emerging markets (ILO, 2021). Because malicious actors can commit fraud or abuse without formal recourse, platforms require rigorous internal governance tooling to resolve disputes equitably and establish sustainable trust (Altman and Altman, 2026).

### 2.2.2 Content Moderation at Scale

Content moderation actively defines a platform's operational culture and economic viability (Gorwa et al., 2020). Unlike social media moderation, which primarily filters conversational toxicity, workforce platforms must moderate transactional and professional content, such as credentials, portfolio submissions, and gig deliverables (Ticona, 2022). Because a false positive could result in the suspension of a worker's primary income, these platforms require hierarchical, human-in-the-loop workflows explicitly designed for high-stakes professional dispute resolution (Shobhit, 2025).

### 2.2.3 Role-Based Access Control in Web Systems

To execute administrative duties securely, a formalized authorization architecture is required (Ferraiolo and Kuhn, 1992). RBAC abstracts permissions into logical roles based on organizational functions rather than assigning them directly to users (Ferraiolo et al., 2001). By enforcing the principle of least privilege and separation of duties, RBAC prevents unilateral system abuse, accidental data corruption, and unauthorized access to sensitive user data (Ferraiolo et al., 2001).

### 2.2.4 Auditability and Accountability Requirements

Genuine administrative accountability requires that every operator action is permanently recorded and strictly non-repudiable (Han et al., 2024). Traditional mutable application logs are insufficient, as they can be easily altered by compromised accounts or malicious insiders (Han et al., 2024). Systems must utilize immutable, append-only audit trails to provide a flawless forensic record of administrative actions, which is a structural prerequisite for proving platform accountability (Han et al., 2024).

## 2.3 Related Applications and Solutions

A comprehensive review of existing administrative tooling, moderation architectures, and security frameworks reveals how the industry currently approaches platform governance. Analyzing these related solutions highlights both proven architectural patterns that should be incorporated and significant functional gaps that the proposed system must actively overcome to serve a digital workforce marketplace effectively.

### 2.3.1 Community Platform Moderation Systems

Bajpai and Chandrasekharan (2025) provide a robust empirical analysis of Reddit's moderation queue (the "modqueue"), surveying 110 moderators overseeing more than 400 distinct subreddits to understand how governance tooling operates in practice. However, their architecture is explicitly optimized for short conversational content rather than structured, high-stakes transactional records, and they typically lack immutable audit trails (Gorwa et al., 2020).

### 2.3.2 Gig Economy Risk Management

Research on gig platforms highlights how moderation acts as a mechanism of labour control and risk management (Ticona, 2022). While effective for understanding algorithmic fairness, these systems often lack the integrated operator-facing tooling required for administrators to effectively manage complex user accounts and log decisions immutably in a production environment (Altman and Altman, 2026).

### 2.3.3 Enterprise RBAC Systems

Enterprise-grade RBAC systems offer highly complex and secure permission modeling (Ferraiolo et al., 2001). However, they introduce configuration complexity disproportionate to the needs of a mid-scale workforce marketplace, and they operate entirely separately from content moderation workflows, creating severe coordination overhead (Ferraiolo and Kuhn, 1992).

### 2.3.4 Machine Learning Flagging Systems

Machine learning anomaly detection systems are highly effective at auto-triaging fraudulent transactions and toxic text (Ramakrishnan et al., 2019). While their application to workforce marketplace governance is not yet an off-the-shelf standard, they present a highly viable future integration for moderation pipelines once sufficient data is accumulated (Gorwa et al., 2020).

## 2.4 Gaps in Existing Solutions

A critical synthesis reveals that existing solutions suffer from severe fragmentation, treating moderation and administration as fundamentally uncoupled concerns (Altman and Altman, 2026). Platforms are often forced to use disjointed systems that create data silos and operational inefficiencies (ILO, 2021). Additionally, current access control implementations are either too fragile or overly complex, failing to seamlessly integrate with daily moderation workflows (Ferraiolo et al., 2001). Finally, most moderation tools lack the immutable audit logging necessary to guarantee non-repudiable accountability for high-stakes administrative decisions (Han et al., 2024).

## 2.5 Conceptual Framework

![](./images/image0.png)The proposed Admin and Moderation System models the architecture as a continuous, secure pipeline of inputs, processing, and outputs (Chen, 1976). Inputs include new user registrations, gig listings, and flagged reports entering the system from the platform ecosystem (Ticona, 2022). The processing stage utilizes RBAC to ensure all requests are gated by the operator's assigned privilege level before state changes are authorized (Ferraiolo et al., 2001). Utilizing PostgreSQL's INSERT-only table constraints, enforced by explicitly withdrawing UPDATE and DELETE privileges from the application database user, provides a highly performant mechanism for immutability without requiring a separate, disjointed logging microservice (Han et al., 2024). Figure 2.1 illustrates the flow of HTTP requests from platform participants into the API gateway, routed through the RBAC middleware and moderation engine, and resulting in permanent database records (Chen, 1976).

Figure 2..: Conceptual Framework

# Chapter Three: Development Methodology

## 3.1 Introduction

This chapter focuses on the methodology applied in the design, implementation, and evaluation of the web-based Admin and Moderation System for the digital workforce marketplace platform. Specifically, this chapter details the applied research paradigm, the software development life cycle framework, and the system analysis and modelling methodologies utilised to transform high-level platform requirements into a secure, production-grade system architecture. It also outlines the functional and non-functional requirements, the development tooling, the domain of execution, and the specific deliverables that constitute the complete functional control plane of the platform. Additionally, the chapter identifies the diagrams to be used in the system design phase; these will be defined and described within this chapter and drawn in the subsequent design phase of Semester 2, in accordance with established UML conventions (Rumbaugh et al., 2003). By establishing a rigorous engineering methodology, this chapter ensures that the developed module provides stakeholders with a resilient, transparent, and accountable trust infrastructure capable of protecting platform participants and scaling with operational growth.

## 3.2 Research Paradigm

This study adopts an applied, experimental engineering paradigm to address the operational governance deficits observed in unmoderated digital labour platforms. The experimental approach is required because governance module components, particularly the authorization middleware and the immutable logging pipeline, exhibit deterministic behavioural constraints that must be systematically validated under controlled test conditions to confirm correctness. The paradigm structures the project into clearly separated phases of data acquisition, preprocessing, model training, and validation, ensuring that every architectural decision is empirically verified before the system is delivered to the industry partner. While the machine learning behavioural flagging classifier is designated as a Phase 2 architectural extension, Phase 1 establishes the empirical, human-in-the-loop pipeline necessary to ingest data, enforce strict rule-based workflows, and collect the labelled datasets required for future classifier training.

### 3.2.1 Data Acquisition

Primary data collection involves mapping the industry partner's platform terms of service, regional compliance guidelines, and established content policy frameworks into deterministic system rules that govern the moderation queue's routing logic. Due to the strict Non-Disclosure Agreement protecting live user data from the industry partner, development and testing rely exclusively on high-fidelity synthetic datasets generated within the development environment. A data generation tool will be constructed to populate the persistence layer with simulated user profile records containing representative professional credentials, roles, and geographic metadata; transactional gig listings containing multi-variable text fields prone to simulated policy violations; crowdsourced moderation flags generated with varying levels of user-reported severity; and mock behavioural anomalies representing compromised accounts, login spikes, and payment circumvention signatures. These synthetic payloads are structurally equivalent to live production data and are sufficient for the purposes of functional and security testing at this phase.

### 3.2.2 Data Preprocessing

The acquired synthetic payloads undergo normalisation and structuring before interacting with the application server or persistence layers. Raw string data and simulated user reports are mapped into structured JSON objects to ensure strict parsing compatibility within the Node.js API gateway. The preprocessing pipeline executes data cleaning routines to strip null values from non-optional fields, enforces standardized UTC formatting across all transactional timestamps, and maps qualitative parameters such as severity categories and account standing types into standardized numeric identifiers or defined database enumerations. Additionally, operator authorization attributes are translated into cryptographically signable claims embedded within user session metadata, establishing the token payload structures required by the JWT-based authorization middleware.

### 3.2.3 Model Training

In Phase 1 of the system development lifecycle, the operational focus centres on rule-based validation and human-in-the-loop triage flows; active training of complex neural networks or isolation forest models is therefore deferred to Phase 2. This section models the deterministic execution logic of the system's rule layer. The system trains its logic handlers to intercept incoming HTTP payloads and automatically categorise reports based on a static severity-scoring matrix derived from the policy mapping conducted during data acquisition. This architecture mimics an automated classification pipeline, organizing flagged records into indexed database structures optimised for future algorithmic model ingestion once live operational labels are secured from production usage. The data structures and API ingestion paths are designed according to vector and matrix standards that will permit seamless integration of prospective anomaly classifiers in Phase 2 without requiring architectural rework.

### 3.2.4 Model Validation and Testing

Validation of the system architecture is achieved through rigorous unit, integration, and security testing matrices within the development environment. Rather than evaluating statistical accuracy scores such as F1-scores or loss curves, validation in this phase measures system determinism and authorization strictness. The testing framework systematically triggers simulated edge cases to verify that all incoming flags exceeding the defined risk threshold are correctly routed to the high-priority moderator queue, that middleware interceptors successfully block unauthorized route execution attempts across all protected API endpoints, and that the audit logging engine captures every state change without data loss or record corruption. For the immutability verification specifically, database-level tests will intentionally issue unauthorized UPDATE and DELETE commands against the audit log table to empirically confirm that the write-once constraint holds under adversarial conditions.

## 3.3 Software Development Methodology

The implementation of the Admin and Moderation System follows an Agile software development methodology, executed across a ten-week sprint cycle. This iterative approach is selected because platform governance requirements are closely tied to evolving marketplace interactions, necessitating rapid prototyping, continuous feedback loops, and incremental feature delivery to mitigate security deployment risks. The Agile framework decomposes the broad architectural requirements of the governance module into independent, manageable feature sets that can be iteratively built, reviewed, and enhanced. This ensures that unclear platform requirements are resolved through continuous stakeholder feedback while maintaining a predictable path toward project completion aligned with the four formal ![](./images/image1.png)submission milestones of the capstone timeline.

Figure 3..: Agile Software Process Template

### 3.3.1 Requirements Elicitation

The development process initiates with structured requirements elicitation sessions involving the industry partner's technical directors, the operational team, and a review of the existing participant-facing module architecture. Functional business requirements are captured in the form of Agile epics and detailed user stories. These stories define the exact administrative capabilities required by each operator persona; for example, an explicit story specifies that a Moderator must be able to safely escalate a high-stakes transaction dispute to a Super Admin without altering the underlying historical logs. Non-functional requirements governing performance thresholds, security expectations, and availability targets are captured separately and mapped against specific architectural decisions in the tools and techniques section.

### 3.3.2 Sprint Planning

The ten-week engineering lifecycle is structured into five distinct two-week sprints. Each sprint begins with a planning session where deliverables are pulled from the product backlog, estimated using story points, and mapped against the four formal milestone submissions mandated by the capstone timeline. Tasks are systematically prioritized based on logical component dependencies: establishing the database schema and JWT-based authentication middleware is scheduled in the initial sprint, as the user management and content moderation queue modules depend directly on a working access control layer.

### 3.3.3 Iterative Development

Each two-week sprint focuses on building out functional slices of the system. Development runs concurrently across the stack: backend REST API endpoints are developed in Node.js and Express, while the corresponding React user interface views are constructed simultaneously. This parallelism ensures that at the conclusion of every sprint cycle, a functional, testable increment of the administration panel is available for demonstration to the industry partner within the staging environment. Sprint reviews provide an immediate feedback loop, ensuring that user experience deficiencies, reporting layout issues, or data visualization anomalies are captured early and scheduled for refinement in the subsequent sprint backlog.

### 3.3.4 Coding and Development

Software engineering tasks conform strictly to the established architectural specifications. Frontend engineers construct declarative, reusable components in React.js while backend engineers develop modular, role-gated middleware chains within Node.js to manage incoming asynchronous input-output requests. Security configurations, route gates, and database constraints are manually implemented and code-reviewed before merging. Database operations are wrapped in strict transactional statements to prevent partial writes, and application configurations are externalized into environment variables to eliminate production credential leakage. All version control activity follows the Git feature-branch workflow with conventional commit prefixes.

### 3.3.5 Testing and Deployment

Code quality is enforced through a multi-tiered test plan prior to each sprint deployment. Sanity checks confirm the codebase compiles without syntax regressions. Functional black-box testing verifies user management operations and moderation queue routing. Performance logging monitors API response times under simulated concurrent request loads. Once all testing criteria are met, the verified code increment is deployed to the Azure Virtual Private Server, and the staging environment is made available for industry partner review. The final deployment prior to the panel submission will be preceded by a complete end-to-end walkthrough of all three operator role scenarios.

### 3.3.6 Justification of the Methodology

The Agile methodology is selected for this project because the governance module's requirements are inherently tied to the operational realities of a live marketplace platform that is itself under active parallel development. Unlike a Waterfall approach, which would demand a complete, frozen specification before implementation begins, Agile accommodates the reality that the requirements of an administrative module are shaped by the participant-facing modules it governs, several of which are being developed concurrently by separate teams. The iterative sprint structure allows the admin module to adapt to interface changes in the broader platform without requiring a full architectural rework. Furthermore, because the industry partner's technical directors are available for weekly consultations, the sprint review cycle provides a structured mechanism to incorporate their domain expertise into each development iteration, reducing the risk of delivering a technically correct but operationally misaligned governance system (Meiryani, 2019).

## 3.4 System Analysis and Design

System analysis and design bridges the gap between raw business requirements and structured software implementation. The module utilises Object-Oriented Analysis and Design (OOAD) principles, breaking the platform architecture down into modular, highly reusable objects and centralized controllers. This approach guarantees system scalability, structural security, and maintainability. OOAD is particularly appropriate for this project because the administrative domain contains clearly defined, real-world entities (users, roles, flags, audit events, and settings) that map naturally onto object-oriented classes and relational database tables (Sankar, 2016). The following subsections define the functional and non-functional requirements and describe each diagram to be produced in Semester 2.

### 3.4.1 Use Case Diagram

The Use Case Diagram defines the operational boundaries of the administration system, mapping the interactions between the three discrete internal operator personas and the core platform workflows. The Viewer possesses restricted, read-only permissions targeting global system monitoring functions; this actor interacts exclusively with the dashboard analytics interface and view-only audit log search filters. The Moderator acts as the primary human-in-the-loop policy enforcer; this actor holds explicit authorization to interact with the content moderation queue by executing approve, reject, and escalate actions, and can perform standard user management operations including account suspension of non-administrative users. The Super Admin functions as the absolute system authority; this actor bypasses standard operational constraints to execute structural actions including direct role assignment across all user tiers, permanent account termination, and global system configuration modification via the settings panel. \`

### 3.4.2 Class Diagram

The Class Diagram provides a static structural view of the object-oriented backend codebase. It details the internal properties, public methods, and structural relationships of the core logic classes. The central entities include UserAccountManager, which handles the execution logic for account state mutations such as suspensions and role assignments; ModerationEngine, which models the programmatic processing of user-generated content flags including the routing, prioritisation, and escalation workflows; and AuditLogger, an isolated service class dedicated to formatting and writing non-repudiable governance events directly to the persistence layer. Supporting classes include AuthController, responsible for credential validation and JWT issuance, and SettingsController, which manages the read and write operations for platform configuration keys. Each class explicitly declares its private attributes and public validation methods to enforce strict encapsulation and prevent architectural leakage between modules.

### 3.4.3 Entity Relationship Diagram (ERD)

The ERD illustrates the relational database topology governing the administrative module, mapping the logical entities and structural cardinality within the persistence layer. The database architecture maps a one-to-many relationship between the users table and the flags table, linking each flagged content item back to the reporting user. The roles and permissions tables are bridged by a role\_permissions junction table, while users are assigned to roles via a user\_roles junction table. The audit\_log entity is structurally isolated from application cascade paths: log rows persist independently of account deletions to prevent retroactive data manipulation, implementing the immutability requirements established in the literature review (Yavuz, 2018; Han et al., 2024). The system\_settings table holds key/value configuration pairs without relational dependencies on the user model, ensuring settings can be read and written without user context.

### 3.4.4 Database Schema

The physical schema maps directly to the relational entities described in the ERD and is optimised for relational integrity, query performance, and append-only constraints. Standard primary keys are structured as Universally Unique Identifiers to prevent resource enumeration attacks. Indexing strategies are established on the foreign key attributes most frequently used in filtered queries, specifically flag\_status and log\_timestamp, to ensure optimised execution plans during date-range filtering and dashboard analytics generation. The audit\_log table schema enforces a default server-generated UTC timestamp on the created\_at column, preventing retroactive timestamp manipulation by the application layer. Unique constraints are applied to user email fields, and soft-deletion flags are used in place of hard deletes on user records to preserve referential integrity across related tables.

### 3.4.5 System Architecture

The system implements a decoupled, three-tier web application architecture designed to separate presentation, logic, and data persistence layers. The Presentation Layer consists of a web-based Single Page Application built using React.js, communicating exclusively via asynchronous JSON payloads over HTTPS. The Application Layer consists of a Node.js runtime hosting an Express application router that acts as the centralised control plane; every incoming request is passed through a sequential pipeline of authentication verification, rate-limiting, and RBAC authorisation middleware before reaching the controller logic. The Persistence Layer consists of a PostgreSQL instance configured with explicit role permissions that enforce row-level security boundaries and write-once data access paths on the audit log. The production environment is hosted on an Azure Virtual Private Server with Nginx deployed as a reverse proxy, managing TLS termination, load distribution, and interception of malicious transport-layer activity.

### 3.4.6 Wireframes

Wireframes provide a structural user interface blueprint, visually mapping out the data hierarchy, navigation layout, and operator interaction patterns of the administrative panel before implementation begins. The design establishes a persistent left-hand navigation rail providing instant traversal between the four primary functional domains: Dashboard Analytics, User Control Centre, Moderation Queue, and Audit Explorer. Critical destructive actions such as permanent account bans or system feature toggles are explicitly gated behind two-step confirmation modals, eliminating the risk of accidental state changes during high-pressure moderation sessions.

## 3.5 System Development Tools and Techniques

The technical stack is selected to maximise data integrity, align with the broader platform ecosystem architecture, and handle high-volume, I/O-bound security events efficiently. Table 3.1 presents each tool and technique, the system section it serves, and its specific purpose within the architecture.

**Tool/Technique**

**Section**

**Description**

React.js (Vite)

Frontend

Component-driven UI framework for building the admin dashboard, moderation queue, and audit log interfaces. Vite provides instantaneous hot module replacement during development, minimising iteration overhead.

Node.js + Express

Backend API

Asynchronous, non-blocking runtime for handling concurrent operator requests. Express provides a lightweight routing framework for assembling sequential middleware pipelines for authentication, rate-limiting, and RBAC checks.

PostgreSQL

Database

Enterprise-grade relational DBMS. Provides ACID-compliant transaction guarantees critical for complex account state changes. INSERT-only constraints on the audit\_log table enforce governance-grade immutability.

JSON Web Tokens (JWT)

Authorization

Stateless token-based session management. Signed JWT tokens carry encrypted role claims validated by middleware on every protected API request, enforcing privilege boundaries without server-side session storage.

bcrypt

Security

Password hashing algorithm applied to all operator credentials before database storage. Prevents plaintext credential exposure in the event of a database breach.

Jest + Supertest

Testing

Unit and integration testing framework for all Node.js API route handlers. Target line coverage is 80%. Supertest provides HTTP-level request simulation for black-box endpoint testing without a running server instance.

Figma

UI Design

High-fidelity wireframing tool for all administrative interface screens. Double Diamond UX design process applied to define operator workflows prior to implementation.

Git + GitHub

Version Control

Feature-branch workflow with conventional commit prefixes (feat:, fix:, test:, docs:, chore:). Repository tagged at v1.0.0 for the final submission.

Azure VPS + Nginx

Deployment

Azure Virtual Private Server provides institutional-grade hosting and firewall configuration. Nginx acts as a reverse proxy for TLS termination, load distribution, and security header injection.

Agile (Scrum-lite)

Methodology

Five two-week sprints aligned to formal submission gates. Sprint planning, review, and retrospective cycles ensure continuous stakeholder alignment.

Table 3.1: System Development Tools and Techniques

## 3.6 System Deliverables

The project provides the industry partner with a fully verified, vertically integrated platform control plane comprising five core software modules alongside production-grade operational documentation.

### 3.6.1 System Documentation

A comprehensive technical specification is delivered alongside the physical codebase. This documentation includes exhaustive architectural maps detailing internal component topologies and server routing configurations, a fully documented OpenAPI/Swagger collection outlining every available API endpoint with its required request payloads and expected response models, step-by-step infrastructure deployment guides, environment configuration schemas, and data migration instructions for system setup. An operator manual is also provided, outlining standard moderation procedures, escalation criteria, and risk mitigation strategies for the three operator tiers.

### 3.6.2 Authentication Module

The platform access loop is secured via a stateless authentication module. This component manages secure operator login pathways, hashes credentials using bcrypt, and signs compact JWT tokens containing encrypted role claims upon successful identification. It handles token refresh lifecycles, safely invalidates compromised sessions, and provides the baseline security context required to protect all administrative actions across the platform. The authentication module is included as supporting context to visualise the complete functional loop of the governance system, consistent with the scope defined in Chapter 1.

### 3.6.3 User Management Module

This module provides high-tier operators with direct control over the platform's participant profiles. It features search controls to isolate user accounts by name, role, or account status, interfaces to update account privilege states, and tools to execute temporary suspensions or permanent bans against malicious or fraudulent profiles. Role assignment functionality is restricted to the Super Admin tier, while Moderators may perform standard suspensions. Every action executed within this module is automatically captured by the Audit Logging Module, ensuring a complete and immutable record of all account state transitions.

### 3.6.4 Content Moderation Queue Module

The moderation pipeline surfaces user-flagged gig listings, abusive reviews, portfolio violations, and disputed transactions in a unified, prioritised queue. Each queue entry displays historical metadata alongside the reported content to give operators complete operational context before making a decision. Operators can approve items to maintain their visibility on the platform, reject entries to immediately remove them from the public marketplace, or escalate complex structural disputes to a senior supervisor for deeper review. Bulk approve and bulk reject actions are supported to reduce operator workload during high-volume flag events. Every moderation action is captured in the audit log.

### 3.6.5 Immutable Audit Logging Module

The audit logging component acts as the system's permanent record of administrative activity. It automatically captures every operator action, tying each event to a unique operator identifier, a server-generated UTC timestamp, the action type, and the target entity identifier. The module is implemented as an INSERT-only table with no UPDATE or DELETE privileges granted to the application database user, satisfying the non-repudiation requirements established in the literature review (Yavuz, 2018). The module provides a read-only interface with date-range and actor filters, and exports filtered results as CSV files for audit compliance and industry partner review.

### 3.6.6 System Settings Panel Module

The system settings panel enables Super Admins to dynamically modify platform-wide operational states through a key/value configuration interface. Feature toggles allow specific platform functionalities to be enabled or disabled without a code deployment, and configuration values such as moderation queue thresholds or session timeout durations can be adjusted through the interface. All settings changes are captured in the audit log, ensuring that configuration modifications are traceable, attributable, and non-repudiable.

# Chapter Four: System Analysis, Design and Architecture

## 4.1 Introduction

This chapter presents the analysis, design, and architecture of the Web-based Admin and Moderation System enhanced with a severity-aware hybrid machine learning threat detection engine. It outlines the system requirements, user interactions, data flow, and structural components that define how the system works. To illustrate these aspects, the chapter uses key design diagrams such as the use case diagram, sequence diagram, ERD, and class diagram, which show how users interact with the system, how processes flow, and how data is organized internally.

## 4.2 System Analysis and Design

The system analysis identifies the challenges in traditional platform moderation processes and outlines the functional and non-functional requirements needed to address them. Based on this analysis, the system design defines how the solution will operate, how users will interact with it, and how data will be organized (Mahadik et al., 2023).

This section presents the main design diagrams: the use case diagram shows system functions and user interactions, the sequence diagram illustrates the flow of activities, the ERD outlines the database structure, and the class diagram represents the system’s objects, attributes, and relationships (Gregory et al., 2020).

## 4.2.1 Use Case Diagram

The use case diagram below highlights the functional requirements of the system, shows how the administrative operators (Super Admin, Moderator, and Viewer) interact with the system, and what is needed to access the current system. To clarify and organize the system's requirements by describing "who" can do "what" with the system, the Use Case Diagram is provided.

![](./images/image2.png)

## 4.2.2 Sequence Diagram

Sequence Diagrams are interaction diagrams that show how system operations are performed. They illustrate the flow of messages between system components in a time-ordered manner using a vertical time axis. In the Admin and Moderation System, the operator first logs into the platform and gains access to the dashboard. They can then select a flagged item from the moderation queue; the system coordinates with the machine learning inference engine to classify threats and log decisions immutably in the PostgreSQL database. The administrator reviews the submissions, updates the status, and once verified, the system commits the non-repudiable audit trail to the database.

![](./images/image3.png)

## 4.2.3 Entity Relation Diagram

An entity relationship diagram (ERD), also known as an entity relationship model, is a graphical representation that depicts relationships among people, objects, places, concepts or events within an information technology (IT) system.

![](./images/image4.png)For the Web-based Admin and Moderation System, the ERD employs the Crow's Foot notation (also known as Information Engineering notation). This notation is chosen for its superior readability and intuitive depiction of cardinality (one-to-many, many-to-many), simplifying the comprehension of the complex relationships required by the access control rules, content moderation pipelines, and immutable audit logs.

## 4.2.4 Class Diagram

This diagram depicts the main types of users and other objects involved in the system, represents their attributes (characteristics) and their behaviours in form of classes, and clearly shows the relationships between the different objects (inheritance, composition, etc.).

![](./images/image5.png)

## 4.2.5 Activity Diagram

## ![](./images/image6.png)4.2.6 System Architecture

![](./images/image7.png)

## 4.2.7 Wireframes

Wireframes provide a structural interface blueprint for the four primary operator-facing screens: the dashboard overview, the moderation queue, the user management screen, and the audit log explorer. Each wireframe establishes the persistent left-hand navigation rail and gates destructive actions, such as permanent account bans, behind a two-step confirmation pattern.

![](./images/image8.png)

Figure 4.6: Login Page

![](./images/image9.png)

Figure 4.7: Dashboard overview wireframe, showing summary metric cards and a recent activity feed.

![](./images/image10.png)

Figure 4.8: User management wireframe, showing a searchable account table with a role assignment and suspension panel.

![](./images/image11.png)

Figure 4.9: Moderation queue wireframe, showing a filterable table with approve, reject, and escalate actions and a bulk action toolbar.

![](./images/image12.png)

Figure 4.10: Audit log explorer wireframe, showing date-range filters, a paginated read-only table, and a CSV export control.

# References

Altman, H., & Altman, M. (2026). Governing the gig economy: Strategic incentives and ethical alternatives in investor-owned and cooperative platforms. _Review of Social Economy_. [https://doi.org/10.1080/00346764.2026.2651740](https://doi.org/10.1080/00346764.2026.2651740)

A.N.S.I./I.N.C.I.T.S. (2004). American National Standard for Information Technology—Role Based Access Control. _American National Standards Institute_. [https://blog.ansi.org/ansi/role-based-access-control-rbac-incits-359/](https://blog.ansi.org/ansi/role-based-access-control-rbac-incits-359/)

Bajpai, T., & Chandrasekharan, E. (2025). _In the Queue: Understanding How Reddit Moderators Use the Modqueue_. [https://doi.org/10.48550/arXiv.2509.07314](https://doi.org/10.48550/arXiv.2509.07314)

Chen, P. P.-S. (1976). The entity-relationship model—Toward a unified view of data. _ACM Transactions on Database Systems_, _1_(1), 9–36. [https://doi.org/10.1145/320434.320440](https://doi.org/10.1145/320434.320440)

Das, D., Walker, A., Bushong, V., Svacina, J., Cerny, T., & Matyas, V. (2021). On automated RBAC assessment by constructing a centralized perspective for microservice mesh. _PeerJ Computer Science_, _7_, 376. [https://doi.org/10.7717/peerj-cs.376](https://doi.org/10.7717/peerj-cs.376)

Ferraiolo, D. F., & Kuhn, D. R. (1992). Role-Based Access Controls. _Proceedings of the 15th National Computer Security Conference_, 554–563. [https://csrc.nist.gov/pubs/conference/1992/10/13/rolebased-access-controls/final](https://csrc.nist.gov/pubs/conference/1992/10/13/rolebased-access-controls/final)

Ferraiolo, D. F., Sandhu, R., Gavrila, S., Kuhn, D. R., & Chandramouli, R. (2001). Proposed NIST standard for role-based access control. _ACM Transactions on Information and System Security_, _4_(3), 224–274. [https://doi.org/10.1145/501978.501980](https://doi.org/10.1145/501978.501980)

Franco, R. S., & Stegeman, H. M. (2026). _Content moderation as worker management: Digital labour on erotic webcam platforms_. Information, Communication & Society. [https://doi.org/10.1080/1369118X.2025.2604666](https://doi.org/10.1080/1369118X.2025.2604666)

Futures, I. S. S. A. (2025). _Work and jobs: Formal vs. Informal employment in Africa_. Institute for Security Studies. [https://futures.issafrica.org/thematic/13-work-jobs/](https://futures.issafrica.org/thematic/13-work-jobs/)

Gillespie, T. (2018). _Custodians of the internet: Platforms, content moderation, and the hidden decisions that shape social media_. Yale University Press.

Gorwa, R., Binns, R., & Katzenbach, C. (2020). Algorithmic content moderation: Technical and political challenges in the automation of platform governance. _Big Data & Society_, _7_(1), 1–15. [https://doi.org/10.1177/2053951719897945](https://doi.org/10.1177/2053951719897945)

Han, F., Liu, H., Chen, B., Jia, D., Zhou, J., Teng, X., Yang, C., Xi, H., Tian, W., Tao, S., Wang, S., Xu, Q., & Yang, Z. (2024). PALF: Replicated Write-Ahead Logging for Distributed Databases. _Proceedings of the VLDB Endowment_, _17_(12), 3745–3758. [https://doi.org/10.14778/3685800.3685803](https://doi.org/10.14778/3685800.3685803)

Institute, T. (2025). _Platform power and the future of work. Transnational Institute_. [https://www.tni.org/en/article/platform-power-and-the-future-of-work](https://www.tni.org/en/article/platform-power-and-the-future-of-work)

Kothapalli, B., Preethi, B., Brahma, K., Kavya, K. P. S., & Kavya Sree, K. (2026). A Severity-Aware Hybrid ML Model for Real-Time Cyber Threat Detection and Alerting. _International Journal of Advanced Research in Computer and Communication Engineering_. [https://doi.org/10.17148/IJARCCE.2026.154149](https://doi.org/10.17148/IJARCCE.2026.154149)

Organization, I. L. (2021). _World employment and social outlook 2021: The role of digital labour platforms in transforming the world of work. ILO_. [https://www.ilo.org/publications/flagship-reports/role-digital-labour-platforms-transforming-world-work](https://www.ilo.org/publications/flagship-reports/role-digital-labour-platforms-transforming-world-work)

Organization, I. L. (2024). _Global employment trends for youth 2024: Sub-Saharan Africa brief_. [https://www.ilo.org/sites/default/files/2024-08/Sub-Saharan%20Africa%20GET%20Youth%202024\_0.pdf](https://www.ilo.org/sites/default/files/2024-08/Sub-Saharan%20Africa%20GET%20Youth%202024_0.pdf)

Ramakrishnan, J., Shaabani, E., Li, C., & Sustik, M. A. (2019). _Anomaly Detection for an E-commerce Pricing System_. [https://arxiv.org/abs/1902.09566](https://arxiv.org/abs/1902.09566)

Rumbaugh, J., Jacobson, I., & Booch, G. (2003). _The unified modeling language reference manual: The definitive reference to the UML from the original designers_ (5. print). Addison-Wesle

Ticona, J. (2022). Red flags, sob stories, and scams: The contested meaning of governance on carework labor platforms. _New Media & Society_, _24_(7), 1548–1566. [https://doi.org/10.1177/14614448221099233](https://doi.org/10.1177/14614448221099233)

Yavuz, A. A. (2018). Immutable Authentication and Integrity Schemes for Outsourced Databases. _IEEE Transactions on Dependable and Secure Computing_, _15_(1), 69–82. [https://ieeexplore.ieee.org/document/7423676](https://ieeexplore.ieee.org/document/7423676)

# Appendix

## Appendix A1: Time Schedule

**ID**

**Task Name**

**Start-Date**

**Finish-Date**

**Duration in Days**

1

Project selection & concept note

01-Apr-2026

15-Apr-2026

14

2

Chapter 1 (Introduction complete)

16-Apr-2026

04-May-2026

18

3

Chapter 2 (Literature Review complete)

05-May-2026

05-Jun-2026

31

4

Chapter 3 (Methodology complete)

06-Jun-2026

12-Jun-2026

6

5

Proposal Submission (Chapters 1–3)

12-Jun-2026

12-Jun-2026

Table A: Project Timeline and Task Durations

![](./images/image13.png)

Figure A1: Visual Gantt Chart Representation (Chapter 1–3 Submission Phase)

## Appendix A2: Turn-It-In Report