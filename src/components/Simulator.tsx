import React, { useState, useEffect } from 'react';
import { CheckIcon, XIcon, FileIcon, ShieldCheckIcon, ShieldXIcon } from './Icons';

type Scenario = {
  id: string;
  title: string;
  desc: string;
  diff: string;
  mvus: { name: string; type: string; action: string }[];
  transforms: { name: string; status: 'pass' | 'fail' }[];
  policies: { name: string; status: 'pass' | 'fail'; detail?: string }[];
  verdict: 'ALLOW' | 'DENY';
  auditHash: string;
};

const SCENARIOS: Scenario[] = [
  {
    id: 'refactor',
    title: 'Safe Refactor',
    desc: 'Extract validation logic into a pure function',
    diff: ` function createUser(req) {
-  if (!req.email || !req.password) {
-    throw new Error("Invalid input");
-  }
+  validateUserRequest(req);
   const user = db.insert(req);
   return user;
 }
+
+function validateUserRequest(req) {
+  if (!req.email || !req.password) {
+    throw new Error("Invalid input");
+  }
+}`,
    mvus: [
      { name: 'createUser', type: 'FunctionDeclaration', action: 'modified' },
      { name: 'validateUserRequest', type: 'FunctionDeclaration', action: 'added' },
    ],
    transforms: [
      { name: 'Extract Method', status: 'pass' },
      { name: 'No vocabulary drift', status: 'pass' },
      { name: 'Type signature preserved', status: 'pass' },
    ],
    policies: [
      { name: 'INFRASTRUCTURE_IMMUTABLE', status: 'pass' },
      { name: 'SECRET_INJECTION', status: 'pass' },
      { name: 'REFINEMENT_BOUND', status: 'pass', detail: 'Precondition strengthened' },
    ],
    verdict: 'ALLOW',
    auditHash: 'sha256:a3f7c9e2...8b2e',
  },
  {
    id: 'infra',
    title: 'Infrastructure Risk',
    desc: 'LLM proposes Terraform IAM wildcard permission',
    diff: ` resource "aws_iam_role_policy" "app" {
   name = "app-policy"
   policy = jsonencode({
     Statement = [{
-      Action   = ["s3:GetObject"]
+      Action   = ["s3:*", "iam:*"]
       Effect   = "Allow"
-      Resource = "arn:aws:s3:::data/*"
+      Resource = "*"
     }]
   })
 }`,
    mvus: [
      { name: 'aws_iam_role_policy.app', type: 'Resource', action: 'modified' },
    ],
    transforms: [
      { name: 'HCL structural parse', status: 'pass' },
      { name: 'Operator preservation', status: 'pass' },
    ],
    policies: [
      { name: 'INFRASTRUCTURE_IMMUTABLE', status: 'fail', detail: 'iam:* wildcard detected' },
      { name: 'PRINCIPLE_OF_LEAST_PRIVILEGE', status: 'fail', detail: 'Resource: *' },
      { name: 'SECRET_INJECTION', status: 'pass' },
    ],
    verdict: 'DENY',
    auditHash: 'sha256:d9e1b2f4...c5a1',
  },
  {
    id: 'secret',
    title: 'Secret Exposure',
    desc: 'Agent hardcodes database password in config',
    diff: ` export const config = {
   dbHost: process.env.DB_HOST,
   dbPort: 5432,
+  dbPassword: "SuperSecret123!",
 };`,
    mvus: [
      { name: 'config', type: 'VariableDeclaration', action: 'modified' },
      { name: 'dbPassword', type: 'Property', action: 'added' },
    ],
    transforms: [
      { name: 'Literal injection check', status: 'pass' },
      { name: 'Entropy analysis', status: 'pass' },
    ],
    policies: [
      { name: 'SECRET_INJECTION', status: 'fail', detail: 'Plaintext credential detected' },
      { name: 'ENTROPY_THRESHOLD', status: 'fail', detail: 'High-entropy string in source' },
      { name: 'INFRASTRUCTURE_IMMUTABLE', status: 'pass' },
    ],
    verdict: 'DENY',
    auditHash: 'sha256:7f8a9b1c...1d2e',
  },
  {
    id: 'logging',
    title: 'Compliant Feature',
    desc: 'Add structured audit logging to API handlers',
    diff: ` app.post('/transfer', (req, res) => {
+  auditLog.info({
+    event: 'TRANSFER_INIT',
+    user: req.user.id,
+    amount: req.body.amount,
+  });
   const result = transferFunds(req);
+  auditLog.info({
+    event: 'TRANSFER_COMPLETE',
+    txId: result.txId,
+  });
   res.json(result);
 });`,
    mvus: [
      { name: 'auditLog', type: 'CallExpression', action: 'added' },
      { name: 'transfer route', type: 'RouteHandler', action: 'modified' },
    ],
    transforms: [
      { name: 'Side-effect containment', status: 'pass' },
      { name: 'No structural drift', status: 'pass' },
    ],
    policies: [
      { name: 'AUDIT_FIRST', status: 'pass', detail: 'Tamper-evident log emitted' },
      { name: 'PII_EXFILTRATION', status: 'pass', detail: 'No unmasked PII' },
      { name: 'INFRASTRUCTURE_IMMUTABLE', status: 'pass' },
    ],
    verdict: 'ALLOW',
    auditHash: 'sha256:b2c4d6e8...8f0a',
  },
];

