import React from 'react';
import { Label, Segment, Item, Icon } from 'semantic-ui-react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import NoImage from 'assets/images/noImage.png';

const IconStyled = styled(Icon)`
  position: absolute;
  top: 0;
  right: 0;
  margin: 10px 10px 0 0 !important;
`;

const ItemHeaderStyled = styled(Item.Header)`
  font-size: 16px !important;
`;

export default function ContributorAG({
  hasCloseIcon,
  basic = false,
  color,
  contributor,
  i,
  deleteContributer
}) {
  const style = hasCloseIcon ? { paddingBottom: 0 } : {};

  return (
    <Segment color={color} basic={basic} style={style}>
      <Item.Group divided>
        <Item>
          <Item.Image src={NoImage} size="mini" />

          <Item.Content>
            <ItemHeaderStyled>{contributor.title}</ItemHeaderStyled>
            <Item.Description style={{ marginTop: 0, fontSize: '13px' }}>
              {contributor.email}
            </Item.Description>

            <Item.Extra>
              <Label color="grey">{contributor.role}</Label>
            </Item.Extra>
          </Item.Content>
        </Item>
      </Item.Group>

      {hasCloseIcon && (
        <IconStyled onClick={() => deleteContributer(i)} link name="close" circular />
      )}
    </Segment>
  );
}

ContributorAG.propTypes = {
  hasCloseIcon: PropTypes.bool.isRequired,
  basic: PropTypes.bool,
  color: PropTypes.string,
  contributor: PropTypes.object
};
