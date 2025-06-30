import { buildUserQuery } from '../src/utils/queryBuilder';

describe('buildUserQuery', () => {
  it('gera query com search', () => {
    const query = buildUserQuery({ search: 'maria' });
    expect(query.AND[0].OR[0].name.contains).toBe('maria');
  });

  it('gera query com role', () => {
    const query = buildUserQuery({ role: 'ADMIN' });
    expect(query.AND).toContainEqual({ role: 'ADMIN' });
  });

  it('retorna query vazia se sem filtros', () => {
    const query = buildUserQuery({});
    expect(query.AND).toEqual([]);
  });
});
