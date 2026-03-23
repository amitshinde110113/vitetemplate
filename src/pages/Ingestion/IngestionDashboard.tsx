import React, { useState } from 'react';
import { useOktaAuth } from '@okta/okta-react';
import { Table } from '../../components/common/Table/Table';
import { Badge } from '../../components/common/Badge/Badge';
import { Dropdown } from '../../components/common/Dropdown/Dropdown';
import { Button } from '../../components/common/Button/Button';
import { Modal } from '../../components/common/Modal/Modal';
import type { ColumnDef } from '@tanstack/react-table';

interface IngestionData {
  id: string;
  source: string;
  status: 'success' | 'danger' | 'warning' | 'yellow' | 'neutral';
  records: number;
  lastRun: string;
  duration: string;
}

const mockData: IngestionData[] = [
  { id: '1', source: 'CRD Database', status: 'success', records: 15420, lastRun: '2023-10-24 10:30', duration: '45s' },
  { id: '2', source: 'Bloomberg API', status: 'warning', records: 805, lastRun: '2023-10-24 10:25', duration: '1m 20s' },
  { id: '3', source: 'FTP Server 1', status: 'danger', records: 0, lastRun: '2023-10-24 10:00', duration: '5s' },
  { id: '4', source: 'Internal Microservice', status: 'success', records: 2045, lastRun: '2023-10-24 09:45', duration: '12s' },
  { id: '5', source: 'Snowflake Sync', status: 'neutral', records: 0, lastRun: 'Pending', duration: '-' },
];

export const IngestionDashboard: React.FC = () => {
  const { authState, oktaAuth } = useOktaAuth();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedRow, setSelectedRow] = useState<IngestionData | null>(null);

  const handleRetrigger = (row: IngestionData) => {
    setSelectedRow(row);
    setIsModalOpen(true);
  };

  const columns: ColumnDef<IngestionData>[] = [
    { accessorKey: 'source', header: 'Source System' },
    {
      accessorKey: 'status',
      header: 'Status',
      cell: ({ getValue }) => {
        const status = getValue() as IngestionData['status'];
        return <Badge status={status}>{status}</Badge>;
      }
    },
    { accessorKey: 'records', header: 'Records Processed' },
    { accessorKey: 'lastRun', header: 'Last Run' },
    { accessorKey: 'duration', header: 'Duration' },
    {
      id: 'actions',
      header: 'Actions',
      cell: ({ row }) => {
        const item = row.original;
        const dropdownItems = [
          { label: 'View Logs', onClick: () => console.log('Logs for', item.id) },
          { label: 'Retrigger', onClick: () => handleRetrigger(item) },
          { label: 'Disable Sync', danger: true, onClick: () => console.log('Disable', item.id) },
        ];
        return <Dropdown items={dropdownItems} />;
      }
    }
  ];

  /* 
   * Notice: For a real Okta deployment with a SecureRoute, an unauthenticated user would
   * be instantly redirected. For demo purposes here, we render a placeholder if un-auth'd.
   */
  if (!authState?.isAuthenticated) {
    return (
      <div style={{ padding: '2rem', textAlign: 'center' }}>
        <h2>Authentication Required</h2>
        <p style={{ color: 'var(--color-neutral-medium)', marginBottom: '1rem' }}>
          Please login to view ingestion statuses.
        </p>
        <Button variant="solid" colorTheme="primary" onClick={() => oktaAuth.signInWithRedirect()}>
          Login via Okta (POC)
        </Button>
      </div>
    );
  }

  return (
    <div style={{ padding: 'var(--spacing-xl)', maxWidth: '1200px', margin: '0 auto' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--spacing-lg)' }}>
        <h2>Ingestion Overview</h2>
        <div style={{ display: 'flex', gap: 'var(--spacing-sm)' }}>
          <span style={{ display: 'flex', alignItems: 'center', marginRight: 'var(--spacing-md)' }}>
            Welcome, Guest
          </span>
          <Button variant="outline" colorTheme="neutral" size="sm" onClick={() => oktaAuth.signOut()}>
            Logout
          </Button>
          <Button variant="solid" colorTheme="primary" size="sm" onClick={() => console.log('Run All')}>
            Run All Syncs
          </Button>
        </div>
      </div>

      <Table<IngestionData> 
        data={mockData} 
        columns={columns} 
      />

      <Modal
        title="Confirm Retrigger"
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        confirmText="Retrigger"
        confirmColorTheme="primary"
        onConfirm={() => {
          console.log('Retriggering', selectedRow?.source);
          setIsModalOpen(false);
        }}
      >
        <p>Are you sure you want to re-run the ingestion pipeline for <strong>{selectedRow?.source}</strong>?</p>
        <p style={{ fontSize: '0.875rem', color: 'var(--color-neutral-medium)', marginTop: 'var(--spacing-sm)' }}>
          This will fetch the latest available records disregarding the usual schedule.
        </p>
      </Modal>
    </div>
  );
};
