import { useTranslation } from 'next-i18next/pages';
import { serverSideTranslations } from 'next-i18next/pages/serverSideTranslations';
import Layout from '@/components/Layout/Layout.component';
import CartContents from '@/components/Cart/CartContents.component';
import type { NextPage, GetStaticProps } from 'next';

const Cart: NextPage = () => {
  const { t } = useTranslation('common');
  return (
    <Layout title={t('cart')}>
      <CartContents />
    </Layout>
  );
};

export default Cart;

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale ?? 'en', ['common'])),
    },
  };
};
