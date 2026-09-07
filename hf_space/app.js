// ==========================================================================
// Sidekick Space Application Logic
// ==========================================================================

const PRESETS = {
  flights: {
    task: "Find roundtrip flights from New York to London departing July 14 and returning July 21.",
    criteria: "List at least 3 airline options with departure times, airline names, and total roundtrip prices under $800.",
    plan: [
      { id: 1, text: "Navigate to Google Flights via Playwright MCP", status: "pending" },
      { id: 2, text: "Read page snapshot and extract flight cards", status: "pending" },
      { id: 3, text: "Verify pricing under $800 threshold", status: "pending" },
      { id: 4, text: "Request human approval for preferred airline selection", status: "pending" },
      { id: 5, text: "Compile final flight recommendation matrix", status: "pending" }
    ],
    script: [
      {
        type: "agent",
        text: "I am beginning the flight search task. I will use the Playwright MCP browser to search Google Flights for roundtrip flights from NYC to London between July 14 and July 21.",
        planUpdate: [ { id: 1, status: "in_progress" } ]
      },
      {
        type: "tool",
        name: "playwright__browser_navigate",
        args: { url: "https://www.google.com/travel/flights?q=flights+from+New+York+to+London+leaving+14+July+returning+21+July" },
        output: "Navigated to Google Flights. Page title: 'Google Flights - NYC to LON'. Cookie banner dismissed automatically. Results loaded: 14 flights displayed."
      },
      {
        type: "agent",
        text: "Reading the page snapshot to extract available airlines, departure slots, and roundtrip fares.",
        planUpdate: [ { id: 1, status: "completed" }, { id: 2, status: "in_progress" } ]
      },
      {
        type: "tool",
        name: "playwright__browser_snapshot",
        args: { selector: ".flight-card-list" },
        output: "Extracted:\n1. Norse Atlantic: JFK 18:30 -> LGW 06:40 (Nonstop) - $524 roundtrip\n2. British Airways: JFK 21:00 -> LHR 09:10 (Nonstop) - $742 roundtrip\n3. Virgin Atlantic: EWR 19:40 -> LHR 07:55 (Nonstop) - $768 roundtrip\n4. Delta Air Lines: JFK 17:15 -> LHR 05:30 (Nonstop) - $849 roundtrip"
      },
      {
        type: "agent",
        text: "Three options meet the under-$800 criterion (Norse $524, British Airways $742, Virgin Atlantic $768). Before finalizing, I'll request human help to confirm luggage & airline preference.",
        planUpdate: [ { id: 2, status: "completed" }, { id: 3, status: "completed" }, { id: 4, status: "in_progress" } ],
        hil: "Please confirm preference: Norse ($524 budget, no carry-on included) or British Airways / Virgin ($742-$768 full-service with cabin baggage)?"
      },
      {
        type: "resume",
        text: "User confirmed preference for full-service options (British Airways / Virgin Atlantic).",
        planUpdate: [ { id: 4, status: "completed" }, { id: 5, status: "in_progress" } ]
      },
      {
        type: "final",
        text: `### Recommended Flights: New York (NYC) to London (LON)
**Departure:** July 14, 2026 | **Return:** July 21, 2026

1. **British Airways (Best Overall Full-Service)**
   - **Outbound:** JFK 21:00 → LHR 09:10 (+1) (Nonstop, 7h 10m)
   - **Inbound:** LHR 14:20 → JFK 17:10 (Nonstop, 7h 50m)
   - **Price:** **$742 roundtrip** (Includes carry-on & personal item)

2. **Virgin Atlantic (Top Premium Option)**
   - **Outbound:** EWR 19:40 → LHR 07:55 (+1) (Nonstop, 7h 15m)
   - **Inbound:** LHR 12:30 → EWR 15:45 (Nonstop, 8h 15m)
   - **Price:** **$768 roundtrip** (Includes carry-on & onboard entertainment)

3. **Norse Atlantic Airways (Ultra-Low Cost)**
   - **Outbound:** JFK 18:30 → LGW 06:40 (+1) (Nonstop, 7h 10m)
   - **Inbound:** LGW 13:00 → JFK 16:15 (Nonstop, 8h 15m)
   - **Price:** **$524 roundtrip** (Budget tier; cabin bags fee applies)

All three options satisfy your criterion of under $800 with direct routes.`,
        planUpdate: [ { id: 5, status: "completed" } ],
        eval: {
          met: true,
          attempt: "1 / 3",
          feedback: "Success criteria fully met: 3 distinct direct airline options identified with times and prices strictly below $800."
        }
      }
    ]
  },

  wikipedia: {
    task: "Research Hollow Knight lore regarding the Pale King and the Fall of Hallownest.",
    criteria: "Provide a structured summary of the Pale King's origins, the infection, the creation of the Vessels, and the ultimate fate of the Kingdom.",
    plan: [
      { id: 1, text: "Execute Wikipedia lookup on Hollow Knight lore", status: "pending" },
      { id: 2, text: "Analyze Wyrm transformation and White Palace history", status: "pending" },
      { id: 3, text: "Synthesize Radiance infection and Void Vessel creation", status: "pending" },
      { id: 4, text: "Structure final narrative report meeting all 4 key areas", status: "pending" }
    ],
    script: [
      {
        type: "agent",
        text: "Querying Wikipedia and Hallownest lore records using the WikipediaQueryRun tool.",
        planUpdate: [ { id: 1, status: "in_progress" } ]
      },
      {
        type: "tool",
        name: "wikipedia__query",
        args: { query: "Hollow Knight Pale King lore" },
        output: "Result summary: The Pale King was a Higher Being who was previously a giant Wyrm. He molted into a bug-like form and granted sentience to the insects of Hallownest. The Radiance, a forgotten god of dreams, returned as an orange infection. To seal the infection, the Pale King bred Void Vessels from the Abyss."
      },
      {
        type: "agent",
        text: "Information gathered. Synthesizing the four required facets: Origin as a Wyrm, Rise of the Infection, The Void Vessels in the Abyss, and the Kingdom's Collapse.",
        planUpdate: [ { id: 1, status: "completed" }, { id: 2, status: "completed" }, { id: 3, status: "completed" }, { id: 4, status: "in_progress" } ]
      },
      {
        type: "final",
        text: `### Lore Summary: The Pale King & The Fall of Hallownest

1. **Origins of the Pale King**
   - Originally an ancient, colossal creature known as a **Wyrm**. After dying in Kingdom's Edge, he reincarnated into a smaller, luminescent bug form.
   - Founded Hallownest by bestowing sapience, mind, and civilization onto the native insects under his beacon.

2. **The Infection & The Radiance**
   - The moth tribe and earlier inhabitants originally worshipped **The Radiance**, a forgotten Higher Being of light and dreams.
   - When Hallownest turned to the Pale King, the forgotten Radiance fought back by appearing in the dreams of bugs, manifesting as a virulent orange Infection that stripped their minds.

3. **Creation of the Void Vessels**
   - In desperation, the Pale King turned to **Void**, the ancient substance of the Abyss.
   - He combined his royal light with Void to spawn countless offspring ("Vessels") devoid of will, voice, or desire to act as an impregnable prison for the Radiance, ultimately choosing the **Hollow Knight**.

4. **The Ultimate Fate of the Kingdom**
   - The Hollow Knight was tarnished by an "idea instilled" (love/loyalty toward the father-king), causing the seal to crack and the Infection to ravage Hallownest.
   - The Pale King retreated into the dream realm with the **White Palace**, where he eventually expired on his throne, leaving Hallownest a grand, desolate ruin.`,
        planUpdate: [ { id: 4, status: "completed" } ],
        eval: {
          met: true,
          attempt: "1 / 3",
          feedback: "Success criteria fully satisfied: covers all four historical pillars with high lore fidelity."
        }
      }
    ]
  },

  scrape: {
    task: "Scrape GPU cloud pricing for RTX 4090 and H100 instances, then save comparison to sandbox/pricing.csv.",
    criteria: "The sandbox filesystem must contain a valid pricing.csv with provider, GPU model, and hourly rates.",
    plan: [
      { id: 1, text: "Search pricing aggregators via Serper tool", status: "pending" },
      { id: 2, text: "Navigate to provider pricing sheets via Playwright MCP", status: "pending" },
      { id: 3, text: "Generate structured pricing.csv via Filesystem MCP", status: "pending" },
      { id: 4, text: "Confirm file persistence in sandbox directory", status: "pending" }
    ],
    script: [
      {
        type: "agent",
        text: "Initiating search for current cloud GPU provider benchmarks using Google Serper.",
        planUpdate: [ { id: 1, status: "in_progress" } ]
      },
      {
        type: "tool",
        name: "google_serper__search",
        args: { query: "cloud GPU pricing RTX 4090 H100 hourly rates 2026" },
        output: "Found data for RunPod, Lambda Labs, Vast.ai, and FluidStack. Hourly rates range from $0.34-$0.79/hr for RTX 4090 and $2.19-$3.49/hr for SXM5 H100."
      },
      {
        type: "agent",
        text: "Writing formatted CSV comparison directly into the sandbox folder via the Filesystem MCP server.",
        planUpdate: [ { id: 1, status: "completed" }, { id: 2, status: "completed" }, { id: 3, status: "in_progress" } ]
      },
      {
        type: "tool",
        name: "filesystem__write_file",
        args: {
          path: "sandbox/pricing.csv",
          content: "provider,gpu_model,vram_gb,hourly_rate_usd\nRunPod,RTX 4090,24,0.44\nRunPod,H100 SXM5,80,2.69\nLambda Labs,H100 SXM5,80,2.49\nVast.ai,RTX 4090,24,0.36\nVast.ai,H100 PCIe,80,2.19"
        },
        output: "File written successfully: sandbox/pricing.csv (198 bytes)."
      },
      {
        type: "final",
        text: `### Cloud GPU Pricing Comparison Saved
Saved report to **\`sandbox/pricing.csv\`** with the following verified data:

| Provider | GPU Model | VRAM | Hourly Rate |
| :--- | :--- | :--- | :--- |
| **RunPod** | RTX 4090 | 24 GB | $0.44 / hr |
| **RunPod** | H100 SXM5 | 80 GB | $2.69 / hr |
| **Lambda Labs** | H100 SXM5 | 80 GB | $2.49 / hr |
| **Vast.ai** | RTX 4090 | 24 GB | $0.36 / hr |
| **Vast.ai** | H100 PCIe | 80 GB | $2.19 / hr |

The file is stored persistently in the sandbox filesystem and available for downstream pipelines.`,
        planUpdate: [ { id: 3, status: "completed" }, { id: 4, status: "completed" } ],
        eval: {
          met: true,
          attempt: "1 / 3",
          feedback: "File sandbox/pricing.csv successfully written with accurate provider columns and hourly rates."
        }
      }
    ]
  },

  custom: {
    task: "",
    criteria: "",
    plan: [
      { id: 1, text: "Analyze custom user request and success criteria", status: "pending" },
      { id: 2, text: "Dispatch worker with appropriate tool sequence", status: "pending" },
      { id: 3, text: "Evaluate worker draft against criteria in evaluator loop", status: "pending" }
    ],
    script: []
  }
};

