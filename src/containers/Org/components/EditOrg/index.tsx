import {
  Button,
  Col, Divider, Drawer, Form, Input, Row, Select, Spin, UploadFile,
} from 'antd';
import UploadImage from '@/components/OSSImageUpload';
import { useOrganization, useEditInfo } from '@/services/org';
import { useMemo } from 'react';
import { IOrganization } from '@/utils/types';
import { useTranslation } from 'react-i18next';
import style from './index.module.less';

interface IProp {
  id: string;
  onClose: () => void;
}
/**
*
*/
const EditOrg = ({
  id,
  onClose,
}: IProp) => {
  const [form] = Form.useForm();
  const { t } = useTranslation();
  const { data, loading: queryLoading } = useOrganization(id);
  const [edit, editLoading] = useEditInfo();

  const onFinishHandler = async () => {
    const values = await form.validateFields();
    if (values) {
      const formData = {
        ...values,
        logo: values.logo[0].url,
        tags: values.tags.join(','),
        identityCardBackImg: values.identityCardBackImg[0].url,
        identityCardFrontImg: values.identityCardFrontImg[0].url,
        businessLicense: values.businessLicense[0].url,
        orgFrontImg: values?.orgFrontImg?.map((item: UploadFile) => ({ url: item.url })),
        orgRoomImg: values?.orgRoomImg?.map((item: UploadFile) => ({ url: item.url })),
        orgOtherImg: values?.orgOtherImg?.map((item: UploadFile) => ({ url: item.url })),
      } as IOrganization;
      edit(id, formData);
    }
  };

  const initValue = useMemo(() => (data ? {
    ...data,
    tags: data.tags?.split(','),
    logo: [{ url: data.logo }],
    identityCardBackImg: [{ url: data.identityCardBackImg }],
    identityCardFrontImg: [{ url: data.identityCardFrontImg }],
    businessLicense: [{ url: data.businessLicense }],
  } : {}), [data]);

  if (queryLoading) {
    return <Spin />;
  }

  return (
    <Drawer
      title={t('editStore')}
      width="70vw"
      onClose={onClose}
      open
      footerStyle={{ textAlign: 'right' }}
      footer={(
        <Button
          loading={editLoading}
          type="primary"
          onClick={onFinishHandler}
        >
          {t('save')}
        </Button>
      )}
    >
      <Form form={form} initialValues={initValue} layout="vertical">
        <Row className={style.row} gutter={20}>
          <Col span={10}>
            <Form.Item
              style={{ width: '100%' }}
              label="Logo"
              name="logo"
              rules={[{ required: true }]}
            >
              <UploadImage
                maxCount={1}
                label={t('changeLogo')}
              />
            </Form.Item>
          </Col>
          <Col span={14}>
            <Form.Item
              style={{ width: '100%' }}
              label={t('name')}
              name="name"
              rules={[{ required: true }]}
            >
              <Input placeholder={t('inputStoreName')} />
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
                style={{ width: '100%' }}
                placeholder={t('inputTags')}
              />
            </Form.Item>
          </Col>
          <Col span={5}>
            <Form.Item
              label={t('tel')}
              name="tel"
              rules={[{ required: true }]}
            >
              <Input placeholder={t('InputPhoneNumber')} />
            </Form.Item>
          </Col>
          <Col span={4}>
            <Form.Item
              label={t('longitude')}
              name="longitude"
              rules={[{ required: true }, {
                pattern: /^(-?((1[0-7]\d)|([1-9]?\d))(\.\d+)?|180(\.0+)?)$/,
                message: t('longitudeRule'),
              }]}
            >
              <Input placeholder={t('inputLongitude')} />
            </Form.Item>
          </Col>
          <Col span={4}>
            <Form.Item
              label={t('latitude')}
              name="latitude"
              rules={[{ required: true }, {
                pattern: /^(-?(90(\.0+)?|[1-8]?\d(\.\d+)?))$/,
                message: t('latitudeRule'),
              }]}
            >
              <Input placeholder={t('inputLatitude')} />
            </Form.Item>
          </Col>
        </Row>
        <Form.Item
          label={t('address')}
          name="address"
          rules={[{ required: true }]}
        >
          <Input placeholder={t('inputAddress')} />
        </Form.Item>
        <Form.Item
          label={t('storeDescription')}
          name="description"
          rules={[{ required: true }]}
        >
          <Input.TextArea
            maxLength={500}
            rows={5}
            className={style.textArea}
            allowClear
            showCount
          />
        </Form.Item>
        <Row className={style.row} gutter={20}>
          <Col span={8}>
            <Form.Item
              style={{ width: '100%' }}
              label={t('businessLicense')}
              name="businessLicense"
              rules={[{ required: true }]}
            >
              <UploadImage
                label={t('changeBusinessLicense')}
                maxCount={1}
                imgCropAspect={3 / 2}
              />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item
              style={{ width: '100%' }}
              label={t('identityCardFrontImg')}
              name="identityCardFrontImg"
              rules={[{ required: true }]}
            >
              <UploadImage
                label={t('changeIdentityCardFrontImg')}
                maxCount={1}
                imgCropAspect={3 / 2}
              />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item
              style={{ width: '100%' }}
              label={t('identityCardBackImg')}
              name="identityCardBackImg"
              rules={[{ required: true }]}
            >
              <UploadImage
                label={t('changeIdentityCardBackImg')}
                maxCount={1}
                imgCropAspect={3 / 2}
              />
            </Form.Item>
          </Col>
        </Row>

        <Divider>{t('promptTop')}</Divider>
        <Form.Item name="orgFrontImg">
          <UploadImage label={t('upload images')} maxCount={5} imgCropAspect={2 / 1} />
        </Form.Item>
        <Divider>{t('promptIn')}</Divider>
        <Form.Item name="orgRoomImg">
          <UploadImage label={t('upload images')} maxCount={5} imgCropAspect={2 / 1} />
        </Form.Item>
        <Divider>{t('promptOther')}</Divider>
        <Form.Item name="orgOtherImg">
          <UploadImage label={t('upload images')} maxCount={5} imgCropAspect={2 / 1} />
        </Form.Item>
      </Form>
    </Drawer>
  );
};

export default EditOrg;
