---
tags:
  - "#ics410XCSIInote"
links:
  - "[[ICS 410X CS Project II Notes MOC]]"
Created: 2026-09-18
Platform: Physical (LT 1)
---
Confounder-Robust Machine Learning Model of Voice Biomarkers for Detecting
Preclinical Parkinson’s Disease


Jane Doe
151343
ICS 4D


Supervisor Name
Kevin Ochieng’ Omondi

**An Informatics and Computer Science Final Project Documentation Submitted to the
School of Computing and Engineering Sciences in Partial Fulfillment of the
Requirements for the Award of a Degree in Bachelor of Science in Informatics and
Computer Science**


School of Computing and Engineering Sciences
Strathmore University
Nairobi, Kenya


November 2025


ii


Declaration and Approval

I declare that this work has not been previously submitted and approved for the award of a
degree by this or any other University. To the best of my knowledge and belief, the research
documentation contains no material previously published or written by another person except
where due reference is made in the research documentation itself.

Student Name: Elvis Wahome Makara

Admission Number: 151343

Student Signature: _________________________ Date: ________________________

The Documentation of **Elvis Makara** has been reviewed and approved by **Mr. Kevin Ochieng’
Omondi**

Supervisor Signature: _________________________ Date: ________________________
28th November 2025


iii


Abstract

Parkinson’s disease is a progressive neurodegenerative disorder with no cure, where early
detection significantly improves clinical outcomes. Recent findings show that subtle vocal
impairments often appear before motor symptoms, making speech a promising non-invasive
biomarker for preclinical screening. This research developed a confounder-aware machine-
learning system for early Parkinson’s disease detection using sustained-vowel and short-phrase
recordings. The final implementation combined three complementary datasets, the UCI
Parkinson’s dataset, a corpus of raw Parkinson’s versus healthy control WAV recordings, and
the UCLASS stammerers dataset incorporated as a confounder source. A comprehensive
feature extraction pipeline was implemented, including MFCC statistics, jitter, shimmer,
spectral descriptors, prosodic measures, and demographic features.

Baseline models such as Logistic Regression, SVM (RBF), and Random Forest were trained
to validate the discriminative strength of the engineered features. The Random Forest model
was then optimized and selected as the final production classifier due to its performance,
interpretability, and computational efficiency for real-time deployment. Data augmentation and
SHAP-based explainability were integrated to enhance generalization and ensure transparent
interpretation of predictions. The final Random Forest model achieved an accuracy of 86%,
strong discrimination, and balanced precision and recall, while effectively reducing false
positives arising from non-PD confounders such as stammering. A full Streamlit-based
interface was implemented to support audio upload, prediction, SHAP explanation viewing,
and clinician reporting. These findings demonstrate the feasibility of confounder-resilient voice
analysis for early Parkinson’s screening and highlight its potential as a low-cost, accessible,
and interpretable decision-support tool.

**Keywords:** **_Parkinson’s disease, voice biomarkers, machine learning, early detection,
confounders_**


iv


Table of Contents

Declaration and Approval .......................................................................................................... ii

Abstract .................................................................................................................................... iii

Table of Contents ...................................................................................................................... iv

List of Figures ........................................................................................................................ viii

List of Tables .............................................................................................................................. x

List of Equations ....................................................................................................................... xi

List of Abbreviations ................................................................................................................ xii

Chapter 1: Introduction ........................................................................................................ 1


1.1 Background Information ............................................................................................ 1
1.2 Problem Statement ..................................................................................................... 2
1.3 Research Objectives ................................................................................................... 3
1.3.1 General Objective .............................................................................................. 3
1.3.2 Specific Objectives ............................................................................................ 3
1.4 Research Questions .................................................................................................... 3
1.5 Justification ................................................................................................................ 4
1.6 Scope .......................................................................................................................... 5
1.7 Limitations and Delimitations .................................................................................... 6

Chapter 2: Literature Review ............................................................................................... 7


2.1 Introduction ................................................................................................................ 7
2.2 Current State of Voice-Based Machine Learning for Parkinson’s Disease ................ 7
2.2.1 Overview of Voice-Based Parkinson’s Disease Machine Learning Models ...... 7
2.2.2 Key Challenges in Existing Works .................................................................... 8
2.3 Confounders in Parkinson’s Disease Voice Biomarker Research .............................. 9
2.4 Gaps in Related Works ............................................................................................... 9


## v




viii

   - 2.5 Conceptual Framework
- Chapter 3: Development Methodology
   - 3.1 Introduction
   - 3.2 Research Paradigm
      - 3.2.1 Data Acquisition
      - 3.2.2 Data Processing
      - 3.2.3 Model Training
      - 3.2.4 Model Validation and Testing
   - 3.3 Development Approach
      - 3.3.1 Empathise
      - 3.3.2 Define
      - 3.3.3 Ideate
      - 3.3.4 Prototype Sprints
      - 3.3.5 Test & Refine
   - 3.4 System Analysis Diagrams
      - 3.4.1 Use Case Diagram
      - 3.4.2 Class Diagram
      - 3.4.3 Sequence Diagram
      - 3.4.4 Activity Diagram
      - 3.4.5 Package Diagram
   - 3.5 System Design Diagrams
      - 3.5.1 System Architecture Diagram
      - 3.5.2 Wireframes
   - 3.6 Tools and Techniques
      - 3.6.1 Google Colab
      - 3.6.2 Git and Data Version Control vi
      - 3.6.3 Python Libraries
      - 3.6.4 SHAP and Calibration Techniques
      - 3.6.5 Streamlit
      - 3.6.6 Auxilliary Tools
   - 3.7 System Deliverables
      - 3.7.1 System Documentation
      - 3.7.2 Authentication Module
      - 3.7.3 Audio Preprocessing and Confounder Module
      - 3.7.4 Feature Extraction and Machine Learning Module
      - 3.7.5 Explainability and Calibration Module
      - 3.7.6 Streamlit Dashboard Module
- Chapter 4: System Analysis and Design
   - 4.1 Introduction
   - 4.2 Use Case Diagram
   - 4.3 Class Diagram
   - 4.4 Sequence Diagram
   - 4.5 Activity Diagram
   - 4.6 Package Diagram
   - 4.7 System Architecture Diagram
   - 4.8 Wireframes
- Chapter 5: System Implementation and Testing
   - 5.1 Introduction
   - 5.2 Implementation Environment
      - 5.2.1 Hardware Specifications
      - 5.2.2 Software Specifications vii
   - 5.3 Dataset Description
   - 5.4 Model Training and Evaluation
      - 5.4.1 Model Components
      - 5.4.2 Model Evaluation Metrics
   - 5.5 Functional Testing
   - 5.6 Results and Discussion
   - 5.7 GitHub Documentation
- Chapter 6: Conclusions, Recommendations and Future Works
   - 6.1 Conclusions
   - 6.2 Recommendations
   - 6.3 Future Works
- References
- Appendix
   - Appendix A1: Time Schedule May – July Semester
   - Appendix A2: Time Schedule August – November Semester
   - Appendix A3: Login Screen
   - Appendix A4: Patient Intake
   - Appendix A5: Diagnosis History.....................................................................................
   - Appendix A6: Account Page
   - Random Forest. Appendix A7: Comparative ROC analysis for Logistic Regression, SVM (RBF), and
   - Appendix A8: Turnitin Report
- Figure 2.1:Conceptual Framework List of Figures
- Figure 3.1: Hybrid Design Thinking and Agile Development Process
- Figure 4.1: Use-Case Diagram
- Figure 4.2: Class Diagram
- Figure 4.3: Sequence Diagram
- Figure 4.4: Activity Diagram
- Figure 4.5: Package Diagram
- Figure 4.6: System Architecture Diagram
- Figure 4.7: Login Wireframe
- Figure 4.8: Detection Page Wireframe
- Figure 4.9: New Patient Page Wireframe
- Figure 4.10: Diagnosis History Wireframe
- Figure 5.1: Sample of the UCI Parkinson's Dataset
- Figure 5.2: A sample of Kaggle’s Parkinson’s Dataset
- Figure 5.3: Metadata Sample from the UCLASS Stammerers Dataset
- the final prediction Figure 5.4: Simplified Random Forest model showing multiple decision trees voting to produce
- Figure 5.6: SHAP Global Importance for the Random Forest Classifier
- interface Figure 5.7: Example of SHAP local explanation visualization as displayed on the Streamlit
- Figure 5.8: ROC Curve and Precision-Recall Curve for the Random Forest Classifier.
- Figure 5.9: Confusion matrix for the Random Forest Model evaluated on the held-out test.
- Figure 5.10: Prediction Workflow
- Figure 5.11: SHAP Explanation


ix

Figure 5.12: Full Report Page .................................................................................................. 56


x


List of Tables

Table 5.1: Hardware Specifications ......................................................................................... 36

Table 5.2: Software Specifications .......................................................................................... 38

Table 5.3: Optimized Model Hyperparameters ........................................................................ 44

Table 5.4: Functional Testing Results ...................................................................................... 52


xi


List of Equations

Equation 5.1: Logistic Regression Probability Function ......................................................... 42

Equation 5.2: Random Forest Majority Voting ........................................................................ 43

Equation 5.4: Accuracy Formula ............................................................................................. 46

Equation 5.5: Precision Formula .............................................................................................. 47

Equation 5.6: Recall Formula .................................................................................................. 47

Equation 5.7: Formula to Calculate F1-Score of the Models .................................................. 47


xii


List of Abbreviations

AI – Artificial Intelligence

API – Application Programming Interface

CNN-LSTM – Convoluted Neural Network - Long Short-Term Memory

CSV – Comma Separated Values

DVC – Data Version Control

HNR – Harmonic-to-Noise Ratio

MFCC – Mel-Frequency Cepstral Coefficients

ML – Machine Learning

NHR – Noise-to-Harmonic Ratio

OOAD – Object-Oriented Analysis and Design

PD – Parkinson’s Disease

PDF – Portable Document Format

SHAP – Shapely Additive Explanations

SVM – Support Vector Machine

UML – Unified Modelling Language

VAD – Voice Activity Detection



Chapter 1: Introduction

**1.1 Background Information**

Parkinson’s disease is the second most wide-spread neurodegenerative disease globally, and
the fastest-growing, with incidences rising sharply after the age of 65 (Vatsavai et al., 2025).
Traditional Parkinson’s Disease (PD) diagnosis using neurological exams and DATscan or MRI
diagnostic imaging is time‐consuming because it requires an expert and a specialist setting.

Beginning in the early 2010s, experts observed that before any other motor symptoms develop,
individuals with PD usually show altered speech, appearing in the form of hypophonia,
dysphonia, monotonic-speech and slowed speech (Kouli et al., 2018). According to Vatsavai et
al., (2025), studies report that 70 – 90% of PD patients exhibit detectable voice impairments,
and that up to 78% of early-stage patients already showed vocal changes. Over the past five
years, advances in AI and ML have enabled the extraction of subtle vocal biomarkers like pitch,
loudness, jitter and shimmer from recordings (Shen et al., 2025; Vatsavai et al., 2025).
According to Dudek et al.,(2025) ensemble algorithms like XGBoost, have since achieved up
to 96 % accuracy on benchmark voice datasets, while deep-learning hybrids, CNN-LSTM,
reported F1-scores above 90 %. Moreover, Tougui et al., (2022), suggests that smartphone
based systems such as “PD Predict” have further shown the feasibility in the real-world setting,
yielding 65 – 75% accuracy without severe overfitting. From the results it appears that
computerized voice analysis might allow for early screening of PD well before any major
symptoms occur and that it would be achievable.

