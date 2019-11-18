import React, { useState, useEffect } from 'react';
import { Form, Segment, Header } from 'semantic-ui-react';
import { useGetPhases } from 'core/providers/Dictionary/actions/phases';

import { DragDropContext } from 'react-beautiful-dnd';
import { reorderPhases } from './reOrder';
import Panel from './Panel';
import clone from 'lodash.clonedeep';
import CKEditor from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

import AppDataSources from '../AppDataSources';
import AppTargetAudience from '../AppTargetAudience';

function InfoPanel({
  appData,
  setAppData,
  handleInputChange,
  onChangeDataSources,
  onChangeTargetAudience
}) {
  const { data, loading } = useGetPhases();

  const [start, setStart] = useState(true);

  const [phases, setPhases] = useState({
    availablePhases: [],
    appPhases: []
  });

  useEffect(() => {
    if (data && data.getPhases.length > 0 && start) {
      const availablePhases = data.getPhases.filter(
        ph => !appData.phases.find(ph2 => ph2._id === ph._id)
      );

      setPhases({
        availablePhases: [...clone(availablePhases)],
        appPhases: [...clone(appData.phases)]
      });

      setStart(false);
    }
  }, [data, appData, phases, setAppData, start]);

  useEffect(() => {
    if (!start) {
      if (appData.phases.length !== phases.appPhases.length) {
        setAppData({ ...clone(appData), phases: [...clone(phases.appPhases)] });
      } else {
        for (let i = 0; i < appData.phases.length; i++) {
          if (appData.phases[i]._id !== phases.appPhases[i]._id) {
            setAppData({ ...clone(appData), phases: [...clone(phases.appPhases)] });
            break;
          }
        }
      }
    }
  }, [phases, appData, setAppData, start]);

  if (loading) return false;

  const makeActive = id => {
    const newPhases = phases.appPhases.map(item => {
      if (item._id === id) {
        item.active = item.active ? false : true;
      }

      return item;
    });

    setPhases({ ...clone(phases), appPhases: [...newPhases] });
    setAppData({ ...clone(appData), phases: [...newPhases] });
  };

  return (
    <>
      <Form>
        <Segment style={{ marginTop: '30px' }} color="blue">
          <Header>App Overview :</Header>
          <CKEditor
            editor={ClassicEditor}
            data={appData.appDetails.description}
            config={{
              toolbar: [
                'heading',
                'bold',
                'italic',
                'link',
                'bulletedList',
                'numberedList',
                'imageUpload',
                'blockQuote',
                'insertTable',
                'undo',
                'redo'
              ]
            }}
            onChange={(_, editor) => {
              const event = { target: { name: 'description', value: editor.getData() } };
              handleInputChange(event);
            }}
          />
        </Segment>
        <Segment style={{ marginTop: '30px' }} color="blue">
          <Header>How to use this app :</Header>
          <CKEditor
            editor={ClassicEditor}
            data={appData.appDetails.whenToUse}
            config={{
              toolbar: [
                'heading',
                'bold',
                'italic',
                'link',
                'bulletedList',
                'numberedList',
                'imageUpload',
                'blockQuote',
                'insertTable',
                'undo',
                'redo'
              ]
            }}
            onChange={(_, editor) => {
              const event = { target: { name: 'whenToUse', value: editor.getData() } };
              handleInputChange(event);
            }}
          />
        </Segment>
      </Form>

      <Segment style={{ marginTop: '30px' }} color="blue">
        <Header>Data Sources</Header>
        <AppDataSources onChange={onChangeDataSources} dataSource={appData.dataSources} />
      </Segment>

      <Segment style={{ marginTop: '30px' }} color="blue">
        <Header>Target Audience</Header>
        <AppTargetAudience
          onChange={onChangeTargetAudience}
          targetAudience={appData.targetAudience}
        />
      </Segment>

      <Segment style={{ marginTop: '30px' }} color="blue">
        <DragDropContext
          onDragEnd={({ destination, source }) => {
            if (!destination) {
              return;
            }

            setPhases(reorderPhases(phases, source, destination));
          }}
        >
          <Panel
            listId="availablePhases"
            phases={phases.availablePhases}
            title="Available Phases"
            makeActive={() => {}}
          />
          <Panel
            listId="appPhases"
            phases={phases.appPhases}
            title="Application Phases"
            makeActive={makeActive}
          />
        </DragDropContext>
      </Segment>
    </>
  );
}

export default React.memo(InfoPanel);
