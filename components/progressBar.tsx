import styled from 'styled-components';

type Props = { max: number; value: number };

export function ProgressBar(props: Props) {
  return (
    <ProgressBarOutside>
      <ProgressBarInside style={{ width: `${Math.round((props.value / props.max) * 100)}%` }} />
    </ProgressBarOutside>
  );
}

const ProgressBarOutside = styled.div`
  height: 4px;
  background-color: #ffffff;
  border-radius: 2px;
`;

const ProgressBarInside = styled.div`
  background-color: ${(props) => props.theme.color.brand};
  height: 100%;
`;
