import {Outlet} from 'react-router-dom';
import Header from './Header';
import { Toaster } from 'react-hot-toast';
import {Helmet} from "react-helmet";

const Layout = () => {
 

  return (
    <div>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Tienda</title>                
        <link rel="canonical" href="http://mysite.com/example"/>
        <meta name="description" content="NG" />
      </Helmet>
      <Toaster />
      <Header/>
      <div className='min-h-[1000px] bg-white dark:bg-gray-900'>
     
      <Outlet />

      
      
      </div>
    </div>
  );
}

export default Layout;