Yet, most of the voice-biomarker research currently available is based on ideal resources rather
than practical situations. According to Tougui et al.,(2022), many studies use small or
homogenous datasets, which risk overfitting and poor generalization. Moreover, models that
use voices often focus on one task and do not consider issues such as colds, not being able to
talk smoothly or accents which can look like PD symptoms (Lim et al., 2025). Factors such as
strong accents, sudden colds or stammering which often influence vocal frequency and look
and sound like those in Parkinson’s disease are rarely taken into account (Lim et al., 2025;
Rahman et al., 2021). Additionally, variability in recording devices and environments remains
unaddressed, and no standardized, confounder-aware screening tool exists (Dudek et al., 2025).

If these demographic and situation-related factors such as accent and colds are overlooked, it
spoils the accuracy and applicability of the models for detecting Parkinson’s disease in many


different groups of people (Rahman et al., 2021). If Parkinson’s disease is detected early and
accurately using a strong voice test, multiple good results can be achieved. Shen et al.,( 2025)
suggests that, theoretically, it promises to deepen our understanding of how subtle vocal
biomarkers reflect neurodegenerative processes, thereby informing both basic neuroscience
and clinical neurology. In fact, it supports non-invasive and low-cost screening which could be
carried out even in areas far from hospitals, benefiting those who have less access (Tougui et
al., 2022).

Societally, such an approach could substantially reduce late-stage disability whereby falls affect
45 – 86% of PD patients annually, moreover, the attendant caregiver burden, while also
lowering the roughly $14 billion per year spent on in-hospital diagnostics in the United States
(Vatsavai et al., 2025). Since there is no cure for PD, only medicines can help lessen the
symptoms. When diagnosed in the early stages, the disease can be controlled and its effects on
a person’s quality of life are limited. Naeem et al., (2025) emphasizes that “as there is no cure
for PD, early diagnosis can help prevent the progression of this disease”.

In this study, the solution was further investigated and a voice-based machine learning model
developed. One that explicitly accounts for known confounding factors such as demographics
and common voice disorders like stammering with the aim to improve the accuracy and
reliability of preclinical Parkinson’s disease detection compared to conventional approaches.

**1.2 Problem Statement**

According to Cao et al., (2025) and Dudek et al., (2025), if there was a screening tool that could
diagnose Parkinson’s disease using speech sounds, it would be easy to use, cost-effective, non-
invasive and accessible to people, meaning it could be applied to many and help patients
connect to neurologists earlier in the disease process.

However, currently, specialists detect PD by evaluating symptoms and taking images DATscan
that are costly. For this reason, it isn’t detected until over 50 % of the dopaminergic neurons
have been lost (Luo et al., 2025; Naeem et al., 2025). And according to Suppa et al., (2022) no
recognized early biomarkers exist, meaning that as many as 20 % of early cases remain
undiagnosed. Despite voice-based machine-learning classifiers can achieve accuracies up to 94
% using features like jitter, shimmer, and MFCCs, according to Shen et al., ( 2025 ) and Tougui
et al., (2022), most are trained on small, homogeneous datasets and fail to account for critical
confounders such as vocal variations, transient conditions like colds, stammering, or regional
accents (Lim et al., 2025; Rahman et al., 2021).


Ignoring these confounders leads to false positives and negatives in real-world use,
undermining clinician trust and limiting practical utility (Dudek et al., 2025; Maskeliūnas et
al., 2022). To address this gap, this research developed a confounder-aware ML pipeline trained
on PD and a large amount of varied “non-PD” voice samples, augmentation the data, biased-
towards-PD techniques, and validated on held-out, real-world recordings. By explicitly
modeling known vocal confounders, this study showed significant improvements in sensitivity
and specificity for preclinical PD detection, thereby enabling earlier intervention and reducing
downstream healthcare burdens (Cao et al., 2025; Dudek et al., 2025).

**1.3 Research Objectives**

**1.3.1 General Objective**

To develop a confounder-aware machine learning voice analysis model to detect preclinical
Parkinson’s disease early.

**1.3.2 Specific Objectives**


i. To analyze the current state of voice-based machine learning models for early
Parkinson’s detection.
ii. To evaluate how existing studies incorporate or omit common vocal founders.
iii. To identify the principal gaps in current voice-based PD screening.
iv. To design and develop a machine learning model for a confounder-aware voice
screening system.
v. To test and validate the proposed machine learning model for a confounder-aware
voice screening system.

**1.4 Research Questions**


i. What is the current state of voice-based machine learning models for early
Parkinson’s disease detection?
ii. How do existing studies incorporate or omit common vocal confounders like age,
gender, colds, accents and stammering in their voice-based PD screening
approaches?
iii. What are the principal methodological and data-related gaps in current voice-based
PD screening research?
iv. How can a confounder-aware machine learning model be designed to improve
robustness and interpretability in voice-based PD screening?



v. How is the proposed confounder-aware ML model tested and validated on held-out
and real-world voice datasets?

**1.5 Justification**

More scientists are seeing voice as a useful sign for diagnosing Parkinson’s disease. A few
studies have shown that training machine learning models on speech characteristics enables
their accurate identification of PD patients. For example, hybrid deep neural networks have
achieved over 90% classification accuracy on benchmark datasets according to Shen et al.,
(2025) and Vatsavai et al., (2025), and ensemble methods such as XGBoost report up to 96%
accuracy on public voice corpora (Dudek et al., 2025). Applying consumer microphones on
smartphones is possible even at home and has proven to provide 65 – 75% accuracy and very
little risk of overfitting the system (Tougui et al., 2022). According to a recent study, dysphonia,
monotonicity and decreased clarity in speech are frequently present before other classic motor
signs, suggesting that digital voice processing could allow doctors to identify PD at an earlier
stage in many patients.

Despite these promising results, existing voice‐based screening models exhibit critical
shortcomings. According to Tougui et al., (2022), many studies relied on small, homogeneous,
dataset for machines learning, making their work more likely to be overfitted and less
compatible with the real world. Crucially, demographic factors such as age and gender
systematically influenced vocal characteristics, yet few studies incorporated these as model
covariates or used stratified analysis (Rahman et al., 2021). Common transient voice changes,
due to colds, allergies, or regional accents can mimic PD‐like features according to Lim et al.,
(2025), but robust protocols to detect or correct for these confounders remained absent. Also,
voice recording and environment tended to vary which added to the difficulty of deploying
screening tools when no research supported them.

Ignoring demographic and contextual confounders undermined both sensitivity and specificity
when screening diverse populations, which resulted in excessive false positives, causing undue
anxiety and unnecessary specialist referrals, as well as false negatives that delayed critical early
intervention. In practical terms, a voice model that performed well under ideal conditions
would have failed to identify preclinical PD in community or telehealth contexts, eroding
clinician and patient trust. As a result, high‐quality early screening tools risked underutilization,
and individuals would miss opportunities for timely therapeutic measures that might slow
disease progression.


To address these gaps, this research developed a confounder‐resilient, voice‐based machine
learning system for PD screening. The approach trained and validated models on a
heterogeneous dataset that included confirmed PD cases, healthy controls, and recordings
reflecting key confounding conditions specifically the stammering-related speech disfluencies
and different microphone types. The project explicitly modeled demographic variables like,
age and gender, either through separate model branches or by incorporating them as input
features. Data‐augmentation techniques were also applied to simulate recording‐environment
variability. Explainable AI methods like SHAP‐value analysis, ensured transparency in how
the system distinguished true PD vocal biomarkers from confounders. This design directly
tackled the literature’s shortcomings by embedding confounder control into every stage of
model development.

**1.6 Scope**

The project aimed to develop and evaluate a proof-of-concept, web-based ML system for early
Parkinson’s Disease screening using voice recordings. The work was done within clearly
defined technical, data, functional, and temporal boundaries to ensure feasible completion
within one academic year.

The system was implemented using a Python-based backend integrated with a Streamlit web
interface. Development focused exclusively on voice recordings as the diagnostic input, with
no additional modalities like gait analysis or handwriting evaluation The system pipeline
covered data ingestion, noise filtering and normalization, audio augmentation, and extraction
of acoustic and prosodic features like MFCCs, jitter, shimmer, harmonic-to-noise ratio, and
spectral descriptors. Model development included probability calibration, SHAP-based
explainability, and a PDF export functionality for clinician review.

The input corpus combined sustained-vowel and short-speech samples from confirmed PD
patients and healthy controls sourced from public repositories such as the UCI’s Parkinson’s
datasets together with non-PD “confounder” recordings, for example the UCLASS stammerers.
All recordings were in English, captured under relatively clean audio conditions to simplify
initial development and evaluation.

Key features included modular feature-extraction and preprocessing stages, model training and
validation on held-out test sets, real-world sample evaluation, and an interactive dashboard that
displays model outputs, confidence scores, and explanations. Out-of-scope items were non-
English or dialectal speech, multi-class disease detection beyond PD versus healthy, detailed


PD severity staging, integration with mobile applications, extreme-noise environments, and
any clinical deployment or regulatory approval activities.

**1.7 Limitations and Delimitations**

Several factors beyond the project’s control constrained model performance and
generalizability. Public datasets were often imbalanced, with healthy controls typically
outnumbering PD cases and underrepresenting key confounder types therefore introducing bias
despite augmentation efforts. Audio recordings varied widely in device quality and
environmental conditions, and although normalization and noise filtering were applied,
residual quality differences still degraded feature extraction. Some confounding variables such
as co-occurring neurological conditions or emotional state were difficult to capture or reliably
label in existing data. The computational overhead associated with confidence-score calibration
and SHAP explainability also increased processing time, limiting real-time responsiveness.
Finally, by focusing on binary PD detection, the system could not assess disease severity or
distinguish PD from other neurodegenerative disorders, limiting its immediate clinical
applicability in comprehensive diagnostic workflows.

This study intentionally narrowed its focus to ensure feasibility and clarity. Voice inputs were
limited to brief English‐language tasks such as sustained vowels and short sentences rather than
continuous conversational speech. The model performed only binary classification of
Parkinson’s disease versus healthy control. All recordings came from specified public
repositories like UCI Parkinson’s dataset, a curated Parkinson’s versus healthy .wav corpus,
and the UCLASS stammerers dataset, no external datasets beyond these were included.
Participants were adults only, excluding pediatric speakers and non-speech vocalizations. The
machine-learning pipeline implemented traditional acoustic and prosodic features such as
MFCCs, jitter, shimmer, and harmonic-to-noise ratios, without incorporating deep-learning
embeddings such as wave2vec. Non-English speech, multi-class disease detection, PD severity
grading, mobile-app integration beyond a web interface, extreme-noise environments, clinical
deployment, and regulatory approval were explicitly out of scope.



Chapter 2: Literature Review

**2.1 Introduction**

Parkinson’s Disease (PD) is a prevalent neurodegenerative disorder with early manifestations
in speech and voice. Prior studies report that over 90% of PD patients exhibit vocal
impairments in the disease’s early stages (Barukab et al., 2022) (Naeem et al., 2025). Naeem
et al., (2025) further suggests that voice analysis therefore offers a non-invasive, low-cost
biomarker for early PD screening. The literature review looks at recent works, between 2020
and 2025, on voice-based PD detection, guided by the study’s research objectives. Section 2.
reviews the current ML models for voice-based early PD detection while section 2.3 analyzes
how confounding factors like accent and stammers have been handled in voice biomarker
studies. Section 2.4 discusses the critical gaps identified in the existing works and section 2.
outlines a conceptual framework for a confounder-aware voice biomarker system, integrating
ML classifiers, confidence scoring and explainability methods.

**2.2 Current State of Voice-Based Machine Learning for Parkinson’s Disease**

**2.2.1 Overview of Voice-Based Parkinson’s Disease Machine Learning Models**

