import { IProduct } from '@/utils/types';
import { ProColumns } from '@ant-design/pro-components';
import {
  Image, Popconfirm, Space,
} from 'antd';
import i18next from 'i18next';

interface IProps {
  onEditHandler: (id: string) => void;
  onCardHandler: (id: string) => void;
  onDeleteHandler: (id: string) => void;
  onStatusChangeHandler: (id: string, status: string) => void;
}
const PRODUCT_STATUS = {
  LIST: 'LIST',
  UN_LIST: 'UN_LIST',
};

export const getColumns: (props: IProps) => ProColumns<IProduct, 'text'>[] = ({
  onEditHandler,
  onCardHandler,
  onDeleteHandler,
  onStatusChangeHandler,
}) => [
  {
    dataIndex: 'id',
    title: '#',
    valueType: 'indexBorder',
    search: false,
    align: 'center',
    width: 50,
  },
  {
    title: i18next.t('coverImage'),
    dataIndex: 'coverUrl',
    search: false,
    align: 'center',
    width: 100,
    render: (_, record: IProduct) => <Image src={record.coverUrl} />,
  },
  {
    title: i18next.t('productName'),
    dataIndex: 'name',
    copyable: true,
    ellipsis: true,
    formItemProps: {
      rules: [
        {
          required: true,
          message: i18next.t('inputMust'),
        },
      ],
    },
  },
  {
    title: i18next.t('originalPrice'),
    search: false,
    dataIndex: 'originalPrice',
    width: 100,
  },
  {
    title: i18next.t('discountPrice'),
    search: false,
    dataIndex: 'preferentialPrice',
    width: 120,
  },
  {
    title: i18next.t('stock'),
    search: false,
    width: 80,
    align: 'center',
    dataIndex: 'stock',
  },
  {
    title: i18next.t('currentStock'),
    search: false,
    width: 120,
    align: 'center',
    dataIndex: 'curStock',
  },
  {
    title: i18next.t('limitBuy'),
    search: false,
    width: 180,
    align: 'center',
    dataIndex: 'limitBuyNumber',
  },
  {
    title: i18next.t('salesVolume'),
    search: false,
    width: 120,
    align: 'center',
    dataIndex: 'buyNumber',
  },
  {
    title: i18next.t('operation'),
    valueType: 'option',
    dataIndex: 'id',
    align: 'center',
    width: 200,
    render: (text, entity) => (
      <Space>
        {entity.status === PRODUCT_STATUS.UN_LIST
          ? (
            <a
              key="list"
              style={{
                color: 'blue',
              }}
              onClick={() => onStatusChangeHandler(entity.id, PRODUCT_STATUS.LIST)}
            >
              {i18next.t('list')}
            </a>
          )
          : (
            <a
              key="unList"
              style={{
                color: 'green',
              }}
              onClick={() => onStatusChangeHandler(entity.id, PRODUCT_STATUS.UN_LIST)}
            >
              {i18next.t('unlist')}
            </a>
          )}
        <a
          key="edit"
          onClick={() => onEditHandler(entity.id)}
        >
          {i18next.t('edit')}
        </a>
        <a
          key="card"
          onClick={() => onCardHandler(entity.id)}
        >
          {i18next.t('linkCard')}
        </a>
        <Popconfirm
          title={i18next.t('prompt')}
          description={i18next.t('sureDelete')}
          onConfirm={() => onDeleteHandler(entity.id)}
        >
          <a
            key="delete"
            type="link"
            style={{
              color: 'red',
            }}
          >
            {i18next.t('delete')}
          </a>
        </Popconfirm>
      </Space>
    ),
  },
];
