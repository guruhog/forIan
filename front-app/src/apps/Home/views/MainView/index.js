import React, { useState } from 'react';
import { Grid, Loader, Input, Icon } from 'semantic-ui-react';
import { useGetApplicationsHome } from 'core/providers/Applications/actions/application';

import MainViewMenu from './Menu';
import CardView from '../CardView';
import TableView from '../TableView';

function MainView({ activeMenu }) {
  //get applications
  const { result, loading } = useGetApplicationsHome();

  //set search state
  const [search, setSearch] = useState('');

  //set default view
  const [settings, setSettings] = useState({
    sort: 'alphaDesc',
    view: 'card'
  });

  //set selected target filters
  const [target, setTarget] = useState({
    type: false,
    values: {}
  });

  //INIT
  let applications = [];
  let targetGroups = {};
  let filteredTargetGroups = false;
  if (result.applications.length > 0) {
    switch (activeMenu) {
      case 'favorites':
        applications = result.applications.filter(item =>
          result?.userApps?.find(usrApp => (usrApp._id === item._id) & (usrApp.favorite === true))
        );
        break;

      case 'personal':
        if (result.userRole || result.userFunction) {
          applications = result.applications.filter(app =>
            app.targetAudience.find(
              target => target._id === result.userRole._id || target._id === result.userFunction._id
            )
          );
        }

        break;

      default:
        applications = result.applications;
        break;
    }

    if (search.trim() !== '') {
      applications = applications.filter(app =>
        app.title.toLowerCase().includes(search.toLocaleLowerCase())
      );
    }

    //sort apps here
    applications = sortApps(applications);

    //create targetGroups
    targetGroups = createTargetGroups(applications);

    /** Show groups that are filtered */
    if (Object.keys(target.values).length > 0) {
      filteredTargetGroups = Object.keys(target.values).reduce((acc, groupId) => {
        if (target.values[groupId]) {
          acc[groupId] = targetGroups[groupId];
        }
        return acc;
      }, {});
    }
  }

  function sortApps(applications) {
    switch (settings.sort) {
      case 'alphaDesc':
        return applications.sort((a, b) =>
          a.title.toLowerCase() < b.title.toLowerCase() ? -1 : 1
        );
      case 'alphaAsc':
        return applications.sort((a, b) =>
          a.title.toLowerCase() < b.title.toLowerCase() ? 1 : -1
        );
      case 'ratingDesc':
        return applications.sort((a, b) => (a.rating < b.rating ? 1 : -1));
      case 'ratingAsc':
        return applications.sort((a, b) => (a.rating < b.rating ? -1 : 1));
      default:
        return applications;
    }
  }

  function createTargetItem(groups, app, item) {
    groups[item._id] = groups[item._id] || {};
    groups[item._id]['apps'] = groups[item._id]['apps'] || {};

    const groupApps = { ...groups[item._id]['apps'] };
    const appToAdd = { ...app };

    delete appToAdd.targetAudience;
    groupApps[app._id] = appToAdd;

    return (groups[item._id] = {
      title: item.title,
      _id: item._id,
      apps: groupApps,
      type: item.type
    });
  }

  function createTargetGroups(applications) {
    let groups = {};
    applications.forEach(app => {
      if (app.targetAudience.length > 0) {
        app.targetAudience.forEach(item => {
          groups = { ...groups, [item._id]: { ...createTargetItem(groups, app, item) } };
        });
      } else {
        groups = {
          ...groups,
          other_id: {
            ...createTargetItem(groups, app, { _id: 'other_id', type: 'other', title: 'Other' })
          }
        };
      }
    });

    // groups.sort((a, b) => {
    //   a.title < b.title ? 1 : -1;
    // });

    return groups;
  }

  const handleSetTarget = (object, type, clearAll = false) => {
    if (clearAll) {
      return setTarget({ type: false, values: {} });
    }

    if (target.type !== type) {
      return setTarget({ type, values: { [object.id]: object.title } });
    }

    const values = { ...target.values };

    if (object.id) {
      if (values[object.id]) {
        delete values[object.id];
      } else {
        values[object.id] = object.title;
      }
    }

    setTarget({ type, values });
  };

  if (loading) {
    return (
      <Loader active size="large" inverted>
        Loading
      </Loader>
    );
  }

  return (
    <>
      <Grid centered>
        <Grid.Column computer={10} mobile={16} tablet={16} style={{ marginBottom: '10px' }}>
          <Input
            placeholder="Search for applications..."
            icon={search ? <Icon name="close" link onClick={() => setSearch('')} /> : 'search'}
            name="searchTxt"
            style={{ width: '100%' }}
            onChange={e => setSearch(e.target.value)}
            value={search}
            autoComplete="off"
          />
        </Grid.Column>
      </Grid>

      <MainViewMenu
        settings={settings}
        setSettings={setSettings}
        search={search}
        setSearch={setSearch}
        targetGroups={targetGroups}
        target={target}
        handleSetTarget={handleSetTarget}
      />
      <Grid centered>
        {settings.view === 'card' ? (
          <CardView
            applications={applications}
            userApps={result?.userApps}
            userRatings={result?.userRatings}
            targetGroups={targetGroups}
            filteredTargetGroups={filteredTargetGroups}
            target={target}
          />
        ) : (
          <TableView
            applications={applications}
            userApps={result?.userApps}
            userRatings={result?.userRatings}
            targetGroups={targetGroups}
            filteredTargetGroups={filteredTargetGroups}
            target={target}
          />
        )}
      </Grid>
    </>
  );
}

export default React.memo(MainView);