Recent research leverages acoustic and prosodic features extracted from speech recordings to
distinguish early-stage PD from healthy controls. Commonly used features include spectral
measures such as Mel-Frequency Cepstral Coefficients (MFCCs) and formant frequencies, and
voice-quality measures such as jitters, shimmer, and harmonic-to-noise ratio (Ngo et al., 2022)
(Suppa et al., 2022). Typically, pipelines begin by collecting benchmark datasets like the UCI
Parkinson’s dataset, that has 197 samples from 31 individuals or the Kaggle PD dataset that
has 188 PD samples and 64 healthy controls, providing multiple sustained-vowel and speech-
task recordings per subject (Ngo et al., 2022).

Frequently, feature extraction combines classical acoustic techniques with more advanced
approaches. For instance, Shen et al., (2025) trained a hybrid CNN–LSTM architecture on
MFCC, jitter and shimmer inputs, and reported having achieved approximately 91 % accuracy
on a separate test set. Similarly, Dudek et al., (2025) used an ensemble of XGBoost classifiers
trained on MFCCs, formant frequencies, and HNR and achieved up to 96 % accuracy when
testing on mixed-reality–collected voice samples. Some studies incorporate smartphone-
collected data. Tougui et al., (2022) achieved 65 – 75 % accuracy using consumer microphones
in uncontrolled environments, indicating potential feasibility for large-scale, low-cost
screening.


Transfer learning has become an important topic of investigation among modern approaches.
By fine-tuning the ready-made speech encoder wav2vec 2.0 on sample groups of PD and
healthy voices, Crawford, (2025) achieved an F1-score above 90 % when distinguishing early
PD cases. Since speech corpora are being leveraged widely, the features used in deep learning
are likely to improve, though this approach may bring up issues related to data compatibility
and making the models reliable in different conditions (Crawford, 2025).

**2.2.2 Key Challenges in Existing Works**

While voice-based machine learning for Parkinson’s disease promises to identify signs reliably,
there are still various main issues. First, most studies rely on small, homogeneous datasets such
as the UCI Parkinson’s corpus that has 195 samples or the Kaggle dataset with 252 samples
which often lack the demographic diversity needed to train robust models (Ngo et al., 2022).
Brenner et al., (2023) argues that this limited scope can lead to overfitting, with classifiers
inadvertently learning speaker-specific or recording-specific patterns rather than true disease
biomarkers.

Second, variables like age and gender tend to shape how individuals speak and yet these factors
are mostly left out by current pipelines, leading models to mistake these changes for symptoms
of Parkinson’s (Dudek et al., 2025; Rahman et al., 2021).

Third, dysphonia from problems such as colds or throat infections or speech problems like
stuttering, may sound similar to PD dysphonia. Few studies incorporate mechanisms to detect
or filter these confounders, resulting in false positives or negatives when applied in real-world
contexts (Lim et al., 2025; Maskeliūnas et al., 2022). In addition, not all recordings are
identical, changes in microphones or conversational settings can affect model results when used
outside a laboratory (Tougui et al., 2022).

Finally, most models have not been evaluated using external data. Many classifiers are
evaluated within the benchmark datasets, not on outside samples or in other languages, so their
usefulness in diverse groups is rarely studied (Crawford, 2025; Shen et al., 2025).

In conclusion, small, biased datasets, unmodeled confounders, environmental noise, and lack
of real-world validation collectively limit the clinical utility of current voice-based PD
detection systems.


**2.3 Confounders in Parkinson’s Disease Voice Biomarker Research**

A major problem is that other factors could cause changes in voice signals in addition to
Parkinson's Disease. Acoustic features are influenced a lot by factors such as age and gender.
Since PD occurs more often in advanced age and in males according to Barukab et al., (2022),
many PD voice datasets often have skewed demographics. For example, the Kaggle PD voice
dataset used in several recent studies, including this one, comprises of 41 PD cases and 40
healthy controls, accompanied by a separate demographic file where of all the records 44 are
female and 37 male. Brenner et al., (2023) warns that a lack of age and gender balance may
allow models to recognize demographic traits instead of detecting diseases. If no changes are
applied, the classifier could identify speech according to gender or age, rather than telling apart
people with PD from those who are healthy.

Extra noises in acoustics involve speaker-related features such as accent, dialect and transient
conditions. Different languages or accents affect phonation and prosody. Crawford, (2025)
notes that speech models could suffer from bias due to language, dialects and accents and that
they may perform differently when used outside their training language. Little thought is given
to temporary throat problems such as colds or infections that might lead to hoarseness and
shakiness in the voice. Likewise, pre-existing speech disorders like stuttering could mimic PD-
like dysfluencies, potentially confounding classification.

Few PD voice studies take these confounders into account in their design. Brenner et al., (2023)
proposed reducing errors by careful sampling, which entails splitting data so that each subject’s
recordings do not appear in both train and test sets. Otherwise, common strategies are limited.
Some authors balance class labels or use oversampling like Naeem et al., (2025), but explicit
deconfounding, such as adversarial debiasing and covariate adjustment is rare. All in all, the
published literature rarely pays attention to many voice confounders. Enhancements from
different fields such as adding metadata, stratified cross-validation or simulating accents, are
not yet commonly applied to the problem.

**2.4 Gaps in Related Works**

Many crucial gaps are shown by the literature examined. To start, few studies pay close
attention to taking out possible biases linked to age or health conditions from voice features
(Brenner et al., 2023). Consequently, described precision might be increased by hidden biases.
Moreover, the range of available data is not very broad, with most datasets of spoken language
only include one language, contain few recordings and come from only a few collection centers


(Naeem et al., 2025; Rabie & Akhloufi, 2025). As a result, many models have not been
evaluated on data acquired from different groups or types of environments, raising concerns on
the generalizability outside controlled environments. Furthermore, little research has examined
model performance on different group of subjects or investigated how vocal characteristics
evolve over time or in prodromal patients.

Furthermore, many systems make it very difficult to determine how and why their predictions
happen. Apart from a couple of recent works, including Shen et al., (2025) who used SHAP,
most classifiers act as black boxes and when the factors influencing the prediction is not clear,
clinicians find it hard to rely on the recommendation. Robustness to noise remains
insufficiently explored. In reality, data is noisy, and microphone quality can vary, but most
studies use tidy and controlled samples. In short, key challenges include the need for larger and
more varied datasets, better confounder control, and explainable models (Rabie & Akhloufi,
2025). These gaps highlight the need for methods that explicitly address biases and
transparency in voice-based PD detection.

### 2.5 Conceptual Framework

Figure 2. 1 illustrates the end-to-end conceptual pipeline used for detecting early Parkinson’s
disease from voice recordings. A clinician’s voice sample that’s been captured as a sustained
vowel or short utterance and accompanied by demographic metadata such as age and gender,
is first processed through a standardized preprocessing stage. This stage performs noise
reduction, amplitude normalization, and voice-activity detection to isolate meaningful speech
segments and ensure that the subsequent analysis receives a clean and uniform signal across all
recordings.

The refined audio then passes through a feature-extraction block, where a diverse set of
spectral, prosodic, and voice-quality descriptors is computed, including MFCCs, jitter,
shimmer, harmonic-to-noise ratio, and related time-frequency features. These extracted
features form a structured vector that is fed into a Random Forest classifier trained on
Parkinson’s, healthy, and stammerer recordings. The model generates a Parkinson’s-risk
estimate, which is further interpreted using SHAP explainability to visualize the most
influential acoustic attributes contributing to the decision. The system finally outputs a
Parkinson’s-risk score along with a clear SHAP-based explanation, providing clinicians with a
transparent and easily interpretable screening result.


Figure 2. 1 :Conceptual Framework


## Chapter 3: Development Methodology

### 3.1 Introduction

This chapter describes the overall process by which the system was developed. The study
proposed to use a hybrid approach combining an experimental research paradigm, iterative
prototyping within an object-oriented analysis and design framework. The research adopted
OOAD to model system components as modular, reusable objects. Section 3.2 seeks to describe
the experimental framework, its stages and how it aligned with the project. Section 3.3, details
the development methodology to be implemented and the different phases and justifies the
hybrid approach. Section 3.4, presents the UML use-case, class, sequence, activity, and
package diagrams. Section 3.5, speaks of the high-level architecture and wireframes of the
system. Section 3.6, lists the tools and techniques used. Finally, Section 3.7, then outlines the
deliverables and modules. This structure supported the systematic system modelling and
iterative refinement throughout development.

### 3.2 Research Paradigm

This project followed an experimental research paradigm, wherein specific hypotheses about
early Parkinson’s vocal biomarkers were tested through systematic data collection, controlled
preprocessing, and machine learning model evaluation. The study defined clear objectives such
as improving sensitivity to preclinical PD while examining the effects of confounders like
stammering on model performance. The experiments were conducted through a structured
pipeline of data acquisition, processing, model training, and validation. For instance, one
experiment compared a baseline classifier trained solely on PD versus healthy voices against a
confounder-aware model that also ingests samples of stammered speech, thereby quantifying
the benefit of explicit confounder modeling on false-positive rates.

#### 3.2.1 Data Acquisition

To assemble a comprehensive voice corpus, the project drew from three publicly accessible
repositories that collectively encompass Parkinson’s disease cases, healthy controls, and
relevant vocal confounders. The foundational Parkinson’s samples are sourced from the UCI
Machine Learning Repository’s Parkinson’s dataset, which comprises 195 sustained-vowel
recordings from 31 individuals annotated with features such as jitter, shimmer, and Mel-
frequency cepstral coefficients (MFCCs) (Little, 2007). Additional PD and healthy control
recordings were obtained from the Kaggle Parkinson’s Disease Data Set, containing 81 short
utterances and sustained-vowel recordings comprising 41 PD samples and 40 healthy voice


samples accompanied by demographic metadata. To incorporate a real confounder, the project
integrated the UCLASS Stammerers dataset, which provides audio recordings from individuals
with stuttering patterns that may acoustically resemble Parkinsonian dysfluency, a relationship
depicted in a recent pathological speech research (Phan et al., 2021). These three datasets
collectively supplied the Parkinson’s, healthy, and confounder samples required for model
development.

#### 3.2.2 Data Processing

Every audio file will be converted to a uniform format of 16 - bit WAV, 44.1 kHz, and subjected
to spectral denoising and amplitude normalization to reduce background noise and recording
variability. Voice activity detection algorithms isolated sustained-vowel and short-phrase
segments, discarding silence or extraneous sound. Using librosa and SciPy, the project
extracted spectral, prosodic and voice-quality descriptors for each segment, assembling a
feature matrix. Concurrently, speaker metadata such as age, gender, and stammer-presence
were encoded as additional features or covariates. To mitigate over-representation of certain
conditions, the project applied controlled data augmentation strategies such as random pitch
shifts, time stretching, and additive noise which are approaches shown to enhance model
robustness to real-world variability. This preprocessing pipeline were modularized into
AudioPreprocessor and FeatureExtractor classes, enabling repeatable, version-controlled
experiments.

#### 3.2.3 Model Training

The project explored both conventional classifiers, including Logistic Regression, Random
Forest, and SVM(RBF), all trained on handcrafted acoustic features. Deep-learning
architectures such as CNN-LSTM hybrids were reviewed but not implemented due to dataset
size constraints. Training employed stratified 10-fold cross-validation, ensuring folds are
balanced for class labels and key confounders to prevent data leakage, an approach validated
by Tougui et al., (2022) in Parkinson’s voice screening studies. Hyperparameter optimization,
with grid search over learning rates, tree depths, and regularization strengths, was conducted
within each fold, guided by the mean F₁-score on validation splits. Feature importance is
assessed via permutation methods and built-in model importance scores, revealing which
acoustic measures contribute most to PD discrimination. For example, a recent study by
Simone et al., (2025) demonstrated that MFCC coefficients and jitter parameters ranked highest


