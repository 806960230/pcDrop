import { useMutation, useQuery } from '@apollo/client';
import { message } from 'antd';
import {
  QUERY_TEACHER, GET_TEACHERS, COMMIT_TEACHER, DELETE_TEACHER,
} from '@/graphql/teacher';
import { useTranslation } from 'react-i18next';
import { TBaseTeacher, TTeacherQuery, TTeachersQuery } from '@/utils/types';
import { DEFAULT_PAGE_SIZE } from '../utils/constants';

export const useTeachers = (
  pageNum = 1,
  pageSize = DEFAULT_PAGE_SIZE,
) => {
  const {
    loading, error, data, refetch,
  } = useQuery<TTeachersQuery>(
    GET_TEACHERS,
    {
      variables: {
        page: {
          pageNum,
          pageSize,
        },
      },
    },
  );

  return {
    loading,
    error,
    refetch,
    page: data?.getTeachers.page || {
      pageSize,
      pageNum,
      total: 0,
    },
    data: data?.getTeachers.data,
  };
};

export const useTeacher = (id: string) => {
  const { loading, error, data } = useQuery<TTeacherQuery>(
    QUERY_TEACHER,
    {
      skip: !id,
      variables: {
        id,
      },
    },
  );

  return {
    loading,
    error,
    data: data?.getTeacherInfo.data,
  };
};

export const useEditTeacherInfo = (): [handleEdit: Function, loading: boolean] => {
  const [edit, { loading }] = useMutation(COMMIT_TEACHER);
  const { t } = useTranslation();

  const handleEdit = async (
    id: string,
    params: TBaseTeacher,
    callback: (isReload: boolean) => void,
  ) => {
    const res = await edit({
      variables: {
        id,
        params,
      },
    });
    if (res.data.commitTeacherInfo.code === 200) {
      // res.data.commitTeacherInfo.message
      message.success(t('commitTeacherInfoOk'));
      callback(true);
      return;
    }
    message.error(t('commitTeacherInfoFail'));
  };

  return [handleEdit, loading];
};

export const useDeleteTeacher = (): [handleEdit: Function, loading: boolean] => {
  const [del, { loading }] = useMutation(DELETE_TEACHER);
  const { t } = useTranslation();
  const delHandler = async (id: string, callback: () => void) => {
    const res = await del({
      variables: {
        id,
      },
    });
    if (res.data.deleteTeacher.code === 200) {
      // res.data.deleteTeacher.message
      message.success(t('deleteTeacherOk'));
      callback();
      return;
    }
    message.error(t('deleteTeacherFail'));
  };

  return [delHandler, loading];
};
