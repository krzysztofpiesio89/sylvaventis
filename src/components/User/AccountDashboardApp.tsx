'use client';

import { useState, useEffect } from 'react';
import LoadingSpinner from '../LoadingSpinner/LoadingSpinner.component';
import { logout, getUser } from '@/utils/auth';
import { motion, AnimatePresence } from 'motion/react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

type TabType = 'dashboard' | 'orders' | 'downloads' | 'addresses' | 'account-details' | 'logout';

interface TabItem {
  id: TabType;
  label: string;
  renderIcon: (active: boolean) => React.ReactNode;
}

// Vector SVG Icons
const DashboardIcon = ({ active }: { active: boolean }) => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" className={active ? 'text-stone-950' : 'text-stone-500 dark:text-stone-400'}>
    <rect x="3" y="3" width="7" height="7" rx="1.5" />
    <rect x="14" y="3" width="7" height="7" rx="1.5" />
    <rect x="14" y="14" width="7" height="7" rx="1.5" />
    <rect x="3" y="14" width="7" height="7" rx="1.5" />
  </svg>
);

const OrdersIcon = ({ active }: { active: boolean }) => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" className={active ? 'text-stone-950' : 'text-stone-500 dark:text-stone-400'}>
    <path d="M21 8L12 3L3 8V16L12 21L21 16V8Z" />
    <path d="M3 8L12 13L21 8" />
    <path d="M12 13V21" />
  </svg>
);

const DownloadsIcon = ({ active }: { active: boolean }) => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" className={active ? 'text-stone-950' : 'text-stone-500 dark:text-stone-400'}>
    <path d="M21 15V19A2 2 0 0 1 19 21H5A2 2 0 0 1 3 19V15" />
    <polyline points="7 10 12 15 17 10" />
    <line x1="12" y1="15" x2="12" y2="3" />
  </svg>
);

const AddressesIcon = ({ active }: { active: boolean }) => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" className={active ? 'text-stone-950' : 'text-stone-500 dark:text-stone-400'}>
    <path d="M21 10C21 17 12 23 12 23C12 23 3 17 3 10A9 9 0 1 1 21 10Z" />
    <circle cx="12" cy="10" r="3" />
  </svg>
);

const AccountDetailsIcon = ({ active }: { active: boolean }) => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" className={active ? 'text-stone-950' : 'text-stone-500 dark:text-stone-400'}>
    <path d="M20 21V19A4 4 0 0 0 16 15H8A4 4 0 0 0 4 19V21" />
    <circle cx="12" cy="7" r="4" />
  </svg>
);

const LogoutIcon = ({ active }: { active: boolean }) => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" className="text-red-500">
    <path d="M9 21H5A2 2 0 0 1 3 19V5A2 2 0 0 1 5 3H9" />
    <polyline points="16 17 21 12 16 7" />
    <line x1="21" y1="12" x2="9" y2="12" />
  </svg>
);

const TABS: TabItem[] = [
  { id: 'dashboard', label: 'Dashboard', renderIcon: (a) => <DashboardIcon active={a} /> },
  { id: 'orders', label: 'Orders', renderIcon: (a) => <OrdersIcon active={a} /> },
  { id: 'downloads', label: 'Downloads', renderIcon: (a) => <DownloadsIcon active={a} /> },
  { id: 'addresses', label: 'Addresses', renderIcon: (a) => <AddressesIcon active={a} /> },
  { id: 'account-details', label: 'Account details', renderIcon: (a) => <AccountDetailsIcon active={a} /> },
  { id: 'logout', label: 'Log out', renderIcon: (a) => <LogoutIcon active={a} /> },
];