in a CNN-based PD detector, yielding an F₁-score of 92.3 %. All training runs, code versions,
and model artifacts are tracked using Git and DVC for full reproducibility.

#### 3.2.4 Model Validation and Testing

After cross-validation, the best-performing model was evaluated on a held-out test set
comprising entirely unseen recordings from each source. The project computed precision,
recall, F 1 - score, and AUC-ROC to quantify classification performance, targeting a high recall
to minimize missed early-stage Parkinson’s cases. Raw model outputs were then calibrated via
isotonic regression on a validation subset to produce meaningful probability estimates, a
practice recommended for clinical risk scoring. To ensure interpretability, the project applied
SHAP on the final classifier’s predictions, generating local feature-attribution plots that
highlighted the acoustic drivers of each risk score. Error analyses focused on false positives
arising from stammering samples. This rigorous validation framework ensured that the final
model not only achieves high accuracy but also generalizes robustly across speaker
demographics and recording conditions

### 3.3 Development Approach

The study brought together the user-focused and problem-driven side of Design Thinking, the
quick and repeated cycle of Agile prototyping and an OOAD framework that separates audio
ingestion, feature extraction, ML model and the dashboard into individual units that can be
reused. The project applied Design Thinking during the Empathize, Define and Ideate phases
by getting to know users’ needs, examining issues differently and generating conceptual
answers, as explained by Alhazmi & Huang, (2020) while Agile prototyping sprints enact short,
focused development cycles that delivered functional artifacts for immediate feedback and
refinement (Sandu et al., 2022). Associating individual brainstorming efforts with iteration
planning enabled the project to steadily improve prototypes based on evaluation results.

Design Thinking does an excellent job at discovering what people really want, but by itself, it
has trouble turning thoughts into actual software. Conversely, Agile supports flexibility and
part-by-part release of code ready for production, yet it may not investigate the entire problem
area well enough unless a discovery phase is added. Sandu et al., (2022), indicated that utilizing
all these approaches helps teams quicker converge on answers by alternating user divergence
with development convergence and in their Agile practice, analytics teams achieve significant
benefits from using design techniques.


## Figure 3.1: Hybrid Design Thinking and Agile Development Process

Figure 3. 1 illustrates the hybrid methodology. First, the study conducted user analysis by
working through Design Thinking’s Empathize and Define phases along with exploring the
problem area, as solutions are conceived later. The gathered insights informed the approach
used in Agile sprints. Each sprint iterated quickly through prototyping and testing, while
maintaining Design Thinking principles such as empathy and creativity. Essentially, the study
shifted back and forth between thinking widely about users and their needs and building and
adjusting features in short development cycles to focus on what users want.

#### 3.3.1 Empathise

As direct user research and participatory design were not part of the project, the study chose to
understand users’ needs by carefully studying research papers and studying the dataset
metadata. Key studies by Naeem et al., (2025) and Shen et al., (2025) emphasize that medical
AI needs to be easy to understand, must deliver accurate answers and explain its decisions.
Based on the results discovered, the study deduced that the interface for clinicians should be
non-invasive, protect a patient’s privacy and provide outputs that are easy to understand. To
represent the diversity in speech naturally, the project analyzed public voice collections to
determine how elements like people’s backgrounds, their accents and temporary conditions


such as having a stammer,influence the signals. This secondary research grounded the study’s
understanding of user needs in empirical evidence, ensuring our design goals reflected practical
considerations without exceeding our data-driven constraints.

#### 3.3.2 Define

Building on insights from the Empathize stage, the study clearly identified the issue and
proposed to design and develop a system that detects preclinical Parkinson’s disease from voice
recordings while minmizing any interference from speaker age, gender, accent or transient
voice conditions. These points formed the basis for creating real technical requirements. Each
input file was defined as a 16 - bit WAV at 44.1 kHz and only sustained vowels and short phrases
were allowed as speech samples for a uniform analysis. The outputs were calibrated predictions
of Parkinson’s risk together with a SHAP explanation showing which sounds had the most
impact. The system was limited to English-language adult speech and the study did not include
clinical deployments or development for other languages or phones. By setting these
boundaries, the design and development could not wander off topic from the project’s declared
restraints.

#### 3.3.3 Ideate

Rather than convene participatory brainstorms, the study synthesized user-centered design
principles from the literature to generate and prioritize system features. It opts for the lesson
learned in the field called ‘minimal viable product’, making my MVP to handle sample upload,
prediction running and SHAP explanation and keeping potential enhancements such as disease-
severity grading and support for more languages, for later iterations. It designed UML diagrams
to represent the features and connections between five major classes, AudioProcessor,
FeatureExtractor, PDClassifier, Explainer and Dashboard. This way of planning meant that
every part of the application could be developed independently, helping to ensure that
maintenance is simple during future sprints..

#### 3.3.4 Prototype Sprints

The project intended to split development into four iterations, each being about two to three
weeks and dedicated to finishing a core system module. In Sprint 1, the project implemented
robust audio ingestion and preprocessing routines, loading .wav files, applying noise-reduction
filters such as spectral subtraction, and normalizing amplitude. Sprint 2 shifted attention to
feature engineering and baseline modeling where librosa was used to extract MFCCs, jitter,
and shimmer measures, then trained Random Forest and Logistic Regression classifiers on


benchmark Parkinson’s datasets. During Sprint 3, the project integrated explainability and
calibration, SHAP was employed to attribute model predictions to specific acoustic features,
and isotonic regression was applied to convert raw classifier outputs into well-calibrated risk
probabilities. Finally, Sprint 4 unified all modules within a Streamlit dashboard, enabling users
to upload audio, view PD risk scores, and inspect SHAP visualizations. After each sprint, the
study reviewed test outcomes and usability heuristics, refined interfaces and algorithms in
preparation for the next cycle. This iterative process ensured that each prototype iteration
delivered a working, evaluable component aligned with the study’s hybrid methodology.

#### 3.3.5 Test & Refine

The proposed project will begin by developing comprehensive unit tests for each core function
such as audio loading, noise reduction, feature extraction, model scoring, and SHAP
explanation to ensure that, for known inputs, every module produces the correct output and
handles errors gracefully. Once these individual components are verified, the proposed project
will move on to integration testing, where it will feed a sample .wav file through the entire
pipeline, from ingestion and preprocessing, through feature extraction and classification, to
explanation generation and confirming that data formats align correctly, API calls succeed, and
outputs remain consistent at each stage.

Treating the system as a black box, the proposed project will then execute functional tests using
a diverse set of unseen voice recordings that vary in age, gender, accent, and background noise.
Under these conditions, it is expected that, healthy-control samples will yield low Parkinson’s
risk probabilities while pathological samples produce higher scores, with the accompanying
SHAP reports highlighting plausible acoustic drivers. Concurrently, the proposed projecct will
perform white-box testing by instrumenting conditional branches such as error handling for
corrupted audio files or missing metadata to guarantee full coverage of exceptional paths and
to verify that the system provides meaningful feedback rather than crashing.

For machine-learning validation, the study plans to employ stratified k-fold cross-validation
across the study’s aggregated dataset of Parkinson’s and confounder-rich voice samples,
carefully ensuring that no individual speaker appears in both training and test folds. The
proposed project will reserve a separate hold-out set drawn from real-world recordings to
evaluate the model’s generalization and to fine-tune decision thresholds based on calibrated
probability outputs. Finally, to assess scalability and responsiveness, the proposed project will
be taken through performance and stress tests by running parallel pipelines on batches of


dozens of audio files measuring end-to-end latency, memory consumption, and throughput
which will guide any necessary optimizations in preprocessing routines or model inference.
After each round of testing, failure cases will be analyzed, preprocessing parameters adjusted,
models retrained or tuned, and documentation updated, iterating until the system consistently
meets the predefined accuracy, robustness, and performance targets.

### 3.4 System Analysis Diagrams

In this section, the study outlines the set of UML and architecture diagrams that will be
developed to capture the static and dynamic structure of the proposed voice-based Parkinson’s
detection system. These diagrams will serve both as blueprints for implementation, ensuring
that each component’s responsibilities and interactions are clearly specified before coding
begins.

#### 3.4.1 Use Case Diagram

The project created a Use Case Diagram to depict the key actors, namely the Clinician and the
System Administrator, and the primary services the system provides. The Clinician actor is
linked to use cases such as “Upload Audio Sample,” “View PD Risk Score,” “Inspect SHAP
Explanation,” and “Export Report.” The System Administrator actor is connected to “Manage
User Accounts,” “Configure System Parameters,” and “Review Audit Logs.” By visualizing
actor–use case relationships, this diagram clarifies the system boundaries and ensured that no
user requirement is overlooked.

#### 3.4.2 Class Diagram

To organize the codebase into coherent modules, the project prepared a Class Diagram showing
the main object classes that include, AudioFile, AudioPreprocessor, FeatureExtractor,
PDClassifier, SHAPExplainer, CalibrationModule, and DashboardUI. Associations and
dependencies between these classes were indicated by arrows. For example, AudioFile was
consumed by AudioPreprocessor, whose output fed into FeatureExtractor which then passed
extracted features to the PDClassifier. Hyperparameters and model paths were handled through
lightweight configuration variables rather than a dedicated ModelConfig class. This static view
enforces modular design, emphasizing encapsulation and clear interfaces.

#### 3.4.3 Sequence Diagram

The study developed a Sequence Diagram for the “Run Prediction” scenario, detailing the time-
ordered interactions among objects when a user submitted an audio file. The diagram began


with the DashboardUI sending a request to AudioPreprocessor, which returns a normalized
waveform. Next, the DashboardUI invoked the FeatureExtractor, producing a feature set, then
called the PDClassifier that returned an initial risk score. Then the report generating function
will be called to compute and return a SHAP report. Finally, the calibrated risk and SHAP plot
will be packaged and presented to the user. This sequence diagram will ensure that all steps in
the workflow are correctly implemented, and order of operations clearly highlighted.

#### 3.4.4 Activity Diagram

To illustrate the high-level workflow, the project produced an Activity Diagram that started at
“Start Prediction” and proceeded through “Load Audio,” “Validate Format,” “Apply Noise
Reduction,” “Extract Features,” “Run Classifier,” “Calibrate Output,” “Compute SHAP
Values,” and “Render Dashboard Output,” before reaching “End Prediction.” Decision nodes
captured branches such as “Audio Format Valid?” and “Model Confidence Above Threshold?”
which governed error handling or alternative flows such as prompting the user to re-upload a
file. A final decision node checked whether confidence was above the threshold to determine
whether to display a warning or confirmation. This flowchart helped identify parallelizable
steps for instance, calibration and SHAP computation, and clarified conditional logic.

#### 3.4.5 Package Diagram

To manage codebase complexity, the project came up with a Package Diagram grouping related
classes into logical units. For example, the preprocessing package contains AudioFile and
AudioPreprocessor classes, the features package holds the FeatureExtractor class, model
package includes PDClassifier and CalibrationModule classes, explainability package houses
SHAPExplainer class, and UI covers DashboardUI and authentication classes. Dependency
arrows between packages will indicate allowed coupling. This high-level structuring will guide
folder layout and namespace organization.

### 3.5 System Design Diagrams

This section presents the high-level deployment and interface designs that bring the UML
models into a concrete runtime environment. The diagrams here illustrate how the application’s
software layers, data stores, and external services interconnect and how users will interact with
the system through its screens and controls.


#### 3.5.1 System Architecture Diagram

