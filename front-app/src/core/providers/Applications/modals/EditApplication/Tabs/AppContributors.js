import React, { useState, useRef } from 'react';
import { Form, Search, Segment, Dropdown, Grid, Dimmer, Loader, Message } from 'semantic-ui-react';
import styled from 'styled-components';
import ContributorAG from 'core/components/UI/ContributorAG';
import clone from 'lodash.clonedeep';

import {
  useGetContributors,
  useSearchContributors
} from 'core/providers/Dictionary/actions/contributors';

const GridStyled = styled(Grid)`
  margin: -1rem !important;
`;

const SegmentStyled = styled(Segment)`
  padding: 20px !important;
  margin-bottom: 40px !important;
`;

function AppContributors({ appData, setAppData }) {
  const { result, loading } = useGetContributors();
  const { handleSearch } = useSearchContributors();
  const [searchResults, setSearchResults] = useState([]);
  const [selectedContributor, setSelectedContributor] = useState({});
  const [selectedRole, setSelectedRole] = useState('');
  const searchRef = useRef();
  const [error, setError] = useState(false);

  const onSearchChange = (_, data) => {
    handleSearch({ variables: { search: data.value } }).then(({ data: { searchContributors } }) => {
      setSearchResults(searchContributors);
    });
  };

  const handleSelectResult = (_, data) => {
    setSelectedContributor(data.result);
  };

  const deleteContributer = i => {
    const contributors = [...appData.contributors];
    contributors.splice(i, 1);
    setAppData({ ...clone(appData), contributors });
  };

  const addContributer = () => {
    if (selectedContributor.title) {
      if (selectedRole === '') {
        return setError('Please select a role!');
      }

      setAppData({
        ...clone(appData),
        contributors: [
          ...clone(appData.contributors),
          {
            title: selectedContributor.title,
            role: selectedRole,
            email: selectedContributor.email
          }
        ]
      });

      setSelectedContributor({});
      searchRef.current.setState({ ...searchRef.current.state, value: '' });
    }
  };

  if (loading) {
    return (
      <Segment basic style={{ padding: '50px 0' }}>
        <Dimmer active inverted>
          <Loader />
        </Dimmer>
      </Segment>
    );
  }

  return (
    <>
      <SegmentStyled color="blue">
        <Form>
          <Form.Group widths={'equal'}>
            <Form.Field>
              <Search
                placeholder="Search for user"
                onSearchChange={onSearchChange}
                results={searchResults}
                onResultSelect={handleSelectResult}
                ref={searchRef}
              />
            </Form.Field>
            <Form.Field>
              <Dropdown
                placeholder="Select Role"
                selection
                options={
                  result.length > 0
                    ? result.map(item => ({ key: item._id, text: item.title, value: item._id }))
                    : []
                }
                onChange={(_, data) => {
                  const selected = data.options.filter(option => option.key === data.value);
                  if (error) {
                    setError(false);
                  }
                  setSelectedRole(selected[0].text);
                }}
              />
            </Form.Field>
            <Form.Button color="blue" onClick={() => addContributer()}>
              Add User
            </Form.Button>
          </Form.Group>
        </Form>
        {error && <Message error>{error}</Message>}
      </SegmentStyled>

      <GridStyled divided="vertically">
        <Grid.Row columns={2}>
          {appData.contributors &&
            appData.contributors.map((contributor, i) => (
              <Grid.Column key={i}>
                <ContributorAG
                  hasCloseIcon={true}
                  color="blue"
                  contributor={contributor}
                  deleteContributer={deleteContributer}
                  i={i}
                />
              </Grid.Column>
            ))}
        </Grid.Row>
      </GridStyled>
    </>
  );
}

export default React.memo(AppContributors);
