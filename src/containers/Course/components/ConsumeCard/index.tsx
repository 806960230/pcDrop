import { Drawer } from 'antd';
import { EditableProTable } from '@ant-design/pro-components';
import { ICard } from '@/utils/types';
import { useCards, useDeleteCard, useEditCardInfo } from '@/services/card';
import { useTranslation } from 'react-i18next';
import { getColumns } from './constants';

interface IProps {
  id: string;
  onClose: (isReload?: boolean) => void;
}

/**
* 消费卡
*/
const ConsumeCard = ({
  onClose,
  id,
}: IProps) => {
  const { data, loading, refetch } = useCards(id);
  const [del, delLoading] = useDeleteCard();
  const [edit, editLoading] = useEditCardInfo();
  const { t } = useTranslation();
  const onDeleteHandler = (key: string) => {
    del(key, refetch);
  };
  const onSaveHandler = (d: ICard) => {
    edit(d.id, id, {
      name: d.name,
      type: d.type,
      time: d.time,
      validityDay: d.validityDay,
    }, refetch);
  };
  return (
    <Drawer
      title={t('connectedWithCard')}
      width="90vw"
      open
      onClose={() => onClose()}
    >
      <EditableProTable<ICard>
        headerTitle={t('manage_this_course_card')}
        rowKey="id"
        loading={loading || editLoading || delLoading}
        recordCreatorProps={{
          record: () => ({
            id: 'new',
            name: '',
            type: 'time',
            time: 0,
            validityDay: 0,
          }),
        }}
        value={data}
        columns={getColumns(onDeleteHandler)}
        editable={{
          onSave: async (rowKey, d) => {
            onSaveHandler(d);
          },
          onDelete: async (key) => {
            onDeleteHandler(key as string);
          },
        }}
      />
    </Drawer>
  );
};

export default ConsumeCard;
