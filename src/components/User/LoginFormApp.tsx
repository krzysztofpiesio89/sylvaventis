'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { login, registerCustomer } from '@/utils/auth';
import { useRouter } from 'next/navigation';
import LoadingSpinner from '../LoadingSpinner/LoadingSpinner.component';
import { motion } from 'motion/react';

export default function LoginFormApp() {
  const [mode, setMode] = useState<'login' | 'register'>('login');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const router = useRouter();

  const { register, handleSubmit, reset } = useForm();

  const onSubmit = async (data: any) => {
    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      if (mode === 'login') {
        const result = await login(data.username, data.password);
        if (result.success) {
          router.push('/account');
          router.refresh();
        }
      } else {
        await registerCustomer({
          username: data.username,
          email: data.email,
          password: data.password,
          firstName: data.firstName,
        });
        setSuccess('Konto erfolgreich erstellt! Sie werden weitergeleitet...');
        setTimeout(() => {
          router.push('/account');
          router.refresh();
        }, 1500);
      }
    } catch (err: any) {
      setError(err.message || 'Authentifizierung fehlgeschlagen.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full max-w-md mx-auto"
    >
      <div className="rounded-3xl border border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-900/90 p-8 md:p-10 shadow-2xl relative overflow-hidden backdrop-blur-md">
        {/* Toggle Mode Tabs */}
        <div className="flex items-center justify-center p-1 bg-stone-100 dark:bg-stone-800/80 rounded-full mb-8 border border-stone-200 dark:border-stone-700">
          <button
            type="button"
            onClick={() => { setMode('login'); setError(null); reset(); }}
            className={`flex-1 py-2.5 text-xs font-mono font-bold uppercase tracking-widest rounded-full transition-all ${
              mode === 'login'
                ? 'bg-amber-400 text-stone-950 shadow-md'
                : 'text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-100'
            }`}
          >
            Anmelden
          </button>
          <button
            type="button"
            onClick={() => { setMode('register'); setError(null); reset(); }}
            className={`flex-1 py-2.5 text-xs font-mono font-bold uppercase tracking-widest rounded-full transition-all ${
              mode === 'register'
                ? 'bg-amber-400 text-stone-950 shadow-md'
                : 'text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-100'
            }`}
          >
            Registrieren
          </button>
        </div>

        <h2 className="text-2xl font-serif font-bold text-center text-stone-900 dark:text-stone-100 mb-6">
          {mode === 'login' ? 'Willkommen Zurück' : 'Konto Erstellen'}
        </h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          {mode === 'register' && (
            <div>
              <label className="text-[10px] font-mono uppercase tracking-widest font-bold text-stone-500 dark:text-stone-400 block mb-1.5 ml-2">
                Vorname
              </label>
              <input
                {...register('firstName')}
                type="text"
                placeholder="Ihr Vorname"
                className="w-full bg-stone-50 dark:bg-stone-800/60 border border-stone-300 dark:border-stone-700 text-stone-900 dark:text-stone-100 text-sm rounded-2xl px-5 py-3.5 focus:outline-none focus:border-amber-400 transition-colors"
              />
            </div>
          )}

          <div>
            <label className="text-[10px] font-mono uppercase tracking-widest font-bold text-stone-500 dark:text-stone-400 block mb-1.5 ml-2">
              Benutzername
            </label>
            <input
              {...register('username', { required: true })}
              type="text"
              placeholder="Benutzername oder E-Mail"
              className="w-full bg-stone-50 dark:bg-stone-800/60 border border-stone-300 dark:border-stone-700 text-stone-900 dark:text-stone-100 text-sm rounded-2xl px-5 py-3.5 focus:outline-none focus:border-amber-400 transition-colors"
            />
          </div>

          {mode === 'register' && (
            <div>
              <label className="text-[10px] font-mono uppercase tracking-widest font-bold text-stone-500 dark:text-stone-400 block mb-1.5 ml-2">
                E-Mail Adresse
              </label>
              <input
                {...register('email', { required: true })}
                type="email"
                placeholder="beispiel@domain.de"
                className="w-full bg-stone-50 dark:bg-stone-800/60 border border-stone-300 dark:border-stone-700 text-stone-900 dark:text-stone-100 text-sm rounded-2xl px-5 py-3.5 focus:outline-none focus:border-amber-400 transition-colors"
              />
            </div>
          )}

          <div>
            <label className="text-[10px] font-mono uppercase tracking-widest font-bold text-stone-500 dark:text-stone-400 block mb-1.5 ml-2">
              Passwort
            </label>
            <input
              {...register('password', { required: true })}
              type="password"
              placeholder="••••••••"
              className="w-full bg-stone-50 dark:bg-stone-800/60 border border-stone-300 dark:border-stone-700 text-stone-900 dark:text-stone-100 text-sm rounded-2xl px-5 py-3.5 focus:outline-none focus:border-amber-400 transition-colors"
            />
          </div>

          {error && (
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-red-500 text-xs text-center font-mono font-medium bg-red-500/10 py-2.5 px-4 rounded-xl border border-red-500/20"
            >
              {error}
            </motion.p>
          )}

          {success && (
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-emerald-500 text-xs text-center font-mono font-medium bg-emerald-500/10 py-2.5 px-4 rounded-xl border border-emerald-500/20"
            >
              {success}
            </motion.p>
          )}

          <button
            disabled={loading}
            type="submit"
            className="w-full bg-amber-400 text-stone-950 font-bold py-4 rounded-2xl text-xs uppercase font-mono tracking-widest hover:bg-amber-300 transition-all shadow-md active:scale-[0.98] disabled:opacity-50 flex items-center justify-center gap-3 mt-4"
          >
            {loading ? <LoadingSpinner /> : mode === 'login' ? 'Jetzt Anmelden' : 'Konto Erstellen'}
          </button>
        </form>

        <div className="mt-8 pt-6 border-t border-stone-200 dark:border-stone-800 text-center">
          <p className="text-[10px] text-stone-400 font-mono uppercase tracking-widest">
            Sylvaventis · Sichter Portalen Access
          </p>
        </div>
      </div>
    </motion.div>
  );
}
