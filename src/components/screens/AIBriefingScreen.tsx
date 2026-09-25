import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  BrainCircuit,
  Sparkles,
  ArrowRight,
  AlertTriangle,
  CheckCircle2,
  Send,
  HelpCircle,
  FileCheck2,
  Layers,
  ChevronRight,
  ShieldCheck,
  Zap,
} from 'lucide-react';

interface ExecutiveQA {
  id: string;
  question: string;
  answer: string;
  timestamp: string;
}

export const AIBriefingScreen: React.FC = () => {
  const {
    params,
    kpis,
    setIsDecisionModalOpen,
    jumpToScenarioLabWithIntervention,
  } = useApp();

  const [inputQuery, setInputQuery] = useState('');
  const [chatHistory, setChatHistory] = useState<ExecutiveQA[]>([
    {
      id: 'qa-1',
      question: 'What is our biggest operational exposure in this scenario?',
      answer: `Under your current ${params.duration}-day Hormuz disruption assumption, your single largest exposure is Singapore Plant 02. Because 38% of your specialized condensate is sourced via Ras Laffan (Qatar) with zero egress through the Strait, Plant 02 exhausts working inventory on Day ${kpis.exhaustionDay}. This threatens $${kpis.atRiskDemand}M in high-purity semiconductor resin commitments to Asian consortium clients.`,
      timestamp: 'Today, 09:20 AM',
    },
  ]);
  const [isGenerating, setIsGenerating] = useState(false);

  const suggestedPrompts = [
    'What breaks first?',
    'What is our biggest exposure?',
    'What happens at 90 days?',
    'Compare inventory vs alternate supplier.',
    'Where should we spend first?',
  ];

  const handleAskQuestion = (questionText: string) => {
    if (!questionText.trim()) return;

    const q = questionText.trim();
    setInputQuery('');
    setIsGenerating(true);

    setTimeout(() => {
      let simulatedAnswer = '';
      const qLower = q.toLowerCase();

      if (qLower.includes('break') || qLower.includes('first')) {
        simulatedAnswer = `Plant 02 in Singapore breaks first on Day ${kpis.exhaustionDay}. With safety stock capped at ${params.inventory} operating days and maritime transit times around Africa stretching to 34 days, there is a verified ${Math.max(0, 34 - params.inventory)}-day production vacuum unless you activate either the East-West Petroline bypass (+4d transit) or lease bonded storage buffer in Jurong.`;
      } else if (qLower.includes('exposure') || qLower.includes('biggest')) {
        simulatedAnswer = `Your biggest monetary exposure is $${kpis.atRiskDemand}M in customer orders across Asian semiconductor packaging clients. Furthermore, gross margin is projected to degrade by +${kpis.costImpact}% due to VLCC charter rate surcharges (current freight: ${params.freight}) and crude price surge ($${params.energyPrice}/bbl).`;
      } else if (qLower.includes('90') || qLower.includes('duration')) {
        simulatedAnswer = `Extending the disruption to 90 days without proactive hedges expands your supply deficit from 18% to 27%, accelerates inventory depletion to Day 24, and raises cost impacts by an estimated +8.6% OPEX. To survive a 90-day horizon, you must combine alternative suppliers (Bonny Island/Corpus Christi) with a minimum 35-day strategic inventory buffer.`;
      } else if (qLower.includes('inventory vs') || qLower.includes('compare')) {
        simulatedAnswer = `Tradeoff Analysis:\n1. Strategic Inventory Buffer (+15d): High speed to effect (immediate), costs $2.8M carrying charges, extends operating runway to Day 39. Does not resolve root feedstock deficit.\n2. Alternative Supplier (Bonny/Corpus): Replaces 14,000 bpd structural feed, reduces supply gap by 11%, but requires 14-day Atlantic sailing time.\nRecommendation: Execute dual-hedge. Draw inventory buffer to survive Weeks 1-4 while alternate transatlantic vessels transit.`;
      } else if (qLower.includes('spend') || qLower.includes('first') || qLower.includes('capital')) {
        simulatedAnswer = `Spend first on the $4.2M reservation fee for 15,000 bpd capacity on the East-West Petroline pipeline to Yanbu. Commercial pipeline slots are at 94% utilization and will close within 72 hours. Second, allocate $2.8M for immediate strategic inventory tank leasing in Jurong.`;
      } else {
        simulatedAnswer = `Based on your active ${params.duration}-day disruption model (Energy: $${params.energyPrice}/bbl, Freight: ${params.freight}, Inventory: ${params.inventory}d), the engine projects an active supply gap of ${kpis.supplyAtRisk}% and customer service fulfillment of ${kpis.customerServiceLevel}%. Operational risk is rated ${kpis.productionRisk}. Recommended action is to log a formal capacity reservation decision on alternate corridors.`;
      }

      setChatHistory(prev => [
        ...prev,
        {
          id: `qa-${Date.now()}`,
          question: q,
          answer: simulatedAnswer,
          timestamp: 'Just now',
        },
      ]);
      setIsGenerating(false);
    }, 600);
  };

  return (
    <div className="space-y-6 pb-14 animate-in fade-in duration-200">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800/80 pb-5">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-[10px] uppercase font-mono tracking-widest text-cyan-400 font-semibold px-1.5 py-0.5 rounded bg-cyan-950/60 border border-cyan-800/60">
              SYNTHESIS ENGINE
            </span>
            <span className="text-[11px] font-mono text-slate-400">
              · SIMULATED AI EXECUTIVE ANALYSIS
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-white font-mono">
            ORBIT Intelligence
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-0.5">
            Contextual decision briefing synthesizing scenario inputs, critical failure points, and operational trade-offs.
          </p>
        </div>

        <button
          onClick={() => setIsDecisionModalOpen(true)}
          className="flex items-center gap-2 px-3.5 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold transition-all shadow-md cursor-pointer shrink-0"
        >
          <FileCheck2 className="w-3.5 h-3.5" />
          <span>Record Brief Decision</span>
        </button>
      </div>

      {/* EXECUTIVE DECISION BRIEF CONTAINER */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 sm:p-6 space-y-6">
        
        {/* Executive Header Banner */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
          <div>
            <span className="text-[10px] font-mono uppercase tracking-widest text-cyan-400 font-bold">
              CONFIDENTIAL · OPERATIONS EXCO BRIEFING
            </span>
            <h2 className="text-lg font-bold text-white font-mono mt-0.5">
              Decision Brief: {params.duration}-Day Sustained Hormuz Closure
            </h2>
          </div>
          <div className="text-xs font-mono text-slate-400 text-left sm:text-right">
            <div>Nova Industrials Corp. · 4 Operating Plants</div>
            <div className="text-slate-400">Modelled on {new Date().toLocaleDateString()}</div>
          </div>
        </div>

        {/* 6 Structured Briefing Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          
          {/* 1. WHAT CHANGED */}
          <div className="p-4 rounded-lg bg-slate-950/80 border border-slate-800 space-y-1.5">
            <div className="flex items-center gap-2 text-xs font-mono font-bold text-cyan-400 uppercase">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
              <span>What Changed</span>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed font-sans">
              Maritime insurance syndicates revoked war risk coverage across Persian Gulf outbound shipping lanes. Strait of Hormuz commercial passage is modeled at 0% throughput for {params.duration} consecutive days.
            </p>
          </div>

          {/* 2. WHAT IT MEANS */}
          <div className="p-4 rounded-lg bg-slate-950/80 border border-slate-800 space-y-1.5">
            <div className="flex items-center gap-2 text-xs font-mono font-bold text-amber-400 uppercase">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
              <span>What It Means</span>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed font-sans">
              Feedstock supply deficit of {kpis.supplyAtRisk}% across four operating plants. OPEX surge of +{kpis.costImpact}% driven by spot tanker charters and fuel escalation to ${params.energyPrice}/bbl.
            </p>
          </div>

          {/* 3. WHAT BREAKS FIRST */}
          <div className="p-4 rounded-lg bg-slate-950/80 border border-rose-900/40 bg-rose-950/10 space-y-1.5">
            <div className="flex items-center gap-2 text-xs font-mono font-bold text-rose-400 uppercase">
              <span className="w-1.5 h-1.5 rounded-full bg-rose-400" />
              <span>What Breaks First</span>
            </div>
            <p className="text-xs text-slate-200 leading-relaxed font-sans">
              <strong>Your {params.duration}-day scenario leaves Plant 02 in Singapore exposed after Day {kpis.exhaustionDay}.</strong> Working inventories will hit zero before Cape of Good Hope rerouted voyages arrive (+14d delta).
            </p>
          </div>

          {/* 4. OPTIONS & TRADEOFFS */}
          <div className="p-4 rounded-lg bg-slate-950/80 border border-slate-800 space-y-1.5">
            <div className="flex items-center gap-2 text-xs font-mono font-bold text-purple-400 uppercase">
              <span className="w-1.5 h-1.5 rounded-full bg-purple-400" />
              <span>Options & Tradeoffs</span>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed font-sans">
              A: Fast Pipeline Bypass (Yanbu) — preserves speed (+4d), but carries $4.2M premium.
              <br />
              B: Cape Reroute — maximum volume, but adds +14 days and +42% carbon footprint.
              <br />
              C: Atlantic Sourcing (Nigeria/US) — replaces 14k bpd, requires spot contract execution.
            </p>
          </div>

          {/* 5. RECOMMENDED NEXT STEPS */}
          <div className="p-4 rounded-lg bg-slate-950/80 border border-slate-800 space-y-1.5">
            <div className="flex items-center gap-2 text-xs font-mono font-bold text-emerald-400 uppercase">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
              <span>Recommended Next Steps</span>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed font-sans">
              1. Lock 15,000 bpd nomination on East-West Petroline.
              <br />
              2. Authorize 15-day strategic inventory injection in Jurong bonded storage.
              <br />
              3. Shift 18% European automotive compounding from Antwerp to Houston Plant 04.
            </p>
          </div>

          {/* 6. DECISIONS REQUIRED */}
          <div className="p-4 rounded-lg bg-slate-950/80 border border-slate-800 space-y-1.5">
            <div className="flex items-center gap-2 text-xs font-mono font-bold text-cyan-400 uppercase">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
              <span>Decisions Required</span>
            </div>
            <div className="space-y-1 text-xs text-slate-300 font-sans">
              <div className="flex items-center justify-between">
                <span>• Petroline Pipeline Reservation</span>
                <span className="text-[10px] font-mono text-emerald-400">Approved</span>
              </div>
              <div className="flex items-center justify-between">
                <span>• Strategic Inventory Draw</span>
                <span className="text-[10px] font-mono text-amber-400">In progress</span>
              </div>
              <div className="flex items-center justify-between">
                <span>• Atlantic Feedstock Off-Take</span>
                <span className="text-[10px] font-mono text-cyan-400">Proposed</span>
              </div>
            </div>
          </div>

        </div>

        {/* Evidence Cards */}
        <div className="pt-4 border-t border-slate-800">
          <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 block mb-2">
            MODELLED EVIDENCE CARDS
          </span>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 font-mono text-xs">
            <div className="p-3 rounded bg-slate-950 border border-slate-800">
              <span className="text-slate-400 text-[10px] block">EVIDENCE 01 · PLANT 02 RUNWAY</span>
              <span className="text-rose-400 font-bold text-sm">24 Days to Failure</span>
              <p className="text-[11px] text-slate-400 font-sans mt-0.5">
                Specialty catalyst reserve cannot outlast Cape transit cycle.
              </p>
            </div>

            <div className="p-3 rounded bg-slate-950 border border-slate-800">
              <span className="text-slate-400 text-[10px] block">EVIDENCE 02 · PIPELINE SATURATION</span>
              <span className="text-amber-300 font-bold text-sm">94% Nominal Capacity</span>
              <p className="text-[11px] text-slate-400 font-sans mt-0.5">
                East-West line approaching max hydraulic throughput.
              </p>
            </div>

            <div className="p-3 rounded bg-slate-950 border border-slate-800">
              <span className="text-slate-400 text-[10px] block">EVIDENCE 03 · CONTRACTUAL PENALTIES</span>
              <span className="text-white font-bold text-sm">$82.4M At Risk</span>
              <p className="text-[11px] text-slate-400 font-sans mt-0.5">
                Semiconductor packaging SLA triggers at +120h delivery delay.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* EXECUTIVE SCENARIO QUERY INTERFACE */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 sm:p-6 space-y-4">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-cyan-400" />
            <h3 className="text-sm font-bold text-white font-mono uppercase tracking-wider">
              Ask ORBIT About This Scenario
            </h3>
          </div>
          <span className="text-[10px] font-mono text-slate-400">
            SIMULATED AI ANALYSIS · GROUNDED ON ACTIVE STATE
          </span>
        </div>

        {/* Suggested Prompts */}
        <div className="flex flex-wrap gap-2 text-xs font-mono">
          <span className="text-slate-400 text-[11px] self-center">Suggested:</span>
          {suggestedPrompts.map((p, idx) => (
            <button
              key={idx}
              onClick={() => handleAskQuestion(p)}
              className="px-2.5 py-1 rounded bg-slate-950 hover:bg-slate-800 text-cyan-300 border border-slate-800 hover:border-slate-700 transition-colors cursor-pointer text-xs"
            >
              "{p}"
            </button>
          ))}
        </div>

        {/* Query Input Box */}
        <div className="flex gap-2">
          <input
            type="text"
            value={inputQuery}
            onChange={e => setInputQuery(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && handleAskQuestion(inputQuery)}
            placeholder="Ask ORBIT about operational tradeoffs, inventory exhaustion, or financial exposure..."
            className="flex-1 px-4 py-2.5 bg-slate-950 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 text-xs font-mono"
          />
          <button
            onClick={() => handleAskQuestion(inputQuery)}
            disabled={isGenerating || !inputQuery.trim()}
            className="px-4 py-2.5 bg-cyan-600 hover:bg-cyan-500 disabled:opacity-50 text-white font-semibold text-xs rounded-lg transition-colors flex items-center gap-2 cursor-pointer shrink-0"
          >
            <span>Ask</span>
            <Send className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Q&A Thread */}
        <div className="space-y-4 pt-2">
          {chatHistory.map(qa => (
            <div key={qa.id} className="p-4 rounded-lg bg-slate-950 border border-slate-800 space-y-2 text-xs">
              <div className="flex items-center justify-between text-slate-400 font-mono text-[11px]">
                <span className="text-cyan-400 font-semibold">Q: {qa.question}</span>
                <span>{qa.timestamp}</span>
              </div>
              <p className="text-slate-200 leading-relaxed font-sans whitespace-pre-line">
                {qa.answer}
              </p>
            </div>
          ))}

          {isGenerating && (
            <div className="p-4 rounded-lg bg-slate-950 border border-slate-800 text-xs font-mono text-cyan-400 animate-pulse flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-cyan-400" />
              <span>ORBIT Executive Intelligence evaluating scenario parameters...</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
