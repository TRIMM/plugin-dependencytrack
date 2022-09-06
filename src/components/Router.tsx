import React from 'react';
import { Entity } from '@backstage/catalog-model';
import { Route, Routes } from 'react-router';
import { DependencytrackSummaryCard, DependencytrackFindingCard } from './DependencytrackCard';

export const Router = ({ entity }: { entity: Entity }) => {
    return (
      <Routes>
        <Route
          path="/"
          element={
            <DependencytrackSummaryCard
              entity={entity}              
              tableOptions={{
                padding: 'dense',
                paging: true,
                search: false,
                pageSize: 5,
              }}
            />
          }
        />        
        <Route
          path="/"
          element={
            <DependencytrackFindingCard
              entity={entity}              
              tableOptions={{
                padding: 'dense',
                paging: true,
                search: false,
                pageSize: 5,
              }}
            />
          }
        />   
      </Routes>
    );
  };