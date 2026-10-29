---
tags:
  - "#ics410XCSIInote"
links:
  - "[[ICS 410X CS Project II Notes MOC]]"
Created: 2026-06-11
Platform: Physical (STMB F1-02)
---
**A Web-based Admin and Moderation Module for a Digital Workforce Marketplace (Capstone)**

Samuel Mugabi Mwesigwa

167999

Supervisor: Dr Dickson Owuour

An Informatics and Computer Science Project Proposal Submitted to the School of Computing

and Engineering Sciences in partial fulfilment of the requirements for the award of a

Degree in Bachelor of Science in Informatics and Computer Science

**School of Computing and Engineering Sciences**

**Strathmore University**

**Nairobi, Kenya**

June 2026

  

# Declaration and Approval

I declare that this project proposal has not been submitted to Strathmore University or any other University for the award of a Degree in Bachelor of Science in Informatics and Computer Science or any other Degree. To the best of my knowledge and belief, the research proposal contains no material previously published or written by another person except where due reference is made in the research proposal itself.

Student Admission Number: ________________   

Sign: ________________________    Date: ________________________

Supervisor's Signature:   

Sign: ________________________    Date: ________________________

  

# Acknowledgment

I would like to extend my heartfelt gratitude to my supervisor for his guidance, my friends for their support, my parents for their love, and my personal Lord and Saviour, Jesus Christ, for His grace and mercy that made all this possible.

  

# Abstract

Digital labour platforms operating in Sub-Saharan African emerging markets face a structural governance deficit that external regulation alone cannot resolve: in the absence of a centralised operator-facing administrative layer, platforms cannot manage user accounts, moderate flagged content, resolve disputes, or maintain an auditable record of their own decisions. This proposal addresses that gap by designing and validating a web-based Admin and Moderation System for a digital workforce marketplace platform connecting skilled workers with employers across Africa. The system provides platform operators with role-based access control across three privilege tiers, a content moderation queue with structured approve, reject, and escalate workflows, an INSERT-only immutable audit log, a user management interface, and a system settings panel.

The study is grounded in an applied experimental research paradigm and executed using an Agile software development methodology across a ten-week sprint cycle. The system is architected as a decoupled, three-tier web application: a React.js Single Page Application communicates with a Node.js and Express REST API, which persists data to a PostgreSQL relational database hosted on an Azure Virtual Private Server. Authorization is enforced at the middleware layer using JSON Web Token role claims validated against a centralized permission matrix. Immutability of the audit trail is achieved by withdrawing UPDATE and DELETE privileges from the application database user on the audit log table.

The literature review establishes that platform governance deficits in labour marketplaces are structurally amplified in high-informality contexts; that content moderation in workforce platforms differs fundamentally from social media moderation in both stakes and workflow requirements; that Role-Based Access Control is the dominant formalized access control model for multi-user web systems; and that immutable audit logging is a non-negotiable prerequisite for non-repudiable administrative accountability. A review of related solutions reveals that no existing system integrates moderation queue management, RBAC enforcement, and immutable audit logging within a single operator-facing module. The proposed system addresses this gap directly, delivering a production-grade governance control plane for the broader workforce marketplace platform.

  

# Table of Contents

Declaration and Approval ........................................................................................................ ii

Acknowledgment .....................................................................................................................iii

Abstract ....................................................................................................................................iv

Table of Contents ......................................................................................................................v

List of Figures ........................................................................................................................viii

List of Tables ...........................................................................................................................ix

List of Abbreviations ................................................................................................................x

