import {
  Button,
  Col, Drawer, Form,
  Input, InputNumber, Row, Select, Space, Spin,
} from 'antd';
import { useEditTeacherInfo, useTeacher } from '@/services/teacher';
import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import UploadImage from '@/components/OSSImageUpload';
import style from './index.module.less';

const { TextArea } = Input;
interface IProp {
  id: string;
  onClose: (refetch?: boolean) => void;
}

/**
 * 编辑老师
 */
const CreateTeacher = ({ id, onClose }: IProp) => {
  const [form] = Form.useForm();
  const { data, loading } = useTeacher(id);
  const [handleEdit, editLoading] = useEditTeacherInfo();
  const { t } = useTranslation();
  const initValue = useMemo(() => (data ? {
    ...data,
    tags: data.tags.split(','),
    photoUrl: [{ url: data.photoUrl }],
  } : {}), [data]);

  const onSubmitHandler = async () => {
    const values = await form.validateFields();
    if (values) {
      handleEdit(id, {
        ...values,
        tags: values.tags.join(','),
        photoUrl: values.photoUrl?.[0]?.url,
      }, onClose);
    }
  };

  return (
    <Drawer
      onClose={() => onClose()}
      open
      width="70vw"
      title={t('createTeacher')}
      extra={(
        <Space>
          <Button onClick={() => onClose()}>{t('cancel')}</Button>
          <Button loading={editLoading} onClick={onSubmitHandler} type="primary">
            {t('submit')}
          </Button>
        </Space>
      )}
    >
      <Spin spinning={editLoading || loading}>
        {(data || !id) && (
        <Form
          form={form}
          initialValues={initValue}
          layout="vertical"
        >
          <Form.Item
            label={t('avatar')}
            name="photoUrl"
            rules={[{ required: true }]}
          >
            <UploadImage label={t('upload images')} maxCount={1} />
          </Form.Item>
          <Row className={style.row} gutter={20}>
            <Col span={16}>
              <Form.Item
                label={t('name')}
                name="name"
                rules={[{ required: true }]}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                label={t('teachingExperience')}
                name="teacherTime"
                rules={[{ required: true }]}
              >
                <InputNumber />
              </Form.Item>
            </Col>
          </Row>
          <Row className={style.row} gutter={20}>
            <Col span={11}>
              <Form.Item
                label={t('tags')}
                name="tags"
                rules={[{ required: true }]}
              >
                <Select
                  mode="tags"
                />
              </Form.Item>
            </Col>
            <Col span={5}>
              <Form.Item
                label={t('seniority')}
                name="seniority"
                rules={[{ required: true }]}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                label={t('education')}
                name="education"
                rules={[{ required: true }]}
              >
                <Input />
              </Form.Item>
            </Col>
          </Row>
          <Form.Item label={t('prize')} name="carryPrize">
            <TextArea
              maxLength={200}
              className={style.textArea}
              allowClear
              showCount
            />
          </Form.Item>
          <Form.Item label={t('experience')} name="experience">
            <TextArea
              maxLength={200}
              className={style.textArea}
              allowClear
              showCount
            />
          </Form.Item>
        </Form>
        )}
      </Spin>
    </Drawer>
  );
};

export default CreateTeacher;
