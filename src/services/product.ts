import { useMemo } from 'react';
import { message } from 'antd';
import {
  TBaseProduct, TProductQuery, TProductsQuery, TProductTypeQuery,
} from '@/utils/types';
import { useQuery, useMutation } from '@apollo/client';
import { useTranslation } from 'react-i18next';
import { DEFAULT_PAGE_SIZE } from '@/utils/constants';
import {
  GET_PRODUCTS, GET_PRODUCT, COMMIT_PRODUCT, DELETE_PRODUCT, GET_PRODUCT_TYPES,
} from '@/graphql/product';

export const useProducts = (
  pageNum = 1,
  pageSize = DEFAULT_PAGE_SIZE,
) => {
  const { loading, data, refetch } = useQuery<TProductsQuery>(GET_PRODUCTS, {
    skip: true,
    variables: {
      page: {
        pageNum,
        pageSize,
      },
    },
  });

  const refetchHandler = async (params: {
    name?: string;
    pageSize?: number;
    current?: number;
  }) => {
    const { data: res, errors } = await refetch({
      name: params.name,
      page: {
        pageNum: params.current || 1,
        pageSize: params.pageSize || DEFAULT_PAGE_SIZE,
      },
    });

    if (errors) {
      return {
        success: false,
      };
    }
    return {
      total: res?.getProducts.page.total,
      data: res?.getProducts.data,
      success: true,
    };
  };

  return {
    loading,
    refetch: refetchHandler,
    page: data?.getProducts.page,
    data: data?.getProducts.data,
  };
};

export const useEditProductInfo = (): [handleEdit: Function, loading: boolean] => {
  const [edit, { loading }] = useMutation(COMMIT_PRODUCT);
  const { t } = useTranslation();

  const handleEdit = async (
    id: number,
    params: TBaseProduct,
    callback: (isReload: boolean) => void,
  ) => {
    const res = await edit({
      variables: {
        id,
        params,
      },
    });
    if (res.data.commitProductInfo.code === 200) {
      // res.data.commitProductInfo.message
      message.success(t('updateProductOk'));
      callback(true);
      return;
    }
    message.error(t('updateProductFail'));
  };

  return [handleEdit, loading];
};

export const useProductInfo = (id?: string) => {
  const { data, loading, refetch } = useQuery<TProductQuery>(GET_PRODUCT, {
    skip: !id,
    variables: {
      id,
    },
  });

  const newData = useMemo(() => ({
    ...data?.getProductInfo.data,
    coverUrl: [{ url: data?.getProductInfo.data.coverUrl }],
    bannerUrl: [{ url: data?.getProductInfo.data.bannerUrl }],
  }), [data]);

  return { data: data?.getProductInfo.data ? newData : undefined, loading, refetch };
};

export const useDeleteProduct = (): [handleEdit: Function, loading: boolean] => {
  const [del, { loading }] = useMutation(DELETE_PRODUCT);
  const { t } = useTranslation();

  const delHandler = async (id: string, callback: () => void) => {
    const res = await del({
      variables: {
        id,
      },
    });
    if (res.data.deleteProduct.code === 200) {
      // res.data.deleteProduct.message
      message.success(t('deleteProductOk'));
      callback();
      return;
    }
    message.error(t('deleteProductFail'));
  };

  return [delHandler, loading];
};

/**
 * 获取商品分类数据
 * @returns
 */
export const useProductTypes = () => {
  const { data, loading } = useQuery<TProductTypeQuery>(GET_PRODUCT_TYPES);

  return {
    data: data?.getProductTypes.data || [],
    loading,
  };
};
