import ReactDOM from 'react-dom/client';
import Application from './application';
import { ConfigProvider } from '@arco-design/web-react';
import enUS from '@arco-design/web-react/es/locale/en-US';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(<ConfigProvider locale={enUS}><Application /></ConfigProvider>);