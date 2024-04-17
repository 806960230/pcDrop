import { useUserContext } from '@/hooks/userHooks';
import { PageContainer } from '@ant-design/pro-components';
import { useOrganization } from '@/services/org';
import {
  Button, Calendar, Card, Col, DatePicker, Row, message,
} from 'antd';
import { useState } from 'react';
import dayjs, { Dayjs } from 'dayjs';
import { useTranslation } from 'react-i18next';
import { DAY_FORMAT } from '@/utils/constants';
import { useAutoCreateSchedule } from '@/services/dashboard';
import style from './index.module.less';
import Schedule from './components/Schedule';

const { RangePicker } = DatePicker;

/**
*
*/
const Home = () => {
  const [range, setRange] = useState<[string, string]>(['', '']);
  const { store } = useUserContext();
  const { data: org } = useOrganization(store.currentOrg || '');
  const [run, loading] = useAutoCreateSchedule();
  const [day, setDay] = useState<string>(dayjs().format(DAY_FORMAT));
  const { t } = useTranslation();
  if (!org) {
    return null;
  }

  const startScheduleHandler = () => {
    if (!range[0]) {
      message.error(`${t('chooseTimeRange')}`);
      return;
    }
    run(...range);
  };

  const onRangeChangeHandler = (days: [Dayjs | null, Dayjs | null] | null) => {
    if (!days || !days[0] || !days[1]) {
      return;
    }
    setRange([days[0].format(DAY_FORMAT), days[1].format(DAY_FORMAT)]);
  };
  return (
    <div className={style.container}>
      <PageContainer
        content={org.address}
        header={{
          title: org.name,
        }}
      >
        <Row gutter={20}>
          <Col flex="auto">
            <Card
              title={`${day} ${t('classes')}`}
              className={style.container}
              extra={
            (
              <span>
                <RangePicker onChange={(days) => onRangeChangeHandler(days)} />
                <Button
                  loading={loading}
                  type="link"
                  onClick={startScheduleHandler}
                >
                  {t('startSchedule')}
                </Button>
              </span>
            )
          }
            >
              <Schedule day={day} />
            </Card>
          </Col>
          <Col flex="310px">
            <Calendar
              fullscreen={false}
              onChange={(d) => setDay(d.format(DAY_FORMAT))}
            />
          </Col>
        </Row>
      </PageContainer>
    </div>
  );
};

export default Home;
