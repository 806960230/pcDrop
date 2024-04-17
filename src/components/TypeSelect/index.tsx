import { DataContext } from '@/routes';
// import { useProductTypes } from '@/services/product';
import { Select } from 'antd';
import { useContext } from 'react';
import { useTranslation } from 'react-i18next';

interface IProps {
  value?: string;
  onChange?: (val: string) => void;
}

const data = [
  {
    title: '音乐培训',
    key: 'music',
  },
  {
    title: '美术培训',
    key: 'art',
  },
  {
    title: '外语培训',
    key: 'foreign',
  },
  {
    title: '厨师培训',
    key: 'cook',
  },
  {
    title: '数学培训',
    key: 'math',
  },
];

const dataEN = [
  {
    title: 'music',
    key: 'music',
  },
  {
    title: 'art',
    key: 'art',
  },
  {
    title: 'foreign Language',
    key: 'foreign',
  },
  {
    title: 'chef',
    key: 'cook',
  },
  {
    title: 'maths',
    key: 'math',
  },
];
/**
*  商品分类选择器
*/
const TypeSelect = ({
  value,
  onChange,
}: IProps) => {
  // const { data } = useProductTypes();
  const { t } = useTranslation();
  const { locale } = useContext(DataContext);
  const onChangeHandler = (val: string) => {
    onChange?.(val);
  };

  return (
    <Select
      placeholder={t('choose type')}
      value={value}
      onChange={onChangeHandler}
    >
      {(locale === 'en' ? dataEN : data)?.map((item) => (
        <Select.Option
          key={item.key}
          value={item.key}
        >
          {item.title}
        </Select.Option>
      ))}
    </Select>
  );
};

TypeSelect.defaultProps = {
  value: undefined,
  onChange: () => {},
};

export default TypeSelect;
