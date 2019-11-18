import React from 'react';
import { Header, Segment, Icon, Label } from 'semantic-ui-react';
import { fileIconType } from 'core/utils/helpers';
import { BLUE } from 'core/constants/colors';
import { config } from 'core/constants/service';

function SupportPanel({ data, icon }) {
  return (
    <>
      <Segment>
        <Header as="h3" style={{ color: BLUE }}>
          {icon && <Icon name={icon} size="small" />}
          {data?.title !== null
            ? data?.title
                .split(' ')
                .map(word => word.substring(0, 1).toUpperCase() + word.substring(1))
                .join(' ')
            : data?.title}
        </Header>

        {data?.content ? (
          <div dangerouslySetInnerHTML={{ __html: data.content }} />
        ) : (
          <div>No information available</div>
        )}

        {data.files && data.files.length > 0 && (
          <div style={{ marginTop: '15px' }}>
            {data.files.map(file => (
              <span style={{ marginRight: '20px', cursor: 'pointer' }} key={file.filename}>
                <a href={`${config.url.S3_LINK}/${file.filename}`}>
                  <Label>
                    <Icon name={fileIconType(file.extension)} size="big" />
                    <span>{file.name}</span>
                  </Label>
                </a>
              </span>
            ))}
          </div>
        )}
      </Segment>
    </>
  );
}

export default React.memo(SupportPanel);
