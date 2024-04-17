import OSSImageUpload from '@/components/OSSImageUpload';
import { UPDATE_USER } from '@/graphql/user';
import { useUserContext } from '@/hooks/userHooks';
import {
  PageContainer, ProForm, ProFormInstance, ProFormText, ProFormTextArea,
} from '@ant-design/pro-components';
import { useMutation } from '@apollo/client';
import { useTranslation } from 'react-i18next';
import {
  Col, Row, message, Form,
} from 'antd';
import { useEffect, useRef } from 'react';

/**
* 个人信息管理
*/
const My = () => {
  const formRef = useRef<ProFormInstance>();
  const { store } = useUserContext();

  const [updateUserInfo] = useMutation(UPDATE_USER);
  const { t } = useTranslation();
  useEffect(() => {
    if (!store.tel) return;
    formRef.current?.setFieldsValue({
      tel: store.tel,
      name: store.name,
      desc: store.desc,
      avatar: [{
        url: store.avatar,
      }],
    });
  }, [store]);
  return (
    <PageContainer>
      <ProForm
        formRef={formRef}
        layout="horizontal"
        submitter={{
          resetButtonProps: {
            style: {
              display: 'none',
            },
          },
        }}
        onFinish={async (values) => {
          const res = await updateUserInfo({
            variables: {
              id: store.id,
              params: {
                name: values.name,
                desc: values.desc,
                avatar: values.avatar[0]?.url || '',
              },
            },
          });
          if (res.data.updateUserInfo.code === 200) {
            store.refetchHandler?.();
            // res.data.updateUserInfo.message
            message.success(t('updateUserOk'));
            return;
          }
          message.error(t('updateUserFail'));
        }}
      >
        <Row gutter={20}>
          <Col>
            <ProFormText
              name="tel"
              label={t('tel')}
              tooltip={t('not allowed to modify')}
              disabled
            />
            <ProFormText
              name="name"
              label={t('nickname')}
              placeholder={t('inputNickname')}
            />
            <ProFormTextArea
              name="desc"
              label={t('brief')}
              placeholder={t('inputBrief')}
            />
          </Col>
          <Col>
            <Form.Item name="avatar">
              <OSSImageUpload label={t('changeAvatar')} />
            </Form.Item>
          </Col>
        </Row>
      </ProForm>
    </PageContainer>
  );
};

export default My;
