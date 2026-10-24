import { useEffect, useState } from 'react';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

function Status({ status }) {
  const isOnline = status === 'Connected';
  return (
    <span className={`inline-flex items-center gap-2 rounded-full px-3 py-1 text-sm ${isOnline ? 'bg-emerald-400/10 text-emerald-300' : 'bg-amber-400/10 text-amber-200'}`}>
      <span className={`h-2 w-2 rounded-full ${isOnline ? 'bg-emerald-400' : 'bg-amber-300'}`} />
      {status}
    </span>
  );
}

export default function App() {
  const [apiStatus, setApiStatus] = useState('Checking...');
  const [databaseStatus, setDatabaseStatus] = useState('Checking...');

  useEffect(() => {
    let cancelled = false;

    async function checkServices() {
      try {
        const response = await fetch(`${API_URL}/health`);
        if (!response.ok) throw new Error('API health check failed');
        if (!cancelled) setApiStatus('Connected');
      } catch {
        if (!cancelled) setApiStatus('Unavailable');
      }

      try {
        const response = await fetch(`${API_URL}/health/database`);
        const data = await response.json();
        if (!response.ok || !data.connected) throw new Error('Database check failed');
        if (!cancelled) setDatabaseStatus('Connected');
      } catch {
        if (!cancelled) setDatabaseStatus('Unavailable');
      }
    }

    checkServices();
    return () => { cancelled = true; };
  }, []);

  return (
    <main className="min-h-screen px-5 py-12 sm:px-8">
      <div className="mx-auto max-w-5xl">
        <header className="mb-12 flex items-center gap-3">
          <div className="grid h-12 w-12 place-items-center rounded-2xl bg-violet-400 text-xl font-black text-slate-950">L</div>
          <div>
            <p className="text-lg font-bold tracking-tight text-white">LiftLens</p>
            <p className="text-sm text-slate-400">Weightlifting analysis platform</p>
          </div>
        </header>

        <section className="mb-10 max-w-3xl">
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-violet-300">Project foundation</p>
          <h1 className="text-4xl font-bold tracking-tight text-white sm:text-6xl">Build better technique, one session at a time.</h1>
          <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-300">Your React frontend, Express API, and MySQL connection are ready to develop. Pose tracking and technique evaluation can be added as separate modules.</p>
        </section>

        <section className="grid gap-4 md:grid-cols-3">
          <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-5">
            <p className="text-sm text-slate-400">Frontend</p>
            <h2 className="mt-2 text-xl font-semibold text-white">React + Vite</h2>
            <p className="mt-2 text-sm text-slate-400">Tailwind CSS v4 is configured.</p>
          </div>
          <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-5">
            <p className="text-sm text-slate-400">Express API</p>
            <h2 className="mt-2 text-xl font-semibold text-white">Backend status</h2>
            <div className="mt-4"><Status status={apiStatus} /></div>
          </div>
          <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-5">
            <p className="text-sm text-slate-400">MySQL</p>
            <h2 className="mt-2 text-xl font-semibold text-white">Database status</h2>
            <div className="mt-4"><Status status={databaseStatus} /></div>
          </div>
        </section>

        <footer className="mt-10 border-t border-white/10 pt-5 text-sm text-slate-500">
          Starter template · API: <code className="text-slate-300">{API_URL}</code>
        </footer>
      </div>
    </main>
  );
}
