export const buildUserQuery = ({ search, role }: { search?: string; role?: string }) => {
  const where: any = {
    AND: []
  };

  if (search) {
    where.AND.push({
      OR: [
        { name: { contains: search, mode: 'insensitive' } },
        { email: { contains: search, mode: 'insensitive' } }
      ]
    });
  }

  if (role === 'ADMIN' || role === 'USER') {
    where.AND.push({ role });
  }

  return where;
};
