// Mock data para simular dados do Supabase

// Interfaces principais conforme solicitado
export interface UserProfile {
  id: string;
  name: string;
  handle: string;
  avatarUrl: string;
  bio?: string;
}

export interface Post {
  id: string;
  authorId: string; // referenciando UserProfile
  content: string;
  likes: number;
  comments: number;
  tags: string[];
}

// Interface User existente (mantida para compatibilidade)
export interface User {
  id: string;
  name: string;
  username: string;
  avatar: string;
  bio?: string;
  role: 'admin' | 'moderator' | 'member';
  joinedAt: Date;
}

export interface Post {
  id: string;
  author: User;
  content: string;
  image?: string;
  likes: number;
  comments: number;
  createdAt: Date;
  tags: string[];
}

// Nova interface de comentários (estrutura simplificada)
export interface Comment {
  id: string;
  postId: string; // ID do post ao qual pertence
  authorId: string; // ID do usuário que comentou
  content: string;
  createdAt: string; // ISO string
}

// Dados mockados de usuários (estrutura antiga - mantida para compatibilidade)
export const mockUsers: User[] = [
  {
    id: '1',
    name: 'João Silva',
    username: '@joaosilva',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
    bio: 'Desenvolvedor focado em Astro e Svelte. Entusiasta de IA e performance web.',
    role: 'admin',
    joinedAt: new Date('2024-01-15')
  },
  {
    id: '2',
    name: 'Maria Santos',
    username: '@mariasantos',
    avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b5bc?w=150&h=150&fit=crop&crop=face',
    bio: 'Frontend engineer apaixonada por CSS e acessibilidade. Adora Tailwind.',
    role: 'moderator',
    joinedAt: new Date('2024-02-20')
  },
  {
    id: '3',
    name: 'Pedro Oliveira',
    username: '@pedroliveira',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
    bio: 'Full-stack developer com foco em Node.js e APIs escaláveis.',
    role: 'member',
    joinedAt: new Date('2024-03-10')
  },
  {
    id: '4',
    name: 'Ana Costa',
    username: '@anacosta',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
    bio: 'Data scientist explorando ML aplicado e visualização de dados.',
    role: 'member',
    joinedAt: new Date('2024-04-05')
  }
];

// Novos dados mockados conforme solicitado
export const mockUsersNew: UserProfile[] = [
  {
    id: '1',
    name: 'Ana Silva',
    handle: '@anadev',
    avatarUrl: 'https://images.unsplash.com/photo-1494790108755-2616b612b5bc?w=150&h=150&fit=crop&crop=face'
  },
  {
    id: '2',
    name: 'Carlos Oliveira',
    handle: '@carlosfrontend',
    avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face'
  },
  {
    id: '3',
    name: 'Mariana Costa',
    handle: '@maridatascience',
    avatarUrl: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face'
  },
  {
    id: '4',
    name: 'Pedro Santos',
    handle: '@pedrobackend',
    avatarUrl: 'https://images.unsplash.com/photo-1472099645785-2616b612b5bc?w=150&h=150&fit=crop&crop=face'
  }
];

// Dados mockados de posts (estrutura antiga - mantida para compatibilidade)
export const mockPosts: Post[] = [
  {
    id: '1',
    author: mockUsers[0],
    content: 'Acabei de finalizar meu primeiro projeto com Astro! A performance é incrível e a experiência de desenvolvimento é fantástica. 🚀',
    likes: 42,
    comments: 8,
    createdAt: new Date('2024-11-03T10:30:00'),
    tags: ['astro', 'performance', 'webdev']
  },
  {
    id: '2',
    author: mockUsers[1],
    content: 'Alguém mais está animado com as novidades do Tailwind CSS v4? As novas funcionalidades prometem revolucionar nosso workflow! 💅',
    likes: 28,
    comments: 12,
    createdAt: new Date('2024-11-02T15:45:00'),
    tags: ['tailwind', 'css', 'frontend']
  },
  {
    id: '3',
    author: mockUsers[2],
    content: 'Dica do dia: Sempre testem suas aplicações em diferentes dispositivos e navegadores. Acessibilidade é fundamental! ♿',
    likes: 35,
    comments: 5,
    createdAt: new Date('2024-11-01T09:15:00'),
    tags: ['acessibilidade', 'dica', 'ux']
  },
  {
    id: '4',
    author: mockUsers[3],
    content: 'Estou trabalhando em um novo projeto de e-commerce com integração de IA. Quem mais está explorando esse caminho? 🤖',
    likes: 19,
    comments: 7,
    createdAt: new Date('2024-10-31T14:20:00'),
    tags: ['ia', 'ecommerce', 'inovacao']
  }
];

