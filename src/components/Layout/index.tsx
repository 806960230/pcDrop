import { MenuDataItem, ProLayout } from '@ant-design/pro-components';
import { useContext, useEffect } from 'react';
import { Link, useNavigate, useOutlet } from 'react-router-dom';
import { useUserContext } from '@/hooks/userHooks';
import { useTranslation } from 'react-i18next';
import { AUTH_TOKEN } from '@/utils/constants';
import { ROUTE_KEY, routes, routesEn } from '@/routes/menus';
import { useGoTo, useIsOrgRoute } from '@/hooks';
import { Space, Tooltip } from 'antd';
import { LogoutOutlined, ShopOutlined } from '@ant-design/icons';
import { DataContext } from '../../routes';
import OrgSelect from '../OrgSelect';
import style from './index.module.less';

type Func = (...args: any[]) => void;
function debounce(fn: Func, wait: number): Func {
  let timeout: NodeJS.Timeout | null = null;
  // 返回一个新的函数
  return function (this: any, ...args: any[]) {
    if (timeout !== null) {
      clearTimeout(timeout);
    }
    timeout = setTimeout(() => {
      fn.apply(this, args);
    }, wait);
  };
}

const menuItemRender = (
  item: MenuDataItem,
  dom: React.ReactNode,
) => <Link to={item.path || '/'}>{dom}</Link>;
/**
* 外层框架
*/
const Layout = () => {
  const { t, i18n } = useTranslation();
  const outlet = useOutlet();
  const { store } = useUserContext();
  const isOrg = useIsOrgRoute();
  const { go } = useGoTo();
  const nav = useNavigate();
  const { locale, setLocale } = useContext(DataContext);
  const logoutHandler = () => {
    sessionStorage.setItem(AUTH_TOKEN, '');
    localStorage.setItem(AUTH_TOKEN, '');
    nav('/login');
  };
  const changeLan = () => {
    let language;
    if (!localStorage.getItem('i18nextLng') || localStorage.getItem('i18nextLng') === 'en') {
      localStorage.setItem('i18nextLng', 'ch');
      language = 'ch';
    } else {
      localStorage.setItem('i18nextLng', 'en');
      language = 'en';
      setLocale(language);
    }
    i18n.changeLanguage(language);
    setLocale(language);
  };
  const debouncedAction = debounce(changeLan, 250);
  const goToOrg = () => {
    go(ROUTE_KEY.ORG);
  };

  useEffect(() => {
  }, [locale]);

  return (
    <ProLayout
      layout="mix"
      siderWidth={220}
      avatarProps={{
        src: store.avatar || null,
        title: store.name,
        size: 'small',
        onClick: () => go(ROUTE_KEY.MY),
      }}
      links={[
        <Space size={20} onClick={debouncedAction}>
          <img src="https://water-drop-gan.oss-cn-hongkong.aliyuncs.com/images/lan.png" alt="logo" className={style.language} />
          <span className={style.languageText}>{t('change language')}</span>
        </Space>,
        <Space size={20} onClick={logoutHandler}>
          <LogoutOutlined />
          {t('logout')}
        </Space>,
      ]}
      title="Enjoy Course"
      logo={<img src="https://water-drop-gan.oss-cn-hongkong.aliyuncs.com/images/fox.png" alt="logo" />}
      className={style.container}
      onMenuHeaderClick={() => nav('/')}
      route={{
        path: '/',
        routes: locale === 'en' ? routesEn : routes,
      }}
      actionsRender={() => [
        !isOrg && <OrgSelect />,
        <Tooltip title={t('store management')}>
          <ShopOutlined onClick={goToOrg} />
        </Tooltip>,
      ]}
      menuItemRender={menuItemRender}
    >
      <div key={store.currentOrg}>
        {outlet}
      </div>
    </ProLayout>
  );
};

export default Layout;