Finally, the project created a System Architecture Diagram to depict the deployment
environment. The diagram showed a Streamlit application hosting both the dashboard and the
machine-learning pipeline within the same runtime environment, rather than separating the
interface and backend through REST APIs. A relational database such as MySQL stored user
credentials and authentication metadata, while a lightweight file storage layer archived
uploaded audio files for later reference. Arrows indicated data flow: for example, the Streamlit
interface sent the uploaded audio directly into the preprocessing and classification modules,
which returned calibrated predictions and SHAP explanations for display on the dashboard.
External arrows represented one-time data ingestion from public repositories such as Kaggle
during the model-training phase. This infrastructure view ensured that all runtime components
and data stores were accounted for and that interactions across the system remained efficient
and secure.

#### 3.5.2 Wireframes

The completed wireframes mirrored the entire interaction flow of the Streamlit application.
The entry screen introduced three options, “log in,” “create an account,” or “proceed as a
guest,” followed by a dedicated login view containing email and password inputs, a sign-in
button, and shortcuts to registration and guest access. After authentication, users were taken to
the main dashboard, where a left-aligned navigation panel linked to the Patients, Detect,
Reports, History, and Account sections. The Patient Intake screen presented fields for full
name, gender, age, and clinical notes, together with a dropdown for selecting an existing patient
record; once the details were saved, the interface guided the user forward to the Detection page.
In the Detection wireframe, clinicians could upload an audio file, preview the recording, and
view the calibrated Parkinson’s probability alongside a short description of the operating
threshold, with buttons leading either to the full diagnostic report or to the diagnosis history
table. The Full Report layout displayed the overall probability score, core acoustic indicators
like jitter and shimmer, and a SHAP feature-impact visualization, and it also provided a space
for clinical notes plus a button to download the auto-generated HTML report. The History
screen showed past detections in a paginated table with each entry listing the timestamp, patient
name, result label, and PD percentage, along with a “Details” action for opening the full report.
The Account page summarized the user’s profile and provided a logout option. Across all
screens, the wireframes were designed to support a clear workflow, consistent layout, and
smooth movement between system features.


### 3.6 Tools and Techniques

In this section, the study is describing the specific tools and techniques that were used to
develop and manage the voice-based Parkinson’s detection system. Each subsection focuses on
one key tool or group of related tools, detailing its role in the workflow and its benefits given
the project’s scope.

#### 3.6.1 Google Colab

Google Colab served as the primary environment for exploratory data analysis, prototyping,
and model training. Colab’s cloud-hosted Jupyter notebooks provided access to GPU
acceleration, which enabled efficient experimentation with feature-extraction pipelines such as
MFCCs, jitter, and shimmer, and supported training of baseline classifiers without relying on
local hardware. The notebook interface also facilitated inline visualization of audio waveforms,
confusion matrices, ROC curves, and SHAP plots, while versioned notebooks made it easy to
track progress during development.

**3.6.2 Git and Data Version Control**

To ensure reproducibility, the project used Git for tracking Python scripts, preprocessing code,
and Streamlit files. Data Version Control (DVC) was integrated to manage large datasets,
processed feature files, and trained model artifacts. This combination enabled experiment
reproducibility by allowing specific dataset versions, preprocessing outputs, and model
checkpoints to be restored and re-run reliably.

#### 3.6.3 Python Libraries

The core signal-processing and machine-learning functionality was implemented using
established Python libraries. Librosa and SciPy handled audio loading, resampling, and
computation of acoustic features such as MFCCs, jitter, shimmer, and HNR. Pandas and
NumPy supported data frame manipulation and numerical operations across preprocessing and
feature extraction. Scikit-learn provided baseline classifiers, calibration utilities, and cross-
validation tools.

#### 3.6.4 SHAP and Calibration Techniques

To ensure interpretability, SHAP was integrated to compute feature-attribution values for each
prediction. SHAP summary and force plots revealed which acoustic features most influenced
the Parkinson’s risk score. For probability calibration, Isotonic Regression from scikit-learn


was applied to transform raw model outputs into clinically meaningful probability estimates,
improving the trustworthiness of decision thresholds displayed in the dashboard.

#### 3.6.5 Streamlit

The user interface was implemented using Streamlit, which enabled rapid development of
interactive components with minimal boilerplate. Streamlit provided widgets for audio upload,
parameter selection, and display of calibration results and SHAP explanations. Its simplicity
made it possible to integrate preprocessing, prediction, and interpretability results into a unified
web interface accessible to end-users.

#### 3.6.6 Auxilliary Tools

Several supplementary tools supported peripheral functionalities. ffmpeg, accessed via Python
wrappers, was used for audio-format handling and ensuring standardized sampling rates. pytest
was used selectively to validate critical functions. Additional utilities within the Python
ecosystem assisted with plotting, file management, and exporting notebooks during
experimentation.

### 3.7 System Deliverables

By the end of the project, a suite of six interconnected deliverables was done, that together
realized the proof-of-concept Parkinson’s voice-analysis system. Each deliverable
corresponded to a self-contained module or artifact, ensuring clear separation of concerns and
facilitating incremental development and testing.

#### 3.7.1 System Documentation

The project compiled comprehensive documentation comprising two main guides. The user
guide walks clinicians or end-users through system setup, authentication, and the full prediction
workflow. Screenshots and example use cases illustrated common tasks. The Developer Guide
details the system’s architecture, UML diagrams, API specifications, configuration files, and
instructions for setting up the development environment. Together, these documents ensure that
both technical and non-technical stakeholders can install, operate, maintain, and extend the
system.

#### 3.7.2 Authentication Module

This module implements secure user management. It connects to a MySQL users table where
each account is stored with an email, role, and a bcrypt-hashed password. Users create accounts
through a dedicated sign-up form, and authentication is performed through a login form that


verifies credentials against the stored hash. Once authenticated, the module uses
st.session_state to manage session persistence, ensuring that only logged-in users can access
the prediction interface. The current implementation primarily supports the clinician role,
though the role field in the database allows for future expansion. By separating authentication
logic from prediction logic, this module protects sensitive outputs and enables controlled
system access.

#### 3.7.3 Audio Preprocessing and Confounder Module

This module handles raw audio ingestion and cleanup. Given an uploaded recording, it first
verifies the file format and sampling rate and, if necessary, converts or resamples the audio.
Next, it applies denoising filters and amplitude normalization. Voice-activity detection is used
to isolate the main speech segments. Concurrently, this module records available metadata,
such as age and gender from the user profile, and may run lightweight acoustic checks to flag
potential confounder patterns such as stammer-like disfluencies. The output of this module is
twofold: a cleaned waveform ready for feature extraction, and a structured metadata record
including any detected confounders. If an error occurs, such as an unsupported format or severe
noise, the module returns an explanatory message rather than crashing. Clear logging within
this module helps diagnose data issues during use.

#### 3.7.4 Feature Extraction and Machine Learning Module

Using the preprocessed audio, this module computes the acoustic feature vector. It calls into
librosa and custom code to calculate MFCC, jitter, shimmer, HNR, and other relevant measures.
Once features are extracted, the module loads the pretrained classifier from disk and computes
a raw PD-risk score. Model files and hyperparameters are organized modularly so the classifier
can be retrained or replaced without changing the dashboard. During development, the module
logged key metrics such as accuracy, AUC, and calibration error on a hold-out set. In use, it
records the final probability output and passes it to the next stage. Hooks are included for batch
inference and for exporting model-performance statistics, supporting future monitoring.

#### 3.7.5 Explainability and Calibration Module

This module makes the model’s decisions interpretable and its output actionable. Given the
feature vector and the trained classifier, it uses SHAP to compute a per-sample explanation.
The result is a list of the most influential features for that prediction, packaged in a plot-friendly
format. For example, if “jitter” and “pitch variability” contributed most to a positive PD
prediction, the SHAP output highlights those. Simultaneously, this module applies the isotonic-


regression calibration curve to convert the raw classifier score into a calibrated probability. It
provides a function that returns both the calibrated risk value and the SHAP explanation object,
which the dashboard displays. By encapsulating explainability and calibration together, this
module ensures that every prediction is accompanied by transparent justification and correct
probability semantics.

#### 3.7.6 Streamlit Dashboard Module

The final deliverable is an interactive Streamlit application that unifies all preceding modules.
The dashboard will present a login screen, an audio-upload interface, real-time preprocessing
logs, calibrated PD-risk probabilities, and SHAP explanation plots. It will include navigation
for managing user accounts and exporting prediction reports. The project has implemented
responsive layouts and error-handling messages to guide users through each step. This module
serves as the primary user-facing artifact, demonstrating the end-to-end functionality of the
system.


## Chapter 4: System Analysis and Design

### 4.1 Introduction

This chapter presents the analysis and design of the system, focusing on the various modeling
artifacts created to blueprint the system before and during implementation. I used Unified
Modeling Language (UML) diagrams to capture both the functional requirements and the
structural and behavioral design. Additionally, I illustrated the system architecture that shows
how different components interact in a deployed environment, and I included the user interface
design via initial wireframes. These design representations were instrumental in ensuring the
system was well-thought-out and that all requirements were addressed in the development
phase. Each subsection below details a specific diagram or design aspect, explaining how it
relates to the project.

### 4.2 Use Case Diagram

The Use Case Diagram captures the key actors that interact with the system and the primary
use cases the system provides. I identified two main actors, the clinician, who represents a
doctor or healthcare professional using the system to screen patients. The second actor is
System Administrator. This represents an admin user who manages the system’s settings and
user accounts.


## Figure 4.1: Use-Case Diagram

### 4.3 Class Diagram

The Class Diagram represents the static structure of the system, showing the main classes, their
attributes, methods, and relationships. Core classes include AudioFile, AudioPreprocessor,
FeatureExtractor, PDClassifier, SHAPExplainer, DashboardUI, Authentication, and
ReportGenerator. Each class encapsulates specific responsibilities such as handling audio
ingestion, feature extraction, prediction, explanation, and interface rendering. Associations and
dependencies between classes are highlighted to emphasize modularity and reusability. This
diagram serves as a blueprint for implementation, ensuring proper encapsulation and clear
interfaces.


## Figure 4.2: Class Diagram

### 4.4 Sequence Diagram

The Sequence Diagram illustrates the time-ordered interactions among system components
during the core workflow of the system. The process begins when the Clinician triggers an
action in the DashboardUI, such as uploading an audio file or requesting authentication. For
predictions, the DashboardUI loads the audio via the AudioFile class, which validates its format
before passing it to the AudioPreprocessor for noise reduction, normalization, and voice-
segment detection. The cleaned signal is then sent to the FeatureExtractor, which computes
MFCCs, jitter, shimmer, prosodic, and other acoustic features. These features are forwarded to
the PDClassifier, which loads the deployed .skops model and returns the risk score. Although
no calibration module is applied in deployment, the classifier output is packaged and sent to


the SHAPExplainer, which generates a local SHAP explanation highlighting the most
influential features. The results that consist of a risk score and SHAP plot, are finally returned
to the DashboardUI for display. For authentication flows, the diagram also shows the
DashboardUI interacting with AuthService and the database for credential verification. Overall,
the diagram captures the exact message flow, execution order, and inter-component
communication of the system.

## Figure 4.3: Sequence Diagram


### 4.5 Activity Diagram

The Activity Diagram models the workflow of the system, beginning at Start Prediction and
proceeding through activities such as Upload Audio, Validate Format, Apply Noise Reduction,
Extract Features, Run Classifier, and Generate SHAP Values, before concluding with Display
Results. Decision nodes capture conditional branches, including checks for invalid file formats
or predictions falling below the confidence threshold, which trigger appropriate warnings or
error messages. This diagram clearly represents the dynamic behavior of the system and the
possible paths a clinician may follow during the diagnostic process.

