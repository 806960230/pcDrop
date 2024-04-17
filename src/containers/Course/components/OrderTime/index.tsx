import { useContext, useState } from 'react';
import {
  Button, Col, Drawer, Row, Space, Tabs,
} from 'antd';
import { EditableProTable } from '@ant-design/pro-components';
import { ChromeOutlined, RedoOutlined } from '@ant-design/icons';
import _ from 'lodash';
import { IOrderTime } from '@/utils/types';
import { useTranslation } from 'react-i18next';
import { DataContext } from '@/routes';
import {
  DAYS, DAYSEN, IDay, getColumns, getMaxKey, isWorkDay,
} from './constants';
import { useOrderTime } from './hooks';
import style from './index.module.less';

interface IProps {
  id: string;
  onClose: (isReload?: boolean) => void;
}
/**
* 可约时间
*/
const OrderTime = ({
  onClose,
  id,
}: IProps) => {
  const { t } = useTranslation();
  const { locale } = useContext(DataContext);
  const [currentDay, setCurrentDay] = useState<IDay>(locale === 'en' ? DAYSEN[0] : DAYS[0]);
  const onTabChangeHandler = (key: string) => {
    let current;
    if (locale === 'en') {
      current = DAYSEN.find((item) => item.key === key) as IDay;
    } else {
      current = DAYS.find((item) => item.key === key) as IDay;
    }
    setCurrentDay(current);
  };
  const {
    orderTime,
    loading,
    onDeleteHandler,
    onSaveHandler,
    allWeekSyncHandler,
    allWorkDaySyncHandler,
  } = useOrderTime(id, currentDay.key);

  // useEffect(() => {
  // }, [locale])

  return (
    <Drawer
      title={t('editReserveTime')}
      width={720}
      open
      onClose={() => onClose()}
    >
      <Tabs
        type="card"
        items={locale === 'en' ? DAYSEN : DAYS}
        onChange={onTabChangeHandler}
      />
      <EditableProTable<IOrderTime>
        headerTitle={(
          <Space>
            {t('choose')}
            <span className={style.name}>
              {currentDay.label}
            </span>
            {t('reserveTime')}
          </Space>
        )}
        loading={loading}
        rowKey="key"
        recordCreatorProps={{
          record: () => ({
            key: getMaxKey(orderTime) + 1,
            startTime: '12:00:00',
            endTime: '12:30:00',
          }),
        }}
        value={orderTime}
        columns={getColumns(onDeleteHandler)}
        editable={{
          onSave: async (rowKey, d) => {
            let newData = [];
            if (orderTime.findIndex((item) => item.key === rowKey) > -1) {
              newData = orderTime?.map((item) => (item.key === rowKey ? _.omit(d, 'index') : { ...item }));
            }
            newData = [...orderTime, _.omit(d, 'index')];
            onSaveHandler(newData);
          },
          onDelete: async (key) => {
            onDeleteHandler(key as number);
          },
        }}
      />
      <Row gutter={20} className={style.buttons}>
        <Col span={12}>
          <Button
            icon={<RedoOutlined />}
            style={{ width: '100%' }}
            type="primary"
            disabled={!isWorkDay(currentDay.key)}
            onClick={allWorkDaySyncHandler}
          >
            {t('Synchronize weekdays')}
          </Button>
        </Col>
        <Col span={12}>
          <Button
            icon={<ChromeOutlined />}
            style={{ width: '100%' }}
            type="primary"
            danger
            onClick={allWeekSyncHandler}
          >
            {t('Synchronize week')}
          </Button>
        </Col>
      </Row>
    </Drawer>
  );
};

export default OrderTime;
