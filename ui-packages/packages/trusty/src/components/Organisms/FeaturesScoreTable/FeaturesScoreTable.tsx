/**
 * Copyright 2020 Red Hat, Inc. and/or its affiliates.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *       http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
import React from 'react';
import {
  DataList,
  DataListCell,
  DataListItem,
  DataListItemCells,
  DataListItemRow,
  Title
} from '@patternfly/react-core';
import { FeatureScores } from '../../../types';
import formattedScore from '../../../utils/formattedScore/formattedScore';
import './FeaturesScoreTable.scss';

type FeatureScoreTableProps = {
  featuresScore: FeatureScores[];
};

const FeaturesScoreTable = (props: FeatureScoreTableProps) => {
  const { featuresScore } = props;
  const positiveScores = featuresScore
    .filter(item => item.featureScore >= 0)
    .reverse();
  const negativeScores = featuresScore
    .filter(item => item.featureScore < 0)
    .reverse();

  return (
    <section className="feature-score-table">
      {positiveScores && (
        <ScoreTable name="Positive Weight" featuresScore={positiveScores} />
      )}
      {negativeScores && (
        <ScoreTable name="Negative Weight" featuresScore={negativeScores} />
      )}
    </section>
  );
};

type ScoreTableProps = {
  name: string;
  featuresScore: FeatureScores[];
};

const ScoreTable = (props: ScoreTableProps) => {
  const { name, featuresScore } = props;
  return (
    <DataList aria-label="Features Scores" className="pf-m-compact score-table">
      <DataListItem aria-labelledby="scores" className="score-table__heading">
        <DataListItemRow>
          <DataListItemCells
            dataListCells={[
              <DataListCell key="primary heading" width={2}>
                <Title headingLevel="h6" size="md" id="scores">
                  {name}
                </Title>
              </DataListCell>,
              <DataListCell key="secondary heading">
                <Title headingLevel="h6" size="md" id="scores">
                  Score
                </Title>
              </DataListCell>
            ]}
          />
        </DataListItemRow>
      </DataListItem>
      {featuresScore.map(item => (
        <DataListItem
          key={item.featureName}
          aria-labelledby={`feature-${item.featureName.replace(' ', '-')}`}
        >
          <DataListItemRow>
            <DataListItemCells
              dataListCells={[
                <DataListCell key="feature-name" width={2}>
                  <span id="simple-item2">{item.featureName}</span>
                </DataListCell>,
                <DataListCell key="feature-score">
                  {formattedScore(item.featureScore)}
                </DataListCell>
              ]}
            />
          </DataListItemRow>
        </DataListItem>
      ))}
    </DataList>
  );
};

export default FeaturesScoreTable;