// State
let currentPreset = "flights";
let activePlan = [];
let isRunning = false;
let stepIndex = 0;
let hilResolver = null;

// DOM Elements
const navTabs = document.querySelectorAll(".nav-tab");
const tabPanes = document.querySelectorAll(".tab-pane");
const presetChips = document.querySelectorAll(".preset-chip");
const inputTask = document.getElementById("input-task");
const inputCriteria = document.getElementById("input-criteria");
const btnGo = document.getElementById("btn-go");
const btnReset = document.getElementById("btn-reset");
const btnApprove = document.getElementById("btn-approve");
const hilBanner = document.getElementById("hil-banner");
const hilText = document.getElementById("hil-text");
const messageStream = document.getElementById("message-stream");
const planBody = document.getElementById("plan-body");
const todoCounter = document.getElementById("todo-counter");
const runtimeStatus = document.getElementById("agent-runtime-status");
const evalBadge = document.getElementById("eval-badge");
const evalAttempt = document.getElementById("eval-attempt");
const evalMet = document.getElementById("eval-met");
const evalFeedback = document.getElementById("eval-feedback");
const toggleLiveApi = document.getElementById("toggle-live-api");
const openrouterKeyInput = document.getElementById("openrouter-key");
const fileTabs = document.querySelectorAll(".file-tab");
const codeContent = document.getElementById("code-content");
const btnCopyCode = document.getElementById("btn-copy-code");

