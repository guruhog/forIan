import React from 'react';
import { Grid, Header, Label, Segment } from 'semantic-ui-react';
import styled from 'styled-components';
import { BLUE } from 'core/constants/colors';

const HeaderStyled = styled(Header)`
  margin-bottom: 2px;
  margin-top: 15px;
`;

const LabelStyled = styled(Label)`
  margin-top: 5px !important;
`;

function TargetAudience({ data }) {
  return (
    <Grid.Row style={{ marginTop: '15px', padding: 0 }}>
      <Grid.Column>
        <Segment>
          <Header as="h3" style={{ color: BLUE }}>
            Target Audience
          </Header>
          <div style={{ marginTop: '15px' }}>
            {data.find(item => item.type === 'targetFunctions') && (
              <>
                <HeaderStyled as="h4">Function</HeaderStyled>
                {data
                  .filter(item => item.type === 'targetFunctions')
                  .sort((a, b) => (a.title.toLowerCase() < b.title.toLowerCase() ? -1 : 1))
                  .map(item => (
                    <LabelStyled key={item._id} color="grey">
                      {item.title}
                    </LabelStyled>
                  ))}
              </>
            )}

            {data.find(item => item.type === 'targetRoles') && (
              <>
                <HeaderStyled as="h4">Role</HeaderStyled>
                {data
                  .filter(item => item.type === 'targetRoles')
                  .sort((a, b) => (a.title.toLowerCase() < b.title.toLowerCase() ? -1 : 1))
                  .map(item => (
                    <LabelStyled key={item._id} color="grey">
                      {item.title}
                    </LabelStyled>
                  ))}
              </>
            )}

            {data.find(item => item.type === 'targetFranchises') && (
              <>
                <HeaderStyled as="h4" s>
                  Division
                </HeaderStyled>
                {data
                  .filter(item => item.type === 'targetFranchises')
                  .sort((a, b) => (a.title.toLowerCase() < b.title.toLowerCase() ? -1 : 1))
                  .map(item => (
                    <LabelStyled key={item._id} color="grey">
                      {item.title}
                    </LabelStyled>
                  ))}
              </>
            )}
          </div>
        </Segment>
      </Grid.Column>
    </Grid.Row>
  );
}

export default React.memo(TargetAudience);

// import React from 'react';
// import { Grid, Header, Table, Label, Icon } from 'semantic-ui-react';
// import PropTypes from 'prop-types';
// import { TableCellStyled } from './Informations';

// import styled from 'styled-components';

// const TableStyled = styled(Table)`
//   border: none !important;
// `;

// const color = 'green';

// function TargetAudience({ data }) {
//   return (
//     <Grid.Row style={{ marginTop: '20px', padding: 0 }}>
//       <Grid.Column>
//         <Header as="h3">Target Audience</Header>
//         <TableStyled compact>
//           <Table.Body>
//             {data.find(item => item.type === 'targetFunctions') && (
//               <Table.Row>
//                 <TableCellStyled width={4}>Function</TableCellStyled>
//                 <Table.Cell>
//                   {data
//                     .filter(item => item.type === 'targetFunctions')
//                     .map(item => (
//                       <Label style={{ margin: '5px' }} color={color} key={item._id}>
//                         <Icon name="check" />
//                         {item.title}
//                       </Label>
//                     ))}
//                 </Table.Cell>
//               </Table.Row>
//             )}

//             {data.find(item => item.type === 'targetFranchises') && (
//               <Table.Row>
//                 <TableCellStyled width={4}>Division</TableCellStyled>
//                 <Table.Cell>
//                   {data
//                     .filter(item => item.type === 'targetFranchises')
//                     .map(item => (
//                       <Label style={{ margin: '5px' }} color={color} key={item._id}>
//                         <Icon name="check" />
//                         {item.title}
//                       </Label>
//                     ))}
//                 </Table.Cell>
//               </Table.Row>
//             )}

//             {data.find(item => item.type === 'targetRoles') && (
//               <Table.Row>
//                 <TableCellStyled width={4}> Role</TableCellStyled>
//                 <Table.Cell>
//                   {data
//                     .filter(item => item.type === 'targetRoles')
//                     .map(item => (
//                       <Label style={{ margin: '5px' }} color={color} key={item._id}>
//                         <Icon name="check" />
//                         {item.title}
//                       </Label>
//                     ))}
//                 </Table.Cell>
//               </Table.Row>
//             )}
//           </Table.Body>
//         </TableStyled>
//       </Grid.Column>
//     </Grid.Row>
//   );
// }

// TargetAudience.propTypes = {
//   data: PropTypes.arrayOf(
//     PropTypes.shape({
//       title: PropTypes.string.isRequired,
//       _id: PropTypes.string.isRequired,
//       type: PropTypes.string.isRequired
//     })
//   )
// };

// export default React.memo(TargetAudience);