// Novos dados mockados conforme solicitado
export const mockPostsNew: Post[] = [
  {
    id: '1',
    authorId: '1',
    content: 'Acabei de finalizar meu primeiro projeto com Astro! 🚀\n\nA performance é incrível e a experiência de desenvolvimento é muito fluida. Já estou planejando migrar meu blog pessoal.\n\nAlguém mais está usando Astro em produção?',
    likes: 24,
    comments: 8,
    tags: ['astro', 'performance', 'webdev']
  },
  {
    id: '2',
    authorId: '2',
    content: 'Dica rápida de CSS: Use `clamp()` para fontes responsivas!\n\n```css\nfont-size: clamp(1rem, 2.5vw, 1.5rem);\n```\n\nIsso mantém o texto legível em todas as telas sem media queries.',
    likes: 42,
    comments: 15,
    tags: ['css', 'frontend', 'responsive']
  },
  {
    id: '3',
    authorId: '3',
    content: 'Machine Learning não é só sobre modelos complexos.\n\nÀs vezes, uma análise exploratória de dados bem feita e visualizações claras podem fornecer insights mais valiosos que algoritmos sofisticados.\n\n#DataScience #Analytics',
    likes: 18,
    comments: 6,
    tags: ['datascience', 'analytics', 'insights']
  },
  {
    id: '4',
    authorId: '4',
    content: 'Node.js 20 está chegando com melhorias significativas:\n\n✅ Test Runner nativo\n✅ Permissões de runtime\n✅ Performance aprimorada\n✅ Import Maps\n\nJá testaram? Quais são suas expectativas?',
    likes: 31,
    comments: 12,
    tags: ['nodejs', 'javascript', 'backend']
  }
];

// Funções utilitárias
export function getUserById(id: string): User | undefined {
  return mockUsers.find(user => user.id === id);
}

export function getPostsByUser(userId: string): Post[] {
  return mockPosts.filter(post => post.author.id === userId);
}

export function getPostsByTag(tag: string): Post[] {
  return mockPosts.filter(post => post.tags.includes(tag.toLowerCase()));
}

export function formatDate(date: Date): string {
  const now = new Date();
  const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
  
  if (diffInHours < 1) {
    return 'agora mesmo';
  } else if (diffInHours < 24) {
    return `há ${diffInHours}h`;
  } else {
    const diffInDays = Math.floor(diffInHours / 24);
    return `há ${diffInDays}d`;
  }
}

// Comentários mockados
export const mockComments: Comment[] = [
  {
    id: 'c1',
    postId: '1',
    authorId: '2',
    content: 'Parabéns pelo projeto com Astro! Também estou adorando trabalhar com ele.',
    createdAt: '2025-11-04T12:00:00Z'
  },
  {
    id: 'c2',
    postId: '2',
    authorId: '3',
    content: 'Tailwind v4 está incrível. As novas features ajudam muito no dia a dia.',
    createdAt: '2025-11-04T12:05:00Z'
  },
  {
    id: 'c3',
    postId: '3',
    authorId: '4',
    content: 'Ótima dica de acessibilidade. Vale sempre reforçar práticas inclusivas!',
    createdAt: '2025-11-04T12:10:00Z'
  },
  {
    id: 'c4',
    postId: '4',
    authorId: '1',
    content: 'Curioso para ver como você está aplicando IA no e-commerce. Compartilha mais!',
    createdAt: '2025-11-04T12:15:00Z'
  }
];