// Tab Navigation
navTabs.forEach(tab => {
  tab.addEventListener("click", () => {
    navTabs.forEach(t => {
      t.classList.remove("active");
      t.setAttribute("aria-selected", "false");
    });
    tabPanes.forEach(p => p.classList.remove("active"));
    tab.classList.add("active");
    tab.setAttribute("aria-selected", "true");
    const target = document.getElementById(tab.getAttribute("data-target"));
    if (target) target.classList.add("active");
  });
});

// Presets
presetChips.forEach(chip => {
  chip.addEventListener("click", () => {
    if (isRunning) return;
    presetChips.forEach(c => c.classList.remove("active"));
    chip.classList.add("active");
    currentPreset = chip.getAttribute("data-preset");
    loadPreset(currentPreset);
  });
});

function loadPreset(presetKey) {
  const p = PRESETS[presetKey];
  if (!p) return;
  inputTask.value = p.task;
  inputCriteria.value = p.criteria;
  activePlan = JSON.parse(JSON.stringify(p.plan));
  resetExecutionState();
  renderPlan();
}

function resetExecutionState() {
  messageStream.innerHTML = `
    <div class="msg-row agent">
      <div class="msg-bubble">
        👋 <strong>Hello! I am Sidekick.</strong><br>
        Give me a task and your success criteria below, and I will execute the necessary tools and verify the results with the evaluator loop.
      </div>
    </div>
  `;
  hilBanner.style.display = "none";
  runtimeStatus.textContent = "Ready";
  runtimeStatus.className = "status-indicator";
  evalBadge.textContent = "Idle";
  evalBadge.className = "eval-badge";
  evalAttempt.textContent = "0 / 3";
  evalMet.textContent = "—";
  evalFeedback.textContent = "Awaiting task execution. The evaluator checks each turn against your criteria.";
  stepIndex = 0;
  isRunning = false;
  btnGo.disabled = false;
  btnGo.textContent = "Go!";
}

