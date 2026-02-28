import React, { useCallback } from 'react';
import { useFetch, useAsync } from '../hooks';
import DemoCard from './DemoCard';

export function FetchDemo() {
  const { data, loading, error } = useFetch(
    'https://jsonplaceholder.typicode.com/todos/1',
  );

  return (
    <DemoCard title='useFetch' category='data'>
      {loading && <p>Loading…</p>}
      {error && <p style={{ color: '#dc2626' }}>Error: {error.message}</p>}
      {data && (
        <>
          <div className='label'>Fetched title</div>
          <p>
            <strong>{data.title}</strong>
          </p>
        </>
      )}
    </DemoCard>
  );
}

export function AsyncDemo() {
  const fetchTodo = useCallback(
    () =>
      fetch('https://jsonplaceholder.typicode.com/todos/2').then((r) =>
        r.json(),
      ),
    [],
  );
  const { status, data, error, execute } = useAsync(fetchTodo, true);

  return (
    <DemoCard title='useAsync' category='data'>
      {status === 'loading' && <p>Loading…</p>}
      {status === 'error' && (
        <p style={{ color: '#dc2626' }}>Error: {error.message}</p>
      )}
      {status === 'success' && (
        <>
          <div className='label'>Todo</div>
          <p>
            <strong>{data.title}</strong>
          </p>
        </>
      )}
      <div className='btn-group'>
        <button className='btn btn-primary' onClick={execute}>
          Re-fetch
        </button>
      </div>
    </DemoCard>
  );
}
