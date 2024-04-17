import { Button, Result } from 'antd';
import { useTranslation } from 'react-i18next';
/**
* 404
*/
const Page404 = () => {
  const { t } = useTranslation();
  return (
    <Result
      status="404"
      title="404"
      subTitle={t('noVisit')}
      extra={<Button type="primary" href="/">{t('back')}</Button>}
    />
  );
};

export default Page404;
