import { ComponentType, FC } from 'react';

import Loader from '~/atoms/Loader/Loader';

/**
 * Props to be injected by the HOC.
 */
export type PropsWithData<TProps, TData> = TProps & { data: TData };

/**
 * Result of provided hook.
 */
export interface DataResult<TData> {
  data: TData;
  error?: string;
  loading: boolean;
}

/**
 * Type of provided hook.
 */
type DataHook<TProps, TData> = (props: TProps) => DataResult<TData>;

export function withData<TProps, TData>(useData: DataHook<TProps, TData>) {
  return (Component: ComponentType<PropsWithData<TProps, TData>>): FC<TProps> => {
    return (props) => {
      const { data, error, loading } = useData(props);

      if (error) {
        throw new Error(error);
      }

      if (loading) {
        return <Loader />;
      }

      return <Component {...props} data={data} />;
    };
  };
}
