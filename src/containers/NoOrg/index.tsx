import { useGoTo } from '@/hooks';
import { useUserContext } from '@/hooks/userHooks';
import { Button, Image, Result } from 'antd';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

/**
* 请选择门店
*/
const NoOrg = () => {
  const { store } = useUserContext();
  const { go } = useGoTo();
  const { t } = useTranslation();
  useEffect(() => {
    if (store.currentOrg) {
      go();
    }
  }, [store.currentOrg]);

  return (
    <Result
      icon={<Image src="https://water-drop-gan.oss-cn-hongkong.aliyuncs.com/images/cry2.png" preview={false} width={400} />}
      title={t('choose store')}
      subTitle={t('filter')}
      extra={<Button type="primary" href="/">{t('back')}</Button>}
    />
  );
};

export default NoOrg;