[Chapter One: Introduction. 11](#_Toc232078423)

[1.1 Background. 11](#_Toc232078424)

[1.2 Problem Statement 12](#_Toc232078425)

[1.3 General Objective / Aim.. 13](#_Toc232078426)

[1.3.1 Specific Objectives. 14](#_Toc232078427)

[1.3.2 Research Questions. 14](#_Toc232078428)

[1.4 Justification(s) 14](#_Toc232078429)

[1.5 Scope and Limitations. 15](#_Toc232078430)

[1.5.1 Scope of the Project 15](#_Toc232078431)

[1.5.2 Limitation(s) in the Project 16](#_Toc232078432)

[1.5.3 Delimitations in the Project 16](#_Toc232078433)

[Chapter Two: Literature Review.. 18](#_Toc232078434)

[2.1 Introduction. 18](#_Toc232078435)

[2.2 Challenges Faced by Digital Workforce Marketplace Platforms. 18](#_Toc232078436)

[2.2.1 Governance Deficits in Platform Labour Markets. 18](#_Toc232078437)

[2.2.2 Content Moderation at Scale. 18](#_Toc232078438)

[2.2.3 Role-Based Access Control in Web Systems. 18](#_Toc232078439)

[2.2.4 Auditability and Accountability Requirements. 19](#_Toc232078440)

[2.3 Related Applications and Solutions. 19](#_Toc232078441)

[2.3.1 Community Platform Moderation Systems. 19](#_Toc232078442)

[2.3.2 Gig Economy Risk Management 19](#_Toc232078443)

[2.3.3 Enterprise RBAC Systems. 20](#_Toc232078444)

[2.3.4 Machine Learning Flagging Systems. 20](#_Toc232078445)

[2.4 Gaps in Existing Solutions. 20](#_Toc232078446)

[2.5 Conceptual Framework. 20](#_Toc232078447)

[Chapter Three: Development Methodology. 22](#_Toc232078448)

[3.1 Introduction. 22](#_Toc232078449)

[3.2 Research Paradigm.. 22](#_Toc232078450)

[3.2.1 Data Acquisition. 23](#_Toc232078451)

[3.2.2 Data Preprocessing. 23](#_Toc232078452)

[3.2.3 Model Training. 23](#_Toc232078453)

[3.2.4 Model Validation and Testing. 24](#_Toc232078454)

[3.3 Software Development Methodology. 24](#_Toc232078455)

[3.3.1 Requirements Elicitation. 25](#_Toc232078456)

[3.3.2 Sprint Planning. 25](#_Toc232078457)

[3.3.3 Iterative Development 26](#_Toc232078458)

[3.3.4 Coding and Development 26](#_Toc232078459)

[3.3.5 Testing and Deployment 26](#_Toc232078460)

[3.3.6 Justification of the Methodology. 27](#_Toc232078461)

[3.4 System Analysis and Design  27](#_Toc232078462)

[3.4.1 Use Case Diagram.. 27](#_Toc232078463)

[3.4.2 Class Diagram.. 28](#_Toc232078464)

[3.4.3 Entity Relationship Diagram (ERD) 28](#_Toc232078465)

[3.4.4 Database Schema. 29](#_Toc232078466)

[3.4.5 System Architecture. 29](#_Toc232078467)

[3.4.6 Wireframes. 30](#_Toc232078468)

[3.5 System Development Tools and Techniques. 30](#_Toc232078469)

[3.6 System Deliverables. 32](#_Toc232078470)

[3.6.1 System Documentation. 32](#_Toc232078471)

[3.6.2 Authentication Module. 32](#_Toc232078472)

[3.6.3 User Management Module. 33](#_Toc232078473)

[3.6.4 Content Moderation Queue Module. 33](#_Toc232078474)

[3.6.5 Immutable Audit Logging Module. 33](#_Toc232078475)

[3.6.6 System Settings Panel Module. 34](#_Toc232078476)

[References. 35](#_Toc232078477)

# List of Figures

[Figure ‎2.1: Conceptual framework. 21](#_Toc232179361)

  
 

# List of Tables

[Table 3.1: System Development Tools and Techniques. 31](#_Toc232079176)

  

# List of Abbreviations

API                  Application Programming Interface

DBMS             Database Management System

ERD                Entity Relationship Diagram

ILO                  International Labour Organization

JWT                JSON Web Token

NDA                Non-Disclosure Agreement

OOAD             Object-Oriented Analysis and Design

RBAC             Role-Based Access Control

REST              Representational State Transfer

SDLC              Software Development Life Cycle

SPA                 Single Page Application

TLS                 Transport Layer Security

SSA                 Sub-Saharan Africa

UML               Unified Modelling Language

UUID              Universally Unique Identifier

VPS                 Virtual Private Server

  

  

# Chapter One: Introduction

## 1.1 Background

Sub-Saharan Africa's labour market is the fastest-growing in the world (ISS African Futures, 2025). By 2023, Africa's total labour force had reached 576 million, surpassing India's 534 million, and projections indicate it will exceed one billion by 2043 (ISS African Futures, 2025). Despite this scale, structural deficiencies persist: informal employment accounts for 85.3% of total employment across Africa, compared to a global average of 57.8%, with Sub-Saharan Africa recording informal employment rates as high as 91.4% among female workers (ISS African Futures, 2025). In 2024, approximately 29.3% of employed Africans qualified as working poor, earning less than US$2.15 per day at purchasing power parity (ISS African Futures, 2025). These conditions create both a substantial demand for labour market intermediaries and a correspondingly high risk of exploitation, fraud, and governance failure in digital labour platforms that mediate the worker-employer relationship (ILO, 2021).

Digital labour platforms have emerged as a structural response to this fragmentation (ILO, 2021). According to the International Labour Organization, the number of such platforms grew from 193 in 2010 to over 1,070 by 2023, and the World Bank estimates that online platforms may engage up to 435 million active workers globally, a figure projected to exceed one billion by 2030 (Transnational Institute, 2025; ILO, 2021). In Sub-Saharan Africa, proliferation has occurred unevenly: the supply of labour from lower- and middle-income countries on global platforms is substantial, yet in 2023 nearly three in four young adult workers in the region remained in informal employment, with structural labour market constraints rather than workforce supply representing the primary barrier to formalisation (ILO, 2024). Regionally developed marketplaces that serve the African context directly, rather than routing labour supply through globally headquartered intermediaries, have therefore acquired particular significance (ILO, 2024).

Digital workforce marketplaces require several interdependent functional modules addressing the full lifecycle of a labour transaction, including user authentication, a gig marketplace, and administrative governance (Gillespie, 2018). The governance layer of a marketplace of this nature is not an optional feature (Gillespie, 2018). Gillespie (2018) establishes that content moderation and administrative oversight are constitutive functions of any system that mediates user-generated activity: they define what the marketplace permits, who may participate, and how disputes are resolved. In the context of a workforce marketplace, these functions are amplified (Ticona, 2022). A system that connects workers with employers in markets characterised by high informality and weak institutional trust bears a heightened responsibility to enforce its own policies, manage user accounts with integrity, and maintain an auditable record of operator decisions (Gorwa et al., 2020; Han et al., 2024). Without a centralised administrative layer, operators lack the mechanisms to fulfil these responsibilities, leaving the trust infrastructure structurally incomplete (Altman & Altman, 2026).

The administrative governance of web-based systems is further complicated by the scale and speed at which user-generated content and interactions accumulate (Gorwa et al., 2020). As digital workforce marketplaces scale, manual review of every flagged interaction becomes operationally impossible (Gorwa et al., 2020). Gorwa et al. (2020) demonstrate that systems lacking structured moderation infrastructure experience measurable increases in harmful content persistence and user attrition, and identify the absence of a human-in-the-loop moderation system as a root cause of policy enforcement failures at scale. Modern trust-and-safety infrastructure requires a paradigm where machine learning algorithms automatically calculate a risk score to triage items, while human moderators make the final high-stakes decisions (Kothapalli et al., 2026). For a workforce marketplace processing applications, reviews, complaints, and account activities across a growing user base, these risks are not hypothetical: they represent the conditions under which the system will operate from its first deployment (Gillespie, 2018). The design and implementation of a robust, machine-learning-ready admin and moderation module is, therefore, a prerequisite for responsible operation, not a subsequent enhancement (Altman & Altman, 2026).

## 1.2 Problem Statement

Web platforms operating without centralized administrative tooling are unable to systematically manage user accounts, moderate flagged content, or maintain a traceable record of governance decisions (Gillespie, 2018). The absence of a structured moderation queue further results in inconsistent content review, with no defined escalation path for disputed items (Gorwa et al., 2020). When user account management is uncontrolled, there is no interface through which an operator can suspend a fraudulent account, reassign roles, or investigate account-level anomalies (Ferraiolo et al., 2001). In a marketplace serving labour markets with high rates of informality and limited identity verification infrastructure, this creates a direct vector for fraud and impersonation (ILO, 2021). Furthermore, flagged gig listings, abusive reviews, or disputed transactions accumulate without a structured process for review, approval, rejection, or escalation (Ticona, 2022).

Without an immutable audit trail, the marketplace cannot demonstrate accountability to its users, its industry partners, or any future regulatory inquiry (Han et al., 2024). Without a structured, centralised moderation queue, the marketplace cannot collect the labelled datasets—such as historical records of what operators approved versus rejected—required to train automated behavioural classifiers (Ramakrishnan et al., 2019). This architectural deficiency prevents both immediate manual moderation and future automated scalability (Gorwa et al., 2020). The consequences of absent governance are heavily documented in the literature (Gorwa et al., 2020). Gorwa et al. (2020) find that platforms without moderation infrastructure sustain harmful content at significantly higher rates than those with structured human review systems, and associate this with increased user attrition. Gillespie (2018) further notes that the absence of visible governance mechanisms erodes user trust in the system as an institution, independent of the quality of the underlying service. For a marketplace operating in markets where digital trust is nascent and reputational damage is difficult to reverse, these consequences represent an existential risk to adoption (Transnational Institute, 2025).

## 1.3 General Objective / Aim

To develop and evaluate a web-based administrative architecture that integrates deterministic role-based access control, an immutable database-level audit ledger, and an extensible moderation pipeline designed to support future machine learning-driven behavioural anomaly detection.

### 1.3.1 Specific Objectives

The following specific objectives guide the achievement of the general objective:

**i.** To examine the governance and moderation challenges faced by digital workforce marketplace platforms in emerging markets.

**ii.** To review existing administrative and moderation systems and identify gaps relevant to the platform context.

**iii.** To design a role-based administration and content moderation system architecture for the platform.

**iv.** To develop and evaluate a web-based administrative architecture that integrates deterministic role-based access control, an immutable database-level audit ledger, and an extensible moderation pipeline designed to support future machine learning-driven behavioural anomaly detection.

### [[DO1]](#_msocom_1) 1.3.2 Research Questions

The following research questions correspond directly to the specific objectives listed above:

**i.** What governance and moderation challenges do digital workforce marketplace platforms in emerging markets face?

**ii.** What gaps exist in current administrative and moderation solutions that are relevant to a digital workforce marketplace?

**iii.** How should a role-based administration and moderation system be architected for a digital workforce marketplace platform?

**iv.** How effective is the developed administrative architecture in enforcing deterministic access control, maintaining immutable audit logs, and facilitating a structured moderation workflow capable of supporting algorithmic risk scoring?

## 1.4 Justification(s)

From an academic standpoint, this proposal addresses a gap in the literature on administrative governance systems for digital labour platforms in emerging market contexts. The majority of existing research on platform moderation and administrative systems is grounded in the context of consumer social media platforms operating in high-income economies (Gillespie, 2018; Gorwa et al., 2020). The specific governance requirements of a workforce marketplace serving African markets, where informality rates exceed 85% and institutional trust in labour intermediaries is low, remain understudied. This project contributes a designed and tested system architecture to that gap and frames the administrative module within a broader multi-component platform, providing a replicable reference for future capstone and industry projects of similar scope.

From an industry standpoint, the Organisation requires this module as a prerequisite for responsible deployment. A digital marketplace that mediates employment relationships in contexts of high informality and limited regulatory oversight cannot operate without user account management, policy enforcement tooling, and an auditable record of operator decisions. Without the Admin and Moderation System, the platform would be unable to fulfil its own terms of service, respond to disputes between workers and employers, or demonstrate accountability to the industry partners who commissioned the broader system. The module is not an enhancement to a functioning platform; it is a structural requirement for the platform to function as designed.

From a social standpoint, platform governance directly affects the fairness and dignity of labour market outcomes for workers. In informal labour markets where workers have limited recourse to institutional protections, the platform itself constitutes the primary governance mechanism. A platform that cannot manage fraudulent accounts, moderate abusive content, or log operator decisions provides workers with no meaningful protection against exploitation. This project therefore serves a social function beyond its technical scope: by equipping the platform with a robust administrative layer, it contributes to the conditions under which digital labour platforms can serve as instruments of labour market formalisation rather than vectors for its continuation.

## 1.5 Scope and Limitations

### 1.5.1 Scope of the Project

The system is a web-based administrative module within the marketplace, accessible via a standard browser without client-side installation. Three privilege tiers are implemented: Super Admin, who holds full platform control; Moderator, who manages the content queue and user-level actions; and Viewer, who has read-only access to dashboard analytics and logs. Four functional areas are delivered: user management, encompassing account CRUD operations, role assignment, and suspension; a human-in-the-loop content moderation queue engineered to capture labelled datasets via flag review, approve, reject, and escalate workflows; audit logging implemented as an INSERT-only record of all operator actions with date-range filtering and CSV export; and a system settings panel for feature toggles and configuration key/value management. The authentication module, covering login, JWT session management, and role-gated route protection, is included as supporting context to visualise the complete functional loop of the system. The system is developed and evaluated within the industry partner's development environment.

### 1.5.2 Limitation(s) in the Project

The system is evaluated within the industry partner's development environment. Production-scale load testing, which would require a live user base generating real marketplace activity, is outside the scope of this proposal phase. Data used for system testing is synthetic. Real user and activity data from the industry partner is governed by a Non-Disclosure Agreement; it is not available for use in development or testing prior to NDA execution. Crucially, the machine learning behavioural flagging component—which will auto-triage incoming moderation flags using trained classifiers such as Random Forest or Isolation Forest algorithms—is architected into the system design but is strictly not implemented in Phase 1. It is positioned entirely as a Phase 2 architectural extension, as its training inherently requires the accumulation of live, labelled moderation decisions generated by the Phase 1 human-in-the-loop system.

### 1.5.3 Delimitations in the Project

The following areas are explicitly excluded from the scope of this project. The admin and moderation system is web-based only; a native mobile admin interface is not included. Third-party trust-and-safety API integrations, such as external automated content classifiers, are excluded; moderation logic is human-in-the-loop and rule-based in this phase. Real-time chat moderation is handled by a separate module in the broader marketplace architecture and falls outside this project's boundary. Financial transaction oversight, including payment processing, disbursement management, and financial dispute resolution, are functions of separate modules and are not addressed here. Automated user verification against external identity databases is handled by the authentication module and is similarly out of scope.

  

# Chapter Two: Literature Review

## 2.1 Introduction

The rapid proliferation of digital workforce marketplaces necessitates a critical examination of the administrative architectures that govern them (ILO, 2021). This chapter reviews literature concerning governance challenges in digital labour platforms, content moderation systems, role-based access control (RBAC), and auditability (Gorwa et al., 2020). The review evaluates existing administrative solutions, highlighting critical architectural gaps—specifically the lack of algorithmic readiness in current moderation tools—and discusses the conceptual framework for a unified, web-based administrative module (Altman & Altman, 2026). The literature establishes the foundation for an architecture that not only resolves immediate governance deficits but purposefully structures data to support future machine learning integrations (Kothapalli et al., 2026).

## 2.2 Challenges Faced by Digital Workforce Marketplace Platforms

### 2.2.1 Governance Deficits in Platform Labour Markets

Digital labour platforms often operate with severely limited regulatory oversight, effectively making the platform the de facto regulatory authority responsible for establishing rules and enforcing compliance (Shobhit, 2025). Trust deficits between workers and employers are a primary barrier to market matching, especially in emerging markets (ILO, 2021). Because malicious actors can commit fraud or abuse without formal recourse, platforms require rigorous internal governance tooling to resolve disputes equitably and establish sustainable trust (Altman & Altman, 2026).

### 2.2.2 Content Moderation at Scale

Content moderation actively defines a platform's operational culture and economic viability (Gorwa et al., 2020). Unlike social media moderation, which primarily filters conversational toxicity, workforce platforms must moderate transactional and professional content, such as credentials, portfolio submissions, and gig deliverables (Ticona, 2022). Because a false positive could result in the suspension of a worker's primary income, these platforms require hierarchical, human-in-the-loop workflows explicitly designed for high-stakes professional dispute resolution (Shobhit, 2025). Furthermore, deploying fully automated artificial intelligence moderation in high-stakes professional environments without a robust human baseline introduces severe operational risks (Gorwa et al., 2020). Algorithmic models are entirely dependent on high-quality, domain-specific training data (Ramakrishnan et al., 2019). Therefore, establishing a structured, human-in-the-loop moderation queue is not merely a mechanism for immediate rule enforcement; it is the mandatory architectural prerequisite for generating the clean, labelled datasets required to train safe, context-aware machine learning classifiers in the future (Kothapalli et al., 2026).

### 2.2.3 Role-Based Access Control in Web Systems

To execute administrative duties securely, a formalized authorization architecture is required (Ferraiolo & Kuhn, 1992). Role-Based Access Control abstracts permissions into logical roles based on organizational functions rather than assigning them directly to users (Ferraiolo et al., 2001). By enforcing the principle of least privilege and separation of duties, this access control framework prevents unilateral system abuse, accidental data corruption, and unauthorized access to sensitive user data (Ferraiolo et al., 2001).

### 2.2.4 Auditability and Accountability Requirements

Genuine administrative accountability requires that every operator action is permanently recorded and strictly non-repudiable (Han et al., 2024). Traditional mutable application logs are insufficient, as they can be easily altered by compromised accounts or malicious insiders (Han et al., 2024). Systems must utilize immutable, append-only audit trails to provide a flawless forensic record of administrative actions, which is a structural prerequisite for proving platform accountability and maintaining participant trust (Han et al., 2024).

## 2.3 Related Applications and Solutions

A comprehensive review of existing administrative tooling, moderation architectures, and security frameworks reveals how the industry currently approaches platform governance. Analyzing these related solutions highlights both proven architectural patterns that should be incorporated and significant functional gaps that the proposed system must actively overcome to serve a digital workforce marketplace effectively.

### 2.3.1 Community Platform Moderation Systems

Bajpai and Chandrasekharan (2025) provide a robust empirical analysis of Reddit's moderation queue, surveying moderators to understand how governance tooling operates in practice. However, their architecture is explicitly optimized for short conversational content rather than structured, high-stakes transactional records, and these community systems typically lack the immutable audit trails required for financial or labour-market accountability (Gorwa et al., 2020).

### 2.3.2 Gig Economy Risk Management

Research on gig platforms highlights how moderation acts as a mechanism of labour control and risk management (Ticona, 2022). While effective for understanding algorithmic fairness, the systems described in current sociological literature often lack the integrated operator-facing tooling required for administrators to effectively manage complex user accounts and log decisions immutably in a production software environment (Altman & Altman, 2026).

### 2.3.3 Enterprise RBAC Systems

Enterprise-grade access control systems offer highly complex and secure permission modeling (Ferraiolo et al., 2001). However, they introduce configuration complexity highly disproportionate to the needs of a mid-scale workforce marketplace (Ferraiolo & Kuhn, 1992). Furthermore, they operate entirely separately from content moderation workflows, creating severe coordination overhead and fragmenting the governance architecture (Ferraiolo & Kuhn, 1992).

### 2.3.4 Machine Learning Flagging Systems

Machine learning anomaly detection systems and behavioural risk scoring algorithms are highly effective at auto-triaging fraudulent transactions and toxic text at scale (Ramakrishnan et al., 2019). Implementations utilizing Random Forest and Isolation Forest algorithms can successfully classify severity and detect anomalous behaviours across vast datasets (Kothapalli et al., 2026). However, the critical dependency of these advanced models is the data problem: they require thousands of historical, accurately labelled examples of platform abuse to function effectively (Gorwa et al., 2020). Existing literature heavily assumes this training data already exists, which is not true for a newly launched digital workforce marketplace (Gorwa et al., 2020). Consequently, AI-driven flagging cannot be deployed responsibly without first implementing a manual infrastructure specifically designed to capture and precisely label these initial moderation decisions (Gorwa et al., 2020).

## 2.4 Gaps in Existing Solutions

A critical synthesis reveals that existing solutions suffer from severe fragmentation, treating moderation, administration, and algorithmic readiness as fundamentally uncoupled concerns (Altman & Altman, 2026). Platforms are often forced to use disjointed systems that create data silos and operational inefficiencies (ILO, 2021). Furthermore, a significant algorithmic readiness gap exists: off-the-shelf enterprise machine learning tools require massive datasets that new platforms do not possess, while basic moderation tools fail to structure their database outputs in a way that supports future algorithmic ingestion (Ramakrishnan et al., 2019). The overarching gap is the lack of a bridge system—an administrative architecture purposefully designed to handle day-to-day manual governance while simultaneously structuring its immutable audit trails and moderation outcomes to serve as the direct training pipeline for a future behavioural classifier (Gorwa et al., 2020).

## 2.5 Conceptual Framework

The proposed Admin and Moderation System models the architecture as a continuous, secure pipeline of inputs, processing, and outputs (Chen, 1976). Inputs include new user registrations, gig listings, and flagged reports entering the system from the platform ecosystem (Ticona, 2022). The processing stage utilizes role-based access control to ensure all requests are deterministically gated by the operator's assigned privilege level before state changes are authorized (Ferraiolo et al., 2001). Outputs consist of the finalized moderation decisions and account state changes, securely written via database INSERT-only constraints to guarantee immutability (Han et al., 2024). Crucially, this framework incorporates an algorithmic feedback loop: the outputs generated by the initial human moderators, specifically the approved, rejected, and escalated decisions recorded in the immutable ledger, are explicitly designed to become the structured input features for the future machine learning pipeline (Kothapalli et al., 2026).

|   |
|---|
||
||![](file:///C:/Users/smmwe/AppData/Local/Temp/msohtmlclip1/01/clip_image002.gif)|

  

  

# Chapter Three: Development Methodology

## 3.1 Introduction

A system development methodology serves as a structured guide for organizing, planning, and managing the creation of an information system (Roth et al., 2013). This chapter outlines the structured methodology used to design, build, and evaluate the web-based Admin and Moderation System (Shelly et al., 2012). It details the research paradigm, software development lifecycle, system analysis, and the technical architecture required to provide platform operators with secure governance tooling (Kothari, 2004). The methodology ensures the system delivers a resilient, transparent, and auditable trust infrastructure (Yavuz, 2018).

## 3.2 Research Paradigm

The study adopts an applied, experimental engineering paradigm to address the operational governance deficits in digital labour platforms (Kothari, 2004). To establish a reliable, human-in-the-loop pipeline enhanced by machine learning, the research utilizes highly structured execution steps (Creswell & Plano, 2011).

### 3.2.1 Data Acquisition

Due to strict Non-Disclosure Agreements, high-fidelity synthetic datasets are generated to simulate fraudulent gig listings, credential anomalies, and abusive reviews (Bhatia, 2018). Primary data collection involves mapping platform terms of service, regional compliance guidelines, and established content policy frameworks into deterministic system rules that govern the moderation queue's routing logic (Kothapalli et al., 2026).

### 3.2.2 Data Preprocessing

Data pre-processing comprises data cleaning, data reduction, and data transformation (Amasyali & El-Gohary, 2017). Raw inputs undergo normalization to ensure consistency, particularly for categorical fields, before being passed to the machine learning models (Kothapalli et al., 2026). Raw string data and simulated user reports are mapped into structured objects to ensure strict parsing compatibility within the application gateway (Radford et al., 2021).

### 3.2.3 Model Training

Machine learning algorithms are utilized in the development of the web module to automatically classify toxic speech and detect anomalous platform behaviors (Gorwa et al., 2020). Raw data is converted into meaningful behavioral features, capturing temporal patterns and recent historical activities (Kothapalli et al., 2026). For text classification, features are engineered using techniques such as word embeddings to represent semantic relationships (Mikolov et al., 2013). A supervised Random Forest classifier is trained on historical data to recognize known malicious behaviors and generate probability scores (Breiman, 2001). In parallel, an unsupervised Isolation Forest model detects anomalous activities that significantly deviate from normal user behavior, effectively identifying previously unseen threats (Liu et al., 2008).

### 3.2.4 Model Validation and Testing

Model performance is evaluated using hold-out validation with test subsets, employing metrics such as Accuracy, Precision, Recall, and F1-score (Radford et al., 2021). The testing framework systematically triggers simulated edge cases to verify that all incoming flags exceeding the defined risk threshold are correctly routed to the high-priority moderator queue (Kothapalli et al., 2026). Database-level tests intentionally issue unauthorized modification commands against the audit log table to empirically confirm that the write-once constraint holds under adversarial conditions (Han et al., 2024).

## 3.3 Software Development Methodology

The prototype was developed using the Agile software development methodology, which focuses on rapid iterative development rather than extensive initial planning (Despa, 2014). This methodology emphasizes building an initial working version of the system, which is then refined through repeated feedback and adjustments (Alnaghaimshi et al., 2020).

### 3.3.1 Requirements Elicitation

Technical requirements were gathered through consultations with stakeholders to clearly define the system's goals and required data for training the artificial intelligence algorithms (McClintock, n.d.). Functional business requirements are captured in the form of detailed user stories that define the exact administrative capabilities required by each operator persona (Roth et al., 2013).

### 3.3.2 Sprint Planning

The engineering lifecycle is structured into distinct sprint blocks (Alnaghaimshi et al., 2020). Tasks are systematically prioritized based on logical component dependencies, scheduling database schema design and access control middleware in the initial sprint (Sankar, 2016).

### 3.3.3 Iterative Development

The project utilizes an iterative process that allows developers and users to collaboratively improve the system until a final version meets the desired requirements (Alnaghaimshi et al., 2020). Development runs concurrently across the stack, ensuring that a functional, testable increment of the administration panel is available for demonstration within the staging environment at the conclusion of every cycle (Gregory et al., 2020).

### 3.3.4 Coding and Development

Software engineering tasks conform strictly to the established architectural specifications (Sankar, 2016). Frontend engineers construct declarative, reusable components while backend engineers develop modular, role-gated middleware chains to manage incoming requests (Radford et al., 2021). Security configurations, route gates, and database constraints are manually implemented and code-reviewed before deployment (Herron, 2020).

### 3.3.5 Testing and Deployment

Continuous testing verifies that the algorithms correctly match items and route content appropriately before final implementation (Oladimeji, 2007). Code quality is enforced through a multi-tiered test plan that verifies user management operations and moderation queue routing prior to deployment (Roth et al., 2013).

### 3.3.6 Justification of the Methodology

The Agile methodology is selected for this project because governance module requirements are inherently tied to the operational realities of a live marketplace platform that is under active parallel development (Meiryani, 2019). The iterative structure allows the administrative module to adapt to interface changes in the broader platform without requiring a full architectural rework (Gregory et al., 2020).

## 3.4 System Analysis and Design

Object-Oriented Analysis and Design principles are employed to ensure the governance layer is modular, scalable, and resilient (Sankar, 2016).

### 3.4.1 Use Case Diagram

System modeling utilizes a Use Case Diagram to map the interactions of the discrete operator personas with core system workflows (Kalinga, 2017). The diagram defines the operational boundaries of the administration system by delineating read-only monitoring functions from high-stakes moderation actions (Rumbaugh et al., 2003).

### 3.4.2 Class Diagram

The Class Diagram encapsulates the backend logic, identifying classes, their interrelations, and interactions within the system (Kalinga, 2017). This structural view details internal properties, public methods, and strict encapsulation boundaries to prevent architectural leakage between modules (Rumbaugh et al., 2003).

### 3.4.3 Entity Relationship Diagram (ERD)

The Entity Relationship Diagram defines the structural data model, illustrating the relationship between people, objects, concepts, and events that occur in the system (Chen, 1976). The diagram specifically highlights the isolation of the audit ledger from application cascade paths to prevent retroactive data manipulation (Yavuz, 2018).

### 3.4.4 Database Schema

The physical database schema maps directly to the entity relationship diagram to guarantee relational integrity and query performance (Sankar, 2016). Standard primary keys utilize Universally Unique Identifiers to structurally prevent resource enumeration attacks within the platform (Herron, 2020). Furthermore, the audit log table enforces a default server-generated timestamp to prevent retroactive manipulation, while soft-deletion flags are utilized to permanently preserve referential integrity across related user tables (Han et al., 2024).

### 3.4.5 System Architecture

The system architecture defines a decoupled, three-tier web application designed to separate presentation, logic, and data persistence layers (Sarkar et al., 2017). The architecture outlines the sequential pipeline of authentication verification, rate-limiting, and authorization checks that every incoming request must pass through before reaching the controller logic (Herron, 2020).

### 3.4.6 Wireframes

Wireframes provide a structural user interface blueprint, visually mapping out the navigation layout and operator interaction patterns prior to technical implementation (Brown, 2010). The interface design establishes a persistent navigation rail that allows instant traversal between the dashboard analytics, user control centre, moderation queue, and audit explorer (Brown, 2010). To ensure operational safety, critical destructive actions such as permanent account bans are explicitly gated behind confirmation modals, thereby eliminating the risk of accidental state changes (Roth et al., 2013).

## 3.5 System Development Tools and Techniques

The technical stack is selected to maximise data integrity, align with the broader platform ecosystem architecture, and handle high-volume, I/O-bound security events efficiently. Table 3.1 presents each tool and technique, the system section it serves, and its specific purpose within the architecture.

|   |   |   |
|---|---|---|
|**Tool/Technique**|**Section**|**Description**|
|React.js & Bootstrap|Frontend|Component-driven user interface frameworks that are utilized to build declarative, reusable components and dynamic interactive dashboards.|
|Node.js & Express|Backend API|Asynchronous, non-blocking runtime for handling concurrent operator requests. Express provides a lightweight routing framework for assembling sequential middleware pipelines for authentication, rate-limiting, and RBAC checks.|
|PostgreSQL|Database|Enterprise-grade relational DBMS. Provides ACID-compliant transaction guarantees critical for complex account state changes. INSERT-only constraints on the audit_log table enforce governance-grade immutability.|
|JSON Web Tokens (JWT) & bcrypt|Security|Cryptographic tools utilized for stateless token-based session management, role claim validation, and secure password hashing.|
|FastAPI|Machine Learning API|High-performance Python framework employed for developing application programming interfaces with fast execution and asynchronous support to serve the trained models.|
|Python (Pandas, NumPy, Scikit-learn)|Machine Learning|Libraries utilized for general data analysis, array handling, feature scaling, and implementing the core machine learning algorithms.|
|Google Colab & Jupyter Notebook|Machine Learning|Platforms utilized for training and testing the artificial intelligence models with graphical processing unit support and interactive data exploration (Radford et al., 2021).|
|Jest & Supertest|Testing|Unit and integration testing framework for all Node.js API route handlers. Target line coverage is 80%. Supertest provides HTTP-level request simulation for black-box endpoint testing without a running server instance.|
|Figma|UI Design|High-fidelity wireframing tool for all administrative interface screens. Double Diamond UX design process applied to define operator workflows prior to implementation.|
|Git & GitHub|Version Control|Feature-branch workflow with conventional commit prefixes (feat:, fix:, test:, docs:, chore:). Repository tagged at v1.0.0 for the final submission.|
|Azure VPS & Nginx|Deployment|Azure Virtual Private Server provides institutional-grade hosting and firewall configuration. Nginx acts as a reverse proxy for TLS termination, load distribution, and security header injection.|
|Agile (Scrum-lite)|Methodology|Five two-week sprints aligned to formal submission gates. Sprint planning, review, and retrospective cycles ensure continuous stakeholder alignment.|

Table 3.1: System Development Tools and Techniques

## 3.6 System Deliverables

The final deployment provides stakeholders with a vertically integrated control plane consisting of multiple interdependent components (Jacob, 2012).

### 3.6.1 System Documentation

System documentation includes architectural blueprints, interface specifications, and a comprehensive operator manual (Roth et al., 2013). This documentation outlines standard moderation procedures, escalation criteria, and risk mitigation strategies for the operator tiers (Jacob, 2012).

### 3.6.2 Authentication Module

The authentication module features encrypted credential validation and strict middleware token gatekeeping (Herron, 2020). It securely handles token refresh lifecycles, safely invalidates compromised sessions, and provides the baseline security context required to protect all administrative actions (Ferraiolo et al., 2001).

### 3.6.3 User Management Module

The user management module provides high-tier operators with direct control over participant profiles (Chandramouli & Sandhu, 1998). It features tools to execute temporary suspensions or permanent bans against malicious profiles, with role assignment functionality restricted strictly to senior administrators (Ferraiolo et al., 2001).

### 3.6.4 Content Moderation Queue Module

The content moderation queue operates as a triage engine for real-time ranking, visualization, and resolution of flagged marketplace assets via an interactive dashboard (Kothapalli et al., 2026). Operators can approve items to maintain their visibility, reject entries to remove them from the marketplace, or escalate complex structural disputes to a senior supervisor for deeper review (Gorwa et al., 2020).

### 3.6.5 Immutable Audit Logging Module

The immutable audit logging module acts as an append-only forensic event ledger to strictly guarantee system accountability (Han et al., 2024). It automatically captures every operator action, tying each event to a unique operator identifier, a server-generated timestamp, and the target entity identifier (Yavuz, 2018).

### 3.6.6 System Settings Panel Module

The system settings panel enables administrators to dynamically modify platform-wide operational states through a configuration interface (Faden, 1999). Feature toggles allow specific platform functionalities to be enabled or disabled without a code deployment, ensuring that configuration modifications are traceable and non-repudiable (Han et al., 2024).

  

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

Organization, I. L. (2021). _World employment and social outlook 2021: The role of digital labour platforms in transforming the world of work._ _ILO_. [https://www.ilo.org/publications/flagship-reports/role-digital-labour-platforms-transforming-world-work](https://www.ilo.org/publications/flagship-reports/role-digital-labour-platforms-transforming-world-work)

Organization, I. L. (2024). _Global employment trends for youth 2024: Sub-Saharan Africa brief_. [https://www.ilo.org/sites/default/files/2024-08/Sub-Saharan%20Africa%20GET%20Youth%202024_0.pdf](https://www.ilo.org/sites/default/files/2024-08/Sub-Saharan%20Africa%20GET%20Youth%202024_0.pdf)

Ramakrishnan, J., Shaabani, E., Li, C., & Sustik, M. A. (2019). _Anomaly Detection for an E-commerce Pricing System_. [https://arxiv.org/abs/1902.09566](https://arxiv.org/abs/1902.09566)

Rumbaugh, J., Jacobson, I., & Booch, G. (2003). _The unified modeling language reference manual: The definitive reference to the UML from the original designers_ (5. print). Addison-Wesle

Ticona, J. (2022). Red flags, sob stories, and scams: The contested meaning of governance on carework labor platforms. _New Media & Society_, _24_(7), 1548–1566. [https://doi.org/10.1177/14614448221099233](https://doi.org/10.1177/14614448221099233)

Yavuz, A. A. (2018). Immutable Authentication and Integrity Schemes for Outsourced Databases. _IEEE Transactions on Dependable and Secure Computing_, _15_(1), 69–82. [https://ieeexplore.ieee.org/document/7423676](https://ieeexplore.ieee.org/document/7423676)

  

# Appendix A1: Time Schedule

|**ID**|**Task Name**|**Start-Date**|**Finish-Date**|**Duration in Days**|
|---|---|---|---|---|
|1|Project selection & concept note|01-Apr-2026|15-Apr-2026|14|
|2|Chapter 1 (Introduction complete)|16-Apr-2026|04-May-2026|18|
|3|Chapter 2 (Literature Review complete)|05-May-2026|05-Jun-2026|31|
|4|Chapter 3 (Methodology complete)|06-Jun-2026|12-Jun-2026|6|
|5|Proposal Submission (Chapters 1–3)|12-Jun-2026|12-Jun-2026||

Table A1: Project Timeline and Task Durations

|   |
|---|
||
||![](file:///C:/Users/smmwe/AppData/Local/Temp/msohtmlclip1/01/clip_image004.gif)|

  

  

# Appendix A2: Turn-It-In Report

---

 [[DO1]](#_msoanchor_1)Which technology/algorithm will you use? A simple web-based app is too simple for this level