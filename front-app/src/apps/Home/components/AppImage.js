import React from 'react';
import { ImageStyled } from './style';
import { Label } from 'semantic-ui-react';
import { useMarkAppAsFavorite } from 'core/providers/Applications/actions/user';
import NoImage from 'assets/images/noImage.png';

import { useSaveClickTrough } from 'core/providers/Applications/actions/application';
import { getObjectClickTrough } from 'core/utils/helpers';

function AppImage({ height, app, userApps, url, ...rest }) {
  const isFavorite = userApps.find(usrApp => (usrApp._id === app._id) & (usrApp.favorite === true));

  const { handleMarkApp } = useMarkAppAsFavorite();

  const doMarkApp = () => {
    handleMarkApp({ variables: { appId: app._id, action: !isFavorite } })
      .then(() => {})
      .catch(() => {});
  };

  const { handleSave } = useSaveClickTrough();

  const handleOpen = async app => {
    const object = await getObjectClickTrough(app);
    handleSave({ variables: { ...object } });

    window.open(app.url, '_blank');
  };

  return (
    <ImageStyled
      {...rest}
      height={height}
      src={app.picture ? app.picture : NoImage}
      onClick={() => {
        handleOpen(app);
      }}
      label={
        <Label
          as="a"
          icon="heart"
          corner="right"
          color={isFavorite ? 'red' : 'grey'}
          onClick={e => {
            e.stopPropagation();
            doMarkApp();
          }}
        />
      }
    />
  );
}

export default React.memo(AppImage);
