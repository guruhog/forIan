import React from 'react';
import { Label, Tab, Radio, Loader, Dimmer } from 'semantic-ui-react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

export const DataSourceLabel = styled(Label)`
  display: inline-flex !important;
  flex-direction: row;
  width: 220px;
  align-items: center;
  padding: 10px;
  margin: 10px 20px !important;

  & span {
    margin-left: 20px !important;
  }
`;

export const DataSourceTabStyled = styled(Tab.Pane)`
  padding: 30px !important;
`;

function DataSourceTabContent({ source, data, loading, onChange, type }) {
  return (
    <DataSourceTabStyled>
      {loading ? (
        <Dimmer active inverted>
          <Loader>Loading</Loader>
        </Dimmer>
      ) : (
        source.length > 0 &&
        source
          .filter(item => item.type === type)
          .map(item => (
            <DataSourceLabel key={item._id}>
              <Radio
                item={item}
                checked={!!data.find(dataItem => dataItem._id === item._id)}
                toggle
                onChange={(e, options) => onChange(e, options)}
              />
              <span>{item.title}</span>
            </DataSourceLabel>
          ))
      )}
    </DataSourceTabStyled>
  );
}

DataSourceTabContent.propTypes = {
  source: PropTypes.array.isRequired,
  data: PropTypes.array.isRequired,
  loading: PropTypes.bool.isRequired,
  type: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired
};

export default React.memo(DataSourceTabContent);
