import { ICourse } from '@/utils/types';
import { ProColumns } from '@ant-design/pro-components';
import { Button, Space } from 'antd';
import i18next from 'i18next';

interface IProps {
  onEditHandler: (id: string) => void
  onOrderTimeHandler: (id: string) => void
  onCardHandler: (id: string) => void
}

export const getColumns: ({
  onEditHandler,
  onOrderTimeHandler,
  onCardHandler,
}: IProps) => ProColumns<ICourse, 'text'>[] = ({
  onEditHandler,
  onOrderTimeHandler,
  onCardHandler,
}) => [
  {
    title: i18next.t('courseTitle'),
    dataIndex: 'name',
    ellipsis: true,
  },
  {
    title: i18next.t('limitNumber'),
    dataIndex: 'limitNumber',
    width: 180,
    search: false,
  },
  {
    title: i18next.t('duration'),
    dataIndex: 'duration',
    width: 75,
    search: false,
  },
  {
    title: i18next.t('operation'),
    valueType: 'option',
    dataIndex: 'id',
    align: 'center',
    width: 500,
    render: (text, entity) => (
      <Space>
        <Button
          key="edit"
          type="link"
          onClick={() => onEditHandler(entity.id)}
        >
          {i18next.t('edit')}
        </Button>
        <Button
          key="orderTime"
          type="link"
          onClick={() => onOrderTimeHandler(entity.id)}
        >
          {i18next.t('availableTime')}
        </Button>
        <Button
          key="card"
          type="link"
          onClick={() => onCardHandler(entity.id)}
        >
          {i18next.t('connectedWithCard')}
        </Button>
      </Space>
    ),
  },
];
