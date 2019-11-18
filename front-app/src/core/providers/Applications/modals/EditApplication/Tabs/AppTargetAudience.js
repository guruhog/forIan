import React from 'react';
import { Tab } from 'semantic-ui-react';
import PropTypes from 'prop-types';

import DataSourceTabContent from 'core/components/UI/DataSourceAG';
import { useGetTargetAudience } from 'core/providers/Dictionary/actions/targetAudience';

function AppTargetAudience({ onChange, targetAudience }) {
  const { result, loading } = useGetTargetAudience();
  const panes = [
    {
      menuItem: {
        key: 'targetFunctions',
        icon: 'user circle outline',
        content: 'Target Function'
      },
      render: () => (
        <DataSourceTabContent
          source={result}
          data={targetAudience}
          loading={loading}
          type="targetFunctions"
          onChange={onChange}
        />
      )
    },
    {
      menuItem: { key: 'targetRoles', icon: 'user md', content: 'Target Role' },
      render: () => (
        <DataSourceTabContent
          source={result}
          data={targetAudience}
          loading={loading}
          type="targetRoles"
          onChange={onChange}
        />
      )
    },
    {
      menuItem: {
        key: 'targetFranchises',
        icon: 'factory',
        content: 'Target Division'
      },
      render: () => (
        <DataSourceTabContent
          source={result}
          data={targetAudience}
          loading={loading}
          type="targetFranchises"
          onChange={onChange}
        />
      )
    }
  ];

  return <Tab panes={panes} />;
}

AppTargetAudience.propTypes = {
  onChange: PropTypes.func.isRequired,
  targetAudience: PropTypes.array.isRequired
};

export default React.memo(AppTargetAudience);
