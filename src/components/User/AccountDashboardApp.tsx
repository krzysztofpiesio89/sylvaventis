'use client';

import { useQuery } from '@apollo/client';
import { GET_CURRENT_USER, GET_CUSTOMER_ORDERS } from '@/utils/gql/GQL_QUERIES';
import LoadingSpinner from '../LoadingSpinner/LoadingSpinner.component';
import { logout } from '@/utils/auth';
import { motion } from 'motion/react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

const AccountDashboardApp = () => {
  const { loading: userLoading, data: userData, error: userError } = useQuery(GET_CURRENT_USER);
  const { loading: ordersLoading, data: ordersData } = useQuery(GET_CUSTOMER_ORDERS);
  const router = useRouter();

  useEffect(() => {
    if (!userLoading && (!userData?.customer || userError)) {
      router.push('/login');
    }
  }, [userLoading, userData, userError, router]);

  if (userLoading || ordersLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <LoadingSpinner />
      </div>
    );
  }

  const user = userData?.customer;
  const orders = ordersData?.customer?.orders?.nodes || [];

  return (
    <div className="max-w-6xl mx-auto w-full space-y-12">
      {/* Header Section */}
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-8 border-b border-white/5 pb-12">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
        >
          <p className="text-accent-gold text-[10px] uppercase tracking-[0.4em] mb-4">Account Dashboard</p>
          <h1 className="text-5xl md:text-7xl font-light tracking-tighter">
            Welcome, <em className="italic text-accent-gold">{user?.firstName || 'Seeker'}</em>
          </h1>
          <p className="text-text-muted mt-4 font-light">{user?.email}</p>
        </motion.div>

        <motion.button 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          onClick={() => logout()}
          className="self-start md:self-end px-8 py-3 border border-error/30 text-error text-[10px] uppercase tracking-widest rounded-full hover:bg-error hover:text-white transition-all"
        >
          Disconnect
        </motion.button>
      </header>

      <div className="grid lg:grid-cols-3 gap-12">
        {/* Main Content - Orders */}
        <div className="lg:col-span-2 space-y-8">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-light tracking-tight">Order History</h2>
            <span className="text-[10px] uppercase tracking-widest text-white/30">{orders.length} Records</span>
          </div>

          {orders.length > 0 ? (
            <div className="space-y-4">
              {orders.map((order: any, i: number) => (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                  key={order.id}
                  className="glass p-6 rounded-2xl border border-white/5 flex items-center justify-between group hover:border-accent-gold/30 transition-colors"
                >
                  <div className="space-y-1">
                    <p className="text-[10px] uppercase tracking-widest text-white/30">Order #{order.orderNumber}</p>
                    <p className="text-lg font-light" suppressHydrationWarning>
                      {new Date(order.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                    </p>
                  </div>

                  <div className="text-right space-y-1">
                    <p className="text-accent-gold font-medium">{order.total}</p>
                    <p className={`text-[9px] uppercase tracking-widest px-2 py-0.5 rounded-full border inline-block ${
                      order.status === 'COMPLETED' ? 'border-success/30 text-success bg-success/5' : 'border-white/10 text-white/40'
                    }`}>
                      {order.status}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="glass p-12 rounded-3xl border border-white/5 text-center">
              <p className="text-text-muted font-light">No artifacts have been dispatched to your location yet.</p>
              <Link href="/products" className="inline-block mt-6 text-accent-gold text-[10px] uppercase tracking-widest border-b border-accent-gold/30 pb-1">
                Explore Collection
              </Link>
            </div>
          )}
        </div>

        {/* Sidebar - Profile & Help */}
        <aside className="space-y-8">
          <div className="glass p-8 rounded-3xl border border-white/5 space-y-6">
            <h3 className="text-lg font-light">Personal Details</h3>
            <div className="space-y-4">
              <div className="space-y-1">
                <p className="text-[9px] uppercase tracking-widest text-white/20">Full Name</p>
                <p className="text-sm text-white/80">{user?.firstName} {user?.lastName}</p>
              </div>
              <div className="space-y-1">
                <p className="text-[9px] uppercase tracking-widest text-white/20">Email Address</p>
                <p className="text-sm text-white/80">{user?.email}</p>
              </div>
            </div>
            <button className="w-full py-3 border border-white/5 rounded-xl text-[10px] uppercase tracking-widest text-white/40 hover:text-white hover:border-white/20 transition-all">
              Update Profile
            </button>
          </div>

          <div className="glass p-8 rounded-3xl border border-white/5 bg-accent-gold/5 space-y-4">
            <h3 className="text-lg font-light text-accent-gold">Need Assistance?</h3>
            <p className="text-xs text-text-muted leading-relaxed">
              Our guides are available to assist with your journey. Contact us for any inquiries regarding your orders or botanical knowledge.
            </p>
            <Link href="/contact" className="block text-center py-3 bg-accent-gold text-obsidian font-bold rounded-xl text-[10px] uppercase tracking-widest transition-transform hover:scale-[1.02]">
              Support Portal
            </Link>
          </div>
        </aside>
      </div>
    </div>
  );
};

export default AccountDashboardApp;
