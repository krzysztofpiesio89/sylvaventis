'use client';

import { useState } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { login } from '@/utils/auth';
import { useRouter } from 'next/navigation';
import LoadingSpinner from '../LoadingSpinner/LoadingSpinner.component';
import { motion } from 'motion/react';

interface ILoginData {
  username: string;
  password: string;
}

const LoginFormApp = () => {
  const methods = useForm<ILoginData>();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const onSubmit = async (data: ILoginData) => {
    setLoading(true);
    setError(null);
    try {
      const result = await login(data.username, data.password);
      if (result.success) {
        router.push('/account');
        router.refresh();
      }
    } catch (err: any) {
      setError(err.message || 'Authentication failed');
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
      <div className="glass p-8 md:p-12 rounded-3xl border border-white/5 shadow-2xl relative overflow-hidden group">
        <div className="absolute inset-0 bg-gradient-to-br from-accent-gold/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        
        <h2 className="text-3xl font-light tracking-tighter mb-8 text-center">
          Welcome <em className="italic text-accent-gold">Back</em>
        </h2>

        <FormProvider {...methods}>
          <form onSubmit={methods.handleSubmit(onSubmit)} className="space-y-6 relative z-10">
            <div className="space-y-2">
              <label className="text-[10px] uppercase tracking-[0.2em] font-bold text-white/40 ml-4">
                Identifier
              </label>
              <input
                {...methods.register('username', { required: true })}
                type="text"
                placeholder="Username or Email"
                className="w-full bg-obsidian/50 border border-white/5 rounded-full px-6 py-4 text-sm focus:outline-none focus:border-accent-gold/50 transition-colors placeholder:text-white/10"
              />
            </div>

            <div className="space-y-2">
              <label className="text-[10px] uppercase tracking-[0.2em] font-bold text-white/40 ml-4">
                Security Key
              </label>
              <input
                {...methods.register('password', { required: true })}
                type="password"
                placeholder="••••••••"
                className="w-full bg-obsidian/50 border border-white/5 rounded-full px-6 py-4 text-sm focus:outline-none focus:border-accent-gold/50 transition-colors placeholder:text-white/10"
              />
            </div>

            {error && (
              <motion.p 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-error text-[11px] text-center font-medium bg-error/10 py-2 rounded-full border border-error/20"
              >
                {error}
              </motion.p>
            )}

            <button
              disabled={loading}
              className="w-full bg-accent-gold text-obsidian font-bold py-4 rounded-full text-[11px] uppercase tracking-[0.2em] transition-all hover:bg-white hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:hover:scale-100 flex items-center justify-center gap-3"
            >
              {loading ? <LoadingSpinner /> : 'Access Account'}
            </button>
          </form>
        </FormProvider>

        <div className="mt-8 pt-8 border-t border-white/5 text-center">
          <p className="text-[10px] text-white/30 uppercase tracking-widest">
            Ancient Wisdom · Modern Access
          </p>
        </div>
      </div>
    </motion.div>
  );
};

export default LoginFormApp;
