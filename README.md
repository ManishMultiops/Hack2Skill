# FIFA ArenaOS ⚽🤖
> **GenAI-Powered Stadium Intelligence Platform for the FIFA World Cup 2026**

FIFA ArenaOS is an advanced, cooperative multi-agent platform designed as the "central nervous system" for modern high-capacity venues. It integrates Multimodal Vision AI, Speech AI, Realtime telemetry (IoT), and Retrieval-Augmented Generation (RAG) to coordinate stadium operations, transit networks, medical services, and fan flows.

---

## 🏆 Core Architecture
The platform is powered by a grid of **13 cooperative AI Agents** collaborating over an event-driven mesh:
*   **Navigation & Accessibility Agents:** Dynamic wheelchair wayfinding, stairs detours, and haptic path guides.
*   **Transport & Crowd Prediction Agents:** Integrates host city transit schedules and parking capacities to predict bottlenecks and schedule driver surges.
*   **Security & Medical Agents:** Scans edge camera feeds (Vision AI) to detect spectator falls, violence, crowd crushes, or unattended items, dispatching personnel dynamically.
*   **Sustainability & Facility Agents:** Optimizes HVAC levels and dims lighting in unoccupied stadium zones based on ticketing data.

---

## 💻 Tech Stack
*   **Frontend UI:** Modern vanilla HTML5 / CSS3 / ES6 Javascript with glassmorphic cards, glowing neon themes, and custom requestAnimationFrame visual overlays.
*   **Data Broker:** Apache Kafka for visual anomaly triggers and IoT sensor feeds.
*   **Reasoning Grid:** Frontier LLMs (Gemini 2.5 Pro, Claude 3.5 Sonnet, Llama 3) orchestrating tool actions.
*   **Vector Engine:** Milvus / pgvector indexing venue maps, safety policies, and transit manuals.

---

## 🚀 How to Run the Dashboard Locally

You can launch and explore the interactive ArenaOS Operations Dashboard using a simple local HTTP server.

### Option 1: Using Python (Recommended)
If you have Python installed, run this command in the project directory:
```bash
python3 -m http.server 9999
```
Then, open your browser and navigate to:
👉 **[http://localhost:9999](http://localhost:9999)**

### Option 2: Using Node.js (npx)
If you have Node.js installed, run:
```bash
npx http-server -p 9999
```
Then, open your browser and navigate to:
👉 **[http://localhost:9999](http://localhost:9999)**

---

## 🎮 Interactive Simulation Guide

Once the dashboard is loaded, you can test several realistic stadium scenarios using the **Incident Simulations** panel on the left:

1.  **Medical Incident (Sec 102):**
    *   Flashes the corresponding seat sector Red.
    *   Initiates visual pose-estimation tracking inside Camera Feed CAM-18.
    *   Triggers active statuses on **Security**, **Medical**, and **Navigation** agents.
    *   Displays the step-by-step cooperative reasoning pipeline.
2.  **Gate Congestion Surge (Gate C):**
    *   Flashes Gate C sector, triggers transit bus drop rerouting to North Gate D via external APIs, and activates the **Crowd Prediction** and **Transport** agents.
3.  **HVAC Eco-Save Mode:**
    *   Activates **Energy** and **Sustainability** agents, lowering the HVAC system cooling load and reducing the stadium's total active power demand grid indicators from 1.25 MW to 0.82 MW.
4.  **Stadium Evacuation Alarm:**
    *   Displays a fullscreen warning panel, demonstrating emergency exit guidance mapped by the **Emergency Agent**.
5.  **Agent Translation Portal:**
    *   In the **Accessibility & Translate** tab, enter speech queries (e.g. *"Show me the wheelchair exit ramp"*) to see translations in Spanish, French, and German generated in real-time.
# Hack2Skill
