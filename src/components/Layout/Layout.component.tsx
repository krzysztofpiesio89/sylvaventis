// Imports
import { ReactNode } from 'react';

// Components
import Header from '@/components/Header/Header.component';
import PageTitle from './PageTitle.component';
import Footer from '@/components/Footer/Footer.component';
import Stickynav from '@/components/Footer/Stickynav.component';

interface ILayoutProps {
  children?: ReactNode;
  title: string;
}

/**
 * Renders layout for each page. Also passes along the title to the Header component.
 * @function Layout
 * @param {ReactNode} children - Children to be rendered by Layout component
 * @param {TTitle} title - Title for the page. Is set in <title>{title}</title>
 * @returns {JSX.Element} - Rendered component
 */

const Layout = ({ children, title }: ILayoutProps) => {
  return (
    <div className="flex flex-col min-h-screen w-full mx-auto bg-surface pt-40 lg:pt-56">
      <Header title={title} />
      {['Hjem', 'Home', 'Zuhause'].includes(title) ? (
        <div className="flex-1 px-4 md:px-0 mt-8">{children}</div>
      ) : (
        <div className="container mx-auto px-6 flex-1 mt-20">
          <PageTitle title={title} />
          <div className="mt-12">{children}</div>
        </div>
      )}
      <div className="mt-auto">
        <Footer />
        <Stickynav />
      </div>
    </div>
  );
};

export default Layout;
