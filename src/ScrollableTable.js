import styled from 'styled-components';
import { Table } from 'semantic-ui-react';

export const ScrollableTableBody = styled(Table.Body)({
    display: 'block',
    height: '150px',
    overflow: 'auto',
});

export const ScrollableTableRow = styled(Table.Row)({
    display: 'table',
    width: '100%',
    tableLayout: 'fixed',
});

