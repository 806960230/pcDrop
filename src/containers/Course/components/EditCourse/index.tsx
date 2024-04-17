import { useCourse, useEditCourseInfo } from '@/services/course';
import {
  Button,
  Col,
  Drawer, Form, Input, InputNumber, Row, Space, Spin,
} from 'antd';
import { useEffect } from 'react';
import UploadImage from '@/components/OSSImageUpload';
import TeacherSelect from '@/components/TeacherSelect';
import { ITeacher, IValue } from '@/utils/types';
import { useTranslation } from 'react-i18next';

const { TextArea } = Input;

interface IProps {
  id?: string;
  onClose: (isReload?: boolean) => void;
}

/**
* 创建/编辑课程
  desc?: string;
  group?: string; // 适龄人群
  baseAbility?: string;
  limitNumber: number; // 限制人数
  duration: number; // 持续时长
  reserveInfo?: string;
  refundInfo?: string;
  otherInfo?: string;
*/
const EditCourse = ({
  onClose,
  id,
}: IProps) => {
  const [form] = Form.useForm();
  const [edit, editLoading] = useEditCourseInfo();
  const { getCourse, loading } = useCourse();
  const { t } = useTranslation();
  useEffect(() => {
    const init = async () => {
      if (id) {
        const res = await getCourse(id);
        form.setFieldsValue({
          ...res,
          teachers: res.teachers ? res.teachers.map((item: ITeacher) => ({
            label: item.name,
            value: item.id,
          })) : [],
          coverUrl: res.coverUrl ? [{ url: res.coverUrl }] : [],
        });
      } else {
        form.resetFields();
      }
    };
    init();
  }, [id]);

  const onSubmitHandler = async () => {
    const values = await form.validateFields();
    if (values) {
      edit(id, {
        ...values,
        teachers: values.teachers?.map((item: IValue) => item.value),
        coverUrl: values.coverUrl[0].url,
      }, onClose);
    }
  };

  return (
    <Drawer
      title={id ? t('editCourse') : t('createCourse')}
      width={720}
      open
      onClose={() => onClose()}
      extra={(
        <Space>
          <Button onClick={() => onClose()}>{t('cancel')}</Button>
          <Button loading={editLoading} onClick={onSubmitHandler} type="primary">
            {t('submit')}
          </Button>
        </Space>
      )}
    >
      <Spin spinning={loading}>
        <Form
          form={form}
        >
          <Form.Item
            label={t('coverImage')}
            name="coverUrl"
            rules={[{
              required: true,
            }]}
          >
            <UploadImage label={t('upload images')} imgCropAspect={2 / 1} />
          </Form.Item>
          <Form.Item
            label={t('courseName')}
            name="name"
            rules={[{
              required: true,
            }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label={t('lecturer')}
            name="teachers"
            rules={[{
              required: true,
            }]}
          >
            <TeacherSelect />
          </Form.Item>
          <Form.Item
            label={t('courseDescription')}
            name="desc"
            rules={[{
              required: true,
            }]}
          >
            <TextArea rows={5} showCount maxLength={200} />
          </Form.Item>
          <Row gutter={20}>
            <Col>
              <Form.Item
                label={t('limitNumber')}
                name="limitNumber"
                rules={[{
                  required: true,
                }]}
              >
                <InputNumber min={0} addonAfter={t('person')} />
              </Form.Item>
            </Col>
            <Col>
              <Form.Item
                label={t('duration')}
                name="duration"
                rules={[{
                  required: true,
                }]}
              >
                <InputNumber min={0} addonAfter={t('minute')} />
              </Form.Item>
            </Col>
          </Row>
          <Form.Item
            label={t('ageGroup')}
            name="group"
            rules={[{
              required: true,
            }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label={t('basicAbility')}
            name="baseAbility"
            rules={[{
              required: true,
            }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label={t('reserveInfo')}
            name="reserveInfo"
            rules={[{
              required: true,
            }]}
          >
            <TextArea rows={5} showCount maxLength={200} />
          </Form.Item>
          <Form.Item
            label={t('refundInfo')}
            name="refundInfo"
            rules={[{
              required: true,
            }]}
          >
            <TextArea rows={5} showCount maxLength={200} />
          </Form.Item>
          <Form.Item label={t('otherInfo')} name="otherInfo">
            <TextArea rows={5} showCount maxLength={200} />
          </Form.Item>
        </Form>
      </Spin>
    </Drawer>
  );
};

EditCourse.defaultProps = {
  id: '',
};

export default EditCourse;
