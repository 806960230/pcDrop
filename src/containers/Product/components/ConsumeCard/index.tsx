import {
  Modal, Result, Row, Space, Typography,
} from 'antd';
import { CheckCard } from '@ant-design/pro-components';
import { useLazyCards } from '@/services/card';
import { useEffect, useMemo, useState } from 'react';
import { useEditProductInfo, useProductInfo } from '@/services/product';
import CourseSearch from '@/components/CourseSearch';
import { getCardName } from '@/utils/constants';
import _ from 'lodash';
import { CreditCardOutlined } from '@ant-design/icons';
import { useTranslation } from 'react-i18next';
import style from './index.module.less';

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
  const [selectedCards, setSelectedCards] = useState<string[]>([]);
  const { data: product, loading: getProductLoading } = useProductInfo(id);
  const { getCards, data: cards, loading: getCardsLoading } = useLazyCards();
  const [edit, editLoading] = useEditProductInfo();

  const newCards = useMemo(
    () => _.unionBy(product?.cards || [], cards, 'id'),
    [cards, product?.cards],
  );

  useEffect(() => {
    setSelectedCards(product?.cards?.map((item) => item.id) || []);
  }, [product?.cards]);

  const onOkHandler = () => {
    edit(id, {
      cards: selectedCards,
    }, () => onClose());
  };

  const onSelectedHandler = (courseId: string) => {
    getCards(courseId);
  };
  const { t } = useTranslation();
  return (
    <Modal
      title={t('linkCard')}
      width="900"
      open
      onOk={onOkHandler}
      onCancel={() => onClose()}
    >
      <Row justify="end">
        <CourseSearch onSelected={onSelectedHandler} />
      </Row>
      <Row justify="center" className={style.content}>
        {newCards.length === 0 && (
        <Result
          status="warning"
          title={t('chooseCard')}
        />
        )}
        <CheckCard.Group
          multiple
          loading={getProductLoading || editLoading || getCardsLoading}
          onChange={(value) => {
            setSelectedCards(value as string[]);
          }}
          value={selectedCards}
        >
          {
            newCards.map((item) => (
              <CheckCard
                key={item.id}
                value={item.id}
                size="small"
                avatar={<CreditCardOutlined />}
                title={
                  (
                    <>
                      <Space>
                        <Typography.Text
                          ellipsis
                          className={style.name}
                        >
                          {item.course?.name}
                        </Typography.Text>
                        {getCardName(item.type)}
                      </Space>
                      <div>
                        {item.name}
                      </div>
                    </>
                  )
                }
                description={
                  (
                    <Space>
                      <span>
                        {t('times')}
                        :
                        {item.time}
                      </span>
                      <span>
                        {t('validityDay')}
                        :
                        {item.validityDay}
                      </span>
                    </Space>
                  )
                }
              />
            ))
          }

        </CheckCard.Group>
      </Row>
    </Modal>
  );
};

export default ConsumeCard;
