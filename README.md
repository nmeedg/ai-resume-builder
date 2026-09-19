# Tailrcv

Tailrcv is an AI-powered resume builder. Given a job posting, it adapts a user's resume to match that specific offer.

## Overview

Instead of producing one generic resume, Tailrcv adapts an existing resume to each job offer the user applies to. The user submits an offer, selects which resume format to adapt, and chooses how much control they want over the process.

The product is built around two axes:

1. **Resume format** : the user chooses which version of their resume to adapt: an existing ("old") format already on file, or a new format being built for this application.
2. **Generation mode** : the user chooses how the adaptation is produced: fully automatic, or step-by-step manual editing.

## How it works

### Step 0 : Build the user profile (one time)
Before adapting any resume, the user fills in their profile once: personal information, work experience, education, skills, certifications, and any other reusable resume content. This profile is stored in the application and becomes the single source of truth for that user.

From this point on, the user is never asked to re-enter this information. Every job offer submitted afterward is adapted directly from the stored profile, in both Automatic and Manual mode.

### Step 1 : Submit the job offer
The user provides the job offer (as text, a link, or an uploaded file).

### Step 2 : Choose the resume format
The user selects which resume to adapt: an existing one already stored in the app, or a new one being created for this specific application.

### Step 3 : Choose a generation mode

**Automatic mode**
The user submits the offer along with their base resume information. The application analyzes the offer, identifies the most relevant experience and skills, rewrites and reorganizes the resume content, and returns a completed draft with no further input required.

**Manual mode**
The user builds the resume section by section (experience, skills, education, and so on), with AI assistance available at each step to suggest wording, highlight relevant keywords from the offer, and refine content. This mode is closer in spirit to tools like Teal, giving the user direct control over the final result.

## Core features

- Job offer submission (text, link, or file upload)
- Selection between an existing and a new resume format
- Automatic mode for one-shot resume generation
- Manual mode for guided, field-by-field editing with AI assistance
- Keyword and content matching against the submitted job offer
- Resume export (PDF)