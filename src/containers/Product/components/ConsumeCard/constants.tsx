import { CARD_TYPE } from '@/utils/constants';
import { ProColumns } from '@ant-design/pro-components';
import { Popconfirm, Space } from 'antd';
import i18next from 'i18next';

export const getColumns = (onDeleteHandler: Function): ProColumns[] => [
  {
    title: i18next.t('serial number'),
    dataIndex: 'key',
    width: 50,
    editable: false,
    align: 'center',
    render: (d, r, index) => index + 1,
  },
  {
    title: i18next.t('name'),
    dataIndex: 'name',
    align: 'center',
  },
  {
    title: i18next.t('validityDay'),
    dataIndex: 'validityDay',
    valueType: 'digit',
    width: 110,
    align: 'center',
  },
  {
    title: i18next.t('kind'),
    dataIndex: 'type',
    valueType: 'select',
    width: 120,
    align: 'center',
    request: async () => [
      {
        value: CARD_TYPE.TIME,
        label: i18next.t('times card'),
      },
      {
        value: CARD_TYPE.DURATION,
        label: i18next.t('clock card'),
      },
    ],
  },
  {
    title: i18next.t('times'),
    dataIndex: 'time',
    valueType: 'digit',
    width: 100,
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
            action?.startEditable(record.id || '');
          }}
        >
          {i18next.t('edit')}
        </a>
        <Popconfirm
          title={i18next.t('prompt')}
          description={i18next.t('sureDelete')}
          onConfirm={() => onDeleteHandler(record.id)}
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