## Figure 4.4: Activity Diagram


### 4.6 Package Diagram

The Package Diagram groups related classes into coherent modules, helping to manage system
complexity and maintain a clean architecture. The project is organized into packages such as
audio that contains AudioFile, AudioPreprocessor, and FeatureExtractor classes, prediction
package that contains PDClassifier and, SHAPExplainer classes, user package contains
Authentication, UserAccount and, Role classes, data package that contains Database,
PredictionHistory, and ReportGenerator classes, and ui package contains DashboardUI, class.
Each package encapsulates closely related responsibilities, while the dashed dependency
arrows indicate how data and requests flow between them. For example, the UI package
requesting predictions, the audio package processing recordings, and the data package storing
results. This high-level modular structure ensures clear separation of concerns and supports
maintainable, scalable system development.

## Figure 4.5: Package Diagram

### 4.7 System Architecture Diagram

The System Architecture Diagram illustrates the high-level deployment structure of the
Parkinson’s detection platform. A clinician accesses the Streamlit dashboard through a web
browser, where all user interactions, including audio upload, patient intake, prediction requests,
and report viewing are handled directly within the Streamlit runtime. The application internally


performs preprocessing, feature extraction, and Random Forest–based inference without
relying on external REST APIs. A MySQL relational database stores user credentials,
authentication details, and prediction history records, while a lightweight file-storage layer
archives uploaded audio files and generated diagnostic reports. External datasets such as UCI,
Kaggle WAV recordings, and UCLASS stammerer samples appear as offline data sources used
only during the model-training phase. Directional arrows highlight the flow of audio files,
prediction results, and database transactions, ensuring that all runtime components and their
interactions are clearly represented.

## Figure 4.6: System Architecture Diagram


### 4.8 Wireframes

System wireframes were used to visualize the system’s user interface before development.

## Figure 4.7: Login Wireframe


## Figure 4.8: Detection Page Wireframe


## Figure 4.9: New Patient Page Wireframe


## Figure 4.10: Diagnosis History Wireframe


## Chapter 5: System Implementation and Testing

### 5.1 Introduction

This chapter describes the implementation and testing of the confounder-aware voice-based
Parkinson’s disease detection system. It outlines the hardware and software environment,
details the datasets used, explained the training and evaluation of machine learning models,
and documented the functional testing carried out on the system. The results of both machine
learning performance and system-level testing are presented to demonstrate the system’s
robustness, accuracy, and usability.

### 5.2 Implementation Environment

#### 5.2.1 Hardware Specifications

The system was implemented and tested on both local and cloud environments. Locally,
development was carried out on a laptop, while training experiments were accelerated using
Google Colab GPUs


Hardware Component Description & Justification
Laptop Apple Macbook Air, Apple M3 Chip, 8GB
RAM, macOS Sonoma.
I used this for code development, Streamlit
dashboard testing and model creation and
evaluation.
Cloud GPU Google Colab (NVIDIA Tesla 4 T4, 16GB
VRAM).
I utilized this for feature extraction and
training the machine learning models
effectively.
Storage 256 GB SSD.
This provided adequate capacity to store the
datasets, intermediate feature files and
trained model artifacts.
Table 5. 1 : Hardware Specifications


**5.2.2 Software Specifications**

The system relied on several software frameworks, libraries, and platforms to support audio
preprocessing, model training, explainability, and deployment.


Software/Tools Version/Description Role in Project
Python 3.12 It was the primary
programming language used
for system implementation
and model development.
Scikit-learn 1.x Provided core algorithms for
Logistic Regression,
Random Forest, and SVM
wrappers.
I also used it for evaluation
metrics.
Librosa 0.10 Used to extract MFCCs,
jitter, shimmer, ZCR,
spectral centroid, and other
audio features.
Pandas & NumPy - Managed datasets, feature
matrices, numerical
computations, and
preprocessing.
Google Colab Cloud Environment I used it as the primary
environment for model
development,
hyperparameter tuning, and
SHAP computation
SHAP 0.42 Generated interpretability
plots (summary and force
plots) for the final model.
Streamlit 1.34 It provided the framework
for building the UI.



MySQL 8.x Stored user accounts,
authentication data, and audit
logs.
ffmpeg Latest Handled resampling and
conversion of uploaded
audio files.
Matplotlib Latest I used it to render ROC
curves, calibration curves,
and confusion matrices.
Table 5. 2 : Software Specifications

### 5.3 Dataset Description

This section aims to describe the datasets I used to train, validate and test the confounder-aware
Parkinson’s disease detection model. The final implementation relied on three complementary
datasets that collectively provided Parkinsonian speech, healthy control recordings, and non-
PD disfluent samples. By combining these sources, the system learned to distinguish genuine
Parkinson’s-related vocal impairments from confounding variations such as stammering or
recording inconsistencies.

The first dataset used in this study was the UCI Parkinson’s Dataset, which consisted of 195
sustained-vowel recordings obtained from 31 individuals. Each recording was represented not
as raw audio but as a structured set of twenty-two acoustic and nonlinear voice features,
including jitter, shimmer, fundamental frequency values, noise-to-harmonics measures (NHR
and HNR), and complexity metrics such as RPDE, DFA, spread1, and PPE. These features are
widely used in dysphonia research and have historically formed the basis of Parkinson’s voice
classification models. The dataset included a categorical target variable, status, indicating
whether each sample belonged to a Parkinson’s patient or a healthy control. This tabular feature
set provided a reliable baseline for developing and validating the initial model architecture.


## Figure 5.1: Sample of the UCI Parkinson's Dataset

To complement the UCI dataset with raw speech data, the study also incorporated a Parkinson’s
versus Healthy .wav corpus comprising eighty-one audio recordings accompanied by detailed
metadata. Each entry included the file path, diagnostic label, speaker age, sex, sample rate, and
duration of the recording. These .wav files offered richer temporal and spectral detail than the
UCI tabular records, enabling extraction of MFCCs, spectral centroid, spectral bandwidth,
rolloff, zero-crossing rate, RMS energy, jitter, shimmer, HNR, and other time-frequency
features that could not be captured in the UCI dataset. The inclusion of demographic metadata
also allowed the model to operate in a confounder-aware manner, adjusting for factors such as
age or sex that may influence vocal patterns independently of disease status.


## Figure 5.2: A sample of Kaggle’s Parkinson’s Dataset

To model non-Parkinsonian speech irregularities that could lead to false positives, the study
integrated the UCLASS Stammerers Dataset as a dedicated confounder source. This dataset
consisted of eighty-one recordings from individuals exhibiting stammering and other disfluent
speech patterns that acoustically resemble Parkinsonian dysphonia. Each entry included
descriptive metadata such as speaker age, sex, session identification, recording duration, and
sample rate. By incorporating these recordings into the training process, the model was
explicitly exposed to nuanced vocal disruptions unrelated to Parkinson’s disease. This exposure
strengthened the model’s ability to differentiate pathological dysphonia from common speech
disfluencies, thereby improving robustness and reducing the likelihood of misclassifying non-
PD speakers as Parkinsonian.


## Figure 5.3: Metadata Sample from the UCLASS Stammerers Dataset

All recordings used in the study, whether originating from the UCI dataset, the Parkinson’s
WAV corpus, or the UCLASS stammerers collection, were subjected to a uniform
preprocessing pipeline. The audio files were standardized to 16-bit PCM format with a
sampling rate of 44.1 kHz, followed by amplitude normalization and noise filtering to minimize
background interference and ensure consistent feature extraction. To further enhance model
generalization and address natural variability across speakers and recording conditions, data
augmentation techniques were applied, including controlled pitch shifting, Gaussian noise
injection, and mild time stretching within a ±10 percent range. These procedures increased
dataset diversity and reduced the risk of overfitting, especially given the relatively small sample
size of the raw audio corpus.

Although additional datasets such as the Saarbruecken Voice Database and Mozilla Common
Voice were reviewed as potential sources of confounders, they were excluded from the final
implementation because their metadata were inconsistent and the recordings required
substantial cleaning beyond the project’s available time and computational resources.

After preprocessing, the combined dataset was partitioned into training, validation, and testing
splits in proportions of 70 %, 20 %, and 10 %, respectively. Stratified sampling was applied to
maintain balanced Parkinson’s and healthy class distributions across subsets. Because the
Kaggle and UCLASS .wav datasets did not include subject-level identifiers, the split was
performed at the file level with each audio file appearing in only one subset to avoid direct
duplication or leakage. While true speaker-level separation could not be enforced due to


missing metadata, the use of unique file-based splitting ensured that the model was evaluated
on previously unseen audio recordings. These curated subsets formed the basis for the feature
extraction and model training workflows detailed in Section 5.4.

### 5.4 Model Training and Evaluation

This section outlines the process I used to train and evaluate the machine-learning models for
Parkinson’s disease detection. It speaks of the model components, training procedure, and the
evaluation metrics I used to measure the predictive performance.

#### 5.4.1 Model Components

The model training process was carried out in two phases: baseline benchmarking and final
model optimization. During the baseline phase, Logistic Regression, Support Vector Machine
(SVM) with an RBF kernel, and Random Forest classifiers were implemented to establish
benchmark performance and confirm that the extracted features were sufficiently
discriminative. Logistic Regression offered a simple linear model suitable for small datasets,
the SVM introduced nonlinear separation through the RBF kernel, while Random Forest
provided a non-parametric ensemble capable of modeling complex relationships among
acoustic features such as jitter, shimmer, and MFCC coefficients.

The outcomes from these baseline models validated the usefulness of the selected features and
revealed that although the SVM captured nonlinear boundaries more effectively than Logistic
Regression, tree-based ensemble methods consistently produced superior performance and
generalization.

For Logistic Regression, the model estimates the probability that a sample 𝑥 belongs to the
Parkinson’s class as:


𝑃(𝑦= 1 |𝑥)= 1 +𝑒!"#!^1 $∑#"$%#"&"'


Equation 5. 1 : Logistic Regression Probability Function

Where P(y=1|x) represents the probability of Parkinson’s disease presence, 𝛽( is the intercept
and 𝛽) are the learned feature coefficients.

The Random Forest model consists of an ensemble of decision trees {𝑇*,𝑇+,...,𝑇,}, where the
final class prediction is determined through majority voting:


##### 𝑦 1 =𝑚𝑜𝑑𝑒{𝑇*(𝑥),𝑇+(𝑥),...,𝑇,(𝑥)}


Equation 5. 2 : Random Forest Majority Voting

This ensemble structure improves generalization by averaging multiple tree predictions to
minimize variance

## the final prediction Figure 5.4: Simplified Random Forest model showing multiple decision trees voting to produce


produce the final prediction

Among the evaluated models, the Random Forest classifier demonstrated the strongest
validation performance while maintaining fast inference time and high stability. Although the
SVM (RBF) model performed competitively during offline evaluation, its inference latency
and higher computational cost made it less suitable for deployment in a real-time clinical tool.
For this reason, the Random Forest model was selected as the final deployed classifier due to
its robustness, speed, and seamless integration with the Streamlit interface.


Each sample was represented by a feature vector comprising both metadata and acoustic
descriptors. Metadata included age and gender, while acoustic features included the mean and
standard deviation of MFCC coefficients (1–13), spectral features such as centroid, bandwidth,
rolloff, zero-crossing rate, RMS energy, duration in seconds, pitch statistics (F0 mean and
variance), and pathological voice measures drawn from the MDVP feature set such as jitter,
shimmer, NHR, HNR, RPDE, DFA, spread1, spread2, D2, and PPE. This combination captured
both phonatory stability and spectral characteristics commonly associated with Parkinsonian
dysphonia.