export default function AccountDashboardApp() {
  const [activeTab, setActiveTab] = useState<TabType>('dashboard');
  const [user, setUser] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  // Form states for Account details edit
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [saveSuccess, setSaveSuccess] = useState<string | null>(null);

  useEffect(() => {
    const currentUser = getUser();
    if (!currentUser) {
      router.push('/login');
    } else {
      setUser(currentUser);
      setFirstName(currentUser.firstName || 'Jan');
      setLastName(currentUser.lastName || 'Kowalski');
      setEmail(currentUser.email || 'tester@sylvaventis.com');
      setLoading(false);
    }
  }, [router]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <LoadingSpinner />
      </div>
    );
  }

  const displayName = firstName || user?.name || user?.username || 'Jan';

  const handleSaveAccountDetails = (e: React.FormEvent) => {
    e.preventDefault();
    const updatedUser = {
      ...user,
      firstName,
      lastName,
      email,
    };
    setUser(updatedUser);
    if (typeof window !== 'undefined') {
      localStorage.setItem('sylva_user', JSON.stringify(updatedUser));
    }
    setSaveSuccess('Account details updated successfully!');
    setTimeout(() => setSaveSuccess(null), 4000);
  };

  const handleTabClick = (tabId: TabType) => {
    if (tabId === 'logout') {
      if (confirm('Are you sure you want to log out?')) {
        logout();
      }
      return;
    }
    setActiveTab(tabId);
  };

  return (
    <div className="max-w-7xl mx-auto w-full space-y-10">
      {/* Header Banner */}
      <header className="rounded-3xl p-8 md:p-10 border border-stone-200 dark:border-stone-800/80 bg-stone-50/50 dark:bg-stone-900/50 backdrop-blur-md shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <span className="text-[10px] uppercase tracking-[0.35em] text-amber-400 font-mono font-bold block mb-2">
            My Sanctuary · Customer Portal
          </span>
          <h1 className="text-3xl md:text-5xl font-serif font-bold text-stone-900 dark:text-stone-100">
            Welcome, <em className="italic text-amber-400 font-serif">{displayName}</em>
          </h1>
          <p className="text-stone-500 dark:text-stone-400 text-xs font-mono mt-1">
            {email}
          </p>
        </div>

        <button
          onClick={() => logout()}
          className="self-start md:self-auto px-6 py-2.5 rounded-full border border-red-500/30 text-red-500 hover:bg-red-500 hover:text-white transition-all text-xs font-mono font-bold uppercase tracking-widest flex items-center gap-2"
        >
          <LogoutIcon active={false} />
          Log out
        </button>
      </header>

      {/* Main Tabbed Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Sidebar Tabs Navigation */}
        <aside className="lg:col-span-1">
          <nav className="rounded-3xl border border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-900/90 p-3 shadow-md space-y-1.5">
            {TABS.map((tab) => {
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => handleTabClick(tab.id)}
                  className={`w-full flex items-center justify-between px-5 py-3.5 rounded-2xl text-xs font-mono uppercase tracking-widest font-bold transition-all text-left group ${
                    isActive
                      ? 'bg-amber-400 text-stone-950 shadow-md'
                      : 'text-stone-600 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-800/60 hover:text-amber-400'
                  }`}
                >
                  <span className="flex items-center gap-3">
                    {tab.renderIcon(isActive)}
                    {tab.label}
                  </span>
                  {isActive && <span className="text-stone-950 font-bold">→</span>}
                </button>
              );
            })}
          </nav>
        </aside>

        {/* Content Area */}
        <main className="lg:col-span-3">
          <div className="rounded-3xl border border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-900/90 p-8 md:p-10 shadow-lg min-h-[500px]">
            <AnimatePresence mode="wait">
              {/* TAB 1: DASHBOARD */}
              {activeTab === 'dashboard' && (
                <motion.div
                  key="dashboard"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="space-y-8"
                >
                  <div className="border-b border-stone-200 dark:border-stone-800 pb-6">
                    <h2 className="text-2xl font-serif font-bold text-stone-900 dark:text-stone-100">
                      Dashboard
                    </h2>
                    <p className="text-xs text-stone-500 dark:text-stone-400 font-sans mt-1">
                      From your account dashboard you can view your{' '}
                      <button
                        onClick={() => setActiveTab('orders')}
                        className="text-amber-400 underline hover:text-amber-300 font-semibold"
                      >
                        recent orders
                      </button>
                      , manage your{' '}
                      <button
                        onClick={() => setActiveTab('addresses')}
                        className="text-amber-400 underline hover:text-amber-300 font-semibold"
                      >
                        shipping and billing addresses
                      </button>
                      , and edit your{' '}
                      <button
                        onClick={() => setActiveTab('account-details')}
                        className="text-amber-400 underline hover:text-amber-300 font-semibold"
                      >
                        password and account details
                      </button>
                      .
                    </p>
                  </div>

                  {/* Quick Cards Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div
                      onClick={() => setActiveTab('orders')}
                      className="cursor-pointer rounded-2xl p-6 border border-stone-200 dark:border-stone-800 bg-stone-50/50 dark:bg-stone-800/40 hover:border-amber-400/60 transition-all group"
                    >
                      <div className="mb-4 text-amber-400">
                        <OrdersIcon active={false} />
                      </div>
                      <h3 className="text-base font-serif font-bold text-stone-900 dark:text-stone-100 group-hover:text-amber-400 transition-colors">
                        Orders
                      </h3>
                      <p className="text-xs text-stone-500 dark:text-stone-400 mt-1">
                        View order history and status
                      </p>
                    </div>

                    <div
                      onClick={() => setActiveTab('addresses')}
                      className="cursor-pointer rounded-2xl p-6 border border-stone-200 dark:border-stone-800 bg-stone-50/50 dark:bg-stone-800/40 hover:border-amber-400/60 transition-all group"
                    >
                      <div className="mb-4 text-amber-400">
                        <AddressesIcon active={false} />
                      </div>
                      <h3 className="text-base font-serif font-bold text-stone-900 dark:text-stone-100 group-hover:text-amber-400 transition-colors">
                        Addresses
                      </h3>
                      <p className="text-xs text-stone-500 dark:text-stone-400 mt-1">
                        Manage billing & shipping info
                      </p>
                    </div>

                    <div
                      onClick={() => setActiveTab('account-details')}
                      className="cursor-pointer rounded-2xl p-6 border border-stone-200 dark:border-stone-800 bg-stone-50/50 dark:bg-stone-800/40 hover:border-amber-400/60 transition-all group"
                    >
                      <div className="mb-4 text-amber-400">
                        <AccountDetailsIcon active={false} />
                      </div>
                      <h3 className="text-base font-serif font-bold text-stone-900 dark:text-stone-100 group-hover:text-amber-400 transition-colors">
                        Account details
                      </h3>
                      <p className="text-xs text-stone-500 dark:text-stone-400 mt-1">
                        Edit profile and change password
                      </p>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* TAB 2: ORDERS */}
              {activeTab === 'orders' && (
                <motion.div
                  key="orders"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="space-y-6"
                >
                  <div className="border-b border-stone-200 dark:border-stone-800 pb-6 flex items-center justify-between">
                    <div>
                      <h2 className="text-2xl font-serif font-bold text-stone-900 dark:text-stone-100">
                        Orders
                      </h2>
                      <p className="text-xs text-stone-500 dark:text-stone-400 font-sans mt-1">
                        Your recent purchases and order history
                      </p>
                    </div>
                    <Link
                      href="/categories"
                      className="px-4 py-2 rounded-full bg-amber-400 text-stone-950 font-mono text-xs font-bold uppercase tracking-widest hover:bg-amber-300 transition-colors shadow"
                    >
                      Shop Collection →
                    </Link>
                  </div>

                  <div className="rounded-2xl border border-stone-200 dark:border-stone-800 bg-stone-50/50 dark:bg-stone-800/30 p-12 text-center space-y-4">
                    <div className="flex justify-center text-amber-400 mb-2">
                      <OrdersIcon active={false} />
                    </div>
                    <p className="text-stone-600 dark:text-stone-300 font-sans text-sm">
                      No order has been made yet.
                    </p>
                    <Link
                      href="/categories"
                      className="inline-block text-amber-400 font-mono text-xs uppercase tracking-widest font-bold border-b border-amber-400/40 hover:border-amber-400 pb-0.5"
                    >
                      Browse Products →
                    </Link>
                  </div>
                </motion.div>
              )}

              {/* TAB 3: DOWNLOADS */}
              {activeTab === 'downloads' && (
                <motion.div
                  key="downloads"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="space-y-6"
                >
                  <div className="border-b border-stone-200 dark:border-stone-800 pb-6">
                    <h2 className="text-2xl font-serif font-bold text-stone-900 dark:text-stone-100">
                      Downloads
                    </h2>
                    <p className="text-xs text-stone-500 dark:text-stone-400 font-sans mt-1">
                      Digital files and certificates associated with your purchases
                    </p>
                  </div>

                  <div className="rounded-2xl border border-stone-200 dark:border-stone-800 bg-stone-50/50 dark:bg-stone-800/30 p-12 text-center space-y-4">
                    <div className="flex justify-center text-amber-400 mb-2">
                      <DownloadsIcon active={false} />
                    </div>
                    <p className="text-stone-600 dark:text-stone-300 font-sans text-sm">
                      No downloads available yet.
                    </p>
                    <Link
                      href="/categories"
                      className="inline-block text-amber-400 font-mono text-xs uppercase tracking-widest font-bold border-b border-amber-400/40 hover:border-amber-400 pb-0.5"
                    >
                      Explore Collection →
                    </Link>
                  </div>
                </motion.div>
              )}

              {/* TAB 4: ADDRESSES */}
              {activeTab === 'addresses' && (
                <motion.div
                  key="addresses"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="space-y-6"
                >
                  <div className="border-b border-stone-200 dark:border-stone-800 pb-6">
                    <h2 className="text-2xl font-serif font-bold text-stone-900 dark:text-stone-100">
                      Addresses
                    </h2>
                    <p className="text-xs text-stone-500 dark:text-stone-400 font-sans mt-1">
                      The following addresses will be used on the checkout page by default.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Billing Address Card */}
                    <div className="rounded-2xl border border-stone-200 dark:border-stone-800 bg-stone-50/50 dark:bg-stone-800/30 p-6 space-y-4 flex flex-col justify-between">
                      <div>
                        <div className="flex items-center justify-between mb-3">
                          <h3 className="text-lg font-serif font-bold text-stone-900 dark:text-stone-100 flex items-center gap-2">
                            <AddressesIcon active={false} />
                            Billing Address
                          </h3>
                          <span className="text-xs font-mono text-amber-400 font-bold">Default</span>
                        </div>
                        <div className="text-xs font-sans text-stone-600 dark:text-stone-300 space-y-1">
                          <p className="font-bold text-sm text-stone-900 dark:text-stone-100">
                            {firstName} {lastName}
                          </p>
                          <p>Musterstraße 123</p>
                          <p>10115 Berlin</p>
                          <p>Germany</p>
                        </div>
                      </div>
                      <button className="self-start text-xs font-mono uppercase tracking-widest font-bold text-amber-400 hover:underline pt-2">
                        Edit Billing Address →
                      </button>
                    </div>

                    {/* Shipping Address Card */}
                    <div className="rounded-2xl border border-stone-200 dark:border-stone-800 bg-stone-50/50 dark:bg-stone-800/30 p-6 space-y-4 flex flex-col justify-between">
                      <div>
                        <div className="flex items-center justify-between mb-3">
                          <h3 className="text-lg font-serif font-bold text-stone-900 dark:text-stone-100 flex items-center gap-2">
                            <AddressesIcon active={false} />
                            Shipping Address
                          </h3>
                          <span className="text-xs font-mono text-stone-400">Optional</span>
                        </div>
                        <div className="text-xs font-sans text-stone-600 dark:text-stone-300 space-y-1">
                          <p className="font-bold text-sm text-stone-900 dark:text-stone-100">
                            {firstName} {lastName}
                          </p>
                          <p>Musterstraße 123</p>
                          <p>10115 Berlin</p>
                          <p>Germany</p>
                        </div>
                      </div>
                      <button className="self-start text-xs font-mono uppercase tracking-widest font-bold text-amber-400 hover:underline pt-2">
                        Edit Shipping Address →
                      </button>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* TAB 5: ACCOUNT DETAILS */}
              {activeTab === 'account-details' && (
                <motion.div
                  key="account-details"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="space-y-6"
                >
                  <div className="border-b border-stone-200 dark:border-stone-800 pb-6">
                    <h2 className="text-2xl font-serif font-bold text-stone-900 dark:text-stone-100">
                      Account details
                    </h2>
                    <p className="text-xs text-stone-500 dark:text-stone-400 font-sans mt-1">
                      Update your personal information and password
                    </p>
                  </div>

                  {saveSuccess && (
                    <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-500 text-xs font-mono font-bold">
                      ✓ {saveSuccess}
                    </div>
                  )}

                  <form onSubmit={handleSaveAccountDetails} className="space-y-6 max-w-xl">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="text-[10px] font-mono uppercase tracking-widest font-bold text-stone-500 dark:text-stone-400 block mb-1.5 ml-1">
                          First name *
                        </label>
                        <input
                          type="text"
                          value={firstName}
                          onChange={(e) => setFirstName(e.target.value)}
                          required
                          className="w-full bg-stone-50 dark:bg-stone-800/60 border border-stone-300 dark:border-stone-700 text-stone-900 dark:text-stone-100 text-sm rounded-xl px-4 py-3 focus:outline-none focus:border-amber-400 transition-colors"
                        />
                      </div>

                      <div>
                        <label className="text-[10px] font-mono uppercase tracking-widest font-bold text-stone-500 dark:text-stone-400 block mb-1.5 ml-1">
                          Last name *
                        </label>
                        <input
                          type="text"
                          value={lastName}
                          onChange={(e) => setLastName(e.target.value)}
                          required
                          className="w-full bg-stone-50 dark:bg-stone-800/60 border border-stone-300 dark:border-stone-700 text-stone-900 dark:text-stone-100 text-sm rounded-xl px-4 py-3 focus:outline-none focus:border-amber-400 transition-colors"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="text-[10px] font-mono uppercase tracking-widest font-bold text-stone-500 dark:text-stone-400 block mb-1.5 ml-1">
                        Email address *
                      </label>
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className="w-full bg-stone-50 dark:bg-stone-800/60 border border-stone-300 dark:border-stone-700 text-stone-900 dark:text-stone-100 text-sm rounded-xl px-4 py-3 focus:outline-none focus:border-amber-400 transition-colors font-mono"
                      />
                    </div>

                    <div className="pt-6 border-t border-stone-200 dark:border-stone-800 space-y-4">
                      <h3 className="text-base font-serif font-bold text-stone-900 dark:text-stone-100">
                        Password Change
                      </h3>

                      <div>
                        <label className="text-[10px] font-mono uppercase tracking-widest font-bold text-stone-500 dark:text-stone-400 block mb-1.5 ml-1">
                          Current password (leave blank to leave unchanged)
                        </label>
                        <input
                          type="password"
                          value={currentPassword}
                          onChange={(e) => setCurrentPassword(e.target.value)}
                          placeholder="••••••••"
                          className="w-full bg-stone-50 dark:bg-stone-800/60 border border-stone-300 dark:border-stone-700 text-stone-900 dark:text-stone-100 text-sm rounded-xl px-4 py-3 focus:outline-none focus:border-amber-400 transition-colors"
                        />
                      </div>

                      <div>
                        <label className="text-[10px] font-mono uppercase tracking-widest font-bold text-stone-500 dark:text-stone-400 block mb-1.5 ml-1">
                          New password (leave blank to leave unchanged)
                        </label>
                        <input
                          type="password"
                          value={newPassword}
                          onChange={(e) => setNewPassword(e.target.value)}
                          placeholder="••••••••"
                          className="w-full bg-stone-50 dark:bg-stone-800/60 border border-stone-300 dark:border-stone-700 text-stone-900 dark:text-stone-100 text-sm rounded-xl px-4 py-3 focus:outline-none focus:border-amber-400 transition-colors"
                        />
                      </div>
                    </div>

                    <button
                      type="submit"
                      className="px-8 py-3.5 rounded-full bg-amber-400 text-stone-950 font-mono text-xs font-bold uppercase tracking-widest hover:bg-amber-300 transition-all shadow-md active:scale-95"
                    >
                      Save changes
                    </button>
                  </form>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </main>
      </div>
    </div>
  );
}