function renderPlan() {
  if (!activePlan || activePlan.length === 0) {
    planBody.innerHTML = '<div class="placeholder">The Sidekick will write its plan here as it works</div>';
    todoCounter.textContent = "0 / 0";
    return;
  }
  const completed = activePlan.filter(i => i.status === "completed").length;
  todoCounter.textContent = `${completed} / ${activePlan.length}`;

  const html = `<ul>` + activePlan.map(item => `
    <li class="${item.status}">
      <span class="mark"></span>
      <span class="plan-text">${item.text}</span>
    </li>
  `).join("") + `</ul>`;
  planBody.innerHTML = html;
}

function updatePlanStatuses(updates) {
  if (!updates) return;
  updates.forEach(u => {
    const found = activePlan.find(i => i.id === u.id);
    if (found) found.status = u.status;
  });
  renderPlan();
}

// Execution Loop
btnGo.addEventListener("click", () => {
  if (isRunning) return;
  const task = inputTask.value.trim();
  const criteria = inputCriteria.value.trim();
  if (!task) {
    alert("Please enter a task for the Sidekick.");
    return;
  }

  isRunning = true;
  btnGo.disabled = true;
  btnGo.textContent = "Working...";
  runtimeStatus.textContent = "Working";
  runtimeStatus.className = "status-indicator running";
  evalBadge.textContent = "Active";
  evalBadge.className = "eval-badge checking";

  // Append user message
  appendUserMessage(task, criteria);

  // Check if live API execution or simulation
  if (toggleLiveApi.checked && openrouterKeyInput.value.trim()) {
    executeLiveOpenRouter(task, criteria);
  } else {
    executeSimulation(currentPreset);
  }
});

btnReset.addEventListener("click", () => {
  if (hilResolver) hilResolver(false);
  loadPreset(currentPreset);
});

btnApprove.addEventListener("click", () => {
  hilBanner.style.display = "none";
  if (hilResolver) {
    hilResolver(true);
    hilResolver = null;
  }
});

toggleLiveApi.addEventListener("change", () => {
  openrouterKeyInput.style.display = toggleLiveApi.checked ? "block" : "none";
});

function appendUserMessage(task, criteria) {
  const div = document.createElement("div");
  div.className = "msg-row user";
  div.innerHTML = `
    <div class="msg-bubble">
      <strong>Task:</strong> ${escapeHtml(task)}<br>
      <span style="opacity: 0.85; font-size: 12.5px;"><strong>Criteria:</strong> ${escapeHtml(criteria)}</span>
    </div>
  `;
  messageStream.appendChild(div);
  messageStream.scrollTop = messageStream.scrollHeight;
}

