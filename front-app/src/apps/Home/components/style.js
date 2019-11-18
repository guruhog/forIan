import { Segment, Image, Button } from 'semantic-ui-react';
import styled from 'styled-components';

export const ImageStyled = styled(Image)`
  height: ${props => props.height}px !important;

  & img {
    width: 100% !important;
    height: 100% !important;
    object-fit: contain;
    object-position: center;

    &:hover {
      cursor: pointer;
    }
  }

  .label,
  .icon {
    cursor: pointer !important;
  }
`;

export const MainWrapper = styled(Segment)`
  padding: 0 !important;
  display: flex;
  flex-direction: column;
  transition: transform 0.2s ease;
  min-width: 248.75px;

  &:hover {
    transform: scale(1.05);
    cursor: initial;
  }

  i {
    cursor: pointer !important;
  }
`;

export const ButtonSupport = styled(Button)`
  margin: 0 !important;
  background-color: #eda16f !important;
  color: #fff !important;
  &:hover {
    background-color: #e59661 !important;
  }
`;

export const ButtonStyled = styled(Button)`
  margin: 0 !important;
`;

export const ButtonWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 30px;
`;

export const Content = styled.div`
  padding: 20px 10px;
`;

export const MediaWrapper = styled.div`
  height: 25px;
  display: flex;
  align-items: center;
`;

export const Media = styled.div`
  flex: 1;
  font-weight: 500;
  color: #767676;

  &:nth-child(2) {
    text-align: right;
  }
`;

export const AppNameWrapper = styled.div`
  height: 50px;
  padding: 10px;
  background-color: #6c757d;
  color: #fff;
  font-weight: 600;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center

  &:hover {
    cursor: pointer;
  }
`;
