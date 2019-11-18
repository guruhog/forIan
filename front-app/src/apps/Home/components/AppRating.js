import React, { useState } from 'react';
import { Rating, Popup } from 'semantic-ui-react';
import { useAddRating } from 'core/providers/Applications/actions/rating';
import { toast } from 'react-toastify';
import { Media } from './style';
import moment from 'moment';

function AppRating({ app, hasRating }) {
  const [popup, setPopup] = useState({ open: false, on: 'hover' });

  const { handleSubmit } = useAddRating(app._id);

  const doRate = (_, data) => {
    handleSubmit({
      variables: {
        appId: app._id,
        stars: data.rating,
        createdAt: moment().format('YYYY-MM-DD H:mm:ss'),
        update: hasRating.length > 0 ? true : false
      }
    })
      .then(() => toast.info('Application was rated successfully'))
      .catch(() => toast.error('Something went wrong! Please try again'));
    setPopup({ open: false, on: 'hover' });
  };

  return (
    <Media>
      <div style={{ display: 'flex' }}>
        <Popup
          wide="very"
          position="bottom left"
          inverted={popup.on === 'hover' ? true : false}
          on={popup.on}
          onOpen={() => setPopup({ open: true, on: popup.on })}
          onClose={() => setPopup({ open: false, on: 'hover' })}
          open={popup.open}
          content={
            popup.on === 'hover' ? (
              'Click to add a rating'
            ) : (
              <div>
                Choose from 1-5 Stars to rate the application
                <br />
                <br />
                <Rating
                  maxRating={5}
                  icon="star"
                  onRate={doRate}
                  size="huge"
                  defaultRating={hasRating.length > 0 ? hasRating[0].stars : 0}
                />
              </div>
            )
          }
          trigger={
            <Rating
              maxRating={5}
              disabled
              size="large"
              defaultRating={app.rating}
              icon="star"
              key={app.rating}
              onClick={() => setPopup({ open: true, on: 'click' })}
            />
          }
        />
        <span style={{ fontSize: '13px', marginLeft: '5px' }}>{app.rating > 0 && app.rating}</span>
      </div>
    </Media>
  );
}

export default React.memo(AppRating);
