import React, { useState } from 'react';
import { Button } from '../../components/common/Button/Button';
import { Badge } from '../../components/common/Badge/Badge';
import { Dropdown } from '../../components/common/Dropdown/Dropdown';
import { Modal } from '../../components/common/Modal/Modal';
import { Select } from '../../components/common/Select/Select';
import { Table } from '../../components/common/Table/Table';

const mockData = [
  { id: '1', name: 'Alice Smith', status: 'success', role: 'Admin', details: 'Department: Clinical\nStorage: US-East-1' },
  { id: '2', name: 'Bob Jones', status: 'warning', role: 'Editor', details: 'Department: Finance\nStorage: EU-West-1' },
  { id: '3', name: 'Charlie Brown', status: 'danger', role: 'Viewer', details: 'Department: Operations\nStorage: AP-South' },
  { id: '4', name: 'Diana Prince', status: 'yellow', role: 'Guest', details: 'Department: Audit\nStorage: Global' },
];

export const DemoPage = () => {
  const [isPrimaryModalOpen, setIsPrimaryModalOpen] = useState(false);
  const [isDangerModalOpen, setIsDangerModalOpen] = useState(false);
  const [demoSelect1, setDemoSelect1] = useState('');
  const [demoSelect2, setDemoSelect2] = useState('RTS');

  const columns = [
    {
      id: 'expander',
      header: () => null,
      cell: ({ row }) => {
        return (
          <button
            style={{ cursor: 'pointer', background: 'none', border: 'none', padding: '4px' }}
            onClick={row.getToggleExpandedHandler()}
          >
            {row.getIsExpanded() ? '▼' : '▶'}
          </button>
        )
      },
    },
    { accessorKey: 'name', header: 'Name' },
    { accessorKey: 'role', header: 'Role' },
    {
      accessorKey: 'status',
      header: 'Status',
      cell: ({ getValue }) => {
        const status = getValue();
        return <Badge status={status}>{status}</Badge>;
      }
    },
    {
      id: 'actions',
      header: 'Actions',
      cell: () => (
        <Dropdown 
          items={[
            { label: 'Edit', onClick: () => console.log('Edit clicked') },
            { label: 'Delete', danger: true, onClick: () => console.log('Delete clicked') },
          ]} 
        />
      )
    }
  ];

  const renderExpandedDetails = ({ row }) => {
    return (
      <div className="p-4 bg-white border-b border-neutral-light">
        <h4 className="mb-2 font-bold text-neutral-dark">Tooltip Content</h4>
        <pre className="text-sm font-sans text-neutral-medium whitespace-pre-wrap">{row.original.details}</pre>
      </div>
    );
  };

  return (
    <div style={{ padding: 'var(--spacing-xl)', maxWidth: '1200px', margin: '0 auto' }}>
      <h1 style={{ marginBottom: 'var(--spacing-lg)' }}>Design System Demo</h1>
      
      <section style={{ marginBottom: 'var(--spacing-xl)' }}>
        <h2 style={{ marginBottom: 'var(--spacing-sm)' }}>Buttons</h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-lg)' }}>
          <div>
            <h3 style={{ fontSize: '1rem', marginBottom: 'var(--spacing-xs)', color: 'var(--color-neutral-dark)' }}>Solid Variants</h3>
            <div style={{ display: 'flex', gap: 'var(--spacing-md)', flexWrap: 'wrap', alignItems: 'center' }}>
              <Button variant="solid" colorTheme="primary">Primary</Button>
              <Button variant="solid" colorTheme="danger">Danger</Button>
              <Button variant="solid" colorTheme="neutral">Neutral</Button>
              <Button variant="solid" colorTheme="primary" size="sm">Small</Button>
              <Button variant="solid" colorTheme="primary" size="lg">Large</Button>
            </div>
          </div>
          <div>
            <h3 style={{ fontSize: '1rem', marginBottom: 'var(--spacing-xs)', color: 'var(--color-neutral-dark)' }}>Outline Variants</h3>
            <div style={{ display: 'flex', gap: 'var(--spacing-md)', flexWrap: 'wrap', alignItems: 'center' }}>
              <Button variant="outline" colorTheme="primary">Primary</Button>
              <Button variant="outline" colorTheme="danger">Danger</Button>
              <Button variant="outline" colorTheme="neutral">Neutral</Button>
              <Button variant="outline" colorTheme="primary" size="sm">Small</Button>
              <Button variant="outline" colorTheme="primary" size="lg">Large</Button>
            </div>
          </div>
          <div>
            <h3 style={{ fontSize: '1rem', marginBottom: 'var(--spacing-xs)', color: 'var(--color-neutral-dark)' }}>Ghost Variants</h3>
            <div style={{ display: 'flex', gap: 'var(--spacing-md)', flexWrap: 'wrap', alignItems: 'center' }}>
              <Button variant="ghost" colorTheme="primary">Primary</Button>
              <Button variant="ghost" colorTheme="danger">Danger</Button>
              <Button variant="ghost" colorTheme="neutral">Neutral</Button>
            </div>
          </div>
        </div>
      </section>

      <section style={{ marginBottom: 'var(--spacing-xl)' }}>
        <h2 style={{ marginBottom: 'var(--spacing-sm)' }}>Badges</h2>
        <div style={{ display: 'flex', gap: 'var(--spacing-md)', flexWrap: 'wrap' }}>
          <Badge status="success">Success</Badge>
          <Badge status="danger">Danger</Badge>
          <Badge status="warning">Warning</Badge>
          <Badge status="yellow">Yellow</Badge>
          <Badge status="neutral">Neutral</Badge>
        </div>
      </section>

      <section style={{ marginBottom: 'var(--spacing-xl)' }}>
        <h2 style={{ marginBottom: 'var(--spacing-sm)' }}>Dropdowns & Modals</h2>
        <div style={{ display: 'flex', gap: 'var(--spacing-md)', alignItems: 'center' }}>
          <Dropdown 
            items={[
              { label: 'Action 1', onClick: () => {} },
              { label: 'Action 2', onClick: () => {} },
              { label: 'Destructive Action', danger: true, onClick: () => {} },
            ]} 
          />
          <span style={{ fontSize: '0.875rem', color: 'var(--color-neutral-medium)' }}>
            (Click the ellipsis to open dropdown)
          </span>

          <span style={{ margin: '0 var(--spacing-md)' }}>|</span>

          <Button variant="solid" colorTheme="primary" onClick={() => setIsPrimaryModalOpen(true)}>
            Open Standard Modal
          </Button>
          <Button variant="solid" colorTheme="danger" onClick={() => setIsDangerModalOpen(true)}>
            Open Danger Modal
          </Button>
        </div>
      </section>

      <section style={{ marginBottom: 'var(--spacing-xl)' }}>
        <h2 style={{ marginBottom: 'var(--spacing-sm)' }}>Data Table (with Expandable Rows)</h2>
        <Table 
          data={mockData} 
          columns={columns} 
          renderSubComponent={renderExpandedDetails} 
        />
      </section>

      <section style={{ marginBottom: 'var(--spacing-xl)' }}>
        <h2 style={{ marginBottom: 'var(--spacing-sm)' }}>Select Fields (Dropdowns)</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 'var(--spacing-xl)' }}>
          <Select 
            label="Business Unit"
            options={[
              { label: 'RTS', value: 'RTS' },
              { label: 'Database', value: 'Database' },
              { label: 'Sharepoint', value: 'Sharepoint' }
            ]}
            value={demoSelect1}
            onChange={setDemoSelect1}
            tooltipText="Select the primary business unit"
            required
          />

          <Select 
            label="Business Unit"
            options={[
              { label: 'RTS', value: 'RTS' },
              { label: 'Database', value: 'Database' },
              { label: 'Sharepoint', value: 'Sharepoint' }
            ]}
            value={demoSelect2}
            onChange={setDemoSelect2}
            tooltipText="Pre-selected state"
            required
          />

          <Select 
            label="Business Unit"
            options={[
              { label: 'RTS', value: 'RTS' },
              { label: 'Database', value: 'Database' },
              { label: 'Sharepoint', value: 'Sharepoint' }
            ]}
            value=""
            onChange={() => {}}
            tooltipText="Validation Error state"
            required
            error="This Field is required"
          />
        </div>
      </section>

      <Modal
        title="Standard Confirmation"
        isOpen={isPrimaryModalOpen}
        onClose={() => setIsPrimaryModalOpen(false)}
        confirmText="Confirm Action"
        confirmColorTheme="primary"
        onConfirm={() => setIsPrimaryModalOpen(false)}
      >
        <p>This is a standard primary confirmation dialog using the Modal component.</p>
        <p style={{ marginTop: 'var(--spacing-sm)', color: 'var(--color-neutral-medium)' }}>
          Used for confirming standard actions like creating or updating resources.
        </p>
      </Modal>

      <Modal
        title="Destructive Action Confirmation"
        isOpen={isDangerModalOpen}
        onClose={() => setIsDangerModalOpen(false)}
        confirmText="Delete Resource"
        confirmColorTheme="danger"
        onConfirm={() => setIsDangerModalOpen(false)}
      >
        <p>Are you sure you want to completely delete this resource?</p>
        <p style={{ marginTop: 'var(--spacing-sm)', color: 'var(--color-danger)' }}>
          This action cannot be undone.
        </p>
      </Modal>
    </div>
  );
};
