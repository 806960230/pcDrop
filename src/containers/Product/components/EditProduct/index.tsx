import {
  Button,
  Col,
  Divider,
  Drawer, Form, Input, InputNumber, Row, Space, Spin,
} from 'antd';
import UploadImage from '@/components/OSSImageUpload';
import { useEditProductInfo, useProductInfo } from '@/services/product';
import { useState } from 'react';
import TypeSelect from '@/components/TypeSelect';
import { useTranslation } from 'react-i18next';

const { TextArea } = Input;

interface IProps {
  id?: string;
  onClose: (isReload?: boolean) => void;
}

/**
* 创建/编辑商品
*/
const EditCourse = ({
  onClose,
  id,
}: IProps) => {
  const [form] = Form.useForm();
  const [edit, editLoading] = useEditProductInfo();
  const { data, loading } = useProductInfo(id);
  const [open, setOpen] = useState(true);
  const { t } = useTranslation();
  const onSubmitHandler = async () => {
    const values = await form.validateFields();
    if (values) {
      const newValues = {
        ...values,
        coverUrl: values.coverUrl[0].url,
        bannerUrl: values.bannerUrl[0].url,
      };
      edit(id, newValues, onClose);
    }
  };

  return (
    <Drawer
      title={id ? t('editProduct') : t('createProduct')}
      width={900}
      open={open}
      onClose={() => setOpen(false)}
      afterOpenChange={(o) => !o && onClose()}
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
        {(data || !id) && (
        <Form
          form={form}
          initialValues={data}
        >
          <Row gutter={20}>
            <Col span={18}>
              <Form.Item
                style={{ width: '100%' }}
                label={t('name')}
                name="name"
                rules={[{ required: true }]}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item
                label={t('product classification')}
                name="type"
                rules={[{ required: true }]}
              >
                <TypeSelect />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={20}>
            <Col span={6}>
              <Form.Item
                label={t('stock')}
                name="stock"
                rules={[{ required: true }]}
              >
                <InputNumber />
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item
                label={t('originalPrice')}
                name="originalPrice"
                rules={[{ required: true }]}
              >
                <InputNumber />
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item
                label={t('discountPrice')}
                name="preferentialPrice"
                rules={[{ required: true }]}
              >
                <InputNumber />
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item
                label={t('limitBuy')}
                name="limitBuyNumber"
                rules={[{ required: true }]}
              >
                <InputNumber />
              </Form.Item>
            </Col>
          </Row>
          <Form.Item
            label={t('productDescription')}
            name="desc"
            rules={[{ required: true }]}
          >
            <TextArea
              maxLength={200}
              rows={5}
              allowClear
              showCount
            />
          </Form.Item>
          <Divider>{t('imageSet')}</Divider>
          <Row gutter={20}>
            <Col span={12}>
              <Form.Item
                name="coverUrl"
                label={t('productCover')}
                rules={[{ required: true }]}
                labelCol={{
                  span: 24,
                }}
              >
                <UploadImage
                  label={t('upload images')}
                  maxCount={1}
                  imgCropAspect={16 / 9}
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="bannerUrl"
                label={t('bannerCover')}
                rules={[{ required: true }]}
                labelCol={{
                  span: 24,
                }}
              >
                <UploadImage
                  label={t('upload images')}
                  maxCount={1}
                  imgCropAspect={16 / 9}
                />
              </Form.Item>
            </Col>
          </Row>
        </Form>
        )}
      </Spin>
    </Drawer>
  );
};

EditCourse.defaultProps = {
  id: '',
};

export default EditCourse;
