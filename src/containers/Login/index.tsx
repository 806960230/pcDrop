import {
  GlobalOutlined,
  LockOutlined,
  MobileOutlined,
} from '@ant-design/icons';
import {
  LoginFormPage,
  ProFormCaptcha,
  ProFormCheckbox,
  ProFormText,
} from '@ant-design/pro-components';
import {
  Button,
  Image,
  message, Tabs,
} from 'antd';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { useContext } from 'react';
import { DataContext } from '@/routes';
import { debounce } from 'lodash';
import { AUTH_TOKEN } from '@/utils/constants';
import { LOGIN, SEND_CODE_MSG } from '@/graphql/auth';
import { useTitle } from '@/hooks';
import { useUserContext } from '@/hooks/userHooks';
import { useTranslation } from 'react-i18next';
import styles from './index.module.less';

interface IValue {
  tel: string;
  code: string;
  autoLogin: boolean;
}

export default () => {
  const [run] = useMutation(SEND_CODE_MSG);
  const [login] = useMutation(LOGIN);
  const [params] = useSearchParams();
  const { store } = useUserContext();
  const { setLocale } = useContext(DataContext);
  const { t, i18n } = useTranslation();
  const nav = useNavigate();
  useTitle(t('login'));

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

  const loginHandler = async (values: IValue) => {
    const res = await login({
      variables: values,
    });
    if (res.data.login.code === 200) {
      store.refetchHandler?.();
      if (values.autoLogin) {
        sessionStorage.setItem(AUTH_TOKEN, '');
        localStorage.setItem(AUTH_TOKEN, res.data.login.data);
      } else {
        localStorage.setItem(AUTH_TOKEN, '');
        sessionStorage.setItem(AUTH_TOKEN, res.data.login.data);
      }
      message.success(t('login_success'));
      nav(params.get('orgUrl') || '/');
      return;
    }
    message.error(res.data.login.message);
  };

  return (
    <div className={styles.container}>
      <LoginFormPage
        backgroundImageUrl="https://water-drop-gan.oss-cn-hongkong.aliyuncs.com/images/3.png"
        initialValues={{ tel: '19357227510' }}
        submitter={{ searchConfig: { submitText: t('login') } }}
        onFinish={loginHandler}
      >
        <Image src="https://water-drop-gan.oss-cn-hongkong.aliyuncs.com/images/newfont.png" className={styles.font} preview={false} />
        <Image src="https://water-drop-gan.oss-cn-hongkong.aliyuncs.com/images/read.jpg" className={styles.logo} preview={false} />
        <Tabs
          centered
          items={[{
            key: 'phone',
            label: t('Phone_number_login'),
          }]}
        />
        <>
          <ProFormText
            fieldProps={{
              size: 'large',
              prefix: <MobileOutlined className="prefixIcon" />,
            }}
            name="tel"
            placeholder={t('Phone_number_login')}
            rules={[
              {
                required: true,
                message: t('InputPhoneNumber'),
              },
              {
                pattern: /^1\d{10}$/,
                message: t('PhoneNumberFormatError'),
              },
            ]}
          />
          <ProFormCaptcha
            fieldProps={{
              size: 'large',
              prefix: <LockOutlined className="prefixIcon" />,
            }}
            captchaProps={{
              size: 'large',
            }}
            placeholder={t('InputVerificationCode')}
            captchaTextRender={(timing, count) => {
              if (timing) {
                return `${count} ${t('Get_verification_code')}`;
              }
              return t('Get_verification_code');
            }}
            phoneName="tel"
            name="code"
            rules={[
              {
                required: true,
                message: t('InputVerificationCode'),
              },
            ]}
            onGetCaptcha={async (tel: string) => {
              const res = await run({
                variables: {
                  tel,
                },
              });
              if (res.data.sendCodeMsg.code === 200) {
                // res.data.sendCodeMsg.message
                message.success(t('sendCodeOk'));
              } else {
                // res.data.sendCodeMsg.message
                message.error(t('sendCodeFail'));
              }
            }}
          />
        </>
        <div
          style={{
            marginBlockEnd: 24,
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <ProFormCheckbox noStyle name="autoLogin">
            {t('auto_login')}
            (
            {t('Universal verification code')}
            )
            1024
          </ProFormCheckbox>
          <Button onClick={debouncedAction} style={{ margin: '0 auto', backgroundColor: '#ff8000', color: 'white' }}><GlobalOutlined /></Button>
        </div>
      </LoginFormPage>
    </div>
  );
};
