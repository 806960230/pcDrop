import { IOrderTime, TWeek } from '@/utils/types';
import { ProColumns } from '@ant-design/pro-components';
import { Popconfirm, Space } from 'antd';
import i18next from 'i18next';

export interface IDay {
  key: TWeek;
  label: string;
}

export const DAYS: IDay[] = [
  {
    key: 'monday',
    label: '周一',
  },
  {
    key: 'tuesday',
    label: '周二',
  },
  {
    key: 'wednesday',
    label: '周三',
  },
  {
    key: 'thursday',
    label: '周四',
  },
  {
    key: 'friday',
    label: '周五',
  },
  {
    key: 'saturday',
    label: '周六',
  },
  {
    key: 'sunday',
    label: '周日',
  },
];

export const DAYSEN: IDay[] = [
  {
    key: 'monday',
    label: 'monday',
  },
  {
    key: 'tuesday',
    label: 'tuesday',
  },
  {
    key: 'wednesday',
    label: 'wednesday',
  },
  {
    key: 'thursday',
    label: 'thursday',
  },
  {
    key: 'friday',
    label: 'friday',
  },
  {
    key: 'saturday',
    label: 'saturday',
  },
  {
    key: 'sunday',
    label: 'sunday',
  },
];

export const getColumns = (onDeleteHandler: Function): ProColumns[] => [
  {
    title: i18next.t('serial number'),
    dataIndex: 'key',
    width: 100,
    editable: false,
    align: 'center',
  },
  {
    title: i18next.t('startTime'),
    dataIndex: 'startTime',
    valueType: 'time',
    width: 160,
    align: 'center',
  },
  {
    title: i18next.t('endTime'),
    dataIndex: 'endTime',
    valueType: 'time',
    width: 160,
    align: 'center',
  },
  {
    title: i18next.t('operation'),
    valueType: 'option',
    width: 150,
    align: 'center',
    render: (text, record, _, action) => (
      <Space>
        <a
          key="edit"
          onClick={() => {
            action?.startEditable(record.key || '');
          }}
        >
          {i18next.t('edit')}
        </a>
        <Popconfirm
          title={i18next.t('prompt')}
          description={i18next.t('sureDelete')}
          onConfirm={() => onDeleteHandler(record.key)}
        >
          <a
            key="delete"
          >
            {i18next.t('delete')}
          </a>
        </Popconfirm>
      </Space>
    ),
  },
];

export const isWorkDay = (day: string) => ['monday', 'tuesday', 'wednesday', 'thursday', 'friday'].includes(day);

export const getMaxKey = (orderTime: IOrderTime[] | undefined): number => {
  const keys = orderTime?.map((item) => item.key) || [];

  if (keys.length === 0) {
    return 0;
  }
  return Math.max(...keys);
};
