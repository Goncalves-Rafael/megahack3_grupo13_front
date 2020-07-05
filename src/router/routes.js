
const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    meta: { auth: true },
    children: [
      { name: 'Painel', path: '/', meta: { auth: true, isProfessor: true }, component: () => import('pages/Dashboard.vue') },
      { name: 'Turmas', path: '/turmas', meta: { auth: true, isProfessor: true }, component: () => import('pages/Turmas.vue') },
      { name: 'Turma', path: '/turmas/:id', meta: { auth: true, isProfessor: true }, component: () => import('pages/DashboardTurma.vue') },
      { name: 'Ranking Alunos', path: '/ranking', meta: { auth: true, isProfessor: true }, component: () => import('pages/Ranking.vue') },
      { name: 'Livros', path: '/livros', meta: { auth: true }, component: () => import('pages/Livros.vue') },
      { name: 'Alunos', path: '/aluno/:id', meta: { auth: true }, component: () => import('pages/Aluno.vue') },
      { name: 'Alunos', path: '/aluno', meta: { auth: true }, component: () => import('pages/Aluno.vue') },
      { name: 'Leitura', path: '/leitura/:id', meta: { auth: true }, component: () => import('pages/Leitura.vue') },
      { name: 'Cadastro Desafio', path: '/desafios/cadastrar', meta: { auth: true, isProfessor: true }, component: () => import('pages/CadastroDesafio.vue') },
      { name: 'Desafio', path: '/desafio/:id', meta: { auth: true }, component: () => import('pages/Desafio.vue') }
    ]
  },
  {
    name: 'sair',
    path: '/sair',
    component: () => import('pages/login.vue')
  },
  {
    name: 'login',
    path: '/login',
    component: () => import('pages/login.vue')
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '*',
    component: () => import('pages/Error404.vue')
  }
]

export default routes