Hyper-parameter tuning was carried out through grid search to identify configurations that
offered the best trade-off between model accuracy and computational cost. Table 5. 3
summarizes the optimal parameters obtained for each classifier.


Model Key Parameters Tuned Optimal Values
Logistic Regression Regularization parameter (C) 0.5
Random Forest n_estimators = 500
max_depth = 12
min_samples_split = 2
class_weight = “balanced”


500 trees gave me a stable
performance without
excessive computation.


SVM(RBF) C =1.0
Gamma = “scale”
Kernel = “rbf”
Table 5. 3 : Optimized Model Hyperparameters

Model training and evaluation were performed in Google Colab, using CPU and GPU
acceleration where available. All code and experiments were tracked using Data Version
Control (DVC) to ensure reproducibility across runs.

Each voice sample was represented by a structured feature vector containing both metadata and
acoustic descriptors. Metadata included the speaker’s age and gender, while acoustic features
comprised the mean and standard deviation of MFCC coefficients (1– 13 ), spectral descriptors
(centroid, bandwidth, rolloff, zero-crossing rate, RMS energy), duration in seconds, pitch
statistics (F0 mean and variance), and pathological voice markers from the MDVP dataset such
as jitter, shimmer, NHR, HNR, RPDE, DFA, spread1, spread2, D2, and PPE. This combination
captured both phonatory stability and spectral characteristics commonly associated with
Parkinsonian dysphonia.


Explainability was integrated into the evaluation using SHAP, which provided both global and
local interpretability for the Random Forest classifier. SHAP visualizations were generated
during analysis and later incorporated into the Streamlit system, ensuring that each prediction
displayed in the interface included a meaningful feature-impact explanation.

## Figure 5.6: SHAP Global Importance for the Random Forest Classifier

This integration of explainability made the model outputs transparent and clinically
interpretable. The Random Forest classifier was therefore selected for deployment because it
provided the best balance between accuracy, interpretability, responsiveness, and
computational efficiency.


## interface Figure 5.7: Example of SHAP local explanation visualization as displayed on the Streamlit


interface

#### 5.4.2 Model Evaluation Metrics

Model performance was assessed using several complementary metrics to ensure a balanced
and clinically meaningful evaluation. Because Parkinson’s detection is a binary classification
task, each metric focused on a different aspect of diagnostic reliability. In this context, accuracy
represented the overall proportion of correctly classified recordings among all predictions and
was computed as:

𝐴𝑐𝑐𝑢𝑟𝑎𝑐𝑦= (^) 𝑇𝑃+𝑇𝑁𝑇𝑃++𝑇𝑁𝐹𝑃+𝐹𝑁
Equation 5. 3 : Accuracy Formula


where TP and TN denote true positives and true negatives, and FP and FN represent false
positives and false negatives, respectively. High accuracy indicated that the model correctly
identified both Parkinson’s and healthy samples most of the time.

Precision expressed the proportion of recordings predicted as Parkinson’s that were
Parkinson’s. It was calculated by:


𝑃𝑟𝑒𝑐𝑖𝑠𝑖𝑜𝑛=𝑇𝑃𝑇𝑃+𝐹𝑃


Equation 5. 4 : Precision Formula

A high precision value showed that the model rarely misclassified healthy voices as
Parkinsonian, reducing unnecessary clinical alarms. Recall, also referred to as sensitivity,
measured the proportion of true Parkinson’s cases that the model successfully detected:


𝑅𝑒𝑐𝑎𝑙𝑙=𝑇𝑃𝑇𝑃+𝐹𝑁


Equation 5. 5 : Recall Formula

A higher recall was particularly important because failing to identify a patient with early
Parkinson’s could delay intervention. To balance precision and recall, the F1-score was
computed as the harmonic mean of the two:


𝐹 1 = 2 ×𝑃𝑟𝑒𝑐𝑖𝑠𝑖𝑜𝑛𝑃𝑟𝑒𝑐𝑖𝑠𝑖𝑜𝑛×+𝑅𝑒𝑐𝑎𝑙𝑙𝑅𝑒𝑐𝑎𝑙𝑙


Equation 5. 6 : Formula to Calculate F1-Score of the Models

This score provided a single indicator of the model’s effectiveness in handling both false
positives and false negatives.

Finally, the Area Under the Receiver Operating Characteristic Curve (AUC-ROC) quantified
the model’s overall ability to distinguish Parkinson’s from healthy voices across varying
classification thresholds. An AUC close to 1.0 signified excellent discrimination performance,
while values near 0.5 indicated no better than random guessing.

Since the Random Forest emerged as the strongest model during experimentation, its ROC and
Precision–Recall curves were generated as part of the analysis. These curves as shown below,
demonstrated strong overall discriminative ability, confirming that the model captured early
Parkinsonian vocal patterns with high reliability.


## Figure 5.8: ROC Curve and Precision-Recall Curve for the Random Forest Classifier.

Together, these measures gave a comprehensive assessment of model behavior. Accuracy and
AUC evaluated global performance, whereas precision, recall, and F1-score provided finer
insight into clinical reliability, ensuring that the final model minimized false alarms while
capturing nearly all true Parkinson’s cases.

Across the three evaluated classifiers, the Random Forest achieved the best balance of accuracy
and generalization, reaching 86% accuracy with an F1-score of 0.84. Logistic Regression
achieved 78% accuracy with an F1-score of 0.76, while the SVM (RBF) classifier showed
competitive recall but higher computational cost. These comparative results confirmed that
Random Forest offered the best trade-off between performance and deploy-ability for this
project.

## Figure 5.9: Confusion matrix for the Random Forest Model evaluated on the held-out test.

out test set using a clinical decision threshold of 0.70. This matrix highlights the balance
between true positive detection and accurate identification of healthy controls.



Figure 5. 8 : Confusion matrix for the Random Forest Model evaluated on the held-out test.

A comparative ROC analysis of all three models, Logistic Regression, Random Forest, and
SVM (RBF) is included in the Appendix A7: to illustrate performance differences across
architectures.


### 5.5 Functional Testing

Functional testing was carried out manually to verify that each major module of the system
behaved as expected from an end-user perspective. The tests focused on the core workflow:
authentication, patient registration, audio upload, prediction, report viewing, and history
retrieval.

Each test case specified the scenario under consideration, sample input data, the expected
system behavior, the actual experimental outcome, and a pass/fail verdict.


Test
Case ID


Module Description Test
Data/Preconditions


Outcome Verdict


TC- 01 Authentication
(Sign Up)


Register a
new
clinician
account
with valid
details


New email
Strong password
(≥8 chars),
matching confirm
password


Account
created
successfully.
The user was
redirected to
login screen
and could log
in with the
new
credentials.


Pass


TC- 02 Authentication
(Sign In)


Log in with
valid
credentials


email -
xyz@gmail.com
pass - 123456789


User
authenticated
successfully.
Dashboard
loads with
sidebar items
visible.


Pass


TC- 03 Authentication
(Invalid
Login)


Attempt
login with
incorrect
password.


Existing user email
with wrong
password


System
displays
“invalid
credentials”
message; user
remains on


Pass


login screen,
no session
created.
TC- 04 Patient Intake Create a
new patient
record


Patient name – Jan
Doe
Age – 45
Gender - Female
Brief clinical notes

- This is a test
Patient


Patient saved
to database
successfully.
She appears in
patient
dropdown on
Detection
page.
No validation
errors for valid
input.


Pass

TC- 05 Audio Upload
& Prediction


Upload a
valid .wav
file and run
the
detection.


Selected patient;
mono 16-bit WAV
file at expected
sampling rate.


File accepted.
Preprocessing
successful.
Random
Forest model
returns PD
probability.
Result and
threshold note
are displayed.


Pass

TC- 06 Invalid Audio
Handling


Upload a
non-audio
or
unsupported
format file


Select a patient.
Pick a .txt file


System rejects
file and
displays an
error message
saying,
“incorrect file
format”.
No prediction
attempted.


Pass


TC- 07 Report
Generation


View full
diagnostic
report after a
successful
prediction.


Existing prediction
for a patient.


Full report
page opens
showing PD
probability,
key acoustic
metrics (jitter,
shimmer,
HNR, PPE),
and SHAP
explanation
plot.


Pass

TC- 08 History &
Record
Retrieval


View
previous
detections in
History
page


At least one past
prediction stored


History table
lists past
detections
with
timestamp,
patient name,
result, and PD
probability;
“View details”
works.


Pass

TC- 09 Account
Management
& Logout


View
account
details and
log out.


Logged-in
clinician.


Account page
shows
username,
email,
hospital, and
role.
Logout clears
session and
returns user to
login/welcome
screen.


Pass


Table 5. 4 : Functional Testing Results


### 5.6 Results and Discussion

The results of the model training showed that the confounder-aware machine-learning pipeline
achieved strong and consistent performance across Parkinson’s, healthy, and stammerer voice
samples. Logistic Regression produced the weakest baseline performance, achieving 78%
accuracy with an F1-score of 0.76, indicating that linear decision boundaries could not
adequately capture the non-linear patterns present in dysphonic speech. The SVM (RBF) model
improved on this baseline by learning more complex boundaries, but its slower inference time
and higher computational cost made it unsuitable for deployment in a real-time clinical
interface.

The Random Forest classifier delivered the best balance of accuracy, generalization, and speed,
achieving 86% accuracy with an F1-score of 0.84. Its ensemble structure enabled the model to
capture richer acoustic variability across MFCC statistics, spectral characteristics, jitter,
shimmer, and harmonic-to-noise ratios. Exposure to stammerer samples further reduced false
positives, showing improved robustness against non-Parkinsonian disfluencies.

Functional testing of the Streamlit dashboard confirmed smooth and reliable system behavior,
with users able to follow the full workflow shown in Figure 5. 9. Audio upload, preprocessing,
prediction, and SHAP explanation rendering all executed correctly, while authentication and
patient-management screens performed as expected. Predictions from the deployed .skops
Random Forest model remained consistent with experimental outputs from Colab.

SHAP explanations, illustrated in Figure 5. 10 , reinforced interpretability by highlighting the
acoustic features most responsible for each prediction. The final diagnostic report, shown in
Figure 5. 11 , provided clinicians with a complete summary of probability scores, key voice
metrics, and optional clinical notes.

Overall, the findings confirmed that the system achieved its intended objectives by providing
accurate Parkinson’s detection, maintaining resilience against demographic and disfluency-
related confounders, and presenting interpretable results through a user-friendly dashboard.
The close alignment between experimental and deployed results demonstrated that the model
and interface were successfully integrated into a practical, clinician-oriented diagnostic


workflow.


Figure 5. 9 : Prediction Workflow


Figure 5. 10 : SHAP Explanation


Figure 5. 11 : Full Report Page


### 5.7 GitHub Documentation

The complete implementation of the Parkinson’s detection system is version-controlled on
GitHub at https://github.com/is-project-4th-year/Parkinson-s-Detector. The repository is
structured to separate user interface code, machine-learning model assets, database scripts, and
reusable utilities, ensuring maintainability and reproducibility throughout the project lifecycle.

At the highest level, the app_pages/ directory contains all Streamlit interface modules,
including authentication, patient intake, detection, SHAP explanations, reporting, and account
settings. The utils/ directory holds cross-cutting functions such as password hashing using
bcrypt, MySQL database handlers, audio-validation tools, and inference helpers used across
the application. All trained machine-learning artifacts, including the deployed
parkinson_rf_model.skops, the associated scaler.pkl, and the ordered feature_names.json file,
are stored in the models/ directory, ensuring that the deployed model faithfully mirrors the
version validated during experimentation. The seeds/ folder contains the SQL script used to
initialize the users table and default clinician account, while the storage/ directory provides
temporary space for uploaded audio and exported diagnostic reports.

