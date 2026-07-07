document.addEventListener('DOMContentLoaded', () => {
    // State parameters
    const state = {
        hvacTemp: 21,
        waterPressure: 45,
        energyUsage: 1.25,
        incidentActive: false,
        lastIncidentId: 0,
        agentsActive: {},
        camFrame: 0
    };

    // DOM Elements
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabPanels = document.querySelectorAll('.tab-panel');
    const logStream = document.getElementById('log-stream');
    const hvacTempText = document.getElementById('hvac-temp-text');
    const hvacSlider = document.getElementById('hvac-slider');
    const energyUsageText = document.getElementById('energy-usage-text');
    
    // Tab Navigation
    tabButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const tabId = btn.getAttribute('data-tab');
            
            tabButtons.forEach(b => b.classList.remove('active'));
            tabPanels.forEach(p => p.classList.remove('active'));
            
            btn.classList.add('active');
            const targetPanel = document.getElementById(`${tabId}-panel`);
            if (targetPanel) targetPanel.classList.add('active');

            if (tabId === 'operations') {
                drawOperationsChart();
            } else if (tabId === 'transport') {
                drawTransportChart();
            }
        });
    });

    // Dynamic Chart drawing scripts
    function drawOperationsChart() {
        const canvas = document.getElementById('ops-chart');
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        const dpr = window.devicePixelRatio || 1;
        canvas.width = canvas.parentElement.clientWidth * dpr;
        canvas.height = 130 * dpr;
        ctx.scale(dpr, dpr);

        const w = canvas.width / dpr;
        const h = canvas.height / dpr;

        ctx.clearRect(0, 0, w, h);
        
        // Draw grid lines
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.03)';
        ctx.lineWidth = 1;
        for (let i = 20; i < h; i += 25) {
            ctx.beginPath();
            ctx.moveTo(0, i);
            ctx.lineTo(w, i);
            ctx.stroke();
        }

        // Draw Influx Gradient
        const gradient = ctx.createLinearGradient(0, 0, 0, h);
        gradient.addColorStop(0, 'rgba(0, 240, 255, 0.25)');
        gradient.addColorStop(1, 'rgba(0, 240, 255, 0.0)');

        ctx.beginPath();
        ctx.moveTo(0, h - 15);
        ctx.bezierCurveTo(w * 0.2, h - 35, w * 0.4, h - 90, w * 0.65, h - 75);
        ctx.bezierCurveTo(w * 0.8, h - 65, w * 0.9, h - 110, w, h - 105);
        ctx.lineTo(w, h);
        ctx.lineTo(0, h);
        ctx.fillStyle = gradient;
        ctx.fill();

        ctx.beginPath();
        ctx.moveTo(0, h - 15);
        ctx.bezierCurveTo(w * 0.2, h - 35, w * 0.4, h - 90, w * 0.65, h - 75);
        ctx.bezierCurveTo(w * 0.8, h - 65, w * 0.9, h - 110, w, h - 105);
        ctx.strokeStyle = 'var(--accent-cyber)';
        ctx.lineWidth = 3;
        ctx.stroke();
    }

    function drawTransportChart() {
        const canvas = document.getElementById('transport-chart');
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        const dpr = window.devicePixelRatio || 1;
        canvas.width = canvas.parentElement.clientWidth * dpr;
        canvas.height = 130 * dpr;
        ctx.scale(dpr, dpr);

        const w = canvas.width / dpr;
        const h = canvas.height / dpr;

        ctx.clearRect(0, 0, w, h);

        ctx.strokeStyle = 'rgba(255, 255, 255, 0.03)';
        ctx.lineWidth = 1;
        for (let i = 20; i < h; i += 25) {
            ctx.beginPath();
            ctx.moveTo(0, i);
            ctx.lineTo(w, i);
            ctx.stroke();
        }

        const gradient = ctx.createLinearGradient(0, 0, 0, h);
        gradient.addColorStop(0, 'rgba(251, 191, 36, 0.2)');
        gradient.addColorStop(1, 'rgba(251, 191, 36, 0.0)');

        ctx.beginPath();
        ctx.moveTo(0, h - 10);
        ctx.bezierCurveTo(w * 0.35, h - 15, w * 0.55, h - 85, w, h - 55);
        ctx.lineTo(w, h);
        ctx.lineTo(0, h);
        ctx.fillStyle = gradient;
        ctx.fill();

        ctx.beginPath();
        ctx.moveTo(0, h - 10);
        ctx.bezierCurveTo(w * 0.35, h - 15, w * 0.55, h - 85, w, h - 55);
        ctx.strokeStyle = 'var(--accent-gold)';
        ctx.lineWidth = 2.5;
        ctx.stroke();
    }

    // High fidelity camera matrix animation loops (Simulates moving computer vision bounding boxes)
    const canvases = [
        { id: 'cam-1', label: 'CHECKPOINT FLOW', color: '#00f0ff' },
        { id: 'cam-2', label: 'CONCOURSE QUEUE', color: '#fbbf24' },
        { id: 'cam-3', label: 'STAIRWELL MONITOR', color: '#10b981' },
        { id: 'cam-4', label: 'OUTER PERIMETER', color: '#bd00ff' }
    ];

    function animateCameraFeeds() {
        state.camFrame += 0.015;
        
        canvases.forEach((c, idx) => {
            const canvas = document.getElementById(c.id);
            if (!canvas) return;
            const ctx = canvas.getContext('2d');
            
            // Adjust canvas sizing dynamically
            if (canvas.width !== canvas.parentElement.clientWidth || canvas.height !== canvas.parentElement.clientHeight) {
                canvas.width = canvas.parentElement.clientWidth;
                canvas.height = canvas.parentElement.clientHeight;
            }
            
            const w = canvas.width;
            const h = canvas.height;
            ctx.clearRect(0, 0, w, h);

            // Draw dark backdrop mapping grid lines
            ctx.fillStyle = '#020617';
            ctx.fillRect(0, 0, w, h);
            
            ctx.strokeStyle = 'rgba(255, 255, 255, 0.02)';
            ctx.lineWidth = 1;
            const gridSize = 25;
            for(let x = 0; x < w; x += gridSize) {
                ctx.beginPath();
                ctx.moveTo(x, 0);
                ctx.lineTo(x, h);
                ctx.stroke();
            }
            for(let y = 0; y < h; y += gridSize) {
                ctx.beginPath();
                ctx.moveTo(0, y);
                ctx.lineTo(w, y);
                ctx.stroke();
            }

            // Draw tracking indicator marks (Crosshairs)
            ctx.strokeStyle = 'rgba(255, 255, 255, 0.06)';
            ctx.lineWidth = 1.5;
            ctx.strokeRect(15, 15, w - 30, h - 30);
            
            // Draw simulated bounding boxes moving in orbits
            ctx.lineWidth = 1.5;
            const cos = Math.cos(state.camFrame + idx * 4);
            const sin = Math.sin(state.camFrame + idx * 2.5);

            if (idx === 0) {
                // Checkpoint
                const boxX = w * 0.3 + cos * 15;
                const boxY = h * 0.4 + sin * 10;
                ctx.strokeStyle = c.color;
                ctx.strokeRect(boxX, boxY, 50, 70);
                ctx.fillStyle = 'rgba(0, 240, 255, 0.08)';
                ctx.fillRect(boxX, boxY, 50, 70);

                ctx.fillStyle = '#fff';
                ctx.font = '10px Space Grotesk';
                ctx.fillText('PERSON #402', boxX, boxY - 6);

                const box2X = w * 0.6 - cos * 20;
                const box2Y = h * 0.3 - sin * 8;
                ctx.strokeRect(box2X, box2Y, 45, 65);
                ctx.fillStyle = 'rgba(0, 240, 255, 0.08)';
                ctx.fillRect(box2X, box2Y, 45, 65);
                ctx.fillStyle = '#fff';
                ctx.fillText('PERSON #118', box2X, box2Y - 6);
            } else if (idx === 1) {
                // Queue
                const startX = w * 0.25;
                const startY = h * 0.45 + sin * 6;
                const qWidth = w * 0.5;
                const qHeight = h * 0.3;
                
                ctx.strokeStyle = c.color;
                ctx.strokeRect(startX, startY, qWidth, qHeight);
                ctx.fillStyle = 'rgba(251, 191, 36, 0.08)';
                ctx.fillRect(startX, startY, qWidth, qHeight);
                ctx.fillStyle = '#fff';
                ctx.font = '10px Space Grotesk';
                ctx.fillText('QUEUE AREA B', startX, startY - 6);
            } else if (idx === 2) {
                // Stairwell
                ctx.strokeStyle = 'rgba(255,255,255,0.06)';
                ctx.beginPath();
                ctx.moveTo(15, h * 0.7);
                ctx.lineTo(w - 15, h * 0.3);
                ctx.stroke();

                // Person moving up the stairs
                const paxX = w * 0.4 + cos * 40;
                const paxY = h * 0.5 - cos * 20;
                
                // If medical alarm is flashing
                const sector102 = document.getElementById('sector-102');
                if (sector102 && sector102.classList.contains('alert-flash')) {
                    ctx.strokeStyle = 'var(--accent-red)';
                    ctx.strokeRect(paxX - 10, paxY - 15, 30, 50);
                    ctx.fillStyle = 'rgba(244, 63, 94, 0.15)';
                    ctx.fillRect(paxX - 10, paxY - 15, 30, 50);
                    ctx.fillStyle = '#fff';
                    ctx.font = '10px Space Grotesk';
                    ctx.fillText('FALL DETECTED 96%', paxX - 10, paxY - 21);
                } else {
                    ctx.strokeStyle = c.color;
                    ctx.strokeRect(paxX - 10, paxY - 15, 25, 45);
                    ctx.fillStyle = 'rgba(16, 185, 129, 0.08)';
                    ctx.fillRect(paxX - 10, paxY - 15, 25, 45);
                    ctx.fillStyle = '#fff';
                    ctx.font = '10px Space Grotesk';
                    ctx.fillText('PERSON #912', paxX - 10, paxY - 6);
                }
            } else if (idx === 3) {
                // Outer Perimeter Vehicle tracking
                const vX = w * 0.35 + sin * 60;
                const vY = h * 0.5;
                ctx.strokeStyle = c.color;
                ctx.strokeRect(vX, vY - 15, 55, 30);
                ctx.fillStyle = 'rgba(189, 0, 255, 0.08)';
                ctx.fillRect(vX, vY - 15, 55, 30);
                ctx.fillStyle = '#fff';
                ctx.font = '10px Space Grotesk';
                ctx.fillText('VEHICLE #80', vX, vY - 21);
            }
        });

        requestAnimationFrame(animateCameraFeeds);
    }

    // Bootstrapping
    drawOperationsChart();
    animateCameraFeeds();

    window.addEventListener('resize', () => {
        const activeTab = document.querySelector('.tab-btn.active').getAttribute('data-tab');
        if (activeTab === 'operations') drawOperationsChart();
        else if (activeTab === 'transport') drawTransportChart();
    });

    // Ingress System Alert logs pool
    const logPool = [
        { type: 'sustainability', text: 'Waste Agent scheduled trash retrieval for Concourse West bin 14 (Level 85%).' },
        { type: 'transport', text: 'Transport Agent requested Uber/Lyft driver surge recommendations for North Drop-Off.' },
        { type: 'agent', text: 'Navigation Agent optimized route guides for Sector 200 ramp detours.' },
        { type: 'security', text: 'Security Agent flagged high density flow pattern at Entrance Gate B. Flow normal.' },
        { type: 'sustainability', text: 'Energy Agent turned off HVAC cooling blocks for Press Room Zone B (Unoccupied).' },
        { type: 'transport', text: 'Transit feed API reports train #104 arrival in 4 minutes. Passenger volume high.' }
    ];

    function addLogItem(type, text) {
        const timeStr = new Date().toLocaleTimeString('en-US', { hour12: false, hour: '2-digit', minute: '2-digit', second: '2-digit' });
        const item = document.createElement('div');
        item.className = `log-item ${type}`;
        item.innerHTML = `
            <span class="log-time">${timeStr}</span>
            <span class="log-category">${type}</span>
            <span class="log-text">${text}</span>
        `;
        logStream.prepend(item);
        if (logStream.children.length > 50) {
            logStream.removeChild(logStream.lastChild);
        }
    }

    // Dynamic HVAC Slider Controls
    if (hvacSlider) {
        hvacSlider.addEventListener('input', (e) => {
            const val = e.target.value;
            hvacTempText.innerText = `${val}°C`;
            state.hvacTemp = parseInt(val);
            
            const delta = (val - 21) * 0.05;
            const newEnergy = Math.max(0.6, (1.25 - delta).toFixed(2));
            energyUsageText.innerText = `${newEnergy} MW`;
            
            addLogItem('sustainability', `Operations adjusted Target HVAC Temp to ${val}°C. Energy adjustment: ${newEnergy} MW.`);
        });
    }

    // Interactive Stadium Sectors
    const sectors = document.querySelectorAll('.map-sector');
    sectors.forEach(sector => {
        sector.addEventListener('click', () => {
            const id = sector.getAttribute('id');
            const fill = sector.getAttribute('fill');
            let colorWord = 'Normal';
            if (fill === '#ef4444' || fill === '#f43f5e') colorWord = 'Critically Congested';
            else if (fill === '#f97316') colorWord = 'Heavy Load';
            else if (fill === '#10b981') colorWord = 'Optimal Flow';

            addLogItem('agent', `User queried Seating Sector [${id.toUpperCase()}]. Status: ${colorWord}. Occupancy: ${Math.floor(Math.random() * 40) + 60}%.`);
            
            sector.style.transform = 'scale(1.02)';
            setTimeout(() => sector.style.transform = 'none', 200);
        });
    });

    // Translation panel interaction
    const btnTranslate = document.getElementById('btn-translate-action');
    const translationInput = document.getElementById('translation-input');
    const translationsOutput = document.getElementById('translations-output');

    if (btnTranslate && translationInput) {
        btnTranslate.addEventListener('click', () => {
            const text = translationInput.value.trim();
            if (!text) return;

            btnTranslate.innerText = 'Translating...';
            btnTranslate.disabled = true;

            setTimeout(() => {
                btnTranslate.innerText = 'Speak & Translate';
                btnTranslate.disabled = false;

                translationsOutput.innerHTML = `
                    <div class="translated-block">
                        <div class="translated-lang">Spanish (ES)</div>
                        <div class="translated-text">Por favor, muéstrame la salida más cercana. (Direct Action: Evac Route B mapped)</div>
                    </div>
                    <div class="translated-block">
                        <div class="translated-lang">French (FR)</div>
                        <div class="translated-text">S'il vous plaît, montrez-moi la sortie la plus proche.</div>
                    </div>
                    <div class="translated-block">
                        <div class="translated-lang">German (DE)</div>
                        <div class="translated-text">Bitte zeigen Sie mir den nächsten Ausgang.</div>
                    </div>
                `;

                addLogItem('agent', `Translator Agent processed speech input: "${text}". Outputs generated in 3 languages.`);
            }, 800);
        });
    }

    // Agent status badge state transitions helper
    function setAgentState(agentId, isActive) {
        const card = document.getElementById(`agent-card-${agentId}`);
        if (!card) return;
        
        const badge = card.querySelector('.agent-badge-status');
        if (isActive) {
            card.classList.add('active');
            badge.className = 'agent-badge-status active';
            badge.innerText = 'Active';
        } else {
            card.classList.remove('active');
            badge.className = 'agent-badge-status idle';
            badge.innerText = 'Idle';
        }
    }

    // Simulations Handlers
    const btnSimMedical = document.getElementById('sim-medical-incident');
    const btnSimCongestion = document.getElementById('sim-gate-congestion');
    const btnSimEco = document.getElementById('sim-hvac-eco');
    const btnSimEvac = document.getElementById('sim-evac-trigger');

    const agentCoopPopup = document.getElementById('agent-coop-popup');
    const coopSteps = document.getElementById('coop-steps');
    const btnCloseCoop = document.getElementById('btn-close-coop');

    if (btnCloseCoop) {
        btnCloseCoop.addEventListener('click', () => {
            agentCoopPopup.classList.remove('show');
        });
    }

    // SIM 1: Medical Incident
    if (btnSimMedical) {
        btnSimMedical.addEventListener('click', () => {
            const headerPulse = document.getElementById('header-pulse-dot');
            headerPulse.className = 'pulse-dot warning';
            
            const sector102 = document.getElementById('sector-102');
            if (sector102) {
                sector102.setAttribute('fill', '#f43f5e');
                sector102.classList.add('alert-flash');
            }

            setAgentState('security', true);
            setAgentState('medical', true);
            setAgentState('navigation', true);

            const incidentFeed = document.getElementById('incident-feed');
            if (incidentFeed) {
                const item = document.createElement('div');
                item.className = 'incident-item';
                item.innerHTML = `
                    <div class="incident-header">
                        <span style="font-weight:700;">#INC-882: Spectator Fall</span>
                        <span class="incident-badge critical">Critical</span>
                    </div>
                    <div style="color:var(--text-secondary); font-size:11px;">Section 102 Stairs. Medical Squad #3 dispatched. Routing active.</div>
                `;
                incidentFeed.prepend(item);
            }

            coopSteps.innerHTML = `
                <div class="coop-step active">
                    <div class="coop-agent-title">Security Agent (Vision AI)</div>
                    <div class="coop-agent-reasoning">Detected Pose-Fall event on Section 102 Staircase Camera. Severity high.</div>
                    <div class="coop-agent-action">Action: Flagged incident coordinates, mapped proximity logs, alerted Medical Agent.</div>
                </div>
                <div class="coop-step active">
                    <div class="coop-agent-title">Medical Agent</div>
                    <div class="coop-agent-reasoning">Dispatched First-Aid Squad #3 from East Triage unit. Navigation required.</div>
                    <div class="coop-agent-action">Action: Shared target path to responder tablet, opened VIP Gate 4 lock for cart transit.</div>
                </div>
                <div class="coop-step active">
                    <div class="coop-agent-title">Navigation Agent</div>
                    <div class="coop-agent-reasoning">Created dynamic detour vector for incoming fans to avoid Sector 102 staircase.</div>
                    <div class="coop-agent-action">Action: Updated digital wayfinding displays to route spectators through Corridor B.</div>
                </div>
            `;

            agentCoopPopup.classList.add('show');
            addLogItem('medical', 'CRITICAL ALERT: Spectator fall detected, Section 102. Medical dispatched. Navigation rerouting active.');

            setTimeout(() => {
                setAgentState('security', false);
                setAgentState('medical', false);
                setAgentState('navigation', false);
                headerPulse.className = 'pulse-dot';
                if (sector102) {
                    sector102.setAttribute('fill', '#f97316');
                    sector102.classList.remove('alert-flash');
                }
            }, 12000);
        });
    }

    // SIM 2: Gate Congestion
    if (btnSimCongestion) {
        btnSimCongestion.addEventListener('click', () => {
            const headerPulse = document.getElementById('header-pulse-dot');
            headerPulse.className = 'pulse-dot warning';

            setAgentState('crowd', true);
            setAgentState('transport', true);

            const gateCElement = document.getElementById('sector-108');
            if (gateCElement) {
                gateCElement.setAttribute('fill', '#f43f5e');
            }

            coopSteps.innerHTML = `
                <div class="coop-step active">
                    <div class="coop-agent-title">Crowd Prediction Agent</div>
                    <div class="coop-agent-reasoning">Vision sensors flag bottleneck flow reduction (0.3m/s) at Entrance Gate C. Wait time exceeds 45 mins.</div>
                    <div class="coop-agent-action">Action: Initiated fan redirection recommendations across adjacent sectors.</div>
                </div>
                <div class="coop-step active">
                    <div class="coop-agent-title">Transport Agent</div>
                    <div class="coop-agent-reasoning">Rerouting metro bus drops to North Gate D to absorb crowd surge and relieve Gate C.</div>
                    <div class="coop-agent-action">Action: Triggered city transit API updates, notified terminal dispatch.</div>
                </div>
            `;

            agentCoopPopup.classList.add('show');
            addLogItem('transport', 'WARNING: Gate C bottleneck. Transit arrivals rerouted to Gate D. Signage displays updated.');

            setTimeout(() => {
                setAgentState('crowd', false);
                setAgentState('transport', false);
                headerPulse.className = 'pulse-dot';
                if (gateCElement) {
                    gateCElement.setAttribute('fill', '#10b981');
                }
            }, 12000);
        });
    }

    // SIM 3: HVAC Eco-Save
    if (btnSimEco) {
        btnSimEco.addEventListener('click', () => {
            setAgentState('energy', true);
            setAgentState('sustainability', true);

            if (hvacSlider) {
                hvacSlider.value = 23;
                hvacTempText.innerText = '23°C';
            }
            energyUsageText.innerText = '0.82 MW';
            
            const sectorEmpty = document.getElementById('sector-116');
            if (sectorEmpty) {
                sectorEmpty.setAttribute('fill', 'rgba(255,255,255,0.03)');
            }

            coopSteps.innerHTML = `
                <div class="coop-step active">
                    <div class="coop-agent-title">Energy Agent</div>
                    <div class="coop-agent-reasoning">Determined Sector 320-330 is currently unoccupied (Match time 62m).</div>
                    <div class="coop-agent-action">Action: Reduced HVAC compressor load and set corridor lights to Eco-dim (30%).</div>
                </div>
                <div class="coop-step active">
                    <div class="coop-agent-title">Sustainability Agent</div>
                    <div class="coop-agent-reasoning">Total active power demand minimized. Current savings rate at +35%.</div>
                    <div class="coop-agent-action">Action: Projected total match carbon savings logged to facility database.</div>
                </div>
            `;

            agentCoopPopup.classList.add('show');
            addLogItem('sustainability', 'INFO: Energy Agent initiated Eco-Save Mode in Sector 3. HVAC scaled back. Power draw: 0.82 MW.');

            setTimeout(() => {
                setAgentState('energy', false);
                setAgentState('sustainability', false);
                if (sectorEmpty) {
                    sectorEmpty.setAttribute('fill', '#10b981');
                }
            }, 12000);
        });
    }

    // SIM 4: Evacuation trigger
    const evacOverlay = document.getElementById('evac-overlay');
    const btnEvacDismiss = document.getElementById('btn-evac-dismiss');

    if (btnSimEvac && evacOverlay) {
        btnSimEvac.addEventListener('click', () => {
            evacOverlay.style.display = 'flex';
            const headerPulse = document.getElementById('header-pulse-dot');
            headerPulse.className = 'pulse-dot critical';

            setAgentState('emergency', true);
            addLogItem('medical', 'CRITICAL EVACUATION ALARM TRIGGERED. EvacRoute Agent generating crowd routes...');
        });
    }

    if (btnEvacDismiss && evacOverlay) {
        btnEvacDismiss.addEventListener('click', () => {
            evacOverlay.style.display = 'none';
            const headerPulse = document.getElementById('header-pulse-dot');
            headerPulse.className = 'pulse-dot';
            setAgentState('emergency', false);
        });
    }
});
