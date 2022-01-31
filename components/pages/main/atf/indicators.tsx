import React, { VFC, VFCX } from 'react';
import styled from '@emotion/styled';
import useSWR from 'swr';
import Skeleton from '@mui/material/Skeleton';

type ContainerProps = Readonly<{}>;
type Props = ContainerProps & Readonly<{ indicators: Indicator[] }>;

const fetcher = async (url: string) => {
  const response = await fetch(url);
  return response.json();
};

const Component: VFCX<ContainerProps> = ({ className }) => {
  const { data, error } = useSWR<Indicator[]>('/api/indicators', fetcher);

  if (error) {
    return <div>データが取得できませんでした</div>;
  }
  if (!data) {
    return (
      <div {...{ className }}>
        <Skeleton height={200} />
        <Skeleton height={200} />
        <Skeleton height={200} />
      </div>
    );
  }

  const indicators = data || [];

  return (
    <div {...{ className }}>
      {[...indicators, { number: 5200, unit: 'persons/month' }].map((indicator, i) => (
        <div key={i}>
          <div>{indicator.number.toLocaleString()}</div>
          <div>{indicator.unit}</div>
        </div>
      ))}
    </div>
  );
};

const StyledComponent = styled(Component)`
  display: flex;
  flex-direction: column;
  gap: 32px;

  > div {
    padding: 32px;
    font-size: 5vmin;
    display: flex;
    align-items: flex-end;
    gap: 8px;

    > div {
      font-weight: 600;
      &:nth-of-type(1) {
        font-size: 6vw;
        font-weight: 600;
        color: #00cb8f;
      }
      &:nth-of-type(2) {
        font-size: 3vw;
      }
    }
  }
`;

export default StyledComponent;