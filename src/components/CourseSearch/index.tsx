import { Select } from 'antd';
import { useCoursesForSample } from '@/services/course';
import _ from 'lodash';
import { useTranslation } from 'react-i18next';
import style from './index.module.less';

interface IProps {
  onSelected: (val: string) => void;
}

/**
* 课程选择搜索器
*/
const CourseSearch = ({
  onSelected,
}: IProps) => {
  const { search, data, loading } = useCoursesForSample();
  const { t } = useTranslation();
  const onSearchHandler = _.debounce((name: string) => {
    search(name);
  }, 500);

  const onChangeHandler = (val: string) => {
    onSelected(val);
  };
  return (
    <Select
      className={style.select}
      showSearch
      placeholder={t('searchCourse')}
      onSearch={onSearchHandler}
      onChange={onChangeHandler}
      filterOption={false}
      loading={loading}
    >
      {
        data?.map((item) => (
          <Select.Option key={item.id} value={item.id}>
            {item.name}
          </Select.Option>
        ))
      }
    </Select>
  );
};

export default CourseSearch;
