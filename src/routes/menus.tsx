import {
  GiftOutlined,
  HomeOutlined, IdcardOutlined,
  PicRightOutlined, ShopOutlined,
  TeamOutlined,
} from '@ant-design/icons';
// import i18next from 'i18next';

interface IRoute {
  path: string;
  name: string;
  icon?: React.ReactNode;
  hideInMenu?: boolean;
}

export const ROUTE_KEY = {
  HOME: 'home',
  MY: 'my',
  ORG: 'org',
  COURSE: 'course',
  STUDENT: 'student',
  PRODUCT: 'product',
  TEACHER: 'teacher',
  NO_ORG: 'noOrg',
  PAGE_404: 'p404',
};

// export const ROUTE_CONFIG: Record<string, IRoute> = {
//   [ROUTE_KEY.HOME]: {
//     path: '/',
//     name: i18next.t('home'),
//     hideInMenu: true,
//     icon: <HomeOutlined />,
//   },
//   [ROUTE_KEY.MY]: {
//     path: 'my',
//     name: i18next.t('my information'),
//     hideInMenu: true,
//     icon: <HomeOutlined />,
//   },
//   [ROUTE_KEY.ORG]: {
//     path: 'org',
//     name: i18next.t('storeManagement'),
//     hideInMenu: true,
//     icon: <ShopOutlined />,
//   },
//   [ROUTE_KEY.COURSE]: {
//     path: 'course',
//     name: i18next.t('courseManagement'),
//     icon: <PicRightOutlined />,
//   },
//   [ROUTE_KEY.NO_ORG]: {
//     path: 'noOrg',
//     name: i18next.t('noOrg'),
//     hideInMenu: true,
//   },
//   [ROUTE_KEY.STUDENT]: {
//     path: 'student',
//     name: i18next.t('studentManagement'),
//     icon: <TeamOutlined />,
//   },
//   [ROUTE_KEY.PRODUCT]: {
//     path: 'product',
//     name: i18next.t('productManagement'),
//     icon: <GiftOutlined />,
//   },
//   [ROUTE_KEY.TEACHER]: {
//     path: 'teacher',
//     name: i18next.t('teacherManagement'),
//     icon: <IdcardOutlined />,
//   },
//   [ROUTE_KEY.PAGE_404]:
//   {
//     path: '*',
//     hideInMenu: true,
//     name: '404',
//   },
// };
// export const ROUTE_CONFIG: Record<string, IRoute> = {
//   [ROUTE_KEY.HOME]: {
//     path: '/',
//     name: '首页',
//     hideInMenu: true,
//     icon: <HomeOutlined />,
//   },
//   [ROUTE_KEY.MY]: {
//     path: 'my',
//     name: '个人信息',
//     hideInMenu: true,
//     icon: <HomeOutlined />,
//   },
//   [ROUTE_KEY.ORG]: {
//     path: 'org',
//     name: '门店管理',
//     hideInMenu: true,
//     icon: <ShopOutlined />,
//   },
//   [ROUTE_KEY.COURSE]: {
//     path: 'course',
//     name: '课程管理',
//     icon: <PicRightOutlined />,
//   },
//   [ROUTE_KEY.NO_ORG]: {
//     path: 'noOrg',
//     name: '选择门店提示',
//     hideInMenu: true,
//   },
//   [ROUTE_KEY.STUDENT]: {
//     path: 'student',
//     name: '学员管理',
//     icon: <TeamOutlined />,
//   },
//   [ROUTE_KEY.PRODUCT]: {
//     path: 'product',
//     name: '商品管理',
//     icon: <GiftOutlined />,
//   },
//   [ROUTE_KEY.TEACHER]: {
//     path: 'teacher',
//     name: '教师管理',
//     icon: <IdcardOutlined />,
//   },
//   [ROUTE_KEY.PAGE_404]:
//   {
//     path: '*',
//     hideInMenu: true,
//     name: '404',
//   },
// };

export const ROUTE_CONFIG: Record<string, IRoute> = {
  [ROUTE_KEY.HOME]: {
    path: '/',
    name: '首页',
    hideInMenu: true,
    icon: <HomeOutlined />,
  },
  [ROUTE_KEY.MY]: {
    path: 'my',
    name: '个人信息',
    hideInMenu: true,
    icon: <HomeOutlined />,
  },
  [ROUTE_KEY.ORG]: {
    path: 'org',
    name: '门店管理',
    hideInMenu: true,
    icon: <ShopOutlined />,
  },
  [ROUTE_KEY.COURSE]: {
    path: 'course',
    name: '课程管理',
    icon: <PicRightOutlined />,
  },
  [ROUTE_KEY.NO_ORG]: {
    path: 'noOrg',
    name: '选择门店提示',
    hideInMenu: true,
  },
  [ROUTE_KEY.STUDENT]: {
    path: 'student',
    name: '学生管理',
    icon: <TeamOutlined />,
  },
  [ROUTE_KEY.PRODUCT]: {
    path: 'product',
    name: '商品管理',
    icon: <GiftOutlined />,
  },
  [ROUTE_KEY.TEACHER]: {
    path: 'teacher',
    name: '教师管理',
    icon: <IdcardOutlined />,
  },
  [ROUTE_KEY.PAGE_404]:
  {
    path: '*',
    hideInMenu: true,
    name: '404',
  },
};

export const ROUTE_CONFIG_EN: Record<string, IRoute> = {
  [ROUTE_KEY.HOME]: {
    path: '/',
    name: 'Home',
    hideInMenu: true,
    icon: <HomeOutlined />,
  },
  [ROUTE_KEY.MY]: {
    path: 'my',
    name: 'My Info',
    hideInMenu: true,
    icon: <HomeOutlined />,
  },
  [ROUTE_KEY.ORG]: {
    path: 'org',
    name: 'Store Management',
    hideInMenu: true,
    icon: <ShopOutlined />,
  },
  [ROUTE_KEY.COURSE]: {
    path: 'course',
    name: 'Course Management',
    icon: <PicRightOutlined />,
  },
  [ROUTE_KEY.NO_ORG]: {
    path: 'noOrg',
    name: 'No Org',
    hideInMenu: true,
  },
  [ROUTE_KEY.STUDENT]: {
    path: 'student',
    name: 'Student Management',
    icon: <TeamOutlined />,
  },
  [ROUTE_KEY.PRODUCT]: {
    path: 'product',
    name: 'Product Management',
    icon: <GiftOutlined />,
  },
  [ROUTE_KEY.TEACHER]: {
    path: 'teacher',
    name: 'Teacher Management',
    icon: <IdcardOutlined />,
  },
  [ROUTE_KEY.PAGE_404]:
  {
    path: '*',
    hideInMenu: true,
    name: '404',
  },
};

export const routes = Object.keys(ROUTE_CONFIG).map((key) => ({ ...ROUTE_CONFIG[key], key }));
export const routesEn = Object.keys(ROUTE_CONFIG_EN).map(
  (key) => ({ ...ROUTE_CONFIG_EN[key], key }),
);
export const getRouteByKey = (key: string) => ROUTE_CONFIG[key];