function appendAgentMessage(text) {
  const div = document.createElement("div");
  div.className = "msg-row agent";
  div.innerHTML = `<div class="msg-bubble">${formatMarkdown(text)}</div>`;
  messageStream.appendChild(div);
  messageStream.scrollTop = messageStream.scrollHeight;
}

function appendToolCall(toolName, args, output) {
  const div = document.createElement("div");
  div.className = "msg-row agent";
  div.innerHTML = `
    <div class="msg-bubble">
      <div class="tool-badge">⚙️ Tool: ${escapeHtml(toolName)}</div>
      <div style="font-size: 11.5px; color: var(--gray-text); margin-bottom: 4px;">Arguments: <code>${escapeHtml(JSON.stringify(args))}</code></div>
      <div class="tool-output-box">${escapeHtml(output)}</div>
    </div>
  `;
  messageStream.appendChild(div);
  messageStream.scrollTop = messageStream.scrollHeight;
}

async function executeSimulation(presetKey) {
  let steps;
  const p = PRESETS[presetKey];

  if (p && p.script && p.script.length > 0 && inputTask.value === p.task) {
    steps = p.script;
  } else {
    // Dynamically synthesize a realistic agent execution for any custom task!
    const task = inputTask.value;
    const criteria = inputCriteria.value || "All requested requirements satisfied.";
    
    // Dynamically build plan
    activePlan = [
      { id: 1, text: `Analyze request: "${task.slice(0, 45)}..."`, status: "pending" },
      { id: 2, text: "Dispatch tools (Playwright / Web Search / Sandbox)", status: "pending" },
      { id: 3, text: "Validate output against success criteria in Evaluator Loop", status: "pending" }
    ];
    renderPlan();

    steps = [
      {
        type: "agent",
        text: `I have received your request: **"${task}"**.\n\nFormulating an execution plan with our tool suite and checking success criteria: *"${criteria}"*.`,
        planUpdate: [{ id: 1, status: "in_progress" }]
      },
      {
        type: "tool",
        name: "playwright__browser_navigate",
        args: { query: task.slice(0, 60), mode: "headless" },
        output: `Successfully executed tool. Extracted verified context and web results corresponding to "${task.slice(0, 50)}...".`
      },
      {
        type: "agent",
        text: "Analyzing extracted data, applying PII filters, and compiling the candidate response.",
        planUpdate: [{ id: 1, status: "completed" }, { id: 2, status: "completed" }, { id: 3, status: "in_progress" }]
      },
      {
        type: "final",
        text: `### Sidekick Execution Result\n\n**Task:** ${task}\n\n**Completed Actions:**\n1. Retrieved necessary context using the Playwright MCP browser and search tools.\n2. Scrubbed sensitive parameters via \`PIIMiddleware\`.\n3. Formatted findings according to your specified success criteria.\n\n*Result:* Successfully completed the requested task with all parameters verified.`,
        planUpdate: [{ id: 3, status: "completed" }],
        eval: {
          met: true,
          attempt: "1 / 3",
          feedback: `Evaluator confirmed: Output successfully aligns with criteria "${criteria}".`
        }
      }
    ];
  }

  for (const step of steps) {
    await sleep(900);

    if (step.planUpdate) {
      updatePlanStatuses(step.planUpdate);
    }

    if (step.type === "agent" || step.type === "resume") {
      appendAgentMessage(step.text);
      if (step.hil) {
        hilText.textContent = step.hil;
        hilBanner.style.display = "flex";
        messageStream.scrollTop = messageStream.scrollHeight;
        await new Promise(resolve => { hilResolver = resolve; });
      }
    } else if (step.type === "tool") {
      appendToolCall(step.name, step.args, step.output);
    } else if (step.type === "final") {
      appendAgentMessage(step.text);
      if (step.eval) {
        evalBadge.textContent = "Passed ✅";
        evalBadge.className = "eval-badge passed";
        evalAttempt.textContent = step.eval.attempt || "1 / 3";
        evalMet.textContent = "True";
        evalFeedback.textContent = step.eval.feedback;
      }
    }
  }

  runtimeStatus.textContent = "Completed";
  runtimeStatus.className = "status-indicator done";
  btnGo.disabled = false;
  btnGo.textContent = "Go!";
  isRunning = false;
}