const STEPS = [
  { id: 'ingest', label: 'Ingestion', desc: 'Parsing LLM proposal into AST and system context...' },
  { id: 'mvu', label: 'MVU Segmentation', desc: 'Decomposing change into Minimal Verification Units...' },
  { id: 'transform', label: 'Structure-Preserving Transform', desc: 'Verifying operator-based lawful emergence...' },
  { id: 'eta', label: 'ETA Policy Evaluation', desc: 'Evaluating against versioned policy registry...' },
  { id: 'verdict', label: 'Execution Verdict', desc: 'Failing closed unless affirmative ALLOW produced...' },
  { id: 'audit', label: 'Audit Artifact', desc: 'Generating tamper-evident authorization record...' },
];

function DiffView({ diff }: { diff: string }) {
  return (
    <pre style={{
      margin: 0,
      padding: 16,
      background: '#0f172a',
      color: '#e2e8f0',
      fontFamily: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace',
      fontSize: 13,
      lineHeight: 1.5,
      overflow: 'auto',
      borderRadius: 8,
      maxHeight: 320,
    }}>
      {diff.split('\n').map((line, i) => {
        let bg = 'transparent';
        let color = '#e2e8f0';
        if (line.startsWith('+')) {
          bg = 'rgba(5, 150, 105, 0.15)';
          color = '#34d399';
        } else if (line.startsWith('-')) {
          bg = 'rgba(220, 38, 38, 0.15)';
          color = '#f87171';
        } else if (line.startsWith('@@')) {
          color = '#60a5fa';
        }
        return (
          <div key={i} style={{ background: bg, color, padding: '0 4px', whiteSpace: 'pre' }}>
            {line}
          </div>
        );
      })}
    </pre>
  );
}

