import React from 'react';
import { Grid, Menu, Icon, Label } from 'semantic-ui-react';
import styled from 'styled-components';

const IconStyled = styled(Icon)`
  margin-right: 15px !important;
`;

const MenuItemStyled = styled(Menu.Item)`
  padding: 20px !important;
  border-radius: 0 !important;

  &:hover {
    cursor: pointer;
    background: rgba(0, 0, 0, 0.03) !important;
  }

  &.active {
    background: rgba(0, 0, 0, 0.1) !important;
    font-weight: 700 !important;
  }
`;

function MessagesModal() {
  return (
    <Grid>
      <Grid.Column width={3} style={{ borderRight: '1px solid #ccc', padding: 0 }}>
        <Menu vertical fluid>
          <MenuItemStyled active>
            <span>
              <IconStyled name="mail outline" />
              Inbox
            </span>
            <Label color="blue">1</Label>
          </MenuItemStyled>
          <MenuItemStyled>
            <span>
              <IconStyled name="file archive outline" />
              Archive
            </span>
          </MenuItemStyled>
          <MenuItemStyled>
            <span>
              <IconStyled name="star outline" />
              Favorites
            </span>
          </MenuItemStyled>
          <MenuItemStyled>
            <span>
              <IconStyled name="trash alternate outline" />
              Trash
            </span>
          </MenuItemStyled>
        </Menu>
      </Grid.Column>
      <Grid.Column width={4} style={{ padding: 0 }}>
        <Menu vertical fluid style={{ borderRadius: 0 }}>
          {Array(10).map(() => (
            <>
              <MenuItemStyled>
                <input type="checkbox" />
                <div>
                  <h3>title</h3>
                  <span>some text here</span>
                </div>
              </MenuItemStyled>
              <MenuItemStyled>
                <input type="checkbox" />
                <div>
                  <h4>title</h4>
                  <span>some text here</span>
                </div>
              </MenuItemStyled>
            </>
          ))}
        </Menu>
      </Grid.Column>
      <Grid.Column width={9} style={{ border: '1px solid red' }}>
        3
      </Grid.Column>
    </Grid>
  );
}

export default React.memo(MessagesModal);