Although experimentation occurred primarily in Google Colab, the exported model artifacts
and configuration files stored in the repository guarantee reproducibility. GitHub’s commit
history and branching model demonstrate progressive development, bug-fixing, and refinement
of modules across the system. The repository therefore acts not only as a deployment medium
but also as a detailed record of the system’s evolution, documenting version changes, feature
additions, and the integration of model inference into the Streamlit clinical workflow.

This structure and versioning approach support collaborative development, simplify
debugging, and maintain clear separation between preprocessing, inference, and user-facing
components. The repository thus provides a complete, transparent and reusable implementation
of the Parkinson’s detection system, consistent with software-engineering best practices and
the methodological principles applied throughout the project.


## Chapter 6: Conclusions, Recommendations and Future Works

### 6.1 Conclusions

This project set out to develop a confounder-aware, voice-based Parkinson’s disease detection
system supported by machine-learning classification and an interactive Streamlit interface. The
results demonstrated that Parkinsonian dysphonia can be reliably identified using a
combination of MFCC statistics, spectral measures, and clinically relevant pathological
markers such as jitter, shimmer, NHR, and HNR. The Random Forest model achieved the
strongest overall performance among the evaluated classifiers, reaching 86% accuracy with an
F1-score of 0.84, and showed greater robustness against demographic and disfluency-related
confounders than both Logistic Regression and SVM (RBF). The use of confounder datasets,
particularly the UCLASS stammering recordings, proved effective in reducing false positives,
a crucial objective of this study.

The deployment of the Random Forest classifier through a Streamlit dashboard further
demonstrated that the pipeline could be translated into a functional diagnostic tool. Functional
tests confirmed that clinicians could upload audio, view preprocessing results, interpret SHAP
explanations, and generate structured diagnostic reports consistently and without errors. The
inclusion of SHAP provided meaningful insight into model decision-making, making the
system not only accurate but also interpretable and clinically transparent. Overall, the study
successfully met its objectives by producing a reliable, explainable, and user-friendly decision-
support system for early Parkinson’s screening.

### 6.2 Recommendations

Based on the findings, several recommendations can be made for clinical use and future system
deployments. First, the model should be used as a screening aid rather than a standalone
diagnostic tool, as early-stage Parkinson’s symptoms may vary across individuals and acoustic
distortions can arise from unrelated vocal conditions. Clinical practitioners using the system
should always complement model output with professional assessment, particularly when
SHAP explanations indicate borderline or uncertain feature contributions.

Second, deployment should ideally occur in environments where audio quality can be
controlled. Although the system incorporates noise reduction and validation checks,
background noise, poor microphones, and inconsistent recording distances may still influence
acoustic features. It is therefore recommended that institutions adopting the tool implement a
simple voice-recording protocol to standardize data collection.


Finally, developers maintaining or extending the system should adopt continuous dataset
expansion. Increasing the representation of diverse accents, age groups, and real-world
recording conditions will further improve robustness and help reduce demographic bias.
Integrating additional confounder categories such as respiratory conditions or vocal fatigue
would also strengthen model reliability.

### 6.3 Future Works

Several avenues remain open for extending the system’s capabilities. One promising direction
is the incorporation of deep-learning architectures such as CNN-based spectrogram classifiers
or wav2vec-style embeddings, which may extract richer temporal patterns beyond manually
engineered acoustic features. Future studies may also explore model calibration improvements,
enabling more reliable probability outputs that better align with clinical decision thresholds.

Another extension involves expanding the current pipeline to support longitudinal monitoring,
allowing clinicians to track changes in a patient’s voice over time. This would transform the
tool from a one-off screening mechanism into a continuous monitoring system capable of
identifying early deterioration or treatment response.

Additionally, integrating mobile-friendly deployment or an offline mode could make the
system accessible in low-resource environments where internet connectivity is limited. Finally,
further work may include formal usability testing with clinicians, integration with electronic
medical record systems, and validation on larger, clinically verified datasets.

Overall, these extensions would enhance accuracy, usability, and real-world applicability,
enabling the system to evolve into a comprehensive and clinically scalable tool for Parkinson’s
disease assessment


## References

Alhazmi, A., & Huang, S. (2020). Integrating Design Thinking into Scrum Framework in the


Context of Requirements Engineering Management. Proceedings of the 2020 3rd
International Conference on Computer Science and Software Engineering , 33–45.
https://doi.org/10.1145/3403746.3403902

Barukab, O., Ahmad, A., Khan, T., & Thayyil Kunhumuhammed, M. R. (2022). Analysis of


Parkinson’s Disease Using an Imbalanced-Speech Dataset by Employing Decision Tree
Ensemble Methods. Diagnostics , 12 (12), 3000.
https://doi.org/10.3390/diagnostics12123000

Brenner, A., Van Alen, C. M., Plagwitz, L., & Varghese, J. (2023). Classification of Parkinson’s


Disease from Voice – Analysis of Data Selection Bias. In M. Hägglund, M. Blusi, S.
Bonacina, L. Nilsson, I. Cort Madsen, S. Pelayo, A. Moen, A. Benis, L. Lindsköld, &
P. Gallos (Eds.), Studies in Health Technology and Informatics. IOS Press.
https://doi.org/10.3233/SHTI230079

Cao, F., Vogel, A. P., Gharahkhani, P., & Renteria, M. E. (2025). Speech and language


biomarkers for Parkinson’s disease prediction, early diagnosis and progression. Npj
Parkinson’s Disease , 11 (1), 57. https://doi.org/10.1038/s41531- 025 - 00913 - 4

Crawford, J. L. (2025). Linguistic changes in spontaneous speech for detecting Parkinson’s


disease using large language models. PLOS Digital Health , 4 (2), e0000757.
https://doi.org/10.1371/journal.pdig.0000757

Dudek, M., Hemmerling, D., Kaczmarska, M., Stepien, J., Daniol, M., Wodzinski, M., &


Wojcik-Pedziwiatr, M. (2025). Analysis of Voice, Speech, and Language Biomarkers
of Parkinson’s Disease Collected in a Mixed Reality Setting. Sensors , 25 (8), 2405.
https://doi.org/10.3390/s25082405


Kouli, A., Torsney, K. M., & Kuan, W.-L. (2018). Parkinson’s Disease: Etiology,


Neuropathology, and Pathogenesis. In T. B. Stoker & J. C. Greenland (Eds.),
Parkinson’s Disease: Pathogenesis and Clinical Aspects. Codon Publications.
http://www.ncbi.nlm.nih.gov/books/NBK536722/

Lim, W.-S., Fan, S.-P., Chiu, S.-I., Wu, M.-C., Wang, P.-H., Lin, K.-P., Chen, Y.-M., Peng, P.-


L., Jang, J.-S. R., & Lin, C.-H. (2025). Smartphone-derived multidomain features
including voice, finger-tapping movement and gait aid early identification of
Parkinson’s disease. Npj Parkinson’s Disease , 11 (1), 111.
https://doi.org/10.1038/s41531- 025 - 00953 - w

Little, M. (2007). _Parkinsons_ [Dataset]. UCI Machine Learning Repository.


https://doi.org/10.24432/C59C74.

Luo, Y., Qiao, L., Li, M., Wen, X., Zhang, W., & Li, X. (2025). Global, regional, national


epidemiology and trends of Parkinson’s disease from 1990 to 2021: Findings from the
Global Burden of Disease Study 2021. Frontiers in Aging Neuroscience , 16 , 1498756.
https://doi.org/10.3389/fnagi.2024.1498756

Maskeliūnas, R., Damaševičius, R., Kulikajevas, A., Padervinskis, E., Pribuišis, K., & Uloza,


V. (2022). A Hybrid U-Lossian Deep Learning Network for Screening and Evaluating
Parkinson’s Disease. Applied Sciences , 12 (22), 11601.
https://doi.org/10.3390/app122211601

Naeem, I., Ditta, A., Mazhar, T., Anwar, M., Saeed, M. M., & Hamam, H. (2025). Voice


biomarkers as prognostic indicators for Parkinson’s disease using machine learning
techniques. Scientific Reports , 15 (1), 12129. https://doi.org/10.1038/s41598- 025 -
96950 - 3

Ngo, Q. C., Motin, M. A., Pah, N. D., Drotár, P., Kempster, P., & Kumar, D. (2022).


Computerized analysis of speech and voice for Parkinson’s disease: A systematic



review. Computer Methods and Programs in Biomedicine , 226 , 107133.
https://doi.org/10.1016/j.cmpb.2022.107133

Phan, R. C.-W., Low, Y.-Y., Wong, K., & Minemura, K. (2021). Strengthening speech content


authentication against tampering. Speech Communication , 129 , 41–57.
https://doi.org/10.1016/j.specom.2021.02.006

Rabie, H., & Akhloufi, M. A. (2025). A review of machine learning and deep learning for


Parkinson’s disease detection. Discover Artificial Intelligence , 5 (1), 24.
https://doi.org/10.1007/s44163- 025 - 00241 - 9

Rahman, W., Lee, S., Islam, M. S., Antony, V. N., Ratnu, H., Ali, M. R., Mamun, A. A., Wagner,


E., Jensen-Roberts, S., Waddell, E., Myers, T., Pawlik, M., Soto, J., Coffey, M., Sarkar,
A., Schneider, R., Tarolli, C., Lizarraga, K., Adams, J., ... Hoque, E. (2021). Detecting
Parkinson Disease Using a Web-Based Speech Task: Observational Study. Journal of
Medical Internet Research , 23 (10), e26305. https://doi.org/10.2196/26305

Sandu, R., Wangsa, K., Chugh, R., & Karim, S. (2022). A comparative study between design


thinking, agile, and design sprint methodologies. International Journal of Agile Systems
and Management , 15 (2), 225. https://doi.org/10.1504/IJASM.2022.10049716

Shen, M., Mortezaagha, P., & Rahgozar, A. (2025). Explainable artificial intelligence to


diagnose early Parkinson’s disease via voice analysis. Scientific Reports , 15 (1), 11687.
https://doi.org/10.1038/s41598- 025 - 96575 - 6

Simone, L., Camporeale, M. G., Rubino, V. M., Gervasi, V., & Dimauro, G. (2025).


Interpretable Early Detection of Parkinson’s Disease through Speech Analysis (Version
1). arXiv. https://doi.org/10.48550/ARXIV.2504.17739

Suppa, A., Costantini, G., Asci, F., Di Leo, P., Al-Wardat, M. S., Di Lazzaro, G., Scalise, S.,


Pisani, A., & Saggio, G. (2022). Voice in Parkinson’s Disease: A Machine Learning
Study. Frontiers in Neurology , 13 , 831428. https://doi.org/10.3389/fneur.2022.831428


Tougui, I., Jilbab, A., & Mhamdi, J. E. (2022). Machine Learning Smart System for Parkinson


Disease Classification Using the Voice as a Biomarker. Healthcare Informatics
Research , 28 (3), 210–221. https://doi.org/10.4258/hir.2022.28.3.210

Vatsavai, D., Iyer, A., & Nair, A. A. (2025). A quantum inspired machine learning approach for


multimodal Parkinson’s disease screening. Scientific Reports , 15 (1), 11660.
https://doi.org/10.1038/s41598- 025 - 95315 - 0


## Appendix

**Appendix A1: Time Schedule May – July Semester 1**

**Appendix A2: Time Schedule August – November Semester 2**


### Appendix A3: Login Screen


### Appendix A4: Patient Intake


### Appendix A5: Diagnosis History.....................................................................................


### Appendix A6: Account Page


**Appendix A7: Comparative ROC analysis for Logistic Regression, SVM (RBF), and
Random Forest.**


### Appendix A8: Turnitin Report


