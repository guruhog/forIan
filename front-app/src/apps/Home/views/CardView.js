import React, { useState } from 'react';
import Card from '../components/Card';
import { Icon, Grid } from 'semantic-ui-react';
import ItemsCarousel from 'react-items-carousel';

function CardView({
  applications,
  userApps,
  userRatings,
  targetGroups,
  filteredTargetGroups,
  target
}) {
  const [active, setActive] = useState({});

  const setSliderValue = (value, no) => {
    const currentActive = { ...active };
    currentActive[no] = value;

    setActive(currentActive);
  };

  const displayAsGroup = () => {
    const results = filteredTargetGroups ? filteredTargetGroups : targetGroups;

    return Object.entries(results).map(([key, group], i) => {
      return group?._id ? (
        <div style={{ width: '100%', zIndex: 1, marginTop: i > 0 ? '30px' : 0 }} key={key}>
          <div
            style={{
              padding: 0,
              marginBottom: '40px',
              textAlign: 'left'
            }}
          >
            <span style={{ color: '#fff', fontWeight: 700, fontSize: '32px' }}>{group.title}</span>
          </div>
          <div style={{ width: '100%' }}>
            {displayAsSlider(Object.values(group.apps), group._id)}
          </div>
        </div>
      ) : (
        false
      );
    });
  };

  const displayAsList = apps => {
    return (
      apps.length > 0 && (
        <Grid style={{ padding: '10px' }}>
          {apps.map((item, i) => (
            <Grid.Column
              computer={4}
              tablet={7}
              mobile={12}
              key={i}
              style={{ marginTop: '30px', minWidth: '265px' }}
            >
              <Card app={item} userApps={userApps} userRatings={userRatings} />
            </Grid.Column>
          ))}
        </Grid>
      )
    );
  };

  const displayAsSlider = (apps, groupId) => {
    return (
      <div style={{ width: '100%', marginTop: '-20px', marginBottom: '20px' }}>
        <ItemsCarousel
          classes={{ itemsWrapper: 'itemsWrapper-carousel' }}
          gutter={20}
          activePosition={'left'}
          chevronWidth={60}
          numberOfCards={4}
          slidesToScroll={2}
          outsideChevron={true}
          showSlither={true}
          firstAndLastGutter={false}
          activeItemIndex={active[groupId] || 0}
          requestToChangeActive={value => setSliderValue(value, groupId)}
          rightChevron={
            <Icon
              name="chevron right"
              size="huge"
              style={{ color: '#fff', marginLeft: '20px', opacity: '0.9' }}
            />
          }
          leftChevron={
            <Icon
              name="chevron left"
              size="huge"
              style={{ color: '#fff', marginRight: '20px', opacity: '0.9' }}
            />
          }
        >
          {apps.length > 0 &&
            apps.map((item, i) => (
              <Card app={item} userApps={userApps} userRatings={userRatings} key={i} />
            ))}
        </ItemsCarousel>
      </div>
    );
  };

  return (
    <>{Object.values(target.values).length > 0 ? displayAsGroup() : displayAsList(applications)}</>
  );
}

export default CardView;