export default function Simulator() {
  const [selected, setSelected] = useState(0);
  const [running, setRunning] = useState(false);
  const [step, setStep] = useState(-1);

  const scenario = SCENARIOS[selected];

  useEffect(() => {
    setRunning(false);
    setStep(-1);
  }, [selected]);

  const run = () => {
    if (running) return;
    setRunning(true);
    setStep(-1);
    let current = -1;
    const advance = () => {
      current += 1;
      setStep(current);
      if (current < STEPS.length - 1) {
        setTimeout(advance, 700);
      } else {
        setRunning(false);
      }
    };
    setTimeout(advance, 100);
  };

  return (
    <section id="simulator" style={{ padding: '80px 24px', background: '#f8fafc' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        <h2 style={{ fontSize: 28, fontWeight: 700, color: '#0f172a', marginBottom: 8 }}>Live Policy Compiler</h2>
        <p style={{ fontSize: 16, color: '#475569', marginBottom: 32, maxWidth: 640, lineHeight: 1.6 }}>
          See how LLM proposals are transformed into governed, executable actions through Execution-Time Authorization.
        </p>

        <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', marginBottom: 32 }}>
          {SCENARIOS.map((sc, idx) => (
            <button
              key={sc.id}
              onClick={() => setSelected(idx)}
              aria-pressed={idx === selected}
              style={{
                flex: '1 1 220px',
                padding: 16,
                borderRadius: 8,
                border: idx === selected ? '2px solid #4f46e5' : '1px solid #cbd5e1',
                background: idx === selected ? '#eef2ff' : '#ffffff',
                cursor: 'pointer',
                textAlign: 'left',
              }}
            >
              <div style={{ fontWeight: 600, color: '#0f172a', marginBottom: 4, fontSize: 15 }}>{sc.title}</div>
              <div style={{ fontSize: 14, color: '#64748b', lineHeight: 1.4 }}>{sc.desc}</div>
            </button>
          ))}
        </div>

        <div className="sim-grid" style={{ display: 'grid', gap: 24 }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
              <FileIcon size={16} color="#64748b" />
              <span style={{ fontSize: 14, fontWeight: 600, color: '#334155' }}>LLM Proposal — {scenario.title}</span>
            </div>
            <DiffView diff={scenario.diff} />
          </div>

          <div style={{ background: '#ffffff', borderRadius: 8, padding: 24, border: '1px solid #e2e8f0' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24, flexWrap: 'wrap', gap: 12 }}>
              <span style={{ fontSize: 14, fontWeight: 700, color: '#0f172a' }}>Compiler Pipeline</span>
              <button
                onClick={run}
                disabled={running}
                style={{
                  background: running ? '#94a3b8' : '#4f46e5',
                  color: '#fff',
                  border: 'none',
                  borderRadius: 6,
                  padding: '8px 16px',
                  fontSize: 14,
                  fontWeight: 600,
                  cursor: running ? 'not-allowed' : 'pointer',
                }}
              >
                {running ? 'Compiling...' : 'Compile & Authorize'}
              </button>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
              {STEPS.map((s, idx) => {
                const isActive = idx === step;
                const isComplete = idx < step;
                const isVisible = isComplete || isActive;

                if (idx >= 4 && !isVisible) return null;

                return (
                  <div key={s.id} style={{
                    opacity: isVisible ? 1 : 0.35,
                    transition: 'opacity 0.4s ease',
                  }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8 }}>
                      <div style={{
                        width: 24,
                        height: 24,
                        borderRadius: '50%',
                        background: isComplete ? '#059669' : isActive ? '#4f46e5' : '#e2e8f0',
                        color: isComplete || isActive ? '#fff' : '#64748b',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: 11,
                        fontWeight: 700,
                        flexShrink: 0,
                      }}>
                        {isComplete ? <CheckIcon size={12} color="#fff" /> : idx + 1}
                      </div>
                      <span style={{ fontWeight: 600, color: isVisible ? '#0f172a' : '#94a3b8', fontSize: 14 }}>
                        {s.label}
                      </span>
                    </div>

                    {isVisible && (
                      <div style={{ marginLeft: 34 }}>
                        {idx === 0 && (
                          <div style={{ fontSize: 14, color: '#475569', lineHeight: 1.5 }}>{s.desc}</div>
                        )}

                        {idx === 1 && (
                          <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                            {scenario.mvus.map((m, i) => (
                              <div key={i} style={{ fontSize: 13, color: '#334155', background: '#f1f5f9', padding: '6px 10px', borderRadius: 4, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <span>{m.name} <span style={{ color: '#64748b' }}>({m.type})</span></span>
                                <span style={{ color: '#059669', fontWeight: 600, fontSize: 12 }}>{m.action}</span>
                              </div>
                            ))}
                          </div>
                        )}

                        {idx === 2 && (
                          <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                            {scenario.transforms.map((t, i) => (
                              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 14, color: '#334155' }}>
                                {t.status === 'pass' ? <CheckIcon size={14} /> : <XIcon size={14} />}
                                <span>{t.name}</span>
                              </div>
                            ))}
                          </div>
                        )}

                        {idx === 3 && (
                          <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                            {scenario.policies.map((p, i) => (
                              <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 8, fontSize: 14, color: '#334155' }}>
                                <span style={{ marginTop: 2, flexShrink: 0 }}>{p.status === 'pass' ? <CheckIcon size={14} /> : <XIcon size={14} />}</span>
                                <div>
                                  <div style={{ fontWeight: 600 }}>{p.name}</div>
                                  {p.detail && <div style={{ color: '#64748b', fontSize: 13, marginTop: 2 }}>{p.detail}</div>}
                                </div>
                              </div>
                            ))}
                          </div>
                        )}

                        {idx === 4 && (
                          <div style={{
                            background: scenario.verdict === 'ALLOW' ? '#ecfdf5' : '#fef2f2',
                            border: `1px solid ${scenario.verdict === 'ALLOW' ? '#a7f3d0' : '#fecaca'}`,
                            borderRadius: 8,
                            padding: 24,
                            textAlign: 'center',
                          }}>
                            <div style={{ display: 'flex', justifyContent: 'center' }}>
                              {scenario.verdict === 'ALLOW' ? <ShieldCheckIcon size={48} /> : <ShieldXIcon size={48} />}
                            </div>
                            <div style={{
                              fontSize: 24,
                              fontWeight: 800,
                              color: scenario.verdict === 'ALLOW' ? '#059669' : '#dc2626',
                              marginTop: 12,
                            }}>
                              {scenario.verdict}
                            </div>
                            <div style={{ fontSize: 14, color: '#64748b', marginTop: 6, lineHeight: 1.5 }}>
                              {scenario.verdict === 'ALLOW'
                                ? 'All policies satisfied. Execution boundary open.'
                                : 'Policy violation detected. Execution blocked.'}
                            </div>
                          </div>
                        )}

                        {idx === 5 && (
                          <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: 6, padding: 16, fontFamily: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace', fontSize: 13, color: '#475569' }}>
                            <div style={{ marginBottom: 6 }}><span style={{ color: '#94a3b8' }}>artifact_hash:</span> {scenario.auditHash}</div>
                            <div style={{ marginBottom: 6 }}><span style={{ color: '#94a3b8' }}>timestamp:</span> {new Date().toISOString()}</div>
                            <div style={{ marginBottom: 6 }}><span style={{ color: '#94a3b8' }}>policy_version:</span> v2.1.0</div>
                            <div><span style={{ color: '#94a3b8' }}>verdict:</span> <span style={{ color: scenario.verdict === 'ALLOW' ? '#059669' : '#dc2626', fontWeight: 700 }}>{scenario.verdict}</span></div>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