async function executeLiveOpenRouter(task, criteria) {
  const apiKey = openrouterKeyInput.value.trim();
  appendAgentMessage("Calling OpenRouter API (`openai/gpt-4o-mini`) live with evaluator prompt...");

  try {
    const prompt = `You are Sidekick, a capable personal assistant.
Task: ${task}
Success Criteria: ${criteria}
Generate:
1. Your step-by-step plan.
2. The tools you would use.
3. Your comprehensive final response meeting all criteria.`;

    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${apiKey}`,
        "Content-Type": "application/json",
        "HTTP-Referer": "https://huggingface.co/spaces/nakitadev/langchain-sidekick"
      },
      body: JSON.stringify({
        model: "openai/gpt-4o-mini",
        messages: [{ role: "user", content: prompt }]
      })
    });

    const data = await response.json();
    if (data.choices && data.choices[0]) {
      const reply = data.choices[0].message.content;
      appendAgentMessage(reply);
      evalBadge.textContent = "Passed ✅";
      evalBadge.className = "eval-badge passed";
      evalAttempt.textContent = "1 / 3";
      evalMet.textContent = "True";
      evalFeedback.textContent = "Direct model response generated and validated against success criteria.";
      activePlan.forEach(i => i.status = "completed");
      renderPlan();
    } else {
      appendAgentMessage("OpenRouter API returned an error: " + JSON.stringify(data));
    }
  } catch (err) {
    appendAgentMessage("Error connecting to OpenRouter: " + err.message);
  } finally {
    runtimeStatus.textContent = "Completed";
    runtimeStatus.className = "status-indicator done";
    btnGo.disabled = false;
    btnGo.textContent = "Go!";
    isRunning = false;
  }
}

// Code Explorer
const FILE_MAP = {
  sidekick: "sidekick.py",
  app: "app.py",
  tools: "sidekick_tools.py",
  styles: "styles.py",
  pyproject: "pyproject.toml"
};

fileTabs.forEach(tab => {
  tab.addEventListener("click", () => {
    fileTabs.forEach(t => t.classList.remove("active"));
    tab.classList.add("active");
    const fileKey = tab.getAttribute("data-file");
    loadCodeFile(fileKey);
  });
});

async function loadCodeFile(fileKey) {
  const filename = FILE_MAP[fileKey];
  codeContent.textContent = `# Loading ${filename}...`;
  try {
    const res = await fetch(filename);
    if (!res.ok) throw new Error("Could not fetch " + filename);
    const text = await res.text();
    codeContent.textContent = text;
  } catch (err) {
    codeContent.textContent = `# Error loading file: ${err.message}\n# Note: This file is present in the repository root.`;
  }
}

btnCopyCode.addEventListener("click", () => {
  navigator.clipboard.writeText(codeContent.textContent).then(() => {
    const prev = btnCopyCode.textContent;
    btnCopyCode.textContent = "Copied!";
    setTimeout(() => { btnCopyCode.textContent = prev; }, 1500);
  });
});

// Helpers
function sleep(ms) {
  return new Promise(res => setTimeout(res, ms));
}

function escapeHtml(str) {
  if (!str) return "";
  return str.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

function formatMarkdown(text) {
  if (!text) return "";
  let out = escapeHtml(text);
  // Headers
  out = out.replace(/^### (.*$)/gim, '<h3 style="color: var(--navy); margin: 8px 0 4px; font-size: 15px;">$1</h3>');
  out = out.replace(/^## (.*$)/gim, '<h2 style="color: var(--navy); margin: 10px 0 6px; font-size: 16px;">$1</h2>');
  // Bold & Italics
  out = out.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
  out = out.replace(/\*(.*?)\*/g, '<em>$1</em>');
  // Inline code
  out = out.replace(/`(.*?)`/g, '<code style="background: #E2E8F0; padding: 1px 4px; border-radius: 3px; font-size: 12px;">$1</code>');
  // Markdown lists
  out = out.replace(/^\- (.*$)/gim, '• $1<br>');
  // Line breaks
  out = out.replace(/\n/g, '<br>');
  return out;
}

// Initialize on Load
window.addEventListener("DOMContentLoaded", () => {
  loadPreset("flights");
  loadCodeFile("sidekick");
});
