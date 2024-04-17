import { ProCard, PageContainer } from '@ant-design/pro-components';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import {
  Card, Tag, Button, Input, Pagination, Result, Popconfirm, Image,
} from 'antd';
import { useState } from 'react';
import { useDeleteTeacher, useTeachers } from '@/services/teacher';
import { useTranslation } from 'react-i18next';
import CreateTeacher from './components/CreateTeacher';
import style from './index.module.less';

const Teacher = () => {
  const { data, page, refetch } = useTeachers();
  const [delHandler, delLoading] = useDeleteTeacher();
  const [show, setShow] = useState(false);
  const [curId, setCurId] = useState<string>('');
  const { t } = useTranslation();
  const editInfoHandler = (id?: string) => {
    if (id) {
      setCurId(id);
    } else {
      setCurId('');
    }
    setShow(true);
  };

  const onPageChangeHandler = (pageNum: number, pageSize: number) => {
    refetch({
      page: {
        pageNum,
        pageSize,
      },
    });
  };

  const onSearchHandler = (name: string) => {
    refetch({
      name,
    });
  };

  const closeAndRefetchHandler = (isReload?: boolean) => {
    setShow(false);
    if (isReload) {
      refetch();
    }
  };

  const onDeleteHandler = (id: string) => {
    delHandler(id, refetch);
  };
  return (
    <div className={style.container}>
      <PageContainer
        header={{
          title: t('teacherManagement'),
        }}
      >
        <Card>
          <Input.Search
            placeholder={t('searchTeacher')}
            className={style.teacherSearch}
            onSearch={onSearchHandler}
            enterButton
            allowClear
          />
          <Button
            className={style.addButton}
            type="primary"
            onClick={() => editInfoHandler()}
          >
            {t('add')}
          </Button>
        </Card>
        {data?.length === 0 && <Result title={t('noTeachers')} icon={<Image src="https://water-drop-gan.oss-cn-hongkong.aliyuncs.com/images/cry2.png" preview={false} width={300} />} />}
        {data?.map((item) => (
          <ProCard
            key={item.id}
            className={style.card}
            actions={[
              <EditOutlined
                key="edit"
                onClick={() => editInfoHandler(item.id)}
              />,
              <Popconfirm
                title={t('prompt')}
                description={t('sureDelete')}
                okButtonProps={{ loading: delLoading }}
                onConfirm={() => onDeleteHandler(item.id)}
              >
                <DeleteOutlined key="del" />
              </Popconfirm>,
            ]}
          >
            <div
              className={style.avatar}
              style={{ backgroundImage: `url(${item.photoUrl})` }}
            />
            <div className={style.content}>
              <div className={style.name}>{item.name}</div>
              <div>
                {item.tags.split(',').map((it: string) => (
                  <Tag
                    key={it}
                    color="green"
                  >
                    {it}
                  </Tag>
                ))}
              </div>
              <div className={style.education}>{item.education}</div>
              <div className={style.seniority}>{item.seniority}</div>
            </div>
          </ProCard>
        ))}
        <div className={style.page}>
          <Pagination
            pageSize={page?.pageSize}
            current={page?.pageNum}
            total={page?.total}
            onChange={onPageChangeHandler}
          />
        </div>
        {show && (
          <CreateTeacher
            id={curId}
            onClose={closeAndRefetchHandler}
          />
        )}
      </PageContainer>
    </div>
  );
};

export default Teacher;
