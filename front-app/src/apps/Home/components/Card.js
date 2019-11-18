import React, { useContext } from 'react';
import { Popup } from 'semantic-ui-react';
import AppRating from './AppRating';
import AppComment from './AppComment';
import ModalContext from 'core/providers/Modal/Context';
import { MODAL_TYPES } from 'core/providers/Applications/constants';
import { showModal } from 'core/providers/Modal/actions';
import PropTypes from 'prop-types';
import AppImage from './AppImage';

import {
  MainWrapper,
  AppNameWrapper,
  Content,
  MediaWrapper,
  ButtonWrapper,
  ButtonStyled,
  ButtonSupport
} from './style';

import { useSaveClickTrough } from 'core/providers/Applications/actions/application';
import { getObjectClickTrough } from 'core/utils/helpers';

function Card({ app, userApps, userRatings }) {
  const { dispatch } = useContext(ModalContext);
  const { handleSave } = useSaveClickTrough();

  const handleOpen = async app => {
    const object = await getObjectClickTrough(app);
    handleSave({ variables: { ...object } });

    window.open(app.url, '_blank');
  };

  const hasRating = () => {
    return userRatings.filter(rating => rating.appId === app._id);
  };

  return (
    <MainWrapper>
      <Popup
        position="top center"
        content="Click to open App"
        inverted
        trigger={<AppImage height={170} app={app} userApps={userApps} url={app.url} />}
      />

      <Popup
        position="top center"
        content="Click to open App"
        inverted
        trigger={<AppNameWrapper onClick={() => handleOpen(app)}>{app.title}</AppNameWrapper>}
      />

      <Content>
        <MediaWrapper>
          <AppRating app={app} hasRating={hasRating()} />
          <AppComment app={app} />
        </MediaWrapper>

        <ButtonWrapper>
          <ButtonSupport
            onClick={() => dispatch(showModal(MODAL_TYPES.SUPPORT_APPLICATION, { appId: app._id }))}
          >
            Support
          </ButtonSupport>
          <ButtonStyled
            color="blue"
            onClick={() => dispatch(showModal(MODAL_TYPES.INFO_APPLICATION, { appId: app._id }))}
          >
            Info
          </ButtonStyled>
        </ButtonWrapper>
      </Content>
    </MainWrapper>
  );
}

Card.propTypes = {
  app: PropTypes.shape({
    picture: PropTypes.string,
    title: PropTypes.string.isRequired
  })
};

export default React.memo(Card);
