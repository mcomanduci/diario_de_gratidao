# Product Requirement Document (PRD) & Design System: Diário de Gratidão V2.0

## 1. Executive Summary

**Objective**: Upgrade "Diário de Gratidão" from a simple text logger to a premium, engaging, and reflective mental health platform.
**Core Philosophy**: Gratitude, Calm, Positivity.
**Target Audience**: Users seeking mindfulness, mental clarity, and a positive daily habit.

---

## 2. UX/UI & Design Philosophy

### 2.1 Visual Identity & Theme

The design should feel like a digital sanctuary—private, safe, and serene. We will move away from the "clinical" or "generic app" look to something more organic and tactile.

**Color Palette (Calm & Organic)**

- **Primary (Growth & Calm)**: `#4A7C59` (Sage Green) - Used for primary actions, active states.
- **Secondary (Warmth)**: `#F4E4BA` (Soft Parchment) - Backgrounds, cards, to mimic paper.
- **Accent (Joy)**: `#E78F81` (Muted Coral) - Highlights, streaks, "delight" moments.
- **Neutral**: `#2D3047` (Deep Charcoal) - Text (softer than pure black).
- **Surface**: `#FAF9F6` (Off-White) - Main app background.

**Typography Hierarchy**

- **Headings (Reflective)**: _Lora_ or _Playfair Display_. Serif fonts evoke the feeling of a classic book or journal.
- **Body (Readable)**: _Nunito_ or _Inter_. Rounded sans-serifs feel friendly and approachable.

### 2.2 Layout & Navigation

**Current**: Simple Feed (List of text).
**Proposed V2.0**: **"The Journey" Timeline**.

- **Home View**: A vertical, connecting timeline where each entry is a "milestone" or "leaf" on a stem.
- **Calendar View**: A toggle to see a monthly view where days with entries are highlighted (e.g., a blooming flower for days with entries).
- **Entry Experience**: Instead of a simple input box, use a "Focus Mode" modal that dims the background, playing soft ambient sounds (optional), making the writing experience intimate.

### 2.3 Micro-interactions & "Delight"

1.  **The "Bloom" Save**: When a user saves a note, the save button transforms into a blooming flower or a floating leaf animation before settling into the timeline.
2.  **Hover Breathing**: Interactive elements (cards, buttons) gently scale up and down (breathe) when hovered, reinforcing the "calm" theme.
3.  **Streak Ignite**: When a streak is extended, a subtle "spark" or "warm glow" travels across the screen header.

---

## 3. Functional Enhancements (Feature Set)

### 3.1 Gamification & Retention (The "Garden" System)

Instead of aggressive gamification (points/leaderboards), we use **Reflective Gamification**.

- **Gratitude Garden**: Each entry "waters" a virtual plant. A 7-day streak results in a fully bloomed flower added to the user's "Garden" (profile).
- **Streaks**: Visualized as a "Chain of Light" or "Growing Vine".
- **Badges**: "Mindful Monday" (posted 5 Mondays in a row), "Early Bird" (morning entries).

### 3.2 Content Prompts (Writer's Block Breaker)

- **Daily Shuffle**: A "Shuffle" button above the text area.
  - _Examples_: "What made you smile today?", "Who is someone you appreciate?", "What is a small win you had?"
- **Mood-Based Prompts**: If the user selects "Anxious", prompt: "What is one thing within your control right now?"

### 3.3 Data Visualization

- **Mood Calendar**: A calendar view where each day is colored by the dominant mood selected.
- **Word Cloud**: A "Gratitude Cloud" generated monthly, showing the most used words (e.g., "Family", "Coffee", "Sun").

### 3.4 Privacy & Security

- **Data Encryption**: Ensure all entries are encrypted at rest in the database.
- **Private Mode**: A "Blur" toggle in the settings to blur text in the timeline when the app is open in public.
- **Export/Delete**: Full control for users to export their journal as PDF (for printing) or delete their account/data instantly.

---

## 4. Implementation Roadmap

### Phase 1: Quick Wins (The "Reskin" & Core Value)

- [ ] **Design System Update**: Implement the new Color Palette and Typography (Tailwind config).
- [ ] **Prompts Engine**: Add a simple array of prompts and a "Shuffle" button.
- [ ] **Layout Tweak**: Convert the list view to a basic "Card Timeline" with the new styling.
- [ ] **Micro-interaction**: Add the "Bloom" animation on save.

### Phase 2: Major Features (Deepening Engagement)

- [ ] **Calendar View**: Implement the monthly view with mood indicators.
- [ ] **Gamification (Garden)**: Build the logic for streaks and the "Garden" profile visualization.
- [ ] **Data Viz**: Implement the "Word Cloud" or "Monthly Summary".
- [ ] **Privacy**: Implement "Private Mode" (blur) and Data Export.

### Phase 3: Premium Polish (V2.0 Launch)

- [ ] **Audio/Ambient Sounds**: Optional background nature sounds while writing.
- [ ] **Mobile Native Feel**: PWA improvements (offline support, smooth gestures).
