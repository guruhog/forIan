import React from 'react';
import { Tab } from 'semantic-ui-react';

import DataSourceTabContent from 'core/components/UI/DataSourceAG';
import { useGetDataSources } from 'core/providers/Dictionary/actions/dataSources';

import PropTypes from 'prop-types';

function AppDataSources({ onChange, dataSource }) {
  const { result, loading } = useGetDataSources();

  const panes = [
    {
      menuItem: {
        key: 'dataLevel',
        icon: 'sort amount up',
        content: 'Data Level'
      },
      render: () => (
        <DataSourceTabContent
          source={result}
          data={dataSource}
          loading={loading}
          type="dataLevel"
          onChange={onChange}
        />
      )
    },
    {
      menuItem: {
        key: 'dataType',
        icon: 'hdd',
        content: 'Data Type'
      },
      render: () => (
        <DataSourceTabContent
          source={result}
          data={dataSource}
          loading={loading}
          type="dataType"
          onChange={onChange}
        />
      )
    },
    {
      menuItem: {
        key: 'systemIn',
        icon: 'sign-in',
        content: 'System In'
      },
      render: () => (
        <DataSourceTabContent
          source={result}
          data={dataSource}
          loading={loading}
          type="systemIn"
          onChange={onChange}
        />
      )
    },
    {
      menuItem: {
        key: 'systemOut',
        icon: 'sign-out',
        content: 'System Out'
      },
      render: () => (
        <DataSourceTabContent
          source={result}
          data={dataSource}
          loading={loading}
          type="systemOut"
          onChange={onChange}
        />
      )
    }
  ];

  return <Tab panes={panes} />;
}

AppDataSources.propTypes = {
  onChange: PropTypes.func.isRequired,
  dataSource: PropTypes.array.isRequired
};

export default React.memo(AppDataSources);
