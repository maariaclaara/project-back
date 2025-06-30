import { subDays } from 'date-fns';

export const listInactiveUsersByLogin = async (req: Request, res: Response) => {
  const thresholdDate = subDays(new Date(), 30);

  try {
    const users = await prisma.user.findMany({
      where: {
        lastLogin: {
          lt: thresholdDate,
        },
        isActive: true
      },
      orderBy: { lastLogin: 'asc' },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        isActive: true,
        lastLogin: true,
        createdAt: true
      }
    });

    res.json({ users });
  } catch (error) {
    res.status(500).json({ message: 'Erro ao buscar usuários inativos', error });
  }
};

export const listUsers = async (req: Request, res: Response) => {
  const page = Number(req.query.page) || 1;
  const limit = 10;
  const skip = (page - 1) * limit;

  const search = String(req.query.search || '').toLowerCase();
  const role = req.query.role ? String(req.query.role).toUpperCase() : undefined;
  const orderBy = String(req.query.orderBy || 'createdAt'); 
  const order = String(req.query.order || 'desc').toLowerCase(); 

  const validOrderBy = ['name', 'createdAt'].includes(orderBy) ? orderBy : 'createdAt';
  const validOrder = order === 'asc' ? 'asc' : 'desc';

  const whereConditions: any = {
    AND: [
      {
        OR: [
          { name: { contains: search, mode: 'insensitive' } },
          { email: { contains: search, mode: 'insensitive' } }
        ]
      }
    ]
  };

  if (role === 'ADMIN' || role === 'USER') {
    whereConditions.AND.push({ role });
  }

  try {
    const [users, total] = await Promise.all([
      prisma.user.findMany({
        where: whereConditions,
        skip,
        take: limit,
        orderBy: { [validOrderBy]: validOrder },
        select: {
          id: true,
          name: true,
          email: true,
          role: true,
          isActive: true,
          createdAt: true
        }
      }),
      prisma.user.count({ where: whereConditions })
    ]);

    res.json({
      users,
      page,
      totalPages: Math.ceil(total / limit),
      total
    });
  } catch (error) {
    res.status(500).json({ message: 'Erro ao listar usuários', error });
  }
};
