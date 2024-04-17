import ReactDOM from 'react-dom/client';
import { useEffect, useState } from 'react';
import { ApolloProvider } from '@apollo/client';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { ConfigProvider } from 'antd';
import zh_CN from 'antd/locale/zh_CN';
import en_US from 'antd/es/locale/en_US';
import { client } from './utils/apollo';
import { routes } from './routes/menus';
import UserInfo from './components/UserInfo';
import Layout from './components/Layout';
import Login from './containers/Login';
import { DataContext, ROUTE_COMPONENT } from './routes';
import 'dayjs/locale/zh-cn';
import './index.css';
import './utils/i18n';

type ThemeData = {
  borderRadius: number;
  colorPrimary: string;
  colorBgContainer: string,
  Button?: {
    colorPrimary: string;
    algorithm?: boolean;
  };
};

const defaultData: ThemeData = {
  borderRadius: 6,
  colorPrimary: '#ff8000',
  colorBgContainer: '#ffffff',
  Button: {
    colorPrimary: '#ff8000',
  },
};
const App = () => {
  const [locale, setLocale] = useState('en');
  const [data] = useState<ThemeData>(defaultData);
  useEffect(() => {
    localStorage.setItem('i18nextLng', locale);
  }, [locale]);

  return (
    <DataContext.Provider value={{ locale, setLocale }}>
      <div>
        <ApolloProvider client={client}>
          <ConfigProvider
            locale={localStorage.getItem('i18nextLng') === 'en' ? en_US : zh_CN}
            theme={{
              token: {
                colorPrimary: data.colorPrimary,
                borderRadius: data.borderRadius,
                colorBgContainer: data.colorBgContainer,
              },
              components: {
                Button: {
                  colorPrimary: data.Button?.colorPrimary,
                },
              },
            }}
          >
            <BrowserRouter>
              <UserInfo>
                <Routes>
                  <Route path="/login" element={<Login />} />
                  <Route path="/" element={<Layout />}>
                    {routes.map((item) => {
                      const Component = ROUTE_COMPONENT[item.key];
                      return (
                        <Route
                          path={item.path}
                          key={item.key}
                          element={<Component />}
                        />
                      );
                    })}
                  </Route>
                </Routes>
              </UserInfo>
            </BrowserRouter>
          </ConfigProvider>
        </ApolloProvider>
      </div>
    </DataContext.Provider>
  );
};

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(<App />);